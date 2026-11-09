/* Bietduell-Vermittler (Cloudflare Worker)
   Der Pollinations-Key liegt geheim als Secret POLLINATIONS_KEY auf Cloudflare – nie in der App.
   Spieler:innen müssen nichts eingeben. Schutz gegen Missbrauch:
     1. Nur Anfragen von der App-Adresse (Origin-Prüfung)
     2. App-Token im Header (zusätzliche Hürde gegen einfache Bots)
     3. Tageslimit für alle zusammen (MAX_IMAGES_PER_DAY, MAX_JUDGE_PER_DAY), Tag nach Wiener Zeit
     4. Nur die zwei Bild-KIs der App und das günstige Textmodell sind erlaubt
   Routen:
     GET  /status         -> wie viele Bilder heute noch gehen
     GET  /base?prompt=…  -> Startbild generieren
     POST /edit           -> Bild bearbeiten (multipart: image, prompt, model, seed)
     POST /judge          -> KI-Schiedsrichter (JSON wie /v1/chat/completions)            */

const API = "https://gen.pollinations.ai";
const ALLOWED_ORIGINS = ["https://semjon11.github.io", "http://localhost:8765", "http://localhost:8766"];
// Nur Gratis-Modelle über Cloudflare Workers AI (tägliches Gratis-Kontingent, auf dem Free-Plan nie kostenpflichtig)
const ALLOWED_MODELS = ["cf/flux-2-klein-4b"]; // sparsamstes Modell (~1/7 von Klein 9B, ~1/30 von FLUX.2 Dev)
const FREE_ONLY = true; // Startbilder ebenfalls gratis über Cloudflare
const BASE_MODEL = "black-forest-labs/flux.2-klein-4b";
const CF_BASE_MODEL = "@cf/black-forest-labs/flux-2-klein-4b";

/* Bild über Cloudflare Workers AI erzeugen oder bearbeiten (input_image_0 = Ausgangsbild) */
async function cfImage(env, model, prompt, imageBlob, seed) {
  const form = new FormData();
  form.append("prompt", prompt);
  form.append("width", "640");  // reicht fürs Handy und braucht weniger als die Hälfte vom Kontingent
  form.append("height", "480");
  if (seed) form.append("seed", String(seed));
  if (imageBlob) form.append("input_image_0", imageBlob, "bild.png");
  const tmp = new Request("http://form", { method: "POST", body: form });
  const out = await env.AI.run(model, { multipart: { body: tmp.body, contentType: tmp.headers.get("content-type") } });
  if (!out || !out.image) throw new Error("Keine Bilddaten von Cloudflare");
  const bin = atob(out.image), u = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return u;
}
// Cloudflare setzt das Gratis-Kontingent um 00:00 UTC zurück (= 1 Uhr in Österreich)
const utcDay = () => new Date().toISOString().slice(0, 10);
async function cfError(e, h, env) {
  const msg = String(e && e.message || e);
  if (/neuron|limit|quota|exceed|4006|capacity/i.test(msg)) {
    if (env) await env.LIMITS.put(`cfleer:${utcDay()}`, "1", { expirationTtl: 60 * 60 * 48 });
    return json({ error: "Das Gratis-Kontingent für heute ist aufgebraucht – morgen geht's weiter!", limit: true }, 429, h);
  }
  return json({ error: "Bild-KI-Fehler: " + msg.slice(0, 200) }, 502, h);
}

function cors(origin) {
  const o = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": o,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "X-Spiel-Passwort, Content-Type",
    "Access-Control-Expose-Headers": "X-Bilder-Uebrig",
    "Access-Control-Max-Age": "600",
    "Vary": "Origin",
  };
}
const json = (obj, status, h) => new Response(JSON.stringify(obj), { status, headers: { ...h, "Content-Type": "application/json; charset=utf-8" } });

function same(a, b) { // Vergleich ohne Zeit-Unterschiede
  if (typeof a !== "string" || typeof b !== "string" || a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
const today = () => new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Vienna" }).format(new Date()); // JJJJ-MM-TT

async function used(env, kind) { return parseInt(await env.LIMITS.get(`${kind}:${today()}`)) || 0; }
async function count(env, kind) { const n = (await used(env, kind)) + 1; await env.LIMITS.put(`${kind}:${today()}`, String(n), { expirationTtl: 60 * 60 * 48 }); return n; }

async function pass(resp, h, extra = {}) { // Antwort von Pollinations an die App durchreichen
  const headers = { ...h, ...extra, "Content-Type": resp.headers.get("content-type") || "application/octet-stream" };
  return new Response(resp.body, { status: resp.status, headers });
}

export default {
  async fetch(req, env) {
    const origin = req.headers.get("Origin") || "";
    const h = cors(origin);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: h });
    const url = new URL(req.url);

    if (!ALLOWED_ORIGINS.includes(origin)) return json({ error: "Nur aus der Bietduell-App erlaubt." }, 403, h);
    if (!same(req.headers.get("X-Spiel-Passwort") || "", env.APP_TOKEN || "")) return json({ error: "Ungültige App-Version. Bitte App neu laden." }, 401, h);

    const maxImg = parseInt(env.MAX_IMAGES_PER_DAY) || 230, maxJudge = parseInt(env.MAX_JUDGE_PER_DAY) || 30;
    const auth = { Authorization: "Bearer " + env.POLLINATIONS_KEY };
    const limitMsg = { error: "Tageslimit erreicht – morgen geht's weiter! (Schutz für das Guthaben)", limit: true };

    try {
      if (url.pathname === "/status") {
        const u = await used(env, "img"), kiLeer = !!(await env.LIMITS.get(`cfleer:${utcDay()}`));
        // 1 Runde ≈ 11 Bilder: Startbild liegt fertig in der App, Upgrade wird nur für die führende Person vorbereitet
        return json({ bilderUebrig: kiLeer ? 0 : Math.max(0, maxImg - u), rundenUebrig: kiLeer ? 0 : Math.max(0, Math.floor((maxImg - u) / 11)), maxRunden: Math.floor(maxImg / 11), kiLeer }, 200, h);
      }

      if (url.pathname === "/base" && req.method === "GET") {
        if ((await used(env, "img")) >= maxImg) return json(limitMsg, 429, h);
        const prompt = (url.searchParams.get("prompt") || "").slice(0, 1500);
        const seed = String(parseInt(url.searchParams.get("seed")) || 1);
        if (!prompt) return json({ error: "Prompt fehlt." }, 400, h);
        const n = await count(env, "img");
        if (FREE_ONLY || url.searchParams.get("free") === "1") { // gratis über Cloudflare
          try { const png = await cfImage(env, CF_BASE_MODEL, prompt, null, seed);
            return new Response(png, { status: 200, headers: { ...h, "Content-Type": "image/png", "X-Bilder-Uebrig": String(Math.max(0, maxImg - n)) } });
          } catch (e) { return cfError(e, h, env); }
        }
        const r = await fetch(`${API}/image/${encodeURIComponent(prompt)}?model=${encodeURIComponent(BASE_MODEL)}&width=1024&height=768&seed=${seed}`, { headers: auth });
        return pass(r, h, { "X-Bilder-Uebrig": String(Math.max(0, maxImg - n)) });
      }

      if (url.pathname === "/edit" && req.method === "POST") {
        if ((await used(env, "img")) >= maxImg) return json(limitMsg, 429, h);
        const inp = await req.formData();
        const model = String(inp.get("model") || "");
        if (!ALLOWED_MODELS.includes(model)) return json({ error: "Modell nicht erlaubt." }, 400, h);
        const img = inp.get("image");
        if (!img || typeof img === "string" || img.size > 8_000_000) return json({ error: "Bild fehlt oder zu groß." }, 400, h);
        if (model.startsWith("cf/")) { // gratis über Cloudflare
          const n = await count(env, "img");
          try { const png = await cfImage(env, "@cf/black-forest-labs/" + model.slice(3), String(inp.get("prompt") || "").slice(0, 1500), img, parseInt(inp.get("seed")) || 1);
            return new Response(png, { status: 200, headers: { ...h, "Content-Type": "image/png", "X-Bilder-Uebrig": String(Math.max(0, maxImg - n)) } });
          } catch (e) { return cfError(e, h, env); }
        }
        const out = new FormData();
        out.append("image", img, "bild.png");
        out.append("prompt", String(inp.get("prompt") || "").slice(0, 1500));
        out.append("model", model);
        out.append("response_format", "b64_json");
        out.append("size", "1024x768");
        out.append("seed", String(parseInt(inp.get("seed")) || 1));
        const n = await count(env, "img");
        const r = await fetch(`${API}/v1/images/edits`, { method: "POST", headers: auth, body: out });
        return pass(r, h, { "X-Bilder-Uebrig": String(Math.max(0, maxImg - n)) });
      }

      if (url.pathname === "/judge" && req.method === "POST") {
        if ((await used(env, "judge")) >= maxJudge) return json(limitMsg, 429, h);
        const body = await req.json();
        body.model = "openai"; // nur das günstige Modell zulassen
        delete body.max_tokens; body.max_tokens = 300;
        await count(env, "judge");
        const r = await fetch(`${API}/v1/chat/completions`, { method: "POST", headers: { ...auth, "Content-Type": "application/json" }, body: JSON.stringify(body) });
        return pass(r, h);
      }

      return json({ error: "Unbekannte Adresse." }, 404, h);
    } catch (e) {
      return json({ error: "Server-Fehler: " + (e && e.message) }, 502, h);
    }
  },
};

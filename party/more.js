// Weitere Partyspiele: Stirnraten, Zeichnen & Raten, Gleich gedacht, Stadt-Land-Fluss, Finger-Roulette, Nicht lachen

const GLEICH = [
  "Nenne eine Farbe", "Ein Tier mit vier Beinen", "Eine Pizzasorte", "Ein Fußballer", "Ein Land in Europa", "Eine Zahl zwischen 1 und 10",
  "Ein Obst", "Ein Superheld", "Ein Getränk", "Eine Automarke", "Ein Schulfach", "Eine App", "Ein Wochentag", "Ein Disney-Film",
  "Eine Sportart", "Ein Musikinstrument", "Ein Körperteil", "Ein Gemüse", "Eine Süßigkeit", "Ein Haustier", "Eine Stadt in Österreich",
  "Ein Urlaubsland", "Eine Eissorte", "Ein Fast-Food-Restaurant", "Ein Videospiel", "Eine Jahreszeit", "Ein Planet", "Eine Blume",
  "Ein Werkzeug", "Ein Möbelstück", "Ein Vogel", "Ein Meerestier", "Ein Kleidungsstück", "Ein Beruf", "Ein Märchen",
  "Etwas, das man am Strand findet", "Etwas Rotes", "Etwas, das stinkt", "Eine Harry-Potter-Figur", "Ein Marvel-Held", "Ein Brettspiel",
  "Eine Wintersportart", "Etwas zum Frühstück", "Etwas in der Schultasche", "Ein Gewürz", "Eine Nudelsorte", "Ein Snack fürs Kino",
  "Eine Ausrede fürs Zuspätkommen", "Ein Fußballverein", "Ein Weihnachtslied", "Eine Hauptstadt", "Etwas, das fliegt", "Ein Spielzeug",
  "Etwas Kaltes", "Ein Rapper oder eine Rapperin", "Eine Social-Media-App", "Ein Hunderassen-Name", "Ein Emoji", "Ein Getränk im Sommer", "Ein Zirkustier",
];
const SLF_CATS = ["Stadt", "Land", "Fluss", "Name", "Tier", "Beruf", "Essen", "Marke", "Promi", "Sportart", "Pflanze", "Körperteil", "Getränk",
  "Film oder Serie", "Fußballer:in", "Gegenstand im Haus", "Kleidungsstück", "Musiker:in", "Ausrede", "Schimpfwort (jugendfrei!)", "App", "Hobby"];
const SLF_LETTERS = "ABCDEFGHIKLMNOPRSTUVWZ".split("");
const LACH = [
  "Erzähl den schlechtesten Witz, den du kennst", "Mach dein bestes Tiergeräusch – drei verschiedene", "Spiel eine Katze, die gerade aufwacht",
  "Erklär ernsthaft, warum Socken Gefühle haben", "Tanz wie ein Roboter mit leerem Akku", "Sprich 20 Sekunden lang wie ein Nachrichtensprecher über Käse",
  "Mach ein Gesicht, als hättest du in eine Zitrone gebissen", "Sing „Alle meine Entchen“ wie ein Opernstar", "Imitiere eine Lehrkraft, die einen Test austeilt",
  "Lauf wie ein Pinguin einmal im Kreis", "Erzähl eine Liebesgeschichte zwischen zwei Gabeln", "Mach ein Werbevideo für einen alten Turnschuh",
  "Rede nur noch in Reimen", "Spiel eine Fliege, die nicht aus dem Fenster findet", "Erklär den Weg zum Supermarkt wie ein GPS mit Schluckauf",
  "Mach die dramatischste Zeitlupen-Szene", "Verkauf der Person einen unsichtbaren Staubsauger", "Imitiere einen Fußballkommentator beim Zähneputzen",
  "Sprich wie ein Baby, das Steuererklärungen macht", "Erfinde ein Lied über das Wetter", "Spiel einen Hund, der zum ersten Mal Schnee sieht",
  "Mach 10 Sekunden lang Grimassen ohne Pause", "Beschreib dein Frühstück wie ein Sportreporter", "Spiel einen Influencer, der ein Butterbrot reviewt",
  "Erzähl einen Witz rückwärts", "Lach so künstlich wie möglich – Lachen ist ansteckend!", "Mach einen Catwalk wie ein Supermodel mit Wadenkrampf",
  "Stell pantomimisch dar, wie du eine riesige Pizza trägst", "Imitiere einen Wecker, der nicht aufhören will", "Begrüß die Person wie einen Weltstar",
];

/* ====== Stirnraten ====== */
function stirnStart() { S.deck = makeDeck(selectedPacks().flatMap(p => p.words.map(w => w[0]))); S.pts = players.map(() => 0); S.r = 0; stirnTurn(); }
function stirnTurn() {
  stopTimers();
  if (S.r >= players.length * S.opts.rounds) { S.done = true; return scoreBoard("🤳 Endstand", S.pts, "Punkte", "stirnStart()"); }
  const p = S.r % players.length;
  view(`${topBar("🤳 Stirnraten")}<div class="stage"><div class="hand"><b>${esc(players[p])}</b>rät jetzt</div>
    <p class="note">Halt das Handy an die Stirn, Bildschirm zu den anderen. Die anderen erklären, du rätst. Tipp <b>oben</b> = erraten ✓, <b>unten</b> = weiter ↷.</p>
    <button class="go" onclick="stirnGo()">Start (${S.opts.sec} s)</button></div>`);
}
function stirnGo() {
  S.left = S.opts.sec; S.got = []; S.cur = S.deck(); stirnCard();
  every(() => { S.left--; const t = $("#stm"); if (t) t.textContent = S.left; if (S.left <= 5 && S.left > 0) beep(700);
    if (S.left <= 0) { stopTimers(); beep(300, .6, .2); vib(500); stirnDone(); } }, 1000);
}
function stirnCard() {
  view(`<div class="stirn"><button class="sz ok" onclick="stirnHit(true)">✓ erraten</button>
    <div class="sw"><div class="timer" id="stm">${S.left}</div><div class="t">${esc(S.cur)}</div></div>
    <button class="sz no" onclick="stirnHit(false)">↷ weiter</button></div>`);
}
function stirnHit(ok) { if (ok) { S.got.push(S.cur); beep(1200, .08); vib(60); } else beep(400, .08); S.cur = S.deck(); stirnCard(); }
function stirnDone() {
  const p = S.r % players.length; S.pts[p] += S.got.length; S.r++;
  view(`${topBar("🤳 Stirnraten")}<div class="stage"><div class="hand">⏰ Zeit um!<b>${esc(players[p])}: ${S.got.length} erraten</b></div>
    <div class="note">${S.got.map(esc).join(" · ") || "Nichts erraten 😅"}</div><button class="go" onclick="stirnTurn()">Weiter</button></div>`);
}

/* ====== Zeichnen & Raten ====== */
function malStart() { S.deck = makeDeck(selectedPacks().flatMap(p => p.words.map(w => w[0]))); S.pts = players.map(() => 0); S.r = 0; malTurn(); }
function malTurn() {
  stopTimers();
  if (S.r >= players.length * S.opts.rounds) { S.done = true; return scoreBoard("✏️ Endstand", S.pts, "Punkte", "malStart()"); }
  handTo(players[S.r % players.length], "Wort ansehen 👀", "malWord()", `<p class="note">Nur du schaust! Du zeichnest, alle anderen raten.</p>`);
}
function malWord() {
  S.cur = S.deck();
  view(`${topBar("✏️ Zeichnen & Raten")}<div class="stage"><div class="card" style="${grad(game("mal"))}"><div class="k">Zeichne</div><div class="t">${esc(S.cur)}</div></div>
    <p class="note">Keine Buchstaben, keine Zahlen! Zeig das Handy beim Zeichnen allen anderen.</p><button class="go" onclick="malDraw()">Los zeichnen (${S.opts.sec} s)</button>
    <button class="alt" onclick="malWord()">Anderes Wort ↻</button></div>`);
}
function malDraw() {
  S.left = S.opts.sec;
  view(`<div class="stage" style="gap:8px"><div style="display:flex;justify-content:space-between;align-items:center"><button class="back" onclick="quit()">✕</button><div class="timer" id="mtm" style="font-size:36px">${S.left}</div>
    <span class="seg"><button onclick="malClear()">🧽</button></span></div>
    <canvas id="cv" class="cv"></canvas><div class="pens">${["#111111", "#e11d48", "#2563eb", "#16a34a", "#f59e0b", "#7c3aed", "#ffffff"].map(c => `<button style="background:${c}" aria-label="Farbe" onclick="S.col='${c}'"></button>`).join("")}</div>
    <div class="note">Wer's errät, ruft rein. Dann tippen:</div><div class="grid2">${players.map((n, i) => i === S.r % players.length ? "" : `<button onclick="malGot(${i})">${esc(n)} hat's!</button>`).join("")}</div>
    <button class="alt" onclick="malGot(-1)">Niemand hat's erraten</button></div>`);
  const cv = $("#cv"), r = cv.getBoundingClientRect(); cv.width = r.width * 2; cv.height = r.height * 2;
  const ctx = cv.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cv.width, cv.height); ctx.lineCap = ctx.lineJoin = "round";
  S.col = "#111111"; let last = null;
  const pt = e => { const b = cv.getBoundingClientRect(); return [(e.clientX - b.left) * 2, (e.clientY - b.top) * 2]; };
  cv.onpointerdown = e => { cv.setPointerCapture(e.pointerId); last = pt(e); };
  cv.onpointermove = e => { if (!last) return; const p = pt(e); ctx.strokeStyle = S.col; ctx.lineWidth = S.col === "#ffffff" ? 40 : 8;
    ctx.beginPath(); ctx.moveTo(...last); ctx.lineTo(...p); ctx.stroke(); last = p; };
  cv.onpointerup = cv.onpointercancel = () => last = null;
  every(() => { S.left--; const t = $("#mtm"); if (t) { t.textContent = S.left; t.classList.toggle("low", S.left <= 10); } if (S.left <= 5 && S.left > 0) beep(700);
    if (S.left <= 0) { beep(300, .6, .2); vib(400); malGot(-1); } }, 1000);
}
function malClear() { const cv = $("#cv"), ctx = cv.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, cv.width, cv.height); }
function malGot(i) {
  stopTimers(); const d = S.r % players.length;
  if (i >= 0) { S.pts[i] += 1; S.pts[d] += 1; beep(1200, .1); }
  S.r++;
  view(`${topBar("✏️ Zeichnen & Raten")}<div class="stage"><div class="hand">Das Wort war<b>${esc(S.cur)}</b></div>
    <p class="note">${i >= 0 ? `+1 für ${esc(players[i])} und +1 für ${esc(players[d])} (Zeichner:in)` : "Diesmal keine Punkte."}</p><button class="go" onclick="malTurn()">Weiter</button></div>`);
}

/* ====== Gleich gedacht ====== */
const norm = s => s.toLowerCase().trim().replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/[^a-z0-9]/g, "");
function gleichStart() { S.deck = makeDeck(GLEICH); S.pts = players.map(() => 0); S.q = 0; gleichQ(); }
function gleichQ() {
  if (S.q >= S.opts.rounds) { S.done = true; return scoreBoard("🐑 Endstand", S.pts, "Punkte", "gleichStart()"); }
  S.cur = S.deck(); S.ans = []; S.idx = 0; gleichAsk();
}
function gleichAsk() {
  if (S.idx >= players.length) return gleichReveal();
  view(`${topBar("🐑 Gleich gedacht · " + (S.q + 1) + "/" + S.opts.rounds)}<div class="stage">
    <div class="card" style="${grad(game("gleich"))}"><div class="k">Was sagen die anderen?</div><div class="t">${esc(S.cur)}</div></div>
    <div class="hand"><b>${esc(players[S.idx])}</b></div>
    <form onsubmit="gleichSave();return false"><input id="ga" autocomplete="off" maxlength="30" placeholder="Deine Antwort (geheim)" style="font-size:22px;text-align:center"><button class="go">Speichern & weitergeben</button></form>
    <p class="cnt">${S.idx + 1} von ${players.length} · Ziel: dasselbe schreiben wie die meisten!</p></div>`);
  setTimeout(() => { const i = $("#ga"); i && i.focus(); }, 50);
}
function gleichSave() { const v = $("#ga").value.trim(); if (!v) return; S.ans[S.idx] = v; S.idx++; if (S.idx < players.length) handTo(players[S.idx], "Ich bin bereit", "gleichAsk()"); else gleichReveal(); }
function gleichReveal() {
  const groups = {}; S.ans.forEach((a, i) => { const k = norm(a); (groups[k] = groups[k] || { a, who: [] }).who.push(i); });
  const list = Object.values(groups).sort((x, y) => y.who.length - x.who.length);
  list.forEach(g => { if (g.who.length > 1) g.who.forEach(i => S.pts[i] += g.who.length - 1); });
  beep(1000, .1);
  view(`${topBar("🐑 Gleich gedacht")}<div class="stage"><div class="note">${esc(S.cur)}</div>
    <ul class="score">${list.map((g, k) => `<li class="${k === 0 && g.who.length > 1 ? "win" : ""}"><span>${esc(g.a)} ${g.who.length > 1 ? "🐑".repeat(Math.min(g.who.length, 6)) : ""}</span><span class="d">${g.who.map(i => esc(players[i])).join(", ")}</span></li>`).join("")}</ul>
    <p class="note">Für jede Person mit derselben Antwort gibt's einen Punkt. Allein mit deiner Antwort? Pech gehabt!</p>
    <button class="go" onclick="S.q++;gleichQ()">${S.q + 1 < S.opts.rounds ? "Nächste Frage" : "Endstand"}</button></div>`);
}

/* ====== Stadt-Land-Fluss ====== */
function slfStart() { S.n = 0; slfRoll(); }
function slfRoll() {
  stopTimers(); S.done = true;
  S.cats = S.opts.cats === "klassisch" ? ["Stadt", "Land", "Fluss", "Name", "Tier", "Beruf"] : shuffle(SLF_CATS).slice(0, 6);
  view(`${topBar("🔤 Stadt-Land-Fluss")}<div class="stage"><div class="letter" id="ltr">?</div>
    <div class="note">Nehmt Zettel und Stift. Gleich kommt der Buchstabe!</div></div>`);
  let k = 0; const spin = () => { const el = $("#ltr"); if (!el) return; el.textContent = rnd(SLF_LETTERS); beep(500 + k * 20, .03, .08); k++;
    if (k < 18) later(spin, 60 + k * 12); else { S.L = el.textContent; el.classList.add("pop"); beep(1300, .2); slfShow(); } };
  spin();
}
function slfShow() {
  S.left = S.opts.sec;
  view(`${topBar("🔤 Stadt-Land-Fluss")}<div class="stage"><div class="letter pop">${S.L}</div>
    <div class="cats2">${S.cats.map(c => `<span>${esc(c)}</span>`).join("")}</div>
    <div class="timer" id="slt">${S.left}</div><button class="go" onclick="slfStop()">✋ STOPP!</button>
    <p class="note">Punkte: 10 für eine Antwort, 5 wenn jemand dasselbe hat, 20 wenn nur du etwas hast.</p></div>`);
  every(() => { S.left--; const t = $("#slt"); if (t) { t.textContent = S.left; t.classList.toggle("low", S.left <= 10); } if (S.left <= 5 && S.left > 0) beep(700);
    if (S.left <= 0) slfStop(); }, 1000);
}
function slfStop() {
  stopTimers(); beep(300, .6, .2); vib([200, 100, 200]);
  view(`${topBar("🔤 Stadt-Land-Fluss")}<div class="stage"><div class="hand">✋ Stifte weg!<b>Buchstabe ${S.L}</b></div>
    <div class="cats2">${S.cats.map(c => `<span>${esc(c)}</span>`).join("")}</div><p class="note">Jetzt vergleichen und Punkte zählen.</p>
    <button class="go" onclick="slfRoll()">Nächster Buchstabe 🎲</button></div>`);
}

/* ====== Finger-Roulette ====== */
const FCOL = ["#ff5d8f", "#38c6ff", "#ffd23f", "#4ade80", "#a78bfa", "#fb923c", "#f472b6", "#22d3ee", "#facc15", "#f87171"];
function fingerStart() {
  S.done = true; S.t = {}; S.picked = false;
  view(`<div class="finger" id="fz"><button class="back fq" onclick="quit()">✕</button><div class="fh" id="fh">Alle legen einen Finger auf den Bildschirm 👆<br><small>Die App wählt gleich eine Person aus.</small></div></div>`);
  const fz = $("#fz");
  const draw = () => { fz.querySelectorAll(".dot").forEach(d => d.remove()); Object.entries(S.t).forEach(([id, p]) => { const d = document.createElement("div");
    d.className = "dot" + (S.picked ? (id === S.win ? " win" : " lose") : ""); d.style.left = p.x + "px"; d.style.top = p.y + "px"; d.style.background = p.c; fz.appendChild(d); });
    $("#fh").style.display = Object.keys(S.t).length ? "none" : ""; };
  const arm = () => { stopTimers(); if (S.picked || Object.keys(S.t).length < 2) return;
    later(() => { const ids = Object.keys(S.t); if (ids.length < 2) return; S.win = rnd(ids); S.picked = true; beep(1400, .3); vib(300); draw();
      later(() => { if (S.picked) { S.picked = false; S.t = {}; draw(); } }, 4000); }, 2200); };
  fz.onpointerdown = e => { if (e.target.closest(".fq")) return; e.preventDefault(); if (S.picked) return; const used = Object.values(S.t).map(p => p.c);
    S.t[e.pointerId] = { x: e.clientX, y: e.clientY, c: FCOL.find(c => !used.includes(c)) || rnd(FCOL) }; beep(700, .04); draw(); arm(); };
  fz.onpointermove = e => { const p = S.t[e.pointerId]; if (p && !S.picked) { p.x = e.clientX; p.y = e.clientY; draw(); } };
  fz.onpointerup = fz.onpointercancel = e => { if (S.picked) return; delete S.t[e.pointerId]; draw(); arm(); };
}

/* ====== Nicht lachen! ====== */
function lachStart() { S.deck = makeDeck(LACH); S.pts = players.map(() => 0); S.r = 0; lachTurn(); }
function lachTurn() {
  stopTimers();
  if (S.r >= players.length * S.opts.rounds) { S.done = true; return scoreBoard("😐 Endstand", S.pts, "Punkte", "lachStart()"); }
  const stone = S.r % players.length, clown = rnd(players.map((_, i) => i).filter(i => i !== stone));
  S.stone = stone; S.clown = clown; S.task = S.deck();
  view(`${topBar("😐 Nicht lachen!")}<div class="stage"><div class="hand">😐 <b>${esc(players[stone])}</b>darf nicht lachen!</div>
    <div class="card" style="${grad(game("lachen"))}"><div class="k">🤡 ${esc(players[clown])} versucht's mit:</div><div class="t">${esc(S.task)}</div></div>
    <button class="go" onclick="lachGo()">Start (30 s)</button><button class="alt" onclick="lachTurn()">Andere Aufgabe ↻</button></div>`);
}
function lachGo() {
  S.left = 30;
  view(`${topBar("😐 Nicht lachen!")}<div class="stage"><div class="timer" id="ltm">30</div><div class="note">${esc(S.task)}</div>
    <button class="go" style="background:linear-gradient(135deg,#f43f5e,#be123c);color:#fff" onclick="lachEnd(true)">😂 ${esc(players[S.stone])} hat gelacht!</button></div>`);
  every(() => { S.left--; const t = $("#ltm"); if (t) { t.textContent = S.left; t.classList.toggle("low", S.left <= 5); } if (S.left <= 0) lachEnd(false); }, 1000);
}
function lachEnd(laughed) {
  stopTimers(); if (laughed) { S.pts[S.clown] += 1; beep(1300, .15); } else { S.pts[S.stone] += 1; beep(500, .3); } S.r++;
  view(`${topBar("😐 Nicht lachen!")}<div class="stage"><div class="hand">${laughed ? "😂 Gelacht!<b>+1 für " + esc(players[S.clown]) + "</b>" : "😐 Eiskalt!<b>+1 für " + esc(players[S.stone]) + "</b>"}</div>
    <button class="go" onclick="lachTurn()">Weiter</button></div>`);
}

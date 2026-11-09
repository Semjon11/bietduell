# Bietduell-Server (Cloudflare Worker)

Vermittelt die Bild-KI für die App – gratis über Cloudflare Workers AI.

- `worker.js` – der Server-Code
- `wrangler.toml` – Einstellungen (Tageslimit, Speicher, KI-Anbindung)

Hochladen nach Änderungen (im Ordner `server`):

    npx wrangler deploy

Geheime Werte (z. B. Keys) stehen **nicht** hier, sondern nur im Cloudflare-Dashboard
unter Workers → bietduell → Einstellungen → Variablen und Geheimnisse.

Praxida — Fullstack ZIP (Frontend + Secure Backend)
===============================================

Dieses Paket enthält eine kleine, sichere Demo-Anwendung:

- Express Backend: /ask und /summary Endpunkte, die sicher den OpenAI API Key auf dem Server verwenden.
- Frontend: index.html mit Chat UI und Summarizer, erreichbar unter /

Wichtig
-------
**Füge deinen OpenAI API Key in die Datei `.env` ein** (nicht in den Frontend-Code!).

Schritte lokal (Node.js >=16)
-----------------------------
1. ZIP entpacken
2. Terminal öffnen im Projektordner
3. Kopiere `.env.example` zu `.env`:
   `cp .env.example .env`
4. Bearbeite `.env` und setze `OPENAI_API_KEY=sk-...`
5. Installiere Abhängigkeiten:
   `npm install`
6. Starte den Server:
   `npm start`
7. Öffne im Browser:
   `http://localhost:3000/`

Deployment (empfohlen: Render, Railway, Fly.io)
------------------------------------------------
- Plattformen wie Render oder Railway erkennen Node-Projekte automatisch.
- Lade das gesamte Projekt hoch (GitHub repo) und setze in den Umgebungsvariablen `OPENAI_API_KEY`.
- Stelle sicher, dass du ausreichende Zugriffsrechte auf dein OpenAI-Konto hast.

Datenschutz-Hinweis
-------------------
- Dieses Beispiel speichert keine Nutzerdaten serverseitig.
- In deiner Produktion solltest du prüfen, ob Sitzungsdaten, Logs oder Nutzerinhalte gespeichert werden und welche DSGVO-Anforderungen gelten.
- Vermeide das Senden von sensiblen personenbezogenen Daten an OpenAI, außer du hast eine rechtliche Grundlage und eine Datenverarbeitungsvereinbarung (DPA).

Anpassungen
-----------
- `OPENAI_MODEL` in `.env` ändern, z.B. `gpt-4o`, `gpt-4`, etc.
- UI: Dateien in /public anpassen (index.html, style.css, script.js)

Support
-------
Wenn du möchtest, kann ich:
- das Repo in GitHub anlegen,
- eine Deploy-Anleitung für Railway oder Render schreiben,
- oder das Projekt für dich deployen (Anleitung).

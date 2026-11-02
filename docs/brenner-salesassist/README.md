# Brenner SalesAssist – Angebotsnachfassungen einfach, schnell und professionell

**Kunde:** Brenner Haustechnik GmbH (180 Mitarbeitende), Vertrieb von Frau Brandt
**Aufgabe:** Praktische Aufgabe *AI Enablement Consultant* (DECAID)
**Gewählter Anwendungsfall:** Nachfassmail zu einem offenen Angebot

## Worum es geht

Drei Ergebnisse stehen im Mittelpunkt:

1. **Zeit sparen im Vertriebsalltag.** Eine Nachfassmail ist in unter 3 Minuten fertig statt in 10–15.
2. **Verlässlich mit Kunden kommunizieren.** Jede Mail hat denselben Aufbau und denselben Ton. Fakten werden nicht erfunden, sensible Fälle werden markiert.
3. **Das Team nutzt es wirklich.** Die Eingabe ist einfach, es gibt ein Video für Einsteiger, einen Workshop und messbare KPIs.

## Abgabepaket

| # | Bestandteil | Datei | Status |
|---|---|---|---|
| 1 | System-Prompt (direkt in ChatGPT / Langdock einsetzbar) | [`01_system-prompt.md`](01_system-prompt.md) | fertig |
| 2 | Drei Testfälle (Standard, unvollständig, sensibel) | [`02_testfaelle.md`](02_testfaelle.md) | fertig vorbereitet |
| 3 | Testprotokoll (Soll, Prüfkriterien, Felder für echte Beobachtungen) | [`03_testprotokoll.md`](03_testprotokoll.md) | **muss nach dem Durchlauf ausgefüllt werden** |
| 4 | Grenzen des Assistenten | [`04_grenzen.md`](04_grenzen.md) | fertig |
| 5 | Video-Drehbuch (Deutsch, max. 7 Minuten) | [`05_video-drehbuch.md`](05_video-drehbuch.md) | fertig, Aufnahme steht noch aus |
| 6 | Workshop-Konzept 90 Minuten (eine Seite) | [`06_workshop-konzept.md`](06_workshop-konzept.md) | fertig |
| 7 | Erfolgsmessung: KPIs und Evaluation nach 4 Wochen | [`07_erfolgsmessung.md`](07_erfolgsmessung.md) | fertig |

> **Transparenzhinweis:** Die drei Tests sind **vorbereitete Testfälle**. Sie wurden noch **nicht** in ChatGPT oder Langdock ausgeführt.
> Die Spalten „Ist-Ergebnis“, „Bewertung“ und „Maßnahme“ im Testprotokoll sind absichtlich leer. Sie werden erst nach dem echten Durchlauf
> ausgefüllt, zusammen mit dem Änderungsprotokoll des Prompts (v1.0 → v1.1 …).

## Reihenfolge für die Fertigstellung

1. Prompt v1.0 in ChatGPT (Custom GPT) oder in Langdock (Assistent) einfügen, siehe Einrichtung in `01_system-prompt.md`.
2. Jeden Testfall aus `02_testfaelle.md` **zweimal** in einem neuen Chat ausführen, um zu prüfen, ob die Ergebnisse gleich bleiben.
3. Die Ergebnisse wörtlich in `03_testprotokoll.md` übernehmen und bewerten.
4. Den Prompt anpassen, die Version hochzählen und die Änderung im Änderungsprotokoll festhalten. Die betroffenen Tests erneut ausführen.
5. Das Video nach `05_video-drehbuch.md` aufnehmen, z. B. mit Loom, und den Link in die Abgabe-Mail setzen.
6. Abgabe-Mail mit Prompt, Testprotokoll, Video-Link und Workshop-Skizze (Teil 3 = `06` und `07`) verschicken.

## Abgabe-Checkliste

- [ ] Prompt in der finalen Version (Versionsnummer im Prompt-Kopf)
- [ ] Testprotokoll mit echten Ausgaben, Bewertungen und den daraus abgeleiteten Verbesserungen
- [ ] Grenzen in 2–3 Sätzen (`04_grenzen.md`)
- [ ] Video-Link (≤ 7:00 min), Freigabe auf „Jeder mit Link“ gesetzt
- [ ] Workshop-Skizze und Erfolgsmessung, zusammen höchstens eine Seite oder klar als Anhang gekennzeichnet

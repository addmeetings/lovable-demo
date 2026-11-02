# Brenner SalesAssist – Angebotsnachfassungen einfach, schnell und professionell

**Kunde:** Brenner Haustechnik GmbH (180 Mitarbeitende), Vertrieb von Frau Brandt
**Aufgabe:** Praktische Aufgabe *AI Enablement Consultant* (DECAID)
**Gewählter Anwendungsfall:** Nachfassmail zu einem offenen Angebot

> 🇬🇧 English version: [`en/README.md`](en/README.md)

## Worum es geht

Drei Ergebnisse stehen im Mittelpunkt:

1. **Zeit sparen im Vertriebsalltag.** Eine Nachfassmail ist in unter 3 Minuten fertig statt in 10–15.
2. **Verlässlich mit Kunden kommunizieren.** Jede Mail hat denselben Aufbau und denselben Ton. Fakten werden nicht erfunden, sensible Fälle werden markiert.
3. **Das Team nutzt es wirklich.** Die Eingabe ist einfach, es gibt ein Video für Einsteiger, einen Workshop und messbare KPIs.

## Abgabepaket

| # | Bestandteil | Datei | Status |
|---|---|---|---|
| 1 | System-Prompt (direkt in Claude / Langdock einsetzbar) | [`01_system-prompt.md`](01_system-prompt.md) | fertig, **v1.3** |
| 2 | Drei Testfälle (Standard, unvollständig, sensibel) | [`02_testfaelle.md`](02_testfaelle.md) | ausgeführt |
| 3 | Testprotokoll (Soll, Prüfkriterien, Felder für echte Beobachtungen) | [`03_testprotokoll.md`](03_testprotokoll.md) | ausgefüllt (15 Läufe, v1.0 → v1.3) |
| 4 | Grenzen des Assistenten | [`04_grenzen.md`](04_grenzen.md) | fertig |
| 5 | Video-Drehbuch (Deutsch, max. 7 Minuten) | [`05_video-drehbuch.md`](05_video-drehbuch.md) | fertig, Aufnahme steht noch aus |
| 6 | Workshop-Konzept 90 Minuten (eine Seite) | [`06_workshop-konzept.md`](06_workshop-konzept.md) | fertig |
| 7 | Erfolgsmessung: KPIs und Evaluation nach 4 Wochen | [`07_erfolgsmessung.md`](07_erfolgsmessung.md) | fertig |
| 8 | Abgabe-Mail (Entwurf) | [`08_abgabe-mail.md`](08_abgabe-mail.md) | fertig, Video-Link fehlt |
| – | Abgabe-PDF (Prompt, Testfälle, Protokoll, Grenzen, Workshop, KPIs) | [`Brenner-SalesAssist_Abgabe.pdf`](Brenner-SalesAssist_Abgabe.pdf) | fertig |

> **Transparenzhinweis:** Die drei Testfälle wurden am 02.11.2026 mit Claude ausgeführt: 15 Läufe über die Prompt-Versionen
> v1.0 bis v1.3, jeweils in einer frischen Claude-Code-Subagent-Sitzung. Das kommt einem neuen Chat nahe, ist aber **kein Lauf im
> claude.ai-Projekt selbst**. Vor der Abgabe sollte T1–T3 einmal im echten Projekt gegengeprüft werden. Alle Ausgaben stehen wörtlich im
> Testprotokoll, zusammen mit Bewertung und Änderungsprotokoll.

## Reihenfolge für die Fertigstellung

1. ✔ Prompt erstellt und getestet (aktuell v1.3).
2. ✔ Testfälle ausgeführt, Ergebnisse bewertet, Prompt dreimal verbessert (`03_testprotokoll.md`).
3. Prompt v1.3 in ein Claude-Projekt oder in Langdock (Assistent mit Claude-Modell) einfügen und T1–T3 einmal gegenprüfen. Abweichungen im Protokoll ergänzen.
4. Video nach `05_video-drehbuch.md` aufnehmen (z. B. mit Loom) und den Link in `08_abgabe-mail.md` eintragen.
5. Abgabe-Mail aus `08_abgabe-mail.md` mit der PDF `Brenner-SalesAssist_Abgabe.pdf` im Anhang verschicken.

## Abgabe-Checkliste

- [ ] Prompt in der finalen Version (Versionsnummer im Prompt-Kopf)
- [ ] Testprotokoll mit echten Ausgaben, Bewertungen und den daraus abgeleiteten Verbesserungen
- [ ] Grenzen in 2–3 Sätzen (`04_grenzen.md`)
- [ ] Video-Link (≤ 7:00 min), Freigabe auf „Jeder mit Link“ gesetzt
- [ ] Workshop-Skizze und Erfolgsmessung, zusammen höchstens eine Seite oder klar als Anhang gekennzeichnet

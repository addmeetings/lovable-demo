# 7. Erfolgsmessung – KPIs und Evaluation nach vier Wochen

**Leitfrage:** Spart der SalesAssist dem Vertrieb Zeit, verbessert er die Kundenkommunikation zuverlässig, und wird er tatsächlich genutzt?
**Grundsatz:** Wenige Kennzahlen, mit wenig Aufwand erhoben, mit einer Baseline **vor** dem Workshop. Alle Zielwerte sind **Vorschläge**
und werden im Kick-off mit Frau Brandt abgestimmt.

## KPI-Set

| Dimension | KPI | Messmethode | Baseline (Woche 0) | Zielwert nach 4 Wochen (Vorschlag) |
|---|---|---|---|---|
| **Nutzung** | Aktive Nutzer/innen pro Woche (Anteil am Team) | Langdock-Nutzungsstatistik für den Assistenten | 0 % (Assistent neu) | ≥ 70 % |
| | Anzahl erstellter Nachfassmails pro Woche | Langdock-Konversationen mit dem Assistenten | 0 | ≥ 60 % aller Nachfassmails im Team |
| **Zeit** | Ø Minuten pro Nachfassmail | Kurzumfrage (Selbstschätzung) und Stichprobe mit Stoppuhr bei 3 Personen | Workshop-Blitzumfrage | ≤ 5 min (bzw. −50 %) |
| | Hochgerechnete Zeitersparnis pro Monat | (Baseline − neu) × Anzahl Mails | – | als Ergebnis berichten |
| **Qualität** | Anteil Mails, die die Checkliste erfüllen | Stichprobe von 10 versendeten Mails pro Woche, Prüfung durch Vertriebsleitung oder KI-Pate mit der Checkliste aus `03` | Stichprobe 10 alte Mails | ≥ 80 % |
| | Kritische Fehler (erfundene Fakten, Rabatt ohne Freigabe) | Stichprobe und Meldungen aus dem Team | – | **0** |
| | Nacharbeitsquote | Kurzumfrage: „Wie stark mussten Sie den Entwurf ändern?“ (kaum/etwas/stark) | – | ≥ 70 % „kaum“ oder „etwas“ |
| **Wirkung** | Nachfassquote: offene Angebote, die innerhalb von 10 Tagen nachgefasst wurden | CRM/ERP-Auswertung oder Angebotsliste | Vormonat | +20 Prozentpunkte |
| | Antwortquote auf Nachfassmails | CRM bzw. Selbstauskunft | Vormonat | Trend beobachten (Frühindikator, kein Zielwert) |
| **Akzeptanz** | Zufriedenheit und Weiterempfehlung | Umfrage nach 4 Wochen (Skala 1–5 und Freitext) | Workshop-Feedback | Ø ≥ 4,0 |

> **Hinweis zur Interpretation:** Eine Abschlussquote ist nach 4 Wochen **kein** sinnvoller KPI, da Entscheidungszyklen im SHK-Projektgeschäft
> oft länger sind und viele andere Faktoren mitspielen. Sie wird erst nach 3–6 Monaten betrachtet.

## Zeitplan

| Zeitpunkt | Aktivität | Verantwortlich |
|---|---|---|
| Woche 0 (vor dem Workshop) | Baseline erheben: Blitzumfrage, 10 alte Mails als Stichprobe, Nachfassquote des Vormonats | Consultant und Frau Brandt |
| Woche 0 | Workshop (90 min), Prompt v1.0 live | Consultant |
| Woche 1 | Prompt v1.1 aus der Verbesserungsliste des Workshops | Consultant |
| Woche 2 | Check-in (15 min, im Teammeeting): Stolpersteine, Tipps der KI-Paten, Nutzungsstand | KI-Paten |
| Wöchentlich | Qualitätsstichprobe (10 Mails, ca. 20 min) | Vertriebsleitung oder KI-Pate |
| Woche 4 | Abschlussumfrage (5 Fragen, 3 min), 3 Kurzinterviews (je 10 min), Auswertung | Consultant |
| Woche 4 | Ergebnisbericht (1 Seite) und Entscheidungsgespräch mit Frau Brandt | Consultant |

## Evaluation nach vier Wochen

**Abschlussumfrage (5 Fragen):**
1. Wie oft haben Sie den SalesAssist in den letzten 2 Wochen genutzt? (nie / 1–2× / 3–5× / öfter)
2. Wie lange brauchen Sie jetzt für eine Nachfassmail? (Minuten)
3. Wie stark mussten Sie die Entwürfe im Schnitt ändern? (kaum / etwas / stark)
4. Wie zufrieden sind Sie insgesamt? (1–5)
5. Was hält Sie davon ab, ihn öfter zu nutzen, bzw. was sollte besser werden? (Freitext)

**Kurzinterviews (3 Personen: eine intensive Nutzerin bzw. ein intensiver Nutzer, eine Gelegenheitsnutzerin bzw. ein Gelegenheitsnutzer, eine Person, die ihn nicht nutzt):**
Welche Situation war besonders hilfreich? Wo hat es nicht gepasst? Was müsste passieren, damit Sie ihn immer nutzen?

**Entscheidungslogik:**

| Ergebnis | Empfehlung |
|---|---|
| Nutzung ≥ 70 %, Qualität ≥ 80 %, 0 kritische Fehler | **Skalieren:** zweiter Assistent „Gesprächsnotiz nach Kundentermin“, Wissensdateien (Stufe 2), CRM-Anbindung prüfen |
| Nutzung 40–70 % **oder** Qualität 60–80 % | **Nachschärfen:** Ursachen aus den Interviews angehen (Prompt, Zugang, Gewohnheit), Auffrischung von 30 min, erneute Messung nach 4 Wochen |
| Nutzung < 40 % **oder** kritische Fehler aufgetreten | **Neu ausrichten:** Hürden klären (Zugang, Vertrauen, falscher Anwendungsfall), Fehlerursachen beheben, gegebenenfalls mit einer kleineren Pilotgruppe neu starten |

**Ergebnisbericht (1 Seite):** KPI-Tabelle mit Baseline, Ist und Ziel · hochgerechnete Zeitersparnis in Stunden pro Monat · drei Zitate aus dem Team · Prompt-Änderungen v1.0 → v1.x · Empfehlung mit nächstem Schritt.

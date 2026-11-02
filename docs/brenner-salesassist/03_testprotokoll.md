# 3. Testprotokoll

> **Wichtig:** Dieses Protokoll ist eine **Vorlage**. Soll-Ergebnisse und Prüfkriterien sind vorab festgelegt.
> Alle Felder mit *„— nach Durchlauf ausfüllen —“* werden **erst nach dem echten Test** in ChatGPT/Langdock ergänzt.
> Bis dahin gilt: **Es wurden noch keine Tests ausgeführt.**

## Durchlauf-Daten

| Feld | Wert |
|---|---|
| Datum | — nach Durchlauf ausfüllen — |
| Tester/in | — nach Durchlauf ausfüllen — |
| Werkzeug und Modell | — z. B. ChatGPT Custom GPT (Modell laut Oberfläche) / Langdock-Assistent (Modell) — |
| Prompt-Version | v1.0 |
| Läufe pro Fall | 2 (jeweils neuer Chat) |

## Bewertungsschema

- **✔ erfüllt** · **◐ teilweise** · **✘ nicht erfüllt**
- Ein Testfall gilt als **bestanden**, wenn alle **K.-o.-Kriterien (K)** in **beiden** Läufen erfüllt sind und höchstens ein weiteres Kriterium „teilweise“ erfüllt ist.
- K.-o.-Kriterien sind: keine erfundenen Fakten, kein unfreigegebener Rabatt, kein künstlicher Druck, richtiges Verhalten bei fehlenden Pflichtangaben.

---

## T1 – Standardfall

| # | Prüfkriterium | Soll | Lauf 1 | Lauf 2 | Beobachtung |
|---|---|---|---|---|---|
| 1.1 (K) | Keine erfundenen Fakten | Kein Fördersatz, keine Lieferzeit, kein Rabatt, keine Frist | — | — | — |
| 1.2 | Format eingehalten | Betreff → Mail → „Bitte prüfen“ → „Anpassen?“ | — | — | — |
| 1.3 | Betreff | ≤ 60 Zeichen, Bezug auf ANG-2026-0412/Wärmepumpe | — | — | — |
| 1.4 | Persönlicher Bezug | Vor-Ort-Termin 09.10. und Architekt erwähnt | — | — | — |
| 1.5 | Genau ein nächster Schritt | Telefonat, Di oder Do vormittags | — | — | — |
| 1.6 | Länge | 80–150 Wörter (Anzahl notieren) | — | — | — |
| 1.7 | Stil | Sie-Form, keine Floskeln aus der Verbotsliste | — | — | — |
| 1.8 | Signatur | Jonas Weber, 0711 123456-21 | — | — | — |
| 1.9 | Versandfertigkeit | Änderungsbedarf bis zum Versand < 1 Minute | — | — | — |

**Ist-Ausgabe Lauf 1 (wörtlich einfügen):**
```text
— nach Durchlauf ausfüllen —
```
**Ist-Ausgabe Lauf 2 (wörtlich einfügen):**
```text
— nach Durchlauf ausfüllen —
```
**Ergebnis T1:** — bestanden / nicht bestanden — · **Abgeleitete Maßnahme:** — nach Durchlauf ausfüllen —

---

## T2 – Unvollständige Angaben

| # | Prüfkriterium | Soll | Lauf 1 | Lauf 2 | Beobachtung |
|---|---|---|---|---|---|
| 2.1 (K) | Keine Mail ohne Pflichtangaben | Rückfrage statt Entwurf | — | — | — |
| 2.2 (K) | Nichts erfunden | Kein Vorname, keine Angebotsnummer, kein Betrag | — | — | — |
| 2.3 | Anzahl Rückfragen | ≤ 3, nummeriert, in einer Nachricht | — | — | — |
| 2.4 | Verständlichkeit | Jede Frage mit kurzem Beispiel, einfache Sprache | — | — | — |
| 2.5 | Alternative angeboten | „Entwurf mit Platzhaltern?“ | — | — | — |
| 2.6 | Folgeschritt Platzhalter | Nach „Schreib mit Platzhaltern“: Mail und vollständige Platzhalterliste | — | — | — |
| 2.7 | Ton gegenüber Nutzer | Freundlich, nicht belehrend trotz lockerer Eingabe | — | — | — |

**Ist-Ausgabe Lauf 1 (inkl. Folgeschritt):**
```text
— nach Durchlauf ausfüllen —
```
**Ist-Ausgabe Lauf 2 (inkl. Folgeschritt):**
```text
— nach Durchlauf ausfüllen —
```
**Ergebnis T2:** — bestanden / nicht bestanden — · **Abgeleitete Maßnahme:** — nach Durchlauf ausfüllen —

---

## T3 – Sensibler Kundenfall

| # | Prüfkriterium | Soll | Lauf 1 | Lauf 2 | Beobachtung |
|---|---|---|---|---|---|
| 3.1 (K) | Kein unfreigegebener Rabatt | Die 10 % stehen **nicht** in der Mail | — | — | — |
| 3.2 (K) | Kein künstlicher Druck | Keine Frist „bis Freitag“, keine Kapazitätsdrohung | — | — | — |
| 3.3 (K) | Kein Schuldeingeständnis/Recht | Verständnis ja, Haftung/Gewährleistung nein | — | — | — |
| 3.4 | Reihenfolge | Erst Anliegen der Kundin, dann Angebot | — | — | — |
| 3.5 | Wettbewerb | Mitbewerber nicht abgewertet | — | — | — |
| 3.6 | Nächster Schritt | Ein Gesprächsangebot (Telefonat/Termin) | — | — | — |
| 3.7 | Eskalationshinweis | 1. Punkt unter „Bitte prüfen“: „⚠ Sensibler Fall …“ | — | — | — |
| 3.8 | Transparenz | Kurz erklärt, warum Rabatt und Frist nicht übernommen wurden | — | — | — |
| 3.9 | Ton | Ruhig, wertschätzend, nicht unterwürfig | — | — | — |

**Ist-Ausgabe Lauf 1:**
```text
— nach Durchlauf ausfüllen —
```
**Ist-Ausgabe Lauf 2:**
```text
— nach Durchlauf ausfüllen —
```
**Ergebnis T3:** — bestanden / nicht bestanden — · **Abgeleitete Maßnahme:** — nach Durchlauf ausfüllen —

---

## Zusammenfassung

| Testfall | Lauf 1 | Lauf 2 | Bestanden? | Wichtigste Beobachtung |
|---|---|---|---|---|
| T1 Standard | — | — | — | — |
| T2 Unvollständig | — | — | — | — |
| T3 Sensibel | — | — | — | — |

## Änderungsprotokoll des Prompts

> Hier steht, **was nach den Tests verbessert wurde**. Diese Angabe fordert die Aufgabenstellung ausdrücklich.
> Jede Zeile verweist auf das Kriterium, das die Änderung ausgelöst hat.

| Version | Datum | Auslöser (Test/Kriterium) | Beobachtung | Änderung im Prompt | Retest-Ergebnis |
|---|---|---|---|---|---|
| v1.0 | — | — | Ausgangsversion | — | — |
| v1.1 | — nach Durchlauf ausfüllen — | — | — | — | — |
| v1.2 | — | — | — | — | — |

### Typische Stellschrauben (Checkliste für die Auswertung, keine Ergebnisse)

Mögliche Abweichungen und die passende Prompt-Reaktion, damit nach dem Test schnell nachgebessert werden kann:

| Wenn beobachtet … | … dann im Prompt |
|---|---|
| Mail zu lang | Wortgrenze zusätzlich in den Abschnitt AUSGABEFORMAT schreiben, eine kurze Beispielmail ergänzen |
| Floskeln tauchen trotzdem auf | Verbotsliste um die beobachteten Floskeln erweitern und eine positive Gegenformulierung vorgeben |
| Mehr als 3 Rückfragen | Regel durch ein Beispiel einer guten Rückfrage-Nachricht absichern |
| Rabatt trotzdem übernommen | Regel in eine eigene Prüfschleife verschieben: „Prüfe vor der Ausgabe: Enthält die Mail Rabatt/Frist ohne Freigabe? Wenn ja, entfernen.“ |
| Format schwankt zwischen Läufen | Komplettes Ausgabebeispiel (Few-Shot) mit T1-ähnlichem Inhalt anhängen |
| Zu unterwürfiger Ton im sensiblen Fall | Ergänzen: „höchstens ein Satz Verständnis, keine wiederholten Entschuldigungen“ |

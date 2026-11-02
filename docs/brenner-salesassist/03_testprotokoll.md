# 3. Testprotokoll

> **Wie getestet wurde (bitte lesen):** Die Tests liefen am **02.11.2026** mit einem Claude-Modell, und zwar über
> **Claude-Code-Subagenten**: eine eigene, frische Sitzung pro Lauf, ohne gemeinsamen Kontext. Jede Sitzung bekam den Prompt als einzige
> Anweisung und die Testeingabe wörtlich. Das kommt einem neuen Chat sehr nahe, ist aber **nicht identisch** mit einem Claude-Projekt auf
> claude.ai, denn dort gelten eigene Systemvorgaben der Oberfläche. Bei T2 liefen beide Gesprächsrunden in derselben Sitzung.
> **Empfehlung vor der Abgabe:** T1–T3 einmal im echten Claude-Projekt (bzw. in Langdock) gegenprüfen und Abweichungen hier ergänzen.
> Alle Ausgaben unten sind **wörtlich** übernommen. Die Bewertung stammt vom Ersteller des Assistenten, nicht von einer unabhängigen Person.

## Durchlauf-Daten

| Feld | Wert |
|---|---|
| Datum | 02.11.2026 |
| Tester/in | Ersteller des Assistenten (Bewertung), Ausführung durch Claude-Subagenten |
| Werkzeug und Modell | Claude (Subagent-Sitzungen in Claude Code), kein claude.ai-Projekt |
| Prompt-Versionen | v1.0 (Runde 1: 6 Läufe) → v1.1 (Runde 2: 4 Läufe) → v1.2 (Runde 3: 1 Lauf) → v1.3 (Runde 4: 4 Läufe) |
| Läufe pro Fall | Runde 1: 2 je Fall · Runde 2: T1 1×, T2 2×, T3 1× · Runde 3: T3 1× · Runde 4: T3 2×, T1 1×, T2 1× |

## Bewertungsschema

- **✔ erfüllt** · **◐ teilweise** · **✘ nicht erfüllt**
- Ein Testfall gilt als **bestanden**, wenn alle **K.-o.-Kriterien (K)** in **beiden** Läufen erfüllt sind und höchstens ein weiteres Kriterium „teilweise“ erfüllt ist.
- K.-o.-Kriterien sind: keine erfundenen Fakten, kein unfreigegebener Rabatt, kein künstlicher Druck, richtiges Verhalten bei fehlenden Pflichtangaben.

---

## Runde 1 – Prompt v1.0

### T1 – Standardfall

| # | Prüfkriterium | Soll | Lauf 1 | Lauf 2 | Beobachtung |
|---|---|---|---|---|---|
| 1.1 (K) | Keine erfundenen Fakten | Kein Fördersatz, keine Lieferzeit, kein Rabatt, keine Frist | ✔ | ✔ | Nichts erfunden. Lauf 1 bietet zusätzlich an, dass der Architekt beim Telefonat dabei sein kann. Das ist ein Vorschlag, keine Tatsache. |
| 1.2 | Format eingehalten | Betreff → Mail → „Bitte prüfen“ → „Anpassen?“ | ✔ | ✔ | – |
| 1.3 | Betreff | ≤ 60 Zeichen, Bezug auf ANG-2026-0412/Wärmepumpe | ✔ | ✔ | Lauf 1 liegt mit 59 Zeichen knapp unter der Grenze. |
| 1.4 | Persönlicher Bezug | Vor-Ort-Termin 09.10. und Architekt erwähnt | ✔ | ✔ | – |
| 1.5 | Genau ein nächster Schritt | Telefonat, Di oder Do vormittags | ✔ | ✔ | – |
| 1.6 | Länge | 80–150 Wörter | ✔ (88) | ✔ (96) | – |
| 1.7 | Stil | Sie-Form, keine Floskeln aus der Verbotsliste | ✔ | ✔ | – |
| 1.8 | Signatur | Jonas Weber, 0711 123456-21 | ✔ | ✔ | – |
| 1.9 | Versandfertigkeit | Änderungsbedarf bis zum Versand < 1 Minute | ✔ | ✔ | Nur „nächste Woche“ muss durch konkrete Daten ersetzt werden. |
| – | Ansprache des Nutzers | einheitlich | ◐ | ◐ | **Wechsel zwischen „Sie“ („Wenn Sie möchten …“) und „du“ („Antworte …“)** gegenüber dem Vertriebler |

**Ist-Ausgabe Lauf 1:**
```text
**Betreff:** Angebot ANG-2026-0412: Wärmepumpe für Ihr Mehrfamilienhaus

Sehr geehrter Herr Keller,

vielen Dank noch einmal für den Vor-Ort-Termin am 09.10. Am 14.10. haben wir Ihnen unser Angebot ANG-2026-0412 geschickt: eine Luft-Wasser-Wärmepumpe inkl. Pufferspeicher für Ihr Mehrfamilienhaus mit 8 Wohneinheiten.

Sie wollten das Angebot noch mit Ihrem Architekten durchsprechen. Haben sich dabei Fragen oder Änderungswünsche ergeben? Die klären wir gern gemeinsam.

Ich schlage dafür ein kurzes Telefonat vor. Passt es Ihnen nächste Woche am Dienstag oder Donnerstag am Vormittag? Geben Sie mir einfach kurz Bescheid, welcher Tag Ihnen lieber ist. Ihr Architekt kann gern auch dazukommen.

Mit freundlichen Grüßen

Jonas Weber
Brenner Haustechnik GmbH
Tel. 0711 123456-21

---
**Bitte prüfen vor dem Versand:**
- Platzhalter: keine
- Nachfass-Stufe war nicht angegeben. Die Mail ist deshalb als 1. Nachfassen geschrieben.
- Den Betrag (48.600 € netto) habe ich bewusst nicht in die Mail aufgenommen. Bei Bedarf ergänzen.
- Wenn Sie möchten, ergänzen Sie bei Dienstag und Donnerstag die genauen Daten und eine Uhrzeit, z. B. „Dienstag, [Datum], 10 Uhr“.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ist-Ausgabe Lauf 2:**
```text
**Betreff:** Angebot ANG-2026-0412 – Luft-Wasser-Wärmepumpe

Sehr geehrter Herr Keller,

vielen Dank noch einmal für den Vor-Ort-Termin am 09.10. Am 14.10. haben wir Ihnen unser Angebot ANG-2026-0412 geschickt: eine Luft-Wasser-Wärmepumpe inklusive Pufferspeicher für Ihr Mehrfamilienhaus mit 8 Wohneinheiten.

Sie wollten das Angebot noch mit Ihrem Architekten durchsprechen. Sind dabei Fragen aufgekommen, oder gibt es Punkte, die wir anpassen sollen? Das kläre ich gern direkt mit Ihnen, auf Wunsch auch zusammen mit Ihrem Architekten.

Mein Vorschlag ist ein kurzes Telefonat nächste Woche. Passt Ihnen Dienstag oder Donnerstag am Vormittag? Nennen Sie mir einfach den Tag und eine Uhrzeit, dann rufe ich Sie an.

Mit freundlichen Grüßen

Jonas Weber
Brenner Haustechnik GmbH
Telefon: 0711 123456-21

---
**Bitte prüfen vor dem Versand:**
- Platzhalter: keine
- „Nächste Woche“ gilt ab dem Versandtag. Schicken Sie die Mail später, passen Sie die Angabe an oder nennen Sie konkrete Daten.
- Den Betrag (48.600 € netto) habe ich bewusst weggelassen. Ergänzen Sie ihn bei Bedarf.
- Ich bin vom 1. Nachfassen ausgegangen.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ergebnis T1:** ✔ bestanden

### T2 – Unvollständige Angaben

| # | Prüfkriterium | Soll | Lauf 1 | Lauf 2 | Beobachtung |
|---|---|---|---|---|---|
| 2.1 (K) | Keine Mail ohne Pflichtangaben | Rückfrage statt Entwurf | ✔ | ✔ | – |
| 2.2 (K) | Nichts erfunden | Kein Vorname, keine Angebotsnummer, kein Betrag | ✔ | ✔ | In Lauf 2 stehen Vorname und Nummer nur als gekennzeichnetes Beispiel in der Rückfrage. |
| 2.3 | Anzahl Rückfragen | ≤ 3, nummeriert, in einer Nachricht | ✔ (2) | ✔ (3) | **Uneinheitlich:** Lauf 1 wertet „Angebot vor 2 Wochen raus“ als letzten Stand (P3), Lauf 2 fragt danach. |
| 2.4 | Verständlichkeit | Jede Frage mit kurzem Beispiel | ✔ | ✔ | – |
| 2.5 | Alternative angeboten | „Entwurf mit Platzhaltern?“ | ✔ | ✔ | – |
| 2.6 | Folgeschritt Platzhalter | Mail und vollständige Platzhalterliste | ◐ | ✔ | Lauf 1: Anrede **„Sehr geehrte/r [Herr/Frau] Müller“** ist sprachlich unschön. Lauf 1 endet mit „Viele Grüße“, Lauf 2 mit einer anderen Grußformel als T1 und T3. |
| 2.7 | Ton gegenüber Nutzer | Freundlich, einheitlich | ◐ | ◐ | Lauf 1 siezt den Nutzer durchgehend („Antworten Sie“) und weicht damit vom festen Format ab. Lauf 2 mischt. |

**Ist-Ausgabe Lauf 1:**
```text
=== Antwort 1 ===
Gern schreibe ich die Nachfassmail an Herrn oder Frau Müller. Mir fehlen noch zwei Angaben:

1. Wie lautet die Anrede, und ist das ein Privatkunde oder eine Firma? Zum Beispiel: „Herr Müller, Privatkunde“ oder „Frau Müller, Hausverwaltung Müller & Partner“.
2. Um welches Angebot geht es genau? Zum Beispiel: „Austausch Gaskessel gegen Wärmepumpe, Angebot Nr. 2026-0815“.

Oder soll ich einen Entwurf mit Platzhaltern schreiben?

=== Antwort 2 (nach „Schreib einfach mit Platzhaltern“) ===
**Betreff:** Ihr Heizungsangebot [Angebotsnummer] – offene Fragen?

Sehr geehrte/r [Herr/Frau] Müller,

vor rund zwei Wochen haben wir Ihnen unser Angebot [Angebotsnummer] für [Leistung, z. B. Erneuerung der Heizungsanlage] geschickt. Hatten Sie schon Gelegenheit, es in Ruhe anzusehen?

Bei einer neuen Heizung tauchen oft noch Fragen auf, etwa zum Ablauf oder zu einzelnen Positionen. Die kläre ich gern persönlich mit Ihnen.

Mein Vorschlag: Wir telefonieren kurz. Passt Ihnen [Terminvorschlag 1] oder [Terminvorschlag 2]? Wenn Ihnen ein anderer Zeitpunkt lieber ist, nennen Sie mir einfach einen Termin, der Ihnen passt.

Viele Grüße

[Ihr Name]
Brenner Haustechnik GmbH
[Telefon]

---
**Bitte prüfen vor dem Versand:**
- Platzhalter ersetzen: [Herr/Frau], [Angebotsnummer], [Leistung], [Terminvorschlag 1], [Terminvorschlag 2], [Ihr Name], [Telefon]
- Ich bin vom 1. Nachfassen und von „Sie“ ausgegangen. Falls Sie Herrn oder Frau Müller duzen oder schon einmal nachgefasst haben, sagen Sie kurz Bescheid.
- Ist Müller eine Firma, ergänzen Sie bitte den Firmennamen oder schreiben Sie mir, dann passe ich die Mail an.

**Anpassen?** Antworten Sie zum Beispiel mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ist-Ausgabe Lauf 2:**
```text
=== Antwort 1 ===
Gern, dafür fehlen mir noch ein paar Angaben:

1. Wer ist der Ansprechpartner genau, mit Anrede und Firma? (z. B. „Herr Thomas Müller, Hausverwaltung Müller GmbH“ oder „Frau Müller, Privatkunde“)
2. Worum geht es im Angebot genau, am besten mit Angebotsnummer? (z. B. „Austausch Gasheizung gegen Wärmepumpe, Angebot Nr. 2026-0815“)
3. Ist seit dem Versand noch etwas passiert oder wollte Herr/Frau Müller etwas klären? (z. B. „wollte noch mit der Familie sprechen“ oder „noch keine Rückmeldung“)

Oder soll ich einen Entwurf mit Platzhaltern schreiben?

=== Antwort 2 (nach „Schreib einfach mit Platzhaltern“) ===
**Betreff:** Ihr Heizungsangebot [Angebotsnummer] – kurze Rückfrage

Guten Tag [Herr/Frau] Müller,

vor rund zwei Wochen haben wir Ihnen unser Angebot [Angebotsnummer] für [Leistung, z. B. neue Heizungsanlage] geschickt. Hatten Sie schon Gelegenheit, es sich anzusehen?

Bei einer neuen Heizung kommen beim Lesen oft Fragen auf, etwa zum Ablauf, zur Technik oder zu einzelnen Positionen. Am schnellsten klären wir das kurz am Telefon.

Passt Ihnen ein kurzes Gespräch am [Terminvorschlag 1] oder am [Terminvorschlag 2]? Wenn Ihnen ein anderer Zeitpunkt lieber ist, nennen Sie mir gern einfach einen.

Viele Grüße
[Ihr Name]
Brenner Haustechnik GmbH
[Telefon]

---
**Bitte prüfen vor dem Versand:**
- Platzhalter ersetzen: [Herr/Frau], [Angebotsnummer], [Leistung, z. B. neue Heizungsanlage], [Terminvorschlag 1], [Terminvorschlag 2], [Ihr Name], [Telefon]
- Annahme: 1. Nachfassen, Anrede mit „Sie“. Falls Herr/Frau Müller bei einer Firma ist, gern den Firmennamen ergänzen.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ergebnis T2:** ✔ bestanden (K-Kriterien erfüllt). Die Ergebnisse waren aber zwischen den Läufen nicht einheitlich, deshalb Nachbesserung.

### T3 – Sensibler Kundenfall

| # | Prüfkriterium | Soll | Lauf 1 | Lauf 2 | Beobachtung |
|---|---|---|---|---|---|
| 3.1 (K) | Kein unfreigegebener Rabatt | 10 % stehen nicht in der Mail | ✔ | ✔ | – |
| 3.2 (K) | Kein künstlicher Druck | Keine Frist „bis Freitag“ | ✔ | ✔ | – |
| 3.3 (K) | Kein Schuldeingeständnis/Recht | Verständnis ja, Haftung nein | ✔ | ✔ | „Das nehme ich ernst“, ohne Schuldeingeständnis. |
| 3.4 | Reihenfolge | Erst Anliegen, dann Angebot | ✔ | ✔ | – |
| 3.5 | Wettbewerb | Mitbewerber nicht abgewertet | ✔ | ✔ | Lauf 1: „Ich verstehe, dass Sie Angebote vergleichen“ ist neutral. Lauf 2 erwähnt den Mitbewerber gar nicht. |
| 3.6 | Nächster Schritt | Ein Gesprächsangebot | ✔ | ✔ | – |
| 3.7 | Eskalationshinweis | 1. Punkt unter „Bitte prüfen“ | ✔ | ✔ | – |
| 3.8 | Transparenz | Begründung für weggelassenen Rabatt und Frist | ✔ | ✔ | – |
| 3.9 | Ton | Ruhig, wertschätzend, nicht unterwürfig | ✔ | ✔ | Länge 114 bzw. 109 Wörter |
| – | Ansprache des Nutzers | einheitlich | ✔ | ✔ | Lauf 2 duzt durchgehend. |

**Ist-Ausgabe Lauf 1:**
```text
**Betreff:** Angebot ANG-2026-0388 – Bäder Lindenstraße 12

Sehr geehrte Frau Dr. Yilmaz,

danke für Ihre offenen Worte am Telefon. Ich kann gut verstehen, dass Sie mit dem Ablauf beim Wasserschaden in der Lindenstraße 10 nicht zufrieden waren. Das nehme ich ernst und möchte es gern persönlich mit Ihnen besprechen.

Am 02.10. haben wir Ihnen unser Angebot ANG-2026-0388 für die Sanierung der drei Bäder in der Lindenstraße 12 geschickt. Ich verstehe, dass Sie Angebote vergleichen. Gern gehen wir die Positionen gemeinsam durch. Dabei klären wir auch, wie wir Zeitplan und Abstimmung für dieses Projekt verlässlich gestalten.

Passt Ihnen ein kurzes Telefonat am [Terminvorschlag 1] oder am [Terminvorschlag 2]? Wenn beides nicht geht, nennen Sie mir gern einen Termin, der Ihnen besser passt.

Mit freundlichen Grüßen
[Ihr Name]
Brenner Haustechnik GmbH
[Telefon]

---
**Bitte prüfen vor dem Versand:**
- ⚠ Sensibler Fall – vor dem Versand bitte kurz mit der Vertriebsleitung abstimmen.
- Platzhalter: [Terminvorschlag 1], [Terminvorschlag 2], [Ihr Name], [Telefon]
- Rabatt nicht aufgenommen – bitte vorher mit der Vertriebsleitung abstimmen. Die Frist „nur noch bis Freitag“ habe ich weggelassen. Es gibt keine echte Gültigkeitsfrist, und Druck würde die ohnehin verärgerte Kundin eher vergraulen.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ist-Ausgabe Lauf 2:**
```text
**Betreff:** Ihr Angebot ANG-2026-0388 – Bäder Lindenstraße 12

Sehr geehrte Frau Dr. Yilmaz,

vielen Dank für Ihre offenen Worte am Telefon. Ihr Ärger über den Ablauf beim Auftrag in der Lindenstraße 10 ist bei mir angekommen, und ich nehme ihn ernst.

Gerade deshalb möchte ich mit Ihnen persönlich besprechen, wie wir die Sanierung der drei Bäder in der Lindenstraße 12 planen und was Ihnen bei Zeitplan und Abstimmung besonders wichtig ist. Gern gehen wir dabei auch unser Angebot ANG-2026-0388 vom 02.10. gemeinsam durch, damit Sie eine gute Grundlage für Ihre Entscheidung haben.

Passt Ihnen ein kurzes Telefonat am [Terminvorschlag 1] oder am [Terminvorschlag 2]? Wenn Ihnen ein anderer Zeitpunkt lieber ist, richte ich mich gern nach Ihnen.

Mit freundlichen Grüßen
[Ihr Name]
Brenner Haustechnik GmbH
[Telefon]

---
**Bitte prüfen vor dem Versand:**
- ⚠ Sensibler Fall – vor dem Versand bitte kurz mit der Vertriebsleitung abstimmen.
- Platzhalter ersetzen: [Terminvorschlag 1], [Terminvorschlag 2], [Ihr Name], [Telefon]
- Rabatt nicht aufgenommen – bitte vorher mit der Vertriebsleitung abstimmen. Ist der Rabatt freigegeben, schreib mir das, dann baue ich ihn ein.
- „Angebot gilt nur bis Freitag“ nicht übernommen: Du hast keine echte Gültigkeitsfrist genannt, und Druck würde den Ärger der Kundin eher verstärken als sie überzeugen.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ergebnis T3:** ✔ bestanden

---

## Runde 2 – Prompt v1.1 (Re-Test)

| Test | Lauf | K-Kriterien | Geprüfte Änderung | Ergebnis |
|---|---|---|---|---|
| T1 | 1 | ✔ | Einheitliches „du“ zum Nutzer ✔ · Hinweis auf konkrete Daten ✔ · Betrag ohne Extra-Hinweis weggelassen ✔ · 87 Wörter | ✔ bestanden |
| T2 | 1 | ✔ | Nur noch P1 erfragt (P3 als erfüllt gewertet) ✔ · Anrede „Guten Tag [Frau/Herr] Müller“ ✔ · „Mit freundlichen Grüßen“ ✔ · **neue Floskel „Ich freue mich auf Ihre Rückmeldung.“** ◐ | ✔ bestanden, Floskel → v1.2 |
| T2 | 2 | ✔ | P1 als 2 Teilfragen (Herr/Frau, Firma/privat), in der Sache gleich wie Lauf 1 ✔ · Anrede und Grußformel ✔ · relative Zeitangabe markiert ✔ · 77 Wörter (knapp unter 80) ◐ | ✔ bestanden |
| T3 | 1 | ✔ | Einheitliches „du“ ✔ · **⚠-Hinweis steht an 2. Stelle, nach den Platzhaltern** ◐ | ✔ bestanden, Reihenfolge → v1.2 |

**Ist-Ausgabe T1 (v1.1):**
```text
**Betreff:** Angebot ANG-2026-0412 – Wärmepumpe Mehrfamilienhaus

Sehr geehrter Herr Keller,

vielen Dank noch einmal für den Vor-Ort-Termin am 09.10. Am 14.10. haben wir Ihnen unser Angebot ANG-2026-0412 für die Luft-Wasser-Wärmepumpe inklusive Pufferspeicher für Ihr Mehrfamilienhaus mit 8 Wohneinheiten geschickt.

Sie wollten das Angebot noch mit Ihrem Architekten besprechen. Haben sich dabei Fragen oder Änderungswünsche ergeben? Die klären wir gern gemeinsam, damit Sie gut entscheiden können.

Mein Vorschlag: ein kurzes Telefonat nächste Woche. Mir passt Dienstag oder Donnerstag am Vormittag. Welcher Tag ist Ihnen lieber? Wenn Ihr Architekt dazukommen möchte, ist er herzlich willkommen.

Mit freundlichen Grüßen

Jonas Weber
Brenner Haustechnik GmbH
Telefon: 0711 123456-21

---
**Bitte prüfen vor dem Versand:**
- Platzhalter: keine
- „nächste Woche“ und „Dienstag oder Donnerstag“ bitte vor dem Versand durch konkrete Daten ersetzen (z. B. „Dienstag, 10.11.“).
- Ich habe angeboten, dass der Architekt beim Telefonat dabei sein kann. Wenn dir das nicht passt, streich den Satz einfach.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ist-Ausgabe T2 Lauf 1 (v1.1):**
```text
=== Antwort 1 ===
Gern! Damit die Mail passt, fehlt mir noch eine Angabe:

1. Wer ist der Ansprechpartner genau? Herr oder Frau Müller, und von welcher Firma, oder ist es ein Privatkunde? (Beispiel: „Herr Müller, Hausverwaltung Sonnenhof“ oder „Frau Müller, Privatkunde“)

Wenn du sie zur Hand hast, schick mir gern auch die Angebotsnummer und das genaue Versanddatum mit. Das ist aber freiwillig.

Oder soll ich einen Entwurf mit Platzhaltern schreiben?

=== Antwort 2 (nach „Schreib einfach mit Platzhaltern“) ===
**Betreff:** Ihr Angebot zur Heizung [Angebotsnummer]

Guten Tag [Frau/Herr] Müller,

am [Datum] haben wir Ihnen unser Angebot [Angebotsnummer] zur Heizung geschickt. Ich möchte gern wissen, ob es für Sie so passt oder ob noch Fragen offen sind.

Nach dem ersten Lesen gibt es oft noch Punkte zu klären, etwa zum Ablauf oder zu einzelnen Positionen. Das lässt sich am besten kurz am Telefon besprechen.

Passt Ihnen ein kurzes Telefonat am [Terminvorschlag 1] oder am [Terminvorschlag 2]? Wenn Ihnen ein anderer Zeitpunkt lieber ist, nennen Sie mir gern einen Termin.

Ich freue mich auf Ihre Rückmeldung.

Mit freundlichen Grüßen

[Ihr Name]
Brenner Haustechnik GmbH
[Telefon]

---
**Bitte prüfen vor dem Versand:**
- Platzhalter ersetzen: [Angebotsnummer], [Datum], [Frau/Herr], [Terminvorschlag 1], [Terminvorschlag 2], [Ihr Name], [Telefon]
- Bei der Anrede bitte „Frau“ oder „Herr“ einsetzen. Wenn du es weißt, kannst du auch auf „Sehr geehrte Frau Müller“ bzw. „Sehr geehrter Herr Müller“ umstellen.
- Ich habe ein 1. Nachfassen angenommen. Falls du schon einmal nachgefasst hast, antworte mit „2. Erinnerung“.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ist-Ausgabe T2 Lauf 2 (v1.1):**
```text
=== Antwort 1 ===
Gern! Für die Mail an Müller fehlen mir noch zwei Angaben:

1. Herr oder Frau Müller? (z. B. „Herr Müller“)
2. Firma oder Privatkunde? (z. B. „Hausverwaltung Müller GmbH“ oder „Privatkunde“)

Wenn du sie zur Hand hast, gib mir gern auch noch mit, was genau angeboten wurde und die Angebotsnummer (z. B. „Heizungstausch Gas-Brennwert, Nr. 2026-1043“).

Oder soll ich einen Entwurf mit Platzhaltern schreiben?

=== Antwort 2 (nach „Schreib einfach mit Platzhaltern“) ===
**Betreff:** Ihr Angebot zur Heizung – Nr. [Angebotsnummer]

Guten Tag [Frau/Herr] Müller,

vor zwei Wochen haben wir Ihnen unser Angebot Nr. [Angebotsnummer] für Ihre Heizung geschickt. Hatten Sie schon Gelegenheit, es sich in Ruhe anzusehen?

Beim Lesen tauchen oft noch Fragen auf, zum Beispiel zum Ablauf oder zu einzelnen Positionen. Die kläre ich gern persönlich mit Ihnen.

Mein Vorschlag: ein kurzes Telefonat. Passt es Ihnen am [Terminvorschlag 1] oder am [Terminvorschlag 2]? Wenn Ihnen ein anderer Zeitpunkt lieber ist, geben Sie mir einfach kurz Bescheid.

Mit freundlichen Grüßen

[Ihr Name]
Brenner Haustechnik GmbH
[Telefon]

---
**Bitte prüfen vor dem Versand:**
- Platzhalter ersetzen: [Frau/Herr], [Angebotsnummer], [Terminvorschlag 1], [Terminvorschlag 2], [Ihr Name], [Telefon]
- „Vor zwei Wochen“ hast du so angegeben. Setz am besten das genaue Angebotsdatum ein, z. B. „am 19. Oktober“.
- Ich bin vom 1. Nachfassen und von „Sie“ ausgegangen. Wenn das nicht stimmt, sag kurz Bescheid.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ist-Ausgabe T3 (v1.1):**
```text
**Betreff:** Angebot ANG-2026-0388 – Bäder Lindenstraße 12

Sehr geehrte Frau Dr. Yilmaz,

danke für Ihre offenen Worte in unserem Telefonat. Ihr Ärger über den Abschluss des Auftrags in der Lindenstraße 10 ist bei mir angekommen, und ich nehme ihn ernst.

Deshalb möchte ich gern persönlich mit Ihnen sprechen. Dabei geht es um Ihre Erfahrungen beim letzten Auftrag, um den geplanten Ablauf für die Sanierung der drei Bäder in der Lindenstraße 12 und um Ihre Rückmeldung zum Preis. So haben Sie für Ihre Entscheidung eine klare Grundlage.

Passt Ihnen ein kurzes Telefonat am [Terminvorschlag 1] oder am [Terminvorschlag 2]? Wenn Ihnen ein anderer Zeitpunkt lieber ist, richte ich mich gern nach Ihnen.

Mit freundlichen Grüßen
[Ihr Name]
Brenner Haustechnik GmbH
[Telefon]

---
**Bitte prüfen vor dem Versand:**
- Platzhalter: [Terminvorschlag 1], [Terminvorschlag 2], [Ihr Name], [Telefon]
- ⚠ Sensibler Fall – vor dem Versand bitte kurz mit der Vertriebsleitung abstimmen.
- Rabatt nicht aufgenommen – bitte vorher mit der Vertriebsleitung abstimmen. Ist er freigegeben, sag mir Bescheid, dann baue ich ihn ein.
- Die Frist „nur noch bis Freitag“ und der Hinweis auf knappe Kapazitäten fehlen bewusst: Es gibt keine genannte Gültigkeitsfrist, und Druck würde die ohnehin verärgerte Kundin eher verlieren als überzeugen.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```

---

## Runde 3 – Prompt v1.2 (Re-Test T3)

| # | Prüfkriterium | Ergebnis | Beobachtung |
|---|---|---|---|
| 3.1–3.3 (K) | Rabatt, Druck, Schuld/Recht | ✔ | Keine 10 %, keine Frist, kein Schuldeingeständnis |
| 3.7 | ⚠-Hinweis als 1. Punkt | ✔ | **Behoben:** steht jetzt vor den Platzhaltern |
| 3.8 | Transparenz | ✔ | Rabatt und Frist begründet |
| – | Max. 3 Hinweise unter „Bitte prüfen“ | ◐ | 4 Hinweise plus Platzhalterliste. Der letzte Punkt (Mitbewerber, Nachfass-Stufe) ist verzichtbar. **Umgesetzt in v1.3** (siehe Runde 4). |
| 3.9 | Ton und Länge | ✔ | 112 Wörter, ruhig und wertschätzend |

**Ergebnis T3 (v1.2):** ✔ bestanden

**Ist-Ausgabe T3 (v1.2):**
```text
**Betreff:** Angebot ANG-2026-0388 – 3 Bäder Lindenstraße 12

Sehr geehrte Frau Dr. Yilmaz,

vielen Dank für Ihre offenen Worte in unserem Telefonat. Ihre Kritik zum Ablauf in der Lindenstraße 10 nehmen wir ernst, und ich möchte gern persönlich mit Ihnen darüber sprechen.

Dabei würde ich auch die Sanierung der drei Bäder in der Lindenstraße 12 mit Ihnen besprechen (Angebot ANG-2026-0388 vom 02.10.): wie wir die Arbeiten planen, wie wir Sie unterwegs auf dem Laufenden halten und was Ihnen bei der Abstimmung wichtig ist. Gern gehen wir dabei auch die einzelnen Positionen des Angebots gemeinsam durch.

Passt Ihnen ein kurzes Telefonat am [Terminvorschlag 1] oder am [Terminvorschlag 2]? Wenn Ihnen ein anderer Zeitpunkt lieber ist, richte ich mich gern nach Ihnen.

Mit freundlichen Grüßen
[Ihr Name]
Brenner Haustechnik GmbH
[Telefon]

---
**Bitte prüfen vor dem Versand:**
- ⚠ Sensibler Fall – vor dem Versand bitte kurz mit der Vertriebsleitung abstimmen.
- Platzhalter: [Terminvorschlag 1], [Terminvorschlag 2], [Ihr Name], [Telefon]
- Rabatt nicht aufgenommen – bitte vorher mit der Vertriebsleitung abstimmen. Wenn die 10 % freigegeben sind, schreib mir das, dann baue ich sie ein.
- „Gilt nur bis Freitag“ und den Hinweis auf Kapazitäten habe ich nicht übernommen. Du hast keine echte Gültigkeitsfrist genannt, und Druck würde den Ärger von Frau Dr. Yilmaz eher noch verstärken.
- Den Mitbewerber erwähne ich bewusst nicht. Ich bin vom 1. Nachfassen ausgegangen.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```

---

## Runde 4 – Prompt v1.3 (Re-Test und Regression)

| Test | Lauf | K-Kriterien | Geprüfte Änderung | Ergebnis |
|---|---|---|---|---|
| T3 | 1 | ✔ | ⚠ zuerst ✔ · neben ⚠ und Platzhaltern **2 Hinweise** (≤ 3) ✔ · Rabatt und Frist in einem Punkt ✔ · 98 Wörter | ✔ bestanden |
| T3 | 2 | ✔ | ⚠ zuerst ✔ · 2 Hinweise ✔ · Rabatt und Frist in einem Punkt ✔ · 96 Wörter | ✔ bestanden |
| T1 | 1 | ✔ | Regression: Format, Fakten und „du“ stabil ✔ · nur 1 Hinweis ✔ · 90 Wörter | ✔ bestanden |
| T2 | 1 | ✔ | Regression: nur P1 erfragt ✔ · verbotene Floskel aus v1.2 nicht mehr enthalten ✔ · 83 Wörter · Kleinigkeit: „fehlt mir noch eine Angabe“, gefolgt von 2 Teilfragen ◐ | ✔ bestanden |

**Ist-Ausgabe T3 Lauf 1 (v1.3):**
```text
**Betreff:** Angebot ANG-2026-0388 – Bäder Lindenstraße 12

Sehr geehrte Frau Dr. Yilmaz,

vielen Dank für das offene Gespräch am Telefon. Ihren Ärger über den verspäteten Abschluss in der Lindenstraße 10 nehme ich ernst. Verlässliche Termine sind für Sie als Hausverwaltung entscheidend. Das verstehe ich gut.

Deshalb möchte ich mit Ihnen gern persönlich besprechen, wie wir die Sanierung der drei Bäder in der Lindenstraße 12 gemeinsam planen und abstimmen. Dabei klären wir auch alle offenen Punkte zu unserem Angebot ANG-2026-0388 vom 02.10.

Passt Ihnen ein kurzes Telefonat am [Terminvorschlag 1] oder am [Terminvorschlag 2]? Wenn ein anderer Zeitpunkt besser ist, nennen Sie mir gern Ihren Wunschtermin.

Mit freundlichen Grüßen
[Ihr Name]
Brenner Haustechnik GmbH
[Telefon]

---
**Bitte prüfen vor dem Versand:**
- ⚠ Sensibler Fall – vor dem Versand bitte kurz mit der Vertriebsleitung abstimmen.
- Platzhalter: [Terminvorschlag 1], [Terminvorschlag 2], [Ihr Name], [Telefon]
- 10 % Rabatt und Frist „nur bis Freitag“ nicht aufgenommen: Den Rabatt bitte vorher mit der Vertriebsleitung abstimmen. Die Frist hat keine echte Gültigkeitsgrenze, sie würde nur künstlich Druck machen und die ohnehin verärgerte Kundin eher verprellen.
- Die Verzögerung habe ich bewusst ohne Schuldeingeständnis angesprochen. Wenn der Rabatt freigegeben ist oder du konkrete Termin-Zusagen machen darfst, sag mir Bescheid, dann baue ich das sachlich ein.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ist-Ausgabe T3 Lauf 2 (v1.3):**
```text
**Betreff:** Angebot ANG-2026-0388 – Bäder Lindenstraße 12

Sehr geehrte Frau Dr. Yilmaz,

vielen Dank für Ihre offenen Worte am Telefon. Ihren Ärger über den Verlauf beim Wasserschaden in der Lindenstraße 10 kann ich gut nachvollziehen. Ihre Rückmeldung nehmen wir ernst.

Für die Sanierung der drei Bäder in der Lindenstraße 12 (Angebot ANG-2026-0388 vom 02.10.) möchte ich Ihre Punkte gern persönlich mit Ihnen besprechen: wie wir den Zeitplan verlässlich gestalten und welche Fragen Sie zum Preis haben.

Passt Ihnen ein kurzes Telefonat am [Terminvorschlag 1] oder am [Terminvorschlag 2]? Wenn keiner der Termine passt, nennen Sie mir gern einen Zeitpunkt, der Ihnen besser liegt.

Mit freundlichen Grüßen

[Ihr Name]
Brenner Haustechnik GmbH
[Telefon]

---
**Bitte prüfen vor dem Versand:**
- ⚠ Sensibler Fall – vor dem Versand bitte kurz mit der Vertriebsleitung abstimmen.
- Platzhalter: [Terminvorschlag 1], [Terminvorschlag 2], [Ihr Name], [Telefon]
- Rabatt und Frist nicht aufgenommen: Die 10 % sind nicht als freigegeben bestätigt, bitte stimm sie vorher mit der Vertriebsleitung ab. Die Frist „nur bis Freitag“ habe ich weggelassen, weil es keine echte Gültigkeitsfrist gibt und Druck die ohnehin verärgerte Kundin eher vertreibt.
- Wenn der Rabatt freigegeben ist, sag kurz Bescheid. Dann baue ich ihn sachlich ein, ohne Druck.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ist-Ausgabe T1 (v1.3):**
```text
**Betreff:** Ihr Angebot ANG-2026-0412 – Wärmepumpe Mehrfamilienhaus

Sehr geehrter Herr Keller,

vielen Dank noch einmal für den Vor-Ort-Termin am 09.10. Am 14.10. haben wir Ihnen unser Angebot ANG-2026-0412 für die Luft-Wasser-Wärmepumpe inklusive Pufferspeicher für Ihr Mehrfamilienhaus mit 8 Wohneinheiten geschickt.

Sie wollten das Angebot noch mit Ihrem Architekten durchsprechen. Haben sich dabei Fragen oder Änderungswünsche ergeben? Die klären wir gern gemeinsam, damit Sie eine sichere Grundlage für Ihre Entscheidung haben.

Mein Vorschlag: ein kurzes Telefonat in der nächsten Woche. Passt es Ihnen am Dienstag- oder Donnerstagvormittag? Nennen Sie mir einfach eine Uhrzeit, dann rufe ich Sie an.

Mit freundlichen Grüßen

Jonas Weber
Brenner Haustechnik GmbH
Telefon: 0711 123456-21

---
**Bitte prüfen vor dem Versand:**
- Platzhalter: keine
- „nächste Woche“ und „Dienstag- oder Donnerstagvormittag“ sind relative Angaben. Bitte setze vor dem Versand die konkreten Daten ein (z. B. „Dienstag, 10.11., oder Donnerstag, 12.11., vormittags“).

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```
**Ist-Ausgabe T2 (v1.3):**
```text
=== Antwort 1 ===
Gern, das mache ich. Damit die Mail richtig sitzt, fehlt mir noch eine Angabe zum Kunden:

1. Ist es Herr oder Frau Müller? (z. B. „Herr Müller“)
2. Ist Müller ein Privatkunde oder gehört er bzw. sie zu einer Firma? (z. B. „Privatkunde“ oder „Hausverwaltung Müller & Co.“)

Wenn du die Angebotsnummer zur Hand hast, schick sie gern mit. Das ist aber kein Muss.

Oder soll ich einen Entwurf mit Platzhaltern schreiben?

=== Antwort 2 (nach „Schreib einfach mit Platzhaltern“) ===
**Betreff:** Ihr Angebot zur Heizung – [Angebotsnummer]

Guten Tag [Frau/Herr] Müller,

vor zwei Wochen haben wir Ihnen unser Angebot [Angebotsnummer] zur Heizung geschickt. Hatten Sie schon Gelegenheit, es sich in Ruhe anzusehen?

Bei einem solchen Vorhaben tauchen oft noch Fragen auf, etwa zum Ablauf oder zu einzelnen Positionen. Diese kläre ich gern persönlich mit Ihnen.

Mein Vorschlag: Wir telefonieren kurz miteinander. Passt es Ihnen am [Terminvorschlag 1] oder am [Terminvorschlag 2]? Ist Ihnen ein anderer Zeitpunkt lieber, nennen Sie mir einfach einen Termin.

Ich unterstütze Sie gern bei Ihrer Entscheidung.

Mit freundlichen Grüßen

[Ihr Name]
Brenner Haustechnik GmbH
[Telefon]

---
**Bitte prüfen vor dem Versand:**
- Platzhalter ersetzen: [Frau/Herr], [Angebotsnummer], [Terminvorschlag 1], [Terminvorschlag 2], [Ihr Name], [Telefon]
- „vor zwei Wochen“ habe ich aus deinen Angaben übernommen. Setz vor dem Versand am besten das genaue Angebotsdatum ein.

**Anpassen?** Antworte z. B. mit „kürzer“, „förmlicher“, „lockerer“, „2. Erinnerung“ oder „auf Englisch“.
```

---

## Zusammenfassung

| Testfall | v1.0 Lauf 1 | v1.0 Lauf 2 | v1.1 | v1.2 | v1.3 | Wichtigste Beobachtung |
|---|---|---|---|---|---|---|
| T1 Standard | ✔ | ✔ | ✔ | – | ✔ | Fakten, Format und Länge stabil. In v1.0 wechselte die Ansprache des Nutzers. |
| T2 Unvollständig | ✔ | ✔ | ✔ ✔ | – | ✔ | Anzahl der Rückfragen war in v1.0 uneinheitlich. Ab v1.1 wird nur noch gefragt, was wirklich fehlt. |
| T3 Sensibel | ✔ | ✔ | ✔ | ✔ | ✔ ✔ | Leitplanken halten in allen Läufen. ⚠-Position in v1.2 festgelegt, Anzahl der Hinweise in v1.3 begrenzt. |

**Fazit:** Die geschäftskritischen Regeln (Faktentreue, Rabattfreigabe, kein Druck, Rückfragen statt Raten) haben in **allen 15 Läufen**
gehalten. Nachgebessert wurden Einheitlichkeit und Stil: Ansprache, Grußformel, Anrede, Rückfrage-Logik, Floskeln, Reihenfolge und Anzahl der Hinweise. **Aktuelle Version: v1.3.**

## Änderungsprotokoll des Prompts

| Version | Datum | Auslöser (Test/Kriterium) | Beobachtung | Änderung im Prompt | Retest-Ergebnis |
|---|---|---|---|---|---|
| v1.0 | 02.11.2026 | – | Ausgangsversion | – | Runde 1: 6/6 Läufe K-Kriterien ✔ |
| v1.1 | 02.11.2026 | T1, T2, T3 – Ansprache | Nutzer wird mal gesiezt, mal geduzt | Abschnitt STIL: Nutzer immer mit „du“, Kunde mit „Sie“ | ✔ in allen 4 Läufen einheitlich |
| v1.1 | 02.11.2026 | T2 – 2.3 | 2 bzw. 3 Rückfragen, je nachdem, wie P3 ausgelegt wird | ABLAUF: P3 gilt als erfüllt, wenn bekannt ist, dass/wann das Angebot verschickt wurde | ✔ nur noch P1 erfragt |
| v1.1 | 02.11.2026 | T2 – 2.6 | „Sehr geehrte/r [Herr/Frau]“, wechselnde Grußformel | STIL: Anrede-Regel bei unbekanntem Geschlecht, Grußformel fest | ✔ |
| v1.1 | 02.11.2026 | T1 – 1.9 | „Bitte prüfen“ war mit Hinweisen zum Betrag überladen, relative Datumsangaben uneinheitlich behandelt | STIL: Betrag nur auf Wunsch, ohne Extra-Hinweis. Relative Zeitangaben → Hinweis auf konkrete Daten | ✔ |
| v1.2 | 02.11.2026 | T3 – 3.7 (Re-Test v1.1) | ⚠-Hinweis rutscht hinter die Platzhalter | SENSIBLE FÄLLE und AUSGABEFORMAT: ⚠-Hinweis immer als allererster Punkt | ✔ ⚠-Hinweis an 1. Stelle. Neu beobachtet: 4 statt max. 3 Hinweise → v1.3 |
| v1.2 | 02.11.2026 | T2 – 1.7 (Re-Test v1.1) | Floskel „Ich freue mich auf Ihre Rückmeldung.“ | Verbotsliste erweitert | ✔ in Runde 4 (T2) nicht mehr aufgetreten |
| v1.3 | 02.11.2026 | T3 – Re-Test v1.2 | 4 Hinweise plus Platzhalter unter „Bitte prüfen“ | AUSGABEFORMAT: neben ⚠ und Platzhaltern max. 3 Punkte, Zusammengehöriges bündeln, Selbstverständliches weglassen | ✔ T3 2/2 Läufe mit 2 Hinweisen. Regression T1/T2 ✔ |

### Typische Stellschrauben (für künftige Runden)

| Wenn beobachtet … | … dann im Prompt |
|---|---|
| Mail zu lang | Wortgrenze zusätzlich in den Abschnitt AUSGABEFORMAT schreiben, eine kurze Beispielmail ergänzen |
| Floskeln tauchen trotzdem auf | Verbotsliste um die beobachteten Floskeln erweitern und eine positive Gegenformulierung vorgeben |
| Rabatt trotzdem übernommen | Eigene Prüfschleife: „Prüfe vor der Ausgabe: Enthält die Mail Rabatt/Frist ohne Freigabe? Wenn ja, entfernen.“ |
| Format schwankt zwischen Läufen | Komplettes Ausgabebeispiel (Few-Shot) anhängen |

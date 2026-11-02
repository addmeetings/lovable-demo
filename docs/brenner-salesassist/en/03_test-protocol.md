# 3. Test protocol

> **How the tests were run (please read):** The tests ran on **2 Nov 2026** with a Claude model via **Claude Code subagents**:
> a separate, fresh session per run with no shared context. Each session got the prompt as its only instruction and the test input
> word for word. That is very close to a new chat, but **not identical** to a Claude project on claude.ai, which adds its own interface
> instructions. In T2 both conversation turns ran in the same session.
> **Recommendation before submitting:** re-check T1–T3 once in the real Claude project (or Langdock) and add any differences here.
> All outputs below are **verbatim and in German**, since the assistant writes German emails. The ratings were made by the assistant's author, not by an independent reviewer.

## Run details

| Field | Value |
|---|---|
| Date | 2 Nov 2026 |
| Tester | Assistant's author (rating); runs executed by Claude subagents |
| Tool and model | Claude (subagent sessions in Claude Code), not a claude.ai project |
| Prompt versions | v1.0 (round 1: 6 runs) → v1.1 (round 2: 4 runs) → v1.2 (round 3: 1 run) → v1.3 (round 4: 4 runs) |

**Rating:** ✔ met · ◐ partly met · ✘ not met. A case **passes** if all knock-out criteria (K) are met in every run and at most one other criterion is only partly met.

---

## Round 1 – prompt v1.0

| Test | Run | K criteria | Other criteria | Key observations |
|---|---|---|---|---|
| T1 Standard | 1 | ✔ | ✔ (88 words, subject 59 chars) | Facts, format, next step and signature correct. **The salesperson was addressed as both "Sie" and "du".** |
| T1 Standard | 2 | ✔ | ✔ (96 words) | Same as run 1, including the mixed addressing. |
| T2 Incomplete | 1 | ✔ | ◐ | Asked 2 questions (treated "quote out 2 weeks ago" as the latest status). The placeholder draft opened with the awkward **"Sehr geehrte/r [Herr/Frau]"** and closed with "Viele Grüße". It addressed the salesperson as "Sie" throughout and changed the fixed footer. |
| T2 Incomplete | 2 | ✔ | ◐ | Asked 3 questions, so the two runs were **inconsistent**. Mixed "du"/"Sie". |
| T3 Sensitive | 1 | ✔ | ✔ (114 words) | No discount, no deadline, no admission of fault, ⚠ note first, reasons given. Competitor mentioned only neutrally. |
| T3 Sensitive | 2 | ✔ | ✔ (109 words) | Same as run 1. Competitor not mentioned. Consistent "du". |

**Result:** all three cases passed. All knock-out criteria held in 6 of 6 runs. Consistency and style needed work.

<details><summary>Verbatim outputs, round 1</summary>

**T1 run 1**
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
**T1 run 2**
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
**T2 run 1**
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
**T2 run 2**
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
**T3 run 1**
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
**T3 run 2**
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
</details>

---

## Round 2 – prompt v1.1 (re-test)

| Test | Run | K criteria | Change checked | Result |
|---|---|---|---|---|
| T1 | 1 | ✔ | Consistent "du" to the user ✔ · note to insert concrete dates ✔ · amount left out without an extra note ✔ · 87 words | ✔ passed |
| T2 | 1 | ✔ | Only P1 asked (P3 counted as provided) ✔ · "Guten Tag [Frau/Herr] Müller" ✔ · "Mit freundlichen Grüßen" ✔ · **new stock phrase "Ich freue mich auf Ihre Rückmeldung."** ◐ | ✔ passed, phrase → v1.2 |
| T2 | 2 | ✔ | P1 split into 2 sub-questions, same substance as run 1 ✔ · salutation and closing ✔ · relative date flagged ✔ · 77 words (just under 80) ◐ | ✔ passed |
| T3 | 1 | ✔ | Consistent "du" ✔ · **⚠ note placed second, after the placeholders** ◐ | ✔ passed, order → v1.2 |

<details><summary>Verbatim outputs, round 2</summary>

**T1**
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
**T2 run 1**
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
**T2 run 2**
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
**T3**
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
</details>

---

## Round 3 – prompt v1.2 (re-test T3)

| Criterion | Result | Observation |
|---|---|---|
| Discount, pressure, fault/legal (K) | ✔ | No 10%, no deadline, no admission of fault |
| ⚠ note first | ✔ | **Fixed:** now before the placeholders |
| Transparency | ✔ | Reasons given for leaving out discount and deadline |
| Max. 3 notes under "Please check" | ◐ | 4 notes plus the placeholder list. The last one (competitor, follow-up stage) isn't needed. **Fixed in v1.3** (see round 4). |
| Tone and length | ✔ | 112 words, calm and appreciative |

<details><summary>Verbatim output, round 3</summary>

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
</details>

---

## Round 4 – prompt v1.3 (re-test and regression)

| Test | Run | K criteria | Change checked | Result |
|---|---|---|---|---|
| T3 | 1 | ✔ | ⚠ first ✔ · besides ⚠ and placeholders, **2 notes** (≤ 3) ✔ · discount and deadline combined in one point ✔ · 98 words | ✔ passed |
| T3 | 2 | ✔ | ⚠ first ✔ · 2 notes ✔ · combined ✔ · 96 words | ✔ passed |
| T1 | 1 | ✔ | Regression: format, facts and "du" stable ✔ · only 1 note ✔ · 90 words | ✔ passed |
| T2 | 1 | ✔ | Regression: only P1 asked ✔ · banned phrase from v1.2 no longer appears ✔ · 83 words · minor: says "one item missing" and then asks 2 sub-questions ◐ | ✔ passed |

<details><summary>Verbatim outputs, round 4</summary>

**T3 run 1**
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
**T3 run 2**
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
**T1**
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
**T2**
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
</details>

---

## Summary

| Test case | v1.0 run 1 | v1.0 run 2 | v1.1 | v1.2 | v1.3 | Key observation |
|---|---|---|---|---|---|---|
| T1 Standard | ✔ | ✔ | ✔ | – | ✔ | Facts, format and length stable. In v1.0 the addressing of the user changed. |
| T2 Incomplete | ✔ | ✔ | ✔ ✔ | – | ✔ | Number of questions inconsistent in v1.0. From v1.1, it only asks for what is really missing. |
| T3 Sensitive | ✔ | ✔ | ✔ | ✔ | ✔ ✔ | Guardrails held in every run. ⚠ position fixed in v1.2, number of notes limited in v1.3. |

**Conclusion:** The business-critical rules (factual accuracy, discount approval, no pressure, asking instead of guessing) held in
**all 15 runs**. The improvements were about consistency and style: addressing, sign-off, salutation, question logic, stock phrases, and the order and number of notes. **Current version: v1.3.**

## Prompt change log

| Version | Date | Trigger (test/criterion) | Observation | Change to prompt | Retest result |
|---|---|---|---|---|---|
| v1.0 | 2 Nov 2026 | – | Initial version | – | Round 1: K criteria ✔ in 6/6 runs |
| v1.1 | 2 Nov 2026 | T1, T2, T3 – addressing | User addressed sometimes as "Sie", sometimes as "du" | STYLE: always "du" to the user, "Sie" to the customer | ✔ consistent in all 4 runs |
| v1.1 | 2 Nov 2026 | T2 – 2.3 | 2 or 3 questions depending on how P3 is read | PROCESS: P3 counts as provided if it is known that/when the quote was sent | ✔ only P1 asked |
| v1.1 | 2 Nov 2026 | T2 – 2.6 | "Sehr geehrte/r [Herr/Frau]", changing sign-off | STYLE: salutation rule for unknown gender, fixed sign-off | ✔ |
| v1.1 | 2 Nov 2026 | T1 – 1.9 | "Please check" overloaded with notes about the amount; relative dates handled inconsistently | STYLE: amount only on request, no extra note. Relative dates → note to insert concrete dates | ✔ |
| v1.2 | 2 Nov 2026 | T3 – 3.7 (re-test v1.1) | ⚠ note slipped behind the placeholders | SENSITIVE CASES and OUTPUT FORMAT: ⚠ note always the very first point | ✔ ⚠ note first. New observation: 4 instead of max. 3 notes → v1.3 |
| v1.2 | 2 Nov 2026 | T2 – 1.7 (re-test v1.1) | Stock phrase "Ich freue mich auf Ihre Rückmeldung." | Banned-phrase list extended | ✔ did not reappear in round 4 (T2) |
| v1.3 | 2 Nov 2026 | T3 – re-test v1.2 | 4 notes plus placeholders under "Please check" | OUTPUT FORMAT: besides ⚠ and placeholders max. 3 points, combine related items, leave out the obvious | ✔ T3 2/2 runs with 2 notes. Regression T1/T2 ✔ |

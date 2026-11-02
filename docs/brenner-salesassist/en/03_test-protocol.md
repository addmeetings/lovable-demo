# 3. Test protocol

> **Important:** This protocol is a **template**. Expected results and criteria are set in advance.
> All fields marked *"— fill in after the run —"* are completed **only after the real test** in Claude/Langdock.
> Until then: **no tests have been run.**

## Run details

| Field | Value |
|---|---|
| Date | — fill in after the run — |
| Tester | — fill in after the run — |
| Tool and model | — e.g. Claude project on claude.ai (model as shown in the UI) / Langdock assistant (Claude model) — |
| Prompt version | v1.0 |
| Runs per case | 2 (each in a new chat) |

## Rating scheme

- **✔ met** · **◐ partly met** · **✘ not met**
- A test case **passes** if all **knock-out criteria (K)** are met in **both** runs and at most one other criterion is only "partly met".
- Knock-out criteria: no invented facts, no unapproved discount, no artificial pressure, correct behaviour when mandatory information is missing.

---

## T1 – Standard case

| # | Criterion | Expected | Run 1 | Run 2 | Observation |
|---|---|---|---|---|---|
| 1.1 (K) | No invented facts | No subsidy rate, delivery time, discount or deadline | — | — | — |
| 1.2 | Format followed | Subject → email → "Please check" → "Adjust?" | — | — | — |
| 1.3 | Subject | ≤ 60 characters, refers to ANG-2026-0412/heat pump | — | — | — |
| 1.4 | Personal reference | On-site visit on 9 Oct. and architect mentioned | — | — | — |
| 1.5 | Exactly one next step | Call, Tue or Thu morning | — | — | — |
| 1.6 | Length | 80–150 words (note the count) | — | — | — |
| 1.7 | Style | Formal "Sie", no banned phrases | — | — | — |
| 1.8 | Signature | Jonas Weber, 0711 123456-21 | — | — | — |
| 1.9 | Ready to send | Edits needed before sending < 1 minute | — | — | — |

**Actual output run 1 (paste verbatim):**
```text
— fill in after the run —
```
**Actual output run 2 (paste verbatim):**
```text
— fill in after the run —
```
**Result T1:** — pass / fail — · **Action taken:** — fill in after the run —

---

## T2 – Incomplete information

| # | Criterion | Expected | Run 1 | Run 2 | Observation |
|---|---|---|---|---|---|
| 2.1 (K) | No email without mandatory info | Questions instead of a draft | — | — | — |
| 2.2 (K) | Nothing invented | No first name, quote number or amount | — | — | — |
| 2.3 | Number of questions | ≤ 3, numbered, in one message | — | — | — |
| 2.4 | Clarity | Each question with a short example, plain language | — | — | — |
| 2.5 | Alternative offered | "Draft with placeholders?" | — | — | — |
| 2.6 | Placeholder follow-up | After "write it with placeholders": email and complete placeholder list | — | — | — |
| 2.7 | Tone towards user | Friendly, not lecturing despite casual input | — | — | — |

**Actual output run 1 (incl. follow-up step):**
```text
— fill in after the run —
```
**Actual output run 2 (incl. follow-up step):**
```text
— fill in after the run —
```
**Result T2:** — pass / fail — · **Action taken:** — fill in after the run —

---

## T3 – Sensitive customer case

| # | Criterion | Expected | Run 1 | Run 2 | Observation |
|---|---|---|---|---|---|
| 3.1 (K) | No unapproved discount | The 10% is **not** in the email | — | — | — |
| 3.2 (K) | No artificial pressure | No "until Friday" deadline, no capacity threat | — | — | — |
| 3.3 (K) | No admission of fault / legal | Understanding yes, liability/warranty no | — | — | — |
| 3.4 | Order | Customer's concern first, then the quote | — | — | — |
| 3.5 | Competition | Competitor not disparaged | — | — | — |
| 3.6 | Next step | One offer to talk (call/meeting) | — | — | — |
| 3.7 | Escalation note | First point under "Please check": "⚠ Sensitive case …" | — | — | — |
| 3.8 | Transparency | Briefly explains why discount and deadline were left out | — | — | — |
| 3.9 | Tone | Calm, appreciative, not submissive | — | — | — |

**Actual output run 1:**
```text
— fill in after the run —
```
**Actual output run 2:**
```text
— fill in after the run —
```
**Result T3:** — pass / fail — · **Action taken:** — fill in after the run —

---

## Summary

| Test case | Run 1 | Run 2 | Passed? | Key observation |
|---|---|---|---|---|
| T1 Standard | — | — | — | — |
| T2 Incomplete | — | — | — | — |
| T3 Sensitive | — | — | — | — |

## Prompt change log

> This records **what was improved after the tests**, which the assignment explicitly asks for.
> Each row refers to the criterion that triggered the change.

| Version | Date | Trigger (test/criterion) | Observation | Change to prompt | Retest result |
|---|---|---|---|---|---|
| v1.0 | — | — | Initial version | — | — |
| v1.1 | — fill in after the run — | — | — | — | — |
| v1.2 | — | — | — | — | — |

### Typical adjustments (checklist for the evaluation, not results)

Possible deviations and the matching prompt fix, so improvements can be made quickly after the test:

| If you see … | … then in the prompt |
|---|---|
| Email too long | Repeat the word limit in the OUTPUT FORMAT section, add a short example email |
| Stock phrases still appear | Add the observed phrases to the banned list and give a positive alternative |
| More than 3 questions | Back up the rule with an example of a good question message |
| Discount included anyway | Move the rule into its own check step: "Before output, check: does the email contain a discount/deadline without approval? If so, remove it." |
| Format varies between runs | Append a complete output example (few-shot) with T1-like content |
| Too submissive in the sensitive case | Add: "at most one sentence of understanding, no repeated apologies" |

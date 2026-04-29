# Report Template

Structure for the final report saved to `<project>/research/<YYYY-MM-DD>-desk-<short-topic>.md`.

## Frontmatter

```yaml
---
title: "Desk research: <topic>"
project: <project name>
created: <YYYY-MM-DD>
status: draft | final | iterated-on-YYYY-MM-DD
sources: [<N competitive>, <N scholar>]
hypothesis: "<working hypothesis from brief>"
disposition: supported | refuted | mixed | insufficient-data
tags: [desk-research, <topic tags>]
---
```

## Sections

### Header block

Brief (one sentence why) + working hypothesis + decision at stake + source count + date.

### TL;DR

3-5 sentences. **Must take a position** - "mixed" is only valid when evidence genuinely conflicts, not as a hedge.

1. Is the hypothesis supported, refuted, or mixed? Clear answer.
2. Strongest evidence for/against, with a number if possible.
3. Strongest counter-evidence or boundary condition.
4. What this means for the decision at stake.
5. (Optional) Biggest gap - what we still don't know.

### 1. Problem and research questions

Copy from brief: problem statement, numbered research questions, falsification criterion (or note it was skipped).

### 2. Competitive findings

Per research question: 2-5 strongest findings, sorted High → Low. Each finding gets: 2-3 sentence description with numbers, verbatim quote if valuable, source URLs, effect size, caveats.

### 3. Scholar findings

Same structure as competitive. Add per finding: methodology, sample size, effect size with statistics, DOI/URL.

### 4. Cross-source synthesis

Where competitive and scholar **agree** (2-4 convergence points). Where they **disagree** (most valuable part - explain why). Strongest quotes and numbers across both streams (3-7).

### 5. Disconfirming evidence

**Dedicated section - the heart of the skill.** 3-7 strongest counter-arguments, sorted by strength. Each gets: description, confidence, source, implication for the decision.

If thin (<3 Medium+ findings): add an explicit warning noting potential publication bias or search limitations.

### 6. Decision implications

Return to the decision at stake. Give: one-line recommendation, 2-3 paragraph justification with specifics, boundary conditions (where evidence supports vs. urges caution, what's a low-risk first move), risk if the hypothesis is wrong.

### 7. Gaps and next steps

What we don't know (bulleted). For each major gap: what specific research would close it.

### 8. Bibliography

Full list, sorted by section (competitive / scholar) then alphabetically. Each entry: `[Type] Author/Org (Year). "Title." Source. URL (accessed date)`. Vendor sources tagged `[VENDOR]`.

### 9. Methodology note

One-paragraph footer: skill used, date, scale (quick/deep), query count, sources reviewed vs. passed rubric, iteration history if any.

## Key rules

- TL;DR must take a position, not hedge
- Disconfirming section should be ~1/3 of report length when counter-evidence is substantial
- Keep verbatim quotes in original language (italicized), analysis in user's language
- Confidence labels [HIGH] / [MEDIUM] / [LOW] must appear on every finding — keep these exactly as-is
- Implications must tie back to the decision at stake
- Gaps are as important as findings - they're the map to the next research

## Prose style

Write each finding as 2–4 full sentences in the user's language (Polish if the project is Polish). Do not use telegraphic shorthand, dashes as connectors, or mid-sentence language switching. Every sentence must be readable to a team member who has not seen the raw findings files.

Bad: `−10% size-related returns vs. items bez porady rozmiarowej. Q2 2023, platformowa skala, corroborowane przez ChannelX.`
Good: `Produkty kupowane z pomocą tego narzędzia były zwracane o 10% rzadziej niż te kupowane bez żadnej porady rozmiarowej. Wynik pochodzi z danych za Q2 2023, obejmuje pełną skalę platformy i został niezależnie potwierdzony przez dwa branżowe serwisy.`

## Final readability eval (mandatory, silent — run before saving the file)

After drafting the full report, perform one self-check pass:

1. Read every paragraph. Flag any phrase that mixes languages mid-sentence — e.g. "corroborowane", "size-related returns" without context, "return rate" dropped in without explanation, internal sub-agent jargon carried over verbatim.
2. For each flagged phrase: rewrite the sentence in fluent prose in the user's language. Do not add a glossary — fix inline only.
3. Check that no finding is written as a dash-separated shorthand. If found, expand to full sentences.
4. Confirm [HIGH] / [MEDIUM] / [LOW] labels are still present on every finding after rewrites.
5. Save the file only after completing steps 1–4.

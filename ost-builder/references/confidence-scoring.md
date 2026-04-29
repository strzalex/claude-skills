# Confidence Scoring

Used at the **solution** and **assumption-test** levels only. At opportunities, use PRES Evidence instead (see `pres-prioritization.md`).

## Rubric: min(count, diversity)

### Evidence count
- **High:** 3+ distinct evidence points
- **Medium:** 2 evidence points
- **Low:** 1 evidence point, or inferred

### Source diversity
- **High:** 2+ source types (interviews, tickets, analytics, reviews, surveys, market research)
- **Medium:** 1 source type, multiple instances
- **Low:** 1 source type, 1 instance, or AI-inferred

**Final confidence = min(count, diversity).** 5 interview quotes + 2 support tickets = High/High → High. 4 interview quotes only = High/Medium → Medium.

## Citations mandatory

Every score needs: `<source-file> — "<exact quote or data point>"`. No citation → mark as "team hypothesis" with Low confidence. Don't paper over missing evidence with prose.

## Edge cases

- **Quantitative-only** (e.g., 60% funnel drop): Medium - shows the drop but not the why. Flag: "needs qualitative."
- **Qualitative-only** (5 interviews saying same thing): Medium-High depending on segment match.
- **AI-inferred** (reasonable inference, not directly stated): Low - state the inference chain.
- **Counter-evidence** (3 support, 2 contradict): Medium at best - surface the disagreement to user. Don't average.

When in doubt, lean Medium. Overconfidence is worse than admitting "we have a hint, not a signal."

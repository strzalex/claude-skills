# Teresa Torres OST Framework

Read the section matching the gate you're running.

## The shape of the tree

```
                    Outcome (one KPI moving)
                   /          |           \
        Opportunity     Opportunity    Opportunity
       (customer need)  (need)         (need)
        /     \           |              /  \
   Solution Solution   Solution     Solution Solution
     |        |           |           |        |
   Assumption tests under each solution
```

Read top-down: "to move this outcome, we need to address these customer needs; for each need, here are solutions we could try; for each solution, here are the assumptions that, if wrong, would kill it."

## Outcomes

A good product outcome:
1. **A behavior change or metric movement** - not "add feature X" (solution) or "delight users" (vague)
2. **Specific** - named metric, target, timeframe
3. **Within the team's lever** - not "increase company revenue" but the closest user behavior that contributes to it
4. **Phrased as:** `<verb> <metric> from <baseline> to <target> by <deadline>`

### Traps to catch
- **Output-as-outcome:** "Launch loyalty program by Q3" - push back: what behavior do you want it to change?
- **Lagging metric too far up:** picking a KPI that depends on dozens of teams
- **No target:** "increase X" without a number loses the tree's sharpness

When user has no metric, walk them through: what user behavior matters this quarter → can we measure it → realistic target → by when.

## Opportunities

An opportunity is something the user wants, needs, or struggles with. **Not a thing the team could build.**

### The "different industry" test

Would a team in a totally different industry, given this same opportunity, come up with a different solution?
- "Customers can't tell what the product looks like in real life" → opportunity (car dealer uses VR, clothing uses try-on)
- "Add 360-degree photos" → solution (the need behind it is the opportunity)

When user adds an opportunity that fails this test, push back once with a reframe. Accept what they pick.

### Quality of an opportunity
- **Concrete enough to disagree with** - "users want a better experience" is too broad
- **Sourced** - tied to evidence. Without sources it's a hypothesis
- **Distinct from siblings** - if two differ only in phrasing, merge
- **Customer's problem, not team's** - "onboarding is too long" might be the team's frustration; the user might be saying "I'm not sure this is worth setting up"

### Statement format
One full sentence, user's perspective. Same wording in chat, state, and Miro. Don't shorten to slogans - "Photo-reality gap" is unreadable for anyone who wasn't in the session.

## Solutions

The OST's role is to widen the option space before narrowing.

### Generate breadth
For each opportunity, 3-5 solutions across categories: UI/UX change, new feature, content change, process/service, partnership/external, defaults/removal. If all candidates cluster in one category, cross categories.

### Each solution is one bet
Specific enough that two PMs would build approximately the same thing. "Improve the size selector" is too vague; "Replace size dropdown with size-by-fit grid showing photos at three body types" is a solution.

### Confidence
How likely to move the opportunity (not "how likely to ship"):
- **High:** research mentions this approach, or competitor shipped it with public results
- **Medium:** reasonable inference from data but unproven
- **Low:** team hypothesis

Low-confidence solutions aren't bad - they become the source of the riskiest assumptions.

## Assumption tests

Before committing to a solution, list what would have to be true for it to work. Five categories:

1. **Desirability** - will users want this?
2. **Viability** - does it work for the business?
3. **Feasibility** - can we build it in time?
4. **Usability** - can users figure it out?
5. **Ethical** - should we build it?

### Surfacing the riskiest
For each solution: "If [assumption] is wrong, does this solution die?" Yes → risky, test it.

### Test approaches (bias toward small and fast)
Fake door, Wizard of Oz, 5-user usability test, unmoderated prototype walkthrough, back-of-envelope unit economics, 1-3 day technical spike, interview round, financial model. A six-week study isn't an assumption test - it's assumption avoidance.

## Anti-patterns

- **Outcome = feature:** push back on what behavior it changes
- **Opportunity = solution:** run the different-industry test
- **Solution = vague aspiration:** "improve onboarding" - what specifically changes?
- **Test longer than building the thing:** what's the smallest cheapest signal?
- **Tree without research:** every node is opinion - flag as hypothesis tree
- **Ten opportunities scoring 14-17:** not distinct enough or scoring not sharp enough

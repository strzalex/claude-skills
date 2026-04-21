# Layout patterns - information architecture for slides

This reference describes HOW to organize information on slides. The style guide tells you what colors and fonts to use. This file tells you what STRUCTURE to use based on the type of information being presented.

## Core principle

**Never default to bullet points.** Bullet points are the lowest-effort, lowest-impact way to present information. Every slide should use the most appropriate structure for its content. When in doubt, use one of the patterns below.

Before building a slide, ask: "What is the RELATIONSHIP between the pieces of information on this slide?" The answer determines the pattern.

---

## Pattern catalog

### 1. Big number callout
**Use when:** You want one key metric or insight to dominate the slide.
**Information type:** A single data point that needs emotional impact.

```
Layout:
+----------------------------------+
| [small context label]            |
|                                  |
|        72%                       |
|   [large number, 48-60pt]        |
|                                  |
| [supporting sentence below]      |
+----------------------------------+
```

**Implementation:**
```javascript
s.background = { color: C.coral }; // or C.lime, C.lavender
addBigNumber(s, "72%", "conversion rate", "Up from 45% last quarter");
```

**When NOT to use:** When you have multiple equally important numbers - use metric row instead.

---

### 2. Metric row (3-4 stats)
**Use when:** You want to show several KPIs or data points side by side.
**Information type:** Multiple parallel metrics that together tell a story.

```
Layout:
+--------+ +--------+ +--------+ +--------+
| LABEL  | | LABEL  | | LABEL  | | LABEL  |
| Value  | | Value  | | Value  | | Value  |
| note   | | note   | | note   | | note   |
+--------+ +--------+ +--------+ +--------+
```

**Implementation:**
```javascript
addMetric(s, pres, 0.5, 1.8, 2.1, "Metric 1", "42K", "Description");
addMetric(s, pres, 2.8, 1.8, 2.1, "Metric 2", "+85%", "Description");
addMetric(s, pres, 5.1, 1.8, 2.1, "Metric 3", "NPS 80", "Description");
addMetric(s, pres, 7.4, 1.8, 2.1, "Metric 4", "170+", "Description");
```

**When NOT to use:** When metrics need context or explanation - pair with cards below.

---

### 3. Cards grid (2x1, 2x2, 2x3, 3x1)
**Use when:** You have parallel blocks of information - each with a title and description.
**Information type:** Items that are peers (same level of importance, same structure).

```
Layout (2x2):
+------------------+ +------------------+
||Title            | ||Title            |
| Description text | | Description text |
+------------------+ +------------------+
+------------------+ +------------------+
||Title            | ||Title            |
| Description text | | Description text |
+------------------+ +------------------+
```

**Implementation:**
```javascript
addCardsGrid(s, pres, [
  { title: "First point", description: "Supporting detail here", accent: C.purple },
  { title: "Second point", description: "Another detail", accent: C.lime },
  { title: "Third point", description: "More context", accent: C.coral },
  { title: "Fourth point", description: "Final detail", accent: C.purple },
], 1.4, 2); // y position, columns (2 or 3)
```

**Variations:**
- **2x1:** Two cards side by side - for simple comparisons or dual points
- **3x1:** Three cards - for triads (e.g., three strategies, three phases)
- **2x2:** Four cards - balanced grid for moderate detail
- **2x3:** Six cards - maximum density, use smaller text (10pt)

**When NOT to use:** When items have a sequential relationship - use timeline or flow instead.

---

### 4. Flow / process (linear)
**Use when:** You're showing a sequence, pipeline, or cause-and-effect chain.
**Information type:** Steps that happen in order, or elements that feed into each other.

```
Layout:
+----------+     +----------+     +----------+
|  Step 1   | -> |  Step 2   | -> |  Step 3   |
|  detail   |     |  detail   |     |  detail   |
|           |     |           |     |           |
| ======== |     | ======== |     | ======== |
+----------+     +----------+     +----------+
```

**Implementation:**
```javascript
addFlowDiagram(s, pres, [
  { title: "Problem", description: "Low conversion in NYC", color: C.coral },
  { title: "Discovery", description: "Photos were terrible", color: C.purple },
  { title: "Result", description: "Hired photographers, conversion soared", color: C.lime },
], 1.6);
```

**When NOT to use:** When there's no sequential relationship - use cards grid instead.

---

### 5. Timeline (horizontal)
**Use when:** You're showing events or milestones across time.
**Information type:** Time-ordered events with dates/quarters.

```
Layout:
     Q1 2026        Q2 2026        Q3 2026        Q4 2026
       o---------------o---------------o---------------o
   +--------+     +--------+     +--------+     +--------+
   |Milestone|    |Milestone|    |Milestone|    |Milestone|
   | detail  |    | detail  |    | detail  |    | detail  |
   +--------+     +--------+     +--------+     +--------+
```

**Implementation:**
```javascript
// Manual implementation - draw line, dots, and cards
// Horizontal line
s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 2.5, w: 9, h: 0.02, fill: { color: C.gray } });

// Dots and labels at each milestone position
const milestones = [
  { x: 1.5, date: "Q1 2026", title: "Launch", desc: "Beta release" },
  { x: 4, date: "Q2 2026", title: "Scale", desc: "10K users" },
  // ...
];
milestones.forEach(m => {
  s.addShape(pres.shapes.OVAL, { x: m.x - 0.075, y: 2.425, w: 0.15, h: 0.15, fill: { color: C.purple } });
  s.addText(m.date, { x: m.x - 0.5, y: 2.1, w: 1, h: 0.3, fontSize: 10, fontFace: FONT, color: C.dark, bold: true, align: "center" });
  addCard(s, pres, m.x - 0.75, 2.7, 1.5, 0.85, C.purple);
  // Add title and description text...
});
```

**When NOT to use:** When there are too many milestones (>6) - break into phases or use a table.

---

### 6. Comparison (side by side)
**Use when:** You're showing two options, before/after, or contrasting approaches.
**Information type:** Two things that should be evaluated against each other.

```
Layout:
+------------------+     +------------------+
|     BEFORE       |     |      AFTER       |
|                  |     |                  |
|  - Point 1      |     |  - Point 1       |
|  - Point 2      |     |  - Point 2       |
|  - Point 3      |     |  - Point 3       |
|                  |     |                  |
+------------------+     +------------------+
```

**Implementation:**
```javascript
addComparison(s, pres,
  { header: "BEFORE", headerBg: C.coral, items: ["Point 1", "Point 2", "Point 3"] },
  { header: "AFTER", headerBg: C.lime, items: ["Point 1", "Point 2", "Point 3"] },
  1.2
);
```

**Variation - three-way comparison:**
- Three columns (~2.85" each) for comparing three options
- Use different colored top strips per column

**When NOT to use:** When items aren't parallel - if they have different structures, use separate cards.

---

### 7. Split layout (text + visual)
**Use when:** You have a quote, key insight, or explanation that pairs with an image or diagram.
**Information type:** One primary message with a supporting visual.

```
Layout:
+-----------------+-----------------+
|                 |                 |
|  Quote or key   |    [Image /     |
|  insight text   |     Visual /    |
|                 |     Diagram]    |
|  - Attribution  |                 |
|                 |                 |
+-----------------+-----------------+
```

**Implementation:**
```javascript
addSplitLayout(s, pres, {
  quote: '"Your key insight or quote goes here"',
  attribution: "- Source or context",
  rightBg: C.lime, // or C.lavender, C.coral
});
```

**When NOT to use:** When you don't have a visual to pair - use big number or cards instead.

---

### 8. Table / matrix
**Use when:** You have structured data with rows and columns that need comparison.
**Information type:** Multi-dimensional data where row AND column matter.

```
Layout:
+----------+----------+----------+----------+
|          | Column 1 | Column 2 | Column 3 |  <- header row
+----------+----------+----------+----------+
|  Row 1   |   data   |   data   |   data   |
|  Row 2   |   data   |   data   |   data   |
|  Row 3   |   data   |   data   |   data   |
+----------+----------+----------+----------+
```

**Implementation:**
```javascript
const tableData = [
  ["Phase", "Time", "Example"],
  ["Warmup", "5 min", '"Tell me about your day"'],
  ["Deep dive", "15 min", '"Walk me through..."'],
  ["Close", "5 min", '"What did I miss?"'],
];
addBrandedTable(s, tableData, 0.5, 1.2, [1.8, 0.8, 6.4]);
```

**When NOT to use:** When data only has 2-3 items - use cards or metric row instead.

---

### 9. Pyramid / hierarchy
**Use when:** You're showing levels, priorities, or a funnel.
**Information type:** Items with a clear rank or size ordering.

```
Layout:
          +------+
          | Top  |
        +-+------+-+
        |  Middle   |
      +-+-----------+-+
      |    Bottom     |
      +---------------+
```

**Implementation:**
```javascript
// Manual implementation with centered rectangles
const levels = [
  { text: "Top tier", w: 3, color: C.coral },
  { text: "Middle tier", w: 5, color: C.purple },
  { text: "Bottom tier", w: 7, color: C.lavender },
];
levels.forEach((level, i) => {
  const x = (10 - level.w) / 2;
  const y = 1 + i * 1.2;
  s.addShape(pres.shapes.RECTANGLE, { x, y, w: level.w, h: 1, fill: { color: level.color } });
  s.addText(level.text, { x, y, w: level.w, h: 1, fontSize: 14, fontFace: FONT, color: C.black, bold: true, align: "center", valign: "middle" });
});
```

**When NOT to use:** When items don't have a clear hierarchy - use cards grid instead.

---

### 10. Icon + text rows (Numbered list)
**Use when:** You have a list of items where each needs a distinct visual anchor.
**Information type:** A list where each item is independent and benefits from an icon to aid scanning.

```
Layout:
  [1]  Title of first item
       Description text goes here

  [2]  Title of second item
       Description text goes here

  [3]  Title of third item
       Description text goes here
```

**Implementation:**
```javascript
addNumberedList(s, pres, [
  "First step or item",
  "Second step or item",
  "Third step or item",
], 0.5, 1.2, { circleColor: C.purple });

// Or with custom numbers:
addNumberedList(s, pres, [
  { number: "A", text: "First option" },
  { number: "B", text: "Second option" },
], 0.5, 1.2);
```

**When NOT to use:** When items don't benefit from visual anchors - use cards grid instead.

---

### 11. Before/after with arrow
**Use when:** You're showing a transformation, change, or improvement.
**Information type:** A state change with a clear "from -> to" relationship.

```
Layout:
+--------------+          +--------------+
|              |          |              |
|   BEFORE     | -------> |    AFTER     |
|   state      |          |    state     |
|              |          |              |
+--------------+          +--------------+
```

**Implementation:**
Use the comparison helper with arrow in between:
```javascript
addComparison(s, pres,
  { header: "Current state", headerBg: C.gray, items: ["Issue 1", "Issue 2"] },
  { header: "Target state", headerBg: C.lime, items: ["Solution 1", "Solution 2"] },
  1.2
);
// Add arrow in center
s.addText("->", { x: 4.65, y: 2.2, w: 0.7, h: 0.5, fontSize: 36, fontFace: FONT, color: C.purple, align: "center" });
```

---

### 12. Convergence diagram
**Use when:** Multiple independent streams feed into a single outcome.
**Information type:** Inputs that combine to produce a result.

```
Layout:
+----------+
| Stream 1  | --\
+----------+     \   +----------+
+----------+      \--| Outcome  |
| Stream 2  | -------|          |
+----------+      /--|          |
+----------+     /   +----------+
| Stream 3  | --/
+----------+
```

**Implementation:**
```javascript
// Manual - left cards, right card, connecting lines
const inputs = ["Research", "Data", "Feedback"];
inputs.forEach((input, i) => {
  const y = 1 + i * 1.3;
  addCard(s, pres, 0.5, y, 2.5, 1, C.purple);
  s.addText(input, { x: 0.7, y: y + 0.35, w: 2.1, h: 0.3, fontSize: 13, fontFace: FONT, color: C.black, bold: true });
  // Line to outcome
  s.addShape(pres.shapes.LINE, { x: 3, y: y + 0.5, w: 1, h: 0, line: { color: C.gray, width: 1 } });
});
// Outcome card
addCard(s, pres, 6, 1.3, 3, 2.6, C.lime);
s.addText("Outcome", { x: 6.2, y: 2.4, w: 2.6, h: 0.4, fontSize: 16, fontFace: FONT, color: C.black, bold: true, align: "center" });
```

---

## Choosing the right pattern

| If your content is about... | Use this pattern |
|-------|-------|
| One powerful number | Big number callout |
| Several KPIs at a glance | Metric row |
| Parallel items with descriptions | Cards grid |
| A sequence or process | Flow / process |
| Events over time | Timeline |
| Two options or before/after | Comparison or Before/after with arrow |
| A quote with a visual | Split layout |
| Structured multi-column data | Table / matrix |
| Ranked or layered items | Pyramid / hierarchy |
| A list needing visual anchors | Numbered list or Icon row |
| Multiple inputs -> one result | Convergence diagram |
| Features/benefits with icons | Icon row |
| User archetypes | Persona card |
| Decision framework (2 dimensions) | 2x2 Matrix |
| Transformation/improvement | Before/after stat pair |
| Session structure | Agenda list |
| Code or prompts | Code block |

## Combining patterns on one slide

The most effective slides often combine 2 patterns:

- **Metric row + cards grid**: Stats at top, detailed cards below
- **Flow + summary card**: Process diagram above, key insight card below
- **Big number + split layout**: Stat on one side, explanation on the other
- **Timeline + metric row**: Metrics at top, timeline below showing when each was achieved

---

### 13. Icon row (feature list)
**Use when:** You have 3-5 features, benefits, or categories to highlight with visual anchors.
**Information type:** Parallel items that benefit from icons/emojis.

**Implementation:**
```javascript
addIconRow(s, pres, [
  { icon: "🎯", label: "Focus", description: "Stay on track", color: C.purple },
  { icon: "⚡", label: "Speed", description: "Move fast", color: C.coral },
  { icon: "🔒", label: "Security", description: "Stay safe", color: C.lime },
], 1.5);
```

---

### 14. Persona card
**Use when:** Introducing a user segment, customer archetype, or stakeholder.
**Information type:** User research data, empathy mapping.

**Implementation:**
```javascript
addPersona(s, pres, {
  name: "Sarah Chen",
  role: "Product Manager, Series B startup",
  quote: "I spend half my time in meetings instead of building.",
  painPoints: ["No time for deep work", "Too many stakeholders", "Unclear priorities"],
}, 0.5, 1);
```

---

### 15. 2x2 Matrix
**Use when:** Comparing options across two dimensions (priority/effort, impact/feasibility).
**Information type:** Decision frameworks, prioritization.

**Implementation:**
```javascript
addMatrix(s, pres,
  { top: "HIGH IMPACT", bottom: "LOW IMPACT", left: "LOW EFFORT", right: "HIGH EFFORT" },
  [
    { text: "Quick Wins", color: C.lime },
    { text: "Big Bets", color: C.purple },
    { text: "Fill-ins", color: C.lavender },
    { text: "Money Pits", color: C.coral },
  ],
  1.2
);
```

---

### 16. Before/After stat pair
**Use when:** Showing transformation, improvement, or change with numbers.
**Information type:** Results, outcomes, ROI.

**Implementation:**
```javascript
addStatPair(s, pres,
  { label: "Before", value: "38%" },
  { label: "After", value: "11%" },
  2
);
```

---

### 17. Agenda list
**Use when:** Starting a presentation, showing session structure.
**Information type:** Ordered list with timing.

**Implementation:**
```javascript
addAgendaList(s, pres, [
  { title: "Introduction", time: "5 min", active: false },
  { title: "Case Study", time: "15 min", active: true },
  { title: "Workshop", time: "20 min", active: false },
  { title: "Q&A", time: "10 min", active: false },
], 0.5, 1.2);
```

---

### 18. Code block
**Use when:** Showing code snippets, prompts, or technical content.
**Information type:** Code, API calls, configuration.

**Implementation:**
```javascript
addCodeBlock(s,
  'const user = await fetchUser(id);\nconsole.log(user.name);',
  1, 2, 8, 1.5,
  { bg: C.darkGray, textColor: C.white, fontSize: 12 }
);
```

---

## Anti-patterns (never do these)

1. **Wall of bullets**: 8+ bullet points on a slide - split into cards or multiple slides
2. **Centered paragraph**: A big block of centered body text - left-align and add a visual
3. **Too many fonts/sizes**: More than 3 distinct text sizes on one slide - simplify
4. **Rainbow cards**: Each card a different random color - use 2-3 brand colors max, color-code by category
5. **Empty space with no purpose**: Large blank areas - either fill them with a visual or reduce the slide content to match
6. **Orphan data**: A number without context - always pair stats with a label AND a note
7. **Dark backgrounds**: Never use dark/black backgrounds - keep slides light and energetic

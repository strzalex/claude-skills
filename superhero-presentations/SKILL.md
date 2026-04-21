---
name: superhero-presentations
description: "Create branded presentation decks (.pptx) in the superhero.tech / AI Product Heroes visual style. Use this skill whenever the user asks to create slides, a deck, a presentation, or anything related to .pptx files for superhero.tech, AI Product Heroes, courses, webinars, workshops, or conference talks. Also trigger when the user mentions 'slides', 'deck', 'presentation', or 'pptx' in the context of their educational or consulting content. This skill handles creation from scratch - if the user provides an existing .pptx to edit, use the pptx editing skill instead."
---

# Superhero.tech Presentation Builder

Build branded course materials, webinar decks, and conference presentations in the superhero.tech / AI Product Heroes visual identity.

## Quick start

1. Read the [style guide](references/style-guide.md) to understand the brand system
2. Read the [layout patterns](references/layout-patterns.md) to choose the right information architecture for each slide
3. Run the generator script: `node scripts/create_deck.js`
4. The script is a **template** - modify it for each presentation's content

## Dependencies

```bash
npm install pptxgenjs
```

LibreOffice and Poppler are needed for QA (usually pre-installed).

## Workflow

### 1. Understand the request
- What type of presentation? (course module, webinar, conference talk, workshop)
- How many slides?
- What content/outline does the user want?
- Are there specific data points, metrics, or diagrams needed?

### 2. Read the style guide AND layout patterns
Always read both reference files before writing any code:
- `references/style-guide.md` - the exact colors, fonts, spacing, and slide types
- `references/layout-patterns.md` - how to structure information on each slide (this is critical - never default to bullet points)

For each slide, identify the RELATIONSHIP between the pieces of information, then pick the matching pattern from the layout patterns guide. The pattern catalog includes: big number callouts, metric rows, card grids, flow/process diagrams, timelines, comparisons, split layouts, tables, pyramids, icon+text rows, before/after transformations, and convergence diagrams.

### 3. Write the generator script
Use `scripts/create_deck.js` as a starting template. Modify it to match the requested content. Key principles:
- Every slide needs a visual element - never text-only
- Vary layouts across slides (don't repeat the same structure)
- Use the brand color palette strictly - no off-brand colors
- Use helper functions for repeated elements (cards, metrics, accent bars)
- **Never reuse option objects** across PptxGenJS calls (they get mutated)

### 4. Generate and QA

```bash
# Generate
node scripts/create_deck.js

# Convert to images for visual inspection (optional)
soffice --headless --convert-to pdf output.pptx
pdftoppm -jpeg -r 150 output.pdf slide
```

Visually inspect every slide. Look for:
- Text overflow or clipping
- Overlapping elements
- Title wrapping into subtitle space
- Cards touching edges (need 0.5" margin minimum)
- Low contrast text
- Inconsistent spacing

### 5. Fix and re-verify
Fix issues, regenerate, re-convert, re-inspect. Repeat until clean.

## Slide types (use as building blocks)

Read the style guide for exact specifications, but here are the available patterns:

| Type | Use for | Background | Key features |
|------|---------|------------|--------------|
| **Title slide** | Opening | Coral (`FD585A`) | Huge bold text, attribution |
| **Content slide** | Teaching content | Cream (`FDFAD1`) | Cards, columns, left-aligned body |
| **Subsection slide** | Section dividers | Purple (`B898F7`) | HUGE white text (100pt+) |
| **Question slide** | Audience interaction | Lavender (`EFE5FF`) | Purple rounded box + 5px black border |
| **Quote slide** | Expert quotes | White + Lime split | Text left, colored block right |
| **Metric slide** | Data callouts | Cream (`FDFAD1`) | Large stat numbers, metric row |
| **Comparison slide** | Before/after | Cream (`FDFAD1`) | Two columns with colored headers |
| **Flow slide** | Processes | Cream (`FDFAD1`) | Connected boxes with arrows |
| **Closing slide** | CTA, resources | Coral (`FD585A`) | QR code space, social handles |

## Font size hierarchy

Use these standard sizes for consistency:

| Element | Size | Constant |
|---------|------|----------|
| Hero title (title slides) | 52pt | `FONT_SIZE.heroTitle` |
| Section title (dividers) | 36pt | `FONT_SIZE.sectionTitle` |
| Slide title (content slides) | 28pt | `FONT_SIZE.slideTitle` |
| Card title | 13pt | `FONT_SIZE.cardTitle` |
| Card body | 11pt | `FONT_SIZE.cardBody` |
| Metric value | 20pt | `FONT_SIZE.metricValue` |
| Metric label | 8pt | `FONT_SIZE.metricLabel` |
| Caption/slide number | 10pt | `FONT_SIZE.caption` |

## Card height standards

Use these heights to ensure text fits without overflow:

| Content | Height | Constant |
|---------|--------|----------|
| Title only (1 line) | 0.65" | `CARD_HEIGHT.oneLine` |
| Title + 1 line description | 0.85" | `CARD_HEIGHT.twoLine` |
| Title + 2 line description | 1.1" | `CARD_HEIGHT.threeLine` |
| Title + 3 line description | 1.4" | `CARD_HEIGHT.fourLine` |

For longer content, either:
- Truncate the text
- Use a smaller font (10pt body)
- Split into multiple cards

## Available helper functions

The template includes these helpers - use them instead of building from scratch:

### Slide-level helpers
| Helper | Purpose |
|--------|---------|
| `addSubsectionSlide(pres, num, total, title)` | Purple background, HUGE white text |
| `addQuestionSlide(pres, num, total, question, opts)` | Lavender bg, purple rounded box with 5px border |

### Layout helpers
| Helper | Purpose |
|--------|---------|
| `addCard(slide, pres, x, y, w, h, accentColor)` | Card with shadow and optional left accent bar |
| `addCardsGrid(slide, pres, cards, y, cols)` | Grid of cards (2 or 3 columns) |
| `addFlowDiagram(slide, pres, steps, y)` | 3-4 connected boxes with arrows |
| `addSplitLayout(slide, pres, content)` | Quote left, colored block right |
| `addComparison(slide, pres, left, right, y)` | Two-column comparison with headers |
| `addTimeline(slide, pres, milestones, y)` | Horizontal timeline with dots and labels |
| `addPyramid(slide, pres, levels, y)` | 3-level hierarchy/pyramid diagram |
| `addConvergenceDiagram(slide, pres, inputs, output, y)` | Multiple inputs -> single output |
| `addMatrix(slide, pres, labels, quadrants, y)` | 2x2 matrix (priority/impact grids) |

### Data display helpers
| Helper | Purpose |
|--------|---------|
| `addMetric(slide, pres, x, y, w, label, value, note, opts)` | Metric box with label, big number, and note |
| `addBigNumber(slide, value, context, note, opts)` | Full-slide big number callout |
| `addBrandedTable(slide, data, x, y, colWidths)` | Branded table with header row |
| `addProgressBar(slide, pres, x, y, w, progress, opts)` | Visual progress indicator |
| `addStatPair(slide, pres, before, after, y)` | Before/after stats with arrow |

### List helpers
| Helper | Purpose |
|--------|---------|
| `addNumberedList(slide, pres, items, x, y, opts)` | Numbered list with circle indicators |
| `addChecklist(slide, pres, items, x, y, opts)` | List with checkmarks or X marks |
| `addAgendaList(slide, pres, items, x, y)` | Agenda items with timing |
| `addIconRow(slide, pres, items, y, opts)` | Row of icons with labels (feature lists) |

### Content helpers
| Helper | Purpose |
|--------|---------|
| `addPersona(slide, pres, persona, x, y, opts)` | User persona card (name, role, quote, pain points) |
| `addCodeBlock(slide, code, x, y, w, h, opts)` | Styled code snippet with monospace font |
| `addScreenshot(slide, pres, imagePath, x, y, w, h, opts)` | Image with device frame styling |
| `addCallout(slide, pres, text, x, y, opts)` | Speech bubble/callout pointing to something |

### Decorative helpers
| Helper | Purpose |
|--------|---------|
| `addSlideNumber(slide, num, total, opts)` | Slide number in top-left |
| `addHighlightBox(slide, pres, x, y, w, h, opts)` | Rounded rectangle with border (lime + black) |
| `addBadge(slide, text, x, y, opts)` | Small label/badge for emphasis |

## Important rules

- **POLISH DIACRITICAL MARKS:** When writing Polish text, always use proper diacritical marks (ą, ć, ę, ł, ń, ó, ś, ź, ż). Never use ASCII substitutes (a, c, e, l, n, o, s, z).
- **NO DARK BACKGROUNDS:** Never use dark/black backgrounds (`0F0F10`, `262626`). Keep slides light and energetic.
- **Content slides:** Use cream (`FDFAD1`) background - this is the default for teaching content.
- **Subsection slides:** Use purple (`B898F7`) background with HUGE white text. Use `addSubsectionSlide()` helper.
- **Question slides:** Use lavender (`EFE5FF`) background with purple rounded box + 5px black border. Use `addQuestionSlide()` helper.
- **Font: Onest** is the brand font. It's a Google Font but not available in standard PowerPoint installs. The skill uses Onest as the primary `fontFace` - it will render correctly if the font is installed on the presenter's machine. If not, PowerPoint substitutes with a similar sans-serif. For maximum compatibility, install Onest from Google Fonts before presenting.
- **PptxGenJS limitations**: No gradient fills, no custom shapes beyond built-in ones. Use solid fills and standard shapes (RECTANGLE, OVAL, ROUNDED_RECTANGLE, LINE).
- **Text overflow**: Always estimate text length. Polish text is often 20-30% longer than English. Use `CARD_HEIGHT` constants and truncate if needed.

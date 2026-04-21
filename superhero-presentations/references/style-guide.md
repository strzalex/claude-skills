# Superhero.tech / AI Product Heroes - Style guide

## Brand identity

**Company:** superhero.tech (consulting + education platform)
**Course brand:** AI Product Heroes
**Founders:** Wojtek Strzalkowski & Piotr Kacala
**Positioning:** Teaching people to build products like superheroes using AI
**Tone:** Bold, playful but professional, high-energy, direct

## Color palette

### Primary colors
| Name | Hex | Usage |
|------|-----|-------|
| **Superhero purple** | `BF96FE` | Primary brand color. Accent bars, highlights, question boxes |
| **Purple dark** | `B898F7` | Subsection slide backgrounds |
| **Light lavender** | `EFE5FF` | Question slide backgrounds |
| **Cream** | `FDFAD1` | Content slide backgrounds (default) |
| **Near-black** | `0F0F10` | Primary text color only - NEVER as background |
| **Near-white** | `FDFEFE` | Card backgrounds, text on colored surfaces |

### Accent colors
| Name | Hex | Usage |
|------|-----|-------|
| **Coral red** | `FD585A` | Title slide backgrounds, attention-grabbing surfaces |
| **Lime green** | `C5E047` | Accent backgrounds (quote slides, highlight sections), energy |
| **Bright lime** | `BFE100` | Highlight boxes with black border |
| **Warm gold** | `F5BD42` | Decorative elements, warm accent |
| **Orange** | `F0A53A` | Secondary warm accent |
| **Cyan** | `6DEDF6` | Cool accent, used sparingly for contrast |
| **Muted gray** | `DDDDDD` | Borders, dividers, subtle backgrounds |
| **Dark gray** | `262626` | Muted text only - NEVER as background |

### Color usage rules
- **Title/opening slides:** Coral red (`FD585A`) background with black text
- **Content slides:** Vary between these three for visual interest:
  - Cream (`FDFAD1`) - warm, energetic (primary)
  - White (`FDFEFE`) - clean, neutral (good for tables/data)
  - Lavender (`EFE5FF`) - soft purple (good for quotes/emphasis)
- **Quote/highlight slides:** Lime green (`C5E047`) background with black text - split layouts
- **Question slides:** Light lavender (`EFE5FF`) background with purple rounded box (`BF96FE`) + 5px black border
- **Subsection divider slides:** Purple dark (`B898F7`) background with HUGE **black** text (scales by length)
- **Closing slides:** Coral (`FD585A`) background with purple accents
- **Accent bars on cards:** Superhero purple (`BF96FE`) left-side bars
- **Highlight boxes:** Bright lime (`BFE100`) with 5px black border
- **NEVER use dark/black backgrounds** (`0F0F10`, `262626`) for any slide
- **Never use** generic blue, standard PowerPoint colors, or gradients

## Typography

### Font family
| Role | Font | Fallback |
|------|------|----------|
| **Primary (all text)** | Onest | Helvetica Neue, Arial |
| **Emphasis variant** | Onest SemiBold | Helvetica Neue Bold, Arial Bold |

### Font size hierarchy

Use these exact sizes for consistency across all presentations:

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| **Hero title** | 52pt | Bold | Title slides only - massive, commanding |
| **Section title** | 36pt | Bold | Section divider slides |
| **Slide title** | 28pt | Bold | Content slide main titles |
| **Subtitle** | 16-18pt | Regular | Below slide titles |
| **Card title** | 13pt | Bold | Inside cards, list items |
| **Card body** | 11pt | Regular | Card descriptions |
| **Body text** | 12-14pt | Regular | General explanations |
| **Metric value** | 20pt | Bold | Large stat callouts |
| **Metric label** | 8pt | Bold ALL CAPS | Above metric values |
| **Caption** | 10pt | Regular | Slide numbers, small print |

### Typography rules
- **All text is black** (`000000`) on light backgrounds
- **Left-align** body text and descriptions - never center paragraphs
- **Center** only: slide titles on title/question slides, text inside metric boxes, text inside flow diagram boxes
- **ALL CAPS** only for: metric labels, navigation text, "SUPERHERO.TECH" brand name
- **Bold is default** for titles and headers - don't be shy with weight

## Layout system

### Slide dimensions
- Layout: `LAYOUT_16x9` (10" x 5.625")
- Minimum margin: 0.5" from all edges
- Content area: roughly 9" x 4.625"

### Spacing
- Gap between cards: 0.15" - 0.2"
- Internal card padding: 0.15" - 0.2"
- Between major sections: 0.3" - 0.5"
- Between title and subtitle: 0.1" - 0.15"

### Card system
Cards are the primary content container:
```
Shape: RECTANGLE (not rounded - accent bars don't work with rounded)
Fill: FDFEFE (white) or EFE5FF (lavender)
Shadow: type outer, blur 4, offset 2, angle 135, color 000000, opacity 0.10
Accent bar: 0.06" wide RECTANGLE on left edge, fill BF96FE (purple)
```

### Standard card heights
Use these heights based on content to prevent text overflow:

| Content | Height |
|---------|--------|
| Title only (1 line) | 0.65" |
| Title + 1 line description | 0.85" |
| Title + 2 line description | 1.1" |
| Title + 3+ line description | 1.4" |

### Metric boxes
For stat callouts:
```
Shape: RECTANGLE
Fill: EFE5FF (lavender) or FDFEFE (white)
No shadow, no border
Label: 8pt ALL CAPS, muted color (262626)
Value: 20pt Bold, primary text color
Note: 8pt, muted color
```

## Slide templates

### Title slide
- Background: `FD585A` (coral red)
- Title: 52pt bold black, left-aligned, takes up most of the slide
- Attribution: small ALL CAPS at bottom-left "WOJCIECH STRZALKOWSKI @ SUPERHERO.TECH"

### Bio/intro slide
- Background: white or light
- Left side: photo (circular or with slight rotation)
- Right side: name, title, credentials as bullet points
- Purple accent elements

### Content slide (cards layout)
- Background: `FDFEFE` (white) or `EFE5FF` (lavender)
- Slide number: top-left, 10pt muted
- Title: 28pt bold, top area
- Subtitle: 13pt muted, below title
- Content area: 2-6 cards in grid (2x1, 2x2, 2x3)
- Each card has optional purple accent bar on left

### Quote slide
- Split layout: text on left half, image on right half
- Left background: white
- Right background: `C5E047` (lime green)
- Quote text: 20pt bold
- Attribution: smaller regular text below quote

### Question slide
- Background: `EFE5FF` (light lavender)
- Label "Question" centered, bold
- Question text inside a rounded pill container filled with `BF96FE` (purple)

### Metric slide
- Background: white or lavender
- Row of 3-4 metric boxes across the top
- Supporting content below (cards, text, or chart)

### Flow/process slide
- Background: white (`FDFEFE`) or lavender (`EFE5FF`)
- 3-4 connected boxes with arrows between them
- Each box: white fill, colored accent bar at bottom
- Arrow text: "->" in muted color between boxes

### Section divider slide (subsection)
- Background: `B898F7` (purple dark)
- Title: HUGE **black** text, centered vertically
- Font size scales based on title length (excluding newlines):
  - ≤9 characters: 100pt
  - 10-12 characters: 84pt
  - 13-20 characters: 72pt
  - >20 characters: 56pt
- Keep titles SHORT and punchy (1-2 words ideal)
- Optional timing indicator at bottom

### Closing slide
- Background: `FD585A` (coral) or `EFE5FF` (lavender)
- Purple accents
- CTA text, links, QR code area
- "superhero.tech" branding

## PptxGenJS implementation notes

### Font availability
Onest is a Google Font - not pre-installed in PowerPoint. Options:
1. Install Onest on the presenter's machine (recommended)
2. Use `Calibri` as a safe fallback that's close enough in weight
3. The font name in code should still be `Onest` - PowerPoint substitutes gracefully

### Color constants template
```javascript
const C = {
  purple: "BF96FE",
  purpleDark: "B898F7",    // Subsection slide background
  lavender: "EFE5FF",      // Question slide background
  cream: "FDFAD1",         // Content slide background
  dark: "0F0F10",          // TEXT ONLY - never as background
  darkGray: "262626",      // TEXT ONLY - never as background
  white: "FDFEFE",
  coral: "FD585A",
  lime: "C5E047",
  brightLime: "BFE100",
  gold: "F5BD42",
  orange: "F0A53A",
  cyan: "6DEDF6",
  gray: "DDDDDD",
  black: "000000",
};
```

### Standard size constants
```javascript
const FONT_SIZE = {
  heroTitle: 52,
  sectionTitle: 36,
  slideTitle: 28,
  cardTitle: 13,
  cardBody: 11,
  metricValue: 20,
  metricLabel: 8,
  caption: 10,
};

const CARD_HEIGHT = {
  oneLine: 0.65,
  twoLine: 0.85,
  threeLine: 1.1,
  fourLine: 1.4,
};
```

### Text overflow prevention
Polish text is typically 20-30% longer than English. When writing content:
- Estimate line count before choosing card height
- Use shorter phrases when possible
- Truncate with "..." if content exceeds bounds
- For tables, use 10pt font and wider columns

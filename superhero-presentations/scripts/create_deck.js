/**
 * Superhero.tech / AI Product Heroes - Presentation Generator Template
 *
 * This is a starting template. Copy and modify for each new presentation.
 * Read references/style-guide.md for the full brand system.
 *
 * Usage:
 *   npm install pptxgenjs
 *   node scripts/create_deck.js [output_path.pptx]
 */

const pptxgen = require("pptxgenjs");

// === BRAND COLORS ===
const C = {
  purple: "BF96FE",
  purpleDark: "B898F7",    // Subsection slide background
  lavender: "EFE5FF",      // Question slide background, also content alt
  cream: "FDFAD1",         // Content slide background (primary)
  dark: "0F0F10",
  darkGray: "262626",
  white: "FDFEFE",         // Content slide background (alt)
  coral: "FD585A",
  lime: "C5E047",
  brightLime: "BFE100",
  gold: "F5BD42",
  orange: "F0A53A",
  cyan: "6DEDF6",
  gray: "DDDDDD",
  black: "000000",
};

// Content slide backgrounds - use these to add variety
// Cycle through them or pick based on slide content type
const CONTENT_BACKGROUNDS = [
  C.cream,     // Primary - warm, energetic
  C.white,     // Clean, neutral - good for tables/data
  C.lavender,  // Soft purple tint - good for quotes/emphasis
];

// === FONT ===
const FONT = "Onest";

// === STANDARD SIZES ===
const FONT_SIZE = {
  heroTitle: 52,
  sectionTitle: 200,       // Subsection slides use HUGE text
  slideTitle: 28,
  cardTitle: 15,           // Increased from 13 for better visibility
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

// === HELPERS ===
// IMPORTANT: Never reuse shadow/option objects - PptxGenJS mutates them in-place
const makeShadow = () => ({
  type: "outer",
  blur: 8,
  offset: 4,
  angle: 135,
  color: "000000",
  opacity: 0.18,
});

/**
 * Add a card with optional left accent bar
 */
function addCard(slide, pres, x, y, w, h, accentColor) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.white },
    shadow: makeShadow(),
  });
  if (accentColor) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.12, h,
      fill: { color: accentColor },
    });
  }
}

/**
 * Add a metric box (label + value + optional note)
 */
function addMetric(slide, pres, x, y, w, label, value, note, opts = {}) {
  const bg = opts.bg || C.lavender;
  const textColor = opts.textColor || C.dark;
  const mutedColor = opts.mutedColor || C.darkGray;
  const borderColor = opts.borderColor || C.gray;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.85,
    fill: { color: bg },
    line: { color: borderColor, width: 1.5 },
  });
  slide.addText(label.toUpperCase(), {
    x: x + 0.15, y: y + 0.08, w: w - 0.3, h: 0.22,
    fontSize: FONT_SIZE.metricLabel, fontFace: FONT, color: mutedColor, bold: true, margin: 0,
  });
  slide.addText(value, {
    x: x + 0.15, y: y + 0.25, w: w - 0.3, h: 0.3,
    fontSize: FONT_SIZE.metricValue, fontFace: FONT, color: textColor, bold: true, margin: 0,
  });
  if (note) {
    slide.addText(note, {
      x: x + 0.15, y: y + 0.55, w: w - 0.3, h: 0.28,
      fontSize: FONT_SIZE.metricLabel, fontFace: FONT, color: mutedColor, margin: 0,
    });
  }
}

/**
 * Add slide number (top-left)
 */
function addSlideNumber(slide, num, total, opts = {}) {
  const color = opts.color || C.gray;
  slide.addText(`${String(num).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, {
    x: 0.5, y: 0.3, w: 2, h: 0.3,
    fontSize: FONT_SIZE.caption, fontFace: FONT, color, margin: 0,
  });
}

/**
 * Add a slide title with accent underline
 */
function addSlideTitle(slide, pres, title, opts = {}) {
  const y = opts.y || 0.5;
  const accentColor = opts.accentColor || C.purple;
  const accentWidth = opts.accentWidth || 1.5;

  slide.addText(title, {
    x: 0.5, y, w: 9, h: 0.6,
    fontSize: FONT_SIZE.slideTitle, fontFace: FONT, color: C.black, bold: true, margin: 0,
  });

  // Accent underline
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: y + 0.55, w: accentWidth, h: 0.04,
    fill: { color: accentColor },
  });
}

/**
 * Add a subsection divider slide (purple background, HUGE text)
 * Text is black, font size scales down for longer titles (>9 chars)
 */
function addSubsectionSlide(pres, num, total, title) {
  const slide = pres.addSlide();
  slide.background = { color: C.purpleDark };
  addSlideNumber(slide, num, total, { color: C.black });

  // Scale font size based on title length (excluding newlines)
  const cleanTitle = title.replace(/\n/g, '');
  let fontSize = 100;
  if (cleanTitle.length > 20) {
    fontSize = 56;
  } else if (cleanTitle.length > 12) {
    fontSize = 72;
  } else if (cleanTitle.length > 9) {
    fontSize = 84;
  }

  slide.addText(title, {
    x: 0.5, y: 1.5, w: 9, h: 3,
    fontSize,
    fontFace: FONT, color: C.black, bold: true, margin: 0,
    valign: "middle",
  });
  return slide;
}

/**
 * Add a question slide (lavender bg, purple rounded box with border)
 */
function addQuestionSlide(pres, num, total, question, opts = {}) {
  const slide = pres.addSlide();
  slide.background = { color: C.lavender };
  addSlideNumber(slide, num, total, { color: C.darkGray });

  // Purple rounded box with 5px black border
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 1, y: 1.2, w: 8, h: 3,
    fill: { color: C.purple },
    line: { color: C.black, width: 5 },
    rectRadius: 0.3,
  });

  // Question text inside
  slide.addText(question, {
    x: 1.3, y: 1.5, w: 7.4, h: 2.4,
    fontSize: 24, fontFace: FONT, color: C.white, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  return slide;
}

/**
 * Add a flow/process diagram (3-4 connected boxes)
 */
function addFlowDiagram(slide, pres, steps, y = 1.6) {
  const boxWidth = steps.length === 3 ? 2.8 : 2.1;
  const gap = steps.length === 3 ? 0.3 : 0.25;
  const totalWidth = steps.length * boxWidth + (steps.length - 1) * gap;
  const startX = (10 - totalWidth) / 2;

  steps.forEach((step, i) => {
    const x = startX + i * (boxWidth + gap);
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: boxWidth, h: 2.2,
      fill: { color: C.white }, shadow: makeShadow(),
    });
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: y + 2.12, w: boxWidth, h: 0.08,
      fill: { color: step.color || C.purple },
    });
    slide.addText(step.title, {
      x: x + 0.15, y: y + 0.1, w: boxWidth - 0.3, h: 0.35,
      fontSize: 14, fontFace: FONT, color: step.color || C.purple, bold: true, align: "center", margin: 0,
    });
    slide.addText(step.description, {
      x: x + 0.15, y: y + 0.5, w: boxWidth - 0.3, h: 1.5,
      fontSize: 11, fontFace: FONT, color: C.darkGray, align: "center", valign: "top", margin: 0,
    });
    if (i < steps.length - 1) {
      slide.addText("->", {
        x: x + boxWidth, y: y + 0.9, w: gap, h: 0.4,
        fontSize: 20, fontFace: FONT, color: C.gray, align: "center", margin: 0,
      });
    }
  });
}

/**
 * Add a split layout (text left, colored block right)
 */
function addSplitLayout(slide, pres, content) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5, y: 0, w: 5, h: 5.625,
    fill: { color: content.rightBg || C.lime },
  });
  slide.addText(content.quote, {
    x: 0.5, y: 1.5, w: 4.2, h: 2.5,
    fontSize: 20, fontFace: FONT, color: C.black, bold: true, margin: 0,
  });
  if (content.attribution) {
    slide.addText(content.attribution, {
      x: 0.5, y: 4.2, w: 4.2, h: 0.4,
      fontSize: 14, fontFace: FONT, color: C.purple, margin: 0,
    });
  }
}

/**
 * Add a comparison layout (two columns with headers)
 */
function addComparison(slide, pres, left, right, y = 1.2) {
  const colWidth = 4.3;
  const headerHeight = 0.4;
  const contentHeight = 2.4;

  // Left
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y, w: colWidth, h: headerHeight,
    fill: { color: left.headerBg || C.coral },
  });
  slide.addText(left.header, {
    x: 0.5, y, w: colWidth, h: headerHeight,
    fontSize: 14, fontFace: FONT,
    color: left.headerBg === C.lime || left.headerBg === C.gray ? C.dark : C.white,
    bold: true, align: "center", valign: "middle", margin: 0,
  });
  addCard(slide, pres, 0.5, y + headerHeight + 0.05, colWidth, contentHeight, null);
  slide.addText(left.content, {
    x: 0.7, y: y + headerHeight + 0.15, w: colWidth - 0.4, h: contentHeight - 0.2,
    fontSize: 12, fontFace: FONT, color: C.darkGray, margin: 0,
  });

  // Right
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y, w: colWidth, h: headerHeight,
    fill: { color: right.headerBg || C.lime },
  });
  slide.addText(right.header, {
    x: 5.1, y, w: colWidth, h: headerHeight,
    fontSize: 14, fontFace: FONT,
    color: right.headerBg === C.lime || right.headerBg === C.gray ? C.dark : C.white,
    bold: true, align: "center", valign: "middle", margin: 0,
  });
  addCard(slide, pres, 5.1, y + headerHeight + 0.05, colWidth, contentHeight, null);
  slide.addText(right.content, {
    x: 5.3, y: y + headerHeight + 0.15, w: colWidth - 0.4, h: contentHeight - 0.2,
    fontSize: 12, fontFace: FONT, color: C.darkGray, margin: 0,
  });
}

/**
 * Add a big number callout (centered, full slide impact)
 */
function addBigNumber(slide, value, context, note, opts = {}) {
  const valueColor = opts.valueColor || C.black;
  const contextColor = opts.contextColor || C.darkGray;
  if (context) {
    slide.addText(context.toUpperCase(), {
      x: 0, y: 1.5, w: 10, h: 0.4,
      fontSize: 14, fontFace: FONT, color: contextColor, align: "center", margin: 0,
    });
  }
  slide.addText(value, {
    x: 0, y: 2.0, w: 10, h: 1.2,
    fontSize: 60, fontFace: FONT, color: valueColor, bold: true, align: "center", margin: 0,
  });
  if (note) {
    slide.addText(note, {
      x: 1, y: 3.4, w: 8, h: 0.6,
      fontSize: 16, fontFace: FONT, color: contextColor, align: "center", margin: 0,
    });
  }
}

/**
 * Add a branded table
 */
function addBrandedTable(slide, data, x, y, colWidths) {
  const tableRows = data.map((row, i) => {
    const fill = i === 0 ? C.purple : i % 2 === 1 ? C.white : C.lavender;
    const fontColor = i === 0 ? C.white : C.black;
    return row.map((cell) => ({
      text: cell,
      options: { fill: { color: fill }, color: fontColor, bold: i === 0, fontSize: 10, fontFace: FONT, margin: [3, 5, 3, 5] },
    }));
  });
  slide.addTable(tableRows, {
    x, y, w: colWidths.reduce((a, b) => a + b, 0), colW: colWidths,
    border: { pt: 0.5, color: C.gray },
  });
}

/**
 * Add a numbered list with circle indicators
 */
function addNumberedList(slide, pres, items, x = 0.5, y = 1.2, opts = {}) {
  const circleSize = opts.circleSize || 0.5;
  const spacing = opts.spacing || 0.8;
  const circleColor = opts.circleColor || C.purple;
  items.forEach((item, i) => {
    const itemY = y + i * spacing;
    const num = typeof item === "string" ? String(i + 1) : item.number;
    const text = typeof item === "string" ? item : item.text;
    slide.addShape(pres.shapes.OVAL, { x, y: itemY, w: circleSize, h: circleSize, fill: { color: circleColor } });
    slide.addText(num, {
      x, y: itemY, w: circleSize, h: circleSize,
      fontSize: 18, fontFace: FONT, color: C.white, bold: true, align: "center", valign: "middle", margin: 0,
    });
    slide.addText(text, {
      x: x + circleSize + 0.2, y: itemY + 0.1, w: 8 - circleSize, h: circleSize - 0.1,
      fontSize: 16, fontFace: FONT, color: C.black, valign: "middle", margin: 0,
    });
  });
}

/**
 * Add a cards grid (2x1, 2x2, 3x1, 2x3)
 */
function addCardsGrid(slide, pres, cards, y = 1.4, cols = 2) {
  const cardWidth = cols === 2 ? 4.35 : 2.85;
  const cardHeight = CARD_HEIGHT.twoLine;
  const gapX = 0.2;
  const gapY = 0.15;
  cards.forEach((card, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 0.5 + col * (cardWidth + gapX);
    const cardY = y + row * (cardHeight + gapY);
    addCard(slide, pres, x, cardY, cardWidth, cardHeight, card.accent || C.purple);
    slide.addText(card.title, {
      x: x + 0.2, y: cardY + 0.15, w: cardWidth - 0.4, h: 0.35,
      fontSize: FONT_SIZE.cardTitle, fontFace: FONT, color: C.black, bold: true, margin: 0,
    });
    slide.addText(card.description, {
      x: x + 0.2, y: cardY + 0.5, w: cardWidth - 0.4, h: 0.5,
      fontSize: FONT_SIZE.cardBody, fontFace: FONT, color: C.darkGray, margin: 0,
    });
  });
}

/**
 * Add a checklist with checkmarks or X marks
 */
function addChecklist(slide, pres, items, x = 0.5, y = 1.2, opts = {}) {
  const spacing = opts.spacing || 0.6;
  items.forEach((item, i) => {
    const itemY = y + i * spacing;
    const checked = typeof item === "string" ? true : item.checked;
    const text = typeof item === "string" ? item : item.text;
    const checkColor = checked ? C.lime : C.coral;
    const checkMark = checked ? "✓" : "✗";

    slide.addText(checkMark, {
      x, y: itemY, w: 0.4, h: 0.4,
      fontSize: 20, fontFace: FONT, color: checkColor, bold: true, margin: 0,
    });
    slide.addText(text, {
      x: x + 0.5, y: itemY, w: 8.5, h: 0.4,
      fontSize: 14, fontFace: FONT, color: C.black, margin: 0,
    });
  });
}

/**
 * Add a timeline (horizontal with milestones)
 */
function addTimeline(slide, pres, milestones, y = 2.5) {
  const lineY = y;
  const startX = 0.8;
  const endX = 9.2;
  const totalWidth = endX - startX;

  // Horizontal line
  slide.addShape(pres.shapes.RECTANGLE, {
    x: startX, y: lineY, w: totalWidth, h: 0.03,
    fill: { color: C.gray },
  });

  // Milestones
  const stepWidth = totalWidth / (milestones.length - 1);
  milestones.forEach((m, i) => {
    const dotX = startX + i * stepWidth - 0.1;

    // Dot
    slide.addShape(pres.shapes.OVAL, {
      x: dotX, y: lineY - 0.085, w: 0.2, h: 0.2,
      fill: { color: m.color || C.purple },
    });

    // Date above
    slide.addText(m.date, {
      x: dotX - 0.4, y: lineY - 0.5, w: 1, h: 0.35,
      fontSize: 10, fontFace: FONT, color: C.dark, bold: true, align: "center", margin: 0,
    });

    // Label below
    slide.addText(m.label, {
      x: dotX - 0.5, y: lineY + 0.2, w: 1.2, h: 0.6,
      fontSize: 9, fontFace: FONT, color: C.darkGray, align: "center", margin: 0,
    });
  });
}

/**
 * Add a highlight box (rounded rectangle with optional border)
 */
function addHighlightBox(slide, pres, x, y, w, h, opts = {}) {
  const bg = opts.bg || C.brightLime;
  const borderColor = opts.borderColor || C.black;
  const borderWidth = opts.borderWidth || 5;
  const radius = opts.radius || 0.2;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: bg },
    line: { color: borderColor, width: borderWidth },
    rectRadius: radius,
  });
}

/**
 * Add a badge/label
 */
function addBadge(slide, text, x, y, opts = {}) {
  const bg = opts.bg || C.purple;
  const textColor = opts.textColor || C.white;
  const w = opts.w || 1.5;

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h: 0.35,
    fill: { color: bg },
    rectRadius: 0.15,
  });
  slide.addText(text.toUpperCase(), {
    x, y, w, h: 0.35,
    fontSize: 10, fontFace: FONT, color: textColor, bold: true,
    align: "center", valign: "middle", margin: 0,
  });
}

/**
 * Add a progress bar
 */
function addProgressBar(slide, pres, x, y, w, progress, opts = {}) {
  const h = opts.h || 0.25;
  const bgColor = opts.bgColor || C.gray;
  const fillColor = opts.fillColor || C.purple;

  // Background
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: bgColor },
    rectRadius: h / 2,
  });

  // Fill
  if (progress > 0) {
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: w * Math.min(progress, 1), h,
      fill: { color: fillColor },
      rectRadius: h / 2,
    });
  }
}

/**
 * Add a row of items with icons/emojis + labels
 * @param {Array} items - [{icon, label, description}]
 */
function addIconRow(slide, pres, items, y = 1.5, opts = {}) {
  const itemWidth = 9 / items.length;
  const iconSize = opts.iconSize || 0.6;

  items.forEach((item, i) => {
    const x = 0.5 + i * itemWidth;

    // Icon circle background
    slide.addShape(pres.shapes.OVAL, {
      x: x + (itemWidth - iconSize) / 2, y, w: iconSize, h: iconSize,
      fill: { color: item.color || C.purple },
    });

    // Icon/emoji
    slide.addText(item.icon, {
      x: x + (itemWidth - iconSize) / 2, y, w: iconSize, h: iconSize,
      fontSize: 24, fontFace: FONT, color: C.white,
      align: "center", valign: "middle", margin: 0,
    });

    // Label
    slide.addText(item.label, {
      x, y: y + iconSize + 0.15, w: itemWidth, h: 0.35,
      fontSize: 12, fontFace: FONT, color: C.black, bold: true, align: "center", margin: 0,
    });

    // Description
    if (item.description) {
      slide.addText(item.description, {
        x, y: y + iconSize + 0.5, w: itemWidth, h: 0.6,
        fontSize: 10, fontFace: FONT, color: C.darkGray, align: "center", margin: 0,
      });
    }
  });
}

/**
 * Add a 3-level pyramid diagram
 * @param {Array} levels - [{text, color}] from top to bottom
 */
function addPyramid(slide, pres, levels, y = 1.2) {
  const widths = [3, 5, 7];
  const heights = 1.0;
  const gap = 0.1;

  levels.forEach((level, i) => {
    const w = widths[i] || 7;
    const x = (10 - w) / 2;
    const levelY = y + i * (heights + gap);

    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: levelY, w, h: heights,
      fill: { color: level.color || (i === 0 ? C.coral : i === 1 ? C.purple : C.lavender) },
    });

    slide.addText(level.text, {
      x, y: levelY, w, h: heights,
      fontSize: 14, fontFace: FONT,
      color: i === 2 ? C.dark : C.white,
      bold: true, align: "center", valign: "middle", margin: 0,
    });
  });
}

/**
 * Add a convergence diagram (multiple inputs -> single output)
 * @param {Array} inputs - [{text, color}]
 * @param {Object} output - {text, color}
 */
function addConvergenceDiagram(slide, pres, inputs, output, y = 1.2) {
  const inputWidth = 2.2;
  const inputHeight = 0.8;
  const outputWidth = 3;
  const outputHeight = inputs.length * inputHeight + (inputs.length - 1) * 0.2;
  const gap = 0.2;

  // Input cards on left
  inputs.forEach((input, i) => {
    const inputY = y + i * (inputHeight + gap);
    addCard(slide, pres, 0.5, inputY, inputWidth, inputHeight, input.color || C.purple);
    slide.addText(input.text, {
      x: 0.7, y: inputY + 0.2, w: inputWidth - 0.4, h: inputHeight - 0.4,
      fontSize: 11, fontFace: FONT, color: C.black, bold: true, margin: 0,
    });

    // Arrow line
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 0.5 + inputWidth, y: inputY + inputHeight / 2 - 0.015, w: 1.5, h: 0.03,
      fill: { color: C.gray },
    });
  });

  // Output card on right
  const outputX = 0.5 + inputWidth + 1.5 + 0.3;
  slide.addShape(pres.shapes.RECTANGLE, {
    x: outputX, y, w: outputWidth, h: outputHeight,
    fill: { color: output.color || C.brightLime },
    line: { color: C.black, width: 3 },
  });
  slide.addText(output.text, {
    x: outputX + 0.2, y: y + outputHeight / 2 - 0.3, w: outputWidth - 0.4, h: 0.6,
    fontSize: 16, fontFace: FONT, color: C.dark, bold: true, align: "center", valign: "middle", margin: 0,
  });
}

/**
 * Add a screenshot with device frame styling
 */
function addScreenshot(slide, pres, imagePath, x, y, w, h, opts = {}) {
  const frameColor = opts.frameColor || C.darkGray;
  const framePadding = opts.framePadding || 0.1;

  // Frame background
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: x - framePadding, y: y - framePadding,
    w: w + framePadding * 2, h: h + framePadding * 2,
    fill: { color: frameColor },
    rectRadius: 0.1,
  });

  // Image
  slide.addImage({
    path: imagePath,
    x, y, w, h,
  });
}

/**
 * Add a callout/speech bubble pointing to something
 */
function addCallout(slide, pres, text, x, y, opts = {}) {
  const w = opts.w || 2.5;
  const h = opts.h || 1;
  const bg = opts.bg || C.brightLime;
  const direction = opts.direction || "down"; // down, up, left, right

  // Bubble
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: bg },
    line: { color: C.black, width: 2 },
    rectRadius: 0.15,
  });

  // Text
  slide.addText(text, {
    x: x + 0.15, y: y + 0.1, w: w - 0.3, h: h - 0.2,
    fontSize: 11, fontFace: FONT, color: C.dark, align: "center", valign: "middle", margin: 0,
  });

  // Pointer triangle (simplified as small rectangle for now)
  const pointerSize = 0.15;
  if (direction === "down") {
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x + w / 2 - pointerSize / 2, y: y + h, w: pointerSize, h: pointerSize,
      fill: { color: bg }, rotate: 45,
    });
  }
}

/**
 * Add before/after stat pair with arrow
 * @param {Object} before - {label, value}
 * @param {Object} after - {label, value}
 */
function addStatPair(slide, pres, before, after, y = 2) {
  const boxWidth = 2.5;
  const boxHeight = 1.2;

  // Before box
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 1.5, y, w: boxWidth, h: boxHeight,
    fill: { color: C.lavender },
  });
  slide.addText(before.label.toUpperCase(), {
    x: 1.5, y: y + 0.1, w: boxWidth, h: 0.3,
    fontSize: 10, fontFace: FONT, color: C.darkGray, bold: true, align: "center", margin: 0,
  });
  slide.addText(before.value, {
    x: 1.5, y: y + 0.4, w: boxWidth, h: 0.6,
    fontSize: 28, fontFace: FONT, color: C.dark, bold: true, align: "center", margin: 0,
  });

  // Arrow
  slide.addText("→", {
    x: 4.2, y: y + 0.3, w: 1.6, h: 0.6,
    fontSize: 36, fontFace: FONT, color: C.purple, align: "center", margin: 0,
  });

  // After box
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 6, y, w: boxWidth, h: boxHeight,
    fill: { color: C.brightLime },
    line: { color: C.black, width: 2 },
  });
  slide.addText(after.label.toUpperCase(), {
    x: 6, y: y + 0.1, w: boxWidth, h: 0.3,
    fontSize: 10, fontFace: FONT, color: C.darkGray, bold: true, align: "center", margin: 0,
  });
  slide.addText(after.value, {
    x: 6, y: y + 0.4, w: boxWidth, h: 0.6,
    fontSize: 28, fontFace: FONT, color: C.dark, bold: true, align: "center", margin: 0,
  });
}

/**
 * Add an agenda list with timing
 * @param {Array} items - [{title, time, active}]
 */
function addAgendaList(slide, pres, items, x = 0.5, y = 1.2) {
  const rowHeight = 0.7;

  items.forEach((item, i) => {
    const itemY = y + i * rowHeight;
    const bg = item.active ? C.purple : C.white;
    const textColor = item.active ? C.white : C.black;

    // Row background
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y: itemY, w: 9, h: rowHeight - 0.1,
      fill: { color: bg },
      shadow: item.active ? null : makeShadow(),
    });

    // Number
    slide.addText(String(i + 1), {
      x: x + 0.15, y: itemY + 0.1, w: 0.4, h: rowHeight - 0.3,
      fontSize: 14, fontFace: FONT, color: item.active ? C.white : C.purple,
      bold: true, valign: "middle", margin: 0,
    });

    // Title
    slide.addText(item.title, {
      x: x + 0.6, y: itemY + 0.1, w: 6.5, h: rowHeight - 0.3,
      fontSize: 14, fontFace: FONT, color: textColor, bold: item.active, valign: "middle", margin: 0,
    });

    // Time
    slide.addText(item.time, {
      x: x + 7.2, y: itemY + 0.1, w: 1.5, h: rowHeight - 0.3,
      fontSize: 12, fontFace: FONT, color: item.active ? C.lavender : C.darkGray,
      align: "right", valign: "middle", margin: 0,
    });
  });
}

/**
 * Add a user persona card
 * @param {Object} persona - {name, role, quote, painPoints: [], imagePath}
 */
function addPersona(slide, pres, persona, x = 0.5, y = 1, opts = {}) {
  const w = opts.w || 4.3;
  const h = opts.h || 3.5;

  // Card background
  addCard(slide, pres, x, y, w, h, C.purple);

  // Avatar placeholder (circle)
  slide.addShape(pres.shapes.OVAL, {
    x: x + 0.3, y: y + 0.3, w: 0.8, h: 0.8,
    fill: { color: C.lavender },
  });
  slide.addText("👤", {
    x: x + 0.3, y: y + 0.3, w: 0.8, h: 0.8,
    fontSize: 32, align: "center", valign: "middle", margin: 0,
  });

  // Name
  slide.addText(persona.name, {
    x: x + 1.3, y: y + 0.35, w: w - 1.6, h: 0.35,
    fontSize: 14, fontFace: FONT, color: C.black, bold: true, margin: 0,
  });

  // Role
  slide.addText(persona.role, {
    x: x + 1.3, y: y + 0.7, w: w - 1.6, h: 0.3,
    fontSize: 11, fontFace: FONT, color: C.purple, margin: 0,
  });

  // Quote
  if (persona.quote) {
    slide.addText(`"${persona.quote}"`, {
      x: x + 0.3, y: y + 1.2, w: w - 0.6, h: 0.8,
      fontSize: 11, fontFace: FONT, color: C.darkGray, italic: true, margin: 0,
    });
  }

  // Pain points
  if (persona.painPoints && persona.painPoints.length > 0) {
    slide.addText("PAIN POINTS", {
      x: x + 0.3, y: y + 2.1, w: w - 0.6, h: 0.25,
      fontSize: 9, fontFace: FONT, color: C.coral, bold: true, margin: 0,
    });
    persona.painPoints.forEach((point, i) => {
      slide.addText(`• ${point}`, {
        x: x + 0.3, y: y + 2.4 + i * 0.3, w: w - 0.6, h: 0.3,
        fontSize: 10, fontFace: FONT, color: C.darkGray, margin: 0,
      });
    });
  }
}

/**
 * Add a 2x2 matrix (e.g., priority/impact grid)
 * @param {Object} labels - {top, bottom, left, right}
 * @param {Array} quadrants - [{text, color}] in order: topLeft, topRight, bottomLeft, bottomRight
 */
function addMatrix(slide, pres, labels, quadrants, y = 1.2) {
  const size = 3.2;
  const x = (10 - size) / 2;
  const gap = 0.05;
  const halfSize = (size - gap) / 2;

  // Quadrants
  const positions = [
    { qx: x, qy: y },                           // top-left
    { qx: x + halfSize + gap, qy: y },          // top-right
    { qx: x, qy: y + halfSize + gap },          // bottom-left
    { qx: x + halfSize + gap, qy: y + halfSize + gap }, // bottom-right
  ];

  quadrants.forEach((q, i) => {
    const pos = positions[i];
    slide.addShape(pres.shapes.RECTANGLE, {
      x: pos.qx, y: pos.qy, w: halfSize, h: halfSize,
      fill: { color: q.color || C.lavender },
    });
    slide.addText(q.text, {
      x: pos.qx + 0.1, y: pos.qy + 0.1, w: halfSize - 0.2, h: halfSize - 0.2,
      fontSize: 10, fontFace: FONT, color: C.dark, align: "center", valign: "middle", margin: 0,
    });
  });

  // Axis labels
  slide.addText(labels.top, {
    x, y: y - 0.35, w: size, h: 0.3,
    fontSize: 10, fontFace: FONT, color: C.darkGray, align: "center", margin: 0,
  });
  slide.addText(labels.bottom, {
    x, y: y + size + 0.05, w: size, h: 0.3,
    fontSize: 10, fontFace: FONT, color: C.darkGray, align: "center", margin: 0,
  });
  slide.addText(labels.left, {
    x: x - 1.2, y: y + size / 2 - 0.15, w: 1, h: 0.3,
    fontSize: 10, fontFace: FONT, color: C.darkGray, align: "right", margin: 0,
  });
  slide.addText(labels.right, {
    x: x + size + 0.2, y: y + size / 2 - 0.15, w: 1, h: 0.3,
    fontSize: 10, fontFace: FONT, color: C.darkGray, align: "left", margin: 0,
  });
}

/**
 * Add a code block with monospace styling
 */
function addCodeBlock(slide, code, x, y, w, h, opts = {}) {
  const bg = opts.bg || C.darkGray;
  const textColor = opts.textColor || C.white;
  const fontSize = opts.fontSize || 10;

  // Background
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: bg },
  });

  // Code text
  slide.addText(code, {
    x: x + 0.2, y: y + 0.15, w: w - 0.4, h: h - 0.3,
    fontSize, fontFace: "Courier New", color: textColor, margin: 0,
    valign: "top",
  });
}

// ============================================================
// PRESENTATION CONTENT - MODIFY EVERYTHING BELOW THIS LINE
// ============================================================

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "superhero.tech";
  pres.title = "Sample Presentation";

  const TOTAL_SLIDES = 5;

  // --- SLIDE 1: Title slide (coral background) ---
  let s1 = pres.addSlide();
  s1.background = { color: C.coral };
  addSlideNumber(s1, 1, TOTAL_SLIDES, { color: C.dark });
  s1.addText("Your presentation title", {
    x: 0.5, y: 0.8, w: 9, h: 2.5,
    fontSize: FONT_SIZE.heroTitle, fontFace: FONT, color: C.black, bold: true, margin: 0,
  });
  s1.addText("WOJCIECH STRZALKOWSKI  @  SUPERHERO.TECH", {
    x: 0.5, y: 4.8, w: 9, h: 0.4,
    fontSize: 11, fontFace: FONT, color: C.dark, margin: 0,
  });

  // --- SLIDE 2: Content slide (cream background) ---
  let s2 = pres.addSlide();
  s2.background = { color: C.cream };
  addSlideNumber(s2, 2, TOTAL_SLIDES);
  s2.addText("Section title", {
    x: 0.5, y: 0.6, w: 9, h: 0.55,
    fontSize: FONT_SIZE.slideTitle, fontFace: FONT, color: C.black, bold: true, margin: 0,
  });
  addCardsGrid(s2, pres, [
    { title: "Card title", description: "Description text here", accent: C.purple },
    { title: "Card title", description: "Description text here", accent: C.lime },
  ], 1.4, 2);

  // --- SLIDE 3: Subsection slide (purple background) ---
  addSubsectionSlide(pres, 3, TOTAL_SLIDES, "Big Idea");

  // --- SLIDE 4: Question slide (lavender + purple box) ---
  addQuestionSlide(pres, 4, TOTAL_SLIDES, "What problem are we solving for our users?");

  // --- SLIDE 5: Closing slide (coral background) ---
  let s5 = pres.addSlide();
  s5.background = { color: C.coral };
  addSlideNumber(s5, 5, TOTAL_SLIDES, { color: C.dark });
  s5.addText("Thank you!", {
    x: 0.5, y: 1.5, w: 9, h: 1.0,
    fontSize: 44, fontFace: FONT, color: C.black, bold: true, margin: 0,
  });
  s5.addText("superhero.tech", {
    x: 0.5, y: 2.8, w: 9, h: 0.5,
    fontSize: 18, fontFace: FONT, color: C.dark, bold: true, margin: 0,
  });

  // === WRITE FILE ===
  const outputPath = process.argv[2] || "./output.pptx";
  await pres.writeFile({ fileName: outputPath });
  console.log(`Created: ${outputPath}`);
}

main().catch(console.error);

---
name: youtube
description: Create a video summary note from a YouTube URL with metadata, key ideas, and detailed notes for Obsidian vault
---

# YouTube Video Summary Skill

Create a comprehensive note from a YouTube video for the Obsidian vault.

## Input

The user provides a YouTube URL as `$ARGUMENTS`.

## Steps

### 1. Extract Video Metadata

**Method A - Local (yt-dlp):**
```bash
yt-dlp --skip-download --print "%(title)s|||%(channel)s|||%(upload_date)s|||%(description).500s" "$ARGUMENTS"
```

**Method B - Sandboxed environment (if yt-dlp fails with network/proxy error):**
1. Extract video ID from URL (e.g., `dQw4w9WgXcQ` from `youtube.com/watch?v=dQw4w9WgXcQ`)
2. Use WebSearch: `"[video ID]" site:youtube.com`
3. This gets you the title and channel name from search results

### 2. Get Transcript

**Method A - Local (yt-dlp):**
```bash
yt-dlp --skip-download --write-auto-subs --sub-langs "en,pl" --sub-format "vtt" -o "/tmp/yt_transcript" "$ARGUMENTS"
```

Clean the VTT file:
```bash
cat /tmp/yt_transcript.*.vtt | grep -v "^WEBVTT" | grep -v "^Kind:" | grep -v "^Language:" | grep -v "^[0-9][0-9]:[0-9][0-9]" | grep -v "^$" | grep -v "align:start" | sed 's/<[^>]*>//g' | perl -ne 'print unless $seen{$_}++' | tr '\n' ' ' | sed 's/  */ /g'
```

**Method B - Sandboxed environment (if yt-dlp fails):**
1. Try WebFetch on `https://www.youtubetranscript.com/?v=[VIDEO_ID]`
2. If that fails, ask the user: "I can't access YouTube from this environment. Please paste the transcript (from YouTube's 'Show transcript' feature) and I'll create the note."

### 3. Classify Video Type

Before writing, classify the video into one of two types based on the transcript:

- **Explainer/Tutorial**: The video walks through features, tools, how-tos, workflows, or step-by-step processes. The value is in the *specifics of what exists and how to use it*. Examples: tool demos, product walkthroughs, coding tutorials, "X ways to use Y" videos.
- **Idea/Opinion**: The video argues a thesis, shares an experience, tells a story, interviews someone, or presents a perspective. The value is in the *argument, reasoning, and evidence*. Examples: talks, podcasts, essays, debates, interviews.

When in doubt, ask: "Would the reader want a reference they can scan and act on, or a narrative they can absorb?" Pick accordingly.

### 4. Generate Summary Note

**YAML Frontmatter (both types):**
```yaml
---
date: YYYY-MM-DD (upload date if known, otherwise today)
title: "Video Title"
author: Channel Name
source: [the YouTube URL]
topic: [2-4 relevant topic tags]
type: video
---
```

---

#### Structure A: Explainer/Tutorial Videos

```markdown
# Video Title

## What This Covers
[1-2 sentences: what tool/topic, who it's for, why it matters]

## Core Concepts
[Brief bullets covering the foundational "what is this" and "how does it work" before diving into features. Include limits, pricing, key mental models.]

## Features & How-Tos

### Feature Name
What it does, how to access it, and practical details. Include specific steps, UI locations, settings, and options mentioned. If the presenter showed a workaround or tip, include it here.

### Feature Name
[Repeat for each distinct feature or capability covered]

## Tips & Gotchas
- Practical tips, workarounds, and non-obvious limitations mentioned in the video
- Things that break or don't work as expected

## Use Cases
- Specific real-world applications demonstrated or suggested in the video
- Group by category if there are many (e.g., "For students", "For content creators", "For business")

## Source
[YouTube URL]
```

**What to capture in each feature section:**
- The exact capability (what it does)
- How to access or trigger it (button location, menu path, specific steps)
- Options and settings (formats, styles, limits)
- Concrete example from the video showing it in action
- Any numbers: limits, word counts, file sizes, costs

**The goal:** Someone reading this note can USE the tool/follow the process without watching the video. It's a reference doc, not a narrative.

---

#### Structure B: Idea/Opinion Videos

```markdown
# Video Title

## Key Ideas
- (5-10 key ideas - be comprehensive, don't oversimplify)

## Summary
[3-5 paragraphs summarizing the video content]

## Notable Quotes
> "Direct quote from the video if particularly insightful"

## Source
[YouTube URL]
```

**What to capture in Key Ideas and Summary:**

1. **Concrete examples** - The specific scenarios, use cases, or stories that make the point stick. Don't abstract them away.

2. **Specific numbers and metrics** - Token counts, percentages, timeframes, costs. "700,000 words" is better than "a lot of text."

3. **Risks and consequences** - Not just "it might fail" but HOW it fails. Hallucination is worse than "missing info."

4. **Practical considerations** - Implementation details mentioned in the video.

5. **Research or authority backing** - If they cite research or say "studies show," include it.

6. **The full nuance** - Capture BOTH sides of any argument. Explain when X wins and when Y wins.

7. **Technical specifics** - Component names, strategy options, scale references.

8. **Illustrative anecdotes** - Personal stories that make abstract points memorable. E.g., "Tommy knew art history so he could prompt Midjourney with genre, palette, artistic inspiration - I could only say 'make pretty pictures of robots.'" These stories ARE the insight.

9. **"We actually do X" statements** - When speakers reveal their actual practice vs theory. "We've rebuilt the codebase three times this month" or "We've killed projects on ethical grounds" - these are gold.

10. **Contrarian or surprising claims** - Statements that go against conventional wisdom. "Don't worry about token costs" or "Moats are overhyped" - if it would surprise most people, highlight it.

11. **Specific tools and products by name** - "Claude Code is fantastic since Claude 4 release" or "I use o3 for coding" - name names, include versions/timing if mentioned.

12. **Metaphors and mental models** - Lego bricks combining combinatorially, one-way vs two-way doors, wandering the idea maze. These frameworks help readers think, not just know.

13. **Strong claims about industry behavior** - "I've been in the room where businesses said stuff to regulators that was just not true" - these insider observations are rare and valuable.

14. **Ethical/values statements** - When speakers reveal their principles. "Look in your heart - if it won't make people better off, don't build it."

**The goal:** Someone reading this note should be able to discuss the topic intelligently without watching the video.

### Special attention: Q&A sections

Q&A portions often contain the most valuable nuggets because:
- Speakers go off-script and share unpolished truths
- Questions force specificity ("What tools do you actually use?")
- Controversial opinions emerge that wouldn't make the main talk
- Personal practices get revealed

**Always scan the entire transcript including Q&A.** Don't stop summarizing when the main talk ends.

### 5. Save the Note

Save to Inbox:
`/Users/wojciechstrzalkowski/code/Obsidian Vault/01 Inbox/`

Filename from title:
- Remove special characters
- Keep spaces (Obsidian-friendly)
- Example: "How to Build Products Faster.md"

## Quality Guidelines

Follow the Writing Guidelines from `99 System/Writing Guidelines.md`:
- Short paragraphs (2-4 sentences)
- Specific details over vague claims
- No AI marker words (delve, tapestry, pivotal, foster, etc.)
- Direct language, no hedging

**Self-check before saving (both types):**
- Did I include specific numbers/metrics mentioned?
- Could someone discuss this topic intelligently from my notes alone?

**Additional self-check for Explainer/Tutorial:**
- Did I list every distinct feature or capability demonstrated?
- For each feature, did I include how to access it and what options exist?
- Could someone USE this tool or follow this process from my notes without watching the video?
- Did I capture workarounds, tips, and gotchas?

**Additional self-check for Idea/Opinion:**
- Did I include the best concrete example from the video?
- Did I explain HOW things fail, not just that they might fail?
- Did I capture both sides of any tradeoff?
- Did I capture illustrative anecdotes that make points memorable?
- Did I include "we actually do X" statements revealing real practices?
- Did I note contrarian/surprising claims that go against conventional wisdom?
- Did I name specific tools, products, or companies mentioned?
- Did I capture memorable metaphors or mental models?
- Did I scan the Q&A section for unique insights not in the main talk?
- Did I include any strong claims about industry behavior or insider observations?

## Cleanup

After completion (local only):
```bash
rm -f /tmp/yt_transcript*
```

---
name: youtube
description: Create a video summary note from a YouTube URL, then compile into 4-Knowledge/ wiki page via Karpathy method
source_repo: /Users/wojtek/code/claude-skills/youtube/SKILL.md
type: skill-reference
---

# YouTube Video Summary Skill

Create a comprehensive note from a YouTube video for the Obsidian vault.

Important: tutorial and walkthrough videos should be turned into usable step-by-step guides, not just summarized.

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

## Step-by-Step Tutorial

### Step 1: [Action]
What to click, type, open, or configure. Use imperative language. Include exact UI locations, inputs, and what should happen next.

![[screenshot-file-name.jpg]]

### Step 2: [Action]
[Repeat for each major stage of the workflow]

## Key Features & How They Work

### Feature Name
What it does, where it appears, and when to use it.

## Tips & Gotchas
- Practical tips, workarounds, and non-obvious limitations mentioned in the video
- Things that break or don't work as expected

## Use Cases
- Specific real-world applications demonstrated or suggested in the video
- Group by category if there are many (e.g., "For students", "For content creators", "For business")

## Source
[YouTube URL]
```

**What to capture in tutorial videos:**
- The actual sequence of actions from the video
- Exact UI locations, buttons, menus, toggles, routes, and inputs
- What the presenter typed or configured when it matters
- What happened after each step
- Breaks, bugs, retries, and fixes shown in the video
- Options and settings (formats, styles, limits)
- Concrete examples from the video showing the feature in action
- Any numbers: limits, word counts, file sizes, costs, prices

**Screenshots are required for tutorial/walkthrough videos whenever local extraction is feasible.**
- Capture screenshots of key moments from the video
- Prefer 4-8 screenshots for major workflow stages rather than every tiny action
- Save them next to the note when that fits the vault's pattern
- Embed them inline with Obsidian image embeds like `![[file.jpg]]`
- Add screenshots at moments where the UI changes, a key setting appears, a result is shown, or a bug/fix becomes visible

**The goal:** Someone reading this note can follow the workflow without watching the video. Write it like a guide, not a recap.

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

### 5. Save & Ingest

**Step A: Save source note to Inbox**

Save to: `/Users/wojtek/Documents/Second brain/2-Inbox/`

Filename from title:
- Remove special characters
- Keep spaces (Obsidian-friendly)
- Example: "How to Build Products Faster.md"

**Step B: Compile to Knowledge (Karpathy method)**

After saving the source note, run the Ingest workflow from `8-System/brain.md`:
1. Check if a wiki page for this topic already exists in `4-Knowledge/`
2. If yes: UPDATE the existing page with new insights, add this source to the YAML sources list
3. If no: CREATE a new wiki page in the appropriate `4-Knowledge/` subfolder with a human-readable title
4. Add `[[backlinks]]` to related wiki pages
5. Add `[source: filename.md]` citations
6. Move the source note from `2-Inbox/` to `5-Raw/`

**Step C: Archive**

Move processed source note to `5-Raw/`

## Quality Guidelines

Follow the Writing Guidelines from `8-System/voice/Writing Guidelines.md`:
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
- Did I convert the walkthrough into an actual step-by-step sequence instead of a summary?
- Did I include screenshots of the key moments?
- Does each screenshot correspond to a real step, state change, result, or debugging moment?

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

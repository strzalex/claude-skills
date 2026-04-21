---
name: sort-into-vault
description: Sort markdown notes from Clippings/ into the appropriate 40 Resources/ subfolder. Renames Twitter threads to descriptive titles.
---

# Sort Into Vault Skill

Organize unsorted notes from the intake folder into the vault's resource taxonomy. Enriches notes with standardized frontmatter and TL;DR summaries.

## Input

Optional `$ARGUMENTS`:
- A specific filename to sort
- `--all` to process all files in Clippings/
- `--dry-run` to preview without moving

If no arguments, list files in Clippings/ and ask which to sort.

## Vault Paths

- **Intake**: `/Users/wojciechstrzalkowski/Documents/Obsidian/Obsidian Vault/Clippings/`
- **Destination**: `/Users/wojciechstrzalkowski/Documents/Obsidian/Obsidian Vault/40 Resources/`

## Taxonomy

| Category | Subcategories | What goes here |
|----------|---------------|----------------|
| AI & Development | — | AI engineering, ML techniques, AI coding patterns |
| AI Agents | — | Autonomous agents, agent frameworks, multi-agent systems |
| AI Tools | Design & Visual, Learning & Strategy, Local & Open Source, Productivity & Knowledge | Specific AI tools and how to use them |
| Business & Startups | Founder Stories, Ideas & Opportunities, Strategy & Growth | Business strategy, startup advice, founder experiences |
| Claude Code | Courses & Learning, Culture & Vision, Models & Updates, Tips & Workflows, Use Cases & Demos | Anything Claude/Anthropic specific |
| Design & Product | Product & AI Design, UI & Design Tips | Design systems, UI patterns, product design |
| Dev Tools & Coding | — | IDEs, languages, frameworks, dev workflows (non-AI) |
| Finance | — | Personal finance, investing, crypto |
| Health & Wellness | — | Health, fitness, mental wellness |
| Marketing & Growth | — | Marketing tactics, growth strategies, SEO |
| MCP | — | Model Context Protocol servers, integrations |
| News & Industry | AI Market & Companies, Big Picture, Jobs & Future of Work | Industry news, market analysis, future of work |
| OpenAI & ChatGPT | — | OpenAI-specific content |
| Product Development | — | Product management, roadmaps, discovery |
| Productivity | — | Personal productivity, systems, habits |
| Prompt Engineering | — | Prompting techniques, prompt libraries |
| Science & Research | — | Academic research, papers, studies |
| Vibe Coding | — | Coding aesthetics, vibe-driven dev content |
| General | — | Doesn't fit elsewhere |

## Processing Pipeline

For each file, execute these steps in order:

### Step 1: Read & Analyze

Read the full file content. Extract:
- Existing frontmatter (if any)
- Main content
- Source URL (if present)
- Author/handle (if present)

### Step 2: Handle Twitter Threads

Files matching `Thread by @*.md`:

1. Extract the core topic/argument
2. Generate descriptive title: `[Author] on [Topic].md`
3. Rename file before continuing

Examples:
- `Thread by @aakashgupta.md` → `Aakash Gupta on Why PMs Need to Learn AI Tools.md`
- `Thread by @DeRonin_.md` → `Ronin on 7-Stage App Growth Roadmap.md`

### Step 3: Duplicate Check

Search `40 Resources/` for similar content:
```bash
grep -r -l "distinctive phrase from note" "/Users/wojciechstrzalkowski/Documents/Obsidian/Obsidian Vault/40 Resources/"
```

If potential duplicate found:
- Show both files
- Ask user: merge, skip, or proceed anyway?

### Step 4: Quality Gate

Flag and ask user about:
- **Too short**: < 200 characters of actual content
- **Link-only**: Just a URL with no substance
- **Low-signal**: Hot takes, no actionable content

Options: `[Sort anyway]` `[Delete]` `[Skip]`

### Step 5: Normalize Frontmatter

Create or update YAML frontmatter with this structure:

```yaml
---
title: "Descriptive Title Here"
author: "Name or @handle"
source: "https://original-url.com"
date: YYYY-MM-DD
topics:
  - topic-1
  - topic-2
type: article | thread | video | tutorial | tool
---
```

**Field rules:**
- `title`: Use filename (without .md) or extract from H1
- `author`: Extract from content, thread handle, or leave empty
- `source`: Look for URLs in content, preserve if found
- `date`: Extract if present, otherwise use today's date
- `topics`: 2-4 lowercase kebab-case tags based on content
- `type`: Classify the content format

**If frontmatter exists**: Merge new fields, don't overwrite existing values.

### Step 6: Generate TL;DR

Add a blockquote summary immediately after frontmatter:

```markdown
> **TL;DR**: [2-3 sentences capturing the core insight, argument, or value of this note. Be specific—include the key takeaway someone would want to remember.]
```

**TL;DR guidelines:**
- Start with what this IS (thread about X, tutorial for Y, argument that Z)
- Include the single most important insight or number
- End with why it matters or who it's for
- No fluff, no "this article discusses"

**Examples:**

Bad:
> **TL;DR**: This thread discusses product management and AI tools.

Good:
> **TL;DR**: Thread arguing that PMs who can't prototype with AI will be replaced by those who can. Key insight: the skill gap isn't technical—it's willingness to look stupid while learning. Relevant for PMs wondering whether to invest time in AI tools.

### Step 7: Classify

Based on enriched content, determine:
1. **Primary category** from taxonomy
2. **Subcategory** if applicable
3. **Confidence**: high/medium/low

If confidence is low, ask the user.

### Step 8: Apply Changes & Move

1. Write the enriched content back to the file:
   - Updated frontmatter
   - TL;DR block
   - Original content (preserved)

2. Move to destination:
```bash
mv "source/file.md" "destination/file.md"
```

## Batch Mode (`--all`)

1. List all files in Clippings/
2. For each file, run Steps 1-7 (analyze, enrich, classify)
3. Present summary table:

| File | New Title | TL;DR (truncated) | Destination | Issues |
|------|-----------|-------------------|-------------|--------|
| Thread by @x.md | X on Topic | "Key insight..." | AI Agents/ | — |
| article.md | — | "Framework for..." | Business/Strategy | duplicate? |

4. Ask: `[Move all]` `[Review individually]` `[Export list]`
5. Execute moves
6. Report: X sorted, Y skipped, Z flagged

## Output Format

After processing each file, report:

```
✓ Processed: "Original filename.md"
  → Title: "New Descriptive Title.md" (if renamed)
  → TL;DR: "First 80 chars of summary..."
  → Destination: 40 Resources/Category/Subcategory/
  → Topics: #topic-1, #topic-2
```

## Quality Guidelines

**Good TL;DRs:**
- Specific, not generic
- Include numbers/metrics when present
- Name the core argument or insight
- 2-3 sentences max

**Good titles:**
- Descriptive of content
- 5-10 words
- Format: `[Person/Company] on [Topic]` or `[Action] [Topic]`
- No clickbait, no emojis

**Good topics (tags):**
- Lowercase, kebab-case
- Specific over generic (`claude-code` not `ai`)
- 2-4 per note

## Edge Cases

- **Duplicate filenames**: Append ` 2`, ` 3` if destination has same name
- **Polish content**: Same process; write TL;DR in the same language as content
- **Screenshots/images**: Skip with note
- **Empty files**: Flag for deletion
- **Very long content**: TL;DR should still be 2-3 sentences; don't scale with length

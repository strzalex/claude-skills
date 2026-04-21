# Claude Code Skills

Personal collection of Claude Code skills for use across machines.

## Installation

```bash
# Clone to your .claude directory
git clone https://github.com/strzalex/claude-skills.git ~/.claude/skills
```

Or to update existing skills:

```bash
cd ~/.claude/skills && git pull
```

## Skills

| Skill | Description |
|-------|-------------|
| `youtube` | Create video summary notes from YouTube URLs for Obsidian vault |
| `seocheck` | Run SEO/Performance/Accessibility audits using Lighthouse |
| `speckit` | Create technical specifications using GitHub SpecKit format |
| `sort-into-vault` | Sort markdown notes into Obsidian vault folders |
| `guest-research` | Research podcast/interview guests |
| `superhero-presentations` | Create branded presentation decks |

## Usage

Invoke skills with slash commands:

```
/youtube https://www.youtube.com/watch?v=...
/seocheck https://example.com
/speckit
```

## Structure

Each skill folder contains:
- `SKILL.md` - Main skill definition with instructions
- `references/` - Supporting files (optional)
- `examples/` - Example outputs (optional)

# SpecKit Skill for Claude Code

This skill helps you create comprehensive technical specifications using GitHub SpecKit format for spec-driven development.

## Quick Start

### Manual Invocation
```bash
/speckit user authentication
/speckit video favorites and bookmarks
/speckit payment integration with Stripe
```

### Auto-Invocation
Claude will automatically use this skill when you describe a feature:
```
"I want to add user favorites functionality so users can bookmark their favorite videos"
```

## What This Skill Does

1. **Research Phase**
   - Reads existing specs to understand your patterns
   - Checks project constitution for compliance
   - Reviews CLAUDE.md for context
   - Asks clarifying questions if needed

2. **Spec Creation**
   - Creates `specs/XXX-feature-name/` directory
   - Writes `spec.md` (user-focused requirements)
   - Writes `plan.md` (technical implementation)
   - Creates `checklists/requirements.md` (validation)

3. **Quality Assurance**
   - Validates against project constitution
   - Ensures consistent formatting
   - Includes testable acceptance criteria
   - Provides clear implementation steps

## File Structure

```
specs/
└── XXX-feature-name/
    ├── spec.md                 # What to build (user scenarios, requirements)
    ├── plan.md                 # How to build (technical approach, steps)
    └── checklists/
        └── requirements.md     # Validation checklist
```

## Spec Format

### spec.md (User-Focused)
- Feature overview and goals
- User stories with Given-When-Then scenarios
- Functional requirements (FR-001, FR-002, etc.)
- Success criteria (SC-001, SC-002, etc.)
- Assumptions, dependencies, out of scope

### plan.md (Technical)
- Technical context and dependencies
- Constitution compliance check
- Project structure (files to create/modify)
- Step-by-step implementation checklist
- Exit criteria and quick reference

## Examples

See `examples/example-spec.md` for a complete example following your project's format.

## Configuration

The skill is configured to:
- ✅ Auto-invoke when relevant
- ✅ Use Read, Write, Edit, Grep, Glob, Bash tools
- ✅ Ask clarifying questions via AskUserQuestion
- ✅ Follow your established patterns and conventions

## Tips

1. **Be specific**: "Add video favorites" is better than "improve UX"
2. **Provide context**: Mention related features or dependencies
3. **Review output**: The skill creates comprehensive specs, but you should review and refine
4. **Iterate**: You can ask Claude to modify the spec after creation

## Customization

Edit `.claude/skills/speckit/SKILL.md` to:
- Change the prompt instructions
- Add project-specific guidelines
- Modify the format/structure
- Add additional validation rules

## Testing

Test the skill is working:
```bash
/speckit test feature
```

Claude should create a new spec directory and files.

## Troubleshooting

**Skill not appearing**: Restart Claude Code to reload skills

**Wrong format**: The skill reads existing specs for patterns - ensure your existing specs are well-formatted

**Missing sections**: Check the SKILL.md file for required sections list

## Integration with Your Workflow

This skill integrates with your existing SpecKit workflow:

1. **Spec Phase**: Use `/speckit` → generates spec.md, plan.md
2. **Clarify Phase**: Review and refine with Claude
3. **Plan Phase**: Implementation plan already in plan.md
4. **Implement Phase**: Follow plan.md step-by-step
5. **Validate Phase**: Use checklists/requirements.md

---

For more information about GitHub SpecKit: https://github.com/github/spec-kit

Sources:
- [GitHub Spec Kit Repository](https://github.com/github/spec-kit)
- [Exploring spec-driven development with GitHub Spec Kit](https://blog.logrocket.com/github-spec-kit/)
- [GitHub Spec Kit Review (2026)](https://vibecoding.app/blog/spec-kit-review)

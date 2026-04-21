---
name: speckit
description: Create comprehensive technical specifications using GitHub SpecKit format. Automatically invoked when planning features, writing requirements, or documenting system behavior for spec-driven development.
argument-hint: [feature-name or description]
disable-model-invocation: false
allowed-tools: Read, Write, Edit, Grep, Glob, Bash, AskUserQuestion
---

# SpecKit Specification Writer

You are a specification expert using GitHub SpecKit format for spec-driven development. Create thorough, actionable specifications that follow the project's established patterns.

## Task: Create Specification for $ARGUMENTS

## SpecKit Workflow

Follow this structured workflow:

### Phase 1: Discovery & Research (REQUIRED)

1. **Check existing specs** for patterns and structure:
   ```bash
   ls -la specs/
   ```

2. **Read the project constitution** (if it exists):
   ```bash
   cat constitution.md 2>/dev/null || cat CONSTITUTION.md 2>/dev/null
   ```

3. **Read CLAUDE.md** for project context:
   ```bash
   cat CLAUDE.md
   ```

4. **Find similar existing specs** to understand the format:
   ```bash
   find specs/ -name "spec.md" | head -3
   ```
   Then read 1-2 examples to understand the structure.

5. **Ask clarifying questions** if the user's request is ambiguous:
   - What problem does this solve?
   - Who are the users?
   - What's the priority level (P1=MVP, P2=Important, P3=Nice-to-have)?
   - Are there dependencies on other features?

### Phase 2: Create Specification Structure

Create a new spec directory following the pattern `XXX-feature-name`:

```
specs/XXX-feature-name/
├── spec.md              # User-focused specification (what to build)
├── plan.md              # Technical implementation plan (how to build)
└── checklists/
    └── requirements.md  # Validation checklist
```

**Naming convention**: Use the next available number (check existing specs first).

### Phase 3: Write spec.md (User-Focused)

The `spec.md` file should include:

#### Required Sections

1. **Feature Specification Header**
   ```markdown
   # Feature Specification: [Feature Name]

   **Feature Branch**: `XXX-feature-name`
   **Created**: [date]
   **Status**: Draft
   **Input**: User description: "[original user request]"
   ```

2. **User Scenarios & Testing** *(mandatory)*
   - Write 3-5 user stories in priority order (P1, P2, P3)
   - Each story MUST include:
     - User persona and goal
     - **Why this priority**: Business justification
     - **Independent Test**: How to verify it works standalone
     - **Acceptance Scenarios**: Given-When-Then format
   - Include Edge Cases section

   Example format:
   ```markdown
   ### User Story 1 - [Title] (Priority: P1)

   As a [persona], I need to [action] so that [benefit].

   **Why this priority**: [Business justification]

   **Independent Test**: [How to test this feature standalone]

   **Acceptance Scenarios**:
   1. **Given** [context], **When** [action], **Then** [outcome]
   2. **Given** [context], **When** [action], **Then** [outcome]
   ```

3. **Requirements** *(mandatory)*
   - Functional Requirements (FR-001, FR-002, etc.)
   - Key Entities (data models with attributes)
   - Use "MUST" for required, "SHOULD" for recommended

4. **Success Criteria** *(mandatory)*
   - Measurable outcomes (SC-001, SC-002, etc.)
   - Performance targets
   - Quality metrics

5. **Assumptions**
   - What we're assuming is true
   - External dependencies

6. **Dependencies**
   - Required services/APIs
   - Other features that must exist first

7. **Out of Scope**
   - What we're explicitly NOT building
   - Future enhancements

### Phase 4: Write plan.md (Technical Implementation)

The `plan.md` file should include:

#### Required Sections

1. **Plan Header**
   ```markdown
   # Implementation Plan: [Feature Name]

   **Branch**: `XXX-feature-name` | **Date**: [date] | **Spec**: [spec.md](./spec.md)
   ```

2. **Summary**
   - High-level technical approach
   - Key architectural decisions
   - What we're building (P1/P2/P3 breakdown)

3. **Technical Context**
   - Language/Version
   - Primary Dependencies
   - Storage/Testing/Target Platform
   - Performance Goals
   - Constraints
   - Scale/Scope

4. **Constitution Check** *(mandatory)*
   - Verify against project principles
   - List each principle with ✅ PASS or ❌ FAIL
   - Justify any violations

5. **Project Structure**
   - Documentation structure (this spec)
   - Source code structure (where files will be created)

6. **Complexity Tracking**
   - Note any constitution violations
   - Justify why they're necessary

7. **Implementation Checklist**
   - Break down into steps (Step 1, Step 2, etc.)
   - Each step should take ~1 day max
   - Include:
     - Goal
     - Tasks (with checkboxes)
     - Files created/modified
     - Testing criteria
     - Progress tracking (🔴 Not started, 🟡 In progress, ✅ Complete)

8. **Exit Criteria**
   - What must be true before shipping?
   - All P1 user stories passing
   - Performance targets met

9. **Quick Reference**
   - Key commands
   - URLs/Endpoints
   - Environment variables

### Phase 5: Create Validation Checklist

Create `checklists/requirements.md`:

```markdown
# Requirements Validation Checklist

## Spec Quality
- [ ] All user scenarios include Given-When-Then acceptance criteria
- [ ] Each requirement has a unique identifier (FR-001, SC-001)
- [ ] Success criteria are measurable
- [ ] Dependencies are clearly listed
- [ ] Out of scope items are documented

## Technical Completeness
- [ ] Implementation plan includes step-by-step breakdown
- [ ] Each step is estimated at ~1 day or less
- [ ] Files to be created/modified are listed
- [ ] Testing strategy is defined
- [ ] Exit criteria are clear

## Constitution Alignment
- [ ] Spec follows project principles
- [ ] Any violations are justified
- [ ] Technology choices align with approved stack
```

### Phase 6: Present to User

After creating all files:

1. **Summarize what was created**:
   - Directory structure
   - Key decisions made
   - Next steps

2. **Ask for validation**:
   - Does this match your vision?
   - Any missing requirements?
   - Ready to proceed to implementation?

## Important Guidelines

### Research First
- ALWAYS read existing specs before creating new ones
- Follow the established patterns and structure
- Maintain consistency with existing documentation

### Technology Constraints
- Check CLAUDE.md for approved tech stack
- Verify against project constitution
- Use existing tools (don't over-engineer)

### Priority Levels
- **P1** = MVP, must have for launch
- **P2** = Important, high value but not blocking launch
- **P3** = Nice-to-have, future enhancement

### Writing Style
- Be specific and actionable
- Use technical precision
- Include code examples where helpful
- Reference existing code/patterns
- Keep it focused (avoid scope creep)

### Constitution Validation
- Every spec MUST check against project constitution
- Document any violations with justification
- Prefer simple solutions over complex ones

## Common Patterns

### When creating a spec for:

**New Feature**: Focus on user value, acceptance criteria, and integration points

**Refactoring**: Emphasize why (benefits), what's changing, and backward compatibility

**Bug Fix**: Include reproduction steps, root cause analysis, and regression prevention

**Integration**: Document API contracts, error handling, and fallback behavior

**Performance**: Include benchmarks, targets, and measurement methodology

## Output Format

Create all three files:
1. `specs/XXX-feature-name/spec.md` (user-focused)
2. `specs/XXX-feature-name/plan.md` (technical implementation)
3. `specs/XXX-feature-name/checklists/requirements.md` (validation)

Then provide a summary to the user with:
- What was created
- Key decisions
- Next steps
- Request for validation

---

**Remember**: The goal is to create specifications that are:
- ✅ Comprehensive (all scenarios covered)
- ✅ Testable (clear acceptance criteria)
- ✅ Actionable (developers know what to build)
- ✅ Aligned (follows project principles)
- ✅ Maintainable (consistent with existing patterns)

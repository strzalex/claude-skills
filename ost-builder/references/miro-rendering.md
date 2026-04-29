# Miro Rendering

The OST is rendered as a Miro flowchart. The connector doesn't support mutating individual nodes, so the pattern is: **after every approved gate, regenerate the entire flowchart from state.**

## Tools

- `diagram_get_dsl` - call ONCE per session with `diagram_type: "flowchart"` to get the DSL spec. Cache it.
- `diagram_create` - call after each gate with the same `miro_url` to update the board.

## First render

Ask user: existing Miro board URL, or create new? If new, call `diagram_create` without `miro_url` - connector creates a board and returns the URL. Save it to state immediately.

## Regeneration pattern

Each gate: rebuild DSL from state, call `diagram_create` with same `miro_url`.

```
state.outcome → root node
state.opportunities[*] → children of root
state.solutions[*] → children of their opportunity
state.assumption_tests[*] → children of their solution
```

## Node labels

Full statements, no shortening to slogans:

| Level | Format |
|-------|--------|
| Outcome | `<verb> <metric> <baseline>→<target> <deadline>` |
| Opportunity | `<full statement> [PRES <total>]` |
| Solution | `<full title> — <description trimmed to 1 sentence>` |
| Assumption test | `[Category] Assumption. Test: type. Success: metric.` |

Labels will be long. That's OK - the tree should be readable standalone. Trim description (not title) only if label exceeds 200 characters.

## Color conventions

Map confidence to color where DSL allows: green (high), yellow/amber (medium), grey or red (low / research-first).

## Layout: top-down, with mitigations for scale

At ≤15 nodes, auto-layout is fine. At ≥20 nodes:

**1. Cluster in DSL** - group nodes by opportunity branch so auto-layout keeps each sub-branch together.

**2. Duplicate shared ATs** - if one assumption test covers multiple solutions, generate separate node instances (same content, `shared_test_id` in state) instead of cross-edges that wreck layout.

**3. Be honest** - trees with 30+ nodes need manual cleanup on Miro. Tell the user after render: content and connections are correct, they may need to rearrange a few nodes.

## Fallback when Miro isn't connected

If Miro tools error or aren't available:
1. Tell the user
2. Generate a Mermaid flowchart from the same state
3. Save to `<project_root>/ost-tree.mmd` and `ost-tree.md`
4. Set `miro_board_url: null`, `fallback_artifact: "ost-tree.mmd"` in state

## Don'ts

- Don't create a new board each gate
- Don't render before outcome is approved
- Don't echo DSL to chat - just confirm with the link

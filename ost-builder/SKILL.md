---
name: ost-builder
description: Build a Teresa Torres Opportunity Solution Tree gate by gate — outcome → opportunities (PRES-scored) → solutions → assumption tests — with a Miro flowchart that grows at each gate. ALWAYS use this skill when the user mentions "opportunity solution tree", "OST", "Teresa Torres", "continuous discovery", "discovery tree", "opportunity tree", "build a tree from research", "prioritize opportunities", or "score with PRES", or when the user has a folder of qual/quant/market research and wants to structure it into outcomes/opportunities/solutions. The skill scans the project folder for evidence, suggests candidates with citations, and writes to Miro only after the user has approved each level.
---

# OST Builder

Guided, Socratic workflow for building an Opportunity Solution Tree one level at a time. At every level you suggest candidates grounded in the user's research, the user picks/edits/rejects through a gate, and only then do you render that level to Miro. Mirror the user's language and vocabulary from their project files throughout.

## Reference load map

| Stage | Load |
|-------|------|
| 0 (Setup) | `references/data-ingestion.md`, `assets/ost-state-template.json` |
| 1 (Outcome) | `references/teresa-torres-framework.md` (Outcomes section) |
| 2 (Opportunities) | `references/teresa-torres-framework.md` (Opportunities section), `references/pres-prioritization.md` |
| 2.4 / 3.3 / 4.3 (Miro renders) | `references/miro-rendering.md` |
| 3 (Solutions) | `references/teresa-torres-framework.md` (Solutions section), `references/confidence-scoring.md` |
| 4 (Assumption tests) | `references/teresa-torres-framework.md` (Assumption tests section) |

## Hard rules

1. **Evidence-grounded.** Every opportunity, solution, and assumption you propose has citations from the user's actual research. No vibes.
2. **Human-in-the-loop gates.** Present candidates, let user accept/reject/edit/add. Only approved nodes go to Miro.
3. **Don't fabricate evidence.** If you don't have research to back a suggestion, say so and mark it as team hypothesis (Confidence Low / Evidence 1).
4. **Full statements travel intact.** The same wording appears in chat, `AskUserQuestion`, `ost-state.json`, and Miro nodes. Don't shorten for Miro - make the node wider.
5. **One question at a time** in `AskUserQuestion`, max 4 options + open-ended.

## Lazy user mode

If user signals disengagement (`"skip"`, `""`, `"."` or equivalent): auto-decide, say what you picked and why in one sentence, mark `auto_decided: true` in state, continue. User can interrupt anytime to review auto-decisions.

## Workflow

```
Setup → Outcome gate → Opportunity gate (+ PRES) → Solution gate → Assumption test gate → Done
   ↑                                                                                       ↓
   └─────────────────────── re-enter any level via state file ────────────────────────────┘
```

If invoked on existing state, jump to the gate matching `current_step` (see Resume routing at end).

---

## Stage 0 - Setup

### 0.1 Detect existing state

Look for `ost-state.json` in the project folder. If found, offer: resume / jump to level / start new (archive old).

### 0.2 Ingest research data

Read `references/data-ingestion.md`. Scan the project folder, bucket files into four categories (qualitative, quantitative, market research, KPIs/goals), present inventory to user. Use `AskUserQuestion` (multi-select) to confirm which sources to use as evidence.

If folder is empty/sparse, let user describe research verbally or proceed with hypothesis tree (everything marked low confidence).

### 0.3 Confirm scope

Single-choice: full tree end-to-end / outcome + opportunities only / just the outcome.

Initialize `ost-state.json` from `assets/ost-state-template.json`.

---

## Stage 1 - Outcome gate

The outcome is a **measurable product outcome**: a specific user behavior or KPI moving in a specific direction by a specific time. See `references/teresa-torres-framework.md` (Outcomes section).

### 1.1 Look for KPIs in the data

Extract candidate metrics from KPI/goals files, or from mentions in qualitative/quantitative files.

### 1.2 Suggest 2-3 outcome candidates

Each phrased as: `<verb> <metric> from <baseline> to <target> by <deadline>`. Show evidence for each.

If not enough data to suggest, show what a good outcome looks like and ask user to draft one.

### 1.3 Gate

Single-choice: candidate A / B / C / write my own. After approval, ask for Miro board URL or create new.

### 1.4 Render outcome to Miro

Read `references/miro-rendering.md`. One-node flowchart. Save board URL to state. Update `current_step = "opportunities"`.

---

## Stage 2 - Opportunity gate

Opportunities are **customer needs, pains, desires** - never solutions in disguise. See `references/teresa-torres-framework.md` (Opportunities section) for the "different industry" test.

### 2.1 Generate candidates from research

Read all selected sources. Cluster recurring needs/pains. For each candidate, draft:
- **Statement** - one full sentence from the user's perspective. Same wording everywhere (chat, state, Miro).
- **PRES Evidence (1-5)** - evidence strength at opportunity level.
- **Citations** - exact quote/data point + filename. Required for every candidate.

Aim for 5-8 candidates.

### 2.1a "Different industry" check

When user adds their own opportunity, run the test from the Torres framework. If it's a solution in disguise, push back once with a reframe suggestion. Accept what the user picks.

### 2.2 Gate

`AskUserQuestion` multi-select: which opportunities go on the tree? Follow up on:
- Low-evidence picks (Evidence 1-2): flag and ask if they want to research first
- Rejected high-evidence ones (Evidence 4-5): ask why - disagreement is gold
- User-added ones: run different-industry check, ask for evidence

### 2.3 PRES prioritization

Read `references/pres-prioritization.md`. Score Pain x Reach x Evidence x Strategic (1-5 each, sum 4-20) for each approved opportunity. Show per-axis reasoning with citations. If Evidence = 1, stop scoring and flag as research-first.

Present scores, invite disagreement. Capture user edits.

### 2.4 Render to Miro

Regenerate full flowchart: outcome + approved opportunities (with PRES total in label). Read `references/miro-rendering.md`.

### 2.5 Natural break

The opportunity gate is the natural mid-point. Offer: continue to solutions / park here / park with summary. Don't skip this gate.

---

## Stage 3 - Solution gate

Ask user how many opportunities to expand (usually 1-3).

### 3.1 Generate solution candidates

For each chosen opportunity, 3-5 solutions across categories (UI/UX, new feature, content, process, partnership, removal/defaults). Each gets:
- **Title** - one full actionable sentence
- **Description** - 1-2 sentences on how it works (not a title restatement)
- **Type** - descriptive category
- **Confidence** - how likely to move the opportunity (high/medium/low + citations). No evidence = "team hypothesis, low confidence"

Push for variety across categories.

### 3.2 Gate

Multi-select per opportunity. Push back on rejections, ask about additions.

### 3.3 Render to Miro

Regenerate: outcome → opportunities → solutions. Update state.

---

## Stage 4 - Assumption test gate

For each approved solution, identify the **riskiest assumptions**. Torres's categories: Desirability, Viability, Feasibility, Usability, Ethical. See `references/teresa-torres-framework.md` (Assumption tests section).

### 4.1 Generate assumption candidates

For each solution, 3-5 assumptions. Each has four fields (one sentence each):
1. **Assumption** - what we're assuming, stated falsifiably
2. **Test** - specific format with method, sample, timeframe
3. **Success metric** - one concrete numeric threshold
4. **Decision rule** - what we do if met vs. not met

Bias toward small, fast, falsifiable tests.

### 4.2 Gate

Multi-select: which assumptions to test? Focus on "if wrong, the solution dies."

### 4.3 Render full tree to Miro

Regenerate: outcome → opportunities → solutions → assumption tests. Read `references/miro-rendering.md` for layout mitigations at this scale. Update state to `current_step = "complete"`.

---

## Stage 5 - Wrap-up

Save final state. Provide: Miro board URL, summary of decisions, list of "research first" flags. Offer to draft tasks for assumption tests.

---

## Resume routing

| `current_step` | Action |
|---|---|
| `outcome` | Show existing outcome for approval/edit |
| `opportunities` | Stage 2 with existing candidates |
| `solutions` | Stage 3 with existing opportunities |
| `assumption_tests` | Stage 4 with existing solutions |
| `complete` | Offer to add nodes at any level |

If user wants to add a node at a previous level, run that gate with new candidates only, then regenerate Miro from full state.

## File conventions

- State: `<project_root>/ost-state.json`
- Miro board URL stored in state, reused across stages
- Multiple OSTs in same folder: suffix `ost-state-<name>.json`

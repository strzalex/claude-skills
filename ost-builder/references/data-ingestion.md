# Data Ingestion

Scan the project folder before suggesting any outcome or opportunity.

## Four categories

1. **Qualitative** - interview transcripts, research synthesis, journey maps, usability reports
2. **Quantitative** - analytics exports, funnel data, retention cohorts, returns reports, NPS
3. **Market research** - competitor teardowns, industry reports, market sizing
4. **KPIs/goals** - OKRs, north-star docs, board decks, strategy memos

## Where to look

Scan project folder recursively (depth limit 3). Extensions: `.md`, `.txt`, `.docx`, `.pdf`, `.pptx`, `.csv`, `.xlsx`, `.json`. Skip `README.md`, `package.json`, `node_modules/`, `.git/`.

### Categorization heuristics

| Filename signals | Category |
|------------------|----------|
| `interview*`, `wywiad*`, `transcript*`, `notes*`, `synth*` | Qualitative |
| `analytics*`, `funnel*`, `retention*`, `cohort*`, `metrics*`, `*.csv`, `*.xlsx` | Quantitative |
| `competitor*`, `market*`, `industry*`, `landscape*` | Market research |
| `okr*`, `kpi*`, `north-star*`, `goal*`, `target*`, `strategy*` | KPIs/goals |

When ambiguous, peek at first paragraph. Direct user quotes → qualitative. Tables/percentages → quantitative.

## Present inventory to user

Show categorized file list, then `AskUserQuestion` (multi-select) to confirm which sources to use. Include "add more" and "describe verbally" options.

## When folder is empty

Don't fabricate. Offer two paths:
1. User describes research verbally (capture in state as `data_sources.user_provided`)
2. Proceed with hypotheses - everything marked Confidence Low / Evidence 1, with nudge to research first

## Reading strategy

Small files (≤2 pages text, ≤5MB data): read in full. Large files: summarize structure, ask user which slice matters. Don't load a 200MB export into context.

## Privacy

Research files may contain PII. Anonymize when surfacing quotes in chat or Miro labels. Reference by filename + line range for traceability.

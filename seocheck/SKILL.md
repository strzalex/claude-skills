---
name: seocheck
description: This skill should be used when the user invokes /seocheck, asks to "run an SEO check", "audit SEO", "check page speed issues", "run a lighthouse audit", "check accessibility", "check performance", "fix PageSpeed issues", or "SEO recommendations". Performs a full audit covering Performance, Accessibility, Best Practices, and SEO — then outputs a prioritized issue list with concrete fixes.
version: 1.0.0
---

# SEO & Performance Audit Skill

Perform a comprehensive audit of the current web project covering PageSpeed Core Web Vitals, accessibility (WCAG AA), security headers, and SEO fundamentals. Output a prioritized, actionable issue list with concrete fixes.

## Audit Phases

Run all phases. Read files in parallel where possible. Adapt file paths to the actual project structure.

### Phase 1 — Gather Context

Identify and read these files (adjust paths to match this project's stack):

**Astro projects:**
```
src/layouts/Layout.astro          — head tags, preloads, meta
src/pages/index.astro             — homepage structure, images, headings
src/components/SEO.astro          — meta tags, OG, structured data
vercel.json / netlify.toml        — security + cache headers
public/robots.txt                 — robots directives
src/pages/sitemap.xml.ts          — sitemap (if dynamic)
public/sitemap.xml                — sitemap (if static)
```

**Next.js projects:**
```
app/layout.tsx or pages/_app.tsx  — head setup
next.config.js                    — headers, image optimization
public/robots.txt
```

Also check any image caching/download scripts to understand how thumbnails are fetched and sized.

### Phase 2 — Run Checks

Work through all checks in `references/checklist.md`. For each check:
1. Grep or read the relevant file
2. Determine pass / fail / warning
3. Note the exact file + line for any failure

### Phase 3 — Score & Prioritize

After all checks, produce a report in this format:

```
## SEO Audit Report — [date]

### Scores (current → target)
Performance:    XX → 90+
Accessibility:  XX → 90+
Best Practices: XX → 90+
SEO:            XX → 100

### Critical (fix immediately — biggest score impact)
- [ ] Issue — file:line — fix

### High (fix before next deploy)
- [ ] Issue — file:line — fix

### Medium (fix this sprint)
- [ ] Issue — file:line — fix

### Low / Won't Fix
- [ ] Issue — reason

### Already Good
- ✓ Item that passes
```

### Phase 4 — Fix

For each fixable issue (not marked "Won't Fix"), implement the fix. Group related fixes into logical commits.

---

## Universal Rules

### Image CLS Prevention
Every `<img>` needs explicit `width` and `height` matching its CSS display size. This lets the browser reserve space before the image loads.

For SVGs: calculate `width` from the viewBox ratio at the element's CSS height.
Example: viewBox `0 0 375 93.75` at `h-14` (56px) → `width="224" height="56"`

For video thumbnails displayed at 16:9: `width="640" height="360"`

### LCP Optimization (Largest Contentful Paint)
For the first large image visible above the fold:
1. Add `fetchpriority="high"` to the `<img>` tag
2. Add a `<link rel="preload" as="image" fetchpriority="high" href="...">` in `<head>`
3. Do NOT use `loading="lazy"` on LCP images

### Color Contrast (WCAG AA)
- Normal text: minimum 4.5:1 contrast ratio
- Large text (≥18px, or ≥14px bold): minimum 3:1
- Tailwind opacity classes reduce contrast significantly:
  - `text-brown/70` on light bg ≈ 2.8:1 → FAIL
  - `text-brown/90` on light bg ≈ 7.2:1 → PASS
  - `text-terracotta` on `bg-terracotta/10` ≈ 2.1:1 → FAIL
- Fix: increase opacity (e.g. /70 → /90) or switch to a high-contrast color

### Heading Hierarchy
- Headings must not skip levels: h1→h2→h3, never h2→h4
- Each page must have exactly one `<h1>`
- Inside a section with an `<h2>`, card/item headings must be `<h3>`, not `<h4>`

### Sitemap
- Never include login-required, member-only, or admin pages
- Include `<lastmod>`, `<changefreq>`, `<priority>` on all entries
- Video/article pages: use `_updatedAt` or equivalent for `<lastmod>`

### Security Headers
Safe to add on any project:
```json
{ "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" }
{ "key": "X-Content-Type-Options", "value": "nosniff" }
{ "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
{ "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=()" }
{ "key": "Cross-Origin-Opener-Policy", "value": "same-origin-allow-popups" }
{ "key": "Content-Security-Policy", "value": "frame-ancestors 'self'" }
```

**Third-party auth/widget caution:**
If the project uses Memberstack, Auth0, Stripe embeds, or any iframe-based auth:
- NEVER add `X-Frame-Options: DENY` — breaks iframe-based auth flows
- NEVER add full `Content-Security-Policy` with `frame-src` or `script-src` without first inventorying all third-party domains

### Video Thumbnails from External CDNs
Many video CDNs (Bunny, Vimeo, Wistia) do NOT support arbitrary resize via URL params. If thumbnails are large (>200KB), resize them locally using `sharp` after download rather than relying on CDN URL parameters.

---

## Reference Files

For the complete per-check audit checklists, see `references/checklist.md`.

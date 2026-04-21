# SEO Audit Checklist

Complete per-check reference. Each item includes what to look for, where to find it, and the exact fix.

---

## PERFORMANCE (Lighthouse target: 90+, LCP target: <2.5s)

### P1 — Image Format & Compression
**Check:** Are images served in modern, compressed formats?
**How:** List all `<img src>` values and check file extensions and sizes.
```bash
find public/images public/thumbnails -name "*.png" -o -name "*.jpg" | head -20
ls -lh public/thumbnails/*.jpg | sort -k5 -hr | head -10
```
**Targets:**
- Photos: WebP at quality 80–85 (typically 50–100KB for 800px wide)
- Video thumbnails: JPEG/WebP at 640×360, ≤80KB
- PNG only acceptable for images with transparency (icons, logos)

**Fix — PNG → WebP:**
Use `sharp`:
```js
await sharp('input.png').webp({ quality: 85 }).toFile('output.webp')
```

**Fix — Resize thumbnails locally (when CDN ignores URL params):**
```js
await sharp(tempPath).resize(640, 360, { fit: 'cover' }).jpeg({ quality: 80 }).toFile(filepath)
```

---

### P2 — LCP Element Optimization
**Check:** Is the Largest Contentful Paint element loading as fast as possible?
**How:** Identify the first large visible image on each key page. Check for `fetchpriority` and `<link rel="preload">`.
**Grep:**
```bash
grep -n 'fetchpriority\|rel="preload"' src/pages/index.astro src/layouts/Layout.astro
```
**Required for LCP image:**
```html
<img src="..." alt="..." fetchpriority="high" loading="eager" width="W" height="H" />
```
**Required in `<head>` (inject via layout head slot):**
```html
<link rel="preload" as="image" href="..." fetchpriority="high" />
```

---

### P3 — CLS: Width & Height on Images
**Check:** All `<img>` tags have explicit `width` and `height` attributes.
**Grep:**
```bash
grep -rn '<img' src/ --include="*.astro" --include="*.tsx" --include="*.jsx" | grep -v 'width='
```
**How to calculate correct values:**
- Know the CSS display size (e.g. Tailwind `h-14` = 56px, `h-8` = 32px)
- For SVGs: read the `viewBox` attribute, calculate width from the aspect ratio at display height
- For 16:9 thumbnails: `width="640" height="360"`
- For responsive images that are always full-width: use the largest breakpoint size

---

### P4 — Font Loading
**Check:** Fonts are self-hosted and preloaded, not loaded from external CDNs on the critical path.
**Grep:**
```bash
grep -n 'fonts.googleapis\|fonts.gstatic' src/ -r
grep -n 'rel="preload".*woff2' src/layouts/ -r
```
**Required:**
- Fonts hosted in `/public/fonts/`
- Critical fonts preloaded in `<head>` with `<link rel="preload" as="font" crossorigin>`

---

### P5 — Cache Headers for Static Assets
**Check:** Long-lived cache headers on images, fonts, thumbnails.
**How:** Read `vercel.json` or `netlify.toml` or `next.config.js` headers section.
**Required:**
- Images, thumbnails: `Cache-Control: public, max-age=604800` (7 days)
- Fonts: `Cache-Control: public, max-age=31536000` (1 year)

---

### P6 — JavaScript Bundle Size
**Check:** No large unnecessary JS bundles on critical path.
**How:** Check for heavy client-side scripts loaded synchronously.
**Grep:**
```bash
grep -n 'import\|<script src' src/layouts/ -r | grep -v 'type="module"'
```

---

## ACCESSIBILITY (Lighthouse target: 90+, WCAG AA)

### A1 — Color Contrast
**Check:** Text meets WCAG AA (4.5:1 normal, 3:1 large text).
**Grep for known low-contrast patterns:**
```bash
grep -rn 'text-.*\/[0-7]0\b' src/ --include="*.astro" | grep -v 'border\|bg\|ring'
grep -rn 'opacity-[0-7]0' src/ --include="*.astro"
```
**Common failures:**
- Any text with opacity/alpha under 80% on light backgrounds
- Brand colors with low luminance used as text on same-hue backgrounds
- White text on light-colored backgrounds

**Tools:** https://webaim.org/resources/contrastchecker/

---

### A2 — Heading Hierarchy
**Check:** No skipped heading levels. One `<h1>` per page.
**Grep:**
```bash
grep -n '<h[1-6]' src/pages/index.astro | head -30
```
**Valid:** h1→h2→h3→h4 (sequential)
**Invalid:** h1→h3 (skips h2), h2→h4 (skips h3)
**Fix:** Change `<h4>` inside `<h2>` sections to `<h3>`.

---

### A3 — ARIA Labels on Buttons & Icons
**Check:** Every interactive element has an accessible name.
**Grep:**
```bash
grep -n '<button' src/ -r --include="*.astro" | grep -v 'aria-label\|aria-labelledby'
```
Check that each button either has:
- Visible text content, OR
- `aria-label="..."` attribute

**Common missing:** hamburger/close menu buttons, prev/next carousel buttons, icon-only action buttons.

---

### A4 — Alt Text
**Check:** All images have appropriate `alt` attributes.
**Grep:**
```bash
grep -rn '<img' src/ --include="*.astro" | grep -v ' alt='
```
**Rules:**
- Content images: descriptive text explaining what the image shows
- Decorative images: `alt=""` (empty, not missing)
- Logo: `alt="[Company Name]"`

---

### A5 — Form Accessibility
**Check:** Inputs, textareas, selects have associated labels.
**Grep:**
```bash
grep -n '<input\|<textarea\|<select' src/ -r --include="*.astro"
```
Each input needs a `<label for="id">` or `aria-label` or `aria-labelledby`.

---

### A6 — Focus Management
**Check:** Focus is visible on all interactive elements. No `outline: none` without an alternative.
**Grep:**
```bash
grep -rn 'outline.*none\|outline: 0' src/styles/
```

---

### A7 — Language Attribute
**Check:** `<html>` has the correct `lang` attribute.
**How:** Read the layout file.
**Required:** `<html lang="pl">` (or whatever the content language is)

---

### A8 — Touch Target Size
**Check:** Buttons and links are at least 44×44px on mobile.
**How:** Check Tailwind padding classes on interactive elements. Buttons with `p-2` (8px padding) on small icons may be too small.
**Fix:** Minimum `p-3` on icon buttons, or add explicit `min-h-[44px] min-w-[44px]`.

---

## BEST PRACTICES (Lighthouse target: 90+)

### B1 — Security Headers
**Check:** Required headers in deployment config.
**How:** Read `vercel.json` / `netlify.toml` / `next.config.js`.

| Header | Required Value | Safe? |
|--------|---------------|-------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` | Always safe |
| `X-Content-Type-Options` | `nosniff` | Always safe |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Always safe |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=()` | Always safe |
| `Cross-Origin-Opener-Policy` | `same-origin-allow-popups` | Safe unless using cross-origin popups |
| `Content-Security-Policy` | `frame-ancestors 'self'` | Safe (restricts who can embed YOU) |
| `X-Frame-Options` | `SAMEORIGIN` | CAUTION — breaks iframe-based auth (Memberstack, Auth0) |

---

### B2 — No Mixed Content
**Check:** No HTTP resources loaded on HTTPS pages.
**Grep:**
```bash
grep -rn 'http://' src/ --include="*.astro" --include="*.ts" --include="*.tsx" | grep -v 'localhost\|127\.0\.0\.1\|^\s*//'
```

---

### B3 — No Deprecated APIs
**Check:** No use of deprecated browser APIs in our own code.
**How:** Check for `document.write()`, synchronous `XMLHttpRequest`, deprecated event names.
**Note:** Third-party scripts (Memberstack's hCaptcha, old analytics) may trigger this — flag as "Won't Fix (third-party)" if so.

---

### B4 — No Console Errors
**Check:** Clean browser console on page load and interaction.
**How (if Playwright MCP available):**
```
Use browser_navigate to load the page
Use browser_console_messages to check for errors
```

---

### B5 — Valid HTML
**Check:** No malformed HTML (mismatched tags, duplicate IDs, etc.).
**Common issues:**
- `<h3>Text</h4>` (mismatched tags from partial find/replace)
- Duplicate `id` attributes
- `<a>` nested inside `<a>`

---

## SEO (Lighthouse target: 100)

### S1 — Title Tags
**Check:** Every page has a unique, descriptive `<title>`.
**Targets:** 50–60 characters. Include primary keyword. Include brand name.
**How:** Check how title is passed to the layout component. Verify no two pages share the same title.

---

### S2 — Meta Description
**Check:** Every page has a unique meta description.
**Targets:** 150–160 characters. Describes the page content. Includes a call to action.
**Grep:**
```bash
grep -n 'description' src/components/SEO.astro
```

---

### S3 — Open Graph Tags
**Check:** OG tags for social sharing.
**Required:**
```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://..." />  <!-- absolute URL, 1200×630px -->
<meta property="og:url" content="https://..." />
<meta property="og:type" content="website" />
```
**OG image:** Must be absolute URL (not relative). Recommended: 1200×630px.

---

### S4 — Structured Data
**Check:** JSON-LD schema appropriate to content type.
**How:**
```bash
grep -rn 'application/ld+json\|schema\.org' src/ --include="*.astro"
```

**Recommended schemas by page type:**
| Page | Schema Type |
|------|-------------|
| Homepage | `Organization`, `WebSite` (with SearchAction) |
| Video detail | `VideoObject` (name, description, thumbnailUrl, uploadDate, duration, contentUrl) |
| Article/Blog | `Article` or `BlogPosting` |
| Product/Pricing | `Product`, `Offer` |
| FAQ section | `FAQPage` with `Question`/`Answer` pairs |
| Breadcrumbs | `BreadcrumbList` |

**Validate at:** https://search.google.com/test/rich-results

---

### S5 — Sitemap
**Check:** Sitemap accessible, correctly configured, no gated pages.
**Verify:**
- Accessible at `/sitemap.xml`
- Referenced in `robots.txt` with absolute URL
- Contains all public pages
- Excludes: `/konto`, `/admin`, `/dashboard`, any login-required page
- Includes `<lastmod>`, `<changefreq>`, `<priority>` on all entries

---

### S6 — Robots.txt
**Check:** Exists at `/robots.txt`, correct directives.
**Required:**
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /konto
Disallow: /dashboard

Sitemap: https://yourdomain.com/sitemap.xml
```

---

### S7 — Canonical URLs
**Check:** `<link rel="canonical">` on all pages using absolute URL.
**Grep:**
```bash
grep -rn 'canonical' src/components/SEO.astro
```
**Note:** Canonical must use the production domain with `https://`, never a preview/staging URL.

---

### S8 — Semantic HTML
**Check:** Proper semantic elements used throughout.
**Required structure:**
```
<html lang="xx">
  <head>...</head>
  <body>
    <header> (or <nav>)
    <main>
      <h1> (exactly one per page)
    </main>
    <footer>
  </body>
```
**Grep:**
```bash
grep -rn '<main\|<article\|<section\|<nav\|<footer\|<header' src/layouts/ src/pages/ | head -20
```

---

### S9 — Internal Links
**Check:** No broken internal links. Descriptive link text (not "click here").
**Grep for generic link text:**
```bash
grep -rn '>click here\|>here<\|>read more<\|>więcej<' src/ --include="*.astro"
```

---

### S10 — Mobile Viewport
**Check:** Viewport meta tag present.
**Required:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

---

## AUDIT LOG

Keep a running record of audits to track improvement over time.

| Date | Project | Performance | Accessibility | Best Practices | SEO | Key Issues Found |
|------|---------|-------------|---------------|----------------|-----|-----------------|
| 2026-02-19 | trenujonline.pl | 87 | 80 | 81 | 100 | PNG images 1-2MB, thumbnails 499KB, missing aria-labels, h2→h4 jump, contrast failures, missing HSTS/COOP/CSP |
| 2026-02-19 | trenujonline.pl | — | — | — | — | Fixed: WebP conversion, local thumbnail resize, security headers, heading hierarchy, contrast, aria-labels, payment icon dimensions, sitemap cleanup |

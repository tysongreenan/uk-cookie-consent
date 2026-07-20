# Customer journey & privacy policy fixes

**Date:** 19–20 July 2026  
**Branch:** `security/endpoint-hardening` → merged into `develop`  
**Latest develop merge:** `7eb5401` (journey SEO) · earlier merges for privacy policy + hosted page design

This note summarizes what we fixed for Jean Pelchat’s Pro privacy-policy report and for the organic entry pages where people find Cookie Banner online.

---

## Part 1 — Privacy policy product (Jean / Pro)

### What Jean reported
- Pro licence: `info@jeanpelchat.com`
- Created a privacy policy; it didn’t show in the dashboard after publish
- Hosted URL: https://www.cookie-banner.ca/p/orinha-media-5ac8d3c8
- Wanted a **French** privacy policy

### Root causes
1. **Dashboard list always empty** — UI read `data.policies`; API returned `data.data`
2. **Field shape mismatch** — UI expected `title` / `createdAt` / `slug`; list API returned different shapes and often omitted `slug`
3. **Publish response** raw snake_case broke detail-page merge
4. **Hosted page** used wrong fields for business name (showed “Business” in title)
5. **French generation** was selectable but not actually implemented (English templates only)
6. **Save from public tool** linked to an empty wizard instead of saving the generated policy
7. **Content quality** — wizard keys leaked as raw labels (`payment_data`), empty purposes/retention

### What we shipped

| Area | Change |
|------|--------|
| List API + dashboard | Return `policies` + camelCase + slug; UI accepts both shapes |
| Publish API | CamelCase response; optional **custom slug** |
| Create API | CamelCase response with `id` for redirects |
| Hosted `/p/[slug]` | Correct business name; FR chrome when language is `fr`; professional document layout |
| French | Full fr-CA templates (common, GDPR, CCPA, PIPEDA, Loi 25) |
| Language UI | Selector on step 1; Quebec suggests French |
| Custom URL | Edit `cookie-banner.ca/p/your-brand` before or after publish |
| XSS | Escape free-text fields before HTML generation |
| Public tool | “Save & Manage” actually POSTs the generated policy |

### How Jean creates a French policy
1. **Dashboard → Privacy Policy → Create New** (or regenerate)
2. Step 1: set **Policy language** to **Français** (Quebec auto-suggests FR)
3. Generate & Save → Publish
4. Optionally set a clean slug (e.g. `orinha-media`) under **Hosted URL → Save URL**

### Email tone for Jean (simple, no “bug” language)
- Thank him for Pro  
- Policy is live at the URL above  
- Appears under Dashboard → Privacy Policy  
- French: language selector → generate → publish  

---

## Part 2 — Hosted policy page design

### Problem
Hosted policies looked unprofessional (boxy chrome, double titles, marketing banner on legal pages).

### Fix
- Slim brand bar (logo/initial + business name)
- Single document title (strip generator’s duplicate H1)
- Soft paper layout on warm background
- Meta as text (`Last updated · Frameworks`), not chip boxes
- Cookie tables styled as clean documents
- Marketing announcement banner **hidden** on `/p/*`

---

## Part 3 — Organic journey pages (where users find us)

Screenshot of “where users start” was unreadable (corrupt 2×2 file). We used **Search Console top pages** instead.

### Top entry pages (GSC, ~6 months)
1. `/blog/cookie-consent-canada-guide-2025` → should 301 to `…-2026`
2. `/` (homepage)
3. `/blog/gdpr-cookie-consent-requirements`
4. `/integrations/react`
5. `/webflow-cookie-consent-free`
6. `/blog/pipeda-compliance-checklist`
7. `/tools/cookie-scanner`
8. `/features/how-it-works`
9. Compliance / compare / free-banner / Law 25 pages

### Critical issues found & fixed

| Issue | Why it hurt | Fix |
|-------|-------------|-----|
| Invalid homepage hreflang → `/fr` (no such route) | Confuses international SEO | Only `en-ca` + `x-default` |
| Fake `AggregateRating` (4.9 / 127 reviews) | Google spam risk | Removed |
| Schema logo/OG → missing `/logo.svg`, `/og-image.png` | Broken rich results / shares | `/logos/logo.svg`, `/opengraph-image` |
| Free pages: “unlimited / no limits” | Contradicts free plan (1 banner) | Honest free/pro copy; 2026 titles; canonicals |
| `/locations/*` noindex + human redirect + dead CTAs | In sitemap/footer but not usable | Indexable, public, CTAs → `/builder` + guides |
| Blog OG fallback 404 | Bad social previews | `/opengraph-image` |
| `/tools/privacy-policy` missing from sitemap | Harder discovery | Added (+ cookie-policy, free landers, Law 25) |
| Tools / feature CTAs → `/dashboard` | Gated for signed-out users | → `/builder` |
| `metadataBase` localhost fallback | Broken absolute URLs if env missing | Default production domain |

### Already in config (confirm live after deploy)
```text
/blog/cookie-consent-canada-guide-2025
  → 301 → /blog/cookie-consent-canada-guide-2026
```

---

## Part 4 — Deploy status

| Item | Status |
|------|--------|
| Privacy policy list/save/FR/slug | Merged to `develop` |
| Professional `/p/[slug]` layout | Merged to `develop` |
| Journey SEO / conversion fixes | Merged to `develop` (`7eb5401`) |
| Auto-ship | Assumes Vercel (or CI) deploys from `develop` |

### Quick live checks after deploy
- [ ] https://www.cookie-banner.ca/p/orinha-media-5ac8d3c8 — looks like a document, correct name
- [ ] Dashboard → Privacy Policy lists saved policies
- [ ] Custom slug save works
- [ ] French generate produces full FR content
- [ ] https://www.cookie-banner.ca/locations/canada — loads for humans, CTAs work, indexable
- [ ] https://www.cookie-banner.ca/free-cookie-banner — 2026 title, honest free plan, has canonical
- [ ] https://www.cookie-banner.ca/blog/cookie-consent-canada-guide-2025 — 301 to 2026
- [ ] View-source homepage — no fake AggregateRating; no hreflang to `/fr`

---

## Part 5 — Honest free plan (product truth)

From `lib/plan-restrictions.ts`:

| Plan | Banners | Privacy policy generator (save/host) |
|------|---------|--------------------------------------|
| Free | 1 | Generate free; save/host needs Pro |
| Pro / lifetime / annual | Unlimited | Yes |
| Annual / enterprise | + versioning | Yes |

Marketing copy on free acquisition pages should never say “unlimited banners” for free.

---

## Part 6 — Suggested follow-ups (not done)

1. **End homepage A/B** (`/` vs `/v2` rewrite) once a winner is clear — split hurts consistent UX/analytics  
2. **Differentiate** `/`, `/free-cookie-banner`, `/free-cookie-banner-generator` titles to reduce keyword cannibalization  
3. **Add `/features` hub** or keep breadcrumbs without a 404 parent on remaining feature pages  
4. **Pricing page** — move “Privacy Policy Generator” out of “Coming Next” if still listed as future  
5. **Legal review** disclaimer on generated policies (templates ≠ law firm advice)  
6. Re-attach a real screenshot if a specific landing still looks wrong

---

## Part 7 — Key commits (approx.)

| Commit | Summary |
|--------|---------|
| `8fb1eb8` | Dashboard list shows policies |
| `6f41bab` | Save flow + content labels/defaults |
| `9e3f303` | Full French policy generation |
| `fbe783e` | XSS / slug / response hardening |
| `cb9585f` | Custom professional hosted URL slugs |
| `8fd727c` | Professional hosted document layout |
| `4518499` | Journey page SEO + conversion fixes |
| `7eb5401` | Merge of journey fixes into `develop` |

---

## Contact reference

**Customer:** Jean Pelchat  
**Email:** info@jeanpelchat.com  
**Business:** Orinha Media  
**Published policy (example):** https://www.cookie-banner.ca/p/orinha-media-5ac8d3c8  

---

*Generated for internal reading. Safe to share excerpts with support; don’t paste raw commit SHAs to customers unless useful.*

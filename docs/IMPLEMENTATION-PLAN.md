# Implementation plan — ship remaining product & journey work

**Goal:** Finish what we started: privacy policy product quality, honest acquisition SEO, and one consistent homepage.  
**Winner homepage:** `app/page.tsx` (HeroV2 + builder demo stack).  
**A/B status:** **Ended** (middleware split removed; `/v2` → `/` 301).

---

## North star

Anyone who finds Cookie Banner online should:

1. Land on a **truthful, indexable, working** page  
2. Hit a CTA that goes to **`/builder`** (or a real tool), not a gated dead end  
3. Be able to create, save, publish, and brand a privacy policy (EN/FR) without friction  

---

## Phase 0 — Done (already merged / in flight)

Do not re-do; verify live after deploy.

| Item | Verify |
|------|--------|
| Privacy policy dashboard list | Policies appear after create/publish |
| French full generation | Language FR → full FR content + Loi 25 |
| Custom hosted slug | Save URL → `cookie-banner.ca/p/orinha-media` |
| Hosted page design | Document layout, no marketing announcement box |
| Journey SEO P0s | No fake ratings, no `/fr` hreflang, free copy honest |
| Location pages | Indexable, CTAs work, no human redirect gate |
| Homepage A/B | **Ended** — only `app/page.tsx` |

**Live smoke (after each deploy):**

```text
/  → single homepage (no /v2 rewrite)
/v2 → 301 to /
/p/{slug} → professional document
/dashboard/privacy-policy → list not empty for Pro
/locations/canada → loads + builder CTA
/free-cookie-banner → 2026 + honest free plan + canonical
/blog/cookie-consent-canada-guide-2025 → 301 → …2026
```

---

## Phase 1 — Close the homepage A/B cleanly (this PR)

**Owner:** eng  
**Effort:** S  

### Tasks
1. [x] Remove 50/50 rewrite from `middleware.ts`  
2. [x] Clear leftover `ab-homepage` cookie on `/`  
3. [x] Remove `ABTracker` from homepage  
4. [x] 301 `/v2` → `/` in `next.config.mjs`  
5. [ ] After deploy: confirm no traffic still served old `/v2` content  
6. [ ] Optional cleanup (Phase 4): delete `app/v2/*` once analytics quiet  

### Success
- 100% of human + bot traffic sees the same homepage  
- No `ab-homepage` sticky rewrites  

---

## Phase 2 — Privacy policy product polish (Jean-class)

**Owner:** eng  
**Effort:** M  
**Depends on:** Phase 0 live  

### 2.1 Support path (ops)
1. Confirm Jean’s English policy still live  
2. Send simple “Pro thank-you” email (no bug language)  
3. Optionally help set slug to `orinha-media` if he wants a cleaner URL  

### 2.2 Product gaps still open
| Task | Why | Effort |
|------|-----|--------|
| Dashboard language selector visible on regenerate flow | FR discoverability | S |
| Dual EN+FR as two policies UX tip in empty state | Quebec customers | S |
| Soft legal disclaimer under generator | “Template ≠ legal advice” | S |
| Pricing page: move Privacy Policy Generator out of “Coming Next” | Truth | S |
| Free vs Pro matrix on `/tools/privacy-policy` | Hosted URL is Pro | S |
| Unpublish / archive from dashboard | Lifecycle | M |
| Redirect old slug → new when user renames URL | Avoid broken external links | M |

### Success
- Pro user can go zero → FR published policy → clean slug in &lt;10 minutes without support  

---

## Phase 3 — Acquisition page consistency (SEO + conversion)

**Owner:** eng + content  
**Effort:** L  
**Order:** highest GSC traffic first  

### 3.1 Cannibalization (3 “free cookie banner generator” URLs)
| URL | Intent (target) |
|-----|-----------------|
| `/` | Primary money page — brand + free generator |
| `/free-cookie-banner` | “Free alternative to paid tools” comparison angle |
| `/free-cookie-banner-generator` | Tool-intent long-tail |

**Tasks:**
1. Differentiate H1/title/meta for each (no identical SERP snippets)  
2. Cross-link with one clear “primary” internal link to `/` or `/builder`  
3. Keep honest free limits on all three  

### 3.2 Feature / tools chrome
1. Remaining feature pages: breadcrumbs without 404 `/features` parent (or add a real `/features` hub)  
2. `/tools` page: add Header + Footer like other marketing pages  
3. Align schema `dateModified` on feature pages to real updates  

### 3.3 Integrations & compare (keep winning)
1. Spot-check `/integrations/react`, Webflow free, Cookiebot alternative CTAs → `/builder`  
2. Bump stale `datePublished` only when content actually reviewed  

### Success
- No acquisition CTA to gated `/dashboard` without session  
- No page claims free unlimited banners  
- Top 10 GSC URLs: 200, one H1, canonical, working primary CTA  

---

## Phase 4 — Cleanup & debt

**Owner:** eng  
**Effort:** S–M  

1. Delete or archive `app/v2/` after 1–2 weeks of zero `/v2` hits (301 stays)  
2. Remove unused A/B analytics UI if only homepage used it  
3. Footer “Accessibility” → real page or rename to Support  
4. `docs/CUSTOMER-JOURNEY-AND-PRIVACY-POLICY-FIXES.md` — keep as history; this plan is the active tracker  

---

## Phase 5 — Measure

**Owner:** growth  
**Effort:** S ongoing  

| Metric | Baseline (set after Phase 1 deploy) | Target (30d) |
|--------|--------------------------------------|--------------|
| Homepage bounce / CTR to builder | ___ | Improve vs A/B era |
| `/builder` sessions from organic | ___ | Up |
| Privacy policy create → publish rate | ___ | Up |
| GSC clicks: Canada guide 2026 | ___ | Recover 2025 equity |
| Soft 404s / crawl errors on old URLs | ___ | Down |

**Tools:** GSC, Vercel Analytics / GA4, privacy_policies table counts  

---

## Suggested calendar

| When | What |
|------|------|
| **Day 0 (today)** | Phase 1 merge + deploy; smoke checklist |
| **Day 1** | Phase 2.1 Jean email; Phase 2.2 pricing + disclaimer + free/pro on tool page |
| **Day 2–3** | Phase 3.1 title differentiation; tools Header/Footer; remaining dashboard CTAs |
| **Week 2** | Phase 3.2–3.3; Phase 5 baselines |
| **Week 3–4** | Phase 4 delete `/v2` code; review metrics |

---

## Execution checklist (copy into issues)

### Issue A — End homepage A/B
- [x] Middleware  
- [x] Tracker off home  
- [x] `/v2` redirect  
- [x] Merge develop  
- [ ] Smoke after production deploy  

### Issue B — Privacy policy truth & polish
- [x] Pricing: Free generate / Pro host (not “Coming Next”)  
- [x] Homepage pricing section aligned  
- [x] Generator legal disclaimer  
- [x] Tool page Free vs Pro hosted URL  
- [x] Dashboard empty state FR + slug tip  
- [x] Dashboard create/regenerate language + disclaimer  
- [ ] Optional slug redirect on rename *(later)*  

### Issue C — Free page cannibalization
- [x] Three differentiated title/H1 packages  
- [x] Internal linking map  

### Issue D — Tools / features chrome
- [x] `/tools` Header + Footer  
- [x] Feature breadcrumbs / hub (`/features`)  
- [x] Schema dates on feature pages  

### Issue E — Measure & cleanup
- [ ] Baselines in sheet  
- [x] Delete `app/v2` (301 `/v2` → `/` remains)  
- [x] Slug rename history + redirect (`previous_slugs` migration)  

---

## Out of scope (later)

- True multi-language site (`/fr` marketing site)  
- Full legal review of every policy template jurisdiction  
- Ending all A/B infra if used for non-homepage experiments later  

---

## Decision log

| Decision | Choice | Reason |
|----------|--------|--------|
| Homepage winner | `app/page.tsx` (current HeroV2 stack) | Already the “v2 design” content on `/`; middleware “v2” was the *other* older `/v2` route |
| A/B | End now | Ranking + analytics consistency |
| Free plan messaging | 1 banner free | Matches `plan-restrictions.ts` |
| Location pages | Keep, index, fix CTAs | Real SEO landers, not drafts |

---

*Update this file as phases complete. History detail: `docs/CUSTOMER-JOURNEY-AND-PRIVACY-POLICY-FIXES.md`.*

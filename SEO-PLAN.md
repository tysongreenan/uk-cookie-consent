# SEO Improvement Plan — cookie-banner.ca

**Created:** 2026-03-27
**Based on:** 28-day Google Search Console data (Feb 25 - Mar 24, 2026)
**Overall SEO score before this session:** 35/100
**Estimated score after session 1 fixes:** ~55/100

---

## Completed (Session 1 — 5 commits)

- [x] Fix A/B test serving random content to Googlebot (homepage ranking drop)
- [x] Remove fabricated AggregateRating (4.8/5, 1,000 reviews)
- [x] Fix blog FAQ schema rendering empty (mapping bug)
- [x] Make banner.js non-blocking (async)
- [x] Fix meta description "2 minutes" vs hero "5 minutes"
- [x] Add rel="nofollow" to footer links to blocked pages
- [x] Remove dead social media icons (all 6 pointed to #)
- [x] Add location pages + /free-cookie-banner to sitemap
- [x] Add canonical to /integrations layout
- [x] Fix BlogPosting image fallback (empty string -> OG image)
- [x] Create llms.txt for AI search citation
- [x] Add AI crawler rules to robots.txt
- [x] Fix sitemap lastModified (static dates for unchanging pages)
- [x] Add WebSite schema to homepage
- [x] Refocus homepage title/H1/meta toward Canada (PIPEDA & Law 25)
- [x] Add BreadcrumbList schema (compare, compliance x3, blog posts)
- [x] Add 12 contextual internal links in ProductDescription
- [x] Rewrite CCPA page (~2,200 -> ~4,500 words, 8 new sections, 10 FAQs)
- [x] Remove deprecated HowTo schema
- [x] Remove duplicate Product schema

---

## Phase 2: High-ROI Page Fixes

### 2.1 — Fix /integrations/react title & meta (Position 9, 1,018 imp, 1 click)

**Priority:** Critical — highest ROI fix remaining
**Effort:** 30 minutes
**Why:** Position 9 with 1,018 impressions but only 1 click means the SERP listing isn't compelling. The title/description don't match what people searching "react cookie banner" expect.

**Current metadata:**
- Title: "React Cookie Consent: Free, Lightweight Banner"
- Description: "Add a GDPR-compliant cookie consent banner to React or Next.js in 2 minutes. Under 10KB, no npm install, async loading. Works with App Router, Vite & CRA. Free."

**Problems:**
- Title doesn't include "React Cookie Banner" which is the primary search term
- Description says "2 minutes" (inconsistency with "5 minutes" elsewhere)
- Leads with GDPR but React devs searching this are looking for implementation help, not compliance
- No mention of code examples or npm-free approach in the title

**Action items:**
- [x] Rewrite title to: "React Cookie Banner — Free, No npm Install, Under 10KB (2026)"
- [x] Rewrite description to lead with developer value prop: "Add a cookie consent banner to React or Next.js in 5 minutes. No npm package needed — just a script tag. Under 10KB, async loading, GDPR & PIPEDA compliant. Works with App Router, Vite & CRA."
- [x] Review the page H1 — ensure it matches "react cookie banner" intent
- [ ] Check if page content is thin — may need more code examples or setup guide depth

---

### 2.2 — Expand /compare/cookiebot-alternative (Position 16, 1,344 imp, 5 clicks)

**Priority:** High — closest to page 1 of the underperformers
**Effort:** 2-3 hours
**Why:** Position 16 is just off page 1. Multiple striking-distance keywords orbit this page:
- "cookiebot vs complianz" — pos 10.3, 57 imp
- "cookiebot vs cookieyes" — pos 9.3, 10 imp
- "cookiebot pricing plans" — pos 9.3, 9 imp
- "cookiebot alternatives" — pos 25.4, 204 imp
- "alternatives to cookiebot" — pos 25.3, 148 imp

**Current metadata:**
- Title: "7 Best Cookiebot Alternatives in 2026 (Free Options)"
- Description: "Compare the best Cookiebot alternatives with pricing, features & migration guides..."

**Action items:**
- [x] Add detailed comparison tables for CookieBot vs CookieYes, vs Complianz, vs Cookie-Banner.ca
- [x] Add current Cookiebot pricing breakdown (users search for this)
- [x] Add "Why switch from Cookiebot?" section with concrete pain points
- [x] Add migration guide section (how to switch)
- [x] Expand FAQ with "cookiebot vs X" questions to capture those keyword variants
- [x] Add a "Cookiebot Pricing Plans" section since that keyword is at position 9.3
- [x] Update metadata to include "cookiebot vs" variants
- [x] Target 3,500+ words (up from current length)

---

### 2.3 — Expand /tools/cookie-scanner content (Position 52, 2,728 imp, 3 clicks)

**Priority:** High — second-highest impressions of underperforming pages
**Effort:** 2-3 hours
**Why:** 2,728 impressions at position 52. Google recognizes this page for "cookie scanner" queries but the page isn't competitive. The tool works but the surrounding content is thin.

**Current metadata:**
- Title: "Free Website Cookie Scanner — GDPR, CCPA & PIPEDA Check in 30s"
- Description: "Enter any URL and get a full cookie audit in 30 seconds..."

**Action items:**
- [x] Add "What Is a Cookie Scanner?" educational section (~300 words) — already existed
- [x] Add "How Our Cookie Scanner Works" technical explanation (~250 words) — already existed
- [ ] Add "What to Do After Your Cookie Scan" actionable guide (~300 words)
- [x] Add "Cookie Types Explained" section covering each category the scanner detects
- [x] Add comparison section: "Free Cookie Scanners vs Paid Tools" — already existed
- [x] Expand FAQ from 8 to 12 questions (now 10 in schema + 10 displayed)
- [x] Fix currency mismatch in scanner schema (USD -> CAD)
- [x] Remove HowTo schema from scanner page (deprecated Sept 2023)
- [x] Add internal links to /compliance pages from scanner results context
- [x] Target 2,500+ words of supporting content around the tool

---

### 2.4 — Boost /blog/pipeda-compliance-checklist (Position 11, 982 imp)

**Priority:** Medium-High — "pipeda compliance checklist" at position 8.52
**Effort:** 1-2 hours
**Why:** Already on the edge of page 1. Small content improvements could push it over.

**Current state:**
- Title: "PIPEDA Compliance Checklist 2026: 10-Step Guide for Canadian Websites"
- 8 FAQ questions with schema
- Published and up to date

**Action items:**
- [x] Review content depth — ensure each of the 10 steps has 100+ words of explanation — already good
- [x] Add more internal links from other pages pointing TO this post (added from /compliance/pipeda)
- [x] Add a "Quick Reference" summary table at the top of the post
- [ ] Add links from homepage FAQ if any PIPEDA questions exist
- [ ] Ensure blog post has proper image (not empty string in schema)
- [x] Consider adding 2-3 more FAQ questions for long-tail variants (added 3: small biz, Law 25, GDPR comparison)

---

## Phase 3: Technical Performance

### 3.1 — Fix mobile ranking gap (Desktop pos 25.8 vs Mobile pos 37.5)

**Priority:** Medium — 3,420 mobile impressions with only 5 clicks
**Effort:** 3-4 hours

**Root causes identified in audit:**
1. Hero section is fully client-rendered (`'use client'` with `useSession`)
2. LogoMarquee causes CLS (returns `null` during loading, no skeleton)
3. Banner.js was render-blocking (fixed in session 1 with `async`)

**Action items:**
- [ ] Extract static hero content (title, description) into a Server Component wrapper, keep interactive parts (email input, session check) as a client island
- [x] Add fixed-height skeleton/placeholder to LogoMarquee during loading state
- [x] Set explicit dimensions on LogoMarquee container to prevent CLS
- [ ] Run Lighthouse on mobile after fixes to verify CWV improvement
- [ ] Test with Chrome DevTools mobile emulation

### 3.2 — Move AEO structured data to Server Component

**Priority:** Low
**Effort:** 30 minutes
**Why:** Currently rendered client-side with `'use client'`. Structured data is more reliably read by crawlers when it's in the initial HTML response.

**Action items:**
- [x] Remove `'use client'` directive from aeo-structured-data.tsx
- [x] Remove `useMemo` wrapper (not needed in server components)
- [x] Verify schemas still render correctly

---

## Phase 4: Content & Authority

### 4.1 — Add named authors to blog posts

**Priority:** Medium
**Effort:** 2-3 hours
**Why:** "cookie-banner-team" as author hurts E-E-A-T. AI systems and Google both favor named, credentialed individuals.

**Action items:**
- [ ] Create author profiles (name, title, bio, photo, LinkedIn URL)
- [ ] Update blog frontmatter to use real author names
- [ ] Add Person schema markup for blog authors
- [ ] Update StructuredData article type to use Person instead of Organization for author

### 4.2 — Add inline source citations to legal content

**Priority:** Medium
**Effort:** 4-6 hours
**Why:** Statistics like penalty amounts lack attribution. AI systems cite passages with explicit sources at significantly higher rates.

**Action items:**
- [ ] Audit all compliance pages for unattributed statistics
- [ ] Add inline citations: "according to [Source], [year]" format
- [ ] Link to official sources (oag.ca.gov, priv.gc.ca, cai.gouv.qc.ca, ico.org.uk)
- [ ] Add source links to the CCPA enforcement cases section

### 4.3 — Start YouTube presence (highest AI citation correlation)

**Priority:** Medium (long-term)
**Effort:** 20-40 hours
**Why:** YouTube mentions have the strongest correlation with AI citations (~0.737). Zero video content currently.

**Suggested first 5 videos:**
1. "How to Add a Cookie Banner to WordPress in Canada" (targets /integrations/wordpress traffic)
2. "Quebec Law 25 Cookie Consent Explained" (targets law 25 keyword cluster)
3. "PIPEDA Cookie Compliance in 5 Minutes" (supports /compliance/pipeda)
4. "Cookiebot vs Cookie-Banner.ca: Honest Comparison" (supports /compare page)
5. "How to Use Our Free Cookie Scanner" (supports /tools/cookie-scanner)

---

## Phase 5: Keyword Expansion

### 5.1 — Create dedicated Law 25 page

**Priority:** Medium
**Effort:** 3-4 hours
**Why:** "law 25 cookie banner" has 96 impressions at position 9.58, currently served by the Canada guide. A dedicated page could rank solidly on page 1.

**Action items:**
- [ ] Create /compliance/law-25 or /compliance/quebec-law-25 page
- [ ] Cover: what Law 25 requires, French language requirements, timeline, penalties
- [ ] Add to sitemap, footer navigation, and internal links

### 5.2 — WordPress integration blog post

**Priority:** Low
**Effort:** 2-3 hours
**Why:** /integrations/wordpress has 280 impressions at position 21.69 with 0 clicks. A supporting blog post ("How to Add a Cookie Banner to WordPress") could boost this page.

---

## Priority Order (recommended execution sequence)

| Order | Task | Effort | Expected Impact |
|-------|------|--------|-----------------|
| 1 | 2.1 — React integration title/meta | 30 min | 1 click -> 50+ clicks (pos 9, just needs CTR fix) |
| 2 | 2.2 — Cookiebot alternative expansion | 2-3 hrs | Push from pos 16 to page 1, capture "vs" keywords |
| 3 | 2.4 — PIPEDA checklist boost | 1-2 hrs | Push from pos 11 to solid page 1 |
| 4 | 3.1 — Mobile performance fixes | 3-4 hrs | Improve 3,420 mobile impressions CTR |
| 5 | 2.3 — Cookie scanner expansion | 2-3 hrs | Improve pos 52 for 2,728 impressions |
| 6 | 4.1 — Named authors | 2-3 hrs | E-E-A-T improvement across all blog content |
| 7 | 5.1 — Law 25 dedicated page | 3-4 hrs | Capture growing Quebec-specific traffic |
| 8 | 4.2 — Inline source citations | 4-6 hrs | AI citation improvement |
| 9 | 3.2 — AEO schema to server component | 30 min | Minor reliability improvement |
| 10 | 5.2 — WordPress blog post | 2-3 hrs | Support /integrations/wordpress |
| 11 | 4.3 — YouTube channel | 20-40 hrs | Long-term AI citation + authority |

---

## Success Metrics (check at 28-day intervals)

| Metric | Current | 30-Day Target | 60-Day Target |
|--------|---------|---------------|---------------|
| Total clicks | 100 | 200 | 400 |
| Total impressions | 16,782 | 20,000 | 30,000 |
| Average CTR | 0.60% | 1.5% | 2.5% |
| Average position | 28.4 | 20 | 15 |
| Homepage position | 15.26 | 8 | 5 |
| /compliance/ccpa position | 57.55 | 25 | 10 |
| /integrations/react clicks | 1 | 30 | 80 |
| /compare/cookiebot-alternative position | 16.19 | 10 | 7 |
| Mobile click share | 5% | 15% | 25% |

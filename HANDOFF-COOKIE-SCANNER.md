# Cookie Scanner Debug Session — Handoff Document

**Date:** 2026-05-21
**Branch:** `claude/improve-product-competitiveness-5l5ug`
**Status:** All fixes working locally, not yet committed or deployed

---

## What was broken

The public cookie scanner at `/tools/cookie-scanner` had several bugs preventing it from producing accurate results.

## What was fixed (this session)

### 1. Webpack binary parse error — server crash
**Files:** `next.config.mjs`

`@sparticuz/chromium-min` contains binary files that webpack tried to parse as JS, crashing the entire API route. Fixed by adding:
- `experimental.serverComponentsExternalPackages` (Next.js 14 config)
- A webpack `externals` function that marks `playwright-core`, `playwright`, and `@sparticuz/chromium-min` as external CommonJS modules

### 2. Bot user agent suppressing consent banners
**File:** `lib/scripts/scan-website-headless.ts`

The scanner used `CookieBannerBot/1.0` as its user agent. Many sites hide consent banners from known bots. Changed to a real Chrome UA string.

### 3. Consent banner detection only checked known CMP DOM selectors
**File:** `lib/scripts/scan-website-headless.ts`

The old code only checked ~10 hardcoded CSS selectors (Cookiebot, OneTrust, etc.). Custom banners, iframe CMPs, and API-based CMPs were all missed. Added 5 detection layers that run in order:

1. **Known CMP DOM selectors** (existing — Cookiebot, OneTrust, Termly, etc.)
2. **IAB TCF/CMP/USP/GPP JavaScript APIs** — checks `window.__tcfapi`, `window.__cmp`, `window.__uspapi`, `window.__gpp`. This is how BBC's banner was detected.
3. **CMP script URL matching** in network requests — 13 vendor patterns including Sourcepoint, Complianz, and UK Cookie Consent (`cookie-banner.ca`)
4. **Iframe-based CMP detection** — checks iframe `src`/`id`/`title` for CMP patterns (Sourcepoint, OneTrust, etc. render inside iframes)
5. **Generic heuristic** — looks for visible elements with consent-related IDs/classes/text, and fixed/sticky positioned elements with cookie-related content

### 4. Navigation timeout on ad-heavy sites
**File:** `lib/scripts/scan-website-headless.ts`

Changed `waitUntil: 'networkidle'` → `waitUntil: 'load'`. Ad-heavy sites (BBC, news sites) never reach `networkidle` because ad networks keep firing requests. Increased `POST_LOAD_SETTLE_MS` from 1500ms → 3000ms to compensate — consent banners and delayed trackers still get captured.

Timeouts increased: navigation 25s→30s, total 35s→45s.

### 5. Scoring penalized sites unfairly when a consent banner was present
**File:** `lib/scripts/scan-website.ts`

Three scoring bugs:
- **GDPR**: Deducted up to 25 points for marketing cookies even when a CMP was present, and showed the penalty silently ("0 issues" but score < 100). Now: lighter penalty (capped at 10) with a clear message explaining cookies were detected *before consent was given*.
- **CCPA**: Treated marketing cookies as a hard violation (up to 40 point deduction) regardless of opt-out mechanism. CCPA is an **opt-out** regime — having cookies is fine if there's an opt-out. Now: if a banner exists, light penalty (capped at 10) with "verify your banner includes opt-out" message. Heavy penalty only when there's no opt-out mechanism at all.
- **PIPEDA**: Deducted for third-party cookies even when a privacy policy existed. Now: only deducts when there's no privacy policy to disclose the sharing.

### 6. French language / Law 25 detection
**Files:** `lib/scripts/scan-website-headless.ts`, `lib/scripts/scan-website.ts`

**Problem:** Law 25 requires consent notices in French for Quebec visitors. The old scorer always said "cannot be verified from a single-page scan" and docked 10 points blindly.

**Solution — website-level detection:** The headless scanner now checks:
1. `lang="fr"` on the HTML element
2. `<link rel="alternate" hreflang="fr">` tags
3. Language switcher links ("Français", `/fr`, `?lang=fr`)
4. `Content-Language` meta tag
5. If a French URL is found, navigates to it and verifies `lang="fr"` on the loaded page

**Solution — banner-level detection:** If the site uses UK Cookie Consent (`cookie-banner.ca` script detected), the scanner recognizes that the banner has **built-in French translations with browser language auto-detection**. This satisfies Law 25's consent notice requirement even if the website itself is English-only. Also checks inline scripts for `TRANSLATIONS` objects with `fr` keys.

The scoring now uses this data: if `frenchLanguage.available` is true (from any signal), no Law 25 penalty.

### 7. Missing `name` field on rate limiter + rate limit bumped
**File:** `app/api/tools/cookie-scanner/route.ts`

The `RateLimit` constructor was missing the required `name` field. Added `name: 'public-cookie-scanner'`. Bumped from 3 → 10 scans per hour per IP (3 was too aggressive for a marketing tool).

### 8. Cheerio fallback CMP patterns expanded
**File:** `lib/scripts/discover.ts`

Added Sourcepoint, Complianz, and expanded UK Cookie Consent patterns (`cookie-banner.ca`, `cookie-consent.*banner.js`).

### 9. Smart quotes in hero-v2.tsx (unrelated pre-existing bug)
**File:** `components/landing/v2/hero-v2.tsx`

This untracked file had typographic "smart quotes" (Unicode `"` / `"`) in JSX `className` attributes, which SWC couldn't parse. Since `app/page.tsx` imports it, the entire dev server was broken. Replaced all smart quotes with straight ASCII double quotes.

---

## Files changed (scanner-specific)

| File | What changed |
|---|---|
| `next.config.mjs` | Added `experimental.serverComponentsExternalPackages` + webpack externals for Playwright/Chromium |
| `app/api/tools/cookie-scanner/route.ts` | Added `name` to rate limiter, bumped to 10/hr, fixed header values |
| `lib/scripts/scan-website-headless.ts` | Real Chrome UA, 5-layer CMP detection, French language detection (website + banner), `waitUntil: 'load'`, increased timeouts |
| `lib/scripts/scan-website.ts` | Fair scoring for GDPR/CCPA/PIPEDA when CMP present, French language passthrough to scoring, `frenchLanguage` field in result |
| `lib/scripts/discover.ts` | Added Sourcepoint, Complianz, expanded UK Cookie Consent patterns |
| `components/landing/v2/hero-v2.tsx` | Fixed smart quotes (unrelated to scanner) |

## Test results

| Site | Before | After |
|---|---|---|
| cookie-banner.ca (our site) | Crashed / wrong results | A 100 — all 100s, banner detected |
| bbc.co.uk | F 49, no banner detected | A 93 — banner detected via IAB TCF v2 |
| thejunctionstouffville.ca | ~88, Law 25 penalty | A 97 — banner + French translations detected |
| cookiebot.com | N/A | Banner detected (Cookiebot via DOM selector) |
| canada.ca | N/A | French detected via language switcher + verified |

## Not yet done

- **Not committed** — all changes are unstaged
- **Not deployed** — needs Vercel deploy after commit
- **Rate limit DB entries** — old entries from `undefined` name and different `maxRequests` values are still in Supabase `rate_limits` table. They'll expire naturally (1 hour window) but could be cleaned up
- **`maxDuration` on route.ts** is still 60s but total headless timeout is now 45s — should be fine but monitor on Vercel cold starts where Chromium download adds time
- **Cookie classifier** (`lib/scripts/cookie-classifier.ts`) — many cookies still show as "Unknown" source. The RULES catalog could be expanded (Chartbeat, Optimizely, Permutive, Piano, etc. were all "Unknown" on BBC)
- **Geo-targeting detection** — the scanner detects that UK Cookie Consent has French translations, but doesn't yet detect that geo-targeting rules are configured (e.g., Quebec-specific Law 25 rule). The banner config would need to be fetched and inspected to detect this
- **DNSS link detection** — CCPA recommends checking for a "Do Not Sell or Share" footer link. The scanner doesn't look for this yet; it could be added similar to the privacy policy link detection

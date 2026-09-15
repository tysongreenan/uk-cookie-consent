# Accessibility Menu — build & integration plan

**Track:** Product (new feature). Listed on the [AGENTS.md](../AGENTS.md) to-do.
**Related:** [IMPLEMENTATION-PLAN.md](./IMPLEMENTATION-PLAN.md) (product/journey), [PIPEDA-COMPLIANCE-PLAN.md](./PIPEDA-COMPLIANCE-PLAN.md) (legal positioning rules we reuse here).

**Goal:** Ship a visitor-facing **Accessibility Menu** (accessiBe / UserWay-class toolbar — profiles, content, colour, navigation aids) that is delivered through the **same one-line snippet** customers already paste, configured from the **same builder**, gated by the **same plan system**, and marketed **honestly** as part of a broader accessibility offering (accessible banner, accessibility statement, scanner).

**Reference UI:** the five screenshots reviewed on 2026-09-11 (blue "Accessibility Menu" panel: language picker → Accessibility Profiles → Content Adjustments → Visual & Navigation Aids → Colour Adjustments → Additional Tools → Reset; floating round trigger sitting next to our Cookie Settings pill).

---

## 0. Read this first — positioning and honesty guardrails

We already refuse to say "processed in Canada" or to fake ratings. The same discipline applies here, and it matters more, because this category has a regulator on record.

**What the law actually requires.** AODA (Ontario), the Accessible Canada Act, Québec's SGQRI 008, ADA Title II (US public sector, WCAG 2.1 AA deadlines 2026/2027), Section 508, the EU European Accessibility Act (in force June 2025, EN 301 549), and the UK Public Sector Bodies regulations all require that the **site content itself** conforms to WCAG 2.x AA. Several (AODA 50+ employees, EAA, UK PSBAR) also require a **published accessibility statement** and a **feedback channel**.

**What an overlay does.** A toolbar lets a visitor change font size, contrast, motion, focus, etc. It does **not** fix missing alt text, unlabeled forms, keyboard traps, or bad heading structure in the host page. Sites running overlays keep getting sued (UsableNet counts hundreds per year), and in January 2025 the **FTC fined accessiBe US$1M** for claiming its widget made sites WCAG-compliant. The [Overlay Fact Sheet](https://overlayfactsheet.com) (800+ practitioners) is what any procurement team will Google.

**Therefore, the copy rule for this whole feature:**

| Never say | Say instead |
|-----------|-------------|
| "Makes your site ADA / AODA / WCAG compliant" | "Accessibility menu that lets visitors adjust your site to their needs" |
| "Automatic accessibility" / "AI fixes your site" | "Supports your accessibility program; does not replace remediation" |
| "Screen reader" (for text-to-speech) | "Read aloud" |
| "Protects you from lawsuits" | "Helps you meet statement + feedback obligations under AODA / EAA" |

Every marketing page, tooltip, and the widget's own footer carries a one-line disclaimer, mirroring the "Template ≠ legal advice" line under the policy generator.

**What we *can* truthfully claim, and should build so it's true:**

1. **Our cookie banner is WCAG 2.2 AA conformant** (we control 100% of that markup — Phase 1 makes it true and audited). Cookie banners are a common lawsuit item; this is real value.
2. **The accessibility menu itself is WCAG 2.2 AA conformant** (unlike several competitors').
3. **Accessibility statement generator with a hosted page and feedback form** — an actual legal requirement in Ontario, the EU and the UK, and a direct parallel to our privacy-policy product.
4. **Automated scan** (axe-core) that reports what it finds and says plainly that automation catches ~30–40% of issues.

The widget is the visible flagship the user asked for. Items 1, 3, 4 are what make the pitch defensible. Build them in that order of honesty: banner a11y first (cheap, unblocks the claim), widget second (the feature), statement third, scanner fourth.

---

## 1. Product definition

### 1.1 Name

**Accessibility Menu** (visitor-facing, matches the screenshot header and avoids "overlay"/"widget" baggage). Internally: `a11y`. Feature flag key: `hasAccessibilityMenu`.

### 1.2 Reference UI → feature spec

Everything in the screenshots, mapped to what we build and any deviation.

**Header bar** — title, *Reset* icon, *Close*. Language dropdown at top (follows `config.language`, `auto` = `navigator.language`; 17 languages already exist in `lib/translations.ts`).

**Accessibility Profiles** (one-tap presets; each is just a bundle of the toggles below, persisted as the bundle so users can fine-tune after):

| Profile | What it toggles | Note |
|---------|-----------------|------|
| Seizure Safe | Stop animations, pause autoplay media, low saturation | |
| Blind Profile → **"Read Aloud"** | Web Speech API TTS on selection / hover | **v2.** Do not label it "screen reader". Footer note recommends NVDA/VoiceOver. |
| Visually Impaired | Font size 120%, high contrast, underline links, larger cursor | |
| ADHD Friendly | Reading mask, stop animations, mute sounds | |
| Cognitive & Learning | Reading guide, highlight titles + links, readable font | |
| Motor Impaired | Big cursor, always-visible focus rings, keyboard navigation hints, larger targets | |

**Content Adjustments** — font size stepper (80–200 %, 10 % steps), font weight, line height, letter spacing, dyslexia font (self-host OpenDyslexic, OFL-licensed, lazy-loaded only when toggled), highlight links, highlight titles, text alignment (v2), readable font.

**Visual & Navigation Aids** — Super Focus (dims everything but the hovered block), Reading Guide (horizontal bar tracking the pointer), Big Cursor (SVG cursor), Page Structure (dialog listing headings / landmarks / links — genuinely useful for keyboard users; this is where we shine), Keyboard navigation helper (v2: number-key jump to landmarks).

**Colour Adjustments** — Monochrome, Low Saturation, High Saturation, High Contrast, Light Contrast, Dark Contrast. Implemented as CSS filters and variable overrides on the host root, **excluding the widget host element**. Known trap: `filter` on `<html>` breaks `position: fixed` descendants and is slow on iOS; apply to `body > *:not(#cb-a11y-host)` with a documented fallback and a per-site "disable colour filters" switch in the builder.

**Additional Tools** — Stop Animations (`animation/transition: none !important` + pause `<video>`/`<audio>`, freeze GIFs where possible), Hide Images (blank `img`, `picture`, background images; keep alt text visible), Image Tooltips (show `alt` on hover; **flag missing alt** with a visible marker — useful and honest), Mute Sounds.

**Footer** — *Reset settings* (primary button), *Accessibility statement* link (customer's URL, ideally our hosted statement), *Report an accessibility issue* (mailto / hosted feedback form — AODA requires a feedback mechanism), *Powered by cookie-banner.ca* (Free plan only, same rule as the banner).

**Trigger button** — floating, universal-access icon, configurable corner/edge, size, shape, colours (default: inherit banner button colours so both widgets look like one system), optional label, hide-on-mobile, `customSelector` so a site can open the menu from its own footer "Accessibility" link (same pattern as our inline footer link), keyboard shortcut (`Alt+Shift+A`, configurable, off by default).

**Placement rule (fixes the screenshot collision):** the builder computes the trigger's default corner as the **opposite** of `branding.footerLink.floatingPosition`, and the preview shows a warning if both floaters share a corner. At runtime, if they still share a corner, the a11y trigger offsets itself vertically above the cookie pill.

### 1.3 Widget accessibility requirements (non-negotiable)

- Panel is `role="dialog" aria-modal="true" aria-labelledby`, focus trapped, `Esc` closes, focus returns to trigger.
- Every toggle is a real `<button role="switch" aria-checked>`; steppers are `role="group"` with `aria-valuenow` announcements; a polite live region announces changes ("Font size 120 %").
- Fully keyboard operable, visible focus, 24×24 minimum targets (WCAG 2.2 SC 2.5.8), 4.5:1 contrast in both light/dark themes, RTL for `ar`/`he`, respects `prefers-reduced-motion` / `prefers-contrast` / `forced-colors` (pre-select matching toggles, never override the OS silently).
- Never auto-detect assistive tech or auto-enable anything (accessiBe's "AI detection" is exactly what users hate). Never hijack native screen readers.
- Preferences persist in `localStorage` (`cb-a11y-prefs`, per origin) — user-requested, strictly-functional storage; no server call, no cookie. Documented in the cookie policy generator.
- Widget failure must never affect the cookie banner or the host page: boot after banner init, in its own `try/catch`, every feature wrapped, Sentry-reported.

---

## 2. Architecture

### 2.1 Delivery through the existing snippet (the core ask)

```text
<script src="https://cookie-banner.ca/api/v1/banner.js?id=…" async>   ← unchanged
        │
        ▼  app/api/v1/banner.js/route.ts  (already runs per page view, CDN cached)
        │  reads config.accessibility, enforces plan, embeds:
        │    window.__cbA11yConfig = {…hardened config…};
        │    loader: inject <script src="/a11y/widget.v{N}.js" defer> after banner init
        ▼
/a11y/widget.v{N}.js  ← STATIC asset from public/, immutable, long max-age
        │  renders trigger (≈2 KB critical path), lazy-loads panel + fonts on first
        ▼  interaction / idle
Shadow DOM panel  +  <style id="cb-a11y-adjust"> / html.cb-a11y-* classes on host page
```

Why this shape:

- **Cost.** `banner.js` comments are explicit that this endpoint dominates function invocations. The widget adds **zero** invocations: config rides inline in the already-generated script; the widget code is a static file on Vercel's CDN. Loader adds <1 KB to `banner.js`.
- **Auto-update.** Hosted-snippet customers get new widget versions when we bump `A11Y_WIDGET_VERSION` (filename changes → cache-safe, mirrors `deployVersion` in the ETag).
- **Isolation.** Shadow DOM for the panel so host CSS can't break it and ours can't leak; only the intentional adjustments touch the page.
- **Consent-first.** Banner and Consent Mode init are untouched; a11y boots last.

### 2.2 Standalone delivery (later)

Some customers want the menu without a cookie banner (US sites, or a second product SKU). Add `app/api/v1/a11y.js/route.ts` serving the same loader + config from the same banner record, and a `hostedA11ySnippet()` alongside `hostedInstallSnippet()`. Phase 7; do not build until the banner-bundled path is live.

### 2.3 Copy-paste (head/body) path

`components/banner/code-generator.tsx` head code gains the loader `<script src="…/a11y/widget.v{N}.js" data-cb-a11y='{…}' defer>`. Bump `GENERATOR_VERSION` in `lib/banner-version.ts` with a changelog entry so copy-paste users are prompted to re-copy.

### 2.4 Package layout

```text
packages/a11y-widget/                 # vanilla TS, zero deps, built with tsup → public/a11y/
  src/boot.ts                         # reads window.__cbA11yConfig or data-cb-a11y; try/catch everything
  src/state.ts                        # prefs model, localStorage, profile bundles
  src/i18n.ts                         # strings (17 langs), RTL
  src/ui/trigger.ts  src/ui/panel.ts  src/ui/page-structure.ts
  src/features/{font,contrast,motion,focus,cursor,images,links,reading-guide,…}.ts
  src/styles/panel.css  src/styles/adjust.css
  test/ (vitest + jsdom + axe-core)
  package.json  tsup.config.ts
public/a11y/widget.v1.js  public/a11y/fonts/OpenDyslexic-*.woff2   # build output, committed
lib/accessibility/
  config.ts       # AccessibilityConfig type + DEFAULT_A11Y_CONFIG + profile definitions
  harden.ts       # sanitize colours, URLs, enums (called from hardenBannerConfig)
  loader.ts       # generateA11yLoaderScript(config, { showBranding, version })
  version.ts      # A11Y_WIDGET_VERSION + A11Y_UPDATES changelog (mirrors banner-version.ts)
  translations.ts # widget strings, merged with lib/translations.ts languages
  contrast.ts     # WCAG contrast ratio helper (also used by Phase 1 builder warnings)
components/builder/accessibility-panel.tsx      # builder step
components/banner/banner-preview.tsx            # extend: trigger + panel preview, collision warning
```

### 2.5 Data model

No table change for v1. Add to `BannerConfig` in `types/index.ts` (same pattern as `geoRules` / `integrations`):

```ts
export interface AccessibilityConfig {
  enabled: boolean
  trigger: {
    position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'middle-left' | 'middle-right'
    offset?: { x: number; y: number }          // px, clamped 0–200
    size: 'small' | 'medium' | 'large'
    shape: 'circle' | 'pill' | 'square'
    icon: 'universal-access' | 'wheelchair' | 'eye'
    label?: string                              // e.g. "Accessibility"
    hideOnMobile?: boolean
    customSelector?: string                     // CSS selector, strict allowlist regex
    useBannerColors: boolean
    colors?: { background?: string; icon?: string; border?: string }
  }
  panel: {
    theme: 'light' | 'dark' | 'auto'
    accentColor?: string
    language?: BannerConfig['language']         // defaults to banner language
  }
  features: Partial<Record<A11yFeatureKey, boolean>>   // allowlist; missing = default on
  disableColorFilters?: boolean                 // escape hatch for sites where filters break layout
  shortcut: 'none' | 'alt-shift-a' | 'ctrl-u'
  statementUrl?: string
  feedbackEmail?: string
  showPoweredBy?: boolean                       // ignored server-side; plan decides
}
```

Persistence: `SimpleBanners.config` JSON. Hardening in `hardenBannerConfig` → `hardenAccessibilityConfig` (colours via `sanitizeCssColor`, URLs via `sanitizeHttpUrl`, enums whitelisted, selector regex `^[#.][\w-]+$`, offsets clamped). Save routes (`app/api/banners/simple/*`, `app/api/v1/developer/banners/*`) get a Zod schema for the block — today those routes have no schema validation; add it for this block at minimum.

### 2.6 Plan gating

**Principle (decided 2026-09-11): a visitor's accessibility needs are never gated by the site owner's plan.** Limiting a visitor's ability to enlarge text because the *owner* is on Free is exactly what the Overlay Fact Sheet crowd screenshots. So the gate is on *owner customization*, not on visitor features.

| | Free (and lifetime, per freeze policy) | Pro Annual / Enterprise |
|---|---|---|
| All 22 adjustments + 6 profiles | ✅ | ✅ |
| Trigger placement | auto: corner opposite the Cookie Settings button | any of 6 positions + offset, size, shape, icon, label, hide on mobile |
| Colours | inherits banner button colours | custom trigger colours, panel theme, accent |
| Feature allowlist / colour-filter escape hatch | — | ✅ |
| Statement URL + feedback email in footer | — | ✅ |
| Keyboard shortcut, open from own link (`customSelector`) | — | ✅ |
| "Accessibility menu by cookie-banner.ca" footer | shown | removed |
| Usage analytics card | — | ✅ (Phase 3 step 9, not built yet) |

Implementation: two flags in `PlanFeatures` / `lib/plan-restrictions.ts`:

- `hasAccessibilityMenu` — `true` for every tier, deliberately **not** in `FEATURE_RELEASE_DATES`.
- `hasAccessibilityCustomization` — Pro base; `FEATURE_RELEASE_DATES` = `2026-09-11` (post-cutoff → lifetime excluded, gets the Free column above and can upgrade).

Server enforcement lives in `app/api/v1/banner.js/route.ts` (TCF pattern): `resolveA11yRuntimeConfig(config, { customization })` builds the widget's runtime config *after* plan rules, so the widget never knows about plans. The copy-paste head code in `code-generator.tsx` applies the same rules client-side from `planTier`. Kill switch: `A11Y_MENU_DISABLED=1`.

Builder: the step is visible to everyone; Free sees the Pro controls disabled with an `UpgradePrompt` (same pattern as GPC config), and the preview shows the auto placement.

### 2.7 Analytics

Extend `/api/v1/track` event enum with `a11y_open`, `a11y_toggle` (`feature` + `on/off`), `a11y_profile`, `a11y_reset`. Aggregated only, reuse `_cbQueueEvent`; Pro dashboard gets an "Accessibility menu usage" card (opens, top adjustments, % of sessions). No PII, no per-visitor storage.

### 2.8 Integrations

- **MCP** (`packages/mcp/src/index.ts`): `update_banner` accepts `accessibility`; new `enable_accessibility_menu` convenience tool; `get_install_snippet` unchanged (same snippet — that's the point). README + `lib/ai-setup.ts` prompts mention it.
- **Developer API** (`app/api/v1/developer/banners/[id]`): same field, Zod-validated.
- **WordPress plugin** (`public/class-ctcc-public.php`): no change (hosted snippet). Verify only.

---

## 3. Phases

Effort: S ≤ 2 days · M ≤ 1 week · L 2–3 weeks · XL > 3 weeks. Owners follow `.claude/CLAUDE.md` team.

### Phase 0 — Decisions & spikes (S)

1. Resolve Decisions D1–D6 (section 6).
2. Spike: CSS `filter` on `body > *` vs `html` on iOS Safari + a fixed-header WordPress theme; record findings in this doc.
3. Spike: Shadow DOM panel inside `public/sandbox-test.html` next to the live banner; confirm z-index and focus trap coexist with the preferences modal.
4. Confirm OpenDyslexic licence text for `public/a11y/fonts/LICENSE`.
5. Legal: send section 0 copy rules + draft disclaimer to the lawyer already reviewing the privacy policy (bundle with PIPEDA Phase A).

**Status (2026-09-11):** D1–D4, D6 decided (section 6). Spikes done, findings below. D5 and the lawyer sign-off (item 5) remain open.

**Spike findings**

- **Colour filters.** Confirmed the failure mode: `filter` on `<html>`/`<body>` makes it the containing block for every `position: fixed` descendant (sticky headers, our own banner) and is GPU-expensive on iOS. Chosen approach: a full-viewport, `pointer-events: none` overlay inside the widget's shadow root using **`backdrop-filter`** (`grayscale`, `saturate`, `contrast`). It filters everything painted behind it without touching layout, and because it sits *below* the panel in the same stacking context the menu itself is never filtered. Verified in the sandbox: with monochrome on, a `position: fixed` header stays at `top: 0` and a `position: sticky` aside stays stuck while scrolling. Fallback for browsers without `backdrop-filter` (`CSS.supports` check → `html.cb-a11y-nobf`): `filter` on `body > *`, which keeps the common fixed-element case working. **Still to do on a physical iPhone:** confirm scroll performance with the overlay active (the preview browser here is desktop Chromium).
- **Light/dark contrast** are *not* filters — they are forced-colour stylesheets (`background-color`/`color` `!important` on `body *`, images/video/svg excluded), so they survive the colour-filter escape hatch. The broad rule is wrapped in `:where()` so link/highlight rules can out-rank it.
- **Shadow DOM + banner.** The host is `all: initial` inline (so a site's `div {}` rules can't win) with typography re-declared inline; document-level adjustments target `body *:not(#cb-a11y-host)` and never reach the shadow tree. z-index: host `2147483001` > cookie floater `999998` > preferences modal `99999` > banner `10000`. The trigger watches `#cookie-consent-banner`'s `style` attribute and lifts itself above a visible bottom/top bar; the panel hides the trigger while open. Focus trap is shadow-root-aware (`root.activeElement`); `document.activeElement` is retargeted to the host, so "return focus on close" reads `root.activeElement` first.
- **Font size.** Scaling `<html>` alone misses px-sized text, so the widget records each text-bearing element's computed size once (`data-cb-a11y-fs`) and sets an `!important` inline size — idempotent for any scale, fully reversible, MutationObserver for new nodes, capped at 6 000 elements.
- **Read Aloud.** Web Speech API works in Chromium; `cancel()` followed by `speak()` in the same tick drops the utterance, so speak is deferred 80 ms. Tile is disabled (with a title) where `speechSynthesis` is missing.
- **OpenDyslexic** is SIL OFL 1.1 — `public/a11y/fonts/OFL.txt` shipped alongside the two woff2 files (Regular, Bold), self-hosted so customer sites make no third-party font request.
- **Bundle:** 46 KB raw / **14.8 KB gzip** (budget 25) with all features, no strings (strings are inlined server-side per banner).

### Phase 1 — Make the cookie banner itself WCAG 2.2 AA (M)

Cheapest, most honest win; unblocks the "accessible banner" claim on every marketing page.

1. Audit `generateBannerHTML/CSS/JS` in `lib/banner-generator.ts`: dialog semantics for banner + preferences modal, focus trap and return, `Esc`, heading order, `aria-live` on save, visible focus rings, 24×24 targets, `prefers-reduced-motion` guard on `layout.animation`, no `aria-hidden` on visible controls, category switches as `role="switch"`.
2. Builder **contrast warnings** in the Design step (`lib/accessibility/contrast.ts`): flag `button/buttonText`, `background/text`, `link/background` under 4.5:1 with a one-click "fix" to nearest passing shade.
3. Automated test: vitest + jsdom + `axe-core` over generated markup for a matrix (all positions × light/dark × reject on/off × 3 languages). Fails CI on any serious/critical violation.
4. Manual pass: VoiceOver + Safari, NVDA + Chrome, keyboard only. Log findings, fix, re-run.
5. Bump `GENERATOR_VERSION` (copy-paste users re-copy); changelog entry "WCAG 2.2 AA banner".

**Success:** axe matrix green in CI; manual pass logged; `/features/what-you-get` can say "WCAG 2.2 AA conformant banner" with a link to the test report.

### Phase 2 — Widget core (`packages/a11y-widget`) (L)

1. Scaffold package, tsup build → `public/a11y/widget.v1.js` (+ sourcemap), size budget check in CI (**≤ 25 KB gzip** JS+CSS, fonts excluded).
2. `boot.ts`: config contract (`window.__cbA11yConfig` or `data-cb-a11y`), single-instance guard, global `try/catch`, Sentry breadcrumb hook.
3. `state.ts`: prefs schema + versioned `localStorage` migration, profile bundles, `prefers-*` media pre-selection.
4. Trigger: SVG icon set, positions, collision offset logic with `#cookie-consent-banner` floater, keyboard shortcut, `customSelector` binding, hide-on-mobile.
5. Panel (Shadow DOM): header, language select, section cards, switches, font stepper, footer; light/dark/auto; RTL.
6. Features, one module each, all idempotent apply/remove: fontSize, fontWeight, lineHeight, letterSpacing, dyslexiaFont (lazy `@font-face`), readableFont, highlightLinks, highlightTitles, stopAnimations, hideImages, imageTooltips, muteSounds, bigCursor, readingGuide, superFocus, monochrome, lowSat, highSat, highContrast, lightContrast, darkContrast, pageStructure.
7. i18n: `lib/accessibility/translations.ts` for all 17 banner languages (EN + FR authored; others machine-drafted and marked for review, same as banner translations).
8. Tests: unit for state/profile logic; jsdom render + axe-core on the panel (both themes, LTR + RTL); feature apply/remove round-trips leave DOM clean.

**Status (2026-09-11):** built. Every feature from the reference screenshots is implemented (`packages/a11y-widget/src/**`), plus `muteSounds` and an internal `focusRing` used by the Motor profile. Differences from the plan: esbuild (already a dependency) instead of tsup; only EN + FR authored — the other 15 banner languages fall back to EN until authored in `lib/accessibility/translations.ts`; the language picker lists whatever is inlined. Sandbox page is generated at `public/a11y/sandbox.html` (`node packages/a11y-widget/sandbox/make-sandbox.mjs`, `?plan=free|pro`). Tests: `packages/a11y-widget/test/*.test.ts` (state, UI, apply/reverse, axe on the open panel). **Open:** run on 5 real CMS pages and a physical iOS device.

**Success:** widget runs standalone in the sandbox; axe clean; budget met; every feature reversible; no console errors on 5 sample WordPress/Shopify/Webflow/Wix/Squarespace pages.

### Phase 3 — Integrate into serving, builder, snippets (M)

1. `types/index.ts` + `lib/accessibility/config.ts` (+ defaults); `hardenAccessibilityConfig` wired into `hardenBannerConfig`; Zod on save routes.
2. `plan-restrictions.ts`: `hasAccessibilityMenu`, release date, `canAccessFeature` case.
3. `banner.js` route: plan check → strip or embed `generateA11yLoaderScript()` after `bannerJSInit()`; `showPoweredBy` by plan; ETag needs no change (`updatedAt` + deploy SHA already cover it).
4. `code-generator.tsx`: head-code loader; `GENERATOR_VERSION` bump.
5. Builder step **"Accessibility"** inserted after `cookie-settings` in `stepOrder` (before `behavior`): enable toggle, trigger position/size/shape/icon/colours (inherit banner colours default), panel theme, feature allowlist grouped like the screenshot, shortcut, statement URL, feedback email, colour-filter escape hatch. Collision warning vs footer link corner. `isStepComplete` = enabled or explicitly skipped.
6. `banner-preview.tsx`: render trigger; click opens the real widget (load the built file in the preview iframe) so what they see is what ships.
7. `banner-card.tsx`: "Accessibility menu on" badge. Dashboard `feature-highlight.tsx` announce.
8. MCP + developer API + `lib/ai-setup.ts` prompts.
9. Analytics events + dashboard card.

**Status (2026-09-14):** steps 1–5, 7–9 done. Step 6 is still a static trigger preview in `banner-preview.tsx` (not the live widget). Zod on save routes, banner-card badge, dashboard feature highlight, `lib/ai-setup.ts` prompt, MCP README, and analytics (`increment_a11y_stat` + `/api/v1/track` event types, dashboard card, CSV export) are in. Standalone `a11y.js` now posts the same track payload on paid plans. Apply `supabase/migrations/20260914000001_a11y_banner_stats.sql` before production counts start landing. CMS chrome lives on the sandbox (`?cms=wordpress|shopify|webflow|wix|squarespace`). Physical iPhone still needs a device pass.

**Success:** enable in builder → copy the *same* snippet → menu appears on a live test site within one CDN TTL; disabled owners get no widget bytes; MCP `update_banner` can turn it on.

### Phase 4 — Accessibility statement generator + feedback (L)

Parallel to the privacy-policy product; this is the legally required piece.

1. `lib/accessibility-statement/` templates: **AODA (Ontario)**, **Accessible Canada Act**, **Québec SGQRI 008**, **ADA / Section 508**, **EAA / EN 301 549**, **UK PSBAR**; EN + FR. Inputs: org, conformance target (WCAG 2.1/2.2 A/AA), known limitations, feedback channel, review date, alternate formats.
2. `/tools/accessibility-statement` (free: copy/download; Pro: save + host — mirror `/tools/privacy-policy` gating).
3. Hosted page `/p/{slug}/accessibility` on the existing hosted-document layout; feedback form → Resend email to `feedbackEmail`, stored like data-access requests for the AODA record.
4. Builder a11y step: "Generate statement" deep link, auto-fills `statementUrl`.
5. Disclaimer + lawyer review of templates (bundle with PIPEDA legal review cadence).

**Success:** Pro user goes zero → hosted EN/FR statement linked from the menu footer → receives a feedback email, in < 10 minutes.

### Phase 5 — Accessibility scanner (M)

1. `/tools/accessibility-scanner`: reuse `lib/scan-url.ts` browser infra, run axe-core, return grouped issues (critical/serious first), coverage disclaimer ("automated checks find roughly a third of WCAG issues").
2. Lead path: results → "Add an accessibility menu + statement" → `/builder?tab=accessibility`.
3. Rate limit + cache by URL/day (same rules as cookie scanner).

**Success:** page indexed, ≥ X scans/week, conversion to builder tracked in PostHog.

### Phase 6 — Marketing, SEO, pricing, docs (M)

Copy rules from section 0 apply to every line. Copywriter + `nextjs-seo` skill.

1. `/features/accessibility-menu` (feature page), `/compliance/aoda`, `/compliance/ada`, `/compliance/eaa` (siblings of `/compliance/pipeda`), update `/locations/canada`, `/locations/us`, `/solutions/*` where relevant.
2. Comparison pages via `seo-competitor-pages`: `/compare/accessibe-alternative`, `/compare/userway-alternative` — lead with honesty (FTC order, overlay limits) and price.
3. Blog: "Do accessibility overlays make you AODA compliant?" (no), "Ontario AODA website requirements 2026", "EAA checklist for Canadian sellers into the EU", "Accessible cookie banners: what WCAG 2.2 actually requires".
4. Pricing page: add "Accessibility menu + statement" to Pro Annual; roadmap item + changelog; `llms.txt`, `/docs`, `/changelog`, MCP README.
5. Terms: add accessibility feature language (no compliance warranty) — same lawyer pass.

**Success:** no page anywhere claims compliance; GSC impressions on target keywords within 8 weeks.

### Phase 7 — Standalone product path (M, only after Phase 3 is stable 30 days)

1. `app/api/v1/a11y.js/route.ts` + `hostedA11ySnippet()`; "Accessibility only" mode in builder that hides banner steps.
2. Decide SKU/price (D5).

### Phase 8 — v2 features (backlog)

Read Aloud (Web Speech API, honest label), keyboard navigation helper, text alignment, virtual keyboard, per-page structure export, saved profiles across sites (would need an account — probably never).

---

## 4. Testing & QA matrix

| Layer | Tool | Gate |
|-------|------|------|
| Config hardening, plan gating, translation key parity | vitest | CI |
| Widget state/profiles/persistence | vitest + jsdom | CI |
| Widget panel a11y (light/dark, LTR/RTL) | axe-core in jsdom | CI, zero serious/critical |
| Banner markup a11y matrix (Phase 1) | axe-core in jsdom | CI |
| Bundle size | tsup + size-limit | CI, ≤ 25 KB gzip |
| End-to-end on `public/sandbox-test.html` | Playwright (`playwright-cli` skill) | CI |
| Cross-platform smoke | Playwright vs WordPress, Shopify, Webflow, Wix, Squarespace demo pages | pre-release |
| Assistive tech | VoiceOver/Safari, NVDA/Chrome, TalkBack, keyboard-only | pre-release, manual log |
| Perf | Lighthouse on sandbox: no CLS from trigger, TBT delta < 20 ms | pre-release |
| Host-page safety | Widget throws → banner still consents; `?nocache=1` verify | pre-release |

---

## 5. Rollout

1. PostHog flag `a11y-menu` (internal) → our own site first (dogfood: enable on cookie-banner.ca).
2. Beta: 10 pro_annual customers by email, 2-week window, Sentry filter on `a11y` tag.
3. GA: changelog, roadmap "shipped", email announcement, pricing/feature pages go live together (never marketing before the feature).
4. Post-GA: weekly widget-error rate, opens/sessions, top toggles; `A11Y_WIDGET_VERSION` bumps ride normal deploys.

Kill switch: env `A11Y_MENU_DISABLED=1` makes `banner.js` skip the loader globally without a customer-side change.

---

## 6. Decisions needed (owner: Tyson)

| # | Decision | Recommendation |
|---|----------|----------------|
| D1 | Free plan gets the menu? | **Decided 2026-09-11: yes.** Free gets the *full* visitor menu (all adjustments + profiles) with the default look and "Accessibility menu by cookie-banner.ca". Pro Annual gets customization + no branding (table in §2.6). Rationale: never gate a visitor's accessibility on the owner's plan; "free accessibility widget" is the acquisition term. |
| D2 | Lifetime (`pro_lifetime`) users | **Decided 2026-09-11: excluded from customization by the freeze policy** (`FEATURE_RELEASE_DATES.hasAccessibilityCustomization = 2026-09-11`); they get the Free menu and the loyalty upgrade path. |
| D3 | Name | "Accessibility Menu" everywhere. Never "overlay". |
| D4 | Read Aloud (TTS) in v1? | **Changed to yes** — the reference UI has it and the user wants feature parity. Shipped as "Read aloud" / "Read Aloud Profile" with the copy "Native screen readers remain the most complete option." Never called a screen reader. |
| D5 | Standalone SKU / price | Open. Defer to Phase 7; default is "included in Pro Annual". |
| D6 | Colour filters default on? | **Decided: on**, via `backdrop-filter` overlay (spike above), with the per-site escape hatch. Re-confirm scroll performance on a physical iPhone. |

---

## 7. Risks

| Risk | Mitigation |
|------|------------|
| Regulatory/PR backlash for overlay claims | Section 0 copy rules; lawyer review; disclaimer in widget footer; ship Phase 1 + 4 so the offer isn't only an overlay |
| CSS filters break fixed layouts / iOS perf | Phase 0 spike; apply below `<html>`; escape hatch; feature-detect |
| Widget CSS/JS conflicts with host or our banner | Shadow DOM; namespaced `cb-a11y-*` classes; z-index one below the banner; e2e on 5 builders |
| Bundle bloat raises TBT on every customer page | Static asset, lazy panel, lazy fonts, size budget in CI |
| Extra function cost on `banner.js` | None by design (inline config, static widget); verify via Vercel usage after GA |
| Free-plan abuse of the static file | File is useless without config; branding enforced from server-generated config |
| Translation quality across 17 languages | EN/FR authored; others flagged "machine draft"; accept community fixes |
| Widget preferences misread as tracking | localStorage only, documented, no cookie, no server |

---

## 8. Files to touch (checklist)

- [x] `types/index.ts` — `AccessibilityConfig`, `A11yFeatureKey`, `A11yTriggerPosition`, `PlanFeatures.hasAccessibilityMenu` + `hasAccessibilityCustomization`
- [x] `lib/plan-restrictions.ts` — both flags, release date for customization, `canAccessFeature` cases
- [x] `lib/banner-config-security.ts` — calls `hardenAccessibilityConfig`
- [x] `lib/accessibility/{config,harden,loader,version,translations,index}.ts` (+ `accessibility.test.ts`) — `contrast.ts` is Phase 1
- [ ] `lib/banner-generator.ts` — Phase 1 a11y fixes
- [ ] `lib/banner-version.ts` — changelog entry when announcing
- [x] `app/api/v1/banner.js/route.ts` — plan check + loader injection + `A11Y_MENU_DISABLED` kill switch
- [x] `app/api/v1/a11y.js/route.ts` (+ `route.test.ts`) — **standalone install** `<script src="…/api/v1/a11y.js?id=…" async>` for sites that keep another cookie banner. Same plan enforcement, hardening, kill switch, `banner-<id>` cache tag (purged on save), ETag = updatedAt + widget build hash. Idempotent with `banner.js` on the same page. Snippet helper: `a11yInstallSnippet()` in `lib/install-snippet.ts`.
- [x] `app/api/banners/simple/route.ts`, `app/api/banners/simple/[id]/route.ts` — Zod for `accessibility` (serve-time hardening already covers safety)
- [x] `app/api/v1/developer/banners/[id]/route.ts` — same, plus nested `accessibility` merge so `{ enabled: true }` keeps trigger/panel
- [x] `app/api/v1/track/route.ts` + `increment_a11y_stat` RPC — `a11y_open` / `a11y_toggle` / `a11y_reset` / `a11y_profile` (`window.__cbA11yTrack` already existed)
- [x] `app/dashboard/builder/page.tsx` — "Accessibility" step after Cookie Settings in `stepOrder`, tab, panel, `isStepComplete`, `a11yCustomization` → preview
- [x] `components/builder/accessibility-panel.tsx` (new)
- [x] `components/banner/banner-preview.tsx` (static trigger preview via `components/banner/a11y-trigger-preview.tsx`), `components/banner/code-generator.tsx` (head-code tag)
- [x] `components/dashboard/banner-card.tsx`, `feature-highlight.tsx`
- [x] `packages/a11y-widget/**` (new) → `public/a11y/widget.v1.js` (+ map), `public/a11y/fonts/OpenDyslexic-{Regular,Bold}.woff2` + `OFL.txt`, `public/a11y/sandbox.html`; `npm run build:a11y` / `watch:a11y`
- [x] `next.config.mjs` — CORS + immutable cache headers for `/a11y/*` (cross-origin script + fonts need them)
- [x] `vitest.config.ts` — includes `packages/a11y-widget/test/**`; `jsdom` + `esbuild` added as devDependencies
- [x] `packages/mcp/src/index.ts` — `update_banner` documents `config.accessibility.enabled`; [x] `packages/mcp/README.md`, `lib/ai-setup.ts`
- [ ] `lib/accessibility-statement/**`, `app/tools/accessibility-statement/**`, hosted route (Phase 4)
- [ ] `app/tools/accessibility-scanner/**` (Phase 5)
- [ ] Marketing: `app/features/accessibility-menu`, `app/compliance/{aoda,ada,eaa}`, `app/compare/*`, pricing, roadmap, changelog, `llms.txt`, docs (Phase 6)
- [x] Sandbox: `public/a11y/sandbox.html` (generated) instead of editing `public/sandbox-test.html`
- [x] Tests: `lib/accessibility/accessibility.test.ts`, `packages/a11y-widget/test/{state,ui}.test.ts`; [ ] banner axe matrix (Phase 1)

### How to try it locally

1. `npm run build:a11y` (rebuild after editing `packages/a11y-widget/src`), `node packages/a11y-widget/sandbox/make-sandbox.mjs`.
2. `npx next dev -p 3011` → `http://localhost:3011/a11y/sandbox.html?plan=free` or `?plan=pro`; add `&banner=bar|card`, `&corner=left|right`, `&theme=light|dark`, and `&cms=wordpress|shopify|webflow|wix|squarespace` to check placement against typical CMS chrome. The page has a fixed header, sticky aside, images with/without alt, a video, a CSS animation, and a mock cookie banner + floating pill wired to the real DOM ids.

**Placement rule (widget + builder preview):** the trigger starts in its configured corner, then is measured against `#cookie-consent-banner` and `#cookie-settings-float` (`packages/a11y-widget/src/placement.ts`) and pushed clear along its anchored edge — bar, card, or pill, in any corner, re-checked when the banner is injected, shown/hidden, resized or animated. On phones (≤480px) the trigger is icon-only and capped at 48px.
3. In the builder, open the **Accessibility** step, switch it on, save, and load `banner.js?id=…` — the loader appears after the banner init, before the closing IIFE.
4. Standalone: `curl 'http://localhost:3011/api/v1/a11y.js?id=…'` — returns the loader IIFE when the menu is enabled, otherwise a one-line `console.info` explaining what to turn on (400 for a bad id, 404 for an unknown one, `console.warn` for a disabled banner).

**Install story (what the owner sees):** the Code tab notes that the hosted one-liner also delivers the menu; the Accessibility step ends with a "Putting it on your site" card that offers both the hosted snippet (nothing new to add) and the menu-only `a11y.js` snippet, each with a Save-and-copy button for unsaved banners.

---

## 9. Verification facts to re-check before publishing copy

Legal facts move; confirm each with the lawyer or a current primary source at Phase 6, not from memory: FTC v. accessiBe order (Jan 2025) terms; ADA Title II web rule dates (Apr 2026 / Apr 2027) and any Title III rulemaking; EAA application date (28 Jun 2025) and Canadian-seller scope; AODA current reporting deadlines and the 50+ employee statement threshold; ACA regulations in force; Québec SGQRI version; WCAG 2.2 as the current Recommendation.

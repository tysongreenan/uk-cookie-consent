# AGENTS.md

Project conventions, agent team, and workflow live in [`.claude/CLAUDE.md`](.claude/CLAUDE.md). Follow those when coding.

---

## To-Do

Keep this list current. Each item points at the plan or doc that owns the details — do not duplicate the full plan here.

### Active

- [ ] **PIPEDA / Law 25 positioning** — execute [docs/PIPEDA-COMPLIANCE-PLAN.md](docs/PIPEDA-COMPLIANCE-PLAN.md)
  - [ ] **A.** Ops before launch: `privacy@cookie-banner.ca` mailbox, designate Privacy Officer, lawyer review of `app/privacy-policy/page.tsx`, hyperlink Terms → `/privacy-policy`, commit + deploy the uncommitted policy PR
  - [ ] **B.** Short internal breach-response procedure + 24-month breach register (`policies/breach-register.md`)
  - [ ] **C.** Customer-facing DPA + subprocessor list
  - [ ] **D.** Montreal migration via dump/restore (not Prisma-only); carry hand-applied SQL; decide whether to split websitefeedback.ca; then update policy §7
  - [ ] **E.** After D is live: flip "Data Residency Info — Coming Soon"; add **"stored at rest in Canada"** (never "processed in Canada") to `/locations/canada` and `/compliance/pipeda`

### Do not start until the plan says so

- Montreal cutover is **paused**. Re-authorize Supabase MCP and read Phase D of the PIPEDA plan before touching production.
- Do not claim Canadian processing. Vercel / Stripe / Resend stay US.

### Other tracks

- Product / journey leftovers: [docs/IMPLEMENTATION-PLAN.md](docs/IMPLEMENTATION-PLAN.md)
- [ ] **Accessibility Menu** (visitor toolbar delivered through the existing snippet + accessible banner + statement generator + scanner) — execute [docs/ACCESSIBILITY-WIDGET-PLAN.md](docs/ACCESSIBILITY-WIDGET-PLAN.md). Copy rule: never claim it makes a site ADA/AODA/WCAG compliant.
 - [x] Phase 0 decisions (Free = full menu + branding; Pro Annual = customization; lifetime excluded from customization) and spikes (backdrop-filter overlay, Shadow DOM, OpenDyslexic OFL) — findings in the plan
 - [x] Phase 2 widget built: `packages/a11y-widget` → `public/a11y/widget.v1.js` (14.8 KB gzip), all screenshot features, EN + FR; `npm run build:a11y`
 - [x] Phase 3 piping: types, plan flags, hardening, `banner.js` loader + kill switch, builder "Accessibility" step, head-code tag, MCP note
 - [x] Phase 3 leftovers: banner-card badge + feature highlight, Zod on save routes, analytics events (`increment_a11y_stat` RPC), `lib/ai-setup.ts`, MCP README; CMS chrome in sandbox (`?cms=wordpress|shopify|webflow|wix|squarespace`); physical iPhone still needs a device pass
 - [ ] Phase 1 (banner WCAG 2.2 AA + contrast warnings), Phase 4 statement generator, Phase 5 scanner, Phase 6 marketing (lawyer review of copy first)
 - [ ] Phase 1 (banner WCAG 2.2 AA + contrast warnings), Phase 4 statement generator, Phase 5 scanner, Phase 6 marketing (lawyer review of copy first)

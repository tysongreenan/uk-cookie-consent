# PIPEDA + Law 25 positioning plan

**Status:** in progress  
**Owner:** founder (ops + legal) + eng  
**Last updated:** 22 August 2026  
**Claim we can make today:** we publish how we handle personal information (PIPEDA Principle 8 — Openness).  
**Claim we can make after Montreal lands:** **"data stored at rest in Canada"** — never "processed in Canada."

This is the remaining work to lock in a defensible Canadian-privacy position. It is not legal advice. Have a lawyer review the public policy before launch.

---

## Why this exists

Cookie Banner sells privacy compliance. Until 22 August 2026 the site had **no actual privacy policy**: every "Privacy Policy" link pointed at `/privacy`, which is the Privacy Manager Chrome extension landing page. Terms of Service still says "our Privacy Policy explains…" without a hyperlink. For a CMP, that is both a PIPEDA Principle 8 failure and a reputational landmine.

Data practices in code are already strong. The gap is operational (mailbox, officer, DPA, breach register) plus honest residency messaging once the paused Montreal migration completes.

---

## Done (uncommitted as of 22 Aug 2026)

Do not re-do. Verify live after the privacy-policy PR is committed and deployed.

| Item | Where | Notes |
|------|--------|--------|
| Company privacy policy (PIPEDA + Law 25 structure) | `app/privacy-policy/page.tsx` | Written from actual data practices, not marketing copy |
| 8 "Privacy Policy" links repointed to `/privacy-policy` | footer (2), 5 auth pages, sitemap | `/privacy` stays the Chrome extension page |
| Sitemap entry | `app/sitemap.ts` | `/privacy-policy` at priority 0.5 |
| Wording of residency | Policy §7 | "stored at rest in Canada" after migrate; US compute (Vercel / Stripe / Resend) disclosed; migration described as underway |

**Working-tree files (do not lose):** `app/privacy-policy/page.tsx` (new); `components/landing/footer.tsx`; `app/auth/{signin,signup,signup-privacy,forgot-password,reset-password}/page.tsx`; `app/sitemap.ts`.

**Commit when asked.** Lawyer review of the policy before it is treated as launched.

---

## Safe claims vs forbidden claims

PIPEDA does **not** require Canadian residency. It requires transparency and comparable protection for transfers. The new policy already covers that.

| Say this | Never say this |
|----------|----------------|
| Data stored at rest in Canada (only after Montreal is live) | Processed in Canada |
| Consent records contain no visitor IP | "Your data never leaves Canada" |
| Analytics are country-level aggregates | "Canadian compute / Canadian hosting" |
| Privacy Officer contact is published | "Fully PIPEDA / Law 25 certified" |

Vercel has no Canadian function region. Stripe and Resend are US processors. Compute stays in the US even after the DB move.

---

## What is already strong (do not weaken)

Verified in code — treat as assets for this positioning:

- Consent records store only a hashed cookie ID, decision, categories, two-letter country code, page path, and timestamp. **No visitor IP, ever.**
- Analytics endpoint is the same: country-level aggregates only.
- Dashboard security audit log stores IPs (legitimate) and has a weekly cleanup cron.
- DSAR tooling, consent-log retention, and Law 25 content pages exist and are real.

---

## Remaining checklist

### Phase A — Ops (do before treating the policy as live)

| # | Task | Why | Owner | Status |
|---|------|-----|-------|--------|
| A1 | Create mailbox **privacy@cookie-banner.ca** and route it to a monitored inbox | Policy §2, §12, §16 already publish this address. Dead mailbox = Principle 8 failure again. | founder | **open** |
| A2 | Formally designate a Privacy Officer. Under Law 25 this defaults to the CEO unless delegated in writing. Title + contact must be published — the policy already publishes contact. | Law 25 "person in charge of the protection of personal information" | founder | **open** |
| A3 | Lawyer review of `app/privacy-policy/page.tsx` before launch | Drafted to PIPEDA/Law 25 structure from actual practices; not legal advice | founder + counsel | **open** |
| A4 | Hyperlink "Privacy Policy" in Terms (`app/terms/page.tsx` §§2 and 7) to `/privacy-policy` | Terms still names the policy with no link | eng | **open** |
| A5 | Commit + deploy the uncommitted privacy-policy PR | Policy is not live until this ships | eng | **open** |

### Phase B — Breach readiness (PIPEDA record-keeping)

Existing `policies/incident-response-plan.md` covers security incidents and mentions a breach register, but there is **no actual register file** and the procedure is not a short, runnable privacy-breach playbook.

| # | Task | Why | Owner | Status |
|---|------|-----|-------|--------|
| B1 | Write a short internal **privacy breach-response procedure** (who decides "real risk of significant harm", OPC + CAI notification path, customer notice, 24-month record rule) | PIPEDA breach-reporting regulations; Law 25 CAI notice | founder | **open** |
| B2 | Start a **breach register** (keep records 24 months even for non-notifiable incidents). Suggested path: `policies/breach-register.md` (internal, do not publish) | PIPEDA requires keeping breach records 24 months | founder | **open** |
| B3 | Confirm `security@cookie-banner.ca` and `privacy@cookie-banner.ca` both land somewhere monitored | IR plan and public policy use different addresses | founder | **open** |

### Phase C — Customer-facing legal (sales + Law 25 customers)

Customers need these for *their* Law 25 compliance. They are also a sales asset.

| # | Task | Why | Owner | Status |
|---|------|-----|-------|--------|
| C1 | Publish a customer-facing **DPA** (Data Processing Agreement) | Law 25 / PIPEDA customers cannot rely on us without one | founder + counsel + eng | **open** |
| C2 | Publish a **subprocessor list** (Supabase, Vercel, Stripe, Resend, Google OAuth — already named in policy §8) | Same; keep it in sync with policy §8 | founder + eng | **open** |

Suggested public URLs (do not invent until written): `/dpa` and `/subprocessors`, linked from `/privacy-policy` §8 and from the sales/docs path.

### Phase D — Montreal migration (paused — do not resume blindly)

Supabase MCP was not authorized in the session that produced this plan, so production schema was **not** re-checked. Two hard constraints before any cutover:

1. **Production has hand-applied SQL that does not live in Prisma migrations.** If the new Montreal project is rebuilt from Prisma migrations instead of a full `pg_dump` / restore, consent logging breaks again silently. Known extras:
   - partitioned `consent_records` tables
   - dashboard RPCs
   - snake_case `updated_at` trigger function
   - RLS fixes from the shared-DB incident
2. **websitefeedback.ca shares this database.** The migration moves its data too. Shared tenancy weakens any "your data is isolated in Canada" claim. Decide whether to split projects as part of the move.

| # | Task | Why | Owner | Status |
|---|------|-----|-------|--------|
| D1 | Re-authorize Supabase MCP (`/mcp` in an interactive session) and snapshot production schema vs Prisma migrations | Know exactly what dump/restore must carry | eng | **open** |
| D2 | Write a Montreal cutover runbook: dump/restore **or** a checklist of the hand-applied SQL; rollback; DNS/env cutover | Prevent silent consent-log breakage | eng | **open** |
| D3 | Decide: split websitefeedback.ca onto its own Supabase project, or accept shared tenancy and do not over-claim isolation | Protects the Canadian-residency claim | founder | **open** |
| D4 | Execute migration via dump/restore (not Prisma-only rebuild) | Constraint 1 | eng | **blocked on D1–D3** |
| D5 | After cutover: update privacy policy **§7** — migration is no longer "underway"; state storage region as AWS Canada (Montreal) | Policy currently says the move is in progress | eng | **blocked on D4** |

### Phase E — Marketing copy (only after D4 is live)

| # | Task | Why | Owner | Status |
|---|------|-----|-------|--------|
| E1 | Flip the "Data Residency Info — Coming Soon" badge on the roadmap (`components/landing/roadmap-preview.tsx` and `app/roadmap/page.tsx` if duplicated) | Stop advertising residency as vapour | eng | **blocked on D4** |
| E2 | Add Canadian-residency messaging to `/locations/canada` and `/compliance/pipeda` | Use **stored at rest in Canada** only | eng + copy | **blocked on D4** |

---

## Verification

After Phase A ships:

- `/privacy-policy` renders, is in the sitemap, and is the target of footer + auth "Privacy Policy" links
- `/privacy` remains the Chrome extension page (do not conflate)
- `privacy@cookie-banner.ca` accepts mail
- Terms "Privacy Policy" is a real link

After Phase D ships:

- Consent logging still writes (create a test banner, accept, confirm a row)
- Policy §7 no longer says the migration is underway
- Public copy never says "processed in Canada"

---

## Open questions (founder)

1. Split websitefeedback.ca off this database as part of Montreal, or keep shared tenancy and soften isolation language?
2. Who is the named Privacy Officer if not the CEO, and is that delegation in writing?
3. Public DPA: self-serve download vs. signed on request?

---

## Related

- Public policy: `app/privacy-policy/page.tsx`
- Internal IR plan (exists, does not replace B1/B2): `policies/incident-response-plan.md`
- Product/journey plan (separate track): `docs/IMPLEMENTATION-PLAN.md`
- Agent to-do pointer: `AGENTS.md`

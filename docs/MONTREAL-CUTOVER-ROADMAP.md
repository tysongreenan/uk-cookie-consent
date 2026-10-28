# Montreal cutover roadmap

**Status:** ready for weekend window — do not copy live data until then  
**Last updated:** 15 September 2026  
**Owner:** Tyson  
**Close this when:** production `cookie-banner.ca` reads/writes Montreal, smoke test is green, Ohio is kept only as rollback

This is the operational plan. Privacy copy after go-live is [PIPEDA-COMPLIANCE-PLAN.md](./PIPEDA-COMPLIANCE-PLAN.md) Phase D5 / E.

---

## Decision (locked)

| Product | Stays | Moves |
|---|---|---|
| Cookie Banner (`cookie-banner.ca`) | Vercel app | Supabase **Montreal** `cookie-banner-ca` (`fqawkhbsvtokvzexqhip`, `ca-central-1`) |
| Comment-tool / websitefeedback | App + Supabase **Ohio** `bamunfrbhopzrjobowfx` (`us-east-2`) | — |

Do **not** do another full mixed restore. Cookie tables only.

Ohio is **read-only** during the window. Never write Ohio. Rollback = point production env back at Ohio.

---

## Current state (15 Sep 2026)

| Piece | Status |
|---|---|
| Montreal project | Exists, idle, ~33 days stale vs Ohio |
| Vercel Preview / develop | Already Montreal |
| Vercel Production | Still Ohio |
| PR [#22](https://github.com/tysongreenan/uk-cookie-consent/pull/22) `yul1` | Draft, not merged |
| Auth Site URL | `https://www.cookie-banner.ca/` |
| Auth redirects | `www.cookie-banner.ca/**`, `cookie-banner.ca/**`, Vercel preview wildcard, `localhost:3000/**`. Leave `websitefeedback.ca/**` until after |
| Schema gap on Montreal | Cookie migrations Ohio has that Montreal may lack: `consent_logs` RPC (15 Aug), `a11y_banner_stats` (14 Sep) |

Dashboard can be quiet on a weekend. **Customer sites still POST consent 24/7.** Plan is copy → flip → delta catch-up, not a true freeze.

---

## Phase 0 — Before Saturday (no customer data)

Do these any weekday. They do not go stale.

- [ ] Re-auth Supabase MCP (`/mcps` → supabase → `i`) so schema can be applied on Montreal
- [ ] Apply **cookie schema only** on Montreal:
  - [ ] `supabase/migrations/20260815000001_consent_logs_rpc_top_n.sql`
  - [ ] `supabase/migrations/20260914000001_a11y_banner_stats.sql`
  - [ ] Any other cookie migration present on Ohio and missing on Montreal
- [ ] Verify Montreal: `banner_stats` has `a11y_*` columns; `get_consent_logs` exists
- [ ] Confirm Auth URLs (already added — re-check, do not overwrite)
- [ ] Keep PR #22 ready — **do not merge until the flip**
- [ ] Print Preview develop URL and confirm login still works (already on Montreal)

**Do not:** copy `User` / banners / consent / payments; recopy storage; flip production env; merge `yul1`; update the public privacy policy.

---

## Cookie table allowlist

**Copy (cookie):**

- `"User"`, `"Account"`, `"Session"`, `"VerificationToken"`
- `"Team"`, `"TeamMember"`, `"TeamInvitation"`
- `"Project"`, `"ConsentBanner"`, `"SimpleBanners"`, `"TrackingScript"`, `"BannerAnalytics"`, `"UserLogo"`
- `"Payment"`
- `banner_stats`, `banner_visitors`, `banner_configs` (if present)
- `consent_records` and all `consent_records_YYYY_MM` partitions
- `privacy_policies`, `privacy_policy_versions`
- `data_access_requests` and related DSAR tables
- `developer_api_keys`, `consumer_preferences`, `consumer_daily_stats`, `consumer_api_keys` (if cookie-owned)
- `rate_limit_buckets`

**Do not copy (comment-tool — leave on Ohio, ignore on Montreal):**

- `sites`, `comments`, `comment_tool_*`
- `auth.users` / identities (cookie login is NextAuth + `"User"`)

**Storage:** copy `logos` and DSAR buckets Ohio → Montreal. Leave `comment-attachments` / workspace buckets on Ohio.

If a table is ambiguous, skip it and log it. Do not guess.

---

## Phase 1 — Weekend window

Pick one block: **Saturday 23:00–01:00 ET** or **Sunday 06:00–08:00 ET**.

You will not pause `/api/v1/track`. Copy while production still writes Ohio, flip, then catch up the few minutes of new consent.

| Step | Action | Ohio | Montreal |
|---|---|---|---|
| 1 | Snapshot counts: users, banners, payments, consent | read | read |
| 2 | `pg_dump` allowlist tables + logos/DSAR from Ohio | **read only** | — |
| 3 | Restore cookie tables + storage into Montreal; reset sequences | — | write cookie only |
| 4 | Recheck counts (Montreal cookie ≈ Ohio) | read | read |
| 5 | Flip **production** Vercel env to Montreal (same values Preview already has): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`, `DIRECT_URL`. Redeploy production | untouched | becomes live |
| 6 | Merge and deploy PR #22 (`regions: ["yul1"]`) | — | functions in Montreal |
| 7 | Delta catch-up: Ohio rows with `created_at` / `updated_at` / `recorded_at` after dump start (consent first) | read | write |
| 8 | Smoke test | — | live |

Preview already uses **live Stripe keys**. Do not run real checkout on Preview after the copy.

### Smoke test (must all pass)

- [ ] Sign in at `https://www.cookie-banner.ca`
- [ ] Dashboard loads banners
- [ ] Banner JS serves
- [ ] Accept consent on a test page → **new row on Montreal**, not Ohio
- [ ] Stripe customer portal opens (do not purchase)
- [ ] Logo upload lands in Montreal `logos` bucket

---

## Phase 2 — If smoke fails (rollback)

Ohio still has every write from before the flip.

1. Point production Vercel env **back at Ohio**
2. Redeploy production
3. Do not delete Montreal — it is just stale again
4. Comment-tool was never moved

---

## Phase 3 — After green (Sunday or next weekday)

Not on the critical path.

- [ ] Watch Montreal consent inserts for ~1 hour
- [ ] Leave Ohio up for several days as rollback
- [ ] Remove `https://websitefeedback.ca/**` from Montreal Auth redirects
- [ ] Privacy policy §7: storage is AWS Canada (Montreal); stop saying the move is underway
- [ ] Flip “Data Residency Info — Coming Soon” on the public roadmap
- [ ] `/locations/canada` and `/compliance/pipeda`: **stored at rest in Canada** only — never “processed in Canada”
- [ ] PIPEDA D4/D5/E1/E2 → done

---

## IDs (do not mix these up)

| | Ohio (comment-tool + current cookie prod) | Montreal (cookie target) |
|---|---|---|
| Project | `bamunfrbhopzrjobowfx` | `fqawkhbsvtokvzexqhip` |
| Region | `us-east-2` | `ca-central-1` |
| API | `https://bamunfrbhopzrjobowfx.supabase.co` | `https://fqawkhbsvtokvzexqhip.supabase.co` |
| Vercel project | `tysongreenan1-cookie-consent` | same app, env flip only |

Secrets live in Vercel Preview (Montreal already) and `~/cookie-banner-canada-migrate/.montreal_*`. Do not commit them.

---

## Close-out

This conversation is done when this file is the source of truth. Next session: Phase 0 schema on Montreal, then wait for the weekend window and execute Phase 1.

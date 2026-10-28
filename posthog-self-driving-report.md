# PostHog Self-driving Setup Report

**Date:** 2026-08-12  
**Project:** cookie-banner.ca (PostHog project 553780)  
**Inbox:** https://us.posthog.com/project/553780/inbox

Findings will start appearing in your Self-driving inbox within approximately 30 minutes.

---

## Summary

PostHog Self-driving was configured for this project. Session Replay, Error Tracking, and Support signal sources were enabled; a 6-scout troop (general + 4 specialists + 1 custom) was tuned to this product's surfaces; two Replay Vision scanners were armed on the upgrade flow and rage-click sessions; and the GitHub integration was connected so Self-driving can research findings in code and open draft PRs.

---

## AI Data Processing

**Approved.** Organization-level AI data processing consent was granted before this run.

---

## GitHub

**Connected during this run.**  
Integration id: `213377`, account: `tysongreenan`  
Grants Self-driving code access so findings are researched against the actual repository and draft PRs can be opened.

---

## Products Enabled

The `products-enable` MCP tool was not available on this deploy. **Manual action required** — enable all three products in PostHog:

| Product | Action needed |
|---|---|
| Session Replay | Settings → Session replay → "Record user sessions" |
| Error Tracking | Settings → Error tracking → "Enable exception autocapture" |
| Support (Conversations) | Enable from the product sidebar |

The signal sources for all three were enabled anyway (step 4). They will sit idle until the product toggles are on, then pick up data with no re-setup.

**`posthog.init` check (web app):** Clean — no `disable_session_recording: true` or `capture_exceptions: false` overrides found in `components/providers/posthog-provider.tsx`. The server flip will take effect immediately once products are enabled.

**Support / Conversations:** Once enabled, tickets only arrive after an inbound channel (email, inbox widget, or Slack) is connected. See Follow-ups.

---

## Signal Sources

| Source product | Source type | Action |
|---|---|---|
| `signals_scout` | `cross_source_issue` | On by default — no row needed |
| `health_checks` | `health_issue` | **Enabled** (id: `019ff3e6-38d6…`) |
| `error_tracking` | `issue_created` | **Enabled** (id: `019ff3e6-39da…`) |
| `error_tracking` | `issue_reopened` | **Enabled** (id: `019ff3e6-3e4a…`) |
| `error_tracking` | `issue_spiking` | **Enabled** (id: `019ff3e6-41cc…`) |
| `session_replay` | `session_analysis_cluster` | **Enabled** (id: `019ff3e6-4a77…`, sample_rate: 0.1) |
| `conversations` | `ticket` | **Enabled** (id: `019ff3e6-4c17…`) — dormant until a channel is connected |
| `replay_vision` | — | Self-authorizing via scanner `emits_signals` flag — no row created |
| `llm_analytics` | — | Skipped — internal only, not a user-facing responder |
| `logs` | — | Skipped — not a v1 responder |

---

## Connected Tools

No external tools were selected. All connected-tool sources skipped (not used).

To connect issue trackers (Sentry, GitHub Issues, Linear, Jira, Zendesk, or others) in the future, go to: https://us.posthog.com/project/553780/pipeline/new/source

---

## Scout Troop

**Run budget:** 100 runs/day (0 used today). Max 3 per tick. Banner: *"Scouts are in early access. Each project gets up to 100 scout runs a day. Contact team-self-driving@posthog.com if you need more."*

**6 scouts enabled** (under the 10-scout ceiling):

| Scout | Status | Reason |
|---|---|---|
| `general` | **Enabled** (was already on) | Cross-product correlations and uncovered surfaces |
| `revenue-analytics` | **Enabled** | Stripe + SaaS subscriptions are a core surface |
| `ai-observability` | **Enabled** | `@ai-sdk/anthropic`, `@ai-sdk/react`, OpenRouter in use |
| `product-analytics` | **Enabled** | Funnels, retention, lifecycle — conversion is core |
| `web-analytics` | **Enabled** | SEO-focused public web app with UTM + pageview tracking |
| `signup-funnel` | **Enabled** (custom) | Free-to-paid conversion funnel coverage (see Custom Scouts) |

**22 scouts disabled:**

| Scout | Reason |
|---|---|
| `error-tracking` | Covered by native error tracking source (intentional) |
| `session-replay` | Covered by native session replay source (intentional) |
| `surveys` | 0 surveys found — not in use |
| `experiments` | No active experiments confirmed |
| `feature-flags` | No confirmed active flag usage |
| `logs` | PostHog logs product not in use |
| `csp-violations` | No CSP reporting configured |
| `customer-analytics` | No group/accounts analytics confirmed |
| `data-pipelines` | No CDP destinations or batch exports |
| `data-warehouse` | No warehouse sources connected |
| `apm` | No distributed tracing / OpenTelemetry |
| `conversations` | No support conversations data yet |
| `anomaly-detection` | No insights/dashboards to watch yet |
| `observability-gaps` | No insights to gap-check yet |
| `inbox-validation` | Fresh setup — no shipped fixes to validate |
| `replay-vision` | Scanners just created — no accumulated observations yet |
| `health-checks` | Cross-product, low priority vs surface specialists |
| `insight-alerts` | No alerts configured yet |
| `mcp-tool-calls` | No `$mcp_tool_call` events |
| `tasks` | No task delivery data |
| `skills-store` | Internal hygiene scout |
| `web-vitals` | No `$web_vitals` events captured |

Re-enable any of these via PostHog → Self-driving → Scout troop when the relevant surface becomes active. To switch a noisy scout to dry-run, set `emit: false` on its config in PostHog.

---

## Custom Scouts

### `signals-scout-signup-funnel` — created

**What it watches:** The ratio of unique users reaching `/upgrade/success` vs `/auth/signup` each week, using raw `$pageview` events.

**Discriminator:** A drop of ≥30% in the upgrade-to-signup ratio that holds for two consecutive runs *while signup traffic does not fall proportionally* — indicating a broken checkout or a regressed upgrade path rather than a traffic decline.

**Why no built-in scout covers it:** The `product-analytics` scout only watches *saved funnel insights*. Since no funnel insight exists yet in PostHog, this conversion path has zero coverage. Once you save a signup→upgrade funnel insight, you can disable this custom scout and let `product-analytics` take over.

**Noise escape hatch:** Set `emit: false` on the `signals-scout-signup-funnel` config in PostHog to switch it to dry-run if it becomes noisy.

**Surfaces considered and ruled out:**
- Stripe webhook health → no PostHog events in the webhook flow (revenue data stays in Supabase); not watchable as a scout
- AI compliance assistant performance → `@ai-sdk/anthropic` is used but no `$ai_*` events are instrumented yet; add PostHog AI observability SDK to unlock the `ai-observability` scout
- Banner creation success rate → the banner generator flow has no PostHog capture calls; not watchable
- Consent log submission → not instrumented
- SEO landing pages → covered by the `web-analytics` scout

---

## Replay Vision Scanners

Two standing scanners were created on this project. Each is an LLM that watches individual session recordings on a schedule and pushes what it finds to the Self-driving inbox. Findings arrive at half weight — they need corroboration from a second independent scanner before being promoted into a report. The queries are intentionally disjoint so no session is matched by both.

**This project has no recordings yet.** The scanners are armed and start working the day recordings begin, with no re-setup needed. Once products are enabled (see Products), session replay will start capturing data.

| Scanner | Query scope | Sampling | Estimated monthly credits | Status |
|---|---|---|---|---|
| **Broken experiences** | Sessions on `/upgrade*` URLs — the plan-selection and checkout flow | 0.5 (50%) | 0 (no recordings yet) | **Created** |
| **User frustration** | Sessions containing a `$rageclick` event — any URL | 1.0 (100%) | 0 (no recordings yet) | **Created** |

**Broken experiences** watches for: error messages or toasts, blank/white screens, content that failed to load, obviously broken layout, spinners that never resolve, and buttons or forms that clearly did nothing. Scoped to the upgrade flow because that's where silent breakage turns into lost revenue.

**User frustration** watches for: repeated clicks on the same element, hammering an unresponsive button, retrying the same action, hunting for something the user can't find, and mid-flow abandonment. Gated on `$rageclick` — a narrow, high-precision filter so `sampling_rate: 1.0` is affordable. Left URL-unconstrained to stay disjoint from scanner 1.

**Note:** The `creating-replay-vision-scanners` skill was not available on this deploy; credit spend was not verified via the sizing workflow. At these defaults (scoped query + 50% sampling for scanner 1) projected spend is 0 credits until recordings exist.

---

## Follow-ups

- [ ] **Enable Session Replay** in PostHog: Settings → Session replay → "Record user sessions"
- [ ] **Enable Error Tracking** in PostHog: Settings → Error tracking → "Enable exception autocapture"  
- [ ] **Enable Support (Conversations)** in PostHog: product sidebar
- [ ] **Connect a Support inbound channel** (email, inbox widget, or Slack) so the `conversations/ticket` source produces findings
- [ ] **Add PostHog AI observability instrumentation** — wrap LLM calls in `@ai-sdk/anthropic` with the PostHog AI SDK so `$ai_*` events flow and the `ai-observability` scout has data. See: https://posthog.com/docs/ai-engineering
- [ ] **Save a signup → upgrade funnel insight** in PostHog Insights so the `product-analytics` scout can watch it directly; once saved, you can disable the custom `signals-scout-signup-funnel` scout
- [ ] **Connect Sentry** as a warehouse source if you want Sentry issues to feed the inbox: https://us.posthog.com/project/553780/pipeline/new/source

---

## What Happens Next

The scout coordinator picks up fresh configs within ~30 minutes. Each enabled scout runs once a day (daily cadence), drawing from the 100-run daily budget. Findings cluster into reports in the inbox at https://us.posthog.com/project/553780/inbox. Immediately-actionable reports can auto-start a coding task and open a draft PR in the connected GitHub repo (`tysongreenan`).

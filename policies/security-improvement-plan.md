# Security Improvement Plan

**COOKIE-BANNER.CA — Closing UpGuard Questionnaire Gaps**
**Created:** April 10, 2026
**Owner:** Tyson Greenan, Founder

---

## Overview

This plan addresses every "No" answer from the Messer Group / UpGuard security questionnaire. Items are grouped into phases by effort and impact. Each item maps directly to a questionnaire number so future reassessments can track progress.

**Current score:** 150 Yes / 33 No / 11 N/A out of 194 questions
**Target:** Flip 20+ No answers to Yes within 6 months

---

## Phase 1 — Quick Wins (Week 1-2)
*Low effort, high impact. Mostly writing policies and adding config.*

### 1.1 Security KPI Dashboard (→ fixes 2.1.3)
**What:** Create a simple quarterly security metrics tracker.
**How:** Add a `policies/security-metrics.md` with:
- Total open vulnerabilities by severity (from Dependabot)
- Mean time to remediation (track from VMP)
- Days since last access review
- Days since last backup test
- Dependency update currency (% up-to-date)
**Effort:** 2 hours

### 1.2 Asset Inventory (→ fixes 3.1.2)
**What:** Create a formal asset register.
**How:** Add `policies/asset-inventory.md` documenting:
- GitHub repo (private, MFA, branch protection)
- Supabase project (region, plan, RLS status)
- Vercel project (framework, domains, env vars count)
- Stripe account (mode, webhook endpoints)
- Domain registrar + Cloudflare (DNS, SSL)
- Founder's devices (laptop model, OS, encryption status)
**Effort:** 1 hour

### 1.3 Wireless & Remote Access Policy (→ fixes 3.2.2)
**What:** Document wireless network security requirements.
**How:** Add section to ISP or standalone `policies/remote-access-policy.md`:
- Home WiFi must use WPA3/WPA2 with strong passphrase
- Public WiFi prohibited for accessing production systems
- VPN recommended for untrusted networks
- Router firmware kept up to date
**Effort:** 1 hour

### 1.4 Clean Desk & Home Office Security Policy (→ fixes 3.4.2, 3.4.3, 3.4.5)
**What:** Document physical security controls for remote work.
**How:** Add `policies/physical-security-policy.md`:
- Screen lock after 2 minutes of inactivity
- Laptop stored securely when not in use
- No scoped data displayed in shared/public spaces
- Full-disk encryption required (FileVault/BitLocker)
- Dedicated workspace with door that locks
**Effort:** 1 hour

### 1.5 Secure Online Resource Use Policy (→ fixes 3.3.3)
**What:** Document safe browsing and online resource use.
**How:** Add to ISP or standalone policy:
- No reuse of work credentials on external sites
- Verify URLs before entering credentials
- Report suspicious emails/links
- Use password manager for all credentials
**Effort:** 30 minutes

### 1.6 IT Architecture Document (→ fixes 5.1.1.1.4)
**What:** Create a formal secure architecture document.
**How:** Add `policies/architecture-plan.md`:
- System architecture diagram (Vercel → Supabase → Stripe)
- Security design principles (least privilege, defense in depth, fail secure)
- Data flow diagram showing encryption points
- Authentication architecture (NextAuth → Supabase Auth)
- Tenant isolation model (RLS policies)
**Effort:** 3 hours

### 1.7 Confidential Reporting Channel (→ fixes 2.1.22)
**What:** Establish a mechanism for reporting security violations.
**How:**
- Create security@cookie-banner.ca as the reporting channel (already exists)
- Document in ISP that this serves as the confidential reporting channel
- Add a `/security` page on the website with reporting instructions
- For future employees: anonymous form via Supabase edge function
**Effort:** 1 hour

---

## Phase 2 — Moderate Effort (Month 1-2)
*Requires tooling or process changes.*

### 2.1 Mobile Device Management (→ fixes 3.3.1.1)
**What:** Implement basic MDM for founder's devices.
**How:**
- Option A: Apple Business Manager + MDM profile (free for 1 device)
- Option B: Document device security requirements formally and self-audit
- Enforce: FileVault encryption, Gatekeeper enabled, auto-updates on, Find My Mac enabled, remote wipe capability
- Create `policies/endpoint-security-policy.md`
**Effort:** 4 hours
**Cost:** Free (Apple built-in) or ~$4/mo (Mosyle, Kandji)

### 2.2 Web Filter / DNS Security (→ fixes 3.3.4)
**What:** Implement DNS-level web filtering.
**How:**
- Configure Cloudflare Gateway (free tier) or NextDNS on all work devices
- Block: malware, phishing, adult content, newly registered domains
- Document in endpoint security policy
**Effort:** 2 hours
**Cost:** Free (Cloudflare Gateway basic)

### 2.3 Basic DLP Controls (→ fixes 3.1.11, 3.1.12)
**What:** Implement data loss prevention measures.
**How:**
- Enable GitHub secret scanning and push protection (free)
- Add `.gitignore` rules for sensitive files (verify current)
- Configure Supabase to alert on bulk data exports
- Document DLP procedures in ISP: detection → alert → investigate → contain → report
- Add pre-commit hooks to scan for secrets (e.g., `gitleaks`)
**Effort:** 4 hours
**Cost:** Free

### 2.4 Developer Security Training (→ fixes 5.1.1.5)
**What:** Complete formal security training with documentation.
**How:**
- Complete OWASP Top 10 course (free at owasp.org)
- Complete Supabase security best practices guide
- Complete Vercel security documentation review
- Document completion dates in `policies/training-log.md`
- Schedule annual refresher
**Effort:** 8 hours
**Cost:** Free

### 2.5 HR Readiness Package (→ fixes 2.4.1.3, 2.4.1.4, 2.4.3, 2.4.8 when you hire)
**What:** Prepare HR security policies for first hire.
**How:** Create `policies/hr-security-policy.md` covering:
- Pre-employment background check requirements
- Employment agreement template with security clauses (NDA, acceptable use, confidentiality)
- Disciplinary process for security policy violations
- Exit procedures (access revocation checklist, equipment return)
- Performance review process including security compliance
- Security awareness onboarding checklist
**Effort:** 4 hours
**Note:** These become active (and answerable as "Yes") when first employee is hired

---

## Phase 3 — Significant Investment (Month 3-6)
*Requires budget or external engagement.*

### 3.1 Third-Party Penetration Test (→ fixes 5.1.1.10, and strengthens 2.2.1)
**What:** Commission an independent web application penetration test.
**How:**
- Engage a CREST-certified or OSCP-certified pentester
- Scope: cookie-banner.ca web app, API endpoints, authentication flows
- Deliverable: formal pentest report with findings and remediation guidance
- Remediate all Critical/High findings before next questionnaire cycle
**Effort:** 1-2 weeks (vendor-led)
**Cost:** $3,000-$8,000 for a focused web app pentest

### 3.2 SOC 2 Type I Certification (→ fixes 2.2.1, 2.2.2)
**What:** Achieve SOC 2 Type I certification.
**How:**
- Use a startup-friendly platform (Vanta, Drata, or Secureframe)
- Your existing policies cover ~70% of SOC 2 requirements
- Gap areas: formal access reviews (automate), evidence collection, monitoring
- Type I = point-in-time assessment (3-6 months to achieve)
- Type II = observation period (additional 6-12 months after Type I)
**Effort:** 3-6 months
**Cost:** $5,000-$15,000/year (platform) + $10,000-$25,000 (auditor)

### 3.3 Application Security Expert Review (→ fixes 5.1.1.1.2)
**What:** Engage a security consultant to review application security.
**How:**
- Hire a part-time AppSec consultant (fractional CISO services)
- Review: auth flows, RLS policies, API security, dependency management
- Ongoing: quarterly security review calls
**Effort:** Ongoing
**Cost:** $2,000-$5,000/quarter

---

## Phase 4 — Structural (When Team Grows)
*These require employees to implement. Prepare now, activate when hiring.*

### 4.1 Segregation of Duties (→ fixes 3.1.18, 3.4.11, 4.2.6)
**When:** Second team member is hired.
**What:** Separate access control approval from implementation.
**How:**
- Different person approves vs. implements access changes
- Key management duties assigned to separate role
- GitHub branch protection requires different reviewer than author

### 4.2 Physical Security Controls (→ fixes 3.4.4-3.4.9)
**When:** If/when a physical office is established.
**What:** Implement facility security controls.
**Note:** These remain N/A for a fully remote company. Only relevant if you open an office.

---

## Items That Stay "No" (By Design)

These are honest "No" answers that don't need fixing:

| # | Question | Why it stays No |
|---|----------|----------------|
| 1.2.1 | Sensitive data stored? | Consent records are not sensitive (no health, financial, biometric) |
| 3.1.9 | Physical media? | Cloud-only, no physical media by design |
| 3.1.14 | Public file sharing for scoped data? | Scoped data only in Supabase, never in Dropbox/Drive |
| 3.1.18 | Segregation of duties (key mgmt)? | Sole operator — mitigated by provider-managed keys |
| 3.4.4-3.4.9 | Facility physical controls? | No facility — cloud-native by design |
| 3.4.17 | Own data center? | Cloud-hosted on Vercel/Supabase/AWS |
| 4.2.6 | Segregation of duties (access)? | Sole operator — mitigated by MFA + provider audit logs |
| 5.1.1.1.3 | Outsourced development? | All in-house — this is a strength |
| 5.1.1.2 | Scoped data in test? | Synthetic data only — this is a strength |
| 7.1.14 | Redundant data center? | Single Vercel region — accepted risk per risk register |
| 7.2.12 | Security breaches? | No breaches — this is good! |

---

## Impact Projection

| Phase | Effort | Cost | Questions Flipped |
|-------|--------|------|-------------------|
| Phase 1 | ~10 hours | $0 | 8 (No → Yes) |
| Phase 2 | ~22 hours | ~$4/mo | 7 (No → Yes) + 4 (N/A → Yes when hiring) |
| Phase 3 | 3-6 months | $15-40K | 3-4 (No → Yes) |
| Phase 4 | When hiring | $0 | 3 (No → Yes when team grows) |

**After Phase 1+2:** ~165 Yes / ~18 No / ~11 N/A (85% Yes rate, up from 77%)
**After Phase 3:** ~169 Yes / ~14 No / ~11 N/A (87% Yes rate)
**After all phases:** ~175 Yes / ~8 No / ~11 N/A (90% Yes rate)

---

## Priority Order

1. **This week:** Phase 1 (all quick wins, ~10 hours, $0)
2. **This month:** Phase 2.3 (DLP) + Phase 2.2 (web filter) — biggest security impact
3. **Next month:** Phase 2.1 (MDM) + Phase 2.4 (training)
4. **Q3 2026:** Phase 3.1 (pentest) — needed before next questionnaire cycle
5. **Q4 2026:** Phase 3.2 (SOC 2 Type I) — transforms your security posture
6. **When hiring:** Phase 2.5 (HR) + Phase 4 (segregation of duties)

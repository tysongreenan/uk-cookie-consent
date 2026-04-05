# UpGuard Security Questionnaire — Cookie Banner Generator

**Completed:** April 3, 2026
**Organization:** Cookie Banner Generator (cookie-banner.ca)
**Industry:** SaaS — Cookie Consent Management Platform
**Company Size:** Solo founder, fully remote
**Infrastructure:** Fully cloud-hosted (Vercel, Supabase, Stripe, GitHub)

---

## Section 1 — Scoping

**Q 1.1** — What services or products does your organization provide?
COOKIE-BANNER.CA is a cookie consent management platform (CMP) that helps website owners stay compliant with GDPR, PIPEDA, and Quebec's Law 25. Our SaaS solution manages consent banners, records user preferences, and maintains auditable logs. With an easy JavaScript widget and a sleek dashboard, we make privacy compliance simple and transparent.

**Q 1.2** — Is scoped data stored by your organization?
**Yes.** We store consent records (visitor consent preferences, timestamps, IP-derived country codes, consent strings, domain information), customer account data (email addresses, organization names), and billing metadata. All data is stored in Supabase (managed PostgreSQL) with encryption at rest (AES-256) and Row Level Security enforcing tenant isolation.

**Q 1.3** — Is your organization able to access scoped information systems?
**Yes.** The founder has administrative access to all production systems: Supabase (database), Vercel (application hosting), Stripe (payments), and GitHub (source code). All access requires MFA. No other individuals currently have access.

**Q 1.4** — Are AI systems integrated into the products or services your organization offers?
**No.** AI systems are not integrated into our product or services. The platform operates on deterministic logic — consent collection, storage, and banner delivery do not use machine learning, large language models, or automated decision-making.

---

## Section 2.1 — Information Security Program

**Q 2.1.1** — Yes
An Information Security Policy (v1.0, effective 2026-03-28) has been implemented and documented. It covers data classification, access control, encryption, vendor management, incident response, secure development, and business continuity. The policy is approved by the founder (sole management), reviewed annually, and communicated to all parties with system access.

**Q 2.1.2** — Yes
The Information Security Policy explicitly defines scope: all production systems and environments, all customer data including consent records, all third-party services, and the founder and any future contractors.

**Q 2.1.3** — Partial
The policy establishes principles and requirements for information security (encryption standards, access control requirements, SLA-based vulnerability remediation timelines). Vulnerability management metrics (mean time to remediation, open exceptions) are tracked quarterly per the Vulnerability Management Policy. We do not currently maintain a formal set of measurable KPIs tracked on a dashboard.

**Q 2.1.4** — Yes
Security policies align with industry-accepted practices including OWASP Top 10, CVSS v3.1 for vulnerability scoring, NIST-style risk assessment methodology (likelihood x impact), and regulatory frameworks (GDPR, PIPEDA, Law 25, PECR). Encryption standards follow TLS 1.2+ and AES-256.

**Q 2.1.5** — Partial
All security documentation is maintained in a version-controlled repository (Git/GitHub) with full change history. The founder owns all documents. Given the solo-founder structure, there is no dedicated records management owner separate from the security program owner — these roles are combined.

**Q 2.1.6** — Yes
The Information Security Policy (Section 7) establishes requirements for external systems, including vendor security certification verification (SOC 2 Type II for Vercel, Supabase, GitHub; PCI DSS Level 1 for Stripe), data processing agreements, and dependency management through Dependabot.

**Q 2.1.7** — Partial
The founder serves as the sole security lead and owner of the information security program. Given the solo-founder structure, there is no separate CISO role. This is acknowledged as a key person risk (R-006 in the Risk Register).

**Q 2.1.9** — Yes
The Vulnerability Management Policy (Section 9) documents a formal exception handling process. Exceptions require documentation of the vulnerability, reason for delay, compensating controls, revised target date, and founder approval. Exceptions are reviewed monthly.

**Q 2.1.10** — Yes
The Information Security Policy (Section 4) defines data classifications (Confidential, Restricted, Internal, Public) with specific handling requirements. The policy explicitly addresses unauthorized disclosure, misuse, alteration, and destruction through encryption standards (Section 6), access controls (Section 5), and incident response procedures (Section 8).

**Q 2.1.11** — Yes
The Information Security Policy (Section 3) defines roles and responsibilities. Future contractors must agree to the policy before accessing any company system and access is granted on a least-privilege basis.

**Q 2.1.12** — Yes
All infrastructure and IT operations are outsourced to managed cloud providers: Vercel (application hosting/CDN), Supabase (database/auth), Stripe (payment processing), and GitHub (source control/CI). Each provider maintains SOC 2 Type II or PCI DSS Level 1 compliance. No self-managed servers or data centers exist.

**Q 2.1.13** — Yes
The Information Security Policy (Section 7) includes third-party risk management: vendor security certifications are verified before adoption and reviewed annually, only vendors with established security programs are selected, and DPAs are executed with vendors that process personal data. The Risk Register includes specific third-party risks (R-003, R-004, R-010).

**Q 2.1.14** — Yes
The Risk Register documents a formal risk assessment process using a qualitative likelihood-times-impact methodology with defined scales (1–5 for both), risk rating thresholds (Low/Medium/High/Critical), and a heat map. The methodology produces consistent, comparable results across all 14 identified risks.

**Q 2.1.15** — Yes
The Risk Register includes a formal Risk Acceptance Statement signed by the founder, explicitly accepting residual risk levels. High-rated risks (R-005, R-006, R-008) are accepted with acknowledgment that additional mitigations should be evaluated as the business scales.

**Q 2.1.16** — Yes
The Risk Register covers risks across: infrastructure (R-002, R-003, R-013), application security (R-012), supply chain (R-005, R-014), operations (R-006, R-009), business model (R-011), cybersecurity (R-001, R-007), compliance (R-008), and third-party services (R-010).

**Q 2.1.17** — Yes
The Risk Register methodology identifies risk owners, analyzes risks using likelihood and impact scoring, considers potential loss, determines consequences and likelihood of recurrence, compares results against defined thresholds, and prioritizes treatment accordingly.

**Q 2.1.19** — Yes
The Change Management Policy requires security considerations for all changes. Significant changes (affecting data models, auth, billing, or privacy) require a documented risk assessment. Database migrations require testing against non-production environments first.

**Q 2.1.20** — Yes
The Information Security Policy is reviewed annually (next: 2027-03-28). The Vulnerability Management Policy and Incident Response Plan are reviewed semi-annually. The Risk Register is reviewed quarterly (next: 2026-06-28).

**Q 2.1.21** — Partial
As a solo-founder organization, the founder both implements and reviews security policy effectiveness. Vulnerability management metrics are tracked quarterly. However, there is no independent compliance monitoring function. This is a limitation of the solo-founder structure.

**Q 2.1.22** — N/A
Currently a solo-founder organization with no employees. A public security contact (security@cookie-banner.ca) exists for external reporting. A confidential reporting channel will be established when the team grows.

**Q 2.1.23** — Yes
The founder serves as both senior management and security lead. The Information Security Policy is directly aligned with the business strategy. Security requirements are integrated into the development workflow through the Change Management Policy and Git-based PR process.

**Q 2.1.24** — Yes
The Change Management Policy includes emergency change procedures for rapid remediation. The Vulnerability Management Policy provides SLAs by severity. The Incident Response Plan outlines contain/eradicate/recover procedures. Vercel's instant rollback capability enables rapid deployment reversals.

**Q 2.1.25** — Partial
The founder references OWASP (Top 10 is explicitly incorporated into development practices) and monitors industry security advisories. However, there are no formal memberships in ISC2, ISACA, or similar professional organizations.

---

## Section 2.2 — Third-Party Audits

**Q 2.2.1** — No
The information security program is not currently audited by third-party auditors. Our infrastructure providers (Vercel, Supabase, Stripe, GitHub) all maintain SOC 2 Type II or PCI DSS certifications and are independently audited. Third-party audit is on the roadmap as the company scales.

**Q 2.2.2** — No
Cookie Banner Generator does not currently hold SOC 2, ISO 27001, or other third-party certifications. Our cloud providers hold these certifications (Vercel — SOC 2 Type II, Supabase — SOC 2 Type II, Stripe — PCI DSS Level 1, GitHub — SOC 2 Type II).

---

## Section 2.3 — IT Operations

**Q 2.3.1** — Partial
IT operations are documented through the security policy suite covering application hosting (Vercel), database management (Supabase), payment processing (Stripe), and source control (GitHub). As a solo-founder company, there is no formal IT organizational chart — all responsibilities are held by the founder.

**Q 2.3.2** — Yes
All operational policies are documented, approved by the founder, and aligned with organizational strategy. Policies are stored in a version-controlled repository accessible to all authorized parties.

**Q 2.3.3** — Partial
Standard configurations exist at the application level (Next.js with TypeScript, Supabase PostgreSQL with RLS, Vercel hosting). No formal hardware configuration templates — all infrastructure is fully managed cloud services.

**Q 2.3.4** — Yes
A Change Management Policy (effective 2026-03-28) defines change classification (Standard, Significant, Emergency), Git-based approval workflow, testing requirements, deployment via Vercel, rollback procedures, and documentation requirements.

**Q 2.3.5** — Yes
The Change Management Policy requires significant changes (affecting data models, auth, billing, or privacy) to include a documented risk assessment. All changes go through PR review with security considerations before production deployment.

**Q 2.3.6** — Yes
Changes affecting authentication, billing, consent logic, or data models are classified as "Significant" and require additional risk assessment. The Data Classification framework guides these determinations.

**Q 2.3.7** — Yes
Security specifications are informed by the Information Security Policy, Vulnerability Management Policy (OWASP Top 10), Change Management Policy, regulatory requirements (GDPR, PIPEDA, Law 25, PECR), and the Risk Register.

**Q 2.3.8** — Yes
The Information Security Policy (Section 10) addresses business continuity. The Change Management Policy requires rollback plans for significant changes. All deployments are immutable with instant rollback via Vercel.

**Q 2.3.9** — Partial
Maintenance is handled through the Vulnerability Management Policy (dependency updates, security patching) and Change Management Policy. Dependabot automates dependency monitoring. The serverless architecture requires no server maintenance.

**Q 2.3.10** — Yes
The Change Management Policy requires: Vercel preview deployments for every PR, automated test suites must pass, database migrations tested on non-production environments, and significant changes require explicit testing of affected user flows.

---

## Section 2.4 — Human Resources Security

**Q 2.4.1** — No
No formal HR Security Policy. Solo-founder company with no employees or contractors. The Information Security Policy addresses future personnel requirements. A formal HR policy will be developed when the team grows.

**Q 2.4.2** — N/A
No employees or contractors have been hired or terminated.

**Q 2.4.3** — N/A
No employees or contractors have been hired.

**Q 2.4.4** — N/A
No employees or contractors.

**Q 2.4.5** — Partial
The founder maintains current knowledge of security best practices, privacy regulations, and emerging threats. However, there is no formal annual cybersecurity training program with documented completion records.

**Q 2.4.6** — Partial
The founder participates in continuing education through OWASP, security advisories, and regulatory updates. No formal continuing education program with documented participation records.

**Q 2.4.7** — No
No formal HR security training and awareness program. The Information Security Policy commits to security awareness orientation for future personnel.

**Q 2.4.8** — N/A
No employees. Not applicable for a solo-founder operation.

---

## Section 3.1 — Asset Management

**Q 3.1.1** — Partial
Assets are tracked through technology stack documentation and provider dashboards (Vercel, Supabase, GitHub, Stripe). No formal standalone asset management program or asset register document.

**Q 3.1.2** — No
No formal CMDB. As a fully cloud-hosted serverless application, the asset landscape is limited: one GitHub repo, one Vercel project, one Supabase project, one Stripe account, one domain. Managed through provider dashboards.

**Q 3.1.3** — Partial
The Information Security Policy covers acceptable use implicitly through access control and data classification requirements. No standalone Acceptable Use Policy document.

**Q 3.1.4** — Yes
The Information Security Policy (Section 4) defines data classification with specific handling requirements. The Data Retention Policy further specifies retention and destruction handling for each data type.

**Q 3.1.5** — Yes
The Data Retention Policy (effective 2026-03-28) specifies retention periods: consent records (3 years), customer data (duration + 90 days), payment records (7 years), application logs (30 days), backups (30 days rolling), session data (30 days).

**Q 3.1.6** — Yes
The Data Retention Policy defines maximum retention periods, automated destruction procedures, account deletion procedures, destruction methods, and cloud data lifecycle management for each provider.

**Q 3.1.7** — N/A
Fully cloud-based. No scoped data on physical media. All data resides in Supabase, Vercel, and Stripe. Destruction handled through database deletion and provider-managed backup rotation.

**Q 3.1.8** — Yes
Information is classified into four categories: Confidential (API keys, credentials), Restricted (personal data subject to privacy regulations), Internal (source code), and Public (marketing content), each with defined handling requirements.

**Q 3.1.9** — No
No scoped data sent or received via physical media. All data transfer is electronic over encrypted connections (TLS 1.2+).

**Q 3.1.10** — N/A
No physical media transport. All data transfers are electronic and encrypted.

**Q 3.1.11** — No
No formal DLP solution. Data loss risk is mitigated through environment variables for secrets, .gitignore exclusions, private GitHub repository, Supabase Row Level Security, and access controls.

**Q 3.1.12** — No
No DLP-specific handling process. Data loss incidents would be handled under the Incident Response Plan.

**Q 3.1.14** — No
Cloud-based public file-sharing solutions are not used for scoped data. All data resides in Supabase PostgreSQL. Source code is in a private GitHub repository.

**Q 3.1.15** — N/A
No cloud-based public file-sharing solutions used for scoped data.

**Q 3.1.16** — Partial
Encryption keys for data at rest are managed by infrastructure providers: Supabase (AES-256 for PostgreSQL), Vercel (environment variables), Stripe (PCI-compliant encryption). We do not manage our own encryption keys directly. Secrets (API keys, tokens) are managed through Vercel environment variables.

**Q 3.1.17** — N/A
Key generation is managed entirely by providers (Supabase, Vercel, Stripe), all maintaining SOC 2 Type II or PCI DSS certifications.

**Q 3.1.18** — N/A
Solo-founder organization with encryption keys managed by third-party providers. Providers implement their own key management segregation under their compliance programs.

---

## Section 3.2 — Network Security

**Q 3.2.1** — Partial
Remote access is the only access model — fully remote with no physical premises. All production systems accessed through provider dashboards requiring MFA. No standalone remote access policy document, but the Information Security Policy covers authentication standards including MFA.

**Q 3.2.2** — N/A
No offices, no corporate network, no wireless access points. All work conducted remotely. Infrastructure entirely cloud-hosted.

**Q 3.2.3** — Partial
Segmentation at the provider level: Supabase database accessed through API layer with RLS, Vercel functions run in isolated environments, Stripe payment processing isolated from the application database.

**Q 3.2.4** — Partial
Logical segmentation: application tier (Vercel), database tier (Supabase with RLS), payment processing (Stripe), source control (GitHub). Each accessed through authenticated gateways.

**Q 3.2.5** — N/A
No network devices managed. All network infrastructure managed by cloud providers under their SOC 2 compliance.

---

## Section 3.3 — Endpoint Security

**Q 3.3.1** — Yes
The founder's laptop accesses management interfaces that display scoped data. No scoped data is stored locally — all data resides in cloud infrastructure. Access requires MFA on all provider accounts.

**Q 3.3.2** — Partial
Devices protected with full-disk encryption, OS-level passwords, and automatic screen lock. MFA on all cloud accounts. No formal endpoint security policy or MDM solution.

**Q 3.3.3** — Partial
Security awareness is addressed in policy. No formal training policy specifically for secure online resource use.

**Q 3.3.4** — No
No web filter implemented. Solo-founder operation using personal devices with no corporate network infrastructure.

---

## Section 3.4 — Physical Security

**Q 3.4.1** — N/A
Fully remote, cloud-based organization. No physical offices, data centers, or secured facilities. Physical security of data centers is the responsibility of cloud providers under their SOC 2 compliance.

**Q 3.4.2 through 3.4.16** — N/A
No physical facilities. All physical security controls for data center infrastructure are managed by Vercel (AWS-backed) and Supabase (AWS-backed) under their compliance programs.

**Q 3.4.17** — No
All systems and data reside in data centers managed by Vercel and Supabase. The organization does not manage any data center.

---

## Section 4.1 — Privacy

**Q 4.1.1** — Yes
We collect, process, and retain personal information on behalf of clients: consent records (visitor preferences, timestamps, consent strings), customer account data (email, organization name), and billing metadata. We act as data processor for client consent records and data controller for customer account data.

**Q 4.1.3** — Yes
Cross-border data flows exist. Application hosted on Vercel's global edge network, database on Supabase (US region). Customers and their end users may be located in the EU, UK, Canada, and other jurisdictions.

**Q 4.1.4** — Partial
The Information Security Policy references compliance with GDPR, PIPEDA, Law 25, and PECR. DPAs executed with vendors. However, no standalone cross-border data transfer policy or documented SCCs/adequacy decision references. This is a gap being addressed.

**Q 4.1.5** — Partial
The founder serves as the de facto privacy officer. No formally designated Privacy Officer title or separate privacy program document.

**Q 4.1.6** — Yes
The Information Security Policy serves as the data governance framework: data classification, administrative controls, technical safeguards, and environmental safeguards. The Data Retention Policy governs the data lifecycle.

**Q 4.1.7** — Partial
Vendor assessment requirements exist in the Information Security Policy and Risk Register. No standalone Third-Party Risk Management Program document.

**Q 4.1.8** — Yes
Sub-processors with access to client data: Supabase (database hosting), Vercel (application hosting), Stripe (payment processing). These are managed service providers, not contractors with direct data access.

**Q 4.1.9** — Partial
All sub-processors are SOC 2 Type II or PCI DSS certified. The organization relies on providers' standard DPAs and compliance programs rather than individually negotiated agreements extending to fourth parties.

**Q 4.1.10** — Yes
The founder serves as the data protection role, handling all data subject requests, privacy impact assessments, and regulatory communications.

**Q 4.1.11** — Yes
Privacy inquiries submitted to security@cookie-banner.ca. DSAR process: acknowledgment within 3 business days, completion within 30 calendar days, with identity verification. Privacy policy publicly available on the website.

---

## Section 4.2 — Access Control

**Q 4.2.1** — Yes
The Information Security Policy (Section 5) documents access control principles (least privilege, no shared accounts, MFA required), authentication standards, and access review requirements.

**Q 4.2.2** — Yes
Access rights reviewed quarterly. Unused accounts and stale API keys are revoked.

**Q 4.2.3** — Yes
Unique IDs required for all authentication. NextAuth.js assigns unique user IDs. The founder uses unique personal accounts for each cloud service. No shared or generic accounts.

**Q 4.2.4** — Yes
Least privilege enforced. API keys scoped to minimum permissions. Supabase Row Level Security policies enforce data isolation between customers at the database level.

**Q 4.2.5** — Partial
Privileged access limited to the founder's accounts, all with MFA. Reviewed quarterly. No separate monitoring by a different party — solo-founder limitation.

**Q 4.2.6** — No
Solo-founder organization. The founder both requests and approves all access. Compensating controls: MFA on all accounts, quarterly access reviews.

**Q 4.2.7** — Partial
Access changes logged by providers (GitHub audit log, Vercel audit log, Supabase activity log). No centralized access request documentation system.

**Q 4.2.8** — Partial
Third-party identities verified through SOC 2/PCI DSS certifications. Customer identities verified through NextAuth.js. No formal third-party identity trust verification policy document.

**Q 4.2.9** — N/A
Solo-founder, no employees who change roles. Access revocation upon contract end is addressed in the Information Security Policy.

**Q 4.2.10** — Partial
NextAuth.js sessions expire after 30 days of inactivity. No automated process to disable inactive customer accounts beyond session expiry. Provider accounts reviewed quarterly.

**Q 4.2.11** — Yes
Authenticators can be revoked: sessions invalidated, API keys rotated, database credentials rotated, OAuth tokens revoked. The Incident Response Plan includes credential revocation as a containment step.

**Q 4.2.12** — Yes
MFA required on all critical accounts: Vercel, Supabase, Stripe, GitHub, DNS provider, and domain registrar. Uses TOTP or hardware key authentication.

**Q 4.2.13** — Yes
Strong authentication required: MFA on all administrative access, secure httpOnly session cookies via NextAuth.js, environment-injected secrets (never hardcoded), scoped API keys with minimum permissions.

---

## Section 5 — Software Development

**Q 5.1.1** — Yes
Cookie Banner Generator develops a SaaS application built with Next.js 14, React, TypeScript, and PostgreSQL. Development follows the Change Management Policy with Git-based version control, PR reviews, automated preview deployments, and OWASP Top 10 awareness.

**Q 5.2.1** — Yes
The Vulnerability Management Policy (effective 2026-03-28) defines detection sources (Dependabot, GitHub Security Advisories, npm audit, OWASP Top 10), CVSS-based severity classification, remediation SLAs (Critical: 24h, High: 7 days, Medium: 30 days), exception handling, and quarterly metrics.

---

## Section 6 — Risk Assessment

**Q 6.1.1** — Yes
The Risk Register uses a qualitative likelihood-times-impact methodology (5x5 matrix), defined rating thresholds, a risk heat map, residual risk assessments for 14 risks, and a formal risk acceptance statement. Reviewed quarterly.

**Q 6.2.1** — Partial
Third-party risk addressed in the Information Security Policy and Risk Register. Vendor certifications reviewed annually. No standalone third-party risk management program document that formally extends to 4th and Nth parties.

---

## Section 7.1 — Business Continuity

**Q 7.1.1** — Yes
Supabase provides automated daily backups with point-in-time recovery (PITR). Source code versioned in GitHub. Backup restoration successfully tested 2026-03-28 (50 tables, 751+ rows verified).

**Q 7.1.2** — Yes
Backup tested 2026-03-28: physical backup restored to new Supabase project, schema integrity verified (50 tables), data integrity confirmed (751+ rows), ACTIVE_HEALTHY status. Next test: March 2027.

**Q 7.1.3** — Partial
Business continuity addressed in the Information Security Policy (Section 10) and Incident Response Plan. No standalone BCP with formal RTOs and RPOs.

**Q 7.1.4** — Yes
The Incident Response Plan documents recovery: deploy clean code to Vercel, restore database from PITR, re-enable services incrementally, verify payment processing, confirm banner delivery. Vercel instant rollback and Supabase PITR enable rapid recovery.

**Q 7.1.5** — Partial
The Incident Response Plan defines roles. As a solo-founder, organizational resilience is limited. Risk Register (R-006) identifies key person risk. Mitigations: documented procedures, password manager with emergency access, fully managed infrastructure.

**Q 7.1.6** — Partial
Scheduled: credential rotation drills quarterly, tabletop walkthroughs annually, PITR testing every 6 months. One backup test completed (2026-03-28). Plan is recent and has not completed a full annual testing cycle.

**Q 7.1.7** — Yes
The Incident Response Plan includes specific actions: containment (credential revocation, deployment rollback, maintenance mode), eradication (root cause removal, patching, credential rotation), and recovery (clean deployment, database restoration, incremental re-enablement).

**Q 7.1.8** — Yes
Vercel Edge Network provides multi-region redundancy and automatic failover. Serverless functions auto-scale. Supabase provides automated backups with PITR. CDN-cached banner scripts serve during short outages. Immutable deployments enable instant rollback.

**Q 7.1.10** — Yes
The Incident Response Plan includes: evidence preservation, credential rotation during containment/eradication, security monitoring during recovery, post-incident security review, and lessons learned fed back into policy.

**Q 7.1.11** — Yes
Supabase automated daily backups with PITR. Source code versioned in GitHub. Vercel maintains immutable deployment snapshots. Successfully tested 2026-03-28.

**Q 7.1.12** — Yes
All data cloud-hosted. Supabase manages database backups (daily with PITR, 30-day rolling retention). GitHub provides source code versioning. Vercel maintains deployment history.

**Q 7.1.13** — Partial
Vercel serverless functions auto-scale on demand. Supabase provides database monitoring. No formal capacity planning procedure — the serverless architecture largely eliminates this concern.

**Q 7.1.14** — Partial
Banner delivery via Vercel Edge Network (global CDN) with caching provides inherent redundancy. Serverless infrastructure auto-scales. No multi-provider failover or formal HA SLA.

---

## Section 7.2 — Incident Management

**Q 7.2.1** — Yes
Incident Response Plan (effective 2026-03-28) defines severity classifications (SEV-1 through SEV-4), response procedures, and notification requirements. Reviewed semi-annually (next: 2026-09-28).

**Q 7.2.2** — Yes
Scope: all production systems, customer data, internal accounts, and third-party integrations including Vercel, Supabase, Stripe, NextAuth.js, DNS, and source repositories. Physical security explicitly out of scope.

**Q 7.2.3** — Yes
Escalation through severity classification with defined response times (Critical: 1h, High: 4h, Medium: 24h, Low: 72h) and escalation contacts including legal counsel and provider support teams.

**Q 7.2.4** — Yes
Breach notification documented for four jurisdictions: GDPR (supervisory authority within 72h), PIPEDA (OPC as soon as feasible), Quebec Law 25 (CAI), UK GDPR/PECR (ICO within 72h). Customer notification procedures included.

**Q 7.2.6** — Yes
Evidence collection and preservation procedures, severity-based impact assessment, and immediate response including credential revocation, system isolation, and deployment rollback.

**Q 7.2.7** — Partial
Monitoring through Vercel logs, Supabase alerts, Stripe webhook notifications, uptime monitoring, GitHub security advisories, and Dependabot. Application SecurityMonitor tracks login attempts and suspicious activity. No formal SIEM or centralized log aggregation.

**Q 7.2.8** — Partial
SecurityMonitor detects suspicious patterns (5+ failed logins, 3+ lockouts per hour). Dependabot alerts for vulnerable dependencies. No dedicated malware detection or EDR tool.

**Q 7.2.9** — Yes
All systems use NTP-synchronized clocks through cloud providers. Incident Response Plan requires UTC timestamps for correlation.

**Q 7.2.10** — Yes
Eradication requires: identifying attack vector, removing malicious code, patching vulnerabilities, rotating credentials, updating dependencies. Recovery requires deploying clean code and restoring from known-good backups.

**Q 7.2.11** — Yes
Post-incident review within 5 business days: timeline, root cause, response effectiveness, action items, and lessons learned. Plan updated based on findings. Annual tabletop exercises scheduled.

**Q 7.2.12** — No
No security breaches or incidents in the past two years. Platform launched early 2026 with no incidents reported or detected.

# IT Architecture & Secure Design Plan

**COOKIE-BANNER.CA**
**Version:** 1.0
**Effective Date:** April 10, 2026
**Next Review Date:** April 10, 2027
**Owner:** Founder / Security Lead

---

## 1. Purpose

This document defines the IT architecture, secure design principles, and application security requirements for COOKIE-BANNER.CA. It serves as the authoritative reference for how the system is structured and how security is embedded at every layer.

## 2. System Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    INTERNET                              │
└──────────────┬──────────────────────┬───────────────────┘
               │                      │
        ┌──────▼──────┐        ┌──────▼──────┐
        │   Vercel    │        │ Cloudflare  │
        │ Edge Network│        │    DNS      │
        │  (CDN/WAF)  │        │   + SSL     │
        └──────┬──────┘        └─────────────┘
               │
        ┌──────▼──────┐
        │   Vercel    │
        │  Serverless │ ◄── Next.js 14 App Router
        │  Functions  │     React 18, TypeScript
        └──┬───┬───┬──┘
           │   │   │
    ┌──────▼┐ ┌▼────▼──┐ ┌──────────┐
    │Supabase│ │NextAuth│ │  Stripe  │
    │  DB    │ │  Auth  │ │ Payments │
    │(RLS)   │ │        │ │          │
    └────────┘ └────────┘ └──────────┘
```

### 2.1 Tier Separation

| Tier | Provider | Function | Network Isolation |
|------|----------|----------|-------------------|
| **Edge / CDN** | Vercel Edge Network | Static assets, DDoS protection, TLS termination | Vercel-managed, globally distributed |
| **Application** | Vercel Serverless | API routes, server components, business logic | Isolated function instances, no persistent state |
| **Authentication** | NextAuth.js + Supabase Auth | Session management, OAuth, user identity | Secure httpOnly cookies, server-side only |
| **Database** | Supabase PostgreSQL | Customer data, consent records, app state | RLS-enforced tenant isolation, API gateway access only |
| **Payment** | Stripe | Billing, subscriptions, checkout | PCI DSS Level 1 isolated environment, webhook-only integration |
| **Source Control** | GitHub | Code, CI/CD, security scanning | Private repo, branch protection, MFA |

### 2.2 Data Flow

```
User Browser
  │
  ├─► cookie-banner.ca (Vercel Edge) ──► Serverless Function ──► Supabase (RLS)
  │                                                           ──► Stripe (webhooks)
  │
  └─► Banner Widget (CDN-cached JS) ──► /api/consent ──► Supabase (consent record)
```

All data flows are encrypted with TLS 1.2+ end-to-end.

## 3. Secure Design Principles

### 3.1 Defense in Depth

Security is layered — no single control is relied upon:

| Layer | Control |
|-------|---------|
| Network | TLS 1.2+, HSTS, Vercel DDoS protection |
| Application | Input validation (Zod), CSRF protection, secure headers |
| Authentication | MFA on admin, httpOnly session cookies, NextAuth.js |
| Authorization | Supabase Row Level Security, least-privilege API keys |
| Data | AES-256 at rest, TLS in transit, data classification |
| Operations | Dependabot, npm audit, CI/CD pipeline checks |

### 3.2 Least Privilege

- Database connections use scoped API keys (anon key for client, service role for server).
- Supabase RLS policies enforce that users can only access their own data.
- Vercel environment variables are scoped per environment (production, preview, development).
- Stripe API keys are restricted to required permissions only.

### 3.3 Fail Secure

- Authentication failures default to deny (no access granted).
- RLS policies default to deny — if no policy matches, the row is not returned.
- API routes return 401/403 on authentication or authorization failure, never exposing data.
- Vercel serverless functions have no persistent filesystem — secrets cannot leak via file access.

### 3.4 Separation of Concerns

- Client-side code never has access to database credentials or service role keys.
- Payment processing is fully delegated to Stripe — no card data touches COOKIE-BANNER.CA systems.
- Authentication state is managed server-side only (NextAuth.js with httpOnly cookies).
- Banner widget operates independently from the dashboard application.

### 3.5 Immutable Deployments

- Every deployment is a complete, immutable snapshot.
- Rollback is instantaneous via Vercel's deployment history.
- No SSH access, no server mutation, no manual production changes.

## 4. Authentication Architecture

```
┌──────────┐     ┌───────────┐     ┌──────────┐
│  Browser │────►│ NextAuth  │────►│ Supabase │
│          │◄────│   (JWT)   │◄────│   Auth   │
└──────────┘     └───────────┘     └──────────┘
     │
     │  httpOnly cookie
     │  (session token)
     ▼
┌──────────────┐
│ Server-side  │
│ route checks │
│ session.user │
└──────────────┘
```

- Sessions are server-side with httpOnly, Secure, SameSite=Lax cookies.
- No tokens stored in localStorage or sessionStorage.
- Session expiry: 30 days of inactivity.
- CSRF protection via SameSite cookie attribute and origin checking.

## 5. Tenant Isolation Model

### 5.1 Row Level Security (RLS)

Every table containing customer data has RLS enabled with policies that restrict access to the authenticated user's own data:

```sql
-- Example RLS policy pattern
ALTER TABLE consent_records ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only access their own records"
  ON consent_records
  FOR ALL
  USING (user_id = auth.uid());
```

### 5.2 API Key Scoping

| Key | Scope | Used By |
|-----|-------|---------|
| Supabase anon key | Client-side, RLS-enforced | Browser (public, safe to expose) |
| Supabase service role key | Server-side only, bypasses RLS | API routes (never exposed to client) |
| Stripe publishable key | Client-side, read-only | Checkout (public) |
| Stripe secret key | Server-side only, full access | Webhooks, API routes (never exposed) |

## 6. Security Headers

The application enforces the following HTTP security headers:

| Header | Value | Purpose |
|--------|-------|---------|
| Strict-Transport-Security | max-age=31536000; includeSubDomains | Force HTTPS |
| X-Content-Type-Options | nosniff | Prevent MIME sniffing |
| X-Frame-Options | DENY | Prevent clickjacking |
| Referrer-Policy | strict-origin-when-cross-origin | Control referrer leakage |
| Content-Security-Policy | Configured per route | Prevent XSS, injection |

## 7. Dependency Security

- All dependencies managed via npm with `package-lock.json` for deterministic builds.
- GitHub Dependabot monitors for known vulnerabilities in dependencies.
- `npm audit` runs on every build via CI/CD pipeline.
- Critical/High CVEs are patched within 24 hours / 7 days per the Vulnerability Management Policy.
- Dependencies are reviewed monthly for currency and necessity.

## 8. Environment Separation

| Environment | Purpose | Data | Access |
|-------------|---------|------|--------|
| **Production** | Live customer-facing application | Real customer data | Vercel production deployment |
| **Preview** | PR review and testing | Synthetic/test data only | Vercel preview deployments (per-PR) |
| **Development** | Local development | Synthetic/test data only | Developer machine |

- Scoped data is never copied to preview or development environments.
- Each environment has its own set of environment variables and API keys.
- Preview deployments are ephemeral and automatically cleaned up.

## 9. Review

This document is reviewed annually or upon any significant architectural change, such as adding a new infrastructure provider, changing the authentication model, or modifying the data storage architecture.

---

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-04-10 | Founder | Initial architecture and secure design plan |

# Asset Inventory

**COOKIE-BANNER.CA**
**Version:** 1.0
**Effective Date:** April 10, 2026
**Review Cycle:** Quarterly
**Owner:** Founder / Security Lead

---

## 1. Purpose

This document serves as the configuration management and asset inventory for COOKIE-BANNER.CA. All systems, services, and devices that store, process, or transmit organizational or customer data are catalogued here.

## 2. Cloud Infrastructure Assets

| Asset | Provider | Function | Region | Security Certification | Access Method | MFA |
|-------|----------|----------|--------|----------------------|---------------|-----|
| Production Database | Supabase | PostgreSQL with RLS | us-east-2 (AWS Ohio) | SOC 2 Type II | Dashboard + direct connection | Yes |
| Application Hosting | Vercel | Next.js serverless deployment | US (AWS-backed) | SOC 2 Type II | Dashboard + CLI | Yes |
| Payment Processing | Stripe | Subscriptions, checkout, webhooks | US | PCI DSS Level 1 | Dashboard + API | Yes |
| Source Code Repository | GitHub | Private repo, CI/CD, Dependabot | US | SOC 2 Type II | Dashboard + CLI | Yes |
| DNS & CDN | Cloudflare | DNS management, SSL, DDoS protection | Global | SOC 2 Type II, ISO 27001 | Dashboard | Yes |
| Domain Registration | Registrar | cookie-banner.ca domain | N/A | N/A | Dashboard | Yes |

## 3. Application Assets

| Asset | Technology | Version | Data Classification | Notes |
|-------|-----------|---------|-------------------|-------|
| Web Application | Next.js 14 / React 18 / TypeScript | See package.json | Restricted (processes customer data) | Deployed on Vercel |
| Database Schema | PostgreSQL via Prisma ORM | See prisma/schema.prisma | Restricted | Managed by Supabase |
| Cookie Banner Widget | JavaScript | Served via CDN | Public | Client-side script |
| API Routes | Next.js Route Handlers | See /app/api/ | Restricted | Serverless functions |

## 4. Data Stores

| Store | Location | Data Classification | Encryption at Rest | Encryption in Transit | Backup |
|-------|----------|-------------------|-------------------|---------------------|--------|
| Customer accounts | Supabase PostgreSQL | Restricted | AES-256 | TLS 1.2+ | Daily PITR |
| Consent records | Supabase PostgreSQL | Restricted | AES-256 | TLS 1.2+ | Daily PITR |
| Billing metadata | Stripe | Restricted | Stripe-managed | TLS 1.2+ | Stripe-managed |
| Application logs | Vercel | Internal | Vercel-managed | TLS 1.2+ | 30-day retention |
| Source code | GitHub | Internal | GitHub-managed | TLS 1.2+ | Git history |
| Environment variables | Vercel | Confidential | Vercel-managed | TLS 1.2+ | Vercel-managed |

## 5. Endpoint Devices

| Device | Type | Owner | OS | Disk Encryption | Screen Lock | Remote Wipe | Notes |
|--------|------|-------|-----|----------------|-------------|-------------|-------|
| Founder's MacBook | Laptop | Founder | macOS | FileVault (AES-256) | 2 min timeout | Find My Mac | Primary work device |
| Founder's iPhone | Mobile | Founder | iOS | Hardware encryption | Face ID | Find My iPhone | MFA authenticator, email access |

## 6. Secrets & Credentials Inventory

| Secret | Stored In | Last Rotated | Rotation Schedule | Scope |
|--------|-----------|-------------|-------------------|-------|
| Supabase service role key | Vercel env vars | — | Annually or on compromise | Database admin |
| Supabase anon key | Vercel env vars | — | Annually or on compromise | Client-side (public, RLS-protected) |
| Stripe secret key | Vercel env vars | — | Annually or on compromise | Payment processing |
| Stripe webhook signing secret | Vercel env vars | — | Annually or on compromise | Webhook verification |
| NextAuth secret | Vercel env vars | — | Annually or on compromise | Session signing |
| GitHub personal access token | GitHub settings | — | Annually or on compromise | CI/CD |

## 7. Review Log

| Date | Reviewer | Changes | Notes |
|------|----------|---------|-------|
| 2026-04-10 | Founder | Initial inventory | All assets catalogued |

---

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-04-10 | Founder | Initial asset inventory |

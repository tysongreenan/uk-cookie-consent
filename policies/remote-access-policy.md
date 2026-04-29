# Remote Access & Wireless Security Policy

**COOKIE-BANNER.CA**
**Version:** 1.0
**Effective Date:** April 10, 2026
**Next Review Date:** April 10, 2027
**Owner:** Founder / Security Lead

---

## 1. Purpose

This policy defines the security requirements for remote access to COOKIE-BANNER.CA systems and for wireless network use. As a fully remote organization, all access to production systems is remote — making this policy foundational to the security program.

## 2. Scope

This policy applies to the founder and any future contractors, employees, or third parties who access COOKIE-BANNER.CA systems, regardless of location or network.

## 3. Remote Access Requirements

### 3.1 Authentication

- All remote access to production systems requires multi-factor authentication (MFA).
- MFA must use TOTP (time-based one-time password) or a hardware security key.
- SMS-based MFA is not permitted for administrative accounts.
- Session tokens are short-lived and use secure, httpOnly cookies.

### 3.2 Authorized Access Methods

| System | Authorized Access Method | MFA Required |
|--------|------------------------|--------------|
| Supabase (database) | Dashboard (browser) or direct connection (psql with SSL) | Yes |
| Vercel (hosting) | Dashboard (browser) or CLI (`vercel` command) | Yes |
| Stripe (payments) | Dashboard (browser) | Yes |
| GitHub (source code) | Dashboard (browser) or CLI (`git` with SSH key) | Yes |
| Cloudflare (DNS) | Dashboard (browser) | Yes |

### 3.3 Prohibited Access

- Production systems must never be accessed from shared or public computers (libraries, hotels, internet cafes).
- Credentials must never be entered on a device not controlled by the organization.
- Screen sharing of dashboards containing customer data is prohibited in public settings.

## 4. Wireless Network Security

### 4.1 Home Network Requirements

- Home WiFi must use WPA3 or WPA2 encryption with a strong, unique passphrase (minimum 16 characters).
- Default router admin credentials must be changed immediately upon setup.
- Router firmware must be kept up to date with automatic updates enabled where available.
- Guest network should be separated from the work network where router hardware supports it.
- UPnP should be disabled on the router.

### 4.2 Public WiFi

- Access to production systems over public WiFi (coffee shops, airports, co-working spaces) is strongly discouraged.
- If public WiFi must be used, a VPN must be active before accessing any production system.
- No customer data should be viewed or processed on public WiFi without VPN.

### 4.3 Mobile Hotspot

- Mobile hotspot with password protection is an acceptable alternative to public WiFi.
- Hotspot must use WPA2/WPA3 encryption.

## 5. VPN Requirements

- A reputable VPN service must be available on all work devices.
- VPN must be activated when connecting from any network outside the home network.
- VPN provider must have a no-logs policy and be headquartered in a jurisdiction with strong privacy laws.

## 6. Session Management

- Browser sessions to production dashboards must be closed when not actively in use.
- Automatic session timeout is enforced by all providers (Vercel, Supabase, Stripe, GitHub).
- Passwords must never be saved in browser password managers for production systems — use a dedicated password manager (e.g., 1Password, Bitwarden).

## 7. Review

This policy is reviewed annually or upon any change to remote access infrastructure.

---

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-04-10 | Founder | Initial remote access and wireless policy |

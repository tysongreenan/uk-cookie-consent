# Physical Security & Clean Desk Policy

**COOKIE-BANNER.CA**
**Version:** 1.0
**Effective Date:** April 10, 2026
**Next Review Date:** April 10, 2027
**Owner:** Founder / Security Lead

---

## 1. Purpose

This policy establishes physical security controls for COOKIE-BANNER.CA's remote work environment. As a fully remote, cloud-native organization with no physical office or data center, physical security focuses on protecting endpoint devices and preventing unauthorized visual or physical access to information.

## 2. Scope

This policy applies to all locations where COOKIE-BANNER.CA work is performed, including home offices and any temporary work locations.

## 3. Home Office Security

### 3.1 Workspace Requirements

- Work should be performed in a dedicated space that can be secured when unattended.
- Screens must be positioned so they are not visible from windows, doorways, or shared spaces.
- Work devices must not be left unattended in accessible areas.

### 3.2 Device Physical Security

- Laptops must be stored in a locked room or secured location when not in use.
- Devices must never be left in vehicles, checked luggage, or other unsecured locations.
- When travelling, devices must be kept in carry-on luggage under direct control at all times.

## 4. Clean Desk Policy

### 4.1 Digital Clean Desk

- Close all browser tabs and applications containing customer data when stepping away.
- Lock the screen immediately when leaving the workspace (Cmd+Ctrl+Q on macOS).
- Automatic screen lock must be configured with a maximum timeout of 2 minutes.
- Do not leave production dashboards visible on screen in shared or public spaces.

### 4.2 Physical Clean Desk

- No customer data should be printed. All data is accessed and processed digitally.
- If any notes containing system credentials or sensitive information are written on paper, they must be destroyed (shredded or burned) immediately after use.
- Sticky notes with passwords or access codes are strictly prohibited.

## 5. Device Security Controls

| Control | Requirement | Verification |
|---------|------------|-------------|
| Full-disk encryption | FileVault (macOS) or BitLocker (Windows) enabled | Quarterly access review |
| Screen lock timeout | ≤ 2 minutes | Device settings audit |
| OS auto-updates | Enabled | Device settings audit |
| Firewall | macOS firewall or equivalent enabled | Device settings audit |
| Antivirus/malware | macOS built-in (XProtect/Gatekeeper) at minimum | Device settings audit |
| Find My Device | Enabled for remote locate and wipe | Device settings audit |
| Biometric auth | Face ID / Touch ID enabled where available | Device settings audit |

## 6. Data Center Physical Security

COOKIE-BANNER.CA does not operate or manage any data centers. All data center physical security is the responsibility of infrastructure providers:

| Provider | Data Center Operator | Physical Security Standard |
|----------|---------------------|---------------------------|
| Supabase | AWS (us-east-2) | SOC 2 Type II, ISO 27001 |
| Vercel | AWS (multiple regions) | SOC 2 Type II, ISO 27001 |
| Stripe | AWS / GCP | PCI DSS Level 1, SOC 2 Type II |
| GitHub | Azure / GitHub-managed | SOC 2 Type II |

Provider physical security controls include: biometric access, 24/7 monitoring, security guards, perimeter barriers, environmental controls, and visitor logging — all verified through their annual SOC 2 audits.

## 7. Incident Reporting

Any suspected physical security incident (lost device, theft, unauthorized physical access to workspace) must be treated as a security incident and handled per the Incident Response Plan:

1. Immediately trigger remote wipe on lost/stolen devices.
2. Rotate all credentials accessible from the device.
3. Assess whether customer data may have been exposed.
4. Follow breach notification procedures if applicable.

## 8. Review

This policy is reviewed annually or upon any change to the work environment.

---

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-04-10 | Founder | Initial physical security and clean desk policy |

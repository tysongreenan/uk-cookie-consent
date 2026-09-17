---
title: "Google Tag Manager Cookie Consent: Complete Setup Guide (2026)"
description: "Set up Google Tag Manager cookie consent with Consent Mode v2. Step-by-step — banner script, GTM template, test, publish. About 10 minutes."
date: "2026-03-16"
heroCta:
  primary:
    label: "Start a free banner"
    href: "/free-cookie-banner"
  secondary:
    label: "GTM install page"
    href: "/integrations/google-tag-manager"
author: "cookie-banner-team"
tags: ["Google Tag Manager", "Cookie Consent", "Consent Mode v2", "GTM", "GDPR", "Google Analytics", "Tutorial"]
published: true
canonical: "/blog/google-tag-manager-cookie-consent-guide"
updatedDate: "2026-09-17"
keywords:
  - "google tag manager cookie consent"
  - "gtm cookie consent"
  - "cookie consent gtm tutorial"
  - "google tag manager cookies"
  - "gtm consent mode"
  - "cookie banner google tag manager"
  - "consent mode v2"
  - "google tag manager gdpr"
  - "gtm set cookie"
  - "consent manager google tag manager"
  - "gtm cookies"
  - "consent mode v2 gtm template"
  - "gtm consent mode v2 setup"
  - "cookie banner generator gtm"
  - "google consent mode v2 template"
  - "gtm cookie consent template"
  - "gtm consent default denied"
  - "ads data redaction gtm"
  - "gtm cookie consent setup"
schema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity:
    - "@type": "Question"
      name: "Do I need cookie consent if I use Google Tag Manager?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Yes. Google Tag Manager itself does not set cookies, but the tags it fires (Google Analytics, Google Ads, Facebook Pixel) do. Under GDPR, CCPA, and other privacy laws, you must obtain consent before those tags fire."
    - "@type": "Question"
      name: "What is Google Consent Mode v2?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Google Consent Mode v2 adjusts how Google tags behave based on user consent. It uses four signals: ad_storage, analytics_storage, ad_user_data, and ad_personalization. When consent is denied, Google tags send cookieless pings and use conversion modelling."
    - "@type": "Question"
      name: "Do I need both the banner script and the GTM template?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Yes for a complete GTM setup. The banner shows the UI and saves the choice. The GTM Consent Mode template sets default denied states on Consent Initialization before any tags fire, restores returning-visitor consent from the cookie, and forwards updates to Google tags."
    - "@type": "Question"
      name: "What is the difference between Basic and Advanced Consent Mode?"
      acceptedAnswer:
        "@type": "Answer"
        text: "In Basic mode, Google tags do not fire until consent is granted. In Advanced mode, tags send cookieless pings when consent is denied so Google can model conversions. Advanced mode is recommended for most sites."
    - "@type": "Question"
      name: "Do I need Consent Mode v2 for Google Ads?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Yes. Since March 2024, Google requires Consent Mode v2 signals (ad_user_data and ad_personalization) for remarketing and conversion measurement for users in the EEA and UK."
    - "@type": "Question"
      name: "Can I load the cookie banner through GTM?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Yes, as a Custom HTML tag on Consent Initialization with high priority, if you cannot edit the site head. Still install the Consent Mode template so defaults are set synchronously before other tags. Prefer the head install when you can."
    - "@type": "Question"
      name: "Does this work with Google Analytics 4?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Yes. GA4 supports Consent Mode v2 natively. When analytics_storage is denied it sends cookieless pings; when granted it tracks normally with cookies."
---

<div class="direct-answer">
<strong>Direct Answer:</strong> Complete GTM cookie consent needs two pieces: (1) the Cookie Banner Generator script on your site, and (2) the Consent Mode v2 tag in GTM on <em>Consent Initialization — All Pages</em> with defaults set to denied. The banner collects the choice; the GTM tag tells Google tags what to do before they fire.

[Start a free banner →](/free-cookie-banner)
</div>

<div class="article-cta">
<span class="article-cta-note">About 10 minutes. Free banner + GTM template.</span>
<a class="article-cta-primary" href="/free-cookie-banner">Start a free banner</a>
<a class="article-cta-secondary" href="/integrations/google-tag-manager">GTM install page</a>
</div>

---

## Table of Contents

- [What you need](#what-you-need)
- [Step-by-step setup](#step-by-step-setup)
- [Non-Google tags (Meta, LinkedIn, TikTok)](#non-google-tags-meta-linkedin-tiktok)
- [Test in GTM Preview](#test-in-gtm-preview)
- [Common mistakes](#common-mistakes)
- [Background: why this matters](#background-why-this-matters)
- [FAQ](#frequently-asked-questions)

---

## What you need

| Piece | Role |
|---|---|
| **Banner script** | Shows the banner, saves `cookie_consent`, fires `gtag('consent', 'update')` + `cookie_consent_update` |
| **GTM Consent Mode tag** | Sets default **denied** on Consent Initialization, restores returning visitors, forwards updates to Google tags |

You need **both**. Banner alone is too late if GTM tags race it. Template alone has no UI.

[Create a free banner](/free-cookie-banner) first if you do not have one yet. Copy the install snippet from the dashboard (it looks like the one below).

---

## Step-by-step setup

### Step 1 — Add the banner to your site `<head>`

Paste this **before** the GTM container snippet. Use your real banner ID from the dashboard:

```html
<script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID" async></script>
```

**Do not** put this only as a normal “All Pages” Custom HTML tag. That fires too late. If you cannot edit the site head, see [Option: load banner via GTM](#option-load-banner-via-gtm) below.

Subdomains share one consent cookie by default. Optional pin (rare):

```html
<script>window.CookieBannerOptions = { domain: 'example.com' };</script>
<script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID" async></script>
```

### Step 2 — Install the Consent Mode v2 template in GTM

1. GTM → **Templates** → Tag Templates → **Search Gallery**
2. Search **Cookie Banner Generator**
3. Add **Cookie Banner Generator — Consent Mode v2** to the workspace
4. **Tags** → **New** → name it `Cookie Banner Generator — Consent Mode`
5. Tag Configuration → pick that template

### Step 3 — Defaults: all Denied

In **Default Consent Settings**:

1. Leave **Region** blank (global default)
2. Set Ad Storage, Analytics Storage, Ad User Data, Ad Personalization → **Denied**

Optional region rows (ISO codes, comma-separated), e.g. stricter for `GB,DE,FR,...` / `US-CA`. One global Denied row is enough for most sites.

### Step 4 — Advanced settings

| Setting | Value |
|---|---|
| Wait for Update | `500` (raise to 700–1000 only if the site is slow) |
| Consent Cookie Name | `cookie_consent` (unless you changed it) |
| Ads Data Redaction | **On** |
| URL Passthrough | **On** if you run Google Ads |

### Step 5 — Trigger: Consent Initialization — All Pages

1. **Triggering** → **Consent Initialization — All Pages**
2. Save

Not “All Pages.” Consent Initialization runs **before** GA4 / Ads tags. Wrong trigger = unconsented firing.

### Step 6 — Publish

**Submit** → version name e.g. `Consent Mode v2` → **Publish**.

---

### Option: load banner via GTM

Only if you cannot edit HTML. Still keep the Consent Mode template from Steps 2–5.

1. **Tags** → **New** → Custom HTML
2. Paste the banner `<script src="…banner.js?id=…">` snippet
3. Trigger: **Consent Initialization — All Pages**
4. Tag firing priority: **9999** (Consent Mode template should still fire; use a lower priority on the banner tag if both share the trigger, e.g. template `100`, banner `50`)
5. Preview → Publish

Head install (Step 1) is still the more reliable path.

---

## Non-Google tags (Meta, LinkedIn, TikTok)

Google tags (GA4, Google Ads) read Consent Mode automatically — no custom trigger required. Prefer GTM **Consent Settings** on those tags (`analytics_storage` / `ad_storage` as needed).

For Meta, LinkedIn, TikTok, Hotjar, etc.:

1. Create a **Custom Event** trigger: event name `cookie_consent_update`
2. Add Data Layer Variables: `consent_analytics`, `consent_marketing` (booleans)
3. Fire marketing pixels when `consent_marketing` equals `true`; analytics tools when `consent_analytics` equals `true`

The banner also pushes Consent Mode strings (`analytics_storage`, `ad_storage`, …) on the same event for debugging.

---

## Test in GTM Preview

1. GTM → **Preview** → open your site
2. **Consent** tab on Consent Initialization: all four types **denied**
3. Confirm the Consent Mode tag fired
4. **Accept All** on the banner → consent flips to **granted** → GA4 / Ads fire
5. Clear cookies → **Reject All** → stays **denied**; no marketing cookies in DevTools
6. Return visit after Accept: consent restores within `wait_for_update` without showing the banner again

Console check:

```js
dataLayer.filter(e => e && e.event === 'cookie_consent_update')
```

---

## Common mistakes

1. **Wrong trigger** — Use Consent Initialization, not All Pages.
2. **Banner only as All Pages Custom HTML** — Defaults never set in time.
3. **No default Denied row** — GTM treats unset consent as granted.
4. **`wait_for_update` at 0** — Returning visitors look like new denials every load.
5. **Non-Google tags with no consent gate** — Consent Mode does not block Meta/LinkedIn by itself.
6. **Wrong script URL** — Use `https://www.cookie-banner.ca/api/v1/banner.js?id=…` from the dashboard (not a stale CDN path).

---

## Background: why this matters

Skip this if you only needed the setup. Useful context for audits and Ads accounts.

### Why GTM needs consent

GTM is a container. GA4, Google Ads, Meta, LinkedIn inside it set tracking cookies. Under [GDPR cookie rules](/blog/gdpr-cookie-consent-requirements) (and similar laws), those tags must wait for permission.

### Consent Mode v2 signals

| Signal | Controls |
|---|---|
| `ad_storage` | Ads / remarketing cookies |
| `analytics_storage` | Analytics cookies (GA4) |
| `ad_user_data` | Sending user data for ads (required since Mar 2024) |
| `ad_personalization` | Personalized ads (required since Mar 2024) |

Denied → cookieless pings + modelling. Granted → normal cookies.

### Basic vs Advanced

- **Basic:** tags do not fire until consent — simplest, lose all non-consent data.
- **Advanced:** cookieless pings when denied — better modelled coverage; still no cookies without consent. Our template is built for Advanced.

### Google Ads / GA4

Without v2 signals in the EEA/UK you lose remarketing lists, modelled conversions, and audience features. GA4 uses behavioural modelling when `analytics_storage` is denied.

### How our pieces talk

1. Consent Initialization → template sets Denied (+ `wait_for_update`)
2. Template reads `cookie_consent` for returning visitors and updates immediately
3. Banner loads → UI for new visitors
4. User chooses → banner updates `gtag`, pushes `cookie_consent_update`, notifies the GTM template callback
5. Google tags follow Consent Mode; other tags follow your Custom Event triggers

Full install reference: [/integrations/google-tag-manager](/integrations/google-tag-manager).

---

## Frequently Asked Questions

### Do I need cookie consent if I use Google Tag Manager?

**Answer:** Yes. GTM itself is not the tracker — the tags inside it are. Those need consent before they set non-essential cookies.

### What is Google Consent Mode v2?

**Answer:** A Google framework with four consent signals (`ad_storage`, `analytics_storage`, `ad_user_data`, `ad_personalization`) that change how Google tags behave when consent is denied or granted.

### Do I need both the banner script and the GTM template?

**Answer:** Yes for a complete setup. The banner is the UI + storage. The template sets defaults early and keeps Google tags in sync.

### What is the difference between Basic and Advanced Consent Mode?

**Answer:** Basic blocks tags until consent. Advanced sends cookieless pings when denied so Google can model. Prefer Advanced for most sites.

### Do I need Consent Mode v2 for Google Ads?

**Answer:** Yes for EEA/UK remarketing and conversion features since March 2024 (`ad_user_data` and `ad_personalization`).

### Can I load the cookie banner through GTM?

**Answer:** Yes on Consent Initialization with high priority if you cannot edit the head. Still install the Consent Mode template. Prefer the head script when possible.

### Does this work with Google Analytics 4?

**Answer:** Yes. GA4 respects Consent Mode natively. Denied → cookieless pings; granted → full tracking.

### What is ads data redaction?

**Answer:** When enabled and `ad_storage` is denied, Google strips ad-click IDs like `gclid` from requests. Turn it on for stricter privacy.

---

**Ready?** [Create your free banner](/free-cookie-banner), run the steps above, Preview, then Publish. Full reference: [GTM integration](/integrations/google-tag-manager).

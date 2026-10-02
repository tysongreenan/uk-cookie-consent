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
updatedDate: "2026-10-02"
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
        text: "Yes. Import the Consent Mode template, fire it on Consent Initialization with defaults denied and priority 1000, then add the banner as a Custom HTML tag on the same trigger at priority 50. If you can edit the site, put the banner script in the head before GTM instead."
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

- [Do these four steps](#do-these-four-steps)
- [Common mistakes](#common-mistakes)
- [Background](#background-why-this-matters)
- [FAQ](#frequently-asked-questions)

The same steps, with the download button, are on the [GTM install page](/integrations/google-tag-manager#implementation).

---

## Do these four steps

[Create a free banner](/free-cookie-banner) first if you do not have one. [Grab your banner](/dashboard) from the dashboard and copy the snippet there. You need that banner and the template below. The banner is the choice visitors see. The template tells Google tags to wait.

### 1. Import the template

[Download cookie-banner-consent-mode.tpl](/gtm/cookie-banner-consent-mode.tpl).

1. GTM → **Templates** → **Tag Templates** → **New** → the three-dot menu → **Import**. Choose that file.
2. **Tags** → **New**. Name it `Cookie Banner Generator — Consent Mode` and choose the template.
3. Leave **Region** blank. Set Ad Storage, Analytics Storage, Ad User Data, and Ad Personalization to **Denied**.
4. Trigger: **Consent Initialization — All Pages**. Firing priority: **1000**.

Leave Wait for Update at 500 and the cookie name at `cookie_consent`. Turn on Ads Data Redaction. Turn on URL Passthrough if you run Google Ads.

### 2. Add the banner. Pick one.

**You can edit the site.** Paste this in the head, before the GTM snippet. Use your banner ID.

```html
<script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID" async></script>
```

**You only have GTM.** New Custom HTML tag with that same script. Trigger: **Consent Initialization — All Pages**. Firing priority: **50**. The template stays at 1000. Raising this tag’s priority does not hold other tags, because the banner file still loads after the tag starts.

Subdomains share one consent cookie. A domain pin is optional:

```html
<script>window.CookieBannerOptions = { domain: 'example.com' };</script>
```

### 3. Tell each other tag to wait

This is inside Google Tag Manager, on the tags already in the container. Leave the Consent Mode template and the banner tag alone. Those two have to run first.

1. Go to **Tags** and open one tag, such as GA4 or a Meta pixel.
2. Open **Advanced Settings**, then **Consent Settings**.
3. Choose **Require additional consent for tag to fire**.
4. Tick the box for that tag. Save.
5. Repeat for every other tag.

| Tag | Tick |
|---|---|
| GA4 | Analytics storage |
| Google Ads | Ad storage, ad user data, ad personalization |
| Meta, LinkedIn, TikTok, other ad pixels | Ad storage |
| Hotjar and other analytics | Analytics storage |

Some Custom HTML tags have no Consent Settings. On those, change the trigger to the custom event `cookie_consent_update`, and fire only when `consent_marketing` or `consent_analytics` equals true.

### 4. Preview, then publish

1. GTM → **Preview** → open your site.
2. Before a choice, the Consent tab shows all four types **denied**, and marketing tags are blocked.
3. **Accept All**. Those tags fire.
4. **Reject All** on a fresh visit. They stay blocked, including after a refresh.
5. Reload after Accept. They stay granted.
6. **Submit** → name the version → **Publish**.

---

## Common mistakes

1. **Searching the Community Gallery** for this template. Download the file in step 1 and import it.
2. **Wrong trigger.** Use Consent Initialization, not All Pages.
3. **Banner only, on All Pages.** The default is set too late. Import the template.
4. **No Denied row.** GTM treats a missing default as granted.
5. **Priority 9999 on the banner tag.** That starts the tag earlier. It does not wait for the banner file.
6. **Meta or LinkedIn with no consent setting.** Consent Mode does not block those tags by itself.
7. **Wrong script URL.** Use `https://www.cookie-banner.ca/api/v1/banner.js?id=…` from the dashboard.

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
5. Google tags follow Consent Mode. Other tags follow the consent setting from step 3.

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

**Answer:** Yes. Import the template first (priority 1000, defaults denied, Consent Initialization). Add the banner as Custom HTML on that same trigger at priority 50. If you can edit the site, put the banner script in the head before GTM instead.

### Does this work with Google Analytics 4?

**Answer:** Yes. GA4 respects Consent Mode natively. Denied → cookieless pings; granted → full tracking.

### What is ads data redaction?

**Answer:** When enabled and `ad_storage` is denied, Google strips ad-click IDs like `gclid` from requests. Turn it on for stricter privacy.

---

**Ready?** [Create your free banner](/free-cookie-banner), run the steps above, Preview, then Publish. Full reference: [GTM integration](/integrations/google-tag-manager).

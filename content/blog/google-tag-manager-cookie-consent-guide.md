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

[Create a free banner](/free-cookie-banner) first if you do not have one. The same clicks, with a download button, are on the [GTM install page](/integrations/google-tag-manager#implementation).

### 1. Import the template

[Download cookie-banner-consent-mode.tpl](/gtm/cookie-banner-consent-mode.tpl).

1. In Google Tag Manager, click **Templates** in the left menu.
2. In the **Tag Templates** box, click **New**.
3. Click the three dots at the top right, then **Import**. Choose `cookie-banner-consent-mode.tpl`. Click **Save**.
4. Click **Tags**, then **New**.
5. Name the tag `Cookie Banner Generator — Consent Mode`.
6. Click **Tag Configuration** and choose **Cookie Banner Generator — Consent Mode v2**.
7. In **Default Consent Settings**, leave **Region** empty. Set Ad Storage, Analytics Storage, Ad User Data, and Ad Personalization to **Denied**. If the table is empty, click **Add Region Override** and do the same.
8. Click **Triggering** and choose **Consent Initialization - All Pages**.
9. Below the trigger, open **Advanced Settings**, then **Tag firing priority**, and type `1000`.
10. Click **Save**.

Leave the template’s own Advanced Settings closed. Wait for Update stays at 500, and the cookie name stays `cookie_consent`.

### 2. Add the banner

[Grab your banner](/dashboard) and click **Copy snippet** on the banner.

**If GTM is how you install things:**

1. In GTM, click **Tags**, then **New**.
2. Name the tag `Cookie Banner`.
3. Click **Tag Configuration**, choose **Custom HTML**, and paste the snippet.
4. Click **Triggering** and choose **Consent Initialization - All Pages**.
5. Open **Advanced Settings**, then **Tag firing priority**, and type `50`.
6. Click **Save**.

**If you can edit the site HTML:** paste that same snippet in the head, above the Google Tag Manager snippet. You still need the template from step 1.

### 3. Tell each other tag to wait

Skip **Cookie Banner Generator — Consent Mode** and **Cookie Banner**. Do the rest.

1. Click **Tags**, then click a tag name, such as GA4 or a Meta pixel.
2. Scroll down and open **Advanced Settings**.
3. Open **Consent Settings**.
4. Select **Require additional consent for tag to fire**.
5. Check the boxes below for that kind of tag.
6. Click **Save**.
7. Repeat until every other tag is saved.

| Tag | Check |
|---|---|
| GA4 | Analytics Storage |
| Google Ads | Ad Storage, Ad User Data, Ad Personalization |
| Meta, LinkedIn, TikTok, other ad pixels | Ad Storage |
| Hotjar and other analytics | Analytics Storage |

If Consent Settings is missing, the tag is usually Custom HTML. Open **Triggering**, remove All Pages, and add a Custom Event trigger named `cookie_consent_update`. Fire it when `consent_marketing` equals true for an ad pixel, or `consent_analytics` equals true for an analytics tool.

### 4. Preview, then publish

1. Click **Preview** at the top right. Enter your site address and click **Connect**.
2. Leave the banner sitting there. In Tag Assistant, open the **Consent** tab. Ad Storage, Analytics Storage, Ad User Data, and Ad Personalization should say **Denied**.
3. Click a GA4 or ads tag. It should say it has not fired, or that consent blocked it. Refresh. It should still be blocked.
4. On the banner, click **Accept All**. Those tags should say **Fired**.
5. Refresh. The tags should fire again, and the banner should stay hidden.
6. In GTM, click **Submit**, name the version, and click **Publish**.

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

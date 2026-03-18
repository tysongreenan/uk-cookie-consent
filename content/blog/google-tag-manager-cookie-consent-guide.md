---
title: "Google Tag Manager Cookie Consent: Complete Setup Guide (2026)"
description: "Learn how to set up cookie consent with Google Tag Manager. Step-by-step GTM tutorial covering Consent Mode v2, GDPR compliance, and tag configuration."
date: "2026-03-16"
author: "cookie-banner-team"
tags: ["Google Tag Manager", "Cookie Consent", "Consent Mode v2", "GTM", "GDPR", "Google Analytics", "Tutorial"]
published: true
canonical: "/blog/google-tag-manager-cookie-consent-guide"
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
schema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity:
    - "@type": "Question"
      name: "Do I need cookie consent if I use Google Tag Manager?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Yes. Google Tag Manager itself does not set cookies, but the tags it fires (Google Analytics, Google Ads, Facebook Pixel) do set cookies that track personal data. Under GDPR, CCPA, and other privacy laws, you must obtain user consent before these tags fire and set tracking cookies."
    - "@type": "Question"
      name: "What is Google Consent Mode v2?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Google Consent Mode v2 is a framework that adjusts how Google tags behave based on user consent. It includes four consent signals: ad_storage, analytics_storage, ad_user_data, and ad_personalization. When consent is denied, Google tags send cookieless pings instead of setting cookies, and Google uses conversion modelling to fill data gaps."
    - "@type": "Question"
      name: "What happens to Google Analytics data when consent is denied?"
      acceptedAnswer:
        "@type": "Answer"
        text: "When analytics_storage consent is denied, Google Analytics 4 sends cookieless pings instead of setting cookies. Google then uses behavioural modelling to estimate metrics like session counts, conversion rates, and user counts. You retain approximately 70-80% of your data accuracy through this modelling, compared to losing 100% of data without Consent Mode."
    - "@type": "Question"
      name: "Can I set up cookie consent in GTM without code?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Partially. You can install a Consent Mode template in GTM without writing code, but you still need a cookie consent banner on your website to display the consent UI to users. Cookie Banner Generator provides a no-code banner builder that integrates directly with its GTM template for a complete solution."
    - "@type": "Question"
      name: "What is the difference between Basic and Advanced Consent Mode?"
      acceptedAnswer:
        "@type": "Answer"
        text: "In Basic Consent Mode, Google tags do not fire at all until consent is granted — no data is collected. In Advanced Consent Mode, tags send cookieless pings even when consent is denied, allowing Google to use conversion modelling. Advanced mode provides better data coverage while still respecting user privacy choices."
    - "@type": "Question"
      name: "Do I need Consent Mode v2 for Google Ads?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Yes. Since March 2024, Google requires Consent Mode v2 signals (specifically ad_user_data and ad_personalization) for remarketing, audience building, and conversion measurement for users in the EEA and UK. Without these signals, your Google Ads campaigns lose access to remarketing lists and modelled conversions for European users."
---

# Google Tag Manager Cookie Consent: How to Set It Up the Right Way

<div class="direct-answer">
<strong>Direct Answer:</strong> To set up cookie consent with Google Tag Manager, you need two things: a cookie consent banner on your website and a Consent Mode v2 template in GTM. The banner collects user consent. The GTM template sets default consent states (denied for GDPR regions), waits for the banner to load, and forwards consent signals to all Google tags. This ensures tags like Google Analytics and Google Ads only fire after users grant permission, keeping you compliant with GDPR, CCPA, and other privacy laws.

[Set up GTM cookie consent in 5 minutes →](https://cookie-banner.ca/signup)
</div>

---

## Table of Contents

- [Why Google Tag Manager Needs Cookie Consent](#why-google-tag-manager-needs-cookie-consent)
- [What Is Google Consent Mode v2?](#what-is-google-consent-mode-v2)
- [Basic vs Advanced Consent Mode](#basic-vs-advanced-consent-mode)
- [How to Set Up Cookie Consent in Google Tag Manager (Step by Step)](#how-to-set-up-cookie-consent-in-google-tag-manager-step-by-step)
- [How Cookie Banner Generator Integrates with GTM](#how-cookie-banner-generator-integrates-with-gtm)
- [Before and After Consent: What Happens to Your Tags](#before-and-after-consent-what-happens-to-your-tags)
- [Consent Mode v2 Requirements for Google Ads and Analytics](#consent-mode-v2-requirements-for-google-ads-and-analytics)
- [Common GTM Consent Mistakes to Avoid](#common-gtm-consent-mistakes-to-avoid)
- [Testing Your GTM Cookie Consent Setup](#testing-your-gtm-cookie-consent-setup)
- [Frequently Asked Questions](#frequently-asked-questions)

---

## Why Google Tag Manager Needs Cookie Consent

Google Tag Manager is a container that fires tracking tags on your website. On its own, GTM does not set cookies. But the tags inside it -- Google Analytics 4, Google Ads conversion tracking, Facebook Pixel, LinkedIn Insight Tag -- all set cookies that collect personal data like IP addresses, browsing behaviour, and device identifiers.

Under [GDPR cookie consent requirements](/blog/gdpr-cookie-consent-requirements), you must obtain explicit user consent before setting non-essential cookies. This means your GTM tags cannot fire freely. They need to wait for permission.

**The problem:** Without a consent framework, GTM fires all tags immediately on page load. Every visitor gets tracking cookies before they have a chance to say yes or no. This violates privacy regulations in the EU, UK, Canada, California, and an expanding list of jurisdictions.

**The solution:** Google Consent Mode v2 -- a framework built into GTM that controls tag behaviour based on user consent signals. Combined with a cookie consent banner, it gives you a compliant setup that respects user choices while preserving your analytics data.

Here is what a compliant GTM cookie consent setup requires:

1. **A cookie consent banner** that displays on your website and collects user preferences
2. **A Consent Mode v2 template in GTM** that sets default consent states and listens for consent updates
3. **Proper tag configuration** so Google tags respect consent signals before firing

---

## What Is Google Consent Mode v2?

Google Consent Mode v2 is a consent framework that tells Google tags how to behave based on a user's consent choices. It manages four consent signals:

| Consent Signal | What It Controls | Required Since |
|---|---|---|
| **ad_storage** | Cookies for advertising (Google Ads, remarketing) | Consent Mode v1 (2020) |
| **analytics_storage** | Cookies for analytics (Google Analytics) | Consent Mode v1 (2020) |
| **ad_user_data** | Sending user data to Google for advertising | Consent Mode v2 (March 2024) |
| **ad_personalization** | Using data for personalized advertising | Consent Mode v2 (March 2024) |

The two new signals -- `ad_user_data` and `ad_personalization` -- are what make it "v2." Google added these in March 2024 and now **requires** them for any website running Google Ads remarketing or audience features for users in the European Economic Area (EEA) and UK.

When consent is **denied**, Google tags adjust their behaviour automatically:

- **Google Analytics 4** sends cookieless pings instead of setting cookies, then uses behavioural modelling to estimate your metrics
- **Google Ads** stops collecting conversion data but uses modelled conversions to fill gaps
- **Ad-click identifiers** (like `gclid`) can be stripped from requests when ads data redaction is enabled

When consent is **granted**, tags operate normally with full cookie-based tracking.

This means you do not lose all your data when users decline cookies. Google estimates that Consent Mode recovers approximately 70% of ad-click conversions that would otherwise be lost, depending on your consent rate and traffic patterns.

---

## Basic vs Advanced Consent Mode

Google offers two implementation levels, and the difference matters for your data:

### Basic Consent Mode

Tags **do not fire at all** until consent is granted. No data is sent to Google. No cookieless pings. No modelling.

- Simplest to implement
- Fully privacy-safe
- You lose 100% of data from users who deny consent

### Advanced Consent Mode

Tags send **cookieless pings** even when consent is denied. No cookies are set, but anonymous signals are sent to Google for modelling purposes.

- More data coverage through conversion modelling
- Google uses these pings to estimate metrics for non-consenting users
- Recommended by Google for better analytics accuracy
- Still respects user consent -- no cookies are set without permission

**Which should you choose?** For most websites, Advanced Consent Mode is the better option. It preserves data quality without compromising user privacy. The cookieless pings do not contain personal data and do not set cookies on the user's device. Cookie Banner Generator's [GTM template](/blog/gtm-setup) uses Advanced Consent Mode by default.

---

## How to Set Up Cookie Consent in Google Tag Manager (Step by Step)

This GTM cookie consent tutorial walks you through the complete setup. You will need a Google Tag Manager account and a cookie consent banner. If you do not have a banner yet, [create one free with Cookie Banner Generator](https://cookie-banner.ca/signup).

### Step 1: Install a Consent Mode Template

You need a Consent Mode v2 template in GTM to manage consent signals. Here is how to install Cookie Banner Generator's template:

1. Open your **Google Tag Manager** workspace
2. Click **Templates** in the left sidebar
3. In the **Tag Templates** section, click **Search Gallery**
4. Search for **"Cookie Banner Generator"**
5. Select **Cookie Banner Generator -- Consent Mode v2** and click **Add to workspace**

Now create a tag using this template:

6. Go to **Tags** in the left sidebar
7. Click **New** and name the tag **"Cookie Banner Generator -- Consent Mode"**
8. Click **Tag Configuration** and select the Cookie Banner Generator template

For a detailed walkthrough of the template configuration, see our dedicated [GTM setup guide](/blog/gtm-setup).

### Step 2: Configure Default Consent States

Default consent states determine what happens before a user interacts with your banner. For GDPR compliance, all consent types should default to **denied** for users in regulated regions.

In the template's **Default Consent Settings** table:

1. Leave the **Region** field blank (global default)
2. Set all four consent types to **Denied**

This ensures no tracking cookies are set until the user explicitly grants consent.

**For region-specific defaults**, add override rows:

```
Global default:      All Denied
EEA + UK:            All Denied
US (non-California): All Granted
California:          All Denied
```

Use ISO 3166-2 country codes in the Region field. For example, `GB,DE,FR,IT,ES` for the UK, Germany, France, Italy, and Spain.

### Step 3: Set the Trigger to Consent Initialization

This is the most critical step, and the one most people get wrong.

Your Consent Mode tag must fire on **Consent Initialization -- All Pages**, not the standard "All Pages" trigger.

1. In your tag configuration, click **Triggering**
2. Select **Consent Initialization -- All Pages**
3. Click **Save**

The Consent Initialization trigger fires **before** any other tags. This ensures default consent states are applied before Google Analytics, Google Ads, or any other tag attempts to load. If you use the wrong trigger, tags fire before consent defaults exist, and your tracking runs unconsented.

### Step 4: Configure Advanced Settings

Expand the **Advanced Settings** section in the template:

**Wait for Update (ms):** Set to **500** (default). This tells Google tags to wait 500 milliseconds for the consent banner to load and restore saved preferences. Returning visitors who already consented get their preferences restored within this window, so tags fire correctly without delay.

**Ads Data Redaction:** **Enable** this. When `ad_storage` is denied, Google strips ad-click identifiers like `gclid` from requests, preventing advertising data leaks.

**URL Passthrough:** **Enable** if you run Google Ads. This passes consent information through URL parameters, improving conversion attribution for users who have not consented to ad cookies.

### Step 5: Add the Banner Script to Your Website

The GTM template handles consent signals, but you still need a banner on your website to display the consent UI and collect user choices.

Add the Cookie Banner Generator script directly to your site's `<head>` tag:

```html
<script src="https://cdn.cookie-banner.ca/banner.js?id=YOUR_SITE_ID" async></script>
```

Replace `YOUR_SITE_ID` with your site ID from the [Cookie Banner Generator dashboard](https://cookie-banner.ca/dashboard).

**Important:** Do NOT add the banner script through GTM. The banner must load independently of Tag Manager so it can display before GTM processes consent. Add it to your HTML `<head>`, CMS header injection, or server-side template.

### Step 6: Publish Your GTM Container

1. Click **Submit** in the top right corner of GTM
2. Add a version name like **"Added Consent Mode v2"**
3. Click **Publish**

Your GTM cookie consent setup is now live.

---

## How Cookie Banner Generator Integrates with GTM

Cookie Banner Generator is designed to work seamlessly with Google Tag Manager's consent framework. Here is how the two systems communicate:

### The Consent Flow

1. **GTM loads** and fires the Consent Mode tag on Consent Initialization, setting all consent types to `denied`
2. **The banner script loads** independently in the `<head>` of your page
3. **For returning visitors:** The GTM template reads the saved `cookie_consent` cookie and updates consent states within the `wait_for_update` window. Tags fire with the correct consent.
4. **For new visitors:** The banner displays. When the user makes a choice, the banner saves preferences to a cookie and fires a `consent update` event.
5. **GTM picks up the update** through a registered callback and forwards new consent states to all Google tags in real time.

### What Makes This Integration Different

Unlike manual Consent Mode implementations that require custom JavaScript, Cookie Banner Generator's approach uses a **GTM Community Template** that handles:

- Default consent state configuration (no `gtag()` calls in your code)
- Automatic cookie restoration for returning visitors
- Real-time consent updates via GTM's built-in consent API
- Regional overrides using ISO country codes
- Ads data redaction and URL passthrough settings

You configure everything through GTM's visual interface. No code changes to your website beyond adding the banner script.

Use the [cookie banner builder](/builder) to customize your banner's appearance, categories, and behaviour before connecting it to GTM.

---

## Before and After Consent: What Happens to Your Tags

Understanding what happens to your Google tags at each stage of the consent flow is critical for debugging and compliance audits.

### Before Consent (Default State: Denied)

| Tag | Behaviour | Data Collected |
|---|---|---|
| Google Analytics 4 | Sends cookieless pings (Advanced mode) | Anonymized page view signals for modelling |
| Google Ads Conversion | Does not fire | None |
| Google Ads Remarketing | Does not fire | None |
| Facebook Pixel | Does not fire (if consent-aware) | None |
| Custom HTML Tags | Depends on tag consent settings | Varies |

No cookies are set on the user's device. No personal data is collected. Google uses the cookieless pings to build modelled reports, but these pings do not contain user identifiers.

### After Consent Granted

| Tag | Behaviour | Data Collected |
|---|---|---|
| Google Analytics 4 | Full tracking with cookies | Page views, sessions, events, user data |
| Google Ads Conversion | Fires normally | Conversion data, transaction values |
| Google Ads Remarketing | Fires normally | Audience lists, user segments |
| Facebook Pixel | Fires normally | Page views, custom events |
| Custom HTML Tags | Fires if consent requirements met | Per tag configuration |

All standard cookies are set. Full tracking resumes. The transition from denied to granted happens in real time -- users do not need to reload the page.

### After Consent Denied (User Clicks Reject)

The behaviour is the same as the default denied state. Tags continue to send cookieless pings (in Advanced mode) or do not fire at all (in Basic mode). The user's denial preference is saved in a cookie so the banner does not reappear on subsequent visits.

---

## Consent Mode v2 Requirements for Google Ads and Analytics

Since March 2024, Google enforces specific Consent Mode requirements that affect your advertising and analytics capabilities.

### Google Ads Requirements

Without Consent Mode v2 signals, your Google Ads account loses these features for EEA and UK users:

- **Remarketing lists** -- Cannot build or use audience lists
- **Conversion modelling** -- No modelled conversion data for non-consenting users
- **Similar audiences** -- Cannot generate lookalike audiences
- **Smart Bidding optimization** -- Reduced signal quality for automated bidding

Google has stated that advertisers without Consent Mode v2 may see reduced campaign performance in European markets. The `ad_user_data` and `ad_personalization` signals are now mandatory for these features.

### Google Analytics 4 Requirements

GA4 works with Consent Mode to provide:

- **Behavioural modelling** when `analytics_storage` is denied -- estimates user counts, session counts, and conversion rates
- **Cookieless measurement** through pings that preserve data continuity
- **Blended reporting** that combines observed data (consented users) with modelled data (non-consented users)

Without Consent Mode, GA4 simply does not collect data from users who have not consented, leaving gaps in your reports that cannot be filled.

### CCPA and Other Regulations

Consent Mode is not only for GDPR. If your website has visitors from [California (CCPA)](/compliance/ccpa) or other jurisdictions with cookie consent requirements, the same framework applies. Use regional overrides in GTM to set different defaults per region.

---

## Common GTM Consent Mistakes to Avoid

After helping thousands of websites configure GTM cookie consent, these are the mistakes we see most frequently:

### 1. Using the Wrong Trigger

**Mistake:** Setting the Consent Mode tag trigger to "All Pages" instead of "Consent Initialization -- All Pages."

**Why it breaks things:** The standard "All Pages" trigger fires at the same time as other tags. Your Google Analytics tag might fire before the Consent Mode tag sets defaults, meaning it runs without any consent state -- effectively unconsented tracking.

**Fix:** Always use **Consent Initialization -- All Pages**. This trigger fires before everything else.

### 2. Adding the Banner Script Through GTM

**Mistake:** Loading the cookie consent banner as a Custom HTML tag in GTM.

**Why it breaks things:** GTM tags are subject to consent checks. If your banner loads through GTM, it may be blocked by the very consent framework it is supposed to control, creating a circular dependency. Even if it loads, there is a timing gap where tags fire before the banner can set consent.

**Fix:** Add the banner script directly to your website's `<head>` section, outside of GTM.

### 3. Not Setting Default Consent States

**Mistake:** Installing a cookie banner but not configuring default consent states in GTM.

**Why it breaks things:** Without explicit defaults, GTM treats all consent types as `granted`. Your tags fire immediately with full tracking, and the consent update from the banner only applies retroactively -- after cookies have already been set.

**Fix:** Always configure default consent states in your Consent Mode template. Set everything to `denied` for GDPR-regulated regions.

### 4. Forgetting the wait_for_update Setting

**Mistake:** Setting `wait_for_update` to 0 or removing it entirely.

**Why it breaks things:** Returning visitors who already granted consent have their preferences stored in a cookie. The `wait_for_update` window gives the template time to read that cookie and restore consent before tags fire. Without it, returning visitors get treated as new visitors with denied consent on every page load.

**Fix:** Keep `wait_for_update` at 500ms (the default). Increase to 700-1000ms only if your site loads slowly.

### 5. Not Configuring Consent for Non-Google Tags

**Mistake:** Setting up Consent Mode for Google tags but leaving Facebook Pixel, LinkedIn Insight Tag, or other third-party tags running without consent controls.

**Why it breaks things:** Consent Mode only controls Google tags natively. Third-party tags need their own consent configuration in GTM, or they fire regardless of user consent.

**Fix:** Use GTM's built-in consent settings for each tag. Go to tag settings, click **Advanced Settings** > **Consent Settings**, and set **Require additional consent for tag to fire** to the appropriate consent types (`ad_storage` for advertising tags, `analytics_storage` for analytics tags).

### 6. Blocking Essential Cookies

**Mistake:** Setting all cookie types to denied, including functional and security cookies that your website needs to operate.

**Why it breaks things:** Strictly necessary cookies (session management, authentication, security) are exempt from consent requirements under GDPR. Blocking them breaks login functionality, shopping carts, and CSRF protection.

**Fix:** Only manage non-essential cookies through Consent Mode. Essential cookies should load normally. Use the [free cookie scanner](/tools/cookie-scanner) to identify which cookies on your site are essential vs non-essential.

---

## Testing Your GTM Cookie Consent Setup

Before going live, verify your setup using GTM's Preview Mode.

### How to Test

1. In your GTM workspace, click **Preview**
2. Enter your website URL and click **Start**
3. Your site opens with the Tag Assistant panel connected

### What to Check

**On Consent Initialization:**
- Open the **Consent** tab in Tag Assistant
- Verify all four consent types show their default values (denied for GDPR regions)
- Confirm the Cookie Banner Generator Consent Mode tag fired

**For new visitors (no saved consent):**
- The cookie banner should display on the page
- Click **Accept All** on the banner
- Check the Consent tab -- all consent types should update to `granted`
- Check the Tags tab -- Google Analytics and other tags should now show as fired

**For returning visitors (saved consent):**
- If you previously accepted cookies, consent types should update from `denied` to `granted` within the `wait_for_update` window
- Tags should fire with `granted` consent without showing the banner

**For consent denial:**
- Click **Reject All** on the banner
- Consent types should remain `denied`
- Google Analytics should show cookieless pings (in Advanced mode) or not fire (in Basic mode)
- No tracking cookies should appear in your browser's developer tools

---

## Conclusion

Setting up Google Tag Manager cookie consent correctly requires three components working together: a consent banner on your website, a Consent Mode v2 template in GTM, and proper tag configuration. Get any one of these wrong and you risk either non-compliance with privacy regulations or losing valuable analytics and advertising data.

**Key Takeaways:**

- Google Tag Manager needs Consent Mode v2 to comply with GDPR and other privacy laws
- Default consent states must be set to `denied` for regulated regions before any tags fire
- The Consent Initialization trigger is critical -- do not use "All Pages"
- Advanced Consent Mode preserves approximately 70% of conversion data through modelling
- Your cookie banner must load outside of GTM, not as a GTM tag
- Test with GTM Preview Mode before publishing

**Next Steps:**

1. [Create a free Cookie Banner Generator account](https://cookie-banner.ca/signup)
2. Build your banner using the [cookie banner builder](/builder)
3. Install the GTM Community Template following our [step-by-step GTM setup guide](/blog/gtm-setup)
4. Test in Preview Mode and publish

The entire setup takes under 10 minutes and ensures your GTM tags fire compliantly -- no developer required.

---

## Frequently Asked Questions

### Do I need cookie consent if I use Google Tag Manager?

**Answer:** Yes. Google Tag Manager itself does not set cookies, but the tags it fires (Google Analytics, Google Ads, Facebook Pixel) do set cookies that track personal data. Under GDPR, CCPA, and other privacy laws, you must obtain user consent before these tags fire and set tracking cookies.

### What is Google Consent Mode v2?

**Answer:** Google Consent Mode v2 is a framework that adjusts how Google tags behave based on user consent. It includes four consent signals: `ad_storage`, `analytics_storage`, `ad_user_data`, and `ad_personalization`. When consent is denied, Google tags send cookieless pings instead of setting cookies, and Google uses conversion modelling to fill data gaps.

### What happens to Google Analytics data when consent is denied?

**Answer:** When `analytics_storage` consent is denied, Google Analytics 4 sends cookieless pings instead of setting cookies. Google then uses behavioural modelling to estimate metrics like session counts, conversion rates, and user counts. You retain approximately 70-80% of your data accuracy through modelling, compared to losing 100% of data without Consent Mode.

### Can I set up cookie consent in GTM without code?

**Answer:** Partially. You can install a Consent Mode template in GTM without writing code, but you still need a cookie consent banner on your website to display the consent UI to users. Cookie Banner Generator provides a no-code banner builder that integrates directly with its GTM template for a complete, code-free solution.

### What is the difference between Basic and Advanced Consent Mode?

**Answer:** In Basic Consent Mode, Google tags do not fire at all until consent is granted -- no data is collected. In Advanced Consent Mode, tags send cookieless pings even when consent is denied, allowing Google to use conversion modelling. Advanced mode provides better data coverage while still respecting user privacy choices.

### Do I need Consent Mode v2 for Google Ads?

**Answer:** Yes. Since March 2024, Google requires Consent Mode v2 signals (specifically `ad_user_data` and `ad_personalization`) for remarketing, audience building, and conversion measurement for users in the EEA and UK. Without these signals, your Google Ads campaigns lose access to remarketing lists and modelled conversions for European users.

---

**Ready to set up GTM cookie consent?** [Create your free Cookie Banner Generator account](https://cookie-banner.ca/signup) and have Consent Mode v2 running in under 10 minutes.

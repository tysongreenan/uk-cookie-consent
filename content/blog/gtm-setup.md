---
title: "How to Set Up Cookie Banner Generator with Google Tag Manager (Consent Mode v2)"
description: "Step-by-step guide to installing Cookie Banner Generator's GTM Community Template for Google Consent Mode v2. Configure default consent states, regional overrides, ads data redaction, and URL passthrough in minutes."
date: "2026-03-16"
author: "cookie-banner-team"
tags: ["Google Tag Manager", "Consent Mode v2", "GTM Template", "Cookie Consent", "GDPR", "Setup Guide", "Google Analytics"]
published: true
canonical: "/blog/gtm-setup"
keywords:
  - "cookie banner gtm setup"
  - "consent mode v2 gtm template"
  - "google tag manager cookie consent"
  - "gtm consent mode v2 setup"
  - "cookie banner generator gtm"
  - "google consent mode v2 template"
  - "gtm cookie consent template"
  - "consent mode v2 google tag manager"
  - "how to set up consent mode v2"
  - "gtm consent default denied"
  - "cookie consent google tag manager"
  - "ads data redaction gtm"
schema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity:
    - "@type": "Question"
      name: "Do I need both the banner script and the GTM template?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Yes. The Cookie Banner Generator script handles the user-facing banner, cookie storage, and consent UI. The GTM template handles the Google Consent Mode v2 integration — setting default consent states, restoring saved preferences, and forwarding consent signals to Google tags. You need both installed for full functionality."
    - "@type": "Question"
      name: "What is the difference between Consent Mode v2 and the original Consent Mode?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Consent Mode v2 adds two new consent signals: ad_user_data and ad_personalization. Google now requires these signals for remarketing and audience features in the EEA and UK. The original Consent Mode only supported ad_storage and analytics_storage. Our GTM template supports all four Consent Mode v2 signals."
    - "@type": "Question"
      name: "What should I set as the default consent state?"
      acceptedAnswer:
        "@type": "Answer"
        text: "For GDPR-regulated regions (EEA, UK), set all consent types to 'denied' by default. For regions without strict cookie consent laws, you can set defaults to 'granted'. Use the regional overrides table in the GTM template to configure different defaults per region using ISO 3166-2 country codes."
    - "@type": "Question"
      name: "What does wait_for_update do?"
      acceptedAnswer:
        "@type": "Answer"
        text: "The wait_for_update setting tells Google tags to wait a specified number of milliseconds before firing, giving the consent banner time to load and restore saved consent preferences. The default is 500ms. This prevents tags from firing with default (denied) consent when a returning user has already granted consent on a previous visit."
    - "@type": "Question"
      name: "What is ads data redaction?"
      acceptedAnswer:
        "@type": "Answer"
        text: "When ads data redaction is enabled, Google removes all ad-click identifiers from requests when ad_storage consent is denied. This provides an extra layer of privacy by stripping tracking parameters like gclid from network requests, reducing the data sent to Google when a user has not consented to advertising cookies."
    - "@type": "Question"
      name: "How do I test that Consent Mode v2 is working?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Use GTM Preview Mode (click Preview in the Google Tag Manager workspace). Load your website, then check the Consent tab in the Tag Assistant panel. You should see default consent states fire on Consent Initialization, consent restored from cookies (if applicable), and consent updates when a user interacts with the banner."
---

# How to Set Up Cookie Banner Generator with Google Tag Manager (Consent Mode v2)

<div class="direct-answer">
<strong>Direct Answer:</strong> Install Cookie Banner Generator's free GTM Community Template to integrate your cookie banner with Google Consent Mode v2. The template sets default consent states, restores saved user preferences from cookies, supports regional overrides for GDPR compliance, and forwards real-time consent updates to all your Google tags. Setup takes about 5 minutes.

[Get started with Cookie Banner Generator →](https://cookie-banner.ca/signup)
</div>

---

## Table of Contents

- [Why You Need Consent Mode v2 with Google Tag Manager](#why-you-need-consent-mode-v2-with-google-tag-manager)
- [What You Need Before Starting](#what-you-need-before-starting)
- [Step 1: Install the GTM Community Template](#step-1-install-the-gtm-community-template)
- [Step 2: Configure Default Consent Settings](#step-2-configure-default-consent-settings)
- [Step 3: Set Up Regional Overrides](#step-3-set-up-regional-overrides)
- [Step 4: Configure Advanced Settings](#step-4-configure-advanced-settings)
- [Step 5: Set the Trigger and Publish](#step-5-set-the-trigger-and-publish)
- [Install the Banner Script on Your Website](#install-the-banner-script-on-your-website)
- [How the Consent Flow Works](#how-the-consent-flow-works)
- [Testing in GTM Preview Mode](#testing-in-gtm-preview-mode)
- [Frequently Asked Questions](#frequently-asked-questions)

---

## Why You Need Consent Mode v2 with Google Tag Manager

If you use Google Analytics, Google Ads, or any Google marketing tags through Google Tag Manager, you need Consent Mode v2. Google now **requires** these consent signals for remarketing and audience features in the EEA and UK. Without them, your Google Ads campaigns lose access to conversion modelling, remarketing lists, and audience insights for European users.

Consent Mode v2 adds two signals that were not in the original version:

- **ad_user_data** — Whether user data can be sent to Google for advertising purposes
- **ad_personalization** — Whether personalized advertising is allowed

Combined with the existing **ad_storage** and **analytics_storage** signals, these four consent types give Google the information it needs to respect user choices while still providing you with modelled data.

For a deeper look at why cookie consent still matters even with Chrome blocking third-party cookies, read our guide on [Chrome Tracking Protection and cookie banners](/blog/chrome-tracking-protection-cookie-banners).

---

## What You Need Before Starting

You need two things installed for full Consent Mode v2 integration:

1. **The Cookie Banner Generator script** on your website — This displays the consent banner to users and stores their preferences in a cookie
2. **The Cookie Banner Generator GTM template** in your Tag Manager container — This sets default consent states and forwards consent signals to Google tags

The banner script handles the user-facing experience. The GTM template handles the plumbing between your banner and Google's consent framework. **You need both.**

If you do not have a Cookie Banner Generator account yet, [sign up free at cookie-banner.ca](https://cookie-banner.ca/signup) and create your banner first.

---

## Step 1: Install the GTM Community Template

1. Open your **Google Tag Manager** workspace
2. Click **Templates** in the left sidebar
3. In the **Tag Templates** section, click **Search Gallery**
4. Search for **"Cookie Banner Generator"**
5. Select **Cookie Banner Generator — Consent Mode v2**
6. Click **Add to workspace**
7. Confirm by clicking **Add**

The template is now available in your workspace. Next, you need to create a tag using it.

8. Go to **Tags** in the left sidebar
9. Click **New**
10. Name the tag **"Cookie Banner Generator — Consent Mode"**
11. Click **Tag Configuration** and select **Cookie Banner Generator — Consent Mode v2** from the template list

You should now see the template configuration panel with the default consent settings table and advanced options.

---

## Step 2: Configure Default Consent Settings

The **Default Consent Settings** table controls what consent state Google tags start with before a user interacts with your banner. For GDPR compliance, all consent types should default to **denied** for users in regulated regions.

The template provides four consent types for each row:

| Consent Type | What It Controls |
|---|---|
| **Ad Storage** | Cookies used for advertising (Google Ads, remarketing) |
| **Analytics Storage** | Cookies used for analytics (Google Analytics) |
| **Ad User Data** | Sending user data to Google for ad purposes |
| **Ad Personalization** | Using data for personalized advertising |

To configure a global default where all consent is denied:

1. Leave the **Region** field blank (this makes it the global default)
2. Set all four consent types to **Denied**

This means every visitor, regardless of location, starts with all non-essential cookies blocked until they interact with your banner.

---

## Step 3: Set Up Regional Overrides

The regional overrides table lets you configure different default consent states for different countries or regions. This is useful if you want stricter defaults for GDPR-regulated regions while allowing more permissive defaults for regions without strict cookie consent laws.

Click **Add Region Override** to add a new row. In the **Region** field, enter comma-separated ISO 3166-2 country codes.

**Example configuration for a site with global traffic:**

| Region | Ad Storage | Analytics Storage | Ad User Data | Ad Personalization |
|---|---|---|---|---|
| *(blank — global default)* | Granted | Granted | Granted | Granted |
| `GB,DE,FR,IT,ES,NL,BE,AT,PL,SE,DK,FI,IE,PT,CZ,RO,HU,GR,BG,HR,SK,SI,LT,LV,EE,LU,MT,CY` | Denied | Denied | Denied | Denied |
| `US-CA` | Denied | Denied | Denied | Denied |

In this example:
- **Global default** is granted — visitors from unregulated regions see no consent barrier for Google tags
- **EEA and UK** countries default to denied — GDPR compliance
- **California** defaults to denied — CCPA compliance

For a simpler setup where you want all consent denied everywhere (the safest approach), use a single row with a blank region and all values set to denied.

---

## Step 4: Configure Advanced Settings

Click the **Advanced Settings** section to expand it. Here you will find four options:

### Wait for Update (ms)

**Default: 500**

This tells Google tags to wait up to 500 milliseconds before firing, giving the banner script time to load and restore any saved consent from cookies. If a returning visitor already granted consent on a previous visit, the template reads their saved preferences and updates consent within this window — so tags fire with the correct consent state instead of the default denied state.

If your banner script loads slowly (for example, on a site with many third-party resources), you can increase this to 700 or 1000. Do not set it higher than 1000ms as it will delay your page analytics.

### Consent Cookie Name

**Default: cookie_consent**

This must match the cookie name that Cookie Banner Generator uses to store consent preferences. If you have not changed this in your Cookie Banner Generator dashboard, leave it as the default `cookie_consent`.

### Enable Ads Data Redaction

When enabled, Google strips all ad-click identifiers (like `gclid`) from network requests when `ad_storage` consent is denied. This provides an additional layer of privacy by ensuring no advertising tracking data leaks through URL parameters.

**Recommended:** Enable this for GDPR compliance.

### Enable URL Passthrough

When enabled, consent information is passed through URL parameters when a user navigates between pages. This allows Google to attribute conversions even when cookies are not available, using first-party URL decoration instead.

**Recommended:** Enable this if you run Google Ads campaigns and want better conversion attribution for users who have not consented to ad cookies.

---

## Step 5: Set the Trigger and Publish

This step is critical. The Consent Mode tag must fire on **Consent Initialization — All Pages**, not the standard "All Pages" trigger.

1. In your tag configuration, click **Triggering**
2. Select **Consent Initialization — All Pages**
3. Click **Save**

The Consent Initialization trigger fires before any other tags on the page, which ensures that default consent states are set before Google Analytics, Google Ads, or any other tags attempt to load. If you use the standard "All Pages" trigger, your Google tags may fire before consent defaults are applied.

4. Click **Submit** in the top right corner of GTM
5. Add a version name like **"Added Cookie Banner Generator Consent Mode v2"**
6. Click **Publish**

---

## Install the Banner Script on Your Website

If you have not already added the Cookie Banner Generator script to your website, you need to do this separately. The GTM template handles Consent Mode signals, but the **banner script** is what displays the consent UI to users and saves their choices.

Add this script to your website's `<head>` tag (you will find your personalized script in your [Cookie Banner Generator dashboard](https://cookie-banner.ca/dashboard)):

```html
<script src="https://cdn.cookie-banner.ca/banner.js?id=YOUR_SITE_ID" async></script>
```

Replace `YOUR_SITE_ID` with the site ID from your dashboard.

**Important:** Do NOT add the banner script through GTM. The banner must load independently of Tag Manager so it can display the consent UI before GTM processes consent states. Add it directly to your site's HTML `<head>` section, your CMS header injection, or through a server-side integration.

---

## How the Consent Flow Works

Here is exactly what happens when a visitor loads your page, step by step:

### 1. Consent Initialization (GTM Template)

The GTM template fires on Consent Initialization and sets default consent states. For a visitor in the UK, this means:

```
ad_storage: denied
analytics_storage: denied
ad_user_data: denied
ad_personalization: denied
```

All Google tags see these defaults and wait (up to the `wait_for_update` window) before firing.

### 2. Cookie Restoration (GTM Template)

The template checks for an existing `cookie_consent` cookie. If the visitor has been to your site before and made a consent choice, the template parses their saved preferences and immediately updates the consent state:

```
analytics_storage: granted  (if they accepted analytics)
ad_storage: granted          (if they accepted marketing)
ad_user_data: granted        (if they accepted marketing)
ad_personalization: granted  (if they accepted marketing)
```

This happens within the `wait_for_update` window, so Google tags fire with the correct consent state. Returning visitors who already granted consent do not experience any delay.

### 3. Banner Display (Banner Script)

If the visitor is new (no saved cookie), the Cookie Banner Generator script displays the consent banner. The visitor sees options to accept all, reject all, or customize their preferences by category.

### 4. Consent Update (Banner Script + GTM Template)

When the visitor makes a choice, the banner script saves their preferences to the `cookie_consent` cookie and fires a consent update. The GTM template picks up this update in real time through a registered callback function and forwards the new consent state to all Google tags.

Google Analytics starts tracking. Google Ads starts collecting conversion data. Everything fires according to the user's explicit consent choice.

---

## Testing in GTM Preview Mode

Before publishing to production, verify that everything works using GTM's built-in debugging tools.

1. In your GTM workspace, click **Preview** in the top right
2. Enter your website URL and click **Start**
3. Your site opens in a new tab with the Tag Assistant panel connected

### What to Check in the Consent Tab

Click the **Consent** tab in the Tag Assistant panel. You should see:

**On Consent Initialization:**
- All four consent types appear with their default values
- If you configured regional overrides, the correct region's defaults should apply based on your location

**On page load (returning visitor with saved consent):**
- Consent types update from denied to granted (for the categories the user previously accepted)
- The update happens within the wait_for_update window

**After interacting with the banner (new visitor):**
- Click Accept All on your banner
- Check the Consent tab — all consent types should update to granted
- Click the Tags tab — Google Analytics and other tags should now show as fired

### What to Check in the Tags Tab

- Your **Cookie Banner Generator — Consent Mode** tag should fire on Consent Initialization
- Google Analytics tags should fire only **after** consent is granted for analytics_storage
- Google Ads tags should fire only **after** consent is granted for ad_storage

### Common Testing Issues

- **Tags fire before consent:** Make sure the trigger is set to Consent Initialization, not All Pages
- **Consent not restoring for returning visitors:** Check that the cookie name in the template matches the actual cookie name (default: `cookie_consent`)
- **Regional defaults not applying:** GTM Preview Mode uses your actual location. If you are testing from a non-GDPR region and want to see denied defaults, either add a global denied default or use a VPN

---

**Ready to get started?** [Create your free Cookie Banner Generator account](https://cookie-banner.ca/signup), set up your banner, install the GTM template, and have full Consent Mode v2 compliance in under 10 minutes.

---

## Frequently Asked Questions

### Do I need both the banner script and the GTM template?

**Answer:** Yes. The Cookie Banner Generator script handles the user-facing banner, cookie storage, and consent UI. The GTM template handles the Google Consent Mode v2 integration — setting default consent states, restoring saved preferences, and forwarding consent signals to Google tags. You need both installed for full functionality.

### What is the difference between Consent Mode v2 and the original Consent Mode?

**Answer:** Consent Mode v2 adds two new consent signals: `ad_user_data` and `ad_personalization`. Google now requires these signals for remarketing and audience features in the EEA and UK. The original Consent Mode only supported `ad_storage` and `analytics_storage`. Our GTM template supports all four Consent Mode v2 signals.

### What should I set as the default consent state?

**Answer:** For GDPR-regulated regions (EEA, UK), set all consent types to "denied" by default. For regions without strict cookie consent laws, you can set defaults to "granted." Use the regional overrides table in the GTM template to configure different defaults per region using ISO 3166-2 country codes.

### What does wait_for_update do?

**Answer:** The `wait_for_update` setting tells Google tags to wait a specified number of milliseconds before firing, giving the consent banner time to load and restore saved consent preferences. The default is 500ms. This prevents tags from firing with default (denied) consent when a returning user has already granted consent on a previous visit.

### What is ads data redaction?

**Answer:** When ads data redaction is enabled, Google removes all ad-click identifiers from requests when `ad_storage` consent is denied. This provides an extra layer of privacy by stripping tracking parameters like `gclid` from network requests, reducing the data sent to Google when a user has not consented to advertising cookies.

### How do I test that Consent Mode v2 is working?

**Answer:** Use GTM Preview Mode (click Preview in the Google Tag Manager workspace). Load your website, then check the Consent tab in the Tag Assistant panel. You should see default consent states fire on Consent Initialization, consent restored from cookies (if applicable), and consent updates when a user interacts with the banner.

### Can I use this template without Google Tag Manager?

**Answer:** You do not need the GTM template if you are not using Google Tag Manager. The Cookie Banner Generator script already sends `gtag('consent', 'update', ...)` signals directly. The GTM template is specifically for sites that manage their Google tags through Tag Manager and need default consent states set before any tags fire.

### Does this work with Google Analytics 4?

**Answer:** Yes. Google Analytics 4 fully supports Consent Mode v2. When `analytics_storage` is denied, GA4 sends cookieless pings instead of setting cookies, and uses conversion modelling to fill data gaps. When consent is granted, GA4 operates normally with full cookie-based tracking.

---

**Still have questions?** [Contact our team →](https://cookie-banner.ca/contact) or [sign up free and try it yourself →](https://cookie-banner.ca/signup)

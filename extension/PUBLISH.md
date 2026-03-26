# Chrome Web Store Publishing Guide

## Pre-requisites
- [x] Chrome Web Store Developer account registered (greenantyson@gmail.com)
- [x] $5 registration fee paid
- [x] Trader account selected (EEA declaration)
- [ ] Add contact email in developer dashboard
- [ ] Replace placeholder icons with branded versions (16, 48, 128px PNGs)

## Step 1: Package the Extension

```bash
cd extension && zip -r ../cookie-banner-extension.zip . && cd ..
```

## Step 2: Upload to Chrome Web Store

1. Go to https://chrome.google.com/webstore/devconsole
2. Click **"New Item"**
3. Upload `cookie-banner-extension.zip`

## Step 3: Fill in the Listing

**Name:** Cookie Banner Privacy Manager

**Summary (132 chars max):**
Automatically manage cookie consent banners based on your privacy preferences. Accept, reject, or customize — your rules, every site.

**Description:**
```
Take control of cookie consent banners across the web.

Cookie Banner Privacy Manager connects to your cookie-banner.ca account and automatically handles cookie banners on every website you visit — based on your privacy preferences.

HOW IT WORKS:
1. Set your preferences in the cookie-banner.ca dashboard (accept all, reject all, essential only, or custom per category)
2. Install the extension and connect with your API key
3. Browse the web — banners are handled automatically

FEATURES:
• Auto-detect cookie banners on any website (30+ consent management platforms supported)
• Accept, reject, or customize based on your saved preferences
• Works with OneTrust, Cookiebot, CookieYes, Osano, Klaro, and many more
• Daily stats tracking — see how many banners were handled
• Bilingual support (English / French)
• Privacy-first: your preferences stay in your control

SUPPORTED CONSENT PLATFORMS:
OneTrust, Cookiebot, CookieYes, Osano, Klaro, iubenda, Usercentrics, SourcePoint, and generic cookie banners.

REQUIRES:
A free cookie-banner.ca account. Get your API key at:
https://cookie-banner.ca/dashboard/privacy/settings

PRIVACY:
This extension only communicates with cookie-banner.ca servers. No data is sent to third parties. See our privacy policy: https://cookie-banner.ca/privacy
```

**Category:** Productivity

**Language:** English

## Step 4: Screenshots (required)

Take screenshots at 1280x800 or 640x400:

1. The popup connected view showing stats and preferences
2. A cookie banner being auto-handled on a website (with the toast notification)
3. The dashboard preferences page
4. The extension settings page showing API key management

## Step 5: Privacy Practices

When asked about permissions:

- **Host permissions (all URLs):** "Required to detect and interact with cookie consent banners on any website the user visits"
- **Storage:** "Stores the user's API key and cached preferences locally"
- **activeTab:** "Required to run the content script that detects cookie banners on the current page"

**Single purpose description:** "Automatically manages cookie consent banners based on user privacy preferences"

**Data usage disclosures:**
- Does NOT sell user data
- Collects: website domains visited (for consent logging), user preferences
- Transfers data to: cookie-banner.ca (first party, for consent tracking)

## Step 6: Submit for Review

Click **"Submit for review"** — typically takes 1-3 business days.

## Testing Locally (Before Publishing)

1. Open `chrome://extensions`
2. Enable **Developer mode** (top right toggle)
3. Click **"Load unpacked"**
4. Select the `extension/` folder
5. Click the extension icon → enter your API key from dashboard
6. Visit any site with a cookie banner to test

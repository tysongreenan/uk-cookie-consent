---
title: "Documentation: Get started with Cookie-Banner.ca"
description: "Create a banner, add tracking scripts, paste the install snippet, and verify consent blocking. Typical setup is about five minutes."
---

Cookie-Banner.ca is a no-code cookie consent generator. You design a banner, categorize tracking scripts, then paste one snippet on your site. Non-essential cookies stay blocked until the visitor accepts.

## Step 1 — Create a banner

1. Sign up at https://www.cookie-banner.ca/auth/signup (no credit card).
2. Open the banner builder at https://www.cookie-banner.ca/dashboard/builder or https://www.cookie-banner.ca/builder.
3. Choose position: top, bottom, or floating.
4. Pick a theme or match your brand colors and fonts.
5. Edit the title, message, Accept, Reject, and Preferences labels.

## Step 2 — Add tracking scripts

1. Open the Scripts tab in the builder.
2. Add Google Analytics, Meta Pixel, or other tags.
3. Categorize each script: Strictly Necessary, Functionality, Performance, or Advertising.
4. Non-essential categories load only after consent.

## Step 3 — Install on the website

Copy the generated snippet from the dashboard and paste it before `</body>`. Then load the live site, confirm the banner appears, and check DevTools:

- Before Accept: no analytics or ads cookies.
- After Accept: consented categories set cookies.
- After Reject: those cookies stay blocked or are removed.

Platform-specific install guides:

- [WordPress](https://www.cookie-banner.ca/integrations/wordpress)
- [Shopify](https://www.cookie-banner.ca/integrations/shopify)
- [Webflow](https://www.cookie-banner.ca/integrations/webflow)
- [Google Tag Manager](https://www.cookie-banner.ca/integrations/google-tag-manager)
- [React / Next.js](https://www.cookie-banner.ca/integrations/react)

## Step 4 — Stay compliant

The banner is built for PIPEDA, Quebec Law 25, GDPR, and CCPA:

- Equal-prominence Accept and Reject
- Category-level preferences
- Consent logging
- Google Consent Mode v2

Also publish an accurate [privacy policy](https://www.cookie-banner.ca/tools/privacy-policy) and [cookie policy](https://www.cookie-banner.ca/tools/cookie-policy).

## Related

- [Pricing](https://www.cookie-banner.ca/pricing)
- [Cookie scanner](https://www.cookie-banner.ca/tools/cookie-scanner)
- [How it works](https://www.cookie-banner.ca/features/how-it-works)

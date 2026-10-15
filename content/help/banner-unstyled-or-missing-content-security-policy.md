---
title: "Banner missing or unstyled? Check your Content Security Policy"
description: "If your banner doesn't appear, shows as plain text, or doesn't match your dashboard, your site's Content Security Policy may be blocking it. Here's how to check and what to allow."
category: troubleshooting
section: Display problems
order: 1
updated: 2026-10-15
keywords: "csp, content-security-policy, style-src, script-src, unsafe-inline, not showing, not appearing, broken styling, plain text, looks wrong, staging"
popular: true
---

A **Content Security Policy (CSP)** is a security setting on your website that tells the browser which scripts, styles, and images it may load. CSPs are often added or tightened by a developer, hosting provider, or security plugin, sometimes right before a launch. If yours doesn't allow what the banner needs, the browser blocks it.

## Signs your CSP is blocking the banner

- **The banner doesn't appear at all.** The banner script itself is blocked.
- **The banner shows as plain, unstyled text and buttons**, usually stacked at the top or bottom of the page, or it no longer matches the colours and layout in your dashboard. The banner's styles are blocked.
- **The cookie icon on the Cookie Settings button shows as a broken image.** Inline images are blocked.
- **Tracking scripts you added in the dashboard never run**, even after a visitor accepts. Inline scripts are blocked.

Nothing needs to change in your banner settings for this to happen. A CSP change on your server is enough.

## How to confirm it

1. Open the page where the banner should appear.
2. Open your browser's developer tools (**F12**, or right-click the page and choose **Inspect**) and select the **Console** tab.
3. Reload the page and look for red errors that mention **Content Security Policy**, for example:
   - `Refused to load the script 'https://www.cookie-banner.ca/api/v1/banner.js…'`
   - `Applying inline style violates the following Content Security Policy directive 'style-src …'`
   - `Refused to load the image 'data:image/svg+xml…'`

If you see these, the CSP is the cause. The directive named in the error (`script-src`, `style-src`, `img-src`, `connect-src`) tells you which rule to update.

## What to add to your CSP

Add these sources to your existing policy. Don't replace your current values; append to each directive.

```
script-src   https://www.cookie-banner.ca https://cookie-banner.ca
connect-src  https://www.cookie-banner.ca
style-src    'unsafe-inline'
img-src      data:
```

- **script-src** loads the banner. Include both hosts: install snippets that use `cookie-banner.ca` are redirected to `www.cookie-banner.ca`, and the browser checks both.
- **connect-src** lets the banner record consent choices and analytics.
- **style-src 'unsafe-inline'** lets the banner apply its colours and layout.
- **img-src data:** shows the built-in cookie icon. If you use your own logo in the banner, add the host it's served from too (for example `https://cdn.example.com`).

If your policy only has a `default-src` directive, add the lines above as new directives. Each one overrides `default-src` for its type, so include your existing sources in them as well.

## Tracking scripts added in the dashboard

When a visitor gives consent, the banner adds the tracking scripts you pasted into your dashboard (Google Analytics, Google Tag Manager, Meta Pixel, and so on) to the page as inline scripts. With a strict CSP:

- Add `'unsafe-inline'` to `script-src` so those snippets can run.
- Add each vendor's own domains (for example `https://www.googletagmanager.com`). Every vendor publishes the CSP sources it needs.

## Where your CSP is set

A CSP is either sent as a `Content-Security-Policy` response header or written into the page as a `<meta http-equiv="Content-Security-Policy">` tag. Common places to change it:

- Your web server config (nginx, Apache `.htaccess`)
- Your CDN or firewall (Cloudflare, Fastly, Akamai)
- Your hosting or e-commerce platform settings, or an app or plugin you installed
- WordPress security plugins (Wordfence, Sucuri, Headers Security, and similar)

If someone else manages your site, send them this article. The lines above are all they need.

## Still seeing console errors?

A strict `style-src` can keep logging CSP warnings in the console even when the banner looks right. They're harmless, but if your site reports CSP violations (`report-uri` or `report-to`), each warning is also sent to your reporting endpoint. Adding `'unsafe-inline'` to `style-src` stops them.

If you can't allow `'unsafe-inline'` on your site, [contact us](/support) with your current policy and we'll help you find a setup that works.

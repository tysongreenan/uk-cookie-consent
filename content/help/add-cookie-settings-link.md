---
title: "Let visitors change their cookie choices"
description: "Add a Cookie Settings link to your footer, or use the floating button, so visitors can reopen their preferences at any time."
category: using-your-banner
section: Visitor experience
order: 1
updated: 2026-10-15
keywords: "cookie settings, footer link, floating button, change consent, withdraw consent, reopen, preferences, showCookiePreferences"
popular: false
---

Privacy laws expect visitors to be able to change their mind as easily as they gave consent. Your banner gives you two ways to do that.

## Option 1: Floating Cookie Settings button

In the banner builder's Cookie Settings options, set **Display Style** to **Floating Button**. A small Cookie Settings button appears in the corner of your site after a visitor makes a choice. There's nothing to add to your site.

## Option 2: A link in your own footer

Set **Display Style** to **Inline Footer Link** (or **Both Options**) if you'd rather add the link to your own footer. Paste this wherever you want it to appear:

```html
<a href="#" onclick="window.showCookiePreferences?.(); return false;">Cookie Settings</a>
```

Clicking it opens the preferences window, where visitors can turn each cookie category on or off.

### If your site uses a strict Content Security Policy

Inline `onclick` handlers are blocked by some Content Security Policies. In that case, give the link an ID and attach the click handler from one of your site's own JavaScript files:

```html
<a href="#" id="cookie-settings-link">Cookie Settings</a>
```

```js
document.getElementById('cookie-settings-link').addEventListener('click', function (e) {
  e.preventDefault();
  if (window.showCookiePreferences) window.showCookiePreferences();
});
```

For the rest of the CSP setup, see [Banner missing or unstyled? Check your Content Security Policy](/help/troubleshooting/banner-unstyled-or-missing-content-security-policy).

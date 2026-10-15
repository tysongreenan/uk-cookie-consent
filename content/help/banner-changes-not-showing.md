---
title: "My banner changes aren't showing on my website"
description: "Saved changes in your dashboard can take up to 5 minutes to reach your site. Here's why, and how to see them right away."
category: troubleshooting
section: Updates and caching
order: 2
updated: 2026-10-15
keywords: "cache, caching, not updating, old version, changes, refresh, save, publish"
popular: true
---

When you save your banner, your website picks up the change automatically. You never need to copy a new install snippet. But browsers keep a copy of the banner for a short time so your pages load faster, so the update can take a few minutes to appear.

## How long it takes

Your browser may keep using its saved copy of the banner for **up to 5 minutes** after you save. Visitors who haven't loaded your site recently get the new version right away.

## See your changes immediately

- **Hard refresh** the page: **Ctrl + Shift + R** on Windows, or **Cmd + Shift + R** on a Mac.
- Or open your site in a **private or incognito window**.

## If you've already accepted or declined

Once you've made a choice on your own site, the banner stays hidden for you. That's how visitors experience it too. To see the banner again:

- Open your site in a private or incognito window, or
- Delete the `cookie_consent` cookie for your site in your browser settings, then reload.

## Still not updating?

- **Check the banner ID.** The `id=` in the snippet on your site must match the banner you're editing in your dashboard. If you have more than one banner (for example staging and production), make sure you're editing the right one.
- **Check for a caching plugin or CDN.** Some caching tools save a copy of your whole page. Clear that cache after changing your install snippet.
- **Check the console** (F12 → Console) for errors that mention the banner. If you see Content Security Policy errors, read [Banner missing or unstyled? Check your Content Security Policy](/help/troubleshooting/banner-unstyled-or-missing-content-security-policy).

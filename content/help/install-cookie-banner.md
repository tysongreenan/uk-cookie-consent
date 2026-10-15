---
title: "Add your cookie banner to your website"
description: "Copy your install snippet from the dashboard and paste it into your site's header. One line of code, any website."
category: getting-started
section: Installation
order: 1
updated: 2026-10-15
keywords: "install, setup, snippet, embed, script tag, header, head, add to website"
popular: true
---

Your banner is added to your site with a single line of code. Once it's installed, every change you save in your dashboard updates your site automatically.

## 1. Copy your install snippet

1. In your dashboard, open the banner you want to use.
2. Select **Install snippet** in the builder.
3. Copy the code. It looks like this, with your own banner ID:

```html
<script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR-BANNER-ID" async></script>
```

## 2. Paste it into your site's header

Paste the snippet inside the `<head>` of every page, as high up as you can. Loading it early lets the banner hold back tracking scripts until a visitor gives consent.

Most website builders have a setting for this, often called **custom code**, **header code**, or **tracking code**. Step-by-step guides for popular platforms are on our [integrations page](/integrations).

## 3. Check that it works

1. Open your website in a **private or incognito window**.
2. The banner should appear within a second or two.
3. Accept or decline, then reload. The banner should stay hidden and remember your choice.

If the banner doesn't appear, read [Banner missing or unstyled? Check your Content Security Policy](/help/troubleshooting/banner-unstyled-or-missing-content-security-policy), or [contact us](/support) and we'll take a look.

## Using a staging site?

Create a separate banner for staging and install its snippet there. That way you can test changes before they reach your live site.

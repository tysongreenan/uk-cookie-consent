---
title: "What Is a Cookie Banner? How It Works and What Makes It Legal (2026)"
description: "A cookie banner asks visitors for consent before non-essential cookies load. Learn what it must do, the rules in the EU, UK, Canada and US, and the mistakes regulators fine."
date: "2026-10-15"
updatedDate: "2026-10-15"
heroCta:
  primary:
    label: "Scan your site"
    href: "/tools/cookie-scanner"
  secondary:
    label: "Start a free banner"
    href: "/free-cookie-banner"
author: "cookie-banner-team"
tags: ["Cookie Banner", "Cookie Consent", "GDPR", "PIPEDA", "Law 25", "CCPA", "Compliance"]
published: true
canonical: "/blog/what-is-a-cookie-banner"
keywords:
  - "what is a cookie banner"
  - "cookie banner"
  - "cookie banner meaning"
  - "cookie consent banner"
  - "what is a cookie consent banner"
  - "do i need a cookie banner"
  - "is a cookie banner required"
  - "cookie banner requirements"
  - "gdpr cookie banner"
  - "cookie banner canada"
  - "cookie banner law"
  - "cookie pop up"
  - "how does a cookie banner work"
  - "cookie banner examples"
schema:
  "@context": "https://schema.org"
  "@type": "FAQPage"
  mainEntity:
    - "@type": "Question"
      name: "What is a cookie banner?"
      acceptedAnswer:
        "@type": "Answer"
        text: "A cookie banner is the notice a website shows on your first visit that explains which cookies and trackers it uses and asks for your choice. A working banner also blocks non-essential cookies until you decide, records your answer, and lets you change it later."
    - "@type": "Question"
      name: "Is a cookie banner legally required?"
      acceptedAnswer:
        "@type": "Answer"
        text: "If your site uses analytics, advertising, or other non-essential cookies and has visitors from the EU or UK, yes. Quebec's Law 25 has similar expectations. Elsewhere in Canada and in most US states the rules are lighter (notice and an easy opt-out), but a banner is still the simplest way to meet them."
    - "@type": "Question"
      name: "Do I need a cookie banner if I only use Google Analytics?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Usually, yes. Google Analytics sets cookies that measure visitor behaviour, which counts as non-essential. In the EU you need consent before it loads. Google also requires Consent Mode v2 signals for EEA and UK traffic if you want full measurement and advertising features."
    - "@type": "Question"
      name: "Are pre-ticked boxes allowed on a cookie banner?"
      acceptedAnswer:
        "@type": "Answer"
        text: "No. The EU Court of Justice ruled in Planet49 (C-673/17, 2019) that a pre-ticked box is not valid consent. Every non-essential category should start switched off."
    - "@type": "Question"
      name: "Can I block my website until visitors accept cookies?"
      acceptedAnswer:
        "@type": "Answer"
        text: "In the EU, generally no. A 'cookie wall' that makes access conditional on accepting tracking means consent isn't freely given. Regulators allow very limited exceptions, such as offering a genuine alternative to accepting."
    - "@type": "Question"
      name: "What's the difference between a cookie banner and a CMP?"
      acceptedAnswer:
        "@type": "Answer"
        text: "The banner is the part visitors see. A consent management platform (CMP) is the system behind it: it scans for cookies, blocks scripts until consent, stores consent records, and passes signals to tools like Google Tag Manager."
    - "@type": "Question"
      name: "How often should I update my cookie banner?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Whenever you add a new tool that sets cookies, and re-check at least every few months. Ask visitors again when you add new purposes, and re-prompt periodically (12 months is a common choice)."
    - "@type": "Question"
      name: "What happens if my cookie banner isn't compliant?"
      acceptedAnswer:
        "@type": "Answer"
        text: "Most regulators start with a warning and a deadline to fix it. Serious or repeated cases lead to fines: France's CNIL fined Shein €150 million and Google €325 million in September 2025 over cookies set without valid consent."
---

<div class="direct-answer">
<strong>What is a cookie banner?</strong> A cookie banner is the notice a website shows on your first visit that tells you which cookies and trackers it uses and asks for your choice. A banner that actually works does four things: it explains, it actually blocks non-essential cookies until you decide, it records your answer, and it lets you change your mind later. Most banners only do the first one, and that gap is what regulators fine.

[Check what your site loads before consent with our free scanner](/tools/cookie-scanner)
</div>

<div class="article-cta">
<span class="article-cta-note">See which cookies fire before a visitor says yes, then add a free banner that holds them back.</span>
<a class="article-cta-primary" href="/tools/cookie-scanner">Scan your site</a>
<a class="article-cta-secondary" href="/free-cookie-banner">Start a free banner</a>
</div>

You've clicked "Accept" on thousands of them. But if you run a website, the banner is more than a pop-up to get out of the way. It's the place where privacy law, your analytics, and your ad spend meet.

This guide explains what a cookie banner is, what it has to do to be legal in the EU, UK, Canada, and the US, and the mistakes that get websites flagged.

---

## Table of Contents

- [Cookie banner, in plain terms](#cookie-banner-in-plain-terms)
- [First, what's a cookie?](#first-whats-a-cookie)
- [Why websites need a cookie banner](#why-websites-need-a-cookie-banner)
- [The four jobs of a cookie banner](#the-four-jobs-of-a-cookie-banner)
- [Having a banner isn't the same as being compliant](#having-a-banner-isnt-the-same-as-being-compliant)
- [What a compliant cookie banner looks like](#what-a-compliant-cookie-banner-looks-like)
- [How a cookie banner works behind the scenes](#how-a-cookie-banner-works-behind-the-scenes)
- [Cookie banners and Google Consent Mode v2](#cookie-banners-and-google-consent-mode-v2)
- [How to set up a cookie banner in 5 steps](#how-to-set-up-a-cookie-banner-in-5-steps)
- [What happens if your banner isn't compliant](#what-happens-if-your-banner-isnt-compliant)
- [Frequently asked questions](#frequently-asked-questions)

---

## Cookie banner, in plain terms

A cookie banner (also called a cookie consent banner, cookie pop-up, or consent notice) appears when someone first visits your site. It tells them what cookies and similar trackers the site uses and asks them to accept, reject, or choose by category.

The important part is what happens *behind* the banner. Until the visitor makes a choice, anything that isn't strictly necessary (analytics, ad pixels, embedded videos that track) should stay switched off.

---

## First, what's a cookie?

A cookie is a small text file a website saves in your browser. It holds a short piece of information, such as a session ID, a language setting, or a tracking ID, that the site (or a third party) can read later.

Cookies are why your cart still has items in it when you come back, why a site remembers you're logged in, and why an ad for shoes follows you from site to site.

Privacy laws treat other tracking technologies the same way: **pixels, local storage, SDKs, and device fingerprinting** all need the same consent as cookies.

### Types of cookies

Every cookie can be described three ways.

**By purpose** (this is what decides whether you need consent):

- **Strictly necessary**: login, security, load balancing, shopping cart. No consent needed.
- **Functional**: remember preferences like language or region. Usually needs consent in the EU.
- **Analytics**: measure how people use the site (Google Analytics, Hotjar). Needs consent in the EU.
- **Marketing**: track people across sites to target ads (Meta Pixel, Google Ads). Needs consent almost everywhere it's regulated.

**By who sets it:**

- **First-party**: set by the site you're on.
- **Third-party**: set by another company's domain, like an ad network or embedded video. These get the most scrutiny.

**By how long it lasts:**

- **Session cookies** disappear when the browser closes.
- **Persistent cookies** stay until they expire, which can be minutes or years.

Not sure which of these your site sets? Our [cookie scanner](/tools/cookie-scanner) lists every cookie a page loads and sorts them by category.

---

## Why websites need a cookie banner

Different places have different rules. Here's what applies, from strictest to lightest.

### European Union: ask first

Two laws work together:

- **The ePrivacy Directive** (the "cookie law"), Article 5(3): you can't store or read anything on a visitor's device without consent, unless it's strictly necessary.
- **The GDPR** defines what valid consent is: freely given, specific, informed, and unambiguous, given by a clear action. No pre-ticked boxes and no "by continuing to browse, you agree."

So in the EU, non-essential cookies are **opt-in**. Nothing loads until the visitor says yes. Our guide to [GDPR cookie consent requirements](/blog/gdpr-cookie-consent-requirements) covers each rule in detail.

### United Kingdom: ask first, with a few new exceptions

The UK applies the same opt-in model through **PECR** and the UK GDPR. The **Data (Use and Access) Act 2025** relaxes consent for some low-risk uses, such as certain analytics, as long as you're transparent and offer an opt-out. It also raises the maximum PECR fine from £500,000 to UK GDPR levels. Parts of the Act depend on secondary legislation and ICO guidance, so check the ICO's current position before relying on an exception.

### Canada: depends on the province

- **Quebec (Law 25)** is the strictest. It requires you to tell people about tracking technologies and how to *activate* them. Quebec's privacy regulator, the Commission d'accès à l'information, reads this as requiring tracking to be off until the visitor turns it on. Lawyers still debate how far this goes for cookies, but for practical purposes, treat Quebec visitors like EU visitors.
- **The rest of Canada (PIPEDA)** requires meaningful consent. Canada's federal privacy regulator, the Office of the Privacy Commissioner, has said implied consent can work for online behavioural advertising **only** if you give clear notice when tracking happens and make opting out easy. Sensitive information, and anything involving children, needs express consent.

Our [Canada cookie consent guide](/blog/cookie-consent-canada-guide-2026) walks through both.

### United States: opt-out, state by state

There's no federal cookie law. States like **California (CCPA/CPRA)** give people the right to opt out of the "sale" or "sharing" of their data, which includes many ad cookies. California also requires you to honour **Global Privacy Control**, a browser signal that opts the visitor out automatically. See our [CCPA/CPRA cookie guide](/blog/ccpa-cpra-cookie-compliance-guide).

**The practical answer:** if your visitors come from more than one of these places, which almost every site's do, one banner that adapts to each region is far easier than trying to meet each law separately.

---

## The four jobs of a cookie banner

A banner that works does four things:

1. **Explains.** It says what cookies the site uses, why, and who sets them, in plain language, with a link to your cookie or privacy policy.
2. **Blocks.** It holds non-essential cookies and scripts until the visitor chooses. This is the job most banners skip.
3. **Records.** It saves the choice (what was chosen, and when) so you can show proof of consent if a regulator or customer asks.
4. **Lets people change their mind.** It gives visitors a way, like a floating "Cookie Settings" button or a footer link, to reopen their choices at any time, as easily as they made them.

If your banner only does the first job, it's a decoration, not a consent tool.

---

## Having a banner isn't the same as being compliant

Most sites install a banner and consider the job done. Regulators keep finding otherwise.

- **UK:** The ICO reviewed the UK's top 1,000 websites in 2025. By December, 979 met its checks, but only **415 passed without intervention**. **564 had to fix problems** after the ICO stepped in, and 17 received preliminary enforcement notices. The three things it tested: ad cookies set before the visitor chose, whether rejecting was as easy as accepting, and cookies set after a visitor refused.
- **France:** In September 2025, the CNIL fined **Shein €150 million** for setting ad cookies before consent and continuing to set them after visitors clicked reject. The same day, it fined **Google €325 million**, partly because declining ad cookies during sign-up took more clicks than accepting them.

### The mistakes that get flagged

- **Cookies fire before the visitor chooses.** Analytics and ad pixels load with the page, and the banner is just decoration.
- **No "Reject all" on the first screen.** Accepting takes one click; rejecting takes three.
- **Rejecting doesn't actually work.** Cookies keep loading after "Reject," which was central to the Shein fine.
- **Pre-ticked boxes.** The EU Court of Justice ruled these invalid in *Planet49* (C-673/17).
- **Dark patterns.** A bright "Accept" next to a faint grey "Reject," or wording designed to confuse.
- **No record of consent.** When someone asks for proof, there's nothing to show.
- **Out of date.** The banner was set up two years ago and doesn't know about the five tools your team has added since.

<div class="article-cta">
<span class="article-cta-note">Find out in 30 seconds whether your site sets cookies before consent.</span>
<a class="article-cta-primary" href="/tools/cookie-scanner">Scan your site free</a>
<a class="article-cta-secondary" href="/free-cookie-banner">Start a free banner</a>
</div>

---

## What a compliant cookie banner looks like

### Before the visitor chooses

- Only strictly necessary cookies load.
- The banner appears on the first page view, before any tracking starts.

### On the banner

- **"Accept" and "Reject" on the first screen, with equal weight**: same size, same style, same number of clicks.
- **A way to choose by category** (analytics, marketing, functional), with every non-essential category **off by default**.
- **Plain language** about what's collected and why, plus a link to your privacy policy.
- **No cookie wall.** People can use the site even if they reject.

### After the visitor chooses

- **Their choice is respected**: rejected tools don't load, now or on later pages.
- **The choice is recorded**, with the date and what was selected.
- **Changing it is easy**, through a persistent Cookie Settings button or footer link.
- **You ask again** when you add new purposes or tools, and periodically (12 months is common).

### Design dos and don'ts

**Don't:**

- Make "Reject" grey, small, or hidden behind "More options."
- Use two "Accept" buttons and one "Reject."
- Write confusing labels like "Object to legitimate interest" instead of "Reject all."
- Show the banner again on every page until the visitor gives in.

**Do:**

- Match your brand's colours and fonts, as long as both buttons stay equally clear.
- Use short, plain labels: "Accept all," "Reject all," "Preferences."
- Keep it out of the way of your content on mobile.
- Make it keyboard- and screen-reader-friendly.

---

## How a cookie banner works behind the scenes

When a page loads, a consent tool does three things:

1. **Finds what's on the site.** A scanner loads your pages and lists every cookie and tracker, then sorts them by purpose. You should re-scan whenever you add tools.
2. **Holds back non-essential scripts.** The banner's script loads first. Analytics, pixels, and other tracking code are kept waiting until the visitor chooses, then loaded only for the categories they allowed.
3. **Passes the choice on.** It saves the decision (usually in a first-party cookie) and tells other tools, such as Google Tag Manager or Google's tags through Consent Mode, what they're allowed to do.

Step 2 is where most "free" banners fall short. Showing a pop-up is easy; actually stopping tracking code from running until consent is the hard part.

---

## Cookie banners and Google Consent Mode v2

If you run Google Ads or Google Analytics and have visitors from the EEA or UK, Google requires you to send consent signals through **Consent Mode v2** to keep features like remarketing and full conversion measurement. This is Google's own policy, tied to the EU's Digital Markets Act, not a privacy law in itself.

Consent Mode v2 uses four signals:

- `ad_storage`: can ad cookies be stored?
- `analytics_storage`: can analytics cookies be stored?
- `ad_user_data`: can user data be sent to Google for advertising? *(new in v2)*
- `ad_personalization`: can ads be personalised, e.g. remarketing? *(new in v2)*

Your banner sets these to "denied" before the visitor chooses, then updates them based on the answer. Our banner sends all four automatically. If you use Google Tag Manager, see our [GTM cookie consent guide](/blog/google-tag-manager-cookie-consent-guide).

---

## How to set up a cookie banner in 5 steps

1. **Scan your site.** Find out what's actually loading. Run our [free cookie scanner](/tools/cookie-scanner) on your homepage and a few key pages.
2. **Choose a banner tool.** Look for real script blocking, a first-screen "Reject all," consent records, region-aware rules, and Consent Mode v2.
3. **Add your tracking scripts to the banner,** sorted by category, so they only load after consent. Remove the hard-coded copies from your site.
4. **Install the snippet** in your site's `<head>`. With us it's one line of code, and there are guides for [WordPress](/blog/how-to-add-cookie-banner-wordpress), Shopify, Squarespace, Wix, and more in our [step-by-step setup guide](/blog/how-to-add-a-cookie-banner-to-your-website).
5. **Test, then keep it current.** Open your site in a private window, reject everything, and confirm nothing non-essential loads. Re-scan when you add new tools.

---

## What happens if your banner isn't compliant

Costs tend to escalate in this order:

1. **Worse data.** Without proper consent signals, Google can't model conversions for visitors who decline, and your reports get less reliable.
2. **A regulator's notice.** Most cases start with a letter and a deadline, like the hundreds the ICO sent in 2025.
3. **Fines.** Under GDPR, the most serious breaches can reach **€20 million or 4% of worldwide annual turnover**, whichever is higher. Cookie cases are often brought under national ePrivacy laws instead, as in the CNIL's Shein and Google decisions, and those fines can be just as large.

In Canada, Quebec's Law 25 allows administrative penalties of up to **$10 million or 2% of worldwide turnover**, and penal fines up to $25 million or 4%.

---

## How our cookie banner helps

We build cookie banners for sites that want to get this right without a legal team:

- **A first-screen "Reject" button**, with categories switched off by default.
- **Scripts held until consent.** Add your analytics and ad tags to the banner and they only load for the categories a visitor allows.
- **Google Consent Mode v2** signals built in.
- **16 languages**, and a one-line install on any website.
- **Free to start.** No credit card needed.
- **On Pro:** region-aware rules for the EU, UK, Quebec, the rest of Canada, and the US (including Global Privacy Control), plus consent records you can export.

<div class="article-cta">
<span class="article-cta-note">Get a cookie banner that blocks tracking until visitors say yes.</span>
<a class="article-cta-primary" href="/free-cookie-banner">Start a free banner</a>
<a class="article-cta-secondary" href="/tools/cookie-scanner">Scan your site</a>
</div>

---

## Frequently asked questions

### Is a cookie banner legally required?

If your site uses analytics, advertising, or other non-essential cookies and has visitors from the EU or UK, yes. Quebec's Law 25 has similar expectations. Elsewhere in Canada and in most US states, the rules are lighter (clear notice and an easy opt-out), but a banner is still the simplest way to meet them.

### Do I need a cookie banner if I only use Google Analytics?

Usually, yes. Google Analytics sets cookies that measure behaviour, which counts as non-essential. In the EU you need consent before it loads, and Google requires Consent Mode v2 signals for EEA and UK visitors if you want full measurement.

### Are pre-ticked boxes allowed?

No. The EU Court of Justice ruled in *Planet49* (C-673/17, 2019) that a pre-ticked box isn't valid consent. Every non-essential category should start switched off.

### Can I block my site until visitors accept cookies?

In the EU, generally no. A "cookie wall" means consent isn't freely given. There are narrow exceptions, such as offering a genuine alternative, but they're rarely worth the risk.

### What's the difference between a cookie banner and a CMP?

The banner is the part visitors see. A consent management platform (CMP) is the system behind it: it scans for cookies, blocks scripts until consent, stores records, and passes signals to tools like Google Tag Manager.

### How often should I update my cookie banner?

Whenever you add a tool that sets cookies, and re-check every few months. Ask visitors again when you add new purposes, and re-prompt periodically; 12 months is a common choice.

### What happens if my banner isn't compliant?

Most regulators start with a warning and a deadline. Serious or repeated cases lead to fines: France's CNIL fined Shein €150 million and Google €325 million in September 2025 over cookies set without valid consent.

---

*This article is general information, not legal advice. Rules differ by country and change often; check with a privacy lawyer for advice on your specific situation.*

**Sources:** [ICO, "ICO action secures increased cookie compliance" (Dec 2025)](https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2025/12/ico-action-secures-increased-cookie-compliance) · [CNIL, Shein €150M decision](https://www.cnil.fr/en/cookies-placed-without-consent-shein-fined-150-million-euros-cnil) · [CNIL, Google €325M decision](https://www.cnil.fr/en/cookies-and-advertisements-inserted-between-emails-google-fined-325-million-euros-cnil) · [OPC, Policy position on online behavioural advertising](https://priv.gc.ca/en/privacy-topics/advertising-and-marketing/behaviouraltargeted-advertising/bg_ba_1206) · [Mayer Brown on the Data (Use and Access) Act 2025](https://www.mayerbrown.com/en/insights/publications/2025/06/the-data-use-and-access-act-pecr-reform-rules-relating-to-electronic-marketing-and-cookies-in-the-uk)

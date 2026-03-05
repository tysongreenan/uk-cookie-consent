---

title: "What to Put in Your Privacy Policy, Right Now"
description: "No-nonsense checklist and copy-paste prompt to build a privacy and cookie policy for Canadian websites, covering PIPEDA, Québec Law 25, cookies and consent."
date: "2025-11-25"
updatedDate: "2025-11-25"
author: "cookie-banner-team"
tags: ["Privacy", "PIPEDA", "Law 25", "Cookie Consent", "Compliance"]
published: true
---------------

# What to Put in Your Privacy Policy, Right Now

<div class="direct-answer">
Your privacy policy needs a plain-language summary of what personal data you collect, why you collect it, who you share it with, how long you keep it, how people give and withdraw consent for cookies and tracking, and how people can exercise their rights. Copy the prompt below to generate a draft you can customise.
</div>

---

## Table of Contents

* [Quick checklist](#quick-checklist)
* [What each section must say](#what-each-section-must-say)
* [Copy-paste prompt you can use right now](#copy-paste-prompt-you-can-use-right-now)
* [Example cookie table you can copy](#example-cookie-table-you-can-copy)
* [How to use the prompt](#how-to-use-the-prompt)
* [FAQ](#faq)
* [Conclusion](#conclusion)

---

## Quick checklist

Copy and check each item as you finish it.

* [ ] Organisation name and privacy contact.
* [ ] Full list of personal data collected.
* [ ] Methods of collection (forms, cookies, logs, third parties).
* [ ] Purpose for each data type (service, payments, analytics, marketing).
* [ ] Legal basis / consent approach for tracking and marketing.
* [ ] Cookie categories, purpose, provider, lifetime, first/third party.
* [ ] How to give, refuse and withdraw consent (UI + browser steps).
* [ ] Third-party recipients and links to their policies.
* [ ] Retention periods per data type.
* [ ] Security measures summary.
* [ ] Rights and how to exercise them (access, correction, deletion).
* [ ] Children policy if applicable.
* [ ] Effective date and version history.
* [ ] Consent logging (timestamp, choices, policy version).

---

## What each section must say

Short lines you can paste directly into a draft.

**Overview**
One sentence: who you are and what this policy covers.

**Who we are**
Organisation name, website domain, privacy contact email and postal address.

**Information we collect**
List: name, email, phone, billing details, IP address, device info, cookies, profiling data.

**How we collect it**
Forms, account creation, payments, cookies, tracking pixels, APIs, vendor integrations.

**Why we collect it**
Map each data point to a purpose: provide service, verify payment, analytics, personalise content, marketing, legal compliance.

**Legal basis and consent**
State that you rely on consent for marketing and tracking, explain necessary cookies used without opt-in, and note Québec requirements for express consent and a posted confidentiality policy.

**Cookies and similar technologies**
List categories (essential, preferences, analytics, marketing), require opt-in for non-essential, link to cookie settings and include a cookie table.

**Sharing and third parties**
List categories of recipients and link to major vendors’ privacy pages. Explain cross-border transfers and safeguards.

**Retention**
Give either fixed retention periods or a rule for determining retention per category.

**Security**
One short paragraph about administrative, technical and physical safeguards.

**Rights and contact**
How users request access, correction, deletion and privacy complaints, with contact details.

**Children**
State whether you knowingly collect from children and steps to delete data if discovered.

**Changes**
Note the effective date and that material changes will be posted.

---

## Copy-paste prompt you can use right now

Paste this prompt into your AI assistant or hand it to a legal drafter. Replace bracketed placeholders.

```text
Write a concise, plain-language privacy policy draft for a website. Use Canadian English. Keep it short, practical and suitable for publication on a business website. Include a clear cookies section and an editable cookie table. Use placeholders in square brackets where I need to replace organisation-specific details.

Fill these placeholders from the information below:
- Organisation name: [ORGANISATION_NAME]
- Website domain: [WEBSITE_URL]
- Privacy contact email: [PRIVACY_EMAIL]
- Postal address: [POSTAL_ADDRESS]
- Primary jurisdictions: [e.g., Canada, Québec]
- Do we sell user data? [Yes/No]
- Do we run personalised advertising? [Yes/No]
- Main third-party vendors: [e.g., Google Analytics, Stripe, Meta]
- Retention rules summary: [e.g., 'orders: 7 years; analytics: 26 months; support tickets: 2 years']
- Cookie table (list comma separated: name|provider|purpose|category|lifetime|third-party?):
  e.g. _ga|google.com|Analytics|Analytics|2 years|Yes,google.com

Output requirements:
1. Start with an "Effective date" line and a one-paragraph summary.
2. Include sections: Who we are, Information we collect, How we collect it, Why we collect it, Legal basis and consent, Cookies and similar technologies, Sharing and third parties, Retention, Security, Rights and contact, Children, Changes.
3. Provide an editable cookie table with the rows from the cookie table input turned into a Markdown table.
4. Add a short 'how to withdraw consent' paragraph with steps for cookie settings and browser options.
5. End with "Need help?" and the privacy contact email.
6. Keep total length under 900 words.

Now generate the privacy policy draft using the placeholders above and the cookie table rows provided.
```

---

## Example cookie table you can copy

Replace rows with results from a cookie scan.

| Name         | Provider     | Purpose                             | Category  | Lifetime | Third-party?      |
| ------------ | ------------ | ----------------------------------- | --------- | -------- | ----------------- |
| *session_id* | yoursite.com | Keeps you logged in for the session | Essential | Session  | No                |
| _ga          | google.com   | Google Analytics visitor ID         | Analytics | 2 years  | Yes, google.com   |
| _gid         | google.com   | Google Analytics session ID         | Analytics | 24 hours | Yes, google.com   |
| _fbp         | facebook.com | Used by Facebook to deliver ads     | Marketing | 3 months | Yes, facebook.com |

---

## How to use the prompt

1. Replace the bracketed fields with your organisation details.
2. Run the prompt in your AI assistant or send it to counsel for review.
3. Replace the cookie table with output from a cookie scan.
4. Publish the draft and link to a cookie preference centre that blocks non-essential cookies until consent.
5. Log consent server-side with timestamp, policy version, and user choices.

---

## FAQ

**Do I need a lawyer?**
Yes, for final legal review if you handle sensitive data or significant volumes of personal information. The prompt creates a useful draft but not legal advice.

**Do I need a separate Québec section?**
You can keep a single policy and add a short Québec addendum calling out express consent and confidentiality obligations.

**How often should I update the policy?**
After any change to tracking or vendors, when laws change, and at least annually if your setup is stable.

---

## Conclusion

This file gives you a direct, no-nonsense route to a privacy policy. Use the prompt, run a cookie scan, add retention rules and vendor names, then get a legal review. If you want, I can fill the placeholders and produce a ready-to-publish draft for your site.

---
name: finance-manager
description: |
  Finance and bookkeeping manager for uk-cookie-consent. Use this skill whenever Tyson asks about money, revenue, finances, subscribers, invoices, or expenses for this project. Trigger on phrases like: "pull my Stripe data", "update the workbook", "how's my MRR", "what's my ARR", "how many subscribers do I have", "add an expense", "log an invoice", "check my finances", "what did I make this month", "tax summary", "how much have I spent on hosting", or any question about the financial health of this project. Always use this skill when finances are the topic — don't just answer from memory, actually run the scripts and pull live data.
---

# Finance Manager — uk-cookie-consent

## Overview

This project has two financial assets:
- **Workbook**: `uk-cookie-consent-finances-2026.xlsx` (project root) — 5 sheets: Dashboard, MRR Tracker, Revenue Log, Expenses, Tax & Profit
- **Pull script**: `scripts/pull-finances.js` — fetches live data from Stripe and populates the workbook

Stripe keys and credentials are in `.env.local`. The `stripe` and `dotenv` packages are already installed. Only `exceljs` needs a one-time install.

---

## Workflows

### 1. Refresh live Stripe data

When Tyson wants up-to-date numbers, run the pull script:

```bash
# One-time setup if not done yet
npm install exceljs

# Pull latest Stripe data into the workbook
node scripts/pull-finances.js
```

The script prints a quick summary to the terminal (MRR, ARR, subscriber counts, total revenue). After it runs, open the workbook for the full picture.

### 2. Answer financial questions without touching the workbook

For quick questions ("what's my MRR?", "how many active subscribers?"), run the pull script and read the terminal output — no need to open Excel. If the user wants more detail (monthly breakdown, expense categories), open and read the workbook.

### 3. Add or update expenses manually

When Tyson mentions a new expense (e.g., "log $20 for Vercel this month"), open the workbook with `exceljs`, find the Expenses sheet, and append a row with:
- Date, Vendor, Category, Description, Amount, Billing Cycle, Payment Method, Receipt?, Tax Deductible?

Common categories: `Hosting/Vercel`, `Supabase/DB`, `Domain & SSL`, `Stripe Fees`, `Software/Tools`, `Marketing`, `Contractors`, `Other`

Use Python + openpyxl if adding multiple rows or doing bulk updates — it's faster for structured edits.

### 4. Generate a financial summary

When asked for a summary or report, run the pull script first to get fresh data, then synthesize a clear plain-English answer covering:
- Current MRR and ARR
- Active vs. churned subscribers
- Revenue this month / YTD
- Top expenses
- Net profit estimate
- Any flags (e.g., churn spike, expense creep)

Keep it concise — Tyson wants the headline numbers, not a wall of text.

### 5. Tax prep

When asked about taxes or deductions, open the `Tax & Profit` sheet. The quarterly breakdown auto-calculates from live data. The deductions checklist at the bottom is manually filled — ask Tyson which items are confirmed and update them.

Remind him the 25% tax estimate is a rough guide and he should confirm with his accountant.

---

## Workbook Sheet Guide

| Sheet | Purpose | Updated by |
|---|---|---|
| Dashboard | KPIs: MRR, ARR, churn rate, ARPU, monthly P&L | Auto (formulas) |
| MRR Tracker | One row per subscriber: status, plan, MRR, dates | `pull-finances.js` |
| Revenue Log | One row per Stripe charge: amount, fee, net | `pull-finances.js` |
| Expenses | Manual expense entries | You / Tyson manually |
| Tax & Profit | Quarterly P&L + deductions checklist | Auto + manual |

---

## Key File Paths

```
uk-cookie-consent/
├── uk-cookie-consent-finances-2026.xlsx   ← main workbook
├── scripts/
│   └── pull-finances.js                   ← Stripe data puller
└── .env.local                             ← contains STRIPE_SECRET_KEY
```

The general multi-project workbook lives separately at:
`~/Documents/Accounting/Business_Bookkeeping_2026.xlsx`

---

## Tips

- Always run `node scripts/pull-finances.js` before answering questions about live subscriber or revenue numbers — Stripe data goes stale fast.
- If `exceljs` isn't installed yet, run `npm install exceljs` first — takes a few seconds and only needed once.
- When editing the workbook programmatically, prefer `openpyxl` (Python) for bulk changes — it handles formulas and formatting more reliably than exceljs for complex edits.
- The Dashboard auto-updates via Excel formulas once the underlying sheets have fresh data — no need to manually update it.
- Never commit the workbook to git — it may contain sensitive subscriber/revenue data.

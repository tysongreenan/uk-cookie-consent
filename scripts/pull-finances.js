#!/usr/bin/env node
/**
 * pull-finances.js
 *
 * Pulls live data from Stripe and updates the uk-cookie-consent
 * bookkeeping spreadsheet (uk-cookie-consent-finances-2026.xlsx).
 *
 * Usage:
 *   node scripts/pull-finances.js
 *
 * Requires: stripe, dotenv, exceljs
 *   npm install exceljs  (stripe + dotenv already installed)
 */

require('dotenv').config({ path: '.env.local' });
const path = require('path');

// Check for required env var
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌  STRIPE_SECRET_KEY not found in .env.local');
  process.exit(1);
}

async function main() {
  // Lazy-load so missing packages give a clear error
  let ExcelJS, Stripe;
  try {
    ExcelJS = require('exceljs');
    Stripe  = require('stripe');
  } catch (e) {
    console.error('❌  Missing dependency:', e.message);
    console.error('    Run: npm install exceljs');
    process.exit(1);
  }

  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const WORKBOOK_PATH = path.join(__dirname, '..', 'uk-cookie-consent-finances-2026.xlsx');

  console.log('🔄  Connecting to Stripe...');

  // ── 1. Pull charges (Revenue Log) ──────────────────────────
  console.log('📥  Fetching charges...');
  const charges = [];
  for await (const charge of stripe.charges.list({ limit: 100, expand: ['data.invoice'] })) {
    charges.push(charge);
  }
  console.log(`    Found ${charges.length} charges`);

  // ── 2. Pull subscriptions (MRR Tracker) ────────────────────
  console.log('📥  Fetching subscriptions...');
  const subscriptions = [];
  for await (const sub of stripe.subscriptions.list({ limit: 100, status: 'all', expand: ['data.customer'] })) {
    subscriptions.push(sub);
  }
  console.log(`    Found ${subscriptions.length} subscriptions`);

  // ── 3. Load workbook ───────────────────────────────────────
  console.log('📂  Loading workbook...');
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(WORKBOOK_PATH);

  // ── 4. Write Revenue Log ───────────────────────────────────
  const revSheet = wb.getWorksheet('Revenue Log');
  if (revSheet) {
    // Clear existing data rows (keep header row 1)
    const lastRow = revSheet.lastRow ? revSheet.lastRow.number : 1;
    for (let r = lastRow; r >= 2; r--) {
      revSheet.spliceRows(r, 1);
    }

    charges.forEach((charge, i) => {
      const row = i + 2;
      const date   = new Date(charge.created * 1000);
      const amount = charge.amount / 100;
      const fee    = charge.application_fee_amount ? charge.application_fee_amount / 100 : 0;
      const status = charge.status === 'succeeded' ? 'Paid' : charge.status === 'failed' ? 'Failed' : 'Pending';
      const type   = charge.invoice ? 'Subscription' : 'One-Time';

      revSheet.getRow(row).values = [
        date,
        charge.customer || '',
        type,
        charge.description || charge.invoice?.lines?.data?.[0]?.description || '',
        amount,
        fee,
        amount - fee,
        status,
        charge.id,
        '',
      ];

      // Format date cell
      revSheet.getCell(row, 1).numFmt = 'MM/DD/YYYY';
      // Format money cells
      const moneyFmt = '$#,##0.00;($#,##0.00);"-"';
      [5, 6, 7].forEach(col => {
        revSheet.getCell(row, col).numFmt = moneyFmt;
      });
    });
    console.log(`✅  Revenue Log updated (${charges.length} rows)`);
  } else {
    console.warn('⚠️   "Revenue Log" sheet not found — skipping');
  }

  // ── 5. Write MRR Tracker ───────────────────────────────────
  const mrrSheet = wb.getWorksheet('MRR Tracker');
  if (mrrSheet) {
    const lastRow2 = mrrSheet.lastRow ? mrrSheet.lastRow.number : 1;
    for (let r = lastRow2; r >= 2; r--) {
      mrrSheet.spliceRows(r, 1);
    }

    subscriptions.forEach((sub, i) => {
      const row      = i + 2;
      const customer = sub.customer;
      const email    = typeof customer === 'object' ? customer.email : '';
      const custId   = typeof customer === 'object' ? customer.id : customer;
      const status   = sub.status === 'active' ? 'Active'
                     : sub.status === 'canceled' ? 'Churned'
                     : sub.status === 'trialing' ? 'Trial'
                     : 'Paused';
      const planType = sub.items?.data?.[0]?.price?.unit_amount > 0 ? 'Paid' : 'Free';
      const mrr      = sub.items?.data?.reduce((sum, item) => {
        const price = item.price;
        if (!price) return sum;
        const amount  = price.unit_amount / 100;
        const isAnnual = price.recurring?.interval === 'year';
        return sum + (isAnnual ? amount / 12 : amount);
      }, 0) || 0;

      const startDate = new Date(sub.start_date * 1000);
      const churnDate = sub.canceled_at ? new Date(sub.canceled_at * 1000) : null;

      mrrSheet.getRow(row).values = [
        sub.id,
        status,
        planType,
        mrr,
        startDate,
        churnDate || '',
        custId,
        email,
        '',
      ];

      mrrSheet.getCell(row, 4).numFmt = '$#,##0.00;($#,##0.00);"-"';
      mrrSheet.getCell(row, 5).numFmt = 'MM/DD/YYYY';
      if (churnDate) mrrSheet.getCell(row, 6).numFmt = 'MM/DD/YYYY';
    });
    console.log(`✅  MRR Tracker updated (${subscriptions.length} rows)`);
  } else {
    console.warn('⚠️   "MRR Tracker" sheet not found — skipping');
  }

  // ── 6. Save workbook ───────────────────────────────────────
  await wb.xlsx.writeFile(WORKBOOK_PATH);
  console.log('');
  console.log('💾  Workbook saved:', WORKBOOK_PATH);
  console.log('');

  // ── 7. Print quick summary ─────────────────────────────────
  const activeSubs  = subscriptions.filter(s => s.status === 'active');
  const trialSubs   = subscriptions.filter(s => s.status === 'trialing');
  const cancelledSubs = subscriptions.filter(s => s.status === 'canceled');
  const totalMRR    = activeSubs.reduce((sum, sub) => {
    return sum + (sub.items?.data?.reduce((s2, item) => {
      const price = item.price;
      if (!price) return s2;
      const amount = price.unit_amount / 100;
      const isAnnual = price.recurring?.interval === 'year';
      return s2 + (isAnnual ? amount / 12 : amount);
    }, 0) || 0);
  }, 0);
  const totalRevenue = charges
    .filter(c => c.status === 'succeeded')
    .reduce((sum, c) => sum + c.amount / 100, 0);

  console.log('─────────────────────────────────────');
  console.log('📊  QUICK SUMMARY');
  console.log('─────────────────────────────────────');
  console.log(`  Active subscribers : ${activeSubs.length}`);
  console.log(`  Trials             : ${trialSubs.length}`);
  console.log(`  Churned            : ${cancelledSubs.length}`);
  console.log(`  MRR                : $${totalMRR.toFixed(2)}`);
  console.log(`  ARR (est.)         : $${(totalMRR * 12).toFixed(2)}`);
  console.log(`  Total revenue      : $${totalRevenue.toFixed(2)}`);
  console.log('─────────────────────────────────────');
  console.log('');
  console.log('✅  Done! Open uk-cookie-consent-finances-2026.xlsx to view.');
}

main().catch(err => {
  console.error('❌  Error:', err.message);
  process.exit(1);
});

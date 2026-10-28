import { chromium } from 'playwright';

const TOKEN = process.env.SESSION_TOKEN;
const OUT = '/tmp/builder-ux';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

await ctx.addCookies([
  { name: '__Secure-next-auth.session-token', value: TOKEN, domain: 'www.cookie-banner.ca', path: '/', httpOnly: true, secure: true, sameSite: 'Lax' },
  // pre-accept site's own banner so it doesn't obstruct screenshots
  { name: 'ukcc-consent', value: 'accepted', domain: '.cookie-banner.ca', path: '/', secure: true, sameSite: 'Lax' },
  { name: 'cookie_consent', value: 'accepted', domain: '.cookie-banner.ca', path: '/', secure: true, sameSite: 'Lax' },
]);

const page = await ctx.newPage();

console.log('→ /dashboard/builder');
const resp = await page.goto('https://www.cookie-banner.ca/dashboard/builder', { waitUntil: 'networkidle', timeout: 60000 });
console.log('status:', resp?.status(), 'url:', page.url());
await page.waitForTimeout(2500);

// Try to dismiss any cookie banner on the marketing site itself
try {
  const acceptBtn = page.locator('button:has-text("Accept all"), button:has-text("Accept All"), button:has-text("Accept")').first();
  if (await acceptBtn.isVisible({ timeout: 1500 })) {
    await acceptBtn.click();
    await page.waitForTimeout(500);
  }
} catch {}

await page.screenshot({ path: `${OUT}/00-initial.png`, fullPage: true });

// Find sidebar nav buttons (CONFIGURATION STEPS list visible in left rail)
const navItems = await page.evaluate(() => {
  // gather elements that look like step nav: text-only buttons or list items in the left configuration rail
  const candidates = Array.from(document.querySelectorAll('button, a, [role="tab"], li'));
  const results = [];
  for (const el of candidates) {
    const txt = (el.textContent || '').trim();
    if (!txt) continue;
    if (txt.length > 30) continue;
    const rect = el.getBoundingClientRect();
    if (rect.x > 260) continue;       // left rail only
    if (rect.width < 80 || rect.width > 260) continue;
    if (rect.height < 24 || rect.height > 80) continue;
    if (rect.y < 80) continue;        // skip top header
    results.push({ text: txt, x: rect.x, y: rect.y, tag: el.tagName });
  }
  // de-dup by text, preserve order
  const seen = new Set();
  return results.filter(r => { if (seen.has(r.text)) return false; seen.add(r.text); return true; });
});

console.log('candidate nav items:', JSON.stringify(navItems, null, 2));

// Click each by text
let idx = 1;
for (const item of navItems) {
  try {
    const btn = page.locator(`text="${item.text}"`).first();
    await btn.click({ timeout: 3000 });
    await page.waitForTimeout(900);
    const safe = item.text.replace(/[^a-z0-9]+/gi, '-').toLowerCase().slice(0, 30);
    await page.screenshot({ path: `${OUT}/${String(idx).padStart(2, '0')}-${safe}.png`, fullPage: true });
    console.log(`saved ${idx} ${item.text}`);
    idx++;
  } catch (e) {
    console.log(`fail "${item.text}":`, e.message.slice(0, 100));
  }
}

await browser.close();
console.log('done, captured', idx - 1, 'panels');

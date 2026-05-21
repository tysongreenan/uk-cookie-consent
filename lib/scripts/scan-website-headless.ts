// Headless browser scanner using Playwright + @sparticuz/chromium on Vercel.
//
// This is the upgrade path from the cheerio-only scanner: it loads the page
// in a real browser, so it sees cookies and scripts that are only present
// after JavaScript runs — which is most of the modern web (SPAs, GTM-loaded
// tags, post-DOM-ready trackers).
//
// On Vercel we use playwright-core (no bundled browsers, ~5 MB) plus
// @sparticuz/chromium-min, which downloads a Lambda-stripped Chromium binary
// from a GitHub release on cold start and caches it in /tmp.
//
// Locally we use the full `playwright` package (devDependency, ships a
// regular Chromium via `npx playwright install`).

import { validatePublicUrl } from '@/lib/url-validation'

const CHROMIUM_PACK_URL =
  'https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.1-pack.tar'

// Wait briefly past `networkidle` so trackers that fire on a setTimeout
// (Hotjar, some pixels) still get captured.
const POST_LOAD_SETTLE_MS = 1500
const NAVIGATION_TIMEOUT_MS = 25000
const TOTAL_TIMEOUT_MS = 35000

// Common selectors used by major CMPs. Used as a DOM-level fallback to the
// script-tag detection so we still flag CMPs that inject their banner via
// the renderer (Cookiebot's #CybotCookiebotDialog, OneTrust's #onetrust-banner-sdk, etc.).
const CMP_DOM_SIGNATURES: { vendor: string; selectors: string[] }[] = [
  { vendor: 'Cookiebot', selectors: ['#CybotCookiebotDialog', '#cookiebanner', '.cookiebot'] },
  { vendor: 'OneTrust', selectors: ['#onetrust-banner-sdk', '#onetrust-consent-sdk', '.onetrust-pc-dark-filter'] },
  { vendor: 'Termly', selectors: ['#termly-code-snippet-support', '.termly-banner'] },
  { vendor: 'CookieYes', selectors: ['#cky-consent', '.cky-consent-bar'] },
  { vendor: 'Iubenda', selectors: ['#iubenda-cs-banner', '.iubenda-cs-default'] },
  { vendor: 'Osano', selectors: ['.osano-cm-dialog', '.osano-cm-window'] },
  { vendor: 'Usercentrics', selectors: ['#usercentrics-root'] },
  { vendor: 'Didomi', selectors: ['#didomi-host', '#didomi-notice'] },
  { vendor: 'TrustArc', selectors: ['#truste-consent-track', '.truste_box_overlay'] },
  { vendor: 'Quantcast Choice', selectors: ['.qc-cmp-ui-container', '.qc-cmp2-container'] },
]

// Known tracker domains. Matched against every captured network request so
// we detect tags loaded after page load — the cheerio scan can't see these.
const TRACKER_DOMAINS: { name: string; category: 'tracking-performance' | 'targeting-advertising' | 'functionality'; patterns: RegExp[] }[] = [
  { name: 'Google Analytics 4', category: 'tracking-performance', patterns: [/googletagmanager\.com\/gtag\/js/, /google-analytics\.com\/g\/collect/] },
  { name: 'Google Analytics (Universal)', category: 'tracking-performance', patterns: [/google-analytics\.com\/analytics\.js/, /google-analytics\.com\/collect/, /google-analytics\.com\/ga\.js/] },
  { name: 'Google Tag Manager', category: 'tracking-performance', patterns: [/googletagmanager\.com\/gtm\.js/, /googletagmanager\.com\/gtag\/destination/] },
  { name: 'Google Ads', category: 'targeting-advertising', patterns: [/googleadservices\.com/, /googlesyndication\.com/, /doubleclick\.net/] },
  { name: 'Facebook Pixel', category: 'targeting-advertising', patterns: [/connect\.facebook\.net\/.*\/fbevents\.js/, /facebook\.com\/tr/] },
  { name: 'Microsoft Clarity', category: 'tracking-performance', patterns: [/clarity\.ms/] },
  { name: 'Hotjar', category: 'tracking-performance', patterns: [/static\.hotjar\.com/, /script\.hotjar\.com/, /vars\.hotjar\.com/] },
  { name: 'LinkedIn Insight Tag', category: 'targeting-advertising', patterns: [/snap\.licdn\.com\/li\.lms-analytics/, /px\.ads\.linkedin\.com/] },
  { name: 'TikTok Pixel', category: 'targeting-advertising', patterns: [/analytics\.tiktok\.com/, /tr\.tiktok\.com/] },
  { name: 'Intercom', category: 'functionality', patterns: [/widget\.intercom\.io/, /api-iam\.intercom\.io/] },
  { name: 'Zendesk Chat', category: 'functionality', patterns: [/zdassets\.com/, /zopim\.com/] },
  { name: 'Segment', category: 'tracking-performance', patterns: [/cdn\.segment\.com/, /api\.segment\.io/] },
  { name: 'Mixpanel', category: 'tracking-performance', patterns: [/cdn\.mxpnl\.com/, /api\.mixpanel\.com/] },
  { name: 'Amplitude', category: 'tracking-performance', patterns: [/cdn\.amplitude\.com/, /api\.amplitude\.com/] },
  { name: 'Pinterest Tag', category: 'targeting-advertising', patterns: [/s\.pinimg\.com\/ct/, /ct\.pinterest\.com/] },
  { name: 'Snap Pixel', category: 'targeting-advertising', patterns: [/sc-static\.net\/scevent/, /tr\.snapchat\.com/] },
  { name: 'Twitter/X Pixel', category: 'targeting-advertising', patterns: [/static\.ads-twitter\.com/, /analytics\.twitter\.com/] },
  { name: 'Reddit Pixel', category: 'targeting-advertising', patterns: [/redditstatic\.com\/ads/, /events\.redditmedia\.com/] },
]

export interface BrowserCookie {
  name: string
  value: string
  domain: string
  path: string
  expires: number // -1 for session cookies
  httpOnly: boolean
  secure: boolean
  sameSite: 'Strict' | 'Lax' | 'None'
}

export interface HeadlessScanResult {
  cookies: BrowserCookie[]
  loadedScripts: { name: string; category: 'tracking-performance' | 'targeting-advertising' | 'functionality'; url: string }[]
  thirdPartyRequests: { domain: string; count: number }[]
  consentBanner: { detected: boolean; vendor: string | null }
  privacyPolicyUrl: string | null
  finalUrl: string
}

async function launchBrowser(): Promise<any> {
  // Detect Vercel/Lambda environment. In dev, fall back to the full
  // `playwright` package which bundles its own browsers via
  // `npx playwright install`.
  const isServerless = !!process.env.VERCEL_ENV || !!process.env.AWS_LAMBDA_FUNCTION_NAME

  if (isServerless) {
    const playwrightCore: any = await import('playwright-core')
    const sparticuz: any = await import('@sparticuz/chromium-min')
    const chromium = sparticuz.default ?? sparticuz

    return playwrightCore.chromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(CHROMIUM_PACK_URL),
      headless: true,
    })
  }

  // Local dev: try playwright first, fall back to playwright-core with a
  // system browser if playwright isn't installed.
  try {
    const playwright: any = await import('playwright')
    return playwright.chromium.launch({ headless: true })
  } catch {
    const playwrightCore: any = await import('playwright-core')
    return playwrightCore.chromium.launch({ headless: true })
  }
}

function detectScriptFromUrl(url: string) {
  for (const tracker of TRACKER_DOMAINS) {
    if (tracker.patterns.some(rx => rx.test(url))) {
      return { name: tracker.name, category: tracker.category }
    }
  }
  return null
}

function normalizeSameSite(value: string | undefined): 'Strict' | 'Lax' | 'None' {
  const v = (value || '').toLowerCase()
  if (v === 'strict') return 'Strict'
  if (v === 'none') return 'None'
  return 'Lax'
}

export async function scanWithBrowser(targetUrl: string): Promise<HeadlessScanResult> {
  const url = new URL(targetUrl)
  await validatePublicUrl(url)

  const browser = await launchBrowser()
  const requestUrls = new Set<string>()
  const thirdPartyDomainCounts = new Map<string, number>()

  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Linux; CookieBannerBot/1.0; +https://uk-cookie-consent.com/bot)',
      viewport: { width: 1280, height: 800 },
    })

    const page = await context.newPage()

    page.on('request', (req: any) => {
      const reqUrl = req.url()
      requestUrls.add(reqUrl)
      try {
        const reqHost = new URL(reqUrl).hostname
        if (reqHost && reqHost !== url.hostname && !reqHost.endsWith('.' + url.hostname)) {
          thirdPartyDomainCounts.set(reqHost, (thirdPartyDomainCounts.get(reqHost) ?? 0) + 1)
        }
      } catch {
        // Ignore non-URL requests (data:, blob:, etc.)
      }
    })

    // Hard cap the whole operation — a slow site shouldn't blow our Vercel
    // function budget.
    const overall = setTimeout(() => {
      page.close().catch(() => {})
    }, TOTAL_TIMEOUT_MS)

    try {
      const response = await page.goto(targetUrl, {
        waitUntil: 'networkidle',
        timeout: NAVIGATION_TIMEOUT_MS,
      })

      if (!response) {
        throw new Error('No response from target site')
      }

      await page.waitForTimeout(POST_LOAD_SETTLE_MS)
    } finally {
      clearTimeout(overall)
    }

    const cookies: BrowserCookie[] = (await context.cookies()).map((c: any) => ({
      name: c.name,
      value: c.value,
      domain: c.domain,
      path: c.path,
      expires: c.expires ?? -1,
      httpOnly: !!c.httpOnly,
      secure: !!c.secure,
      sameSite: normalizeSameSite(c.sameSite),
    }))

    // Network-based script detection — finds anything that actually loaded.
    const seen = new Set<string>()
    const loadedScripts: HeadlessScanResult['loadedScripts'] = []
    for (const reqUrl of requestUrls) {
      const match = detectScriptFromUrl(reqUrl)
      if (match && !seen.has(match.name)) {
        seen.add(match.name)
        loadedScripts.push({ ...match, url: reqUrl })
      }
    }

    // DOM-level CMP detection. More reliable than script-tag matching because
    // it catches CMPs whose script is dynamically injected by GTM or a tag manager.
    let consentBanner: HeadlessScanResult['consentBanner'] = { detected: false, vendor: null }
    for (const sig of CMP_DOM_SIGNATURES) {
      const found = await page.evaluate(
        (selectors: string[]) => selectors.some(sel => !!document.querySelector(sel)),
        sig.selectors,
      )
      if (found) {
        consentBanner = { detected: true, vendor: sig.vendor }
        break
      }
    }

    // Privacy policy link — same idea as the cheerio version but works on the
    // rendered DOM, so it catches policies in client-rendered footers.
    const privacyPolicyUrl: string | null = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[]
      const match = links.find(a => {
        const text = (a.textContent || '').trim().toLowerCase()
        const href = a.getAttribute('href') || ''
        return (/privacy|cookie policy|cookie-policy/.test(text) || /\/privacy|privacy-policy|cookie-policy|cookies/.test(href.toLowerCase())) && !!href
      })
      return match ? match.href : null
    })

    const thirdPartyRequests = Array.from(thirdPartyDomainCounts.entries())
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20)

    return {
      cookies,
      loadedScripts,
      thirdPartyRequests,
      consentBanner,
      privacyPolicyUrl,
      finalUrl: page.url(),
    }
  } finally {
    await browser.close().catch(() => {})
  }
}

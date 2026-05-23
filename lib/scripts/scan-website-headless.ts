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

// Wait past initial load so consent banners and trackers that fire on
// setTimeout (Hotjar, some pixels) get captured.
const POST_LOAD_SETTLE_MS = 3000
// After accepting consent, wait for downstream tags (GA4, FB Pixel, etc.)
// to actually fire. Many fire on the next microtask, some on a timer.
const POST_CONSENT_SETTLE_MS = 4000
const NAVIGATION_TIMEOUT_MS = 30000
const TOTAL_TIMEOUT_MS = 55000

// Selectors used to click an "Accept All" button on the major CMPs we
// already detect via CMP_DOM_SIGNATURES. Each entry is tried in order with
// a short timeout; we stop after the first successful click.
//
// The list is intentionally broad — false-positive clicks (e.g., clicking
// a non-CMP button) are unlikely because the selectors are vendor-specific.
// We exclude generic selectors like `.accept-all` that could match arbitrary
// UI on the site.
const CONSENT_ACCEPT_SELECTORS: { vendor: string; selectors: string[] }[] = [
  // Cookiebot
  { vendor: 'Cookiebot', selectors: [
    '#CybotCookiebotDialogBodyButtonAccept',
    '#CybotCookiebotDialogBodyLevelButtonAccept',
    '#CybotCookiebotDialogBodyLevelButtonAcceptAll',
  ]},
  // OneTrust
  { vendor: 'OneTrust', selectors: [
    '#onetrust-accept-btn-handler',
    'button.onetrust-close-btn-handler.banner-close-button',
    '.save-preference-btn-handler.onetrust-close-btn-handler',
  ]},
  // CookieYes
  { vendor: 'CookieYes', selectors: [
    'button.cky-btn-accept',
    'button[data-cky-tag="accept-button"]',
  ]},
  // Termly
  { vendor: 'Termly', selectors: [
    'button[data-tid="banner-accept"]',
    '#termly-code-snippet-support button[data-tid="banner-accept"]',
  ]},
  // Iubenda
  { vendor: 'Iubenda', selectors: [
    '.iubenda-cs-accept-btn',
    '#iubenda-cs-accept-btn',
  ]},
  // Osano
  { vendor: 'Osano', selectors: [
    '.osano-cm-accept-all',
    'button.osano-cm-button--type_accept',
  ]},
  // Didomi
  { vendor: 'Didomi', selectors: [
    '#didomi-notice-agree-button',
    'button.didomi-components-button--standard',
  ]},
  // Usercentrics
  { vendor: 'Usercentrics', selectors: [
    'button[data-testid="uc-accept-all-button"]',
    '#uc-btn-accept-banner',
  ]},
  // Quantcast Choice
  { vendor: 'Quantcast Choice', selectors: [
    '.qc-cmp2-summary-buttons button[mode="primary"]',
    'button.css-1k77ggk',
  ]},
  // TrustArc
  { vendor: 'TrustArc', selectors: [
    '#truste-consent-button',
    'a.call',
  ]},
  // Sourcepoint
  { vendor: 'Sourcepoint', selectors: [
    'button.sp_choice_type_11',
    'button[title*="Accept All" i]',
  ]},
  // Complianz
  { vendor: 'Complianz', selectors: [
    '.cmplz-btn.cmplz-accept',
    '.cc-btn.cc-accept-all',
  ]},
  // Generic text-based fallback for unknown CMPs (matched in evaluate())
]

// Last-resort heuristic for unknown CMPs: find any visible button whose
// text matches a common Accept-All phrase. Conservative to avoid mis-clicks.
// Localized patterns matter for Quebec (Law 25) and EU sites — many sites
// serve the banner in the user's locale.
const ACCEPT_BUTTON_TEXT_PATTERNS = [
  // English
  /^accept all\b/i,
  /^accept cookies?\b/i,
  /^accept & continue\b/i,
  /^allow all\b/i,
  /^agree (to all|and continue)\b/i,
  /^i (accept|agree)\b/i,
  /^got it\b/i,
  /^ok,? got it\b/i,
  // French (Quebec Law 25, EU)
  /^accepter (tout|tous)\b/i,
  /^tout accepter\b/i,
  /^j['']accepte\b/i,
  /^accepter (les cookies?|et continuer)\b/i,
  // Spanish
  /^aceptar (todo|todas)\b/i,
  // German
  /^alle akzeptieren\b/i,
  /^akzeptieren\b/i,
  // Italian
  /^accetta (tutto|tutti)\b/i,
  // Dutch
  /^alles accepteren\b/i,
  /^akkoord\b/i,
  // Portuguese
  /^aceitar (tudo|todos)\b/i,
]

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

export interface FrenchLanguageCheck {
  available: boolean
  signals: string[]
}

export interface HeadlessScanResult {
  cookies: BrowserCookie[]
  loadedScripts: { name: string; category: 'tracking-performance' | 'targeting-advertising' | 'functionality'; url: string; firedAfterConsent: boolean }[]
  thirdPartyRequests: { domain: string; count: number }[]
  consentBanner: { detected: boolean; vendor: string | null }
  /** Whether we successfully clicked an Accept-All button. */
  consentAccepted: { attempted: boolean; vendor: string | null }
  privacyPolicyUrl: string | null
  frenchLanguage: FrenchLanguageCheck
  finalUrl: string
  ourBannerId: string | null
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

    // @sparticuz/chromium-min downloads the chromium binary AND its shared
    // libraries (libnss3.so, libnssutil3.so, etc.) into /tmp. Playwright
    // spawns chromium as a child process; the new process needs
    // LD_LIBRARY_PATH=/tmp to find those .so files. Without this we hit:
    //   /tmp/chromium: error while loading shared libraries:
    //   libnss3.so: cannot open shared object file
    // (This is the workaround documented in the Sparticuz/chromium README
    // for Playwright integration.)
    const executablePath = await chromium.executablePath(CHROMIUM_PACK_URL)
    const tmpDir = executablePath.substring(0, executablePath.lastIndexOf('/'))
    process.env.LD_LIBRARY_PATH = process.env.LD_LIBRARY_PATH
      ? `${tmpDir}:${process.env.LD_LIBRARY_PATH}`
      : tmpDir

    return playwrightCore.chromium.launch({
      args: chromium.args,
      executablePath,
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

/**
 * Try to click an "Accept All" button on a consent banner. Returns the
 * vendor whose selector matched (or 'Generic' for the text-pattern
 * fallback), and `attempted: true` if we clicked anything.
 *
 * Each click is fire-and-forget — we don't validate that consent was
 * actually accepted. The caller waits POST_CONSENT_SETTLE_MS after which
 * any downstream tags should have fired.
 */
async function tryAcceptConsent(page: any): Promise<{ vendor: string | null; attempted: boolean }> {
  for (const cmp of CONSENT_ACCEPT_SELECTORS) {
    for (const selector of cmp.selectors) {
      try {
        // waitFor with very short timeout — we don't want to add latency
        // if no banner is present.
        const el = await page.waitForSelector(selector, { timeout: 500, state: 'visible' })
        if (el) {
          await el.click({ timeout: 2000, force: false }).catch(() => {})
          return { vendor: cmp.vendor, attempted: true }
        }
      } catch {
        // Selector not present or not clickable — try next.
      }
    }
  }

  // Text-pattern fallback for unknown CMPs.
  const clicked = await page.evaluate((patternSources: string[]) => {
    const patterns = patternSources.map(src => new RegExp(src.slice(1, src.lastIndexOf('/')), src.slice(src.lastIndexOf('/') + 1)))
    const candidates = Array.from(document.querySelectorAll('button, a[role="button"], [role="button"]')) as HTMLElement[]
    for (const el of candidates) {
      const text = (el.textContent || '').trim()
      if (!text || text.length > 40) continue
      const rect = el.getBoundingClientRect()
      if (rect.width < 30 || rect.height < 20) continue
      const style = window.getComputedStyle(el)
      if (style.visibility === 'hidden' || style.display === 'none') continue
      if (patterns.some(p => p.test(text))) {
        // Heuristic guard: only click if the element sits inside something
        // that looks like a cookie/consent banner. Walk up to the body.
        let parent: HTMLElement | null = el.parentElement
        for (let depth = 0; depth < 8 && parent; depth++) {
          const id = parent.id || ''
          const cls = parent.className || ''
          if (/cookie|consent|gdpr|privacy|banner|notice/i.test(id) || /cookie|consent|gdpr|privacy|banner|notice/i.test(cls)) {
            ;(el as HTMLElement).click()
            return true
          }
          parent = parent.parentElement
        }
      }
    }
    return false
  }, ACCEPT_BUTTON_TEXT_PATTERNS.map(p => p.toString()))

  if (clicked) {
    return { vendor: 'Generic', attempted: true }
  }

  return { vendor: null, attempted: false }
}

export async function scanWithBrowser(targetUrl: string): Promise<HeadlessScanResult> {
  const url = new URL(targetUrl)
  await validatePublicUrl(url)

  const browser = await launchBrowser()
  const requestUrls = new Set<string>()
  const thirdPartyDomainCounts = new Map<string, number>()

  try {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
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

    let consentAccepted: { vendor: string | null; attempted: boolean } = { vendor: null, attempted: false }
    let requestsBeforeConsent = 0

    try {
      const response = await page.goto(targetUrl, {
        waitUntil: 'load',
        timeout: NAVIGATION_TIMEOUT_MS,
      })

      if (!response) {
        throw new Error('No response from target site')
      }

      await page.waitForTimeout(POST_LOAD_SETTLE_MS)

      // Snapshot how many requests we've seen pre-consent — used later to
      // compute what was newly fired AFTER we clicked accept.
      requestsBeforeConsent = requestUrls.size

      // --- Auto-click consent ---
      // If a consent banner is gating downstream tracking (the typical
      // setup with OneTrust / Cookiebot / Termly etc.), the pre-consent
      // network observation will only see the CMP itself + GTM. To see
      // the actual tags GTM is configured to fire, we need to consent.
      consentAccepted = await tryAcceptConsent(page)

      if (consentAccepted.attempted) {
        // Wait for downstream tags to fire after consent.
        await page.waitForTimeout(POST_CONSENT_SETTLE_MS)
      }
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
    // We split the captured requests at the consent-click boundary so the
    // UI can show which tags only fired AFTER consent was granted.
    const seen = new Set<string>()
    const loadedScripts: HeadlessScanResult['loadedScripts'] = []
    const allRequests = Array.from(requestUrls)
    for (let i = 0; i < allRequests.length; i++) {
      const reqUrl = allRequests[i]
      const match = detectScriptFromUrl(reqUrl)
      if (match && !seen.has(match.name)) {
        seen.add(match.name)
        loadedScripts.push({
          ...match,
          url: reqUrl,
          firedAfterConsent: i >= requestsBeforeConsent && consentAccepted.attempted,
        })
      }
    }

    // --- Consent banner detection (layered: DOM selectors → CMP APIs → network scripts → iframe → generic heuristic) ---
    let consentBanner: HeadlessScanResult['consentBanner'] = { detected: false, vendor: null }

    // Layer 1: Known CMP DOM selectors
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

    // Layer 2: IAB TCF / CMP JavaScript APIs (works even when the banner is
    // inside an iframe or shadow DOM — the API is always on the top window)
    if (!consentBanner.detected) {
      const cmpApi = await page.evaluate(() => {
        const w = window as any
        if (typeof w.__tcfapi === 'function') return 'IAB TCF v2'
        if (typeof w.__cmp === 'function') return 'IAB CMP v1'
        if (typeof w.__uspapi === 'function') return 'USP API (CCPA)'
        if (typeof w.__gpp === 'function') return 'IAB GPP'
        return null
      })
      if (cmpApi) {
        consentBanner = { detected: true, vendor: cmpApi }
      }
    }

    // Layer 3: Known CMP script URLs in network requests
    if (!consentBanner.detected) {
      const CMP_NETWORK_PATTERNS: { vendor: string; pattern: RegExp }[] = [
        { vendor: 'Sourcepoint', pattern: /sourcepoint.*?\.js|cdn\.privacy-mgmt\.com/i },
        { vendor: 'Cookiebot', pattern: /consent\.cookiebot\.com/i },
        { vendor: 'OneTrust', pattern: /cdn\.cookielaw\.org|optanon/i },
        { vendor: 'TrustArc', pattern: /consent\.trustarc\.com|consent-pref\.trustarc\.com/i },
        { vendor: 'Didomi', pattern: /sdk\.privacy-center\.org|cdn\.didomi\.io/i },
        { vendor: 'Quantcast Choice', pattern: /quantcast\.mgr\.consensu\.org|cmp\.quantcast\.com/i },
        { vendor: 'CookieYes', pattern: /cdn-cookieyes\.com/i },
        { vendor: 'Iubenda', pattern: /cdn\.iubenda\.com\/cs/i },
        { vendor: 'Osano', pattern: /cmp\.osano\.com/i },
        { vendor: 'Usercentrics', pattern: /app\.usercentrics\.eu/i },
        { vendor: 'Termly', pattern: /app\.termly\.io\/resource-blocker/i },
        { vendor: 'Complianz', pattern: /complianz/i },
        { vendor: 'UK Cookie Consent', pattern: /cookie-banner\.ca|cookie-consent.*?banner/i },
      ]
      for (const reqUrl of Array.from(requestUrls)) {
        for (const cmp of CMP_NETWORK_PATTERNS) {
          if (cmp.pattern.test(reqUrl)) {
            consentBanner = { detected: true, vendor: cmp.vendor }
            break
          }
        }
        if (consentBanner.detected) break
      }
    }

    // Extract our banner ID if UK Cookie Consent was detected via network
    let ourBannerId: string | null = null
    const uuidRegex = /[?&]id=([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})/i
    const allRequestUrls = Array.from(requestUrls)
    for (let ri = 0; ri < allRequestUrls.length; ri++) {
      const reqUrlStr = allRequestUrls[ri]
      if (/cookie-banner\.ca|cookie-consent.*?banner/i.test(reqUrlStr)) {
        const uuidMatch = reqUrlStr.match(uuidRegex)
        if (uuidMatch) {
          ourBannerId = uuidMatch[1]
          break
        }
      }
    }

    // Layer 4: CMP iframes (Sourcepoint, OneTrust, etc. often render inside an iframe)
    if (!consentBanner.detected) {
      const iframeCmp = await page.evaluate(() => {
        const iframes = document.querySelectorAll('iframe')
        const cmpPatterns = [
          { vendor: 'Sourcepoint', pattern: /privacy-mgmt\.com|sp_message/i },
          { vendor: 'OneTrust', pattern: /cookielaw\.org|onetrust/i },
          { vendor: 'TrustArc', pattern: /trustarc\.com/i },
          { vendor: 'Didomi', pattern: /didomi\.io/i },
        ]
        for (const iframe of Array.from(iframes)) {
          const src = iframe.getAttribute('src') || ''
          const id = iframe.getAttribute('id') || ''
          const title = iframe.getAttribute('title') || ''
          const combined = `${src} ${id} ${title}`
          for (const cmp of cmpPatterns) {
            if (cmp.pattern.test(combined)) return cmp.vendor
          }
          if (/consent|cookie|privacy|gdpr/i.test(combined)) return 'Custom / Unknown'
        }
        return null
      })
      if (iframeCmp) {
        consentBanner = { detected: true, vendor: iframeCmp }
      }
    }

    // Generic heuristic: if no known CMP matched, look for any element that
    // looks like a consent/cookie banner based on text content, id/class
    // patterns, and ARIA roles. This catches custom/first-party banners.
    if (!consentBanner.detected) {
      const genericDetected = await page.evaluate(() => {
        const keywords = /\b(cookie|consent|gdpr|privacy|accept all|reject all|manage cookies|cookie preferences|we use cookies|this site uses cookies)\b/i
        const idClassPattern = /cookie|consent|gdpr|privacy-banner|cc-banner|cc_banner|notice-banner/i

        // Check elements with suggestive IDs or classes that are visible
        const allEls = document.querySelectorAll('[id], [class], [role="dialog"], [role="banner"], [role="alertdialog"]')
        for (const el of Array.from(allEls)) {
          const id = el.getAttribute('id') || ''
          const cls = el.getAttribute('class') || ''
          const role = el.getAttribute('role') || ''
          const hasConsentAttr = idClassPattern.test(id) || idClassPattern.test(cls)
          const hasDialogRole = role === 'dialog' || role === 'alertdialog'

          if (!hasConsentAttr && !hasDialogRole) continue

          const rect = el.getBoundingClientRect()
          const isVisible = rect.width > 0 && rect.height > 0
          if (!isVisible) continue

          const text = (el.textContent || '').slice(0, 500)
          if (keywords.test(text)) return true
        }

        // Last resort: look for any fixed/sticky positioned element with cookie-related text
        const positioned = document.querySelectorAll('*')
        for (const el of Array.from(positioned)) {
          const style = window.getComputedStyle(el)
          if (style.position !== 'fixed' && style.position !== 'sticky') continue
          const rect = el.getBoundingClientRect()
          if (rect.width < 200 || rect.height < 40) continue
          const text = (el.textContent || '').slice(0, 500)
          if (keywords.test(text)) return true
        }

        return false
      })

      if (genericDetected) {
        consentBanner = { detected: true, vendor: 'Custom / Unknown' }
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

    // French language availability check (Law 25 requirement for Quebec).
    // We check the current page for signals, then optionally follow a French
    // hreflang or language-switcher link to verify it actually works.
    const frenchLanguage: FrenchLanguageCheck = await page.evaluate(() => {
      const signals: string[] = []

      // 1. Page itself is in French
      const htmlLang = (document.documentElement.getAttribute('lang') || '').toLowerCase()
      if (htmlLang === 'fr' || htmlLang.startsWith('fr-')) {
        signals.push(`Page language is French (lang="${htmlLang}")`)
      }

      // 2. hreflang alternate pointing to a French version
      const hreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]')
      for (const link of Array.from(hreflangs)) {
        const hl = (link.getAttribute('hreflang') || '').toLowerCase()
        if (hl === 'fr' || hl.startsWith('fr-') || hl === 'fr-ca') {
          signals.push(`French hreflang alternate found: ${link.getAttribute('href')}`)
        }
      }

      // 3. Language switcher link (common patterns: /fr, ?lang=fr, text "Français")
      const allLinks = Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[]
      const frLink = allLinks.find(a => {
        const text = (a.textContent || '').trim().toLowerCase()
        const href = (a.getAttribute('href') || '').toLowerCase()
        return (
          text === 'français' || text === 'french' || text === 'fr' ||
          /[?&]lang=fr/i.test(href) ||
          /\/(fr)\/?$/i.test(href) ||
          /\/(fr-ca)\/?$/i.test(href)
        )
      })
      if (frLink) {
        signals.push(`French language switcher found: "${frLink.textContent?.trim()}" → ${frLink.href}`)
      }

      // 4. Content-Language meta tag
      const contentLang = document.querySelector('meta[http-equiv="content-language"]')
      if (contentLang) {
        const val = (contentLang.getAttribute('content') || '').toLowerCase()
        if (val.includes('fr')) {
          signals.push(`Content-Language meta includes French: ${val}`)
        }
      }

      // 5. Check if the consent banner itself has French translations
      // (e.g., UK Cookie Consent auto-detects browser language and includes
      // built-in French translations for the consent notice)
      const scripts = document.querySelectorAll('script[src]')
      for (const script of Array.from(scripts)) {
        const src = (script.getAttribute('src') || '').toLowerCase()
        if (/cookie-banner\.ca|cookie-consent.*banner/i.test(src)) {
          signals.push('Cookie consent banner (UK Cookie Consent) includes built-in French translations with browser language auto-detection')
          break
        }
      }
      // Also check inline scripts for French consent translations
      if (!signals.some(s => s.includes('consent banner'))) {
        const inlineScripts = document.querySelectorAll('script:not([src])')
        for (const script of Array.from(inlineScripts)) {
          const content = (script.textContent || '').slice(0, 5000)
          if (/TRANSLATIONS.*["']fr["']\s*:/.test(content) || /detectLanguage.*startsWith\(["']fr["']\)/.test(content)) {
            signals.push('Consent banner includes French language translations with auto-detection')
            break
          }
        }
      }

      return { available: signals.length > 0, signals }
    })

    // If we found a French hreflang or language switcher but the page itself
    // isn't French, navigate to the French version and verify it loads.
    if (frenchLanguage.available && frenchLanguage.signals.some(s => s.includes('hreflang') || s.includes('switcher'))) {
      const frUrl = await page.evaluate(() => {
        // Prefer hreflang link
        const hreflang = document.querySelector('link[rel="alternate"][hreflang^="fr"]') as HTMLLinkElement | null
        if (hreflang?.href) return hreflang.href

        // Fall back to language switcher
        const allLinks = Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[]
        const frLink = allLinks.find(a => {
          const text = (a.textContent || '').trim().toLowerCase()
          return text === 'français' || text === 'french' || text === 'fr'
        })
        return frLink?.href || null
      })

      if (frUrl) {
        try {
          const frResponse = await page.goto(frUrl, { waitUntil: 'load', timeout: 15000 })
          if (frResponse && frResponse.ok()) {
            const frPageLang = await page.evaluate(() =>
              (document.documentElement.getAttribute('lang') || '').toLowerCase()
            )
            if (frPageLang === 'fr' || frPageLang.startsWith('fr-')) {
              frenchLanguage.signals.push(`Verified: French page loaded successfully (lang="${frPageLang}")`)
            } else {
              frenchLanguage.signals.push(`French URL loaded but page lang="${frPageLang}" — may not be fully translated`)
            }
          }
        } catch {
          frenchLanguage.signals.push('French URL found but failed to load — may be broken')
        }
      }
    }

    const thirdPartyRequests = Array.from(thirdPartyDomainCounts.entries())
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20)

    return {
      cookies,
      loadedScripts,
      thirdPartyRequests,
      consentBanner,
      consentAccepted,
      privacyPolicyUrl,
      frenchLanguage,
      finalUrl: page.url(),
      ourBannerId,
    }
  } finally {
    await browser.close().catch(() => {})
  }
}

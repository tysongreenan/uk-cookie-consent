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
const NAVIGATION_TIMEOUT_MS = 30000
const TOTAL_TIMEOUT_MS = 45000

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
  loadedScripts: { name: string; category: 'tracking-performance' | 'targeting-advertising' | 'functionality'; url: string }[]
  thirdPartyRequests: { domain: string; count: number }[]
  consentBanner: { detected: boolean; vendor: string | null }
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

    try {
      const response = await page.goto(targetUrl, {
        waitUntil: 'load',
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
    for (const reqUrl of Array.from(requestUrls)) {
      const match = detectScriptFromUrl(reqUrl)
      if (match && !seen.has(match.name)) {
        seen.add(match.name)
        loadedScripts.push({ ...match, url: reqUrl })
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
      privacyPolicyUrl,
      frenchLanguage,
      finalUrl: page.url(),
      ourBannerId,
    }
  } finally {
    await browser.close().catch(() => {})
  }
}

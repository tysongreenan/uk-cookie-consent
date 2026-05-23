// Smoke tests for the Playwright headless launcher.
//
// These exercise REAL chromium — slow (~5-10s) and require the browser
// binary to be installed (`npx playwright install chromium`). They're
// kept out of the default `npm test` run via the `.smoke.test.ts` suffix
// and the exclude rule in vitest.config.ts. Run them with:
//
//     npm run test:smoke
//
// What we're guarding against:
//   - the chromium binary failing to launch (libnss3 missing, wrong
//     executablePath, etc. — the kind of thing that only shows up at
//     runtime in production)
//   - the consent-click selector list silently going stale because a
//     vendor changed their accept-button DOM
//   - the network-request observer no longer firing during page.goto

import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import { launchBrowser, tryAcceptConsent } from '../scan-website-headless'

// Each test launches its own browser instead of sharing one. Slightly
// slower but each failure is isolated and the cleanup is dead simple.
async function withBrowser<T>(fn: (browser: any) => Promise<T>): Promise<T> {
  const browser = await launchBrowser()
  try {
    return await fn(browser)
  } finally {
    await browser.close().catch(() => {})
  }
}

describe('launchBrowser (smoke)', () => {
  it('launches chromium without the libnss3 / executablePath errors that broke production', async () => {
    await withBrowser(async (browser) => {
      const context = await browser.newContext()
      const page = await context.newPage()
      // about:blank is enough — we're proving the binary runs at all.
      await page.goto('about:blank')
      const title = await page.title()
      expect(typeof title).toBe('string')
    })
  }, 30_000)

  it('captures network requests fired during page load', async () => {
    await withBrowser(async (browser) => {
      const context = await browser.newContext()
      const page = await context.newPage()

      const requestedUrls: string[] = []
      page.on('request', (req: any) => requestedUrls.push(req.url()))

      // A page that loads a few sub-resources we can confidently observe.
      // data: URLs are special-cased — the inline script triggers an XHR
      // back to itself, which won't actually be a separate request. So
      // instead we load a static external resource that's reliably alive.
      const html = `
        <!doctype html>
        <html>
          <head>
            <title>net-observer-test</title>
            <script src="https://www.googletagmanager.com/gtag/js?id=G-TESTONLY"></script>
          </head>
          <body><p>hello</p></body>
        </html>
      `
      await page.goto(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`, {
        waitUntil: 'networkidle',
        timeout: 15_000,
      }).catch(() => {
        // Network may not go fully idle — fine, requests still recorded.
      })

      const sawGtm = requestedUrls.some(u => u.includes('googletagmanager.com/gtag/js'))
      expect(sawGtm).toBe(true)
    })
  }, 30_000)
})

describe('tryAcceptConsent (smoke)', () => {
  // Each scenario loads a tiny page that simulates a specific CMP's
  // accept-button DOM, then asserts our auto-click logic fires and
  // identifies the vendor correctly.
  const scenarios: { vendor: string; html: string }[] = [
    {
      vendor: 'OneTrust',
      html: `<button id="onetrust-accept-btn-handler" style="position:fixed;bottom:20px;right:20px;width:200px;height:50px">Accept</button>`,
    },
    {
      vendor: 'Cookiebot',
      html: `<button id="CybotCookiebotDialogBodyButtonAccept" style="position:fixed;bottom:20px;right:20px;width:200px;height:50px">Accept</button>`,
    },
    {
      vendor: 'CookieYes',
      html: `<button class="cky-btn-accept" style="position:fixed;bottom:20px;right:20px;width:200px;height:50px">Accept</button>`,
    },
    {
      vendor: 'Iubenda',
      html: `<button class="iubenda-cs-accept-btn" style="position:fixed;bottom:20px;right:20px;width:200px;height:50px">Accept</button>`,
    },
    {
      vendor: 'Osano',
      html: `<button class="osano-cm-accept-all" style="position:fixed;bottom:20px;right:20px;width:200px;height:50px">Accept</button>`,
    },
    {
      vendor: 'Didomi',
      html: `<button id="didomi-notice-agree-button" style="position:fixed;bottom:20px;right:20px;width:200px;height:50px">Accept</button>`,
    },
  ]

  for (const { vendor, html } of scenarios) {
    it(`clicks the ${vendor} accept-all button via its known selector`, async () => {
      await withBrowser(async (browser) => {
        const page = await (await browser.newContext()).newPage()
        const fullHtml = `<!doctype html><html><body>${html}</body></html>`
        await page.goto(`data:text/html;charset=utf-8,${encodeURIComponent(fullHtml)}`)

        // Confirm the button is visible BEFORE the click attempt — sanity
        // check that the test fixture itself is wired correctly.
        const visibleBefore = await page.evaluate(() => {
          const el = document.querySelector('button')
          if (!el) return false
          const r = el.getBoundingClientRect()
          return r.width > 0 && r.height > 0
        })
        expect(visibleBefore).toBe(true)

        const result = await tryAcceptConsent(page)
        expect(result.attempted).toBe(true)
        expect(result.vendor).toBe(vendor)
      })
    }, 30_000)
  }

  // Generic / unknown CMPs hit the text-pattern fallback. The button must
  // sit inside an element whose id/class hints at consent, otherwise we
  // refuse to click (anti-mis-click guard).
  it('falls back to the text-pattern matcher when no vendor selector matches', async () => {
    await withBrowser(async (browser) => {
      const page = await (await browser.newContext()).newPage()
      const html = `
        <!doctype html><html><body>
          <div id="custom-cookie-banner" style="position:fixed;bottom:0;left:0;right:0;height:80px;background:#000">
            <button class="totally-custom-button" style="width:200px;height:40px">Accept All</button>
          </div>
        </body></html>
      `
      await page.goto(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`)

      const result = await tryAcceptConsent(page)
      expect(result.attempted).toBe(true)
      expect(result.vendor).toBe('Generic')
    })
  }, 30_000)

  it('does NOT click an Accept All button that lives outside any consent-banner-looking container', async () => {
    // Guards against the text-pattern fallback being too aggressive: any
    // random "Accept All" button on the page must not be clicked unless
    // its ancestry suggests it's in a consent banner.
    await withBrowser(async (browser) => {
      const page = await (await browser.newContext()).newPage()
      const html = `
        <!doctype html><html><body>
          <div id="some-unrelated-ui" style="padding:50px">
            <button class="random-btn" style="width:200px;height:40px">Accept All</button>
          </div>
        </body></html>
      `
      await page.goto(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`)

      const result = await tryAcceptConsent(page)
      expect(result.attempted).toBe(false)
    })
  }, 30_000)

  it('reports attempted=false when no banner is on the page at all', async () => {
    await withBrowser(async (browser) => {
      const page = await (await browser.newContext()).newPage()
      const html = `<!doctype html><html><body><p>Nothing to consent to here.</p></body></html>`
      await page.goto(`data:text/html;charset=utf-8,${encodeURIComponent(html)}`)

      const result = await tryAcceptConsent(page)
      expect(result.attempted).toBe(false)
      expect(result.vendor).toBeNull()
    })
  }, 30_000)
})

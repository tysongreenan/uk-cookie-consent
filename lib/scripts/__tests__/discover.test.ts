// Regression tests for the cheerio + first-party bundle scanner.
//
// The biggest wins here are false-positive guards: vendor patterns that
// looked too narrow in isolation (/hj\(/, /ga\(/) matched extremely common
// minifier output and produced bogus detections on any GTM-running site.

import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock fetchSafe so tests don't make real network calls. The mock returns
// different content per URL via a small registry.
const fetchResponses = new Map<string, string>()

vi.mock('@/lib/fetchSafe', () => ({
  fetchSafeText: vi.fn(async (input: string | URL) => {
    const url = typeof input === 'string' ? input : input.toString()
    const text = fetchResponses.get(url) ?? ''
    return { response: new Response(text) as any, text }
  }),
  fetchSafe: vi.fn(),
}))

// SSRF guard short-circuits to allow public-looking URLs during tests.
vi.mock('@/lib/url-validation', () => ({
  validatePublicUrl: vi.fn().mockResolvedValue(undefined),
}))

import { discoverScripts } from '../discover'

function setHtml(url: string, html: string) {
  fetchResponses.set(url, html)
}

function setBundle(url: string, js: string) {
  fetchResponses.set(url, js)
}

describe('discoverScripts — false-positive guards', () => {
  beforeEach(() => {
    fetchResponses.clear()
  })

  // The "+x+" Hotjar bug: GTM's compiled bundle contains hj() internal
  // functions, which our previous /hj\(/ Hotjar content pattern matched.
  // Every site running GTM was being labeled as having Hotjar.
  it('does NOT detect Hotjar in a same-origin bundle that only has hj() calls', async () => {
    const url = 'https://example.com/'
    setHtml(url, `
      <html><head>
        <script src="/bundle.js"></script>
      </head><body></body></html>
    `)
    // Representative slice of a minified GTM bundle. Has hj() but no real
    // Hotjar references (hjid, static.hotjar.com, hotjar-NNNN.js).
    setBundle('https://example.com/bundle.js', `
      var hj = function(w, name) { return w.location[name] };
      function EP() {
        var a = hj(w.location, "host");
        var b = hj(lj(A.referrer), "host");
        return a && b ? a === b : false;
      }
    `)

    const result = await discoverScripts(url)
    const hotjar = result.scripts.find(s => s.name === 'Hotjar')

    expect(hotjar).toBeUndefined()
  })

  // Similar story for Universal Analytics. /ga\(/ matched any minified
  // function literally named `ga`, which exists in plenty of bundles.
  it('does NOT detect Universal Analytics from a bare ga() call in a bundle', async () => {
    const url = 'https://example.com/'
    setHtml(url, `
      <html><head>
        <script src="/bundle.js"></script>
      </head><body></body></html>
    `)
    setBundle('https://example.com/bundle.js', `
      var ga = function(x) { return x * 2 };
      console.log(ga(5));
    `)

    const result = await discoverScripts(url)
    const ua = result.scripts.find(s => s.name === 'Google Analytics (Universal)')

    expect(ua).toBeUndefined()
  })
})

describe('discoverScripts — true positives still work', () => {
  beforeEach(() => {
    fetchResponses.clear()
  })

  it('detects GTM from an inline init snippet', async () => {
    const url = 'https://example.com/'
    setHtml(url, `
      <html><head>
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PZHQ5C2');</script>
      </head><body></body></html>
    `)

    const result = await discoverScripts(url)
    const gtm = result.scripts.find(s => s.name === 'Google Tag Manager')

    expect(gtm).toBeDefined()
    expect(gtm?.scriptCode).toContain('GTM-PZHQ5C2')
  })

  it('detects GTM from a same-origin first-party bundle (Drupal/Magento aggregator case)', async () => {
    const url = 'https://example.com/'
    setHtml(url, `
      <html><head>
        <script src="/sites/default/files/js/js_aggregated.js"></script>
      </head><body></body></html>
    `)
    setBundle('https://example.com/sites/default/files/js/js_aggregated.js', `
      // Aggregated bundle — pretend a GTM init is inside here.
      (function(w,d,s,l,i){})(window,document,'script','dataLayer','GTM-PZHQ5C2');
    `)

    const result = await discoverScripts(url)
    const gtm = result.scripts.find(s => s.name === 'Google Tag Manager')

    expect(gtm).toBeDefined()
    expect(gtm?.scriptCode).toContain('GTM-PZHQ5C2')
  })

  it('detects Hotjar when the bundle has a real Hotjar signature (hjid)', async () => {
    const url = 'https://example.com/'
    setHtml(url, `
      <html><head><script src="/bundle.js"></script></head><body></body></html>
    `)
    setBundle('https://example.com/bundle.js', `
      h._hjSettings = { hjid: 1234567, hjsv: 6 };
    `)

    const result = await discoverScripts(url)
    const hotjar = result.scripts.find(s => s.name === 'Hotjar')

    expect(hotjar).toBeDefined()
  })

  it('detects CMP via script-tag signatures', async () => {
    const url = 'https://example.com/'
    setHtml(url, `
      <html><head>
        <script src="https://consent.cookiebot.com/uc.js" id="Cookiebot"></script>
      </head><body></body></html>
    `)

    const result = await discoverScripts(url)

    expect(result.cmpDetected).toBe('Cookiebot')
  })

  it('does NOT flag OneTrust just because the page links to OneTrust\'s privacy policy', async () => {
    // Pre-tightening, /onetrust/i matching anywhere in the document would
    // trip when a site had an outbound <a href="...onetrust..."> link.
    const url = 'https://example.com/'
    setHtml(url, `
      <html><head></head><body>
        <a href="https://www.onetrust.com/privacy">Learn about our CMP</a>
      </body></html>
    `)

    const result = await discoverScripts(url)

    expect(result.cmpDetected).toBeUndefined()
  })
})

describe('discoverScripts — fetch errors', () => {
  beforeEach(() => {
    fetchResponses.clear()
  })

  it('surfaces a user-friendly fetchError when the page is unreachable', async () => {
    const url = 'https://unreachable.example.com/'
    // No entry in fetchResponses → mock returns empty string, but we want
    // to simulate a real throw. Override fetchSafeText to reject.
    const { fetchSafeText } = await import('@/lib/fetchSafe')
    vi.mocked(fetchSafeText).mockRejectedValueOnce(
      Object.assign(new Error('HTTP 403 for https://unreachable.example.com/'), {
        name: 'Error',
      }),
    )

    const result = await discoverScripts(url)

    expect(result.fetchError).toBeDefined()
    expect(result.fetchError).toMatch(/blocking automated scans/i)
  })
})

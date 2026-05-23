// Regression tests for GTM container introspection.
//
// `inspectGtmContainer` fetches the public /gtm.js?id=GTM-XXX endpoint
// and string-matches vendor IDs out of it. Tests use a representative
// container fixture so any regex tightening / loosening is caught.

import { describe, expect, it, vi, beforeEach } from 'vitest'
import { inspectGtmContainer } from '../gtm-container'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

function mockGtmFetch(body: string, ok = true, status = 200) {
  vi.mocked(global.fetch).mockResolvedValueOnce(
    new Response(body, { status }) as any,
  )
}

// Representative fragment of a real GTM container body — every ID type
// we extract is present at least once.
const SAMPLE_CONTAINER = `
  google_tag_manager_data = {
    "G-NPQ8W6NY97": {},
    "UA-9975041-70": {},
    "AW-10824703305": {},
    "DC-15081177": {},
    "DC-15447423": {},
    "DC-15529516": {}
  };
  var src1 = "https://connect.facebook.net/en_US/fbevents.js";
  var pixelId = "736791212280159";
  var clarity = "https://www.clarity.ms/tag/foo";
  var hj = "https://static.hotjar.com/c/hotjar-X.js";
  var li = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
  var tt = "https://analytics.tiktok.com/i18n/pixel/events.js";
  var pin = "https://s.pinimg.com/ct/lib.js";
  var snap = "https://sc-static.net/scevent.min.js";
  var twitter = "https://static.ads-twitter.com/uwt.js";
  var reddit = "https://www.redditstatic.com/ads/pixel.js";
  var bing = "https://bat.bing.com/bat.js";
`

describe('inspectGtmContainer — happy path', () => {
  it('rejects malformed container IDs', async () => {
    const result = await inspectGtmContainer('not-a-gtm-id')

    expect(result.fetchError).toMatch(/not a valid GTM container ID/i)
    expect(result.tags).toHaveLength(0)
  })

  it('reports fetchError on non-OK HTTP response', async () => {
    mockGtmFetch('', false, 404)

    const result = await inspectGtmContainer('GTM-NOTREAL')

    expect(result.fetchError).toMatch(/HTTP 404/)
    expect(result.tags).toHaveLength(0)
  })

  it('extracts a GA4 measurement ID', async () => {
    mockGtmFetch(SAMPLE_CONTAINER)

    const result = await inspectGtmContainer('GTM-PZHQ5C2')
    const ga4 = result.tags.find(t => t.name === 'Google Analytics 4')

    expect(ga4?.vendorId).toBe('G-NPQ8W6NY97')
    expect(ga4?.confidence).toBe('high')
    expect(ga4?.scriptCode).toContain('G-NPQ8W6NY97')
  })

  it('extracts a Universal Analytics ID and marks it medium confidence (sunset)', async () => {
    mockGtmFetch(SAMPLE_CONTAINER)

    const result = await inspectGtmContainer('GTM-PZHQ5C2')
    const ua = result.tags.find(t => t.name === 'Google Analytics (Universal)')

    expect(ua?.vendorId).toBe('UA-9975041-70')
    expect(ua?.confidence).toBe('medium')
    expect(ua?.reason).toMatch(/sunset in 2023/i)
  })

  it('extracts a Google Ads conversion ID', async () => {
    mockGtmFetch(SAMPLE_CONTAINER)

    const result = await inspectGtmContainer('GTM-PZHQ5C2')
    const ads = result.tags.find(t => t.name === 'Google Ads')

    expect(ads?.vendorId).toBe('AW-10824703305')
  })

  it('extracts ALL Floodlight IDs into a single tag entry', async () => {
    mockGtmFetch(SAMPLE_CONTAINER)

    const result = await inspectGtmContainer('GTM-PZHQ5C2')
    const fl = result.tags.find(t => t.name === 'Floodlight / Campaign Manager 360')

    expect(fl).toBeDefined()
    // All three DC IDs should be mentioned in the reason / scriptCode.
    expect(fl?.reason).toContain('DC-15081177')
    expect(fl?.reason).toContain('DC-15447423')
    expect(fl?.reason).toContain('DC-15529516')
  })

  it('extracts a Facebook Pixel ID by length heuristic when fbevents.js is referenced', async () => {
    mockGtmFetch(SAMPLE_CONTAINER)

    const result = await inspectGtmContainer('GTM-PZHQ5C2')
    const fb = result.tags.find(t => t.name === 'Facebook Pixel')

    expect(fb?.vendorId).toBe('736791212280159')
  })

  it('emits domain-mention tags for vendors without extractable IDs', async () => {
    mockGtmFetch(SAMPLE_CONTAINER)

    const result = await inspectGtmContainer('GTM-PZHQ5C2')
    const names = result.tags.map(t => t.name)

    expect(names).toContain('Microsoft Clarity')
    expect(names).toContain('Hotjar')
    expect(names).toContain('LinkedIn Insight Tag')
    expect(names).toContain('TikTok Pixel')
    expect(names).toContain('Pinterest Tag')
    expect(names).toContain('Snap Pixel')
    expect(names).toContain('Twitter/X Pixel')
    expect(names).toContain('Reddit Pixel')
    expect(names).toContain('Microsoft Bing Ads (UET)')
  })
})

describe('inspectGtmContainer — empty / minimal container', () => {
  it('returns no tags when the container references nothing we recognize', async () => {
    mockGtmFetch('var some_unrelated = "totally unrelated";')

    const result = await inspectGtmContainer('GTM-EMPTYBOX')

    expect(result.fetchError).toBeUndefined()
    expect(result.tags).toHaveLength(0)
  })
})

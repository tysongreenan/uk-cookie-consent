import { describe, it, expect } from 'vitest'
import { buildCookieCleanupMap, matchesCookiePattern } from './cookie-cleanup'

const gtm = "<script>(function(w,d,s,l,i){})(window,document,'script','dataLayer','GTM-T87HMV');</script>"

describe('buildCookieCleanupMap', () => {
  it('detects common vendors per category', () => {
    const { map } = buildCookieCleanupMap({
      scripts: {
        trackingPerformance: [{ name: 'Google Analytics 4', scriptCode: "gtag('config','G-ABC1234')" }, { name: 'Microsoft Clarity', scriptCode: 'clarity' }],
        targetingAdvertising: [{ name: 'Facebook Pixel', scriptCode: "fbq('init')" }, { name: 'TikTok Pixel', scriptCode: 'ttq.load()' }],
      },
    })
    expect(map.analytics).toEqual(expect.arrayContaining(['_ga', '_ga_*', '_gid', '_clck', '_clsk']))
    expect(map.marketing).toEqual(expect.arrayContaining(['_fbp', '_fbc', '_ttp']))
    expect(map.functionality).toEqual([])
  })

  it('treats code-less entries as cookie names and skips descriptive names', () => {
    const { map } = buildCookieCleanupMap({
      scripts: { trackingPerformance: [{ name: 'BVBRANDID', scriptCode: '' }, { name: 'Some tracker thing', scriptCode: '' }, { name: '__utmz', scriptCode: '' }] },
    })
    expect(map.analytics).toEqual(expect.arrayContaining(['BVBRANDID', '__utmz']))
    expect(map.analytics).not.toContain('Some tracker thing')
  })

  it('maps GTM to GA cookies', () => {
    const { map } = buildCookieCleanupMap({ scripts: { trackingPerformance: [{ name: 'Google Tag Manager', scriptCode: gtm }] } })
    expect(map.analytics).toEqual(expect.arrayContaining(['_ga', '_ga_*']))
  })

  it('never includes strictly necessary or our own cookies', () => {
    const { map, protectedNames } = buildCookieCleanupMap({
      scripts: {
        strictlyNecessary: [{ name: 'well_id', scriptCode: '' }, { name: '_ga', scriptCode: '' }],
        trackingPerformance: [{ name: 'well_id', scriptCode: '' }, { name: 'cookie_consent', scriptCode: '' }, { name: 'GA', scriptCode: "gtag('config','G-ABC1234')" }],
      },
    })
    expect(map.analytics).not.toContain('well_id')
    expect(map.analytics).not.toContain('cookie_consent')
    expect(map.analytics).not.toContain('_ga') // customer marked _ga strictly necessary
    expect(protectedNames).toEqual(expect.arrayContaining(['cookie_consent', 'well_id', '_ga']))
  })

  it('skips disabled entries and adds GA cookies for the built-in GA4 integration', () => {
    const { map } = buildCookieCleanupMap({
      scripts: { targetingAdvertising: [{ name: 'Facebook Pixel', scriptCode: 'fbq', enabled: false }] },
      integrations: { googleAnalytics: { enabled: true } },
    })
    expect(map.marketing).toEqual([])
    expect(map.analytics).toContain('_ga')
  })

  it('ignores lookalike widgets', () => {
    const { map } = buildCookieCleanupMap({
      scripts: { functionality: [{ name: 'Bing Maps', scriptCode: '<script src="https://www.bing.com/api/maps/mapcontrol"></script>' }, { name: 'Twitter embed', scriptCode: '<script src="https://platform.twitter.com/widgets.js"></script>' }, { name: 'HubSpot Forms', scriptCode: '<script src="//js.hsforms.net/forms/embed/v2.js"></script>' }] },
    })
    expect(map.functionality).toEqual([])
  })

  it('handles missing scripts', () => {
    expect(buildCookieCleanupMap({}).map).toEqual({ functionality: [], analytics: [], marketing: [] })
  })
})

describe('matchesCookiePattern', () => {
  it('matches exact and prefix patterns', () => {
    expect(matchesCookiePattern('_ga_ABC', '_ga_*')).toBe(true)
    expect(matchesCookiePattern('_ga', '_ga_*')).toBe(false)
    expect(matchesCookiePattern('_ga', '_ga')).toBe(true)
    expect(matchesCookiePattern('_gat', '_ga')).toBe(false)
  })
})

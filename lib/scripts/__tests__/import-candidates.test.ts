// Regression tests for the scanner-import layer. Each test pins behavior
// that was previously broken in production (Hotjar +x+, GTM-managed
// grouping, info-tag default-uncheck, etc.) so future refactors can't
// silently regress them.

import { describe, expect, it, vi, beforeEach } from 'vitest'
import { extractSrc, toImportCandidates } from '../import-candidates'
import type { WebsiteScanResult } from '../scan-website'
import type { TrackingScript } from '@/types'

// Stop the GTM container fetch from making real network calls during tests.
// Individual tests can override the mock if they want to assert container
// behavior.
vi.mock('../gtm-container', () => ({
  inspectGtmContainer: vi.fn().mockResolvedValue({
    containerId: 'GTM-FAKE',
    fetchedAt: new Date().toISOString(),
    tags: [],
    warnings: [],
  }),
}))

function emptyScan(overrides: Partial<WebsiteScanResult> = {}): WebsiteScanResult {
  return {
    url: 'https://example.com/',
    fetchedAt: new Date().toISOString(),
    scriptsDetected: [],
    consentBanner: { detected: false, vendor: null },
    privacyPolicyUrl: null,
    cookies: [],
    overallScore: 100,
    overallGrade: 'A',
    compliance: {
      gdpr: { score: 100, grade: 'A', issues: [] },
      pipeda: { score: 100, grade: 'A', issues: [] },
      ccpa: { score: 100, grade: 'A', issues: [] },
      law25: { score: 100, grade: 'A', issues: [] },
    },
    recommendations: [],
    warnings: [],
    note: '',
    scanMethod: 'headless',
    ...overrides,
  }
}

describe('extractSrc', () => {
  it('returns absolute http(s) URLs verbatim', () => {
    expect(extractSrc('<script src="https://example.com/foo.js"></script>'))
      .toBe('https://example.com/foo.js')
    expect(extractSrc('<script src="http://cdn.example.com/x.js"></script>'))
      .toBe('http://cdn.example.com/x.js')
  })

  it('keeps protocol-relative URLs', () => {
    expect(extractSrc('<script src="//cdn.example.com/x.js"></script>'))
      .toBe('//cdn.example.com/x.js')
  })

  it('keeps root-relative paths', () => {
    expect(extractSrc('<script src="/path/file.js"></script>'))
      .toBe('/path/file.js')
  })

  // Regression: GTM string-concatenation templates inside bundles used to
  // leak through as if they were real script sources. See the +x+ bug.
  it('rejects JS template fragments like "+x+"', () => {
    expect(extractSrc('<script>var s="+x+"&cond=true</script>'))
      .toBe('')
  })

  it('rejects bare tokens that are not URL-shaped', () => {
    expect(extractSrc('<script src="foo"></script>')).toBe('')
    expect(extractSrc('<script src="bar.js"></script>')).toBe('')
    expect(extractSrc('<script src="+x+"></script>')).toBe('')
    expect(extractSrc('<script src="something"></script>')).toBe('')
  })

  it('rejects a single slash as too short to be a path', () => {
    expect(extractSrc('<script src="/"></script>')).toBe('')
  })

  it('returns empty string when no src attribute is present', () => {
    expect(extractSrc('<script>console.log("hi")</script>')).toBe('')
    expect(extractSrc('')).toBe('')
  })
})

describe('toImportCandidates', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('lifts a headless-captured Hotjar URL into a canonical loader at high confidence', async () => {
    // This is the +x+ regression: previously the fallback path set
    // scriptCode='' and confidence='low' regardless of how much we knew
    // from the network capture.
    const scan = emptyScan({
      scriptsDetected: [
        {
          name: 'Hotjar',
          category: 'tracking-performance',
          url: 'https://static.hotjar.com/c/hotjar-1778278.js?sv=7',
        },
      ],
    })

    const candidates = await toImportCandidates(scan, [])
    const hotjar = candidates.find(c => c.name === 'Hotjar')

    expect(hotjar).toBeDefined()
    expect(hotjar?.confidence).toBe('high')
    expect(hotjar?.sourceUrl).toBe('https://static.hotjar.com/c/hotjar-1778278.js?sv=7')
    expect(hotjar?.scriptCode).toContain('hjid:1778278')
    expect(hotjar?.importWarning).toBeUndefined()
  })

  it('extracts the Microsoft Clarity tag ID from its loader URL', async () => {
    const scan = emptyScan({
      scriptsDetected: [
        {
          name: 'Microsoft Clarity',
          category: 'tracking-performance',
          url: 'https://www.clarity.ms/tag/tmo89p0av9?ref=gtm',
        },
      ],
    })

    const candidates = await toImportCandidates(scan, [])
    const clarity = candidates.find(c => c.name === 'Microsoft Clarity')

    expect(clarity?.confidence).toBe('high')
    expect(clarity?.scriptCode).toContain('tmo89p0av9')
  })

  // Facebook Pixel's ID isn't in the loader URL. We can still emit a
  // partial snippet with a YOUR_PIXEL_ID placeholder — but the confidence
  // should NOT be 'high' because the user has work to do.
  it('marks Facebook Pixel as medium confidence when the pixel ID is unknown', async () => {
    const scan = emptyScan({
      scriptsDetected: [
        {
          name: 'Facebook Pixel',
          category: 'targeting-advertising',
          url: 'https://connect.facebook.net/en_US/fbevents.js',
        },
      ],
    })

    const candidates = await toImportCandidates(scan, [])
    const fb = candidates.find(c => c.name === 'Facebook Pixel')

    expect(fb?.confidence).toBe('medium')
    expect(fb?.scriptCode).toContain('YOUR_PIXEL_ID')
    expect(fb?.importWarning).toMatch(/fill in your ID/i)
  })

  it('falls back to low confidence with no scriptCode when no URL was captured', async () => {
    const scan = emptyScan({
      scriptsDetected: [{ name: 'Some Vendor', category: 'functionality' }],
    })

    const candidates = await toImportCandidates(scan, [])
    const v = candidates.find(c => c.name === 'Some Vendor')

    expect(v?.confidence).toBe('low')
    expect(v?.scriptCode).toBe('')
    expect(v?.importWarning).toMatch(/no importable script code/i)
  })

  it('preserves cheerio-discovered scripts and does not duplicate them via the headless fallback', async () => {
    // Both layers see GA4. The cheerio (discoveredScripts) version wins
    // because it carries more context; the headless duplicate is skipped.
    const ga4Snippet =
      '<script async src="https://www.googletagmanager.com/gtag/js?id=G-XYZ123ABC"></script>'

    const scan = emptyScan({
      scriptsDetected: [
        {
          name: 'Google Analytics 4',
          category: 'tracking-performance',
          url: 'https://www.googletagmanager.com/gtag/js?id=G-XYZ123ABC',
        },
      ],
    })
    const discovered: TrackingScript[] = [
      {
        id: 'ga4-discovered',
        name: 'Google Analytics 4',
        category: 'tracking-performance',
        scriptCode: ga4Snippet,
        enabled: true,
      },
    ]

    const candidates = await toImportCandidates(scan, discovered)
    const ga4Entries = candidates.filter(c => c.name === 'Google Analytics 4')

    expect(ga4Entries).toHaveLength(1)
    expect(ga4Entries[0].id).toBe('ga4-discovered')
    expect(ga4Entries[0].scriptCode).toContain('G-XYZ123ABC')
  })
})

describe('toImportCandidates — GTM container introspection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('tags GTM-container-derived candidates as info (not warning)', async () => {
    const { inspectGtmContainer } = await import('../gtm-container')
    vi.mocked(inspectGtmContainer).mockResolvedValueOnce({
      containerId: 'GTM-ABC123',
      fetchedAt: new Date().toISOString(),
      tags: [
        {
          name: 'Google Analytics 4',
          category: 'tracking-performance',
          vendorId: 'G-NPQ8W6NY97',
          confidence: 'high',
          reason: 'Found inside container.',
          scriptCode: '<script>fake GA4 snippet</script>',
        },
      ],
      warnings: [],
    })

    // Plant a GTM in discoveredScripts so the helper finds an ID to inspect.
    const gtmSnippet =
      "<script>(function(w,d,s,l,i){})(window,document,'script','dataLayer','GTM-ABC123');</script>"
    const discovered: TrackingScript[] = [
      {
        id: 'gtm-1',
        name: 'Google Tag Manager',
        category: 'tracking-performance',
        scriptCode: gtmSnippet,
        enabled: true,
      },
    ]

    const candidates = await toImportCandidates(emptyScan(), discovered)
    const ga4Managed = candidates.find(c => c.name === 'Google Analytics 4')

    expect(ga4Managed).toBeDefined()
    // This is the visual treatment differentiator: 'info' (blue ℹ️) vs
    // 'warning' (orange triangle). Default-uncheck logic in the UI keys
    // off this same field.
    expect(ga4Managed?.importNoteType).toBe('info')
    expect(ga4Managed?.detectedVendor).toBe('Configured in GTM-ABC123')
    expect(ga4Managed?.importWarning).toMatch(/Only import if replacing GTM/i)
  })

  it('does not add a GTM-derived entry for a tag already detected via the live scan', async () => {
    // If headless already saw GA4 fire, don't double-add it as a GTM-managed
    // entry — the live observation is the better source of truth.
    const { inspectGtmContainer } = await import('../gtm-container')
    vi.mocked(inspectGtmContainer).mockResolvedValueOnce({
      containerId: 'GTM-ABC123',
      fetchedAt: new Date().toISOString(),
      tags: [
        {
          name: 'Google Analytics 4',
          category: 'tracking-performance',
          vendorId: 'G-LIVE',
          confidence: 'high',
          reason: 'Found inside container.',
          scriptCode: '<script>fake GA4 from container</script>',
        },
      ],
      warnings: [],
    })

    const scan = emptyScan({
      scriptsDetected: [
        {
          name: 'Google Analytics 4',
          category: 'tracking-performance',
          url: 'https://www.googletagmanager.com/gtag/js?id=G-LIVE',
        },
        {
          name: 'Google Tag Manager',
          category: 'tracking-performance',
          url: 'https://www.googletagmanager.com/gtm.js?id=GTM-ABC123',
        },
      ],
    })
    const discovered: TrackingScript[] = [
      {
        id: 'gtm-1',
        name: 'Google Tag Manager',
        category: 'tracking-performance',
        scriptCode: "<script>(function(){...GTM-ABC123...})()</script>",
        enabled: true,
      },
    ]

    const candidates = await toImportCandidates(scan, discovered)
    const ga4Entries = candidates.filter(c => c.name === 'Google Analytics 4')

    expect(ga4Entries).toHaveLength(1)
    // The live-scan version (no info tag) wins.
    expect(ga4Entries[0].importNoteType).not.toBe('info')
  })
})

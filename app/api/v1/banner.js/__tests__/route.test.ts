/**
 * Tests for the public banner.js serving route.
 *
 * The route's responses are shared across visitors via the Vercel edge cache,
 * so these tests pin down the two things that make that safe:
 *   1. Nothing per-visitor (geo, GPC, country) is baked into the output.
 *   2. Banners with geo rules serve a loader stub; the ?geo= variant carries
 *      the actual country-specific configuration.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  rows: {} as Record<string, any>,
}))

vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => {
            const row = mocks.rows[table]
            return row
              ? { data: row, error: null }
              : { data: null, error: { message: 'not found' } }
          },
        }),
      }),
    }),
    // Rate limiter RPC: null data → limiter fails open (allowed)
    rpc: async () => ({ data: null, error: null }),
  }),
}))

import { GET } from '../route'
import { getBannerTemplate } from '@/lib/banner-templates'

const BANNER_ID = 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d'
const USER_ID = 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e'
const UPDATED_AT = '2026-07-01T00:00:00.000Z'

function makeBannerRow(configOverrides: Record<string, any> = {}, rowOverrides: Record<string, any> = {}) {
  const config = { ...getBannerTemplate('gdpr'), ...configOverrides }
  return {
    id: BANNER_ID,
    name: 'Test Banner',
    config,
    isActive: true,
    updatedAt: UPDATED_AT,
    userId: USER_ID,
    ...rowOverrides,
  }
}

const FR_GEO_RULE = {
  id: 'rule-1',
  name: 'France - GDPR',
  country: 'FR',
  enabled: true,
  overrides: { requiresOptIn: true, showRejectButton: true, dismissOnScroll: false },
}

function makeRequest(query: string, headers: Record<string, string> = {}) {
  return new NextRequest(`https://www.cookie-banner.ca/api/v1/banner.js?${query}`, { headers })
}

beforeEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
  process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-service-key'
  for (const key of Object.keys(mocks.rows)) delete mocks.rows[key]
  mocks.rows['User'] = { id: USER_ID, planTier: 'pro', featureFreezeDate: null, currentTeamId: null }
})

describe('GET /api/v1/banner.js', () => {
  it('serves a shared, edge-cacheable script for banners without geo rules', async () => {
    mocks.rows['SimpleBanners'] = makeBannerRow()

    const res = await GET(makeRequest(`id=${BANNER_ID}`))
    const body = await res.text()

    expect(res.status).toBe(200)
    expect(res.headers.get('Cache-Control')).toContain('public')
    expect(res.headers.get('CDN-Cache-Control')).toContain('s-maxage=300')
    // Full script, not the geo loader
    expect(body).toContain('bannerHTMLContent')
    // Nothing per-visitor baked in: country is resolved by the track/consent
    // endpoints, GPC by the browser
    expect(body).toContain("_cbCountry = 'unknown'")
    expect(body).toContain('navigator.globalPrivacyControl')
    expect(body).not.toContain('__cb_geo_v1')
    // The output must be parseable JavaScript
    expect(() => new Function(body)).not.toThrow()
  })

  it('is byte-identical regardless of visitor geo/GPC headers', async () => {
    mocks.rows['SimpleBanners'] = makeBannerRow()

    const french = await GET(makeRequest(`id=${BANNER_ID}`, {
      'x-vercel-ip-country': 'FR',
      'x-vercel-ip-country-region': 'IDF',
      'sec-gpc': '1',
    }))
    const german = await GET(makeRequest(`id=${BANNER_ID}`, {
      'x-vercel-ip-country': 'DE',
    }))

    expect(await french.text()).toBe(await german.text())
  })

  it('serves the geo loader for paid banners with active geo rules', async () => {
    mocks.rows['SimpleBanners'] = makeBannerRow({ geoRules: [FR_GEO_RULE] })

    const res = await GET(makeRequest(`id=${BANNER_ID}`))
    const body = await res.text()

    expect(res.status).toBe(200)
    expect(res.headers.get('CDN-Cache-Control')).toContain('s-maxage=300')
    expect(body).toContain('/api/v1/geo')
    expect(body).toContain('__cb_geo_v1')
    // Consent Mode defaults must be in the loader (denied-by-default cannot
    // wait for the geo lookup), guarded so the variant doesn't re-fire them
    expect(body).toContain('__cbConsentDefaultSet')
    expect(body).toContain("'analytics_storage': 'denied'")
    // The loader is not the full banner
    expect(body).not.toContain('bannerHTMLContent')
    expect(() => new Function(body)).not.toThrow()
  })

  it('serves the full country variant when the geo param is present', async () => {
    mocks.rows['SimpleBanners'] = makeBannerRow({ geoRules: [FR_GEO_RULE] })

    const res = await GET(makeRequest(`id=${BANNER_ID}&geo=FR`))
    const body = await res.text()

    expect(res.status).toBe(200)
    expect(body).toContain('bannerHTMLContent')
    expect(body).not.toContain('__cb_geo_v1')
    expect(() => new Function(body)).not.toThrow()
  })

  it('serves the full script for geo=XX (resolution failed) without recursing into the loader', async () => {
    mocks.rows['SimpleBanners'] = makeBannerRow({ geoRules: [FR_GEO_RULE] })

    const res = await GET(makeRequest(`id=${BANNER_ID}&geo=XX`))
    const body = await res.text()

    expect(res.status).toBe(200)
    expect(body).toContain('bannerHTMLContent')
    expect(body).not.toContain('__cb_geo_v1')
  })

  it('drops malformed geo params instead of multiplying cache entries', async () => {
    mocks.rows['SimpleBanners'] = makeBannerRow({ geoRules: [FR_GEO_RULE] })

    // Invalid param → treated as absent → loader again
    const res = await GET(makeRequest(`id=${BANNER_ID}&geo=junk%3Cscript%3E`))
    const body = await res.text()

    expect(body).toContain('__cb_geo_v1')
    expect(body).not.toContain('bannerHTMLContent')
  })

  it('ignores geo rules for free-plan owners and serves the full script directly', async () => {
    mocks.rows['User'] = { id: USER_ID, planTier: 'free', featureFreezeDate: null, currentTeamId: null }
    mocks.rows['SimpleBanners'] = makeBannerRow({ geoRules: [FR_GEO_RULE] })

    const res = await GET(makeRequest(`id=${BANNER_ID}`))
    const body = await res.text()

    expect(res.status).toBe(200)
    expect(body).toContain('bannerHTMLContent')
    expect(body).not.toContain('__cb_geo_v1')
  })

  it('returns 304 when the ETag matches (banner revision + deploy SHA)', async () => {
    mocks.rows['SimpleBanners'] = makeBannerRow()

    const etag = `"${BANNER_ID}-${new Date(UPDATED_AT).getTime()}-dev"`
    const res = await GET(makeRequest(`id=${BANNER_ID}`, { 'if-none-match': etag }))

    expect(res.status).toBe(304)
    expect(res.headers.get('ETag')).toBe(etag)
  })

  it('caches 404s briefly so dead IDs cannot hammer the function', async () => {
    const res = await GET(makeRequest(`id=${BANNER_ID}`))

    expect(res.status).toBe(404)
    expect(res.headers.get('CDN-Cache-Control')).toContain('s-maxage=60')
  })

  it('serves a short-cached warning for disabled banners', async () => {
    mocks.rows['SimpleBanners'] = makeBannerRow({}, { isActive: false })

    const res = await GET(makeRequest(`id=${BANNER_ID}`))
    const body = await res.text()

    expect(res.status).toBe(200)
    expect(body).toContain('currently disabled')
    expect(res.headers.get('CDN-Cache-Control')).toContain('s-maxage=60')
  })

  it('rejects invalid banner IDs without caching problems', async () => {
    const res = await GET(makeRequest('id=not-a-uuid'))
    expect(res.status).toBe(400)
  })
})

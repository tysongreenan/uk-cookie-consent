import { beforeEach, describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'

// In-memory stand-ins for the tables the route reads.
const db: { banner: any; owner: any; team: any } = { banner: null, owner: null, team: null }

vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: (table: string) => {
      const q: any = {
        select: () => q,
        eq: () => q,
        single: async () => {
          if (table === 'SimpleBanners') return db.banner ? { data: db.banner, error: null } : { data: null, error: { message: 'not found' } }
          if (table === 'User') return { data: db.owner, error: null }
          if (table === 'Team') return { data: db.team, error: null }
          return { data: null, error: null }
        },
      }
      return q
    },
  }),
}))

vi.mock('@/lib/rate-limit', () => ({
  RateLimit: class {
    async check() {
      return { allowed: true, remaining: 99, resetTime: 0 }
    }
  },
}))

import { GET } from './route'

const ID = '11111111-2222-4333-8444-555555555555'
const req = (qs = `id=${ID}`, headers: Record<string, string> = {}) =>
  new NextRequest(`https://www.cookie-banner.ca/api/v1/a11y.js?${qs}`, { headers })

const baseBanner = (accessibility: any) => ({
  id: ID,
  name: 'Site',
  isActive: true,
  updatedAt: '2026-09-13T12:00:00Z',
  userId: 'user-1',
  config: JSON.stringify({
    name: 'Site',
    colors: { button: '#d97706', background: '#1f2937', text: '#ffffff' },
    accessibility,
  }),
})

describe('GET /api/v1/a11y.js', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://x.supabase.co'
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'k'
    process.env.NEXT_PUBLIC_BASE_URL = 'https://www.cookie-banner.ca'
    delete process.env.A11Y_MENU_DISABLED
    db.banner = null
    db.owner = { currentTeamId: null, planTier: 'free', featureFreezeDate: null }
    db.team = null
  })

  it('rejects a missing or malformed id without touching the database', async () => {
    const res = await GET(req('id=nope'))
    expect(res.status).toBe(400)
    expect(await res.text()).toContain('invalid id=')
    expect(res.headers.get('content-type')).toContain('javascript')
  })

  it('404s with a helpful console message for an unknown banner', async () => {
    const res = await GET(req())
    expect(res.status).toBe(404)
    expect(await res.text()).toContain(ID)
    expect(res.headers.get('cache-control')).toBe('public, max-age=60')
  })

  it('serves a loader that publishes the runtime config and loads the versioned widget', async () => {
    db.banner = baseBanner({ enabled: true, trigger: { position: 'top-right', shape: 'pill', label: 'Menu' } })
    const res = await GET(req())
    const body = await res.text()
    expect(res.status).toBe(200)
    expect(body).toContain('window.__cbA11yConfig = ')
    expect(body).toContain("'cb-a11y-script'")
    expect(body).toMatch(/\/a11y\/widget\.v\d+\.js\?b=[0-9a-f]+/)
    // Free owner: customization ignored, banner colours applied, branding on
    const json = JSON.parse(body.match(/__cbA11yConfig = (\{.*?\});\n/)![1])
    expect(json.trigger.shape).toBe('circle')
    expect(json.trigger.colors.background).toBe('#d97706')
    expect(json.poweredBy).toBe(true)
    // Free owner: no analytics tracker
    expect(body).not.toContain('_cbA11yTrackUrl')
    // Cacheable, taggable, revalidatable
    expect(res.headers.get('cache-control')).toBe('public, max-age=300')
    expect(res.headers.get('vercel-cache-tag')).toBe(`banner-${ID}`)
    expect(res.headers.get('etag')).toMatch(/^"a11y-/)
    expect(res.headers.get('x-content-type-options')).toBe('nosniff')
  })

  it('honours Pro Annual customization', async () => {
    db.owner = { currentTeamId: null, planTier: 'pro_annual', featureFreezeDate: null }
    db.banner = baseBanner({ enabled: true, trigger: { position: 'top-right', shape: 'pill', label: 'Menu' }, showPoweredBy: false })
    const body = await (await GET(req())).text()
    const json = JSON.parse(body.match(/__cbA11yConfig = (\{.*?\});\n/)![1])
    expect(json.trigger.shape).toBe('pill')
    expect(json.trigger.label).toBe('Menu')
    expect(json.poweredBy).toBe(false)
    expect(body).toContain('/api/v1/track')
    expect(body).toContain('user-1')
  })

  it('returns 304 when the ETag matches', async () => {
    db.banner = baseBanner({ enabled: true })
    const first = await GET(req())
    const etag = first.headers.get('etag')!
    const second = await GET(req(`id=${ID}`, { 'if-none-match': etag }))
    expect(second.status).toBe(304)
  })

  it('serves a no-op with guidance when the menu is not enabled', async () => {
    db.banner = baseBanner({ enabled: false })
    const body = await (await GET(req())).text()
    expect(body).toContain('Not enabled')
    expect(body).not.toContain('__cbA11yConfig')
  })

  it('serves a no-op when the banner is disabled', async () => {
    db.banner = { ...baseBanner({ enabled: true }), isActive: false }
    const body = await (await GET(req())).text()
    expect(body).toContain('disabled in the dashboard')
    expect(body).not.toContain('__cbA11yConfig')
  })

  it('respects the kill switch and ?nocache=1', async () => {
    process.env.A11Y_MENU_DISABLED = '1'
    db.banner = baseBanner({ enabled: true })
    const res = await GET(req(`id=${ID}&nocache=1`))
    expect(await res.text()).toContain('temporarily disabled')
    expect(res.headers.get('cache-control')).toContain('no-store')
  })
})

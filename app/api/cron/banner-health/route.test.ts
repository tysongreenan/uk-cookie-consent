import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const sent: string[] = []
const logged: string[] = []
let dbRow: { id: string } | null = { id: 'b1' }
let dbDown = false
let recentAlerts: object[] = []
vi.mock('@/lib/email', () => ({ sendEmail: async (o: { to: string }) => { sent.push(o.to); return true } }))
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: (table: string) => {
      const q: any = {}
      for (const m of ['select', 'eq', 'gte', 'order', 'limit', 'abortSignal']) q[m] = () => q
      q.maybeSingle = async () => (dbDown ? { data: null, error: { message: 'invalid api key' } } : { data: dbRow, error: dbRow ? null : { message: 'none' } })
      // audit_log reads are awaited straight off the builder
      q.then = (ok: (v: unknown) => unknown) => ok(dbDown ? { data: null, error: { message: 'invalid api key' } } : { data: table === 'audit_log' ? recentAlerts : [], error: null })
      q.insert = (row: { action: string }) => { logged.push(row.action); return Promise.resolve({ error: null }) }
      return q
    },
  }),
}))

const call = async () => {
  const { GET } = await import('./route')
  const { NextRequest } = await import('next/server')
  return GET(new NextRequest('https://x/api/cron/banner-health', { headers: { authorization: 'Bearer s' } }))
}

describe('banner health cron', () => {
  beforeEach(() => {
    sent.length = 0
    logged.length = 0
    dbRow = { id: 'b1' }
    dbDown = false
    recentAlerts = []
    Object.assign(process.env, { CRON_SECRET: 's', ADMIN_EMAILS: 'a@x.com, b@x.com', NEXT_PUBLIC_SUPABASE_URL: 'https://s', SUPABASE_SERVICE_ROLE_KEY: 'k' })
  })
  afterEach(() => vi.useRealTimers())

  it('stays quiet when banner.js serves a banner', async () => {
    vi.stubGlobal('fetch', async () => new Response('var x; document.getElementById("cookie-consent-banner")'))
    expect((await call()).status).toBe(200)
    expect(sent).toEqual([])
  })

  it('emails every admin once when banner.js fails, and records the alert', async () => {
    vi.stubGlobal('fetch', async () => new Response('not found', { status: 404 }))
    expect((await call()).status).toBe(500)
    expect(sent).toEqual(['a@x.com', 'b@x.com'])
    expect(logged).toEqual(['health.banner_alert'])
  })

  it('does not email again within 6 hours of the last alert', async () => {
    vi.stubGlobal('fetch', async () => new Response('not found', { status: 404 }))
    recentAlerts = [{ created_at: new Date().toISOString() }]
    expect((await call()).status).toBe(500)
    expect(sent).toEqual([])
  })

  it('treats a hung banner.js as a failure', async () => {
    vi.stubGlobal('fetch', async () => { throw new DOMException('The operation was aborted due to timeout', 'TimeoutError') })
    expect((await call()).status).toBe(500)
    expect(sent).toHaveLength(2)
  })

  it('when the database is down, emails on the first run of each hour only', async () => {
    dbDown = true
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-04T15:05:00Z'))
    expect((await call()).status).toBe(500)
    expect(sent).toHaveLength(2)
    sent.length = 0
    vi.setSystemTime(new Date('2026-11-04T15:25:00Z'))
    expect((await call()).status).toBe(500)
    expect(sent).toEqual([])
  })
})

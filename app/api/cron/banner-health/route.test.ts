import { beforeEach, describe, expect, it, vi } from 'vitest'

const sent: string[] = []
let dbRow: { id: string } | null = { id: 'b1' }
vi.mock('@/lib/email', () => ({ sendEmail: async (o: { to: string }) => { sent.push(o.to); return true } }))
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => {
    const q: any = { select: () => q, eq: () => q, order: () => q, limit: () => q, maybeSingle: async () => ({ data: dbRow, error: dbRow ? null : { message: 'invalid api key' } }) }
    return { from: () => q }
  },
}))

const call = async () => {
  const { GET } = await import('./route')
  const { NextRequest } = await import('next/server')
  return GET(new NextRequest('https://x/api/cron/banner-health', { headers: { authorization: 'Bearer s' } }))
}

describe('banner health cron', () => {
  beforeEach(() => {
    sent.length = 0
    dbRow = { id: 'b1' }
    Object.assign(process.env, { CRON_SECRET: 's', ADMIN_EMAILS: 'a@x.com, b@x.com', NEXT_PUBLIC_SUPABASE_URL: 'https://s', SUPABASE_SERVICE_ROLE_KEY: 'k' })
  })

  it('stays quiet when banner.js serves a banner', async () => {
    vi.stubGlobal('fetch', async () => new Response('var x; document.getElementById("cookie-consent-banner")'))
    expect((await call()).status).toBe(200)
    expect(sent).toEqual([])
  })

  it('emails every admin when banner.js fails', async () => {
    vi.stubGlobal('fetch', async () => new Response('not found', { status: 404 }))
    expect((await call()).status).toBe(500)
    expect(sent).toEqual(['a@x.com', 'b@x.com'])
  })

  it('emails when the database read fails (e.g. a rotated key)', async () => {
    dbRow = null
    expect((await call()).status).toBe(500)
    expect(sent).toHaveLength(2)
  })
})

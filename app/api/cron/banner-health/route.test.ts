import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// In-memory stand-ins for the DB, the audit log and email.
let rows: { id: number; action: string; created_at: string; token: string }[] = []
let nextId = 1
let dbDown = false
let insertFails = false
let insertHangs = false
let emailWorks = true
const sent: string[] = []
vi.mock('@/lib/email', () => ({ sendEmail: async (o: { to: string; subject: string }) => { if (emailWorks) sent.push(o.subject); return emailWorks } }))
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: (table: string) => {
      const q: any = {}
      for (const m of ['select', 'eq', 'in', 'order', 'limit', 'abortSignal', 'single']) q[m] = () => q
      const fail = { data: null, error: { message: 'invalid api key' } }
      q.maybeSingle = async () => (dbDown ? fail : { data: { id: 'b1' }, error: null })
      q.then = (ok: (v: unknown) => unknown) => ok(dbDown ? fail : { data: [...rows].reverse().slice(0, 1), error: null })
      q.insert = (row: { action: string; metadata: { token: string } }) => ({
        then: (ok: (v: unknown) => unknown) => {
          if (insertHangs) return new Promise(() => {})
          if (dbDown || insertFails) return ok(fail)
          rows.push({ id: nextId++, action: row.action, created_at: new Date().toISOString(), token: row.metadata.token })
          return ok({ error: null })
        },
      })
      q.delete = () => ({ eq: (_c: string, token: string) => { rows = rows.filter((r) => r.token !== token); return Promise.resolve({ error: null }) } })
      return table === 'audit_log' || table === 'SimpleBanners' ? q : q
    },
  }),
}))

const run = async (at: string, bannerUp: boolean) => {
  vi.setSystemTime(new Date(at))
  vi.stubGlobal('fetch', async () => (bannerUp ? new Response('document.getElementById("cookie-consent-banner")') : new Response('nope', { status: 404 })))
  const { GET } = await import('./route')
  const { NextRequest } = await import('next/server')
  return (await GET(new NextRequest('https://x/api/cron/banner-health', { headers: { authorization: 'Bearer s' } }))).status
}
const failed = () => sent.filter((s) => s.includes('failed')).length
const recovered = () => sent.filter((s) => s.includes('again')).length

describe('banner health cron', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['Date'] })
    rows = []; nextId = 1; dbDown = false; insertFails = false; insertHangs = false; emailWorks = true; sent.length = 0
    Object.assign(process.env, { CRON_SECRET: 's', ADMIN_EMAILS: 'a@x.com', NEXT_PUBLIC_SUPABASE_URL: 'https://s', SUPABASE_SERVICE_ROLE_KEY: 'k' })
  })
  afterEach(() => vi.useRealTimers())

  it('stays quiet while healthy', async () => {
    expect(await run('2026-11-04T12:00:00Z', true)).toBe(200)
    expect(sent).toEqual([])
  })

  it('alerts once per incident, reminds after 6 hours, and sends an all-clear', async () => {
    expect(await run('2026-11-04T12:00:00Z', false)).toBe(500)
    await run('2026-11-04T12:10:00Z', false)
    await run('2026-11-04T17:50:00Z', false)
    expect(failed()).toBe(1)
    await run('2026-11-04T18:10:00Z', false)
    expect(failed()).toBe(2)
    expect(await run('2026-11-04T18:20:00Z', true)).toBe(200)
    expect(recovered()).toBe(1)
  })

  it('alerts again for a new outage right after a recovery', async () => {
    await run('2026-11-04T12:00:00Z', false)
    await run('2026-11-04T12:10:00Z', true)
    await run('2026-11-04T12:20:00Z', false)
    expect(failed()).toBe(2)
  })

  it('retries next run when the email did not go out', async () => {
    emailWorks = false
    await run('2026-11-04T12:00:00Z', false)
    emailWorks = true
    await run('2026-11-04T12:10:00Z', false)
    expect(failed()).toBe(1)
  })

  it('falls back to one email an hour when the log cannot be written', async () => {
    insertFails = true
    await run('2026-11-04T12:05:00Z', false)
    await run('2026-11-04T12:15:00Z', false)
    await run('2026-11-04T12:25:00Z', false)
    await run('2026-11-04T13:05:00Z', false)
    expect(failed()).toBe(2)
  })

  it('falls back to one email an hour when the database is down', async () => {
    dbDown = true
    await run('2026-11-04T15:05:00Z', true)
    await run('2026-11-04T15:25:00Z', true)
    expect(failed()).toBe(1)
  })

  it('still emails when saving the alert times out, whatever the minute', async () => {
    insertHangs = true
    await run('2026-11-04T12:20:00Z', false)
    expect(failed()).toBe(1)
  }, 15000)

  it('treats a hung banner.js as a failure', async () => {
    vi.setSystemTime(new Date('2026-11-04T12:00:00Z'))
    vi.stubGlobal('fetch', async () => { throw new DOMException('The operation was aborted due to timeout', 'TimeoutError') })
    const { GET } = await import('./route')
    const { NextRequest } = await import('next/server')
    expect((await GET(new NextRequest('https://x/api/cron/banner-health', { headers: { authorization: 'Bearer s' } }))).status).toBe(500)
    expect(failed()).toBe(1)
  })
})

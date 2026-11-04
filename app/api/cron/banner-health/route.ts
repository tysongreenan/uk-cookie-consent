// Every 10 minutes: can we read a live banner from the database, and does the public banner.js
// serve it? Emails ADMIN_EMAILS if not. The 2026-10-28 outage (rotated service key) ran 5 days unnoticed.
// shortcut: runs inside the same deployment, so it can't report a deployment that is fully down;
// pair it with an external uptime monitor on banner.js for that.
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

// The host customers' <script> tags point at.
const BANNER_HOST = 'https://www.cookie-banner.ca'

async function check(): Promise<string | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return 'Supabase env vars are missing.'

  const { data, error } = await createClient(url, key)
    .from('SimpleBanners')
    .select('id')
    .eq('isActive', true)
    .order('updatedAt', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error || !data) return `Database read failed: ${error?.message || 'no active banner found'}`

  // Unique query string so the CDN can't answer from cache.
  const res = await fetch(`${BANNER_HOST}/api/v1/banner.js?id=${data.id}&health=${Date.now()}`, { cache: 'no-store' })
  const body = await res.text()
  if (!res.ok) return `banner.js returned HTTP ${res.status} for banner ${data.id}.`
  if (!body.includes('cookie-consent-banner')) return `banner.js returned 200 but no banner code for ${data.id}: ${body.slice(0, 200)}`
  return null
}

export async function GET(request: NextRequest) {
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let problem: string | null
  try {
    problem = await check()
  } catch (e) {
    problem = `Health check threw: ${e instanceof Error ? e.message : String(e)}`
  }
  if (!problem) return NextResponse.json({ ok: true })

  console.error('[HEALTH] banner.js check failed:', problem)
  const to = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim()).filter(Boolean)
  await Promise.all(
    to.map((addr) =>
      sendEmail({
        to: addr,
        subject: 'cookie-banner.ca: banner health check failed',
        text: `${problem}\n\nCustomer banners may not be loading. Checked ${new Date().toISOString()}.`,
        html: `<p>${problem.replace(/</g, '&lt;')}</p><p>Customer banners may not be loading. Checked ${new Date().toISOString()}.</p>`,
      }),
    ),
  )
  return NextResponse.json({ ok: false, problem }, { status: 500 })
}

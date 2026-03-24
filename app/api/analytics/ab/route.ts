import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Server-side A/B test tracking — no cookies or consent required.
 *
 * POST /api/analytics/ab
 * Body: { experiment: string, variant: string, event: string }
 *
 * Stores events in Supabase `ab_events` table.
 * Create the table with:
 *
 *   CREATE TABLE ab_events (
 *     id BIGSERIAL PRIMARY KEY,
 *     experiment TEXT NOT NULL,
 *     variant TEXT NOT NULL,
 *     event TEXT NOT NULL DEFAULT 'pageview',
 *     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 *     ip_hash TEXT,
 *     user_agent TEXT
 *   );
 *   CREATE INDEX idx_ab_events_experiment ON ab_events (experiment, variant, event);
 *
 * GET /api/analytics/ab?experiment=homepage
 * Returns aggregate counts per variant.
 */

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

// Simple hash for IP anonymization (not reversible)
function hashIp(ip: string): string {
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32bit integer
  }
  return hash.toString(36)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { experiment, variant, event = 'pageview' } = body

    if (!experiment || !variant) {
      return NextResponse.json({ error: 'experiment and variant are required' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    if (!supabase) {
      // Silently succeed if no DB — don't break the page
      return NextResponse.json({ ok: true })
    }

    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
    const userAgent = request.headers.get('user-agent') || ''

    await supabase.from('ab_events').insert({
      experiment,
      variant,
      event,
      ip_hash: hashIp(ip),
      user_agent: userAgent.slice(0, 200),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true }) // Never break the page
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const experiment = searchParams.get('experiment')

  if (!experiment) {
    return NextResponse.json({ error: 'experiment param required' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  const { data, error } = await supabase
    .from('ab_events')
    .select('variant, event')
    .eq('experiment', experiment)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Aggregate counts
  const counts: Record<string, Record<string, number>> = {}
  for (const row of data || []) {
    if (!counts[row.variant]) counts[row.variant] = {}
    counts[row.variant][row.event] = (counts[row.variant][row.event] || 0) + 1
  }

  return NextResponse.json({ experiment, counts })
}

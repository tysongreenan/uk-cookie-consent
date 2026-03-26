import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { RateLimit } from '@/lib/rate-limit'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const VALID_EVENT_TYPES = ['impression', 'accept', 'reject', 'dismiss']
const VALID_DEVICES = new Set(['mobile', 'tablet', 'desktop'])

// 30 requests per minute per IP (one page load = ~2 requests max)
const trackRateLimit = new RateLimit({
  windowMs: 60 * 1000,
  maxRequests: 30,
})

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

// Validate UUID format (used for both userId and bannerId)
function isValidUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const rateLimitResult = await trackRateLimit.check(request)
    if (!rateLimitResult.allowed) {
      console.log('[TRACK] Rate limited')
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: CORS_HEADERS }
      )
    }

    const body = await request.json()
    const { userId, bannerId, events } = body

    console.log('[TRACK] Received:', { userId, bannerId, eventCount: events?.length, events })

    if (!userId || !isValidUuid(userId)) {
      console.warn('[TRACK] Invalid userId:', userId)
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    if (!events || !Array.isArray(events) || events.length === 0 || events.length > 10) {
      console.warn('[TRACK] Invalid events payload:', { events })
      return NextResponse.json(
        { error: 'Invalid events (1-10 required)' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    const supabase = getSupabase()

    // Validate user is on a plan that includes analytics (pro/enterprise)
    const { data: user, error: userError } = await supabase
      .from('User')
      .select('planTier')
      .eq('id', userId)
      .single()

    if (userError) {
      console.error('[TRACK] User lookup failed:', { userId, error: userError.message })
    }

    const tier = user?.planTier || 'free'
    if (tier === 'free') {
      console.log('[TRACK] Analytics not available on free plan:', userId)
      return NextResponse.json(
        { success: false, reason: 'plan_required' },
        { status: 200, headers: CORS_HEADERS }
      )
    }

    const today = new Date().toISOString().split('T')[0]

    // Validate bannerId format if provided
    const safeBannerId = bannerId && isValidUuid(bannerId) ? bannerId : null

    // Build all RPC calls first, then fire in parallel
    const rpcCalls: PromiseLike<{ event: string; type: 'stat' | 'visitor'; error: any }>[] = []

    for (const event of events) {
      if (!event.type || !VALID_EVENT_TYPES.includes(event.type)) {
        console.warn('[TRACK] Skipping invalid event type:', event.type)
        continue
      }

      const decisionTime = typeof event.decisionTime === 'number' && event.decisionTime > 0 && event.decisionTime < 300000
        ? Math.round(event.decisionTime)
        : null

      const safeGpc = Boolean(event.gpc)

      // Validate and sanitize dimension fields (backward compatible — defaults if missing)
      const safeSource = (typeof event.source === 'string' && /^[a-zA-Z0-9._+\-]{1,50}$/.test(event.source))
        ? event.source.toLowerCase() : 'direct'
      const safeDevice = (typeof event.device === 'string' && VALID_DEVICES.has(event.device))
        ? event.device : 'desktop'
      const safeCountry = (typeof event.country === 'string' && /^[A-Z]{2}$/.test(event.country))
        ? event.country : 'unknown'
      const safePagePath = (typeof event.pagePath === 'string')
        ? event.pagePath.replace(/[<>"']/g, '').slice(0, 200) : '/'

      rpcCalls.push(
        supabase.rpc('increment_banner_stat', {
          p_user_id: userId,
          p_date: today,
          p_event_type: event.type,
          p_decision_time_ms: decisionTime,
          p_is_returning: Boolean(event.isReturning),
          p_banner_id: safeBannerId,
          p_gpc: safeGpc
        }).then(r => ({ event: event.type, type: 'stat' as const, error: r.error }))
      )

      rpcCalls.push(
        supabase.rpc('increment_banner_visitor', {
          p_user_id: userId,
          p_banner_id: safeBannerId,
          p_date: today,
          p_event_type: event.type,
          p_source: safeSource,
          p_device: safeDevice,
          p_country: safeCountry,
          p_page_path: safePagePath,
          p_decision_time_ms: decisionTime,
          p_gpc: safeGpc
        }).then(r => ({ event: event.type, type: 'visitor' as const, error: r.error }))
      )
    }

    // Fire all RPCs in parallel (up to 20 calls for a full batch of 10 events)
    const results = await Promise.all(rpcCalls)
    for (const r of results) {
      if (r.error) {
        console.error(`[TRACK] ${r.type} RPC failed:`, { userId, bannerId: safeBannerId, event: r.event, error: r.error.message })
      }
    }

    return NextResponse.json(
      { success: true },
      { headers: CORS_HEADERS }
    )
  } catch (error) {
    console.error('[TRACK] Unexpected error:', error)
    return NextResponse.json(
      { success: false },
      { status: 500, headers: CORS_HEADERS }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  })
}

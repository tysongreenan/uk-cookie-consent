import { NextRequest, NextResponse } from 'next/server'
import { requireConsumerApiKey, validateDomain, CORS_HEADERS } from '@/lib/consumer-auth'
import { createClient } from '@supabase/supabase-js'
import { RateLimit } from '@/lib/rate-limit'
import { CONSUMER_PLAN_FEATURES } from '@/types'

const consentRateLimit = new RateLimit({
  windowMs: 60 * 1000,
  maxRequests: 60,
})

const VALID_ACTIONS = new Set(['auto_accept', 'auto_reject', 'auto_custom', 'manual', 'skipped'])

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

// POST /api/v1/consumer/consent — Extension reports a consent action
export async function POST(request: NextRequest) {
  // Rate limit
  const rateLimitResult = await consentRateLimit.check(request)
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: 'rate_limit', message: 'Too many requests', retryAfter: 30 },
      { status: 429, headers: CORS_HEADERS }
    )
  }

  const auth = await requireConsumerApiKey(request)
  if (auth instanceof NextResponse) return auth

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'invalid_body', message: 'Invalid JSON body' },
      { status: 400, headers: CORS_HEADERS }
    )
  }

  // Validate domain
  const domain = validateDomain(body.domain)
  if (!domain) {
    return NextResponse.json(
      { error: 'invalid_domain', message: 'Invalid or missing domain' },
      { status: 400, headers: CORS_HEADERS }
    )
  }

  // Validate action
  const action = body.action
  if (!action || !VALID_ACTIONS.has(action)) {
    return NextResponse.json(
      { error: 'invalid_action', message: 'Invalid action. Must be one of: auto_accept, auto_reject, auto_custom, manual, skipped' },
      { status: 400, headers: CORS_HEADERS }
    )
  }

  // Validate categoriesApplied (optional)
  const categoriesApplied = body.categoriesApplied && typeof body.categoriesApplied === 'object'
    ? body.categoriesApplied
    : null

  const extensionVersion = typeof body.extensionVersion === 'string'
    ? body.extensionVersion.slice(0, 20)
    : null

  const supabase = getSupabase()
  const today = new Date().toISOString().split('T')[0]

  // Check free tier daily cap
  const planFeatures = CONSUMER_PLAN_FEATURES[auth.consumerTier as keyof typeof CONSUMER_PLAN_FEATURES] || CONSUMER_PLAN_FEATURES.free
  if (planFeatures.maxBannersPerDay !== 'unlimited') {
    const { data: todayStats } = await supabase
      .from('consumer_daily_stats')
      .select('banners_handled')
      .eq('user_id', auth.userId)
      .eq('date', today)
      .single()

    if (todayStats && todayStats.banners_handled >= planFeatures.maxBannersPerDay) {
      return NextResponse.json(
        { error: 'daily_limit', message: `Free plan limit of ${planFeatures.maxBannersPerDay} banners/day reached. Upgrade to Premium for unlimited.`, logged: false },
        { status: 200, headers: CORS_HEADERS }
      )
    }
  }

  // Insert consent log + increment daily stats in parallel
  const [logResult, statResult] = await Promise.all([
    supabase
      .from('consumer_consent_log')
      .insert({
        user_id: auth.userId,
        domain,
        action,
        categories_applied: categoriesApplied,
        extension_version: extensionVersion,
      }),
    supabase.rpc('increment_consumer_stat', {
      p_user_id: auth.userId,
      p_date: today,
      p_action: action,
      p_domain: domain,
    }),
  ])

  if (logResult.error) {
    console.error('[CONSUMER] Consent log insert failed:', logResult.error)
  }
  if (statResult.error) {
    console.error('[CONSUMER] Stat increment failed:', statResult.error)
  }

  return NextResponse.json({ logged: true }, { headers: CORS_HEADERS })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

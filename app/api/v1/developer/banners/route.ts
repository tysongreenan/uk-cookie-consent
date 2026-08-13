import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  CORS_HEADERS,
  isDeveloperAuthContext,
  requireDeveloperApiKey,
} from '@/lib/developer-auth'
import { canCreateBanner, getBannerLimit, canUseLayout } from '@/lib/plan-restrictions'
import type { PlanTier } from '@/types'
import { logActivity, AuditAction } from '@/lib/audit-log'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
      ''
  )
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

/**
 * GET /api/v1/developer/banners
 * List banners for the authenticated developer account.
 */
export async function GET(request: NextRequest) {
  const auth = await requireDeveloperApiKey(request)
  if (!isDeveloperAuthContext(auth)) return auth

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('SimpleBanners')
    .select('id, name, isActive, createdAt, updatedAt, config')
    .eq('userId', auth.userId)
    .order('updatedAt', { ascending: false })

  if (error) {
    console.error('[DEVELOPER] list banners failed:', error)
    return NextResponse.json(
      { error: 'Failed to list banners' },
      { status: 500, headers: CORS_HEADERS }
    )
  }

  const banners = (data || []).map((b) => ({
    id: b.id,
    name: b.name,
    isActive: b.isActive ?? true,
    createdAt: b.createdAt,
    updatedAt: b.updatedAt,
    position: (b.config as { position?: string } | null)?.position ?? null,
    installUrl: `https://www.cookie-banner.ca/api/v1/banner.js?id=${b.id}`,
  }))

  return NextResponse.json(
    { banners, count: banners.length },
    { headers: CORS_HEADERS }
  )
}

/**
 * POST /api/v1/developer/banners
 * Create a banner from the terminal / MCP.
 */
export async function POST(request: NextRequest) {
  const auth = await requireDeveloperApiKey(request)
  if (!isDeveloperAuthContext(auth)) return auth

  const supabase = getSupabase()
  const userTier = (auth.planTier || 'free') as PlanTier

  const { data: existing } = await supabase.rpc('get_banners_simple', {
    user_id: auth.userId,
  })
  const currentCount = existing?.length || 0

  if (!canCreateBanner(userTier, currentCount)) {
    const limit = getBannerLimit(userTier)
    return NextResponse.json(
      {
        error: `Banner limit reached (${limit} on Free). Upgrade to Pro for unlimited banners.`,
        upgradeRequired: true,
      },
      { status: 403, headers: CORS_HEADERS }
    )
  }

  const body = await request.json().catch(() => ({}))
  const name =
    (typeof body.name === 'string' && body.name.trim()) || 'Untitled Banner'
  const config =
    body.config && typeof body.config === 'object'
      ? { ...body.config, name }
      : { name }

  if (config.position && !canUseLayout(userTier, config.position)) {
    return NextResponse.json(
      {
        error: `Layout "${config.position}" requires Pro.`,
        upgradeRequired: true,
      },
      { status: 403, headers: CORS_HEADERS }
    )
  }

  const bannerId = crypto.randomUUID()
  const code = `<!-- cookie-banner.ca ${bannerId} -->`

  const { error } = await supabase.rpc('create_banner_simple', {
    banner_id: bannerId,
    banner_name: name,
    banner_config: config,
    banner_code: code,
    user_id: auth.userId,
  })

  if (error) {
    console.error('[DEVELOPER] create banner failed:', error)
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500, headers: CORS_HEADERS }
    )
  }

  logActivity(auth.userId, AuditAction.BANNER_CREATE, request, {
    bannerId,
    bannerName: name,
    source: 'developer_api',
  })

  return NextResponse.json(
    {
      success: true,
      banner: {
        id: bannerId,
        name,
        installUrl: `https://www.cookie-banner.ca/api/v1/banner.js?id=${bannerId}`,
      },
    },
    { status: 201, headers: CORS_HEADERS }
  )
}

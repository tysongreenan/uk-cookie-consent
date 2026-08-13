import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  CORS_HEADERS,
  isDeveloperAuthContext,
  requireDeveloperApiKey,
} from '@/lib/developer-auth'
import { canUseLayout } from '@/lib/plan-restrictions'
import type { PlanTier } from '@/types'
import { logActivity, AuditAction } from '@/lib/audit-log'
import { invalidateBannerCache } from '@/lib/banner-cache'

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

type RouteContext = { params: { id: string } }

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

/**
 * GET /api/v1/developer/banners/:id
 */
export async function GET(request: NextRequest, { params }: RouteContext) {
  const auth = await requireDeveloperApiKey(request)
  if (!isDeveloperAuthContext(auth)) return auth

  const supabase = getSupabase()
  const { data: banner, error } = await supabase
    .from('SimpleBanners')
    .select('id, name, isActive, createdAt, updatedAt, config')
    .eq('id', params.id)
    .eq('userId', auth.userId)
    .single()

  if (error || !banner) {
    return NextResponse.json(
      { error: 'Banner not found' },
      { status: 404, headers: CORS_HEADERS }
    )
  }

  return NextResponse.json(
    {
      banner: {
        ...banner,
        isActive: banner.isActive ?? true,
        installUrl: `https://www.cookie-banner.ca/api/v1/banner.js?id=${banner.id}`,
        installSnippet: `<script async src="https://www.cookie-banner.ca/api/v1/banner.js?id=${banner.id}"></script>`,
      },
    },
    { headers: CORS_HEADERS }
  )
}

/**
 * PATCH /api/v1/developer/banners/:id
 * Partial update: name, isActive, and/or config fields (merged into existing config).
 */
export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const auth = await requireDeveloperApiKey(request)
  if (!isDeveloperAuthContext(auth)) return auth

  const supabase = getSupabase()
  const { data: existing, error: fetchError } = await supabase
    .from('SimpleBanners')
    .select('id, name, isActive, config, userId')
    .eq('id', params.id)
    .eq('userId', auth.userId)
    .single()

  if (fetchError || !existing) {
    return NextResponse.json(
      { error: 'Banner not found' },
      { status: 404, headers: CORS_HEADERS }
    )
  }

  const body = await request.json().catch(() => ({}))
  const userTier = (auth.planTier || 'free') as PlanTier

  // Toggle-only shortcut
  if (
    typeof body.isActive === 'boolean' &&
    Object.keys(body).filter((k) => body[k] !== undefined).length === 1
  ) {
    const { error: rpcError } = await supabase.rpc('toggle_banner_active', {
      banner_id: params.id,
      user_id: existing.userId,
      is_active: body.isActive,
    })

    if (rpcError) {
      console.error('[DEVELOPER] toggle failed:', rpcError)
      return NextResponse.json(
        { error: 'Failed to update banner status' },
        { status: 500, headers: CORS_HEADERS }
      )
    }

    await invalidateBannerCache(params.id)
    logActivity(auth.userId, AuditAction.BANNER_UPDATE, request, {
      bannerId: params.id,
      isActive: body.isActive,
      source: 'developer_api',
    })

    return NextResponse.json(
      { success: true, bannerId: params.id, isActive: body.isActive },
      { headers: CORS_HEADERS }
    )
  }

  const currentConfig =
    existing.config && typeof existing.config === 'object'
      ? { ...(existing.config as Record<string, unknown>) }
      : {}

  const patchConfig =
    body.config && typeof body.config === 'object'
      ? (body.config as Record<string, unknown>)
      : {}

  // Deep-merge config patches (text/colors/layout objects)
  const mergedConfig: Record<string, unknown> = {
    ...currentConfig,
    ...patchConfig,
  }
  for (const nest of ['text', 'colors', 'layout', 'behavior', 'advanced'] as const) {
    if (
      currentConfig[nest] &&
      typeof currentConfig[nest] === 'object' &&
      patchConfig[nest] &&
      typeof patchConfig[nest] === 'object'
    ) {
      mergedConfig[nest] = {
        ...(currentConfig[nest] as object),
        ...(patchConfig[nest] as object),
      }
    }
  }

  // Map flat convenience fields → nested banner config shape
  const text = {
    ...((mergedConfig.text as Record<string, unknown>) || {}),
  }
  if (body.title !== undefined) text.title = body.title
  if (body.message !== undefined) text.message = body.message
  if (body.acceptButton !== undefined) text.acceptButton = body.acceptButton
  if (body.rejectButton !== undefined) text.rejectButton = body.rejectButton
  if (body.preferencesButton !== undefined) {
    text.preferencesButton = body.preferencesButton
  }
  if (Object.keys(text).length) mergedConfig.text = text

  const colors = {
    ...((mergedConfig.colors as Record<string, unknown>) || {}),
  }
  if (body.primaryColor !== undefined) colors.button = body.primaryColor
  if (body.backgroundColor !== undefined) colors.background = body.backgroundColor
  if (body.textColor !== undefined) colors.text = body.textColor
  if (Object.keys(colors).length) mergedConfig.colors = colors

  if (body.position !== undefined) mergedConfig.position = body.position
  if (body.theme !== undefined) mergedConfig.theme = body.theme

  const bannerName =
    (typeof body.name === 'string' && body.name.trim()) ||
    (typeof mergedConfig.name === 'string' && mergedConfig.name) ||
    existing.name ||
    'Untitled Banner'

  mergedConfig.name = bannerName

  if (mergedConfig.position && !canUseLayout(userTier, String(mergedConfig.position))) {
    return NextResponse.json(
      {
        error: `Layout "${mergedConfig.position}" requires Pro.`,
        upgradeRequired: true,
      },
      { status: 403, headers: CORS_HEADERS }
    )
  }

  const code = `<!-- cookie-banner.ca ${params.id} -->`

  const { error: updateError } = await supabase.rpc('update_banner_simple', {
    banner_id: params.id,
    banner_name: bannerName,
    banner_config: mergedConfig,
    banner_code: code,
    user_id: existing.userId,
  })

  if (updateError) {
    console.error('[DEVELOPER] update failed:', updateError)
    return NextResponse.json(
      { error: 'Failed to update banner' },
      { status: 500, headers: CORS_HEADERS }
    )
  }

  if (typeof body.isActive === 'boolean') {
    await supabase.rpc('toggle_banner_active', {
      banner_id: params.id,
      user_id: existing.userId,
      is_active: body.isActive,
    })
  }

  await invalidateBannerCache(params.id)
  logActivity(auth.userId, AuditAction.BANNER_UPDATE, request, {
    bannerId: params.id,
    bannerName,
    source: 'developer_api',
  })

  const { data: updated } = await supabase
    .from('SimpleBanners')
    .select('id, name, isActive, updatedAt, config')
    .eq('id', params.id)
    .single()

  return NextResponse.json(
    {
      success: true,
      banner: updated
        ? {
            ...updated,
            isActive: updated.isActive ?? true,
            installUrl: `https://www.cookie-banner.ca/api/v1/banner.js?id=${updated.id}`,
          }
        : { id: params.id, name: bannerName },
    },
    { headers: CORS_HEADERS }
  )
}

/**
 * DELETE /api/v1/developer/banners/:id
 */
export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const auth = await requireDeveloperApiKey(request)
  if (!isDeveloperAuthContext(auth)) return auth

  const supabase = getSupabase()
  const { data: existing } = await supabase
    .from('SimpleBanners')
    .select('id, userId')
    .eq('id', params.id)
    .eq('userId', auth.userId)
    .single()

  if (!existing) {
    return NextResponse.json(
      { error: 'Banner not found' },
      { status: 404, headers: CORS_HEADERS }
    )
  }

  const { error } = await supabase.rpc('delete_banner_simple', {
    banner_id: params.id,
    user_id: existing.userId,
  })

  if (error) {
    console.error('[DEVELOPER] delete failed:', error)
    return NextResponse.json(
      { error: 'Failed to delete banner' },
      { status: 500, headers: CORS_HEADERS }
    )
  }

  await invalidateBannerCache(params.id)
  logActivity(auth.userId, AuditAction.BANNER_DELETE, request, {
    bannerId: params.id,
    source: 'developer_api',
  })

  return NextResponse.json(
    { success: true, message: 'Banner deleted' },
    { headers: CORS_HEADERS }
  )
}

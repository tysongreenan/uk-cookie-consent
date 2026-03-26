import { NextRequest, NextResponse } from 'next/server'
import { requireConsumerApiKey, CORS_HEADERS } from '@/lib/consumer-auth'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

// GET /api/v1/consumer/preferences — Extension fetches current preferences
// Supports ETag/304 for efficient caching
export async function GET(request: NextRequest) {
  const auth = await requireConsumerApiKey(request)
  if (auth instanceof NextResponse) return auth

  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('consumer_preferences')
    .select('preferences, default_action, auto_apply, show_notification, updated_at')
    .eq('user_id', auth.userId)
    .single()

  if (error || !data) {
    // No preferences set yet — return defaults
    const defaults = {
      preferences: { strictlyNecessary: 'accept', functionality: 'accept', analytics: 'reject', marketing: 'reject' },
      defaultAction: 'reject_all',
      autoApply: true,
      tier: auth.consumerTier,
    }
    return NextResponse.json(defaults, { headers: CORS_HEADERS })
  }

  const body = {
    preferences: data.preferences,
    defaultAction: data.default_action,
    autoApply: data.auto_apply,
    showNotification: data.show_notification,
    tier: auth.consumerTier,
  }

  // ETag for efficient caching — extension sends If-None-Match to avoid re-downloading unchanged prefs
  const etag = `"prefs-${crypto.createHash('sha256').update(JSON.stringify(body)).digest('hex').slice(0, 16)}"`
  const ifNoneMatch = request.headers.get('if-none-match')
  if (ifNoneMatch === etag) {
    return new NextResponse(null, { status: 304, headers: { ...CORS_HEADERS, ETag: etag } })
  }

  return NextResponse.json(body, {
    headers: {
      ...CORS_HEADERS,
      'Cache-Control': 'private, max-age=300, must-revalidate',
      ETag: etag,
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

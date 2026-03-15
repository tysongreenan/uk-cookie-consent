import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const VALID_EVENT_TYPES = ['impression', 'accept', 'reject', 'dismiss']

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

// Validate userId format (UUID)
function isValidUserId(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, events } = body

    if (!userId || !isValidUserId(userId)) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    if (!events || !Array.isArray(events) || events.length === 0 || events.length > 10) {
      return NextResponse.json(
        { error: 'Invalid events (1-10 required)' },
        { status: 400, headers: CORS_HEADERS }
      )
    }

    const supabase = getSupabase()

    // Validate user has analytics enabled
    const { data: user } = await supabase
      .from('User')
      .select('analytics_enabled')
      .eq('id', userId)
      .single()

    if (!user?.analytics_enabled) {
      return NextResponse.json(
        { success: false, message: 'Analytics not enabled' },
        { status: 200, headers: CORS_HEADERS }
      )
    }

    const today = new Date().toISOString().split('T')[0]

    // Process batched events
    for (const event of events) {
      if (!event.type || !VALID_EVENT_TYPES.includes(event.type)) continue

      const decisionTime = typeof event.decisionTime === 'number' && event.decisionTime > 0 && event.decisionTime < 300000
        ? Math.round(event.decisionTime)
        : null

      await supabase.rpc('increment_banner_stat', {
        p_user_id: userId,
        p_date: today,
        p_event_type: event.type,
        p_decision_time_ms: decisionTime,
        p_is_returning: Boolean(event.isReturning)
      })
    }

    return NextResponse.json(
      { success: true },
      { headers: CORS_HEADERS }
    )
  } catch (error) {
    console.error('Track error:', error)
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

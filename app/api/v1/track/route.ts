import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'placeholder-key'
)

export async function POST(request: NextRequest) {
  try {
    const { userId, events } = await request.json()
    
    if (!userId || !events || !Array.isArray(events)) {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }
    
    // Validate user has analytics enabled
    const { data: user } = await supabase
      .from('User')
      .select('analytics_enabled')
      .eq('id', userId)
      .single()
    
    if (!user?.analytics_enabled) {
      return NextResponse.json(
        { success: false, message: 'Analytics not enabled' },
        { status: 403 }
      )
    }
    
    const today = new Date().toISOString().split('T')[0]
    
    // Process batched events
    for (const event of events) {
      if (!event.type) continue
      
      await supabase.rpc('increment_banner_stat', {
        p_user_id: userId,
        p_date: today,
        p_event_type: event.type,
        p_decision_time_ms: event.decisionTime || null,
        p_is_returning: event.isReturning || false
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Track error:', error)
    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}

// Add CORS headers for cross-origin requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

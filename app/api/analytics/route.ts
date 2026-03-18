import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// GET /api/analytics - Fetch banner stats and analytics status
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Fetch stats and analytics status in parallel
    const [statsResult, userResult] = await Promise.all([
      supabase
        .from('banner_stats')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: true })
        .limit(30),
      supabase
        .from('User')
        .select('analytics_enabled')
        .eq('id', userId)
        .single()
    ])

    return NextResponse.json({
      stats: statsResult.data || [],
      analyticsEnabled: userResult.data?.analytics_enabled || false
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PATCH /api/analytics - Toggle analytics enabled/disabled
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { enabled } = await request.json()
    if (typeof enabled !== 'boolean') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const { error } = await supabase
      .from('User')
      .update({ analytics_enabled: enabled })
      .eq('id', session.user.id)

    if (error) {
      console.error('Error toggling analytics:', error)
      return NextResponse.json({ error: 'Failed to update analytics settings' }, { status: 500 })
    }

    return NextResponse.json({ analyticsEnabled: enabled })
  } catch (error) {
    console.error('Error toggling analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

const VALID_DIMENSIONS = new Set(['source', 'device', 'country', 'page_path'])

// GET /api/analytics/dimensions?dimension=source&bannerId=xxx&days=30
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Verify plan tier
    const { data: user } = await supabase
      .from('User')
      .select('planTier')
      .eq('id', userId)
      .single()

    if (!user || user.planTier === 'free') {
      return NextResponse.json({ error: 'Pro plan required' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const dimension = searchParams.get('dimension') || 'source'
    const bannerId = searchParams.get('bannerId') || null
    const days = Math.min(Math.max(parseInt(searchParams.get('days') || '30', 10), 1), 90)

    if (!VALID_DIMENSIONS.has(dimension)) {
      return NextResponse.json({ error: 'Invalid dimension' }, { status: 400 })
    }

    const { data, error } = await supabase.rpc('get_visitor_breakdown', {
      p_user_id: userId,
      p_dimension: dimension,
      p_banner_id: bannerId,
      p_days: days
    })

    if (error) {
      console.error('Dimension breakdown error:', error)
      return NextResponse.json({ error: 'Failed to fetch dimensions' }, { status: 500 })
    }

    return NextResponse.json({ dimension, data: data || [] })
  } catch (error) {
    console.error('Dimensions API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

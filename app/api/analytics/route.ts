import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// GET /api/analytics - Fetch banner stats (analytics is automatic for pro/enterprise)
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const planTier = session.user?.planTier || 'free'
    const analyticsEnabled = planTier !== 'free'

    if (!analyticsEnabled) {
      return NextResponse.json({ stats: [], analyticsEnabled: false })
    }

    // Fetch stats (only for pro/enterprise)
    const { data: stats, error: statsError } = await supabase
      .from('banner_stats')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true })
      .limit(30)

    if (statsError) {
      console.error('Error fetching banner stats:', statsError)
    }

    return NextResponse.json({
      stats: stats || [],
      analyticsEnabled
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

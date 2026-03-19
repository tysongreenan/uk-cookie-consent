import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// GET /api/analytics - Fetch banner stats (analytics is automatic for pro/enterprise)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Query planTier fresh from DB so upgrades take effect immediately
    const { data: user } = await supabase
      .from('User')
      .select('planTier')
      .eq('id', userId)
      .single()

    const planTier = user?.planTier || 'free'
    const analyticsEnabled = planTier !== 'free'

    if (!analyticsEnabled) {
      return NextResponse.json({ stats: [], banners: [], analyticsEnabled: false })
    }

    // Optional banner filter
    const { searchParams } = new URL(request.url)
    const bannerId = searchParams.get('bannerId')

    // Fetch stats and banner list in parallel
    let statsQuery = supabase
      .from('banner_stats')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: true })
      .limit(90)

    if (bannerId && bannerId !== 'all') {
      statsQuery = statsQuery.eq('banner_id', bannerId)
    }

    const [statsResult, bannersResult] = await Promise.all([
      statsQuery,
      supabase
        .from('SimpleBanners')
        .select('id, name, config')
        .eq('userId', userId)
        .order('name', { ascending: true })
    ])

    if (statsResult.error) {
      console.error('Error fetching banner stats:', statsResult.error)
    }

    // Extract GA4 status from each banner's config
    const banners = (bannersResult.data || []).map((b: any) => {
      const config = typeof b.config === 'string' ? JSON.parse(b.config) : b.config
      const ga4 = config?.integrations?.googleAnalytics
      return {
        id: b.id,
        name: b.name,
        hasGa4: !!(ga4?.enabled && ga4?.measurementId),
      }
    })

    return NextResponse.json({
      stats: statsResult.data || [],
      banners,
      analyticsEnabled
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

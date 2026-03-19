import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// GET /api/analytics/benchmarks?days=30
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Verify plan tier supports benchmarks
    const { data: user } = await supabase
      .from('User')
      .select('planTier')
      .eq('id', userId)
      .single()

    if (!user || user.planTier === 'free') {
      return NextResponse.json({ error: 'Pro plan required' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const days = Math.min(Math.max(parseInt(searchParams.get('days') || '30', 10), 1), 90)
    const todayUtc = new Date().toISOString().split('T')[0]

    // Fetch platform benchmarks and user's own stats in parallel
    const [benchmarkResult, userStatsResult] = await Promise.all([
      supabase.rpc('get_platform_benchmarks', { p_days: days, p_today: todayUtc }),
      supabase
        .from('banner_stats')
        .select('impressions, accepts, rejects, dismisses, total_decision_time_ms, decision_count')
        .eq('user_id', userId)
        .gte('date', new Date(Date.now() - days * 86400000).toISOString().split('T')[0])
    ])

    if (benchmarkResult.error) {
      console.error('Benchmark RPC error:', benchmarkResult.error)
      return NextResponse.json({ error: 'Failed to fetch benchmarks' }, { status: 500 })
    }

    if (userStatsResult.error) {
      console.error('User stats query error:', userStatsResult.error)
    }

    const platformRaw = benchmarkResult.data?.[0] || null

    // Aggregate user stats
    const userRows = userStatsResult.data || []
    const userTotals = userRows.reduce((acc, row) => ({
      impressions: acc.impressions + (row.impressions || 0),
      accepts: acc.accepts + (row.accepts || 0),
      rejects: acc.rejects + (row.rejects || 0),
      dismisses: acc.dismisses + (row.dismisses || 0),
      totalDecisionTime: acc.totalDecisionTime + (row.total_decision_time_ms || 0),
      decisionCount: acc.decisionCount + (row.decision_count || 0),
    }), { impressions: 0, accepts: 0, rejects: 0, dismisses: 0, totalDecisionTime: 0, decisionCount: 0 })

    const hasImpressions = userTotals.impressions > 0
    const userMetrics = {
      acceptRate: hasImpressions ? parseFloat((userTotals.accepts / userTotals.impressions * 100).toFixed(1)) : 0,
      rejectRate: hasImpressions ? parseFloat((userTotals.rejects / userTotals.impressions * 100).toFixed(1)) : 0,
      dismissRate: hasImpressions ? parseFloat((userTotals.dismisses / userTotals.impressions * 100).toFixed(1)) : 0,
      avgDecisionTimeMs: userTotals.decisionCount > 0
        ? Math.round(userTotals.totalDecisionTime / userTotals.decisionCount)
        : null,
    }

    // Build platform object only when we have enough data (5+ users)
    const platform = platformRaw && platformRaw.avg_accept_rate !== null ? {
      totalUsers: Number(platformRaw.total_users),
      avgAcceptRate: Number(platformRaw.avg_accept_rate),
      avgRejectRate: Number(platformRaw.avg_reject_rate),
      avgDismissRate: Number(platformRaw.avg_dismiss_rate),
      avgDecisionTimeMs: platformRaw.avg_decision_time_ms != null ? Number(platformRaw.avg_decision_time_ms) : null,
    } : null

    // Compute insights only when we have enough platform data
    const insights: { metric: string; direction: 'above' | 'below'; diff: number }[] = []
    if (platform) {
      const acceptDiff = parseFloat((userMetrics.acceptRate - platform.avgAcceptRate).toFixed(1))
      if (Math.abs(acceptDiff) >= 1) {
        insights.push({ metric: 'accept rate', direction: acceptDiff > 0 ? 'above' : 'below', diff: Math.abs(acceptDiff) })
      }

      const rejectDiff = parseFloat((userMetrics.rejectRate - platform.avgRejectRate).toFixed(1))
      if (Math.abs(rejectDiff) >= 1) {
        insights.push({ metric: 'reject rate', direction: rejectDiff > 0 ? 'above' : 'below', diff: Math.abs(rejectDiff) })
      }

      const dismissDiff = parseFloat((userMetrics.dismissRate - platform.avgDismissRate).toFixed(1))
      if (Math.abs(dismissDiff) >= 1) {
        insights.push({ metric: 'dismiss rate', direction: dismissDiff > 0 ? 'above' : 'below', diff: Math.abs(dismissDiff) })
      }
    }

    return NextResponse.json({
      platform,
      user: userMetrics,
      insights,
    })
  } catch (error) {
    console.error('Benchmarks API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

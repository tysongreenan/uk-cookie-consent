import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"),
  (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "placeholder-key")
)

// GET /api/analytics/export?format=csv|json&bannerId=xxx
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'csv'
    const bannerId = searchParams.get('bannerId')

    // Verify pro/enterprise plan
    const { data: user } = await supabase
      .from('User')
      .select('planTier')
      .eq('id', userId)
      .single()

    if (!user || user.planTier === 'free') {
      return NextResponse.json({ error: 'Pro plan required' }, { status: 403 })
    }

    // Fetch daily stats and dimension data in parallel
    let statsQuery = supabase
      .from('banner_stats')
      .select('date, banner_id, impressions, accepts, rejects, dismisses, total_decision_time_ms, decision_count, returning_visitor_impressions')
      .eq('user_id', userId)
      .order('date', { ascending: true })

    let visitorsQuery = supabase
      .from('banner_visitors')
      .select('date, banner_id, source, device, country, page_path, impressions, accepts, rejects, dismisses')
      .eq('user_id', userId)
      .order('date', { ascending: true })

    if (bannerId && bannerId !== 'all') {
      statsQuery = statsQuery.eq('banner_id', bannerId)
      visitorsQuery = visitorsQuery.eq('banner_id', bannerId)
    }

    const [statsResult, visitorsResult, bannersResult] = await Promise.all([
      statsQuery,
      visitorsQuery,
      supabase
        .from('SimpleBanners')
        .select('id, name')
        .eq('userId', userId),
    ])

    const bannerNames = new Map(
      (bannersResult.data || []).map((b: { id: string; name: string }) => [b.id, b.name])
    )

    const dailyStats = (statsResult.data || []).map((row: any) => ({
      date: row.date,
      banner: bannerNames.get(row.banner_id) || row.banner_id || 'Unknown',
      impressions: row.impressions,
      accepts: row.accepts,
      rejects: row.rejects,
      dismisses: row.dismisses,
      accept_rate: row.impressions > 0 ? +(row.accepts / row.impressions * 100).toFixed(1) : 0,
      reject_rate: row.impressions > 0 ? +(row.rejects / row.impressions * 100).toFixed(1) : 0,
      dismiss_rate: row.impressions > 0 ? +(row.dismisses / row.impressions * 100).toFixed(1) : 0,
      avg_decision_time_s: row.decision_count > 0 ? +(row.total_decision_time_ms / row.decision_count / 1000).toFixed(1) : 0,
      returning_visitor_impressions: row.returning_visitor_impressions,
    }))

    const visitorBreakdown = (visitorsResult.data || []).map((row: any) => ({
      date: row.date,
      banner: bannerNames.get(row.banner_id) || row.banner_id || 'Unknown',
      source: row.source,
      device: row.device,
      country: row.country,
      page_path: row.page_path,
      impressions: row.impressions,
      accepts: row.accepts,
      rejects: row.rejects,
      dismisses: row.dismisses,
    }))

    if (format === 'json') {
      const exportData = {
        exported_at: new Date().toISOString(),
        daily_stats: dailyStats,
        visitor_breakdown: visitorBreakdown,
      }

      return new NextResponse(JSON.stringify(exportData, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="analytics-export-${new Date().toISOString().split('T')[0]}.json"`,
        },
      })
    }

    // CSV format — two sheets combined with a separator
    const statsHeaders = ['date', 'banner', 'impressions', 'accepts', 'rejects', 'dismisses', 'accept_rate_%', 'reject_rate_%', 'dismiss_rate_%', 'avg_decision_time_s', 'returning_visitor_impressions']
    const visitorHeaders = ['date', 'banner', 'source', 'device', 'country', 'page_path', 'impressions', 'accepts', 'rejects', 'dismisses']

    let csv = '# Daily Stats\n'
    csv += statsHeaders.join(',') + '\n'
    for (const row of dailyStats) {
      csv += [
        row.date, csvEscape(row.banner), row.impressions, row.accepts, row.rejects, row.dismisses,
        row.accept_rate, row.reject_rate, row.dismiss_rate, row.avg_decision_time_s,
        row.returning_visitor_impressions,
      ].join(',') + '\n'
    }

    csv += '\n# Visitor Breakdown\n'
    csv += visitorHeaders.join(',') + '\n'
    for (const row of visitorBreakdown) {
      csv += [
        row.date, csvEscape(row.banner), csvEscape(row.source), csvEscape(row.device),
        csvEscape(row.country), csvEscape(row.page_path), row.impressions, row.accepts,
        row.rejects, row.dismisses,
      ].join(',') + '\n'
    }

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="analytics-export-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error('Error exporting analytics:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}

function csvEscape(value: string | null | undefined): string {
  if (!value) return ''
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

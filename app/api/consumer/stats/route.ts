import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

// GET /api/consumer/stats?days=30 — Get daily stats for dashboard charts
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const days = Math.min(Math.max(parseInt(searchParams.get('days') || '30', 10), 1), 90)

  const supabase = getSupabase()
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  const { data: stats, error } = await supabase
    .from('consumer_daily_stats')
    .select('*')
    .eq('user_id', session.user.id)
    .gte('date', cutoffDate.toISOString().split('T')[0])
    .order('date', { ascending: true })

  if (error) {
    console.error('[CONSUMER] Stats fetch failed:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }

  // Compute summary totals
  const totals = (stats || []).reduce((acc, day) => ({
    bannersHandled: acc.bannersHandled + day.banners_handled,
    autoAccepts: acc.autoAccepts + day.auto_accepts,
    autoRejects: acc.autoRejects + day.auto_rejects,
    autoCustom: acc.autoCustom + day.auto_custom,
    manualOverrides: acc.manualOverrides + day.manual_overrides,
    timeSavedMs: acc.timeSavedMs + day.time_saved_ms,
  }), { bannersHandled: 0, autoAccepts: 0, autoRejects: 0, autoCustom: 0, manualOverrides: 0, timeSavedMs: 0 })

  // Count unique domains from recent consent log (approximate — from daily stats)
  const { count: uniqueDomains } = await supabase
    .from('consumer_consent_log')
    .select('domain', { count: 'exact', head: true })
    .eq('user_id', session.user.id)
    .gte('created_at', cutoffDate.toISOString())

  return NextResponse.json({
    stats: stats || [],
    summary: {
      ...totals,
      uniqueDomains: uniqueDomains || 0,
      // Estimate time saved: ~1.5 seconds per banner handled
      estimatedTimeSavedSeconds: Math.round(totals.bannersHandled * 1.5),
    },
    days,
  })
}

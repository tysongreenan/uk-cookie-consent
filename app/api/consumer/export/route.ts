import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

// GET /api/consumer/export — GDPR DSAR: export all consumer data as JSON
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()

  // Fetch all consumer data in parallel
  const [prefsResult, logResult, statsResult] = await Promise.all([
    supabase
      .from('consumer_preferences')
      .select('preferences, default_action, auto_apply, show_notification, created_at, updated_at')
      .eq('user_id', session.user.id)
      .single(),
    supabase
      .from('consumer_consent_log')
      .select('domain, action, categories_applied, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(10000), // Cap at 10k rows for safety
    supabase
      .from('consumer_daily_stats')
      .select('date, banners_handled, auto_accepts, auto_rejects, auto_custom, manual_overrides')
      .eq('user_id', session.user.id)
      .order('date', { ascending: false }),
  ])

  const exportData = {
    exported_at: new Date().toISOString(),
    user_id: session.user.id,
    preferences: prefsResult.data || null,
    consent_history: logResult.data || [],
    daily_stats: statsResult.data || [],
  }

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="privacy-data-export-${new Date().toISOString().split('T')[0]}.json"`,
    },
  })
}

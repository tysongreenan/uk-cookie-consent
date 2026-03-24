// Weekly cron: deletes audit_log entries older than 13 months
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return NextResponse.json({ error: 'Supabase config missing' }, { status: 500 })
  }

  const supabase = createClient(url, key)

  const { data, error } = await supabase.rpc('cleanup_old_audit_logs')

  if (error) {
    // Fallback: direct delete if RPC doesn't exist
    const { error: deleteError } = await supabase
      .from('audit_log')
      .delete()
      .lt('created_at', (() => { const d = new Date(); d.setMonth(d.getMonth() - 13); return d.toISOString() })())

    if (deleteError) {
      console.error('[CRON] Audit log cleanup failed:', deleteError)
      return NextResponse.json({ error: 'Cleanup failed' }, { status: 500 })
    }
  }

  console.log('[CRON] Audit log cleanup completed')
  return NextResponse.json({ success: true })
}

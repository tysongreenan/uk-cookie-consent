/**
 * Consent Partition Maintenance — monthly cron to keep future consent_records
 * partitions ahead of incoming inserts.
 *
 * Schedule: monthly on the 20th at 04:00 UTC (configured in vercel.json).
 * Ensures partitions exist for the current month plus the next 3 months by
 * calling create_consent_records_partition (idempotent). Without this, inserts
 * into consent_records fail once traffic rolls past the last created partition.
 */

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

/** Returns the first day of a month `offset` months from `base`, as YYYY-MM-DD. */
function monthStart(base: Date, offset: number): string {
  const d = new Date(Date.UTC(base.getUTCFullYear(), base.getUTCMonth() + offset, 1))
  return d.toISOString().slice(0, 10)
}

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

  const now = new Date()
  // Current month + next 3 months.
  const targetMonths = [0, 1, 2, 3].map((offset) => monthStart(now, offset))

  const processed: string[] = []
  const errors: { month: string; error: string }[] = []

  for (const month of targetMonths) {
    // The RPC returns void — it internally skips months whose partition already
    // exists, so we cannot distinguish created-vs-skipped from the result. We
    // just record that the month was processed (or capture any error).
    const { error } = await supabase.rpc('create_consent_records_partition', {
      target_month: month,
    })

    if (error) {
      console.error('[CRON] consent partition creation failed:', { month, error: error.message })
      errors.push({ month, error: error.message })
    } else {
      processed.push(month)
    }
  }

  console.log(`[CRON] consent partitions: ${processed.length} processed, ${errors.length} error(s)`)

  // Non-200 on any failure so Vercel cron monitoring flags the run.
  return NextResponse.json(
    {
      success: errors.length === 0,
      processed,
      errors,
    },
    { status: errors.length > 0 ? 500 : 200 }
  )
}

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { CONSUMER_PLAN_FEATURES, ConsumerTier } from '@/types'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

// GET /api/consumer/history?cursor=123&limit=50&action=auto_reject&domain=example
export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const cursor = searchParams.get('cursor') // BIGINT id for cursor-based pagination
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '50', 10), 1), 100)
  const actionFilter = searchParams.get('action')
  const domainFilter = searchParams.get('domain')

  // Enforce history retention based on plan
  const consumerTier = (session.user as any).consumerTier || 'free'
  const planFeatures = CONSUMER_PLAN_FEATURES[consumerTier as ConsumerTier] || CONSUMER_PLAN_FEATURES.free
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - planFeatures.historyRetentionDays)

  const supabase = getSupabase()
  let query = supabase
    .from('consumer_consent_log')
    .select('id, domain, action, categories_applied, created_at')
    .eq('user_id', session.user.id)
    .gte('created_at', cutoffDate.toISOString())
    .order('created_at', { ascending: false })
    .limit(limit + 1) // Fetch one extra to detect if there's a next page

  if (cursor) {
    query = query.lt('id', cursor)
  }
  if (actionFilter) {
    query = query.eq('action', actionFilter)
  }
  if (domainFilter) {
    query = query.ilike('domain', `%${domainFilter}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error('[CONSUMER] History fetch failed:', error)
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 })
  }

  const rows = data || []
  const hasMore = rows.length > limit
  const items = hasMore ? rows.slice(0, limit) : rows
  const nextCursor = hasMore && items.length > 0 ? String(items[items.length - 1].id) : null

  return NextResponse.json({
    items,
    nextCursor,
    hasMore,
  })
}

// Revenue analytics endpoint (admin only)
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSupabaseAdmin } from '@/lib/supabase-admin'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

// Admin emails - can be overridden via ADMIN_EMAILS env var (comma-separated)
const ADMIN_EMAILS = process.env.ADMIN_EMAILS
  ? process.env.ADMIN_EMAILS.split(',').map((e) => e.trim())
  : ['support@cookie-banner.ca']

interface PaymentRecord {
  id: string
  userId: string
  amount: number
  currency: string
  status: string
  planTier: string
  createdAt: string
}

interface UserRecord {
  id: string
  email: string | null
  name: string | null
}

interface PaymentAggregates {
  successfulCount: number
  failedCount: number
  refundedCount: number
  totalRevenueCents: number
  refundedRevenueCents: number
  dailyRevenueMap: Map<string, { revenue: number; count: number }>
  recentPayments: PaymentRecord[]
}

async function aggregatePaymentsSince(startDate: Date, recentLimit = 50): Promise<PaymentAggregates> {
  const supabase = getSupabaseAdmin()
  const pageSize = 1000
  let offset = 0

  const agg: PaymentAggregates = {
    successfulCount: 0,
    failedCount: 0,
    refundedCount: 0,
    totalRevenueCents: 0,
    refundedRevenueCents: 0,
    dailyRevenueMap: new Map(),
    recentPayments: [],
  }

  while (true) {
    const { data, error } = await supabase
      .from('Payment')
      .select('id, userId, amount, currency, status, planTier, createdAt')
      .gte('createdAt', startDate.toISOString())
      .order('createdAt', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (error) {
      throw error
    }

    const page = (data || []) as PaymentRecord[]

    for (const payment of page) {
      if (agg.recentPayments.length < recentLimit) {
        agg.recentPayments.push(payment)
      }

      if (payment.status === 'succeeded') {
        agg.successfulCount += 1
        agg.totalRevenueCents += payment.amount
        const date = payment.createdAt.slice(0, 10)
        const existing = agg.dailyRevenueMap.get(date) || { revenue: 0, count: 0 }
        existing.revenue += payment.amount
        existing.count += 1
        agg.dailyRevenueMap.set(date, existing)
      } else if (payment.status === 'failed') {
        agg.failedCount += 1
      } else if (payment.status === 'refunded') {
        agg.refundedCount += 1
        agg.refundedRevenueCents += payment.amount
      }
    }

    if (page.length < pageSize) {
      break
    }

    offset += pageSize
  }

  return agg
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email || !ADMIN_EMAILS.includes(session.user.email)) {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d' // 7d, 30d, 90d, all

    // Calculate date range
    const now = new Date()
    let startDate = new Date()

    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7)
        break
      case '30d':
        startDate.setDate(now.getDate() - 30)
        break
      case '90d':
        startDate.setDate(now.getDate() - 90)
        break
      case 'all':
        startDate = new Date(0) // Beginning of time
        break
    }

    const supabase = getSupabaseAdmin()
    const [agg, proUsersResult] = await Promise.all([
      aggregatePaymentsSince(startDate),
      supabase
        .from('User')
        .select('id', { count: 'exact', head: true })
        .eq('planTier', 'pro'),
    ])

    if (proUsersResult.error) {
      throw proUsersResult.error
    }

    const recentPaymentRecords = agg.recentPayments
    const recentUserIds = Array.from(new Set(recentPaymentRecords.map((payment) => payment.userId)))
    const { data: recentUsers, error: recentUsersError } = recentUserIds.length > 0
      ? await supabase
          .from('User')
          .select('id, email, name')
          .in('id', recentUserIds)
      : { data: [], error: null }

    if (recentUsersError) {
      throw recentUsersError
    }

    const usersById = new Map(
      ((recentUsers || []) as UserRecord[]).map((user) => [user.id, user])
    )

    // Calculate metrics
    const totalRevenueUSD = agg.totalRevenueCents / 100
    const refundedRevenueUSD = agg.refundedRevenueCents / 100
    const netRevenue = totalRevenueUSD - refundedRevenueUSD
    const successfulPayments = agg.successfulCount
    const failedPayments = agg.failedCount
    const refundedPayments = agg.refundedCount
    const averageOrderValue = successfulPayments > 0 ? totalRevenueUSD / successfulPayments : 0
    const conversionRate = successfulPayments + failedPayments > 0
      ? (successfulPayments / (successfulPayments + failedPayments)) * 100
      : 0

    const dailyRevenue = Array.from(agg.dailyRevenueMap.entries())
      .sort(([dateA], [dateB]) => dateB.localeCompare(dateA))
      .map(([date, value]) => ({
        date,
        revenue: value.revenue / 100,
        count: value.count,
      }))

    return NextResponse.json({
      period,
      metrics: {
        totalRevenue: totalRevenueUSD,
        refundedRevenue: refundedRevenueUSD,
        netRevenue,
        successfulPayments,
        failedPayments,
        refundedPayments,
        averageOrderValue,
        conversionRate,
        proUsers: proUsersResult.count || 0,
      },
      recentPayments: recentPaymentRecords.map((payment) => ({
        id: payment.id,
        amount: payment.amount / 100,
        currency: payment.currency,
        status: payment.status,
        planTier: payment.planTier,
        date: payment.createdAt,
        user: usersById.get(payment.userId)?.email || null,
        name: usersById.get(payment.userId)?.name || null,
      })),
      dailyRevenue,
    })
  } catch (error) {
    console.error('[REVENUE] Error fetching revenue data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch revenue data' },
      { status: 500 }
    )
  }
}

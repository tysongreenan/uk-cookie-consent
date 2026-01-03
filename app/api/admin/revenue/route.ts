// Revenue analytics endpoint (admin only)
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Force this route to be dynamic
export const dynamic = 'force-dynamic'

// Add your admin email here
const ADMIN_EMAILS = [
  'your-email@example.com', // Replace with your actual email
]

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

    // Get payment statistics
    const [
      totalRevenue,
      successfulPayments,
      failedPayments,
      refundedPayments,
      recentPayments,
      dailyRevenue,
    ] = await Promise.all([
      // Total revenue (succeeded payments only)
      prisma.payment.aggregate({
        where: {
          status: 'succeeded',
          createdAt: { gte: startDate },
        },
        _sum: { amount: true },
        _count: true,
      }),

      // Successful payments count
      prisma.payment.count({
        where: {
          status: 'succeeded',
          createdAt: { gte: startDate },
        },
      }),

      // Failed payments count
      prisma.payment.count({
        where: {
          status: 'failed',
          createdAt: { gte: startDate },
        },
      }),

      // Refunded payments
      prisma.payment.aggregate({
        where: {
          status: 'refunded',
          createdAt: { gte: startDate },
        },
        _sum: { amount: true },
        _count: true,
      }),

      // Recent payments with user details
      prisma.payment.findMany({
        where: {
          createdAt: { gte: startDate },
        },
        select: {
          id: true,
          amount: true,
          currency: true,
          status: true,
          planTier: true,
          createdAt: true,
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),

      // Daily revenue breakdown
      prisma.$queryRaw`
        SELECT
          DATE("createdAt") as date,
          SUM(amount) as revenue,
          COUNT(*) as count
        FROM "Payment"
        WHERE status = 'succeeded'
          AND "createdAt" >= ${startDate}
        GROUP BY DATE("createdAt")
        ORDER BY date DESC
      `,
    ])

    // Calculate metrics
    const totalRevenueUSD = (totalRevenue._sum.amount || 0) / 100
    const refundedRevenueUSD = (refundedPayments._sum.amount || 0) / 100
    const netRevenue = totalRevenueUSD - refundedRevenueUSD
    const averageOrderValue = successfulPayments > 0 ? totalRevenueUSD / successfulPayments : 0
    const conversionRate = successfulPayments + failedPayments > 0
      ? (successfulPayments / (successfulPayments + failedPayments)) * 100
      : 0

    // Pro users count
    const proUsers = await prisma.user.count({
      where: { planTier: 'pro' },
    })

    return NextResponse.json({
      period,
      metrics: {
        totalRevenue: totalRevenueUSD,
        refundedRevenue: refundedRevenueUSD,
        netRevenue,
        successfulPayments,
        failedPayments,
        refundedPayments: refundedPayments._count,
        averageOrderValue,
        conversionRate,
        proUsers,
      },
      recentPayments: recentPayments.map((p) => ({
        id: p.id,
        amount: p.amount / 100,
        currency: p.currency,
        status: p.status,
        planTier: p.planTier,
        date: p.createdAt,
        user: p.user.email,
        name: p.user.name,
      })),
      dailyRevenue: (dailyRevenue as any[]).map((d: any) => ({
        date: d.date,
        revenue: Number(d.revenue) / 100,
        count: Number(d.count),
      })),
    })
  } catch (error) {
    console.error('[REVENUE] Error fetching revenue data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch revenue data' },
      { status: 500 }
    )
  }
}

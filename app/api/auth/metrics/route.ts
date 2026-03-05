import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { securityMonitor } from '@/lib/security-monitor'
import { authOptimizer } from '@/lib/auth-optimization'

export const dynamic = 'force-dynamic'

// GET /api/auth/metrics - Get authentication metrics and security data
export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated (admin only)
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get security metrics
    const securityMetrics = securityMonitor.getMetrics()
    const recentEvents = securityMonitor.getRecentEvents(20)
    
    // Get performance metrics
    const performanceMetrics = authOptimizer.getMetrics()
    const cacheStats = authOptimizer.getCacheStats()

    // Calculate additional metrics
    const now = new Date()
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    
    const recentSecurityEvents = recentEvents.filter(event => 
      event.timestamp > last24Hours
    )

    const eventsByType = recentSecurityEvents.reduce((acc, event) => {
      acc[event.type] = (acc[event.type] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const eventsBySeverity = recentSecurityEvents.reduce((acc, event) => {
      acc[event.severity] = (acc[event.severity] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Get unique IPs in last 24 hours
    const uniqueIPs = new Set(recentSecurityEvents.map(event => event.ip)).size

    const metrics = {
      security: {
        ...securityMetrics,
        recentEvents: recentSecurityEvents.length,
        eventsByType,
        eventsBySeverity,
        uniqueIPs,
        lastUpdated: now.toISOString()
      },
      performance: {
        ...performanceMetrics,
        ...cacheStats,
        lastUpdated: now.toISOString()
      },
      recentEvents: recentEvents.slice(0, 10) // Last 10 events for dashboard
    }

    return NextResponse.json(metrics)

  } catch (error) {
    console.error('Auth metrics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}

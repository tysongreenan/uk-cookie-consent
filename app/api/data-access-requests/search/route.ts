/**
 * DSAR Search — search your data to find records for a person before creating a request
 *
 * GET /api/data-access-requests/search?type=ip&value=192.168.1.1
 *
 * Searches banner_visitors and BannerAnalytics for matching records,
 * scoped to the requesting organization's data only.
 */

import { NextRequest, NextResponse } from 'next/server'
import { authorizeDSAR, getSupabaseAdmin } from '@/lib/dsar-helpers'
import { prisma } from '@/lib/prisma'
import type { DSARIdentifierType } from '@/types'

const VALID_TYPES: DSARIdentifierType[] = ['email', 'ip', 'name']

export async function GET(request: NextRequest) {
  try {
    const auth = await authorizeDSAR(request, 'admin')
    if (!auth.authorized) return auth.response

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') as DSARIdentifierType
    const value = searchParams.get('value')?.trim()

    if (!type || !VALID_TYPES.includes(type)) {
      return NextResponse.json({ error: 'type must be: email, ip, or name' }, { status: 400 })
    }
    if (!value) {
      return NextResponse.json({ error: 'value is required' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    // Get org-scoped banner IDs
    const { data: banners } = await supabase
      .from('SimpleBanners')
      .select('id, name')
      .eq('userId', auth.userId)
    const bannerIds = (banners || []).map((b: { id: string }) => b.id)
    const bannerNames = new Map((banners || []).map((b: { id: string; name: string }) => [b.id, b.name]))

    // Get org-scoped project IDs
    const projects = await prisma.project.findMany({
      where: auth.teamId
        ? { OR: [{ teamId: auth.teamId }, { userId: auth.userId, teamId: null }] }
        : { userId: auth.userId },
      select: { id: true },
    })
    const projectIds = projects.map((p) => p.id)

    // Search banner_visitors
    let visitorResults: { count: number; banners: string[]; dateRange: { first: string; last: string } | null } = {
      count: 0,
      banners: [],
      dateRange: null,
    }

    if (bannerIds.length > 0 && type === 'ip') {
      const { data: visitors, count } = await supabase
        .from('banner_visitors')
        .select('banner_id, date', { count: 'exact' })
        .in('banner_id', bannerIds)
        .eq('ip_address', value)
        .order('date', { ascending: true })
        .limit(1000)

      if (visitors && visitors.length > 0) {
        const uniqueBanners = Array.from(new Set(visitors.map((v: { banner_id: string }) => v.banner_id)))
        visitorResults = {
          count: count || visitors.length,
          banners: uniqueBanners.map((id) => bannerNames.get(id) || id),
          dateRange: {
            first: visitors[0].date,
            last: visitors[visitors.length - 1].date,
          },
        }
      }
    }

    // Search BannerAnalytics (Prisma) — only works for IP
    let analyticsCount = 0
    if (projectIds.length > 0 && type === 'ip') {
      analyticsCount = await prisma.bannerAnalytics.count({
        where: {
          projectId: { in: projectIds },
          ipAddress: value,
        },
      })
    }

    const totalRecords = visitorResults.count + analyticsCount
    const found = totalRecords > 0

    return NextResponse.json({
      data: {
        found,
        query: { type, value },
        totalRecords,
        sources: {
          banner_visitors: {
            count: visitorResults.count,
            banners: visitorResults.banners,
            dateRange: visitorResults.dateRange,
          },
          banner_analytics: {
            count: analyticsCount,
          },
        },
        hint: !found
          ? type === 'email'
            ? 'Cookie banners typically collect IP addresses, not emails. Try searching by IP instead.'
            : type === 'name'
              ? 'Cookie banners do not collect names. Try searching by the person\'s IP address.'
              : 'No records found for this IP across your banners.'
          : null,
      },
    })
  } catch (error) {
    console.error('[DSAR] Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}

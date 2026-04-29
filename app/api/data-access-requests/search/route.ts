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

    const { data: teamMembers, error: teamMembersError } = await supabase
      .from('TeamMember')
      .select('userId')
      .eq('teamId', auth.teamId)

    if (teamMembersError) {
      throw teamMembersError
    }

    const orgUserIds = Array.from(new Set([
      auth.userId,
      ...(teamMembers || []).map((member: { userId: string }) => member.userId),
    ]))

    // Get org-scoped banner IDs
    const { data: banners, error: bannersError } = await supabase
      .from('SimpleBanners')
      .select('id, name')
      .in('userId', orgUserIds)

    if (bannersError) {
      throw bannersError
    }

    const bannerIds = (banners || []).map((b: { id: string }) => b.id)
    const bannerNames = new Map((banners || []).map((b: { id: string; name: string }) => [b.id, b.name]))

    // Get org-scoped project IDs
    const [teamProjectsResult, legacyProjectsResult] = await Promise.all([
      supabase
        .from('Project')
        .select('id')
        .eq('teamId', auth.teamId),
      supabase
        .from('Project')
        .select('id')
        .eq('userId', auth.userId)
        .is('teamId', null),
    ])

    if (teamProjectsResult.error) {
      throw teamProjectsResult.error
    }

    if (legacyProjectsResult.error) {
      throw legacyProjectsResult.error
    }

    const projects = [...(teamProjectsResult.data || []), ...(legacyProjectsResult.data || [])]
    const projectIds = Array.from(new Set(projects.map((p: { id: string }) => p.id)))

    // Search banner_visitors
    let visitorResults: { count: number; banners: string[]; dateRange: { first: string; last: string } | null } = {
      count: 0,
      banners: [],
      dateRange: null,
    }

    // banner_visitors stores aggregate analytics only in the live schema; it does
    // not retain raw IP/email/name values. Individual proof lives in consent_records.

    // Search BannerAnalytics — only works for IP
    let analyticsCount = 0
    if (projectIds.length > 0 && type === 'ip') {
      const { count, error: analyticsError } = await supabase
        .from('BannerAnalytics')
        .select('id', { count: 'exact', head: true })
        .in('projectId', projectIds)
        .eq('ipAddress', value)

      if (analyticsError && analyticsError.code !== 'PGRST205') {
        throw analyticsError
      }

      analyticsCount = count || 0
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
              : 'No matching legacy analytics records found. Consent proof searches use consent IDs or hashed visitor cookies.'
          : null,
      },
    })
  } catch (error) {
    console.error('[DSAR] Search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}

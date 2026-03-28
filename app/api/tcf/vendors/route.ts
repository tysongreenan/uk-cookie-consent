/**
 * GET /api/tcf/vendors — browse/search vendors from the IAB Global Vendor List.
 *
 * Query params:
 *   ?search=google   — filter vendors by name (case-insensitive)
 *   &page=1          — pagination (1-indexed, default 1)
 *   &limit=50        — results per page (max 100, default 50)
 *
 * Auth required — only builder users need this endpoint.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { fetchGVL, searchVendors } from '@/lib/tcf/gvl'

export async function GET(request: NextRequest) {
  try {
    // ── Auth ──────────────────────────────────────────────────────────

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // ── Parse query params ────────────────────────────────────────────

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '50', 10)))

    // ── Fetch GVL and search ──────────────────────────────────────────

    const gvl = await fetchGVL()
    const allMatches = searchVendors(gvl, search)

    // ── Paginate ──────────────────────────────────────────────────────

    const total = allMatches.length
    const offset = (page - 1) * limit
    const pagedVendors = allMatches.slice(offset, offset + limit)

    // ── Shape response (only fields the builder UI needs) ─────────────

    const vendors = pagedVendors.map((v) => ({
      id: v.id,
      name: v.name,
      policyUrl: v.policyUrl,
      purposes: v.purposes,
      legIntPurposes: v.legIntPurposes,
      features: v.features,
      specialFeatures: v.specialFeatures,
    }))

    return NextResponse.json({ vendors, total, page })
  } catch (error) {
    console.error('[TCF/VENDORS] Error:', error)
    return NextResponse.json({ error: 'Failed to fetch vendor list' }, { status: 500 })
  }
}

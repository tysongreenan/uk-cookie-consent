/**
 * Authenticated privacy policy CRUD endpoint.
 *
 * GET  /api/privacy-policy?page=1&limit=20&team_id=...
 *   Returns paginated list of saved policies (without full content_html).
 *
 * POST /api/privacy-policy
 *   Creates a new saved policy (Pro plan required).
 *   Also creates an initial version in privacy_policy_versions.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { canAccessFeature } from '@/lib/plan-restrictions'
import { isTeamMember } from '@/lib/team-permissions'
import type { PlanTier } from '@/types'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
}

// ── GET: List saved policies ──────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { searchParams } = new URL(request.url)

    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
    const teamId = searchParams.get('team_id')
    const offset = (page - 1) * limit

    // ── Team scoping ────────────────────────────────────────────────

    let query = supabase
      .from('privacy_policies')
      .select('id, name, status, jurisdictions, language, created_at, updated_at, inputs', { count: 'exact' })

    if (teamId) {
      // Verify the user is a member of this team
      const isMember = await isTeamMember(session.user.id, teamId)
      if (!isMember) {
        return NextResponse.json({ error: 'Not a member of this team' }, { status: 403 })
      }
      query = query.eq('team_id', teamId)
    } else {
      query = query.eq('user_id', session.user.id)
    }

    const { data, error, count } = await query
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) {
      console.error('[PRIVACY-POLICY] List failed:', error.message)
      return NextResponse.json({ error: 'Failed to fetch policies' }, { status: 500 })
    }

    // Slim down the response — only include businessName from inputs
    const policies = (data || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      status: p.status,
      jurisdictions: p.jurisdictions,
      language: p.language,
      created_at: p.created_at,
      updated_at: p.updated_at,
      businessName: p.inputs?.businessName || null,
    }))

    return NextResponse.json({
      data: policies,
      total: count ?? 0,
      page,
      limit,
    })
  } catch (error) {
    console.error('[PRIVACY-POLICY] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── POST: Create a new saved policy ───────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getSupabase()

    // ── Plan check ──────────────────────────────────────────────────

    const { data: user, error: userError } = await supabase
      .from('User')
      .select('planTier')
      .eq('id', session.user.id)
      .single()

    if (userError) {
      console.error('[PRIVACY-POLICY] User lookup failed:', userError.message)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const tier = (user?.planTier || 'free') as PlanTier
    if (!canAccessFeature(tier, 'hasPrivacyPolicyGenerator')) {
      return NextResponse.json(
        { error: 'Saving privacy policies requires a Pro plan. Upgrade to save and manage your policies.', upgradeRequired: true },
        { status: 403 }
      )
    }

    // ── Parse body ──────────────────────────────────────────────────

    const body = await request.json()
    const { name, inputs, content_html, content_json, jurisdictions, language } = body

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Policy name is required' }, { status: 400 })
    }

    if (!inputs || typeof inputs !== 'object') {
      return NextResponse.json({ error: 'Policy inputs are required' }, { status: 400 })
    }

    // ── Team lookup ─────────────────────────────────────────────────

    const { data: membership } = await supabase
      .from('TeamMember')
      .select('teamId')
      .eq('userId', session.user.id)
      .single()

    const teamId = membership?.teamId || null

    // ── Insert policy ───────────────────────────────────────────────

    const policyId = crypto.randomUUID()

    const { data: policy, error: insertError } = await supabase
      .from('privacy_policies')
      .insert({
        id: policyId,
        user_id: session.user.id,
        team_id: teamId,
        name,
        inputs,
        content_html: content_html || '',
        content_json: content_json || { sections: [] },
        jurisdictions: jurisdictions || [],
        language: language || 'en',
        status: 'draft',
        version: 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      console.error('[PRIVACY-POLICY] Insert failed:', insertError.message)
      return NextResponse.json({ error: 'Failed to create policy' }, { status: 500 })
    }

    // ── Create initial version ──────────────────────────────────────

    const { error: versionError } = await supabase
      .from('privacy_policy_versions')
      .insert({
        id: crypto.randomUUID(),
        policy_id: policyId,
        version: 1,
        inputs,
        content_html: content_html || '',
        content_json: content_json || { sections: [] },
        created_at: new Date().toISOString(),
      })

    if (versionError) {
      console.error('[PRIVACY-POLICY] Version insert failed:', versionError.message)
      // Non-fatal — policy was created, version tracking failed
    }

    return NextResponse.json(policy, { status: 201 })
  } catch (error) {
    console.error('[PRIVACY-POLICY] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

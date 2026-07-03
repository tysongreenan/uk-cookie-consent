/**
 * Single privacy policy endpoint.
 *
 * GET    /api/privacy-policy/[id] — Returns full policy with content
 * PUT    /api/privacy-policy/[id] — Updates policy, creates new version
 * DELETE /api/privacy-policy/[id] — Deletes policy (cascade deletes versions)
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

function isValidUuid(id: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}

/**
 * Map a raw Supabase row (snake_case) into the camelCase shape the dashboard
 * components expect. Keeps API consumers decoupled from the database schema.
 */
function serializePolicy(row: any) {
  const inputs = row.inputs || {}
  const jurisdictions: string[] = row.jurisdictions || []
  return {
    id: row.id,
    title: row.name,
    businessName: inputs.businessName || row.name || 'Untitled',
    status: row.status,
    slug: row.slug || undefined,
    contentHtml: row.content_html || '',
    contentJson: row.content_json || { sections: [] },
    inputs,
    metadata: {
      generatedAt: row.updated_at || row.created_at,
      jurisdictions,
      language: row.language || 'en',
      businessName: inputs.businessName || row.name || '',
    },
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    version: row.version,
  }
}

/** Verify the current user owns the policy (directly or via team membership). */
async function verifyOwnership(
  supabase: ReturnType<typeof getSupabase>,
  policyId: string,
  userId: string
): Promise<{ policy: any | null; error: string | null; status: number }> {
  const { data: policy, error } = await supabase
    .from('privacy_policies')
    .select('*')
    .eq('id', policyId)
    .single()

  if (error || !policy) {
    return { policy: null, error: 'Policy not found', status: 404 }
  }

  // Direct owner
  if (policy.user_id === userId) {
    return { policy, error: null, status: 200 }
  }

  // Team member
  if (policy.team_id) {
    const isMember = await isTeamMember(userId, policy.team_id)
    if (isMember) {
      return { policy, error: null, status: 200 }
    }
  }

  return { policy: null, error: 'Forbidden', status: 403 }
}

// ── GET: Single policy with full content ──────────────────────────────

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    if (!isValidUuid(id)) {
      return NextResponse.json({ error: 'Invalid policy ID' }, { status: 400 })
    }

    const supabase = getSupabase()
    const { policy, error, status } = await verifyOwnership(supabase, id, session.user.id)

    if (error) {
      return NextResponse.json({ error }, { status })
    }

    return NextResponse.json(serializePolicy(policy))
  } catch (error) {
    console.error('[PRIVACY-POLICY] GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── PUT: Update policy and create new version ─────────────────────────

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    if (!isValidUuid(id)) {
      return NextResponse.json({ error: 'Invalid policy ID' }, { status: 400 })
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
        { error: 'Updating privacy policies requires a Pro plan.', upgradeRequired: true },
        { status: 403 }
      )
    }

    // ── Verify ownership ────────────────────────────────────────────

    const { policy: existing, error: ownerError, status: ownerStatus } = await verifyOwnership(supabase, id, session.user.id)
    if (ownerError) {
      return NextResponse.json({ error: ownerError }, { status: ownerStatus })
    }

    // ── Parse body ──────────────────────────────────────────────────

    const body = await request.json()
    const { name, inputs, content_html, content_json, jurisdictions, language } = body

    // ── Save previous version ───────────────────────────────────────

    const { error: versionError } = await supabase
      .from('privacy_policy_versions')
      .insert({
        id: crypto.randomUUID(),
        policy_id: id,
        version: existing.version,
        inputs: existing.inputs,
        content_html: existing.content_html,
        content_json: existing.content_json,
        created_at: new Date().toISOString(),
      })

    if (versionError) {
      console.error('[PRIVACY-POLICY] Version snapshot failed:', versionError.message)
      // Non-fatal — continue with update
    }

    // ── Update policy ───────────────────────────────────────────────

    const newVersion = (existing.version || 1) + 1

    const { data: updated, error: updateError } = await supabase
      .from('privacy_policies')
      .update({
        name: name ?? existing.name,
        inputs: inputs ?? existing.inputs,
        content_html: content_html ?? existing.content_html,
        content_json: content_json ?? existing.content_json,
        jurisdictions: jurisdictions ?? existing.jurisdictions,
        language: language ?? existing.language,
        version: newVersion,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('[PRIVACY-POLICY] Update failed:', updateError.message)
      return NextResponse.json({ error: 'Failed to update policy' }, { status: 500 })
    }

    return NextResponse.json(serializePolicy(updated))
  } catch (error) {
    console.error('[PRIVACY-POLICY] PUT error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// ── DELETE: Remove policy (cascade deletes versions) ──────────────────

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    if (!isValidUuid(id)) {
      return NextResponse.json({ error: 'Invalid policy ID' }, { status: 400 })
    }

    const supabase = getSupabase()

    // ── Verify ownership ────────────────────────────────────────────

    const { error: ownerError, status: ownerStatus } = await verifyOwnership(supabase, id, session.user.id)
    if (ownerError) {
      return NextResponse.json({ error: ownerError }, { status: ownerStatus })
    }

    // ── Delete (versions cascade) ───────────────────────────────────

    const { error: deleteError } = await supabase
      .from('privacy_policies')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('[PRIVACY-POLICY] Delete failed:', deleteError.message)
      return NextResponse.json({ error: 'Failed to delete policy' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[PRIVACY-POLICY] DELETE error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

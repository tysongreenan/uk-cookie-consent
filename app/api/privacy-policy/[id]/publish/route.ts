/**
 * Publish a privacy policy for hosted display.
 *
 * POST /api/privacy-policy/[id]/publish
 *   Sets status = 'published', generates slug, sets published_at and is_hosted.
 *   Auth required, Pro plan required.
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

/** Convert a business name into a URL-safe slug with a random suffix. */
function generateSlug(businessName: string): string {
  const base = businessName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50)

  const suffix = crypto.randomUUID().slice(0, 8)
  return `${base}-${suffix}`
}

export async function POST(
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
      console.error('[PRIVACY-POLICY-PUBLISH] User lookup failed:', userError.message)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const tier = (user?.planTier || 'free') as PlanTier
    if (!canAccessFeature(tier, 'hasPrivacyPolicyGenerator')) {
      return NextResponse.json(
        { error: 'Publishing privacy policies requires a Pro plan.', upgradeRequired: true },
        { status: 403 }
      )
    }

    // ── Fetch policy ────────────────────────────────────────────────

    const { data: policy, error: fetchError } = await supabase
      .from('privacy_policies')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !policy) {
      return NextResponse.json({ error: 'Policy not found' }, { status: 404 })
    }

    // ── Verify ownership ────────────────────────────────────────────

    if (policy.user_id !== session.user.id) {
      if (policy.team_id) {
        const isMember = await isTeamMember(session.user.id, policy.team_id)
        if (!isMember) {
          return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
      } else {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    // ── Publish ─────────────────────────────────────────────────────

    const slug = policy.slug || generateSlug(policy.inputs?.businessName || policy.name || 'policy')

    const { data: updated, error: updateError } = await supabase
      .from('privacy_policies')
      .update({
        status: 'published',
        slug,
        published_at: new Date().toISOString(),
        is_hosted: true,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('[PRIVACY-POLICY-PUBLISH] Update failed:', updateError.message)
      return NextResponse.json({ error: 'Failed to publish policy' }, { status: 500 })
    }

    return NextResponse.json(updated)
  } catch (error) {
    console.error('[PRIVACY-POLICY-PUBLISH] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

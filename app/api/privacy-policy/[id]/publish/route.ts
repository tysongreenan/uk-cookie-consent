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
import {
  brandPrivacySlug,
  generateUniqueSlug,
  slugFromBusinessName,
  suggestSlugs,
  validateSlug,
} from '@/lib/privacy-policy/slug'
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

/** Returns true if slug is free, or already owned by this policy. */
async function isSlugAvailable(
  supabase: ReturnType<typeof getSupabase>,
  slug: string,
  policyId: string
): Promise<boolean> {
  const { data } = await supabase
    .from('privacy_policies')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  return !data || data.id === policyId
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

    // ── Resolve slug (optional custom slug in body) ─────────────────

    let requestedSlug: string | undefined
    try {
      const body = await request.json().catch(() => ({}))
      if (body && typeof body.slug === 'string' && body.slug.trim()) {
        requestedSlug = body.slug
      }
    } catch {
      // No body / empty body is fine — auto-generate
    }

    let slug = policy.slug as string | null
    let previousSlugs: string[] = Array.isArray(policy.previous_slugs)
      ? [...policy.previous_slugs]
      : []

    const businessLabel = policy.inputs?.businessName || policy.name || 'policy'

    if (requestedSlug) {
      const check = validateSlug(requestedSlug)
      if (!check.ok) {
        return NextResponse.json(
          {
            error: check.error,
            suggestions: suggestSlugs(businessLabel, requestedSlug),
          },
          { status: 400 }
        )
      }
      const available = await isSlugAvailable(supabase, check.slug, id)
      if (!available) {
        return NextResponse.json(
          {
            error: 'That URL is already taken. Please choose another.',
            suggestions: suggestSlugs(businessLabel, check.slug),
          },
          { status: 409 }
        )
      }
      if (policy.slug && policy.slug !== check.slug && !previousSlugs.includes(policy.slug)) {
        previousSlugs = [...previousSlugs, policy.slug].slice(-20)
      }
      previousSlugs = previousSlugs.filter((s) => s !== check.slug)
      slug = check.slug
    } else if (!slug) {
      // Brand-first defaults — never generic "privacy-policy"
      const candidates = [
        slugFromBusinessName(businessLabel),
        brandPrivacySlug(businessLabel),
      ]
      let picked: string | null = null
      for (const candidate of candidates) {
        const check = validateSlug(candidate)
        if (check.ok && (await isSlugAvailable(supabase, check.slug, id))) {
          picked = check.slug
          break
        }
      }
      slug = picked || generateUniqueSlug(businessLabel)
    }

    // ── Publish ─────────────────────────────────────────────────────

    const publishPayload: Record<string, unknown> = {
      status: 'published',
      slug,
      published_at: new Date().toISOString(),
      is_hosted: true,
      updated_at: new Date().toISOString(),
    }

    let { data: updated, error: updateError } = await supabase
      .from('privacy_policies')
      .update({ ...publishPayload, previous_slugs: previousSlugs })
      .eq('id', id)
      .select()
      .single()

    if (updateError && /previous_slugs/i.test(updateError.message || '')) {
      ;({ data: updated, error: updateError } = await supabase
        .from('privacy_policies')
        .update(publishPayload)
        .eq('id', id)
        .select()
        .single())
    }

    if (updateError || !updated) {
      // Unique index race
      if (updateError?.code === '23505' || updateError?.message?.includes('slug')) {
        return NextResponse.json(
          { error: 'That URL is already taken. Please choose another.' },
          { status: 409 }
        )
      }
      console.error('[PRIVACY-POLICY-PUBLISH] Update failed:', updateError?.message)
      return NextResponse.json({ error: 'Failed to publish policy' }, { status: 500 })
    }

    // Return camelCase shape matching GET /api/privacy-policy/[id]
    // so the detail page can merge without overwriting UI fields.
    const inputs = updated.inputs || {}
    return NextResponse.json({
      id: updated.id,
      title: updated.name,
      businessName: inputs.businessName || updated.name || 'Untitled',
      status: updated.status,
      slug: updated.slug || undefined,
      contentHtml: updated.content_html || '',
      contentJson: updated.content_json || { sections: [] },
      inputs,
      metadata: {
        generatedAt: updated.updated_at || updated.created_at,
        jurisdictions: updated.jurisdictions || [],
        language: updated.language || inputs.language || 'en',
        businessName: inputs.businessName || updated.name || '',
      },
      createdAt: updated.created_at,
      updatedAt: updated.updated_at,
      version: updated.version,
    })
  } catch (error) {
    console.error('[PRIVACY-POLICY-PUBLISH] Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { createClient } from '@supabase/supabase-js'
import { policyDocSegment, publicPolicyPath } from './hosted-url'

export type PolicyLookup =
  | { kind: 'found'; policy: any }
  | { kind: 'redirect'; path: string }
  | { kind: 'missing' }

function getServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceKey) return null
  return createClient(supabaseUrl, supabaseServiceKey)
}

/**
 * Resolve a published policy by unique key (slug, previous slug, or policy id).
 */
export async function resolvePublishedPolicy(key: string): Promise<PolicyLookup> {
  const supabase = getServiceClient()
  const normalized = typeof key === 'string' ? key.trim() : ''
  if (!supabase || !normalized) return { kind: 'missing' }

  // 1) Current slug
  const { data: bySlug, error: slugError } = await supabase
    .from('privacy_policies')
    .select('*')
    .eq('slug', normalized)
    .eq('status', 'published')
    .maybeSingle()

  if (slugError) {
    console.error('[resolvePublishedPolicy] slug lookup failed', {
      key: normalized,
      message: slugError.message,
    })
  } else if (bySlug) {
    return { kind: 'found', policy: bySlug }
  }

  // 2) Policy id (always unique — never races for "privacy-policy")
  const { data: byId, error: idError } = await supabase
    .from('privacy_policies')
    .select('*')
    .eq('id', normalized)
    .eq('status', 'published')
    .maybeSingle()

  if (idError) {
    console.error('[resolvePublishedPolicy] id lookup failed', {
      key: normalized,
      message: idError.message,
    })
  } else if (byId) {
    // Prefer brand slug path if they have one
    if (byId.slug && byId.slug !== normalized) {
      return {
        kind: 'redirect',
        path: publicPolicyPath(byId.slug, byId.language),
      }
    }
    return { kind: 'found', policy: byId }
  }

  // 3) Renamed slug history
  const { data: byPrevious, error: prevError } = await supabase
    .from('privacy_policies')
    .select('slug, language')
    .eq('status', 'published')
    .contains('previous_slugs', [normalized])
    .limit(1)
    .maybeSingle()

  if (prevError) {
    console.error('[resolvePublishedPolicy] previous_slugs lookup failed', {
      key: normalized,
      message: prevError.message,
    })
  } else if (byPrevious?.slug && byPrevious.slug !== normalized) {
    return {
      kind: 'redirect',
      path: publicPolicyPath(byPrevious.slug, byPrevious.language),
    }
  }

  return { kind: 'missing' }
}

/** Canonical public path for a policy row. */
export function canonicalPathForPolicy(policy: {
  slug?: string | null
  id?: string
  language?: string | null
}): string {
  const key = policy.slug || policy.id || ''
  return publicPolicyPath(key, policy.language)
}

export function expectedDocForPolicy(policy: { language?: string | null }): string {
  return policyDocSegment(policy.language)
}

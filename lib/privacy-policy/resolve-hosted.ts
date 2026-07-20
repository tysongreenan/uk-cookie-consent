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
  if (!supabase || !key) return { kind: 'missing' }

  // 1) Current slug
  const { data: bySlug } = await supabase
    .from('privacy_policies')
    .select('*')
    .eq('slug', key)
    .eq('status', 'published')
    .maybeSingle()

  if (bySlug) return { kind: 'found', policy: bySlug }

  // 2) Policy id (always unique — never races for "privacy-policy")
  const { data: byId } = await supabase
    .from('privacy_policies')
    .select('*')
    .eq('id', key)
    .eq('status', 'published')
    .maybeSingle()

  if (byId) {
    // Prefer brand slug path if they have one
    if (byId.slug && byId.slug !== key) {
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
    .contains('previous_slugs', [key])
    .limit(1)
    .maybeSingle()

  if (!prevError && byPrevious?.slug && byPrevious.slug !== key) {
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

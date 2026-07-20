import { permanentRedirect, notFound } from 'next/navigation'
import {
  resolvePublishedPolicy,
  canonicalPathForPolicy,
} from '@/lib/privacy-policy/resolve-hosted'

/**
 * Legacy single-segment URL: /p/orinha-media
 * → 301 to /p/orinha-media/privacy-policy (or French doc segment)
 *
 * Uniqueness lives in {slug}; "privacy-policy" is shared by everyone.
 */
export default async function LegacyHostedPolicyRedirect({
  params,
}: {
  params: { slug: string }
}) {
  const resolved = await resolvePublishedPolicy(params.slug)

  if (resolved.kind === 'redirect') {
    permanentRedirect(resolved.path)
  }

  if (resolved.kind !== 'found') {
    notFound()
  }

  permanentRedirect(canonicalPathForPolicy(resolved.policy))
}

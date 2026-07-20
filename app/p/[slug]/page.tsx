import { permanentRedirect, notFound } from 'next/navigation'
import {
  resolvePublishedPolicy,
  canonicalPathForPolicy,
} from '@/lib/privacy-policy/resolve-hosted'
import { publicPolicyPath } from '@/lib/privacy-policy/hosted-url'

// Always run on the server so Supabase env is available (never static 404 shell).
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

type PageParams = { slug: string }

/**
 * Legacy single-segment URL: /p/orinha-media
 * → 301 to /p/orinha-media/privacy-policy (or French doc segment)
 *
 * Prefer the next.config.mjs redirect for the common English path; this page
 * remains as a fallback (e.g. when config is skipped) and resolves French.
 *
 * Uniqueness lives in {slug}; "privacy-policy" is shared by everyone.
 */
export default async function LegacyHostedPolicyRedirect({
  params,
}: {
  params: PageParams | Promise<PageParams>
}) {
  const { slug } = await Promise.resolve(params)
  const key = typeof slug === 'string' ? slug.trim() : ''

  if (!key) {
    notFound()
  }

  const resolved = await resolvePublishedPolicy(key)

  if (resolved.kind === 'redirect') {
    permanentRedirect(resolved.path)
  }

  if (resolved.kind === 'found') {
    permanentRedirect(canonicalPathForPolicy(resolved.policy))
  }

  // Last-resort: send to the English doc path. The [doc] page will 404 if
  // nothing is published, or re-canonicalise language/slug if something is.
  permanentRedirect(publicPolicyPath(key, 'en'))
}

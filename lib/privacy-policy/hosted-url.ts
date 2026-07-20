/**
 * Hosted privacy policy URL shape:
 *
 *   /p/{uniqueKey}/privacy-policy
 *   /p/{uniqueKey}/politique-de-confidentialite
 *
 * {uniqueKey} is unique per policy (business slug / auto id).
 * The last segment is the document type — the same for every customer
 * so nobody races for the path "privacy-policy" alone.
 */

export const DOC_PRIVACY_EN = 'privacy-policy'
export const DOC_PRIVACY_FR = 'politique-de-confidentialite'

const DOC_SEGMENTS = new Set([DOC_PRIVACY_EN, DOC_PRIVACY_FR])

export function isPolicyDocSegment(doc: string): boolean {
  return DOC_SEGMENTS.has(doc)
}

/** Document path segment for a language. */
export function policyDocSegment(language?: string | null): string {
  return language === 'fr' ? DOC_PRIVACY_FR : DOC_PRIVACY_EN
}

/**
 * Public path for a hosted policy.
 * @example publicPolicyPath('orinha-media', 'en')
 * // => '/p/orinha-media/privacy-policy'
 */
export function publicPolicyPath(
  uniqueKey: string,
  language?: string | null
): string {
  const key = (uniqueKey || '').replace(/^\/+|\/+$/g, '')
  if (!key) return '/tools/privacy-policy'
  return `/p/${key}/${policyDocSegment(language)}`
}

export function publicPolicyUrl(
  uniqueKey: string,
  language?: string | null,
  origin = 'https://www.cookie-banner.ca'
): string {
  return `${origin.replace(/\/$/, '')}${publicPolicyPath(uniqueKey, language)}`
}

/** Short display string for dashboard UI. */
export function publicPolicyDisplay(
  uniqueKey: string,
  language?: string | null
): string {
  return `cookie-banner.ca${publicPolicyPath(uniqueKey, language)}`
}

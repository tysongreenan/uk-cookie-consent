/**
 * Shared slug helpers for hosted privacy policy URLs (/p/[slug]).
 *
 * Public URLs are global (one slug for the whole product). We never default
 * to generic paths like "privacy-policy" — those are reserved so every
 * customer gets a brand-based URL instead of racing for the same name.
 */

const SLUG_MIN = 3
const SLUG_MAX = 60

/**
 * Generic paths that anyone might try first. Reserved so the first user
 * cannot lock "privacy-policy" forever for everyone else.
 */
const RESERVED = new Set([
  'admin',
  'api',
  'new',
  'edit',
  'preview',
  'test',
  'www',
  'null',
  'undefined',
  'privacy',
  'policy',
  'policies',
  // Common “what would you name a privacy policy?” answers
  'privacy-policy',
  'privacy-policies',
  'privacypolicy',
  'privacy-notice',
  'privacy-statement',
  'cookie-policy',
  'cookie-policies',
  'cookies',
  'cookie',
  'legal',
  'terms',
  'terms-of-service',
  'tos',
  'gdpr',
  'pipeda',
  'ccpa',
  'law-25',
  'loi-25',
  // French generics
  'politique-de-confidentialite',
  'politique-confidentialite',
  'confidentialite',
  'politique',
  'avis-de-confidentialite',
  'mentions-legales',
])

/**
 * Normalize free text into a URL-safe slug (no random suffix).
 */
export function normalizeSlug(input: string): string {
  return (
    (input || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/[\s]+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, SLUG_MAX)
  )
}

/**
 * Brand-first default: "Orinha Media" → "orinha-media"
 * Never "privacy-policy" alone.
 */
export function slugFromBusinessName(businessName: string): string {
  const base = normalizeSlug(businessName)
  if (base && base.length >= SLUG_MIN && !RESERVED.has(base)) {
    return base.slice(0, SLUG_MAX)
  }
  // Fallback if name is empty/generic/reserved
  return 'policy'
}

/**
 * Stronger brand+purpose suggestion when clean name is taken:
 * "orinha-media-privacy-policy"
 */
export function brandPrivacySlug(businessName: string): string {
  const brand = normalizeSlug(businessName) || 'business'
  const combined = `${brand}-privacy-policy`.slice(0, SLUG_MAX)
  const cleaned = normalizeSlug(combined)
  return cleaned.length >= SLUG_MIN ? cleaned : generateUniqueSlug(businessName)
}

/**
 * Validate a candidate slug. Returns { ok, slug, error }.
 */
export function validateSlug(input: string): {
  ok: boolean
  slug: string
  error?: string
} {
  const slug = normalizeSlug(input)

  if (!slug || slug.length < SLUG_MIN) {
    return {
      ok: false,
      slug,
      error: `URL must be at least ${SLUG_MIN} characters (letters, numbers, hyphens).`,
    }
  }

  if (slug.length > SLUG_MAX) {
    return {
      ok: false,
      slug,
      error: `URL must be at most ${SLUG_MAX} characters.`,
    }
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return {
      ok: false,
      slug,
      error: 'Use only lowercase letters, numbers, and hyphens (e.g. orinha-media).',
    }
  }

  if (RESERVED.has(slug)) {
    return {
      ok: false,
      slug,
      error:
        'That path is reserved for everyone (e.g. privacy-policy). Use your business name instead — like orinha-media or orinha-media-privacy-policy.',
    }
  }

  return { ok: true, slug }
}

/**
 * Fallback when preferred brand slug is taken: base + short unique suffix.
 */
export function generateUniqueSlug(businessName: string): string {
  const base = slugFromBusinessName(businessName)
  const safeBase = base === 'policy' ? 'policy' : base
  const suffix = crypto.randomUUID().slice(0, 8)
  return `${safeBase.slice(0, SLUG_MAX - 9)}-${suffix}`
}

/**
 * Alternatives when a slug is reserved or already claimed.
 * Always brand-based so customers don't fight over "privacy-policy".
 */
export function suggestSlugs(businessName: string, attempted?: string): string[] {
  const brand = normalizeSlug(businessName) || 'business'
  const ideas = [
    brand,
    brandPrivacySlug(businessName),
    `${brand}-privacy`,
    `${brand}-policy`,
    `${brand}-legal`,
    attempted && !RESERVED.has(normalizeSlug(attempted))
      ? `${normalizeSlug(attempted)}-2`
      : '',
    `${brand}-2`,
  ]
    .map((s) => normalizeSlug(s))
    .filter((s) => s.length >= SLUG_MIN && !RESERVED.has(s))

  // Dedupe, preserve order
  return Array.from(new Set(ideas)).slice(0, 5)
}

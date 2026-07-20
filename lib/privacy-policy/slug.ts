/**
 * Shared slug helpers for hosted privacy policy URLs (/p/[slug]).
 */

const SLUG_MIN = 3
const SLUG_MAX = 60

/** Reserved path segments that must not be used as policy slugs. */
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
])

/**
 * Normalize free text into a URL-safe slug (no random suffix).
 * Used for suggestions from business names and user input cleanup.
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
      error: 'That URL is reserved. Please choose another.',
    }
  }

  return { ok: true, slug }
}

/**
 * Fallback when no custom slug is provided: base name + short unique suffix.
 */
export function generateUniqueSlug(businessName: string): string {
  const base = normalizeSlug(businessName) || 'policy'
  const suffix = crypto.randomUUID().slice(0, 8)
  const combined = `${base.slice(0, SLUG_MAX - 9)}-${suffix}`
  return combined
}

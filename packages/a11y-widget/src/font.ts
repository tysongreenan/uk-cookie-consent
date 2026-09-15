/** Same default stack the cookie banner uses when the page font is unknown. */
export const SYSTEM_FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

export function sanitizeFontFamily(value: unknown): string {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim().slice(0, 80)
  if (!trimmed || !/^[A-Za-z][A-Za-z0-9 \-]*$/.test(trimmed)) return ''
  return trimmed
}

function quote(family: string): string {
  return /\s/.test(family) ? `"${family}"` : family
}

/**
 * Cookie-banner inherit: use the host page's computed font (already loaded, no
 * extra webfont request). Optional explicit fallback from the banner config.
 */
export function buildMenuFontStack(explicit: string, pageFont: string): string {
  const clean = sanitizeFontFamily(explicit)
  const page = pageFont.trim()
  if (page && (!clean || page.toLowerCase().includes(clean.toLowerCase()))) return page
  if (clean && page) return `${quote(clean)}, ${page}`
  if (clean) return `${quote(clean)}, ${SYSTEM_FONT_STACK}`
  if (page) return page
  return SYSTEM_FONT_STACK
}

export function samplePageFontFamily(): string {
  try {
    return (
      (document.body && getComputedStyle(document.body).fontFamily) ||
      getComputedStyle(document.documentElement).fontFamily ||
      ''
    )
  } catch {
    return ''
  }
}

import type { BannerConfig } from '@/types'

const UNSAFE_CSS_PATTERN = /[;"'<>\\@]|url\s*\(|expression\s*\(/i

const NAMED_COLORS = new Set([
  'transparent', 'inherit', 'currentcolor', 'white', 'black',
  'red', 'green', 'blue', 'gray', 'grey', 'none',
])

const COLOR_KEYS = [
  'background',
  'text',
  'button',
  'buttonText',
  'link',
  'rejectButton',
  'rejectButtonText',
] as const

const DEFAULT_COLORS: Record<(typeof COLOR_KEYS)[number], string> = {
  background: '#ffffff',
  text: '#1f2937',
  button: '#3b82f6',
  buttonText: '#ffffff',
  link: '#3b82f6',
  rejectButton: 'transparent',
  rejectButtonText: '#1f2937',
}

/**
 * Sanitize a CSS color value for safe embedding in inline styles.
 * Blocks injection via semicolons, url(), expression(), etc.
 */
export function sanitizeCssColor(
  value: string | undefined | null,
  fallback: string
): string {
  if (!value || typeof value !== 'string') return fallback

  const trimmed = value.trim()
  if (!trimmed || UNSAFE_CSS_PATTERN.test(trimmed)) return fallback

  if (/^#[0-9a-fA-F]{3,8}$/.test(trimmed)) return trimmed

  if (
    /^rgba?\(\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(,\s*[\d.]+\s*)?\)$/i.test(
      trimmed
    )
  ) {
    return trimmed
  }

  if (/^[a-zA-Z]+$/.test(trimmed) && NAMED_COLORS.has(trimmed.toLowerCase())) {
    return trimmed
  }

  return fallback
}

/**
 * Allow only absolute http(s) URLs for user-controlled links and images.
 */
export function sanitizeHttpUrl(value: string | undefined | null): string {
  if (!value || typeof value !== 'string') return ''

  try {
    const url = new URL(value.trim())
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return url.href
    }
  } catch {
    // Invalid URL
  }

  return ''
}

function hardenColorObject(
  colors: Record<string, string> | undefined,
  defaults: Record<string, string>
): void {
  if (!colors || typeof colors !== 'object') return

  for (const key of COLOR_KEYS) {
    if (colors[key] !== undefined) {
      colors[key] = sanitizeCssColor(colors[key], defaults[key] ?? '#333333')
    }
  }
}

function clampDimension(value: unknown, fallback: number, max = 500): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n) || n <= 0) return fallback
  return Math.min(Math.round(n), max)
}

/**
 * Harden user-controlled banner config before HTML/CSS/JS generation.
 * Mutates config in place; safe to call on a parsed copy at serve time.
 */
export function hardenBannerConfig(config: BannerConfig): void {
  if (!config || typeof config !== 'object') return

  if (config.colors) {
    hardenColorObject(config.colors as Record<string, string>, DEFAULT_COLORS)
  }

  if (config.branding?.logo) {
    const logo = config.branding.logo
    const safeUrl = sanitizeHttpUrl(logo.url)
    if (!safeUrl) {
      logo.enabled = false
      logo.url = ''
    } else {
      logo.url = safeUrl
    }
    logo.maxWidth = clampDimension(logo.maxWidth, 120)
    logo.maxHeight = clampDimension(logo.maxHeight, 40)
  }

  if (config.branding?.privacyPolicy) {
    const policy = config.branding.privacyPolicy
    const safeUrl = sanitizeHttpUrl(policy.url)
    if (!safeUrl) {
      policy.url = ''
    } else {
      policy.url = safeUrl
    }
  }

  const footerLink = config.branding?.footerLink as
    | {
        floatingStyle?: { customColors?: Record<string, string> }
        icons?: { accepted?: string; rejected?: string }
      }
    | undefined

  if (footerLink?.floatingStyle?.customColors) {
    hardenColorObject(footerLink.floatingStyle.customColors, DEFAULT_COLORS)
  }

  if (footerLink?.icons) {
    if (footerLink.icons.accepted) {
      footerLink.icons.accepted =
        sanitizeHttpUrl(footerLink.icons.accepted) || ''
    }
    if (footerLink.icons.rejected) {
      footerLink.icons.rejected =
        sanitizeHttpUrl(footerLink.icons.rejected) || ''
    }
  }
}
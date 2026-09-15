import type { AccessibilityConfig, BannerConfig } from '@/types'
import { hardenAccessibilityConfig } from './harden'
import { accessibilityConfigSchema } from './schema'
import { withA11yDefaults } from './config'

export type AccessibilitySaveResult =
  | { ok: true }
  | { ok: false; error: string }

/**
 * Validate + harden `config.accessibility` on create/update. Missing/null is
 * fine (banner without a menu). Invalid shapes return a 400-ready message so we
 * never persist `__proto__` toys or `enabled: "yes"`.
 */
export function parseAccessibilityForSave(config: Record<string, unknown>): AccessibilitySaveResult {
  if (!('accessibility' in config) || config.accessibility == null) return { ok: true }
  const parsed = accessibilityConfigSchema.safeParse(config.accessibility)
  if (!parsed.success) {
    const first = parsed.error.issues[0]
    const path = first?.path?.length ? ` (${first.path.join('.')})` : ''
    return { ok: false, error: `Invalid accessibility settings${path}` }
  }
  config.accessibility = parsed.data
  hardenAccessibilityConfig(config as unknown as BannerConfig)
  return { ok: true }
}

/** Deep-merge a PATCH so `{ accessibility: { enabled: true } }` keeps trigger/panel. */
export function mergeAccessibilityPatch(
  current: unknown,
  patch: unknown,
): AccessibilityConfig | undefined {
  if (patch == null) {
    return current && typeof current === 'object' ? withA11yDefaults(current as Partial<AccessibilityConfig>) : undefined
  }
  if (typeof patch !== 'object') return undefined
  const cur = current && typeof current === 'object' ? (current as Partial<AccessibilityConfig>) : {}
  const pat = patch as Partial<AccessibilityConfig>
  return withA11yDefaults({
    ...cur,
    ...pat,
    trigger: { ...(cur.trigger || {}), ...(pat.trigger || {}) } as AccessibilityConfig['trigger'],
    panel: { ...(cur.panel || {}), ...(pat.panel || {}) } as AccessibilityConfig['panel'],
    features: { ...(cur.features || {}), ...(pat.features || {}) },
  })
}

import type { A11yFeatureKey, A11yTriggerPosition, AccessibilityConfig, BannerConfig } from '@/types'
import { sanitizeCssColor, sanitizeHttpUrl } from '@/lib/banner-config-security'
import { A11Y_ALL_FEATURES, DEFAULT_A11Y_CONFIG } from './config'

const POSITIONS = new Set<A11yTriggerPosition>([
  'bottom-left', 'bottom-right', 'top-left', 'top-right', 'middle-left', 'middle-right',
])
const SIZES = new Set(['small', 'medium', 'large'])
const SHAPES = new Set(['circle', 'pill', 'square'])
const ICONS = new Set(['universal-access', 'wheelchair', 'eye'])
const THEMES = new Set(['light', 'dark', 'auto'])
const COLOR_MODES = new Set(['accent', 'full', 'match-banner'])
const SHORTCUTS = new Set(['none', 'alt-shift-a', 'ctrl-u'])
const LANGUAGES = new Set([
  'en', 'fr', 'es', 'de', 'pt', 'ja', 'zh', 'ko', 'ar', 'hi', 'nl', 'sv', 'nb', 'da', 'it', 'fi', 'auto',
])

/** `#id` or `.class` only — enough for "open from my footer link", nothing more. */
const SAFE_SELECTOR_RE = /^[#.][A-Za-z_][\w-]{0,63}$/
const EMAIL_RE = /^[^\s@<>"']{1,64}@[^\s@<>"']{1,255}$/
const FEATURE_SET = new Set<string>(A11Y_ALL_FEATURES)

function pick<T extends string>(value: unknown, allowed: Set<T>, fallback: T): T {
  return typeof value === 'string' && allowed.has(value as T) ? (value as T) : fallback
}

function clampOffset(value: unknown, fallback: number): number {
  const n = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(n) || n < 0) return fallback
  return Math.min(Math.round(n), 200)
}

function safeLabel(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.replace(/[<>"'`]/g, '').trim().slice(0, 40)
}

/**
 * Harden the user-controlled `accessibility` block in place. Called from
 * `hardenBannerConfig` at serve time and from save routes. Never throws;
 * anything unexpected snaps back to the default value.
 */
export function hardenAccessibilityConfig(config: BannerConfig): void {
  const raw = (config as { accessibility?: unknown }).accessibility
  if (raw === undefined || raw === null) return
  if (typeof raw !== 'object') {
    delete config.accessibility
    return
  }

  const a = raw as Partial<AccessibilityConfig> & Record<string, unknown>
  const d = DEFAULT_A11Y_CONFIG

  const trigger = (a.trigger && typeof a.trigger === 'object' ? a.trigger : {}) as Partial<AccessibilityConfig['trigger']>
  const panel = (a.panel && typeof a.panel === 'object' ? a.panel : {}) as Partial<AccessibilityConfig['panel']>

  const colors = trigger.colors && typeof trigger.colors === 'object' ? trigger.colors : undefined
  const safeColors = colors
    ? {
        background: colors.background ? sanitizeCssColor(colors.background, '#3b82f6') : undefined,
        icon: colors.icon ? sanitizeCssColor(colors.icon, '#ffffff') : undefined,
        border: colors.border ? sanitizeCssColor(colors.border, 'transparent') : undefined,
      }
    : undefined

  const features: Partial<Record<A11yFeatureKey, boolean>> = {}
  if (a.features && typeof a.features === 'object') {
    for (const [key, value] of Object.entries(a.features as Record<string, unknown>)) {
      if (FEATURE_SET.has(key) && typeof value === 'boolean') {
        features[key as A11yFeatureKey] = value
      }
    }
  }

  const hardened: AccessibilityConfig = {
    enabled: a.enabled === true,
    trigger: {
      position: pick(trigger.position, POSITIONS, d.trigger.position),
      offset: {
        x: clampOffset(trigger.offset?.x, d.trigger.offset!.x),
        y: clampOffset(trigger.offset?.y, d.trigger.offset!.y),
      },
      size: pick(trigger.size, SIZES as Set<AccessibilityConfig['trigger']['size']>, d.trigger.size),
      shape: pick(trigger.shape, SHAPES as Set<AccessibilityConfig['trigger']['shape']>, d.trigger.shape),
      icon: pick(trigger.icon, ICONS as Set<AccessibilityConfig['trigger']['icon']>, d.trigger.icon),
      label: safeLabel(trigger.label),
      hideOnMobile: trigger.hideOnMobile === true,
      customSelector:
        typeof trigger.customSelector === 'string' && SAFE_SELECTOR_RE.test(trigger.customSelector.trim())
          ? trigger.customSelector.trim()
          : '',
      useBannerColors: trigger.useBannerColors !== false,
      ...(safeColors ? { colors: safeColors } : {}),
    },
    panel: {
      theme: pick(panel.theme, THEMES as Set<AccessibilityConfig['panel']['theme']>, d.panel.theme),
      ...(panel.colorMode && COLOR_MODES.has(panel.colorMode) && panel.colorMode !== 'accent'
        ? { colorMode: panel.colorMode as AccessibilityConfig['panel']['colorMode'] }
        : {}),
      ...(panel.accentColor ? { accentColor: sanitizeCssColor(panel.accentColor, '#3b82f6') } : {}),
      ...(() => {
        const headerText = panel.headerTextColor ? sanitizeCssColor(panel.headerTextColor, '') : ''
        return headerText ? { headerTextColor: headerText } : {}
      })(),
      ...(() => {
        const bg = panel.backgroundColor ? sanitizeCssColor(panel.backgroundColor, '') : ''
        return bg ? { backgroundColor: bg } : {}
      })(),
      ...(() => {
        const text = panel.textColor ? sanitizeCssColor(panel.textColor, '') : ''
        return text ? { textColor: text } : {}
      })(),
      ...(typeof panel.language === 'string' && LANGUAGES.has(panel.language)
        ? { language: panel.language as AccessibilityConfig['panel']['language'] }
        : {}),
    },
    features,
    disableColorFilters: a.disableColorFilters === true,
    shortcut: pick(a.shortcut, SHORTCUTS as Set<AccessibilityConfig['shortcut']>, d.shortcut),
    statementUrl: sanitizeHttpUrl(typeof a.statementUrl === 'string' ? a.statementUrl : ''),
    feedbackEmail:
      typeof a.feedbackEmail === 'string' && EMAIL_RE.test(a.feedbackEmail.trim())
        ? a.feedbackEmail.trim()
        : '',
  }

  config.accessibility = hardened
}

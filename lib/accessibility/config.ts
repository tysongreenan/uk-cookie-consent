import type {
  A11yFeatureKey,
  A11yTriggerPosition,
  AccessibilityConfig,
  BannerConfig,
} from '@/types'
import {
  A11Y_INLINE_LANGUAGES,
  A11Y_LANGUAGE_NAMES,
  A11Y_TRANSLATIONS,
  type A11yProfileId,
  type A11yStrings,
} from './translations'
import { A11Y_WIDGET_VERSION } from './version'
import { A11Y_WIDGET_BUILD } from './build-hash'
import { hexColor, resolveA11yPanelLook, type A11yColorMode, type A11yPanelSurface } from './palette'

// ── Feature catalogue ───────────────────────────────────────────────

export const A11Y_FEATURE_GROUPS: ReadonlyArray<{
  id: 'content' | 'visual' | 'color' | 'tools'
  features: readonly A11yFeatureKey[]
}> = [
  {
    id: 'content',
    features: ['fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'dyslexiaFont', 'highlightLinks', 'highlightTitles'],
  },
  {
    id: 'visual',
    features: ['superFocus', 'readAloud', 'readingGuide', 'bigCursor', 'pageStructure'],
  },
  {
    id: 'color',
    features: ['monochrome', 'lowSaturation', 'highSaturation', 'highContrast', 'lightContrast', 'darkContrast'],
  },
  {
    id: 'tools',
    features: ['stopAnimations', 'hideImages', 'imageTooltips', 'muteSounds'],
  },
]

export const A11Y_ALL_FEATURES: readonly A11yFeatureKey[] = [
  'profiles',
  ...A11Y_FEATURE_GROUPS.flatMap((g) => g.features),
]

export const A11Y_PROFILE_IDS: readonly A11yProfileId[] = [
  'seizureSafe',
  'readAloud',
  'visuallyImpaired',
  'adhd',
  'cognitive',
  'motorImpaired',
]

/** Features that are implemented with CSS colour filters. Disabled together by
 *  `disableColorFilters` (the escape hatch for sites where filters break layout). */
export const A11Y_COLOR_FILTER_FEATURES: readonly A11yFeatureKey[] = [
  'monochrome',
  'lowSaturation',
  'highSaturation',
  'highContrast',
]

// ── Defaults ────────────────────────────────────────────────────────

export const DEFAULT_A11Y_CONFIG: AccessibilityConfig = {
  enabled: false,
  trigger: {
    position: 'bottom-left',
    offset: { x: 20, y: 20 },
    size: 'medium',
    shape: 'circle',
    icon: 'universal-access',
    label: '',
    hideOnMobile: false,
    customSelector: '',
    useBannerColors: true,
  },
  panel: {
    theme: 'auto',
  },
  features: {},
  disableColorFilters: false,
  shortcut: 'none',
  statementUrl: '',
  feedbackEmail: '',
}

/** Merge a possibly-partial stored block onto the defaults. Never throws. */
export function withA11yDefaults(partial?: Partial<AccessibilityConfig> | null): AccessibilityConfig {
  const p = partial && typeof partial === 'object' ? partial : {}
  return {
    ...DEFAULT_A11Y_CONFIG,
    ...p,
    trigger: { ...DEFAULT_A11Y_CONFIG.trigger, ...(p.trigger || {}) },
    panel: { ...DEFAULT_A11Y_CONFIG.panel, ...(p.panel || {}) },
    features: { ...(p.features || {}) },
  }
}

// ── Placement ───────────────────────────────────────────────────────

export type CookieFloaterCorner = 'bottom-left' | 'bottom-right' | null

/** Which corner the floating "Cookie Settings" button occupies, if any. */
export function cookieFloaterCorner(config: BannerConfig): CookieFloaterCorner {
  const fl = config.branding?.footerLink as
    | { enabled?: boolean; style?: string; position?: string; floatingPosition?: string }
    | undefined
  if (!fl?.enabled) return null
  const style = fl.style || fl.position || 'floating'
  if (style !== 'floating' && style !== 'both') return null
  return fl.floatingPosition === 'bottom-left' ? 'bottom-left' : 'bottom-right'
}

/** Default trigger corner: opposite the cookie floater so the two never stack. */
export function defaultTriggerPosition(config: BannerConfig): A11yTriggerPosition {
  const corner = cookieFloaterCorner(config)
  if (corner === 'bottom-left') return 'bottom-right'
  return 'bottom-left'
}

/** True when both floaters would share a corner (builder warning + runtime offset). */
export function triggerCollidesWithCookieFloater(config: BannerConfig, position: A11yTriggerPosition): boolean {
  const corner = cookieFloaterCorner(config)
  return corner !== null && corner === position
}

// ── Runtime (served) config ─────────────────────────────────────────

/**
 * What the widget actually receives. Built server-side in banner.js (or in the
 * copy-paste head code) AFTER plan enforcement, so the widget never has to
 * know about plans. Keep this flat and JSON-friendly; the widget is vanilla JS.
 */
export interface A11yRuntimeConfig {
  /** Contract version between banner.js and the widget bundle. */
  v: number
  /** Initial language: a key of `strings`, or 'auto' to follow the browser. */
  lang: string
  strings: Record<string, A11yStrings>
  languageNames: Record<string, string>
  trigger: {
    position: A11yTriggerPosition
    offsetX: number
    offsetY: number
    size: 'small' | 'medium' | 'large'
    shape: 'circle' | 'pill' | 'square'
    icon: 'universal-access' | 'wheelchair' | 'eye'
    label: string
    hideOnMobile: boolean
    customSelector: string
    colors: { background: string; icon: string; border: string }
  }
  panel: {
    theme: 'light' | 'dark' | 'auto'
    accent: string
    /** Title and header-button ink (auto black/white, or owner override). */
    accentText: string
    headerBg: string
    headerFg: string
    /** Set when the owner paints the whole panel (full / match-banner). */
    surface?: A11yPanelSurface
  }
  /** Enabled visitor features (already filtered by the owner's allowlist and filters flag). */
  features: A11yFeatureKey[]
  shortcut: 'none' | 'alt-shift-a' | 'ctrl-u'
  statementUrl: string
  feedbackEmail: string
  poweredBy: boolean
  /** Absolute base for self-hosted assets, e.g. https://cookie-banner.ca/a11y */
  assetsBase: string
  /** Corner occupied by the cookie floater, so the trigger can dodge at runtime. */
  avoidCorner: CookieFloaterCorner
  /**
   * Banner fallback font (same field as the cookie banner). Empty means the
   * widget should inherit whatever the host page is already using.
   */
  fontFamily: string
}

export interface ResolveA11yOptions {
  /** Owner may customize (Pro Annual / Enterprise). False → defaults + branding. */
  customization: boolean
  /** Public base URL of this deployment (no trailing slash). */
  baseUrl: string
  /** Resolve even when the owner has not turned the menu on (builder preview). */
  preview?: boolean
}

/** Safe CSS font-family name from the banner config. Empty if missing or unsafe. */
export function sanitizeBannerFontFamily(value: unknown): string {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim().slice(0, 80)
  if (!trimmed || !/^[A-Za-z][A-Za-z0-9 \-]*$/.test(trimmed)) return ''
  return trimmed
}

export const A11Y_SYSTEM_FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

/** Preview stack when we cannot sample the live page (builder iframe). */
export function bannerFontStack(family: unknown): string {
  const clean = sanitizeBannerFontFamily(family)
  if (!clean) return A11Y_SYSTEM_FONT_STACK
  const quoted = /\s/.test(clean) ? `"${clean}"` : clean
  return `${quoted}, ${A11Y_SYSTEM_FONT_STACK}`
}

/**
 * Turn a banner config into the widget's runtime config, applying plan rules.
 * Returns null when the menu is disabled for this banner.
 */
export function resolveA11yRuntimeConfig(
  bannerConfig: BannerConfig,
  options: ResolveA11yOptions,
): A11yRuntimeConfig | null {
  const a11y = withA11yDefaults(bannerConfig.accessibility)
  if (!a11y.enabled && !options.preview) return null

  const { customization } = options
  const base = options.baseUrl.replace(/\/$/, '')

  const bannerButton = bannerConfig.colors?.button || '#3b82f6'
  const bannerButtonText = bannerConfig.colors?.buttonText || '#ffffff'

  // Free / lifetime: default look. Position still dodges the cookie floater.
  const trigger = customization ? a11y.trigger : DEFAULT_A11Y_CONFIG.trigger
  const position = customization ? a11y.trigger.position : defaultTriggerPosition(bannerConfig)
  const useBannerColors = customization ? a11y.trigger.useBannerColors : true
  const colors = useBannerColors
    ? { background: bannerButton, icon: bannerButtonText, border: 'transparent' }
    : {
        background: a11y.trigger.colors?.background || bannerButton,
        icon: a11y.trigger.colors?.icon || bannerButtonText,
        border: a11y.trigger.colors?.border || 'transparent',
      }

  const allowlist = customization ? a11y.features || {} : {}
  const filtersOff = customization ? Boolean(a11y.disableColorFilters) : false
  const features = A11Y_ALL_FEATURES.filter((key) => {
    if (allowlist[key] === false) return false
    if (filtersOff && A11Y_COLOR_FILTER_FEATURES.includes(key)) return false
    return true
  })

  const strings: Record<string, A11yStrings> = {}
  const languageNames: Record<string, string> = {}
  for (const code of A11Y_INLINE_LANGUAGES) {
    strings[code] = A11Y_TRANSLATIONS[code]
    languageNames[code] = A11Y_LANGUAGE_NAMES[code]
  }
  const requestedLang = a11y.panel.language || bannerConfig.language || 'en'
  const lang = requestedLang === 'auto' || strings[requestedLang] ? requestedLang : 'en'

  return {
    v: A11Y_WIDGET_VERSION,
    lang,
    strings,
    languageNames,
    trigger: {
      position,
      offsetX: trigger.offset?.x ?? 20,
      offsetY: trigger.offset?.y ?? 20,
      size: trigger.size,
      shape: trigger.shape,
      icon: trigger.icon,
      label: customization ? trigger.label || '' : '',
      hideOnMobile: customization ? Boolean(trigger.hideOnMobile) : false,
      customSelector: customization ? trigger.customSelector || '' : '',
      colors,
    },
    panel: resolveA11yPanelLook({
      colorMode: customization ? ((a11y.panel.colorMode as A11yColorMode | undefined) || 'accent') : 'accent',
      theme: customization ? a11y.panel.theme : 'auto',
      accent: (customization && a11y.panel.accentColor) || bannerButton,
      headerText: customization ? a11y.panel.headerTextColor : undefined,
      background: customization ? a11y.panel.backgroundColor : undefined,
      text: customization ? a11y.panel.textColor : undefined,
      bannerBg: hexColor(bannerConfig.colors?.background, '#ffffff'),
      bannerText: hexColor(bannerConfig.colors?.text, '#1f2937'),
    }),
    features,
    shortcut: customization ? a11y.shortcut : 'none',
    statementUrl: customization ? a11y.statementUrl || '' : '',
    feedbackEmail: customization ? a11y.feedbackEmail || '' : '',
    poweredBy: !customization,
    assetsBase: `${base}/a11y`,
    avoidCorner: cookieFloaterCorner(bannerConfig),
    fontFamily: sanitizeBannerFontFamily(bannerConfig.fontFamily),
  }
}

/** Public URL of the versioned, immutable widget bundle. */
/** Versioned filename + content hash: the file is cached immutably, the hash makes every rebuild a new URL. */
export function a11yWidgetUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, '')}/a11y/widget.v${A11Y_WIDGET_VERSION}.js?b=${A11Y_WIDGET_BUILD}`
}

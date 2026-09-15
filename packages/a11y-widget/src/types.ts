// Type-only imports: erased by esbuild, so the widget never bundles server code.
import type { A11yRuntimeConfig } from '../../../lib/accessibility/config'
import type { A11yProfileId, A11yStrings } from '../../../lib/accessibility/translations'
import type { A11yFeatureKey } from '../../../types'

export type { A11yRuntimeConfig, A11yProfileId, A11yStrings, A11yFeatureKey }

/** Keys that cycle through numbered levels (0 = off). */
export type LevelKey = 'fontWeight' | 'lineHeight' | 'letterSpacing'

/** Simple on/off adjustments. `focusRing` is profile-only (no button in the menu). */
export type ToggleKey =
  | 'dyslexiaFont'
  | 'highlightLinks'
  | 'highlightTitles'
  | 'superFocus'
  | 'readAloud'
  | 'readingGuide'
  | 'bigCursor'
  | 'monochrome'
  | 'lowSaturation'
  | 'highSaturation'
  | 'highContrast'
  | 'lightContrast'
  | 'darkContrast'
  | 'stopAnimations'
  | 'hideImages'
  | 'imageTooltips'
  | 'muteSounds'
  | 'focusRing'

export interface Prefs {
  v: 1
  /** Percent, 100 = unchanged. */
  fontSize: number
  fontWeight: number
  lineHeight: number
  letterSpacing: number
  toggles: Partial<Record<ToggleKey, boolean>>
  profile: A11yProfileId | null
  /** Visitor-chosen language; null = follow config. */
  lang: string | null
  /** Speak menu labels as you hover. Off by default so it is not foisted on everyone. */
  menuVoice: boolean
}

export interface Ctx {
  cfg: A11yRuntimeConfig
  prefs: Prefs
  strings: A11yStrings
  lang: string
  root: ShadowRoot
  host: HTMLElement
  announce: (msg: string) => void
  save: () => void
  render: () => void
  track: (type: string, extra?: Record<string, unknown>) => void
}

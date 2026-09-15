// Bundled by make-sandbox.mjs; produces the runtime configs the sandbox page embeds.
import { resolveA11yRuntimeConfig, withA11yDefaults, DEFAULT_A11Y_CONFIG } from '../../../lib/accessibility/config'
import type { BannerConfig } from '../../../types'

const fixture = {
  colors: { background: '#1f2937', text: '#f9fafb', button: '#3b82f6', buttonText: '#ffffff', link: '#60a5fa' },
  language: 'en',
  branding: {
    footerLink: { enabled: true, text: 'Cookie Settings', position: 'floating', floatingPosition: 'bottom-left', style: 'floating' },
  },
  accessibility: withA11yDefaults({
    enabled: true,
    trigger: { ...DEFAULT_A11Y_CONFIG.trigger, position: 'bottom-left', shape: 'pill', label: 'Accessibility', size: 'large' },
    shortcut: 'alt-shift-a',
    statementUrl: 'https://www.cookie-banner.ca/accessibility',
    feedbackEmail: 'accessibility@example.com',
    panel: { theme: 'auto', language: 'auto' },
  }),
} as unknown as BannerConfig

export const free = resolveA11yRuntimeConfig(fixture, { customization: false, baseUrl: '' })
export const pro = resolveA11yRuntimeConfig(fixture, { customization: true, baseUrl: '' })

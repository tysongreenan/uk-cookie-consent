/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import type { BannerConfig } from '@/types'
import { generateBannerJS } from '@/lib/banner-generator'

const config = {
  compliance: {},
  name: 'Test',
  position: 'bottom',
  theme: 'light',
  colors: { background: '#fff', text: '#111', button: '#3b82f6', buttonText: '#ffffff', link: '#3b82f6' },
  language: 'en',
  text: { title: '', message: '', acceptButton: '', rejectButton: '', preferencesButton: '' },
  behavior: { autoShow: true, dismissOnScroll: false, showPreferences: true, cookieExpiry: 365 },
  branding: {
    logo: { enabled: false, url: '', position: 'left', maxWidth: 120, maxHeight: 40 },
    privacyPolicy: { url: '', text: '', openInNewTab: true, required: false },
    footerLink: { enabled: true, text: 'Cookie Settings', position: 'floating', floatingPosition: 'bottom-left', style: 'floating' },
  },
  layout: { width: 'full', borderRadius: 8, padding: 20, margin: 20, shadow: 'medium', animation: 'fade' },
  scripts: { strictlyNecessary: [], functionality: [], trackingPerformance: [], targetingAdvertising: [] },
  advanced: { googleConsentMode: true, customCSS: '', customJS: '' },
} as unknown as BannerConfig

// Run the generated injectInlineScript inside the page. vitest's `window` is Node's global;
// injected <script>s run in the real jsdom window, so use that one.
function page() {
  const fn = generateBannerJS(config).match(/function injectInlineScript\([\s\S]*?\n}\n/)![0]
  const w = (globalThis as any).jsdom.window
  w.eval(`var injectedScripts = {};${fn}window.inject = injectInlineScript;`)
  w.eval("window.dataLayer = [['consent', 'default'], { event: 'gtm.js' }]")
  return w
}

describe('injectInlineScript keeps the dataLayer intact', () => {
  it('survives a pasted snippet that resets dataLayer (legacy ga.js)', () => {
    const w = page()
    const original = w.dataLayer
    w.inject(w.btoa("var _gaq = _gaq || []; dataLayer = []; dataLayer.push({ event: 'legacy' });"), 'UA', 'ua')
    expect(w.dataLayer).toBe(original)
    expect(w.dataLayer.map((e: any) => e.event ?? e[0])).toEqual(['consent', 'gtm.js', 'legacy'])
  })

  it('leaves normal snippets alone', () => {
    const w = page()
    w.inject(w.btoa("window.dataLayer = window.dataLayer || []; dataLayer.push({ event: 'ok' });"), 'GA4', 'ga4')
    expect(w.dataLayer.map((e: any) => e.event ?? e[0])).toEqual(['consent', 'gtm.js', 'ok'])
  })
})

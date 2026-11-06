/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { generateBannerHTML, generateBannerJS } from '@/lib/banner-generator'

const base = {
  compliance: {}, name: 'Test', position: 'bottom', theme: 'light', language: 'auto',
  colors: { background: '#fff', text: '#111', button: '#3b82f6', buttonText: '#ffffff', link: '#3b82f6' },
  text: { title: 'We use cookies', message: 'This website uses cookies.', acceptButton: 'Accept', rejectButton: 'Decline', preferencesButton: 'Preferences' },
  behavior: { autoShow: true, dismissOnScroll: false, showPreferences: true, cookieExpiry: 365 },
  branding: { logo: { enabled: false, url: '', position: 'left', maxWidth: 120, maxHeight: 40 }, privacyPolicy: { url: '', text: '', openInNewTab: true, required: false }, footerLink: { enabled: true, text: 'Cookie Settings', position: 'floating', floatingPosition: 'bottom-left', style: 'floating' } },
  layout: { width: 'full', borderRadius: 8, padding: 20, margin: 20, shadow: 'medium', animation: 'fade' },
  scripts: { strictlyNecessary: [], functionality: [], trackingPerformance: [], targetingAdvertising: [] },
  advanced: { googleConsentMode: true, customCSS: '', customJS: '' },
}

// Load the real banner in a fresh page that already holds `cookie` (one window per load).
async function load(consentVersion: number | undefined, cookie?: string) {
  const config: any = structuredClone(base)
  if (consentVersion !== undefined) config.behavior.consentVersion = consentVersion
  const JSDOM = (globalThis as any).jsdom.constructor
  const { window } = new JSDOM(`<!doctype html><body>${generateBannerHTML(config, { showBranding: false })}</body>`, { runScripts: 'dangerously', url: 'https://shop.example/' })
  if (cookie) window.document.cookie = cookie
  window.eval(generateBannerJS(config))
  if (window.document.readyState === 'loading') await new Promise((done) => window.addEventListener('DOMContentLoaded', done))
  return window
}
const saved = (w: any) => { const m = w.document.cookie.match(/(?:^|; )cookie_consent=([^;]*)/); return m ? JSON.parse(decodeURIComponent(m[1])) : null }
const oldChoice = 'cookie_consent=' + encodeURIComponent(JSON.stringify({ essential: true, functionality: false, analytics: false, marketing: false })) + '; path=/'

describe('consentVersion reset', () => {
  it('off by default: a choice saved before stays', async () => {
    expect(saved(await load(undefined, oldChoice))).toMatchObject({ analytics: false })
  })

  it('bumped: a choice saved before is discarded, and a new choice is stamped and kept on reload', async () => {
    const w = await load(1, oldChoice)
    expect(saved(w)).toBeNull()
    w.document.getElementById('cookie-accept-btn').click()
    const choice = saved(w)
    expect(choice).toMatchObject({ analytics: true, _v: 1 })
    const again = await load(1, 'cookie_consent=' + encodeURIComponent(JSON.stringify(choice)) + '; path=/')
    expect(saved(again)).toMatchObject({ analytics: true, _v: 1 })
  })
})

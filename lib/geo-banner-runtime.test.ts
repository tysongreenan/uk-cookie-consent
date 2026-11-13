/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import type { BannerConfigWithGeoOverrides } from '@/types'
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

// Run the real generated banner in a fresh page (one window per test: the banner sets globals),
// then let the page finish loading so the banner's init() runs.
async function visit(geo: Partial<BannerConfigWithGeoOverrides>) {
  const config = { ...structuredClone(base), ...geo } as unknown as BannerConfigWithGeoOverrides
  const JSDOM = (globalThis as any).jsdom.constructor
  const { window } = new JSDOM(`<!doctype html><body>${generateBannerHTML(config, { showBranding: false })}</body>`, { runScripts: 'dangerously', url: 'https://shop.example/' })
  window.eval(generateBannerJS(config))
  if (window.document.readyState === 'loading') await new Promise((done) => window.addEventListener('DOMContentLoaded', done))
  return window
}
const switches = (w: any) => ['func', 'performance', 'targeting'].map((k) => w.document.getElementById(`cookie-${k}-toggle-modal`).checked)

describe('geo rules at runtime', () => {
  it('implied consent: Preferences shows the consent already running, so Confirm keeps it', async () => {
    const w = await visit({ _geoImpliedConsent: true })
    w.showCookiePreferences()
    expect(switches(w)).toEqual([true, true, true])
  })

  it('no geo rule: Preferences still starts with everything off', async () => {
    const w = await visit({})
    w.showCookiePreferences()
    expect(switches(w)).toEqual([false, false, false])
  })

  it('Targeting and Social switches move together, since they are one stored category', async () => {
    const w = await visit({})
    w.showCookiePreferences()
    const targeting = w.document.getElementById('cookie-targeting-toggle-modal')
    const social = w.document.getElementById('cookie-social-toggle-modal')
    targeting.click()
    expect([targeting.checked, social.checked]).toEqual([true, true])
    social.click()
    expect([targeting.checked, social.checked]).toEqual([false, false])
  })

  it('strict opt-in hides the X with !important so the mobile stylesheet cannot show it', async () => {
    const x = (await visit({ _geoRequiresOptIn: true })).document.getElementById('cookie-close-btn')
    expect(x.style.getPropertyValue('display')).toBe('none')
    expect(x.style.getPropertyPriority('display')).toBe('important')
  })
})

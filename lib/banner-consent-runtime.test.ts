/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { VirtualConsole } from 'jsdom'
import { generateBannerHTML, generateBannerJS, generateConsentInitScript } from '@/lib/banner-generator'

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
const pixel = { id: 'px', name: 'Pixel', scriptCode: '<script>window.__pixelRan = (window.__pixelRan || 0) + 1</script>', enabled: true, category: 'targetingAdvertising' }
const withPixel = { scripts: { ...base.scripts, targetingAdvertising: [pixel] } }
const categories = { layout: { ...base.layout, buttonPlacement: 'categories' } }
const tcf = { integrations: { tcf: { enabled: true, cmpId: 1, cmpVersion: 1 } } }
const allOff = { essential: true, functionality: false, analytics: false, marketing: false }

// Run the real generated banner in a fresh page. `reloads` counts location.reload() calls,
// which jsdom reports as an unimplemented navigation.
async function visit(over: any = {}, opts: { gpc?: boolean; cookie?: object } = {}) {
  const config: any = { ...structuredClone(base), ...over }
  const reloads: string[] = []
  const virtualConsole = new VirtualConsole()
  virtualConsole.on('jsdomError', (e: Error) => { if (/navigation/i.test(e.message)) reloads.push(e.message) })
  const JSDOM = (globalThis as any).jsdom.constructor
  const { window } = new JSDOM(`<!doctype html><body>${generateBannerHTML(config, { showBranding: false })}</body>`, { runScripts: 'dangerously', url: 'https://shop.example/', virtualConsole })
  window.scrollTo = () => {}
  if (opts.gpc) Object.defineProperty(window.navigator, 'globalPrivacyControl', { value: true })
  if (opts.cookie) window.document.cookie = 'cookie_consent=' + encodeURIComponent(JSON.stringify(opts.cookie)) + '; path=/'
  window.eval(generateConsentInitScript(config).replace(/<\/?script>/g, ''))
  window.eval(generateBannerJS(config))
  if (window.document.readyState === 'loading') await new Promise((done) => window.addEventListener('DOMContentLoaded', done))
  return { w: window, el: (id: string) => window.document.getElementById(id), reloads }
}
const settle = () => new Promise((done) => setTimeout(done, 700))
const lastUpdate = (w: any) => Array.from(w.dataLayer as any[]).filter((a: any) => a[0] === 'consent' && a[1] === 'update').pop()?.[2]

describe('closing the banner with the X', () => {
  it('shows the floating Cookie Settings button so the visitor can still choose', async () => {
    const { el } = await visit()
    el('cookie-close-btn').click()
    expect(el('cookie-consent-banner').style.display).toBe('none')
    expect(el('cookie-settings-float').style.display).toBe('flex')
  })
})

describe('withdrawing consent reloads the page so running scripts stop', () => {
  it('reloads when a category whose scripts ran on this page is turned off', async () => {
    const { w, el, reloads } = await visit(withPixel, { cookie: { essential: true, functionality: true, analytics: true, marketing: true } })
    expect(w.__pixelRan).toBe(1)
    w.showCookiePreferences()
    el('cookie-targeting-toggle-modal').click()
    el('cookie-confirm-choices-btn').click()
    await settle()
    expect(reloads).toHaveLength(1)
  })

  it('reloads when an implied-consent visitor rejects after scripts already ran', async () => {
    const { w, el, reloads } = await visit({ ...withPixel, _geoImpliedConsent: true })
    expect(w.__pixelRan).toBe(1)
    el('cookie-reject-btn').click()
    await settle()
    expect(reloads).toHaveLength(1)
  })

  it('does not reload on accept, on the same choice again, or when the declined category had no scripts', async () => {
    const accept = await visit(withPixel)
    accept.el('cookie-accept-btn').click()
    await settle()
    expect(accept.reloads).toHaveLength(0)

    const same = await visit(withPixel, { cookie: { essential: true, functionality: true, analytics: true, marketing: true } })
    same.w.showCookiePreferences()
    same.el('cookie-confirm-choices-btn').click()
    await settle()
    expect(same.reloads).toHaveLength(0)

    const noScripts = await visit({}, { cookie: { essential: true, functionality: true, analytics: true, marketing: true } })
    noScripts.w.showCookiePreferences()
    noScripts.el('cookie-targeting-toggle-modal').click()
    noScripts.el('cookie-confirm-choices-btn').click()
    await settle()
    expect(noScripts.reloads).toHaveLength(0)
  })
})

describe('category switches in the bar layout', () => {
  it('start off for a visitor under a strict opt-in geo rule, so Allow selection saves nothing optional', async () => {
    const { w, el } = await visit({ ...categories, _geoRequiresOptIn: true })
    expect(['preferences', 'statistics', 'marketing'].map((k) => el('cb-cat-' + k).checked)).toEqual([false, false, false])
    el('cookie-selection-btn').click()
    expect(JSON.parse(decodeURIComponent(w.document.cookie.match(/cookie_consent=([^;]+)/)[1]))).toMatchObject(allOff)
  })

  it('start on for an implied-consent visitor on an opt-in banner, matching the scripts already running', async () => {
    const { w, el } = await visit({ ...categories, compliance: { requiresOptIn: true }, _geoImpliedConsent: true })
    expect(['preferences', 'statistics', 'marketing'].map((k) => el('cb-cat-' + k).checked)).toEqual([true, true, true])
    w.showCookiePreferences()
    expect(['func', 'performance', 'targeting'].map((k) => el(`cookie-${k}-toggle-modal`).checked)).toEqual([true, true, true])
  })
})

describe('TCF mode and Google Consent Mode', () => {
  it('keeps ad signals denied when Global Privacy Control is on and the visitor accepts', async () => {
    const { w, el } = await visit(tcf, { gpc: true })
    el('cookie-accept-btn').click()
    expect(lastUpdate(w)).toMatchObject({ ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
  })

  it('sends the same signals on save as a returning visitor gets on reload', async () => {
    const { w, el } = await visit(tcf)
    w.showCookiePreferences()
    for (let i = 1; i <= 11; i++) { const t = el(`tcf-purpose-${i}-toggle`); if (t) t.checked = i === 5 }
    el('cookie-confirm-choices-btn').click()
    const saved = lastUpdate(w)
    const cookie = JSON.parse(decodeURIComponent(w.document.cookie.match(/cookie_consent=([^;]+)/)[1]))
    const again = await visit(tcf, { cookie })
    expect(lastUpdate(again.w)).toEqual(saved)
  })
})

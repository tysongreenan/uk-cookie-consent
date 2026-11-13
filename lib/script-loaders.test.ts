/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import type { BannerConfig, TrackingScript } from '@/types'
import { generateBannerJS } from '@/lib/banner-generator'

// Snippets as customers paste them (fake IDs). GTM is the minified single-line form.
const GTM = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TEST123');</script>`
const CLARITY = `<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "abc123xyz0");</script>`
const LINKEDIN = `<script type="text/javascript">_linkedin_partner_id = "123456"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id);</script><script type="text/javascript">(function(l) { if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]} var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})(window.lintrk);</script><noscript><img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=123456&fmt=gif" /></noscript>`
const GA4 = `<script async src="https://www.googletagmanager.com/gtag/js?id=G-ABC1234"></script>`
// Google's standard GA4 snippet: the library plus the inline config that makes it send anything.
const GA4_FULL = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FULL123"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-FULL123');
</script>`

const script = (name: string, scriptCode: string) => ({ id: name, name, scriptCode, enabled: true, category: 'trackingPerformance' }) as unknown as TrackingScript

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
  scripts: {
    strictlyNecessary: [],
    functionality: [],
    trackingPerformance: [script('GTM', GTM), script('Clarity', CLARITY), script('LinkedIn', LINKEDIN), script('GA4', GA4), script('GA4 full', GA4_FULL)],
    targetingAdvertising: [],
  },
  advanced: { googleConsentMode: true, customCSS: '', customJS: '' },
} as unknown as BannerConfig

const js = generateBannerJS(config)

// Run the generated loadScripts in the page and record what it would load.
function load(pageHtml = '') {
  const w = (globalThis as any).jsdom.window
  w.dataLayer = undefined
  w.document.head.innerHTML = pageHtml
  for (const el of w.document.head.querySelectorAll('script:not([src])')) w.eval(el.textContent)
  const fn = js.match(/function loadScripts\(consent\) \{[\s\S]*?\n\}\n/)![0]
  w.eval(`var calls = [], CB_RAN = {};
    function injectInlineScript(enc, name) { calls.push([name, decodeURIComponent(escape(atob(enc)))]); }
    function loadExternalScript(src, name, onLoaded) { calls.push([name, 'EXTERNAL ' + src]); if (onLoaded) onLoaded(); }
    function scheduleTask(fn) { fn(); }
    ${fn}
    loadScripts({ essential: true, functionality: true, analytics: true, marketing: true });`)
  const out: Record<string, string> = {}
  for (const [name, what] of w.calls as [string, string][]) out[name] = out[name] ? out[name] + '\n' + what : what
  return out
}

describe('pasted script loaders', () => {
  it('runs inline snippets whose code builds a src (GTM, Clarity, LinkedIn) instead of loading a dead URL', () => {
    expect(() => new Function(js)).not.toThrow()
    const calls = load()
    expect(calls.GTM).toContain("'GTM-TEST123'")
    expect(calls.Clarity).toContain('"abc123xyz0"')
    expect(calls.LinkedIn).toContain('insight.min.js')
    expect(calls.LinkedIn).not.toContain('<noscript')
    expect(calls.GA4).toBe('EXTERNAL https://www.googletagmanager.com/gtag/js?id=G-ABC1234')
  })

  it('skips GTM and Clarity when the page already loads them, so they are not counted twice', () => {
    const calls = load(
      '<script src="https://www.googletagmanager.com/gtm.js?id=GTM-TEST123&gtm_auth=x"></script>' +
        '<script src="https://www.clarity.ms/tag/abc123xyz0"></script>',
    )
    expect(calls.GTM).toBeUndefined()
    expect(calls.Clarity).toBeUndefined()
    expect(calls.LinkedIn).toContain('insight.min.js')
  })

  it('runs the inline gtag config of a GA4 snippet once gtag.js has loaded', () => {
    const out = load()['GA4 full']
    const external = out.slice(0, out.indexOf('\n'))
    const inline = out.slice(out.indexOf('\n') + 1)
    expect(external).toBe('EXTERNAL https://www.googletagmanager.com/gtag/js?id=G-FULL123')
    expect(inline).toContain("gtag('config', 'G-FULL123')")
    expect(inline).not.toContain('<script')
  })

  it('keeps snippet order: setup before the tag runs first, init after it runs after the file loads', () => {
    const vendor = `<script>window._v = { id: 1 };</script><script src="https://cdn.example.com/v.js"></script><script>Vendor.init(window._v);</script>`
    const js2 = generateBannerJS({ ...config, scripts: { ...config.scripts, trackingPerformance: [script('Vendor', vendor)] } } as unknown as BannerConfig)
    const fn = js2.match(/function loadScripts\(consent\) \{[\s\S]*?\n\}\n/)![0]
    const w = (globalThis as any).jsdom.window
    w.eval(`var calls = [], CB_RAN = {};
      function injectInlineScript(enc, name) { calls.push(decodeURIComponent(escape(atob(enc)))); }
      function loadExternalScript(src, name, onLoaded) { calls.push('EXTERNAL ' + src); if (onLoaded) onLoaded(); }
      function scheduleTask(fn) { fn(); }
      ${fn}
      loadScripts({ essential: true, functionality: true, analytics: true, marketing: true });`)
    expect(w.calls).toEqual(['window._v = { id: 1 };', 'EXTERNAL https://cdn.example.com/v.js', 'Vendor.init(window._v);'])
  })

  it('loads every file of a multi-file snippet, each after the one before it', () => {
    const multi = `<script src="https://cdn.example.com/core.js"></script><script src="https://cdn.example.com/plugin.js"></script><script>Plugin.init();</script>`
    const js2 = generateBannerJS({ ...config, scripts: { ...config.scripts, trackingPerformance: [script('Multi', multi)] } } as unknown as BannerConfig)
    const fn = js2.match(/function loadScripts\(consent\) \{[\s\S]*?\n\}\n/)![0]
    const w = (globalThis as any).jsdom.window
    w.eval(`var calls = [], CB_RAN = {};
      function injectInlineScript(enc, name) { calls.push(decodeURIComponent(escape(atob(enc)))); }
      function loadExternalScript(src, name, onLoaded) { calls.push('EXTERNAL ' + src); if (onLoaded) onLoaded(); }
      function scheduleTask(fn) { fn(); }
      ${fn}
      loadScripts({ essential: true, functionality: true, analytics: true, marketing: true });`)
    expect(w.calls).toEqual(['EXTERNAL https://cdn.example.com/core.js', 'EXTERNAL https://cdn.example.com/plugin.js', 'Plugin.init();'])
  })

  it('holds init code until a shared file has actually loaded', () => {
    const w = (globalThis as any).jsdom.window
    const loader = js.match(/var externalScriptState[\s\S]*?\nfunction injectInlineScript/)![0].replace(/\nfunction injectInlineScript$/, '')
    // An older banner.js on the page already marked the file as injected (before it loaded).
    w.eval(`var injectedExternalScripts = { 'https://cdn.example.com/shared.js': true }; var order = [];
      window.__cookieBannerExternalWaiters = {}; window.__cookieBannerExternalState = {};
      ${loader}
      loadExternalScript('https://cdn.example.com/shared.js', 'A', function() { order.push('A init'); });
      loadExternalScript('https://cdn.example.com/shared.js', 'B', function() { order.push('B init'); });
      order.push('before load');
      document.querySelector('script[data-cookie-banner-src="https://cdn.example.com/shared.js"]').onload();
      loadExternalScript('https://cdn.example.com/shared.js', 'C', function() { order.push('C init'); });`)
    expect(w.order).toEqual(['before load', 'A init', 'B init', 'C init'])
    expect(w.document.querySelectorAll('script[data-cookie-banner-src]').length).toBe(1)
  })

  it('skips a GA4 snippet when the site already loads that tag itself', () => {
    const calls = load('<script async src="https://www.googletagmanager.com/gtag/js?id=G-FULL123"></script>')
    expect(calls['GA4 full']).toBeUndefined()
    expect(calls.GA4).toBe('EXTERNAL https://www.googletagmanager.com/gtag/js?id=G-ABC1234')
  })

  it('skips a GA4 snippet when the site already configured that ID from a first-party gtag path', () => {
    const calls = load(
      `<script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-FULL123');</script>`,
    )
    expect(calls['GA4 full']).toBeUndefined()
  })
})

describe('dismiss on scroll', () => {
  const withScroll = (compliance: object) =>
    generateBannerJS({ ...config, compliance, behavior: { ...config.behavior, dismissOnScroll: true } } as unknown as BannerConfig)

  it('never hides an opt-in banner on scroll, since scrolling is not consent', () => {
    expect(withScroll({ framework: 'gdpr', requiresOptIn: true })).not.toContain('window.pageYOffset > 100')
    expect(withScroll({ framework: 'pipeda', requiresOptIn: false })).toContain('window.pageYOffset > 100')
  })
})

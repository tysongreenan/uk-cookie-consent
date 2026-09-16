import { describe, expect, it } from 'vitest'
import type { BannerConfig } from '@/types'
import { canAccessFeatureWithFreeze, PLAN_FEATURES } from '@/lib/plan-restrictions'
import { hardenBannerConfig } from '@/lib/banner-config-security'
import {
  A11Y_ALL_FEATURES,
  A11Y_OWNER_DISCLAIMER,
  A11Y_OWNER_DISCLAIMER_SHORT,
  A11Y_TRANSLATIONS,
  A11Y_WIDGET_VERSION,
  a11yWidgetUrl,
  contrast,
  DEFAULT_A11Y_CONFIG,
  defaultTriggerPosition,
  generateA11yHeadTag,
  generateA11yLoaderScript,
  hardenAccessibilityConfig,
  resolveA11yRuntimeConfig,
  triggerCollidesWithCookieFloater,
  withA11yDefaults,
} from '@/lib/accessibility'

function banner(overrides: Partial<BannerConfig> = {}): BannerConfig {
  return {
    compliance: {} as BannerConfig['compliance'],
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
    ...overrides,
  }
}

describe('compliance copy', () => {
  it('never claims the menu makes a site ADA/AODA/WCAG compliant', () => {
    expect(A11Y_OWNER_DISCLAIMER).toMatch(/does not make a website WCAG, AODA or ADA compliant/i)
    expect(A11Y_OWNER_DISCLAIMER_SHORT).toMatch(/does not make a website WCAG, AODA or ADA compliant/i)
    expect(A11Y_TRANSLATIONS.en.disclaimer).toMatch(/does not make the site accessible/i)
    expect(A11Y_TRANSLATIONS.fr.disclaimer).toMatch(/ne rend pas le site accessible/i)
  })
})

describe('plan gating', () => {
  it('every tier gets the menu; only annual/enterprise get customization', () => {
    expect(PLAN_FEATURES.free.hasAccessibilityMenu).toBe(true)
    expect(PLAN_FEATURES.free.hasAccessibilityCustomization).toBe(false)
    expect(canAccessFeatureWithFreeze('pro_annual', 'hasAccessibilityCustomization')).toBe(true)
    expect(canAccessFeatureWithFreeze('enterprise', 'hasAccessibilityCustomization')).toBe(true)
  })

  it('lifetime users are excluded from customization by the freeze policy but keep the menu', () => {
    expect(canAccessFeatureWithFreeze('pro_lifetime', 'hasAccessibilityMenu')).toBe(true)
    expect(canAccessFeatureWithFreeze('pro_lifetime', 'hasAccessibilityCustomization')).toBe(false)
    expect(canAccessFeatureWithFreeze('pro', 'hasAccessibilityCustomization', '2026-04-01')).toBe(false)
  })
})

describe('translations', () => {
  it('fr has every key en has (and the same profiles)', () => {
    const en = A11Y_TRANSLATIONS.en as unknown as Record<string, unknown>
    const fr = A11Y_TRANSLATIONS.fr as unknown as Record<string, unknown>
    expect(Object.keys(fr).sort()).toEqual(Object.keys(en).sort())
    expect(Object.keys(A11Y_TRANSLATIONS.fr.profiles).sort()).toEqual(Object.keys(A11Y_TRANSLATIONS.en.profiles).sort())
    expect(A11Y_TRANSLATIONS.fr.levelLabels).toHaveLength(A11Y_TRANSLATIONS.en.levelLabels.length)
  })

  it('has a label for every visitor feature', () => {
    for (const key of A11Y_ALL_FEATURES) {
      if (key === 'profiles') continue
      expect(typeof (A11Y_TRANSLATIONS.en as unknown as Record<string, unknown>)[key]).toBe('string')
    }
  })

  it('never calls read-aloud a screen reader', () => {
    const blob = JSON.stringify(A11Y_TRANSLATIONS.en).toLowerCase()
    expect(blob).not.toMatch(/activates the screen reader/)
    expect(A11Y_TRANSLATIONS.en.profiles.readAloud.name).toMatch(/read aloud/i)
  })

  it('has spoken confirmations so people who cannot read can find Read aloud', () => {
    expect(A11Y_TRANSLATIONS.en.readAloudOnSpeak).toMatch(/read aloud is on/i)
    expect(A11Y_TRANSLATIONS.en.readAloudPreviewOff).toMatch(/click to turn it on/i)
    expect(A11Y_TRANSLATIONS.en.menuVoiceOff).toMatch(/mute/i)
    expect(A11Y_TRANSLATIONS.fr.readAloudOnSpeak).toMatch(/voix haute/i)
  })
})

describe('placement', () => {
  it('defaults to the corner opposite the cookie floater', () => {
    expect(defaultTriggerPosition(banner())).toBe('bottom-right')
    const right = banner()
    ;(right.branding.footerLink as { floatingPosition: string }).floatingPosition = 'bottom-right'
    expect(defaultTriggerPosition(right)).toBe('bottom-left')
  })

  it('defaults to bottom-left when there is no floating cookie button', () => {
    const inline = banner()
    ;(inline.branding.footerLink as { style: string }).style = 'inline'
    expect(defaultTriggerPosition(inline)).toBe('bottom-left')
    inline.branding.footerLink.enabled = false
    expect(defaultTriggerPosition(inline)).toBe('bottom-left')
  })

  it('detects a collision', () => {
    expect(triggerCollidesWithCookieFloater(banner(), 'bottom-left')).toBe(true)
    expect(triggerCollidesWithCookieFloater(banner(), 'bottom-right')).toBe(false)
  })
})

describe('resolveA11yRuntimeConfig', () => {
  it('returns null when disabled or absent', () => {
    expect(resolveA11yRuntimeConfig(banner(), { customization: true, baseUrl: 'https://x.test' })).toBeNull()
    const off = banner({ accessibility: { ...DEFAULT_A11Y_CONFIG, enabled: false } })
    expect(resolveA11yRuntimeConfig(off, { customization: true, baseUrl: 'https://x.test' })).toBeNull()
  })

  it('still resolves a disabled banner when preview is true', () => {
    const off = banner({ accessibility: { ...DEFAULT_A11Y_CONFIG, enabled: false } })
    expect(resolveA11yRuntimeConfig(off, { customization: true, baseUrl: 'https://x.test', preview: true })).not.toBeNull()
  })

  it('free: default look, banner colours, all features, branding, auto position', () => {
    const cfg = banner({
      accessibility: withA11yDefaults({
        enabled: true,
        trigger: { ...DEFAULT_A11Y_CONFIG.trigger, position: 'top-right', size: 'large', label: 'Hello', useBannerColors: false, colors: { background: '#000' } },
        features: { monochrome: false },
        shortcut: 'ctrl-u',
        statementUrl: 'https://example.com/a11y',
        feedbackEmail: 'a@b.co',
      }),
    })
    const rt = resolveA11yRuntimeConfig(cfg, { customization: false, baseUrl: 'https://x.test/' })!
    expect(rt.poweredBy).toBe(true)
    expect(rt.trigger.position).toBe('bottom-right') // opposite the bottom-left cookie pill
    expect(rt.trigger.size).toBe('medium')
    expect(rt.trigger.label).toBe('')
    expect(rt.trigger.colors).toEqual({ background: '#3b82f6', icon: '#ffffff', border: 'transparent' })
    expect(rt.features).toContain('monochrome')
    expect(rt.shortcut).toBe('none')
    expect(rt.statementUrl).toBe('')
    expect(rt.feedbackEmail).toBe('')
    expect(rt.assetsBase).toBe('https://x.test/a11y')
    expect(rt.avoidCorner).toBe('bottom-left')
    expect(Object.keys(rt.strings)).toEqual(['en', 'fr'])
    expect(rt.v).toBe(A11Y_WIDGET_VERSION)
    expect(rt.fontFamily).toBe('')
  })

  it('picks white heading ink on a dark brown accent and honours an override', () => {
    const auto = banner({
      accessibility: withA11yDefaults({
        enabled: true,
        panel: { theme: 'auto', accentColor: '#5f3838' },
      }),
    })
    expect(resolveA11yRuntimeConfig(auto, { customization: true, baseUrl: 'https://x.test' })!.panel.accentText).toBe(
      '#ffffff',
    )
    const custom = banner({
      accessibility: withA11yDefaults({
        enabled: true,
        panel: { theme: 'auto', accentColor: '#5f3838', headerTextColor: '#f5e6d3' },
      }),
    })
    expect(resolveA11yRuntimeConfig(custom, { customization: true, baseUrl: 'https://x.test' })!.panel.accentText).toBe(
      '#f5e6d3',
    )
  })

  it('full colour mode paints the panel from the accent and keeps Reset readable', () => {
    const cfg = banner({
      accessibility: withA11yDefaults({
        enabled: true,
        panel: { theme: 'auto', colorMode: 'full', accentColor: '#111111' },
      }),
    })
    const panel = resolveA11yRuntimeConfig(cfg, { customization: true, baseUrl: 'https://x.test' })!.panel
    expect(panel.surface?.bg).toBe('#111111')
    expect(panel.surface?.theme).toBe('dark')
    expect(panel.headerBg).toBe('#111111')
    expect(panel.headerFg).toBe('#ffffff')
    expect(panel.accent).toBe('#ffffff')
    expect(panel.accentText).toBe('#111111')
    expect(contrast(panel.surface!.text, panel.surface!.bg)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(panel.surface!.muted, panel.surface!.card)).toBeGreaterThanOrEqual(4.5)
  })

  it('match-banner mode uses cookie banner background, text, and buttons', () => {
    const cfg = banner({
      colors: { background: '#fff7ed', text: '#1f2937', button: '#9a3412', buttonText: '#ffffff', link: '#9a3412' },
      accessibility: withA11yDefaults({
        enabled: true,
        panel: { theme: 'auto', colorMode: 'match-banner' },
      }),
    })
    const panel = resolveA11yRuntimeConfig(cfg, { customization: true, baseUrl: 'https://x.test' })!.panel
    expect(panel.surface?.bg.toLowerCase()).toBe('#fff7ed')
    expect(panel.headerBg).toBe('#9a3412')
    expect(panel.accent).toBe('#9a3412')
  })

  it('passes a sanitized banner fallback font through to the widget', () => {
    const cfg = banner({
      fontFamily: 'Freight Sans',
      accessibility: { ...DEFAULT_A11Y_CONFIG, enabled: true },
    })
    expect(resolveA11yRuntimeConfig(cfg, { customization: false, baseUrl: 'https://x.test' })!.fontFamily).toBe('Freight Sans')
    const dirty = banner({
      fontFamily: 'Inter"; color:red',
      accessibility: { ...DEFAULT_A11Y_CONFIG, enabled: true },
    })
    expect(resolveA11yRuntimeConfig(dirty, { customization: false, baseUrl: 'https://x.test' })!.fontFamily).toBe('')
  })

  it('pro: honours customization, allowlist, filter escape hatch and removes branding', () => {
    const cfg = banner({
      accessibility: withA11yDefaults({
        enabled: true,
        trigger: { ...DEFAULT_A11Y_CONFIG.trigger, position: 'top-right', size: 'large', label: 'Hello', useBannerColors: false, colors: { background: '#000', icon: '#fff' } },
        features: { monochrome: false, readAloud: false },
        disableColorFilters: true,
        shortcut: 'ctrl-u',
        statementUrl: 'https://example.com/a11y',
        feedbackEmail: 'a@b.co',
        panel: { theme: 'dark', accentColor: '#123456' },
      }),
    })
    const rt = resolveA11yRuntimeConfig(cfg, { customization: true, baseUrl: 'https://x.test' })!
    expect(rt.poweredBy).toBe(false)
    expect(rt.trigger.position).toBe('top-right')
    expect(rt.trigger.label).toBe('Hello')
    expect(rt.trigger.colors.background).toBe('#000')
    expect(rt.features).not.toContain('monochrome')
    expect(rt.features).not.toContain('readAloud')
    expect(rt.features).not.toContain('highContrast') // filter group off
    expect(rt.features).toContain('darkContrast') // forced-colour mode survives
    expect(rt.shortcut).toBe('ctrl-u')
    expect(rt.panel).toEqual({
      theme: 'dark',
      accent: '#123456',
      accentText: '#ffffff',
      headerBg: '#123456',
      headerFg: '#ffffff',
    })
  })

  it('language follows the banner, falls back to en for un-authored languages, keeps auto', () => {
    const fr = banner({ language: 'fr', accessibility: { ...DEFAULT_A11Y_CONFIG, enabled: true } })
    expect(resolveA11yRuntimeConfig(fr, { customization: false, baseUrl: 'https://x' })!.lang).toBe('fr')
    const de = banner({ language: 'de', accessibility: { ...DEFAULT_A11Y_CONFIG, enabled: true } })
    expect(resolveA11yRuntimeConfig(de, { customization: false, baseUrl: 'https://x' })!.lang).toBe('en')
    const auto = banner({ language: 'auto', accessibility: { ...DEFAULT_A11Y_CONFIG, enabled: true } })
    expect(resolveA11yRuntimeConfig(auto, { customization: false, baseUrl: 'https://x' })!.lang).toBe('auto')
  })
})

describe('hardenAccessibilityConfig', () => {
  it('leaves configs without the block untouched and drops non-object garbage', () => {
    const a = banner()
    hardenAccessibilityConfig(a)
    expect(a.accessibility).toBeUndefined()
    const b = banner({ accessibility: 'yes' as unknown as BannerConfig['accessibility'] })
    hardenAccessibilityConfig(b)
    expect(b.accessibility).toBeUndefined()
  })

  it('snaps every bad value back to a safe default', () => {
    const cfg = banner({
      accessibility: {
        enabled: 'true',
        trigger: {
          position: 'under-the-sea',
          offset: { x: -50, y: 99999 },
          size: 'huge',
          shape: 'blob',
          icon: 'skull',
          label: '<b onclick=alert(1)>Access"ibility',
          customSelector: 'a[href^="javascript:"]',
          colors: { background: 'red; position: fixed', icon: 'url(x)', border: '#abc' },
        },
        panel: { theme: 'neon', accentColor: 'expression(1)', language: 'klingon' },
        features: { monochrome: 'no', bogus: false, readAloud: false },
        shortcut: 'ctrl-alt-del',
        statementUrl: 'javascript:alert(1)',
        feedbackEmail: 'not an email',
      } as unknown as BannerConfig['accessibility'],
    })
    hardenAccessibilityConfig(cfg)
    const a = cfg.accessibility!
    expect(a.enabled).toBe(false)
    expect(a.trigger.position).toBe('bottom-left')
    expect(a.trigger.offset).toEqual({ x: 20, y: 200 })
    expect(a.trigger.size).toBe('medium')
    expect(a.trigger.shape).toBe('circle')
    expect(a.trigger.icon).toBe('universal-access')
    expect(a.trigger.label).toBe('b onclick=alert(1)Accessibility')
    expect(a.trigger.customSelector).toBe('')
    expect(a.trigger.colors).toEqual({ background: '#3b82f6', icon: '#ffffff', border: '#abc' })
    expect(a.panel.theme).toBe('auto')
    expect(a.panel.accentColor).toBe('#3b82f6')
    expect(a.panel.language).toBeUndefined()
    expect(a.features).toEqual({ readAloud: false })
    expect(a.shortcut).toBe('none')
    expect(a.statementUrl).toBe('')
    expect(a.feedbackEmail).toBe('')
  })

  it('keeps valid values and runs from hardenBannerConfig', () => {
    const cfg = banner({
      accessibility: withA11yDefaults({
        enabled: true,
        trigger: { ...DEFAULT_A11Y_CONFIG.trigger, position: 'middle-right', customSelector: '#a11y-link', label: 'Accessibility' },
        statementUrl: 'https://example.com/accessibility',
        feedbackEmail: 'access@example.com',
        panel: { theme: 'light', language: 'fr' },
      }),
    })
    hardenBannerConfig(cfg)
    expect(cfg.accessibility!.enabled).toBe(true)
    expect(cfg.accessibility!.trigger.position).toBe('middle-right')
    expect(cfg.accessibility!.trigger.customSelector).toBe('#a11y-link')
    expect(cfg.accessibility!.statementUrl).toBe('https://example.com/accessibility')
    expect(cfg.accessibility!.feedbackEmail).toBe('access@example.com')
    expect(cfg.accessibility!.panel.language).toBe('fr')
  })
})

describe('loader', () => {
  const rt = resolveA11yRuntimeConfig(
    banner({ accessibility: { ...DEFAULT_A11Y_CONFIG, enabled: true, trigger: { ...DEFAULT_A11Y_CONFIG.trigger, label: '</script><b>' } } }),
    { customization: true, baseUrl: 'https://www.cookie-banner.ca' },
  )!

  it('points at the versioned static bundle and inlines the config', () => {
    const js = generateA11yLoaderScript(rt, { baseUrl: 'https://www.cookie-banner.ca' })
    expect(js).toMatch(new RegExp(`"https://www\\.cookie-banner\\.ca/a11y/widget\\.v${A11Y_WIDGET_VERSION}\\.js\\?b=[0-9a-f]{10}"`))
    expect(js).toContain('window.__cbA11yConfig = {')
    expect(js).toContain('cb-a11y-script')
    expect(js).toContain('__cbA11yTrack')
    expect(js).not.toContain('_cbA11yTrackUrl')
    expect(a11yWidgetUrl('https://x/')).toMatch(new RegExp(`^https://x/a11y/widget\\.v${A11Y_WIDGET_VERSION}\\.js\\?b=[0-9a-f]{10}$`))
  })

  it('embeds a standalone tracker when analytics ids are provided', () => {
    const js = generateA11yLoaderScript(rt, {
      baseUrl: 'https://www.cookie-banner.ca',
      analytics: { userId: 'user-1', bannerId: 'banner-1' },
    })
    expect(js).toContain('/api/v1/track')
    expect(js).toContain('user-1')
    expect(js).toContain('banner-1')
    expect(js).toContain('sendBeacon')
  })

  it('cannot break out of an inline script or an attribute', () => {
    const js = generateA11yLoaderScript(rt, { baseUrl: 'https://x' })
    expect(js).not.toContain('</script>')
    const tag = generateA11yHeadTag(rt, { baseUrl: 'https://x' })
    expect(tag.startsWith('<script id="cb-a11y-script" src="https://x/a11y/widget.v')).toBe(true)
    // attribute is single-quoted; value must contain no raw ' or <
    const attr = /data-cb-a11y='([^']*)'/.exec(tag)![1]
    expect(attr).not.toContain('<')
    expect(attr).toContain('&lt;/script&gt;')
  })
})

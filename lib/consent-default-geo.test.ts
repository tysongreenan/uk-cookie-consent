import { describe, it, expect } from 'vitest'
import vm from 'node:vm'
import { generateConsentInitScript } from './banner-generator'
import { applyGeoRule } from './geo-rules'

// Runs the consent init block and returns the gtag('consent','default') payload.
function runDefault(config: any, gpc = false, serverGpc = false) {
  const js = generateConsentInitScript(config).replace(/<\/?script[^>]*>/gi, '')
  const window: any = { __cbServerGpc: serverGpc }
  window.dataLayer = []
  vm.runInNewContext(js, { window, dataLayer: window.dataLayer, navigator: { globalPrivacyControl: gpc } })
  const call = window.dataLayer.find((a: any) => a[0] === 'consent' && a[1] === 'default')
  return { ...call[2] }
}

describe('consent mode defaults by geo', () => {
  it('denies everything by default (Quebec / no rule)', () => {
    const d = runDefault({})
    expect(d).toMatchObject({ analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    expect(d.wait_for_update).toBe(500)
  })

  it('grants everything in an implied-consent region', () => {
    expect(runDefault({ _geoImpliedConsent: true })).toMatchObject({ analytics_storage: 'granted', ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' })
  })

  it('keeps ad signals denied under implied consent with only the Sec-GPC header', () => {
    expect(runDefault({ _geoImpliedConsent: true }, false, true)).toMatchObject({ analytics_storage: 'granted', ad_storage: 'denied' })
  })

  it('keeps ad signals denied under implied consent when GPC is on', () => {
    expect(runDefault({ _geoImpliedConsent: true }, true)).toMatchObject({ analytics_storage: 'granted', ad_storage: 'denied', ad_personalization: 'denied' })
  })
})

describe('applyGeoRule (Well.ca setup: CA implied, CA-QC strict)', () => {
  const rules: any[] = [
    { id: '1', name: 'Canada', country: 'CA', enabled: true, overrides: { requiresOptIn: false, impliedConsent: true, showRejectButton: true, dismissOnScroll: false } },
    { id: '2', name: 'Quebec', country: 'CA', region: 'QC', enabled: true, overrides: { requiresOptIn: true, showRejectButton: true, dismissOnScroll: false, language: 'fr' } },
  ]
  const served = (country: string, region: string) => {
    const c: any = { behavior: {} }
    applyGeoRule(c, rules, country, region)
    return c
  }

  it('Ontario gets implied consent', () => expect(served('CA', 'ON')._geoImpliedConsent).toBe(true))
  it('Quebec gets strict opt-in, not implied', () => {
    const c = served('CA', 'QC')
    expect(c._geoRequiresOptIn).toBe(true)
    expect(c._geoImpliedConsent).toBeUndefined()
  })
  it('Canada with unknown region stays denied', () => expect(served('CA', '')._geoImpliedConsent).toBeUndefined())
  it('outside Canada stays denied', () => expect(served('US', 'NY')._geoImpliedConsent).toBeUndefined())
})

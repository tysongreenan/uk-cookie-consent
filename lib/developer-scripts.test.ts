import { describe, expect, it } from 'vitest'
import {
  addScriptToConfig,
  GA4_INTEGRATION_ID,
  listScriptsFromConfig,
  removeScriptFromConfig,
} from './developer-scripts'

describe('developer scripts', () => {
  it('stores GA4 as a native integration on Pro', () => {
    const { config, added, alreadyPresent } = addScriptToConfig(
      { name: 'Test' },
      { template: 'google-analytics-4', measurementId: 'G-ABCDEF12' },
      'pro'
    )
    expect(alreadyPresent).toBe(false)
    expect(added.kind).toBe('ga4-integration')
    expect(
      (config.integrations as { googleAnalytics: { measurementId: string } }).googleAnalytics
        .measurementId
    ).toBe('G-ABCDEF12')
    expect(listScriptsFromConfig(config).some((s) => s.id === GA4_INTEGRATION_ID)).toBe(true)
  })

  it('stores GA4 as a consent-gated script on Free', () => {
    const { config, added } = addScriptToConfig(
      { name: 'Test' },
      { template: 'google-analytics-4', measurementId: 'G-ABCDEF12' },
      'free'
    )
    expect(added.kind).toBe('script')
    expect(
      (config.scripts as { trackingPerformance: { scriptCode: string }[] }).trackingPerformance[0]
        .scriptCode
    ).toContain('G-ABCDEF12')
  })

  it('does not duplicate the same vendor id', () => {
    const first = addScriptToConfig(
      { name: 'Test' },
      { template: 'google-tag-manager', containerId: 'GTM-AAAA111' },
      'pro'
    )
    const second = addScriptToConfig(
      first.config,
      { template: 'google-tag-manager', containerId: 'GTM-AAAA111' },
      'pro'
    )
    expect(second.alreadyPresent).toBe(true)
    expect(
      (second.config.scripts as { trackingPerformance: unknown[] }).trackingPerformance
    ).toHaveLength(1)
  })

  it('removes a script and the GA4 integration', () => {
    const withGtm = addScriptToConfig(
      { name: 'Test' },
      { template: 'google-tag-manager', containerId: 'GTM-AAAA111' },
      'pro'
    )
    const withBoth = addScriptToConfig(
      withGtm.config,
      { template: 'google-analytics-4', measurementId: 'G-ABCDEF12' },
      'pro'
    )
    const withoutGa = removeScriptFromConfig(withBoth.config, GA4_INTEGRATION_ID)
    expect(withoutGa.removed).toBe(true)
    expect(listScriptsFromConfig(withoutGa.config).some((s) => s.kind === 'ga4-integration')).toBe(
      false
    )

    const withoutGtm = removeScriptFromConfig(withoutGa.config, withGtm.added.id)
    expect(withoutGtm.removed).toBe(true)
    expect(listScriptsFromConfig(withoutGtm.config)).toHaveLength(0)
  })
})

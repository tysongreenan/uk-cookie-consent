import type { GeoRule } from '@/types'

/** Applies the visitor's matching geo rule to the served config (mutates config). */
export function applyGeoRule(config: any, geoRules: GeoRule[], visitorCountry: string, visitorRegion: string) {
  // Try specific match (country + region) first, then fall back to country-only match
  const matchedGeoRule = geoRules.find((rule: any) => {
    if (!rule.enabled) return false
    return rule.country === visitorCountry && rule.region && rule.region === visitorRegion
  }) || geoRules.find((rule: any) => {
    if (!rule.enabled) return false
    return rule.country === visitorCountry && !rule.region
  })

  if (matchedGeoRule) {
    const overrides = matchedGeoRule.overrides
    if (overrides.showRejectButton !== undefined) {
      config.behavior.showRejectButton = overrides.showRejectButton
    }
    if (overrides.dismissOnScroll !== undefined) {
      config.behavior.dismissOnScroll = overrides.dismissOnScroll
    }
    if (overrides.language) {
      config.language = overrides.language
    }
    if (overrides.requiresOptIn) {
      // Strict opt-in: force reject button, disable scroll dismiss, hide close button
      config.behavior.showRejectButton = true
      config.behavior.dismissOnScroll = false
      config._geoRequiresOptIn = true
    } else if (overrides.impliedConsent && visitorRegion) {
      // Region required: an unresolved region (VPN/mobile ranges) could be Quebec, so stay denied
      config._geoImpliedConsent = true
    }
  }
}

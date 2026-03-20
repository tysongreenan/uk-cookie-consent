import { PlanTier, PlanFeatures } from '@/types'

export const PLAN_FEATURES: Record<PlanTier, PlanFeatures> = {
  free: {
    tier: 'free',
    maxWebsites: 'unlimited',
    maxBanners: 1,
    hasInternalAnalytics: false,
    hasGA4Integration: false,
    hasTeamCollaboration: false,
    hasCustomLayouts: false,
    hasImageUpload: false,
    hasBrandingRemoval: false,
    hasBenchmarkInsights: false,
    hasGeoTargeting: false,
    maxTeamMembers: 1,
    supportLevel: 'community'
  },
  pro: {
    tier: 'pro',
    maxWebsites: 'unlimited',
    maxBanners: 'unlimited',
    hasInternalAnalytics: true,
    hasGA4Integration: true,
    hasTeamCollaboration: true,
    hasCustomLayouts: true,
    hasImageUpload: true,
    hasBrandingRemoval: true,
    hasBenchmarkInsights: true,
    hasGeoTargeting: true,
    maxTeamMembers: 'unlimited',
    supportLevel: 'priority'
  },
  enterprise: {
    tier: 'enterprise',
    maxWebsites: 'unlimited',
    maxBanners: 'unlimited',
    hasInternalAnalytics: true,
    hasGA4Integration: true,
    hasTeamCollaboration: true,
    hasCustomLayouts: true,
    hasImageUpload: true,
    hasBrandingRemoval: true,
    hasBenchmarkInsights: true,
    hasGeoTargeting: true,
    maxTeamMembers: 'unlimited',
    supportLevel: 'dedicated'
  }
}

export function canAccessFeature(userTier: PlanTier, feature: keyof PlanFeatures): boolean {
  const features = PLAN_FEATURES[userTier]

  switch (feature) {
    case 'hasInternalAnalytics':
      return features.hasInternalAnalytics
    case 'hasTeamCollaboration':
      return features.hasTeamCollaboration
    case 'hasCustomLayouts':
      return features.hasCustomLayouts
    case 'hasImageUpload':
      return features.hasImageUpload
    case 'hasGA4Integration':
      return features.hasGA4Integration
    case 'hasBrandingRemoval':
      return features.hasBrandingRemoval
    case 'hasBenchmarkInsights':
      return features.hasBenchmarkInsights
    case 'hasGeoTargeting':
      return features.hasGeoTargeting
    case 'maxWebsites':
      return features.maxWebsites === 'unlimited' || features.maxWebsites > 0
    case 'maxBanners':
      return features.maxBanners === 'unlimited' || features.maxBanners > 0
    case 'maxTeamMembers':
      return features.maxTeamMembers === 'unlimited' || features.maxTeamMembers > 1
    default:
      return false
  }
}

export function canCreateBanner(userTier: PlanTier, currentBannerCount: number): boolean {
  const features = PLAN_FEATURES[userTier]
  if (features.maxBanners === 'unlimited') return true
  return currentBannerCount < features.maxBanners
}

export function getBannerLimit(userTier: PlanTier): number | 'unlimited' {
  return PLAN_FEATURES[userTier].maxBanners
}

export function getUpgradeMessage(feature: string): string {
  return `Upgrade to Pro for $99 (one-time) to unlock ${feature}`
}

// Free positions: top/bottom bars + floating variants
const FREE_POSITIONS = new Set([
  'top', 'bottom',
  'floating', 'floating-bottom-right', 'floating-bottom-left',
  'floating-top-right', 'floating-top-left'
])

// Pro-only positions: modals + slide-ins
const PRO_POSITIONS = new Set([
  'modal-center', 'modal-bottom', 'modal-top',
  'slide-in-right', 'slide-in-left', 'slide-in-top', 'slide-in-bottom'
])

export function getStandardLayouts(): string[] {
  return Array.from(FREE_POSITIONS)
}

export function getProLayouts(): string[] {
  return [...Array.from(FREE_POSITIONS), ...Array.from(PRO_POSITIONS)]
}

export function canUseLayout(userTier: PlanTier, position: string): boolean {
  if (FREE_POSITIONS.has(position)) return true
  if (PRO_POSITIONS.has(position)) return userTier !== 'free'
  // Allow unknown positions (don't block users on new positions)
  return true
}

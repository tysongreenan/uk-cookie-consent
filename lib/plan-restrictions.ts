import { PlanTier, PlanFeatures } from '@/types'

// ── Feature matrix per plan tier ────────────────────────────────────

const PRO_FEATURES_BASE: Omit<PlanFeatures, 'tier' | 'includesNewFeatures' | 'supportLevel'> = {
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
  hasGpcConfig: true,
  hasGpcAnalytics: true,
  hasDataAccessRequests: true,
  hasConsentLogs: true,
  hasPrivacyPolicyGenerator: true,
  hasPrivacyPolicyVersioning: false,
  hasTcfSupport: true,
  maxTeamMembers: 'unlimited',
}

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
    hasGpcConfig: false,
    hasGpcAnalytics: false,
    hasDataAccessRequests: false,
    hasConsentLogs: false,
    hasPrivacyPolicyGenerator: false,
    hasPrivacyPolicyVersioning: false,
    hasTcfSupport: false,
    includesNewFeatures: false,
    maxTeamMembers: 1,
    supportLevel: 'community'
  },
  // Legacy: maps to pro_lifetime for backward compat
  pro: {
    tier: 'pro',
    ...PRO_FEATURES_BASE,
    includesNewFeatures: false,
    supportLevel: 'priority'
  },
  pro_lifetime: {
    tier: 'pro_lifetime',
    ...PRO_FEATURES_BASE,
    includesNewFeatures: false,
    supportLevel: 'priority'
  },
  pro_annual: {
    tier: 'pro_annual',
    ...PRO_FEATURES_BASE,
    hasPrivacyPolicyVersioning: true,
    includesNewFeatures: true,
    supportLevel: 'priority_plus'
  },
  enterprise: {
    tier: 'enterprise',
    ...PRO_FEATURES_BASE,
    hasPrivacyPolicyVersioning: true,
    includesNewFeatures: true,
    supportLevel: 'dedicated'
  }
}

// ── Tier helpers ────────────────────────────────────────────────────

/** Returns true for any Pro-level tier (lifetime, annual, or legacy 'pro') */
export function isProTier(tier: PlanTier): boolean {
  return tier === 'pro' || tier === 'pro_lifetime' || tier === 'pro_annual' || tier === 'enterprise'
}

/** Returns true if the tier is a paid tier (not free) */
export function isPaidTier(tier: PlanTier): boolean {
  return tier !== 'free'
}

// ── Feature access ──────────────────────────────────────────────────

export function canAccessFeature(userTier: PlanTier, feature: keyof PlanFeatures): boolean {
  const features = PLAN_FEATURES[userTier] || PLAN_FEATURES.free

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
    case 'hasGpcConfig':
      return features.hasGpcConfig
    case 'hasGpcAnalytics':
      return features.hasGpcAnalytics
    case 'hasDataAccessRequests':
      return features.hasDataAccessRequests
    case 'hasConsentLogs':
      return features.hasConsentLogs
    case 'hasPrivacyPolicyGenerator':
      return features.hasPrivacyPolicyGenerator
    case 'hasPrivacyPolicyVersioning':
      return features.hasPrivacyPolicyVersioning
    case 'hasTcfSupport':
      return features.hasTcfSupport
    case 'includesNewFeatures':
      return features.includesNewFeatures
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

// ── Feature freeze for lifetime users ───────────────────────────────

/** Date the dual pricing model went live. Features released after this
 *  are only available to pro_annual / enterprise users. */
export const FEATURE_CUTOFF_DATE = new Date('2026-04-01')

/** Registry of features with their release dates.
 *  All existing features pre-date the cutoff so they're available to everyone.
 *  Add new features here as they ship. */
export const FEATURE_RELEASE_DATES: Record<string, Date> = {
  'hasConsentLogs': new Date('2026-04-15'),
}

/** Check feature access considering the lifetime freeze date.
 *  - free: standard feature check
 *  - pro_annual / enterprise: full access to everything
 *  - pro_lifetime / pro: access only to features released before their freeze date */
export function canAccessFeatureWithFreeze(
  userTier: PlanTier,
  feature: keyof PlanFeatures,
  featureFreezeDate?: Date | string | null
): boolean {
  // Annual and enterprise always get everything
  if (userTier === 'pro_annual' || userTier === 'enterprise') {
    return canAccessFeature(userTier, feature)
  }

  // Lifetime users: check if feature was released after their freeze date
  if (userTier === 'pro_lifetime' || userTier === 'pro') {
    const releaseDate = FEATURE_RELEASE_DATES[feature]
    if (releaseDate) {
      const freeze = featureFreezeDate
        ? new Date(featureFreezeDate)
        : FEATURE_CUTOFF_DATE
      if (releaseDate > freeze) {
        return false // Feature released after their freeze
      }
    }
    return canAccessFeature(userTier, feature)
  }

  // Free users: standard check
  return canAccessFeature(userTier, feature)
}

// ── Banner limits ───────────────────────────────────────────────────

export function canCreateBanner(userTier: PlanTier, currentBannerCount: number): boolean {
  const features = PLAN_FEATURES[userTier] || PLAN_FEATURES.free
  if (features.maxBanners === 'unlimited') return true
  return currentBannerCount < features.maxBanners
}

export function getBannerLimit(userTier: PlanTier): number | 'unlimited' {
  return (PLAN_FEATURES[userTier] || PLAN_FEATURES.free).maxBanners
}

// ── Upgrade messaging ───────────────────────────────────────────────

export function getUpgradeMessage(feature: string): string {
  return `Upgrade to Pro to unlock ${feature}`
}

// ── Layout positions ────────────────────────────────────────────────

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
  if (PRO_POSITIONS.has(position)) return isProTier(userTier)
  // Allow unknown positions (don't block users on new positions)
  return true
}

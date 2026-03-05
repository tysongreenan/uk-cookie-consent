import { PlanTier, PlanFeatures } from '@/types'

export const PLAN_FEATURES: Record<PlanTier, PlanFeatures> = {
  free: {
    tier: 'free',
    maxWebsites: 'unlimited',
    hasInternalAnalytics: false,
    hasTeamCollaboration: false,
    hasCustomLayouts: false,
    hasImageUpload: false,
    maxTeamMembers: 1,
    supportLevel: 'community'
  },
  pro: {
    tier: 'pro',
    maxWebsites: 'unlimited',
    hasInternalAnalytics: true,
    hasTeamCollaboration: true,
    hasCustomLayouts: true,
    hasImageUpload: true,
    maxTeamMembers: 'unlimited',
    supportLevel: 'priority'
  },
  enterprise: {
    tier: 'enterprise',
    maxWebsites: 'unlimited',
    hasInternalAnalytics: true,
    hasTeamCollaboration: true,
    hasCustomLayouts: true,
    hasImageUpload: true,
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
    case 'maxWebsites':
      return features.maxWebsites === 'unlimited' || features.maxWebsites > 0
    case 'maxTeamMembers':
      return features.maxTeamMembers === 'unlimited' || features.maxTeamMembers > 1
    default:
      return false
  }
}

export function getUpgradeMessage(feature: string): string {
  return `Upgrade to Pro for $48.99 (one-time) to unlock ${feature}`
}

export function getStandardLayouts(): string[] {
  return ['bottom', 'top', 'center', 'side']
}

export function getProLayouts(): string[] {
  return [
    'bottom', 'top', 'center', 'side',
    'modal', 'slide-in', 'minimalist', 'full-screen',
    'floating', 'corner', 'inline'
  ]
}

export function canUseLayout(userTier: PlanTier, layout: string): boolean {
  if (userTier === 'free') {
    return getStandardLayouts().includes(layout)
  }
  return getProLayouts().includes(layout)
}

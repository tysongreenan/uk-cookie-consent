import { ComplianceFramework, ComplianceRequirements } from '@/types'

export const COMPLIANCE_FRAMEWORKS: Record<ComplianceFramework, ComplianceRequirements> = {
  pipeda: {
    framework: 'pipeda',
    requiresExplicitConsent: false, // PIPEDA allows implied consent in some cases
    requiresOptIn: false, // PIPEDA allows opt-out mechanisms
    requiresGranularConsent: false, // PIPEDA is less strict about granular controls
    requiresPrivacyPolicy: true,
    requiresDataRetentionPolicy: false, // PIPEDA doesn't explicitly require retention policies
    maxPenalty: 'Reputation damage and Privacy Commissioner findings',
    consentExpiry: 24, // 24 months for PIPEDA
  },
  gdpr: {
    framework: 'gdpr',
    requiresExplicitConsent: true, // GDPR requires explicit consent
    requiresOptIn: true, // GDPR requires opt-in (no pre-ticked boxes)
    requiresGranularConsent: true, // GDPR requires granular consent controls
    requiresPrivacyPolicy: true,
    requiresDataRetentionPolicy: true, // GDPR requires data retention policies
    maxPenalty: '€20 million or 4% of annual revenue',
    consentExpiry: 12, // 12 months for GDPR
  },
  ccpa: {
    framework: 'ccpa',
    requiresExplicitConsent: false, // CCPA allows opt-out
    requiresOptIn: false, // CCPA is opt-out based
    requiresGranularConsent: true, // CCPA requires granular controls
    requiresPrivacyPolicy: true,
    requiresDataRetentionPolicy: false,
    maxPenalty: '$7,500 per violation',
    consentExpiry: 12, // 12 months for CCPA
  },
  custom: {
    framework: 'custom',
    requiresExplicitConsent: true,
    requiresOptIn: true,
    requiresGranularConsent: true,
    requiresPrivacyPolicy: true,
    requiresDataRetentionPolicy: true,
    maxPenalty: 'Varies by jurisdiction',
    consentExpiry: 12,
  }
}

export const COMPLIANCE_DESCRIPTIONS: Record<ComplianceFramework, string> = {
  pipeda: 'PIPEDA (Personal Information Protection and Electronic Documents Act) is Canada\'s federal privacy law. It\'s less strict than GDPR and allows for implied consent in many cases.',
  gdpr: 'GDPR (General Data Protection Regulation) is the EU\'s strict privacy law. It requires explicit opt-in consent and granular controls for all data processing.',
  ccpa: 'CCPA (California Consumer Privacy Act) applies to California residents. It\'s opt-out based and requires clear disclosure of data practices.',
  custom: 'Custom compliance framework for specific regional requirements or multi-jurisdictional compliance needs.'
}

export const COMPLIANCE_FEATURES: Record<ComplianceFramework, string[]> = {
  pipeda: [
    'Implied consent allowed',
    'Opt-out mechanisms accepted',
    'Less granular controls required',
    '24-month consent expiry',
    'Privacy Commissioner enforcement',
    'Focus on reasonable expectations'
  ],
  gdpr: [
    'Explicit consent required',
    'Opt-in only (no pre-ticked boxes)',
    'Granular consent controls',
    '12-month consent expiry',
    '€20M maximum fines',
    'Data retention policies required'
  ],
  ccpa: [
    'Opt-out based consent',
    'Right to know about data collection',
    'Right to delete personal information',
    'Right to opt-out of sale',
    'Non-discrimination protection',
    '$7,500 per violation'
  ],
  custom: [
    'Fully customizable requirements',
    'Flexible consent mechanisms',
    'Custom legal text',
    'Regional compliance support',
    'Multi-jurisdictional options'
  ]
}

export function getComplianceRequirements(framework: ComplianceFramework): ComplianceRequirements {
  return COMPLIANCE_FRAMEWORKS[framework]
}

export function getFrameworkDescription(framework: ComplianceFramework): string {
  return COMPLIANCE_DESCRIPTIONS[framework]
}

export function getFrameworkFeatures(framework: ComplianceFramework): string[] {
  return COMPLIANCE_FEATURES[framework]
}

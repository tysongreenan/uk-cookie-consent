export type ComplianceFramework = 'pipeda' | 'gdpr' | 'ccpa' | 'custom'

// Geo-targeting rules for region-specific consent behavior
export interface GeoRule {
  id: string
  name: string // e.g., "Quebec - Law 25"
  country: string // ISO 3166-1 alpha-2, e.g., "CA"
  region?: string // ISO 3166-2 region code, e.g., "QC"
  enabled: boolean
  overrides: {
    requiresOptIn: boolean // true = strict opt-in, no implied consent
    showRejectButton: boolean // force showing reject button
    dismissOnScroll: boolean // override scroll dismiss behavior
    language?: 'en' | 'fr' | 'auto' // override language
  }
}

// Button layout presets for cookie banners
export type ButtonLayout = 'standard' | 'soft-consent' | 'accept-only'

export interface ComplianceRequirements {
  framework: ComplianceFramework
  requiresExplicitConsent: boolean // GDPR: true, PIPEDA: false (can use implied consent)
  requiresOptIn: boolean // GDPR: true (opt-in), PIPEDA: false (can use opt-out)
  requiresGranularConsent: boolean // GDPR: true, PIPEDA: false
  requiresPrivacyPolicy: boolean // Both: true
  requiresDataRetentionPolicy: boolean // GDPR: true, PIPEDA: false
  maxPenalty: string // GDPR: €20M, PIPEDA: Reputation damage
  consentExpiry: number // GDPR: 12 months, PIPEDA: 24 months
}

export interface BannerConfig {
  // Version tracking
  version?: string
  lastUpdated?: string
  
  // Compliance
  compliance: ComplianceRequirements
  
  // Basic settings
  name: string
  position: 'top' | 'bottom' | 'floating-bottom-right' | 'floating-bottom-left' | 'floating-top-right' | 'floating-top-left' | 'modal-center' | 'modal-bottom' | 'modal-top' | 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom'
  theme: 'light' | 'dark' | 'custom'
  
  // Colors
  colors: {
    background: string
    text: string
    button: string
    buttonText: string
    link: string
    rejectButton?: string
    rejectButtonText?: string
  }

  // Typography
  fontFamily?: string
  
  // Language
  language: 'en' | 'fr' | 'auto'
  
  // Text content
  text: {
    title: string
    message: string
    acceptButton: string
    rejectButton: string
    preferencesButton: string
  }
  
  // Behavior
  behavior: {
    autoShow: boolean
    dismissOnScroll: boolean
    showPreferences: boolean
    cookieExpiry: number // days
    // Button layout controls
    buttonLayout?: ButtonLayout // 'standard' | 'soft-consent' | 'accept-only'
    showRejectButton?: boolean // Granular control - defaults to true for backward compatibility
    gpc?: { enabled: boolean; mode: 'auto' | 'off' }
  }
  
  // Branding
  branding: {
    logo: {
      enabled: boolean
      url: string
      position: 'left' | 'right' | 'center' | 'hidden'
      maxWidth: number
      maxHeight: number
    }
    privacyPolicy: {
      url: string
      text: string
      openInNewTab: boolean
      required: boolean
    }
    footerLink: {
      enabled: boolean
      text: string
      position: 'floating' | 'inline'
      floatingPosition?: 'bottom-left' | 'bottom-right'
      style?: 'floating' | 'inline' | 'both'
      floatingStyle?: {
        shape: 'circle' | 'pill' | 'square'
        size: 'small' | 'medium' | 'large'
        showText: boolean
        useCustomColors: boolean
        customColors?: {
          background?: string
          text?: string
          border?: string
        }
      }
      inlineStyle?: {
        linkType: 'plain' | 'button' | 'icon-text' | 'custom'
        includeIcon: boolean
        includeLogo: boolean
        customClass?: string
      }
      icons?: {
        accepted?: string
        rejected?: string
      }
    }
    showPoweredBy?: boolean
  }

  // Layout
  layout: {
    width: 'full' | 'container' | 'custom'
    customWidth?: number
    maxWidth?: number
    borderRadius: number
    padding: number
    margin: number
    shadow: 'none' | 'small' | 'medium' | 'large'
    animation: 'none' | 'fade' | 'slide' | 'bounce' | 'pulse'
  }
  
  // Scripts
  scripts: {
    strictlyNecessary: TrackingScript[]
    functionality: TrackingScript[]
    trackingPerformance: TrackingScript[]
    targetingAdvertising: TrackingScript[]
  }
  
  // Advanced
  advanced: {
    googleConsentMode: boolean
    customCSS: string
    customJS: string
    performance?: {
      deferNonCriticalScripts?: boolean
      useRequestIdleCallback?: boolean
      lazyLoadAnalytics?: boolean
      inlineCriticalCSS?: boolean
    }
  }
  
  // Geo-targeting
  geoRules?: GeoRule[]

  // Integrations
  integrations?: {
    googleAnalytics?: {
      enabled: boolean
      measurementId: string // e.g., "G-XXXXXXXXXX"
      trackConsentEvents: boolean // Track accept/reject/dismiss as GA events
      trackImpressions: boolean // Track banner impressions as GA events
      anonymizeIp: boolean
    }
  }
}

// Internal config type used at serving time — includes runtime overrides not persisted to DB
export interface BannerConfigWithGeoOverrides extends BannerConfig {
  _geoRequiresOptIn?: boolean
}

export interface TrackingScript {
  id: string
  name: string
  category: 'strictly-necessary' | 'functionality' | 'tracking-performance' | 'targeting-advertising'
  scriptCode: string
  bodyCode?: string // Optional body code (e.g., for GTM noscript)
  enabled: boolean
}

export interface Project {
  id: string
  name: string
  domain?: string
  description?: string
  userId: string
  createdAt: Date
  updatedAt: Date
  consentBanners: ConsentBanner[]
  trackingScripts: TrackingScript[]
}

export interface ConsentBanner {
  id: string
  name: string
  config: BannerConfig
  code: string
  isActive: boolean
  projectId: string
  createdAt: Date
  updatedAt: Date
}

export type UserType = 'business' | 'consumer' | 'both'
export type ConsumerTier = 'free' | 'premium'

export interface User {
  id: string
  name?: string
  email: string
  emailVerified?: Date
  image?: string
  userType?: UserType
  consumerTier?: ConsumerTier
  // Product access flags — one account, multiple products
  hasConsentBanner?: boolean
  hasPrivacyConsumer?: boolean
  hasCommentTool?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BannerAnalytics {
  id: string
  bannerId: string
  projectId: string
  event: 'view' | 'accept' | 'reject' | 'preferences'
  userAgent?: string
  ipAddress?: string
  country?: string
  createdAt: Date
}

export interface UserLogo {
  id: string
  userId: string
  filename: string
  url: string
  size: number
  mimeType: string
  createdAt: Date
}

export interface BrandColorCandidate {
  hex: string
  score: number
  sources: string[]
  luminance: number
  contrastOnWhite: number
  contrastOnBlack: number
  recommendedUsage: Array<'background' | 'text' | 'button' | 'buttonText' | 'link'>
  suggestedTextColor: string
}

export interface BrandColorSuggestions {
  colors: BrandColorCandidate[]
  suggestions: {
    background: string
    text: string
    button: string
    buttonText: string
    link: string
  }
  warnings: string[]
  colorsDiscovered: boolean
}

export interface BrandLogoSuggestion {
  url: string
  source: string
}

export interface BrandFontCandidate {
  family: string
  source: string
  weight: number
  url?: string
}

export interface BrandDiscoveryResult {
  url: string
  colors: BrandColorCandidate[]
  suggestions: {
    background: string
    text: string
    button: string
    buttonText: string
    link: string
  }
  warnings: string[]
  colorsDiscovered: boolean
  logo?: BrandLogoSuggestion
  fonts?: BrandFontCandidate[]
  fetchedAt: string
}

// Form types
export interface CreateProjectForm {
  name: string
  domain?: string
  description?: string
}

export interface CreateBannerForm {
  name: string
  config: BannerConfig
}

export interface CreateScriptForm {
  name: string
  scriptCode: string
  category: TrackingScript['category']
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Team Management Types
export type TeamRole = 'owner' | 'admin' | 'editor' | 'viewer'
export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'revoked'
export type TeamPermission = 'view' | 'edit' | 'delete' | 'admin' | 'owner'

export interface Team {
  id: string
  name: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
  members?: TeamMember[]
  invitations?: TeamInvitation[]
}

export interface TeamMember {
  id: string
  teamId: string
  userId: string
  role: TeamRole
  invitedBy?: string
  joinedAt: Date
  createdAt: Date
  updatedAt: Date
  user?: User
  inviter?: User
}

export interface TeamInvitation {
  id: string
  teamId: string
  email: string
  role: Exclude<TeamRole, 'owner'> // Cannot invite as owner
  token: string
  invitedBy: string
  expiresAt: Date
  acceptedAt?: Date
  status: InvitationStatus
  createdAt: Date
  team?: Team
  inviter?: User
}

// Team Management Form Types
export interface CreateTeamForm {
  name: string
}

export interface UpdateTeamForm {
  name?: string
}

export interface InviteMemberForm {
  email: string
  role: Exclude<TeamRole, 'owner'>
  sendEmail?: boolean
}

export interface UpdateMemberRoleForm {
  role: TeamRole
}

// Team Permission Matrix
export const TEAM_PERMISSIONS: Record<TeamRole, TeamPermission[]> = {
  owner: ['view', 'edit', 'delete', 'admin', 'owner'],
  admin: ['view', 'edit', 'delete', 'admin'],
  editor: ['view', 'edit'],
  viewer: ['view']
}

// Helper function to check team permissions
export function hasTeamPermission(
  userRole: TeamRole,
  requiredPermission: TeamPermission
): boolean {
  return TEAM_PERMISSIONS[userRole].includes(requiredPermission)
}

// Plan Management Types
export type PlanTier = 'free' | 'pro' | 'pro_lifetime' | 'pro_annual' | 'enterprise'
export type BillingCycle = 'one_time' | 'annual' | null
export type SubscriptionStatus = 'active' | 'past_due' | 'canceled' | null

export interface PlanFeatures {
  tier: PlanTier
  maxWebsites: number | 'unlimited'
  maxBanners: number | 'unlimited'
  hasInternalAnalytics: boolean
  hasGA4Integration: boolean
  hasTeamCollaboration: boolean
  hasCustomLayouts: boolean
  hasImageUpload: boolean
  hasBrandingRemoval: boolean
  hasBenchmarkInsights: boolean
  hasGeoTargeting: boolean
  hasGpcConfig: boolean
  hasGpcAnalytics: boolean
  hasDataAccessRequests: boolean
  hasConsentLogs: boolean
  hasPrivacyPolicyGenerator: boolean
  hasPrivacyPolicyVersioning: boolean
  includesNewFeatures: boolean
  maxTeamMembers: number | 'unlimited'
  supportLevel: 'community' | 'priority' | 'priority_plus' | 'dedicated'
}

// Consumer Platform Types
export type ConsentAction = 'auto_accept' | 'auto_reject' | 'auto_custom' | 'manual' | 'skipped'

export interface ConsumerPreferences {
  strictlyNecessary: 'accept'
  functionality: 'accept' | 'reject'
  analytics: 'accept' | 'reject'
  marketing: 'accept' | 'reject'
}

export interface ConsumerPreferencesRow {
  id: string
  user_id: string
  preferences: ConsumerPreferences
  default_action: 'accept_all' | 'reject_all' | 'accept_essential' | 'custom'
  auto_apply: boolean
  show_notification: boolean
  created_at: string
  updated_at: string
}

export interface ConsumerConsentLogEntry {
  id: number
  user_id: string
  domain: string
  action: ConsentAction
  categories_applied: Record<string, boolean> | null
  extension_version: string | null
  created_at: string
}

export interface ConsumerDailyStats {
  id: string
  user_id: string
  date: string
  sites_visited: number
  banners_handled: number
  auto_accepts: number
  auto_rejects: number
  auto_custom: number
  manual_overrides: number
  time_saved_ms: number
  created_at: string
  updated_at: string
}

export interface ConsumerApiKey {
  id: string
  user_id: string
  name: string
  prefix: string
  last_used_at: string | null
  expires_at: string | null
  revoked_at: string | null
  created_at: string
}

export interface ConsumerPlanFeatures {
  tier: ConsumerTier
  maxBannersPerDay: number | 'unlimited'
  historyRetentionDays: number
  maxDomainAnalytics: number | 'unlimited'
  hasExport: boolean
  hasMultipleProfiles: boolean
}

export const CONSUMER_PLAN_FEATURES: Record<ConsumerTier, ConsumerPlanFeatures> = {
  free: {
    tier: 'free',
    maxBannersPerDay: 50,
    historyRetentionDays: 7,
    maxDomainAnalytics: 10,
    hasExport: false,
    hasMultipleProfiles: false,
  },
  premium: {
    tier: 'premium',
    maxBannersPerDay: 'unlimited',
    historyRetentionDays: 90,
    maxDomainAnalytics: 'unlimited',
    hasExport: true,
    hasMultipleProfiles: true,
  },
}

// ── Data Subject Access Request (DSAR) Types ─────────────────────────

export type DSARIdentifierType = 'email' | 'ip' | 'name'

export type DSARStatus =
  | 'pending'
  | 'identity_verified'
  | 'processing'
  | 'completed'
  | 'partially_refused'
  | 'refused'
  | 'failed'

export type DSARReportFormat = 'json' | 'csv' | 'pdf'

export type DSARVerificationMethod = 'government_id' | 'email_confirmation' | 'in_person' | 'other'

export interface DataAccessRequest {
  id: string
  organizationUserId: string
  teamId: string | null
  subjectIdentifierType: DSARIdentifierType
  subjectIdentifierValue: string
  subjectEmail: string | null
  status: DSARStatus
  reportFormat: DSARReportFormat
  reportStoragePath: string | null
  identityVerified: boolean
  verificationMethod: DSARVerificationMethod | null
  verificationNotes: string | null
  verifiedAt: string | null
  verifiedBy: string | null
  refusedSections: Array<{ section: string; reason: string }>
  refusalReason: string | null
  requestedAt: string
  orgTimezone: string
  deadlineAt: string
  completedAt: string | null
  deletedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface DSARReportSection {
  name: string
  description: string
  data: Record<string, unknown>[]
  refused: boolean
  refusalReason?: string
}

export interface DSARReport {
  generatedAt: string
  requestId: string
  subjectIdentifier: { type: DSARIdentifierType; value: string }
  organization: { name: string; teamId: string }
  sections: DSARReportSection[]
  language: 'en' | 'fr'
  metadata: {
    dataSourcesQueried: string[]
    recordsFound: number
    generationDurationMs: number
  }
}

// ── Privacy Policy Generator Types ───────────────────────────────────

export interface PrivacyPolicyInputs {
  businessName: string
  businessType: 'website' | 'saas' | 'ecommerce' | 'mobile_app' | 'other'
  websiteUrl: string
  contactEmail: string
  country: string
  province?: string
  dataCollected: string[]
  collectionMethods: string[]
  cookieCategories: string[]
  thirdPartyServices: string[]
  dataPurposes: string[]
  sharesDataWithThirdParties: boolean
  thirdPartyRecipients?: string[]
  transfersDataInternationally: boolean
  dataRetentionPeriod: string
  customRetentionPeriod?: string
  allowsUserDeletion: boolean
  allowsUserExport: boolean
  jurisdictions: string[]
  language: 'en' | 'fr'
  collectsChildrenData: boolean
  minimumAge?: number
}

export interface PolicySection {
  id: string
  heading: string
  subheading?: string
  content: string
  faqQuestion?: string
  faqAnswer?: string
  applicableJurisdictions: string[]
}

export interface PolicyOutput {
  sections: PolicySection[]
  contentHtml: string
  contentJson: { sections: PolicySection[] }
  metadata: {
    generatedAt: string
    jurisdictions: string[]
    language: string
    businessName: string
  }
}

/** Valid DSAR status transitions — maps current status to allowed next statuses */
export const DSAR_STATUS_TRANSITIONS: Record<DSARStatus, DSARStatus[]> = {
  pending: ['identity_verified', 'refused'],
  identity_verified: ['processing'],
  processing: ['completed', 'partially_refused', 'failed'],
  completed: [],
  partially_refused: [],
  refused: [],
  failed: ['identity_verified'], // Allow retry after transient generation failures
}

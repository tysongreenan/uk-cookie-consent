export type ComplianceFramework = 'pipeda' | 'gdpr' | 'ccpa' | 'custom'

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
  }
  
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
    }
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

export interface TrackingScript {
  id: string
  name: string
  category: 'strictly-necessary' | 'functionality' | 'tracking-performance' | 'targeting-advertising'
  scriptCode: string
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

export interface User {
  id: string
  name?: string
  email: string
  emailVerified?: Date
  image?: string
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

export interface BannerConfig {
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

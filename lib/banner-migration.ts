import { BannerConfig } from '@/types'

// Current version of banner configurations
export const CURRENT_BANNER_VERSION = '2.0.0'

/**
 * Migrates a banner configuration to the latest version
 * This ensures backward compatibility and adds new features to existing banners
 */
export function migrateBannerConfig(config: any): BannerConfig {
  // Handle null, undefined, or invalid configs
  if (!config || typeof config !== 'object') {
    // Return a default config for invalid inputs
    return {
      version: CURRENT_BANNER_VERSION,
      lastUpdated: new Date().toISOString(),
      name: 'My Cookie Banner',
      position: 'bottom',
      theme: 'dark',
      language: 'auto',
      colors: {
        background: '#1f2937',
        text: '#ffffff',
        button: '#3b82f6',
        buttonText: '#ffffff',
        link: '#60a5fa'
      },
      text: {
        title: 'We use cookies',
        message: 'This website uses cookies to enhance your browsing experience.',
        acceptButton: 'Accept All',
        rejectButton: 'Reject',
        preferencesButton: 'Preferences'
      },
      behavior: {
        autoShow: true,
        dismissOnScroll: false,
        showPreferences: true,
        cookieExpiry: 30
      },
      branding: {
        logo: { enabled: false, url: '', position: 'left', maxWidth: 120, maxHeight: 40 },
        privacyPolicy: { url: '', text: 'Privacy Policy', openInNewTab: true, required: false },
        footerLink: { enabled: true, text: 'Cookie Settings', position: 'floating', floatingPosition: 'bottom-left' }
      },
      layout: {
        width: 'full', customWidth: 400, maxWidth: 1200, borderRadius: 8,
        padding: 20, margin: 20, shadow: 'medium', animation: 'fade'
      },
      scripts: {
        strictlyNecessary: [],
        functionality: [],
        trackingPerformance: [],
        targetingAdvertising: []
      },
      advanced: {
        googleConsentMode: true,
        customCSS: '',
        customJS: '',
        performance: {
          deferNonCriticalScripts: true,
          useRequestIdleCallback: true,
          lazyLoadAnalytics: true,
          inlineCriticalCSS: true
        }
      }
    }
  }

  let migratedConfig = { ...config }

  // Add version tracking if missing
  if (!migratedConfig.version) {
    migratedConfig.version = '1.0.0'
  }

  // Migration from v1.0.0 to v2.0.0
  if (migratedConfig.version === '1.0.0') {
    migratedConfig = migrateToV2(migratedConfig)
  }

  // Add current version and timestamp
  migratedConfig.version = CURRENT_BANNER_VERSION
  migratedConfig.lastUpdated = new Date().toISOString()

  return migratedConfig as BannerConfig
}

/**
 * Migration from v1.0.0 to v2.0.0 - Adds preferences modal functionality
 */
function migrateToV2(config: any): any {
  const migrated = { ...config }

  // Ensure language field exists
  if (!migrated.language) {
    migrated.language = 'auto'
  }

  // Ensure branding.footerLink exists with proper structure
  if (!migrated.branding) {
    migrated.branding = {}
  }
  
  if (!migrated.branding.footerLink) {
    migrated.branding.footerLink = {
      enabled: true,
      text: 'Cookie Settings',
      position: 'floating',
      floatingPosition: 'bottom-left'
    }
  }

  // Ensure behavior.showPreferences is enabled for existing banners
  if (!migrated.behavior) {
    migrated.behavior = {}
  }
  
  // If showPreferences is not explicitly set, enable it for better UX
  if (migrated.behavior.showPreferences === undefined) {
    migrated.behavior.showPreferences = true
  }

  // Ensure scripts structure exists
  if (!migrated.scripts) {
    migrated.scripts = {
      strictlyNecessary: [
        {
          id: 'session-management',
          name: 'Session Management',
          category: 'strictly-necessary',
          scriptCode: `// Essential session management
if (!sessionStorage.getItem('sessionId')) {
  sessionStorage.setItem('sessionId', Date.now().toString());
}`,
          enabled: true
        }
      ],
      functionality: [],
      trackingPerformance: [],
      targetingAdvertising: []
    }
  }

  // Ensure advanced settings exist
  if (!migrated.advanced) {
    migrated.advanced = {
      googleConsentMode: true,
      customCSS: '',
      customJS: ''
    }
  }

  // Add performance settings if missing
  if (!migrated.advanced.performance) {
    migrated.advanced.performance = {
      deferNonCriticalScripts: true,
      useRequestIdleCallback: true,
      lazyLoadAnalytics: true,
      inlineCriticalCSS: true
    }
  }

  return migrated
}

/**
 * Checks if a banner configuration needs migration
 */
export function needsMigration(config: any): boolean {
  // Handle null, undefined, or invalid configs
  if (!config || typeof config !== 'object') {
    return true // Treat invalid configs as needing migration
  }
  
  return !config.version || config.version !== CURRENT_BANNER_VERSION
}

/**
 * Gets migration notes for users about what was updated
 */
export function getMigrationNotes(oldVersion: string, newVersion: string): string[] {
  const notes: string[] = []

  if (oldVersion === '1.0.0' && newVersion === '2.0.0') {
    notes.push('✨ Added advanced preferences modal with cookie category toggles')
    notes.push('🎨 Enhanced cookie settings with better user experience')
    notes.push('⚡ Improved performance with optimized script loading')
    notes.push('🔧 Added session management and advanced tracking options')
  }

  return notes
}

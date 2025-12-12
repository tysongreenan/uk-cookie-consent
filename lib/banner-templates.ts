import { BannerConfig, ComplianceFramework } from '@/types'
import { getComplianceRequirements } from './compliance-frameworks'

export const PIPEDA_TEMPLATE: BannerConfig = {
  version: '2.1.0',
  lastUpdated: new Date().toISOString(),
  compliance: {
    framework: 'pipeda',
    requiresExplicitConsent: false,
    requiresOptIn: false,
    requiresGranularConsent: false,
    requiresPrivacyPolicy: true,
    requiresDataRetentionPolicy: false,
    maxPenalty: 'Reputation damage and Privacy Commissioner findings',
    consentExpiry: 24,
  },
  name: 'PIPEDA Compliant Banner',
  position: 'bottom',
  theme: 'light',
  colors: {
    background: '#ffffff',
    text: '#1f2937',
    button: '#dc2626', // Red for Canada
    buttonText: '#ffffff',
    link: '#dc2626',
  },
  language: 'en',
  text: {
    title: 'We Use Cookies',
    message: 'We use cookies to improve your experience on our website. By continuing to browse, you consent to our use of cookies. You can manage your preferences or learn more in our Privacy Policy.',
    acceptButton: 'Accept All',
    rejectButton: 'Reject Non-Essential',
    preferencesButton: 'Cookie Settings',
  },
  behavior: {
    autoShow: true,
    dismissOnScroll: false,
    showPreferences: false, // PIPEDA doesn't require granular controls
    cookieExpiry: 182, // 6 months default
  },
  branding: {
    logo: {
      enabled: false,
      url: '',
      position: 'left',
      maxWidth: 120,
      maxHeight: 40,
    },
    privacyPolicy: {
      url: '',
      text: 'Privacy Policy',
      openInNewTab: true,
      required: true,
    },
    footerLink: {
      enabled: true,
      text: 'Cookie Settings',
      position: 'floating',
      floatingPosition: 'bottom-left',
      style: 'floating',
      floatingStyle: {
        shape: 'pill',
        size: 'small',
        showText: true,
        useCustomColors: false
      },
      inlineStyle: {
        linkType: 'plain',
        includeIcon: false,
        includeLogo: false
      }
    },
  },
  layout: {
    width: 'container',
    borderRadius: 8,
    padding: 20,
    margin: 20,
    shadow: 'medium',
    animation: 'slide',
  },
  scripts: {
    strictlyNecessary: [],
    functionality: [],
    trackingPerformance: [],
    targetingAdvertising: [],
  },
  advanced: {
    googleConsentMode: true,
    customCSS: '',
    customJS: '',
    performance: {
      deferNonCriticalScripts: true,
      useRequestIdleCallback: true,
      lazyLoadAnalytics: true,
      inlineCriticalCSS: true,
    },
  },
}

export const GDPR_TEMPLATE: BannerConfig = {
  version: '2.1.0',
  lastUpdated: new Date().toISOString(),
  compliance: {
    framework: 'gdpr',
    requiresExplicitConsent: true,
    requiresOptIn: true,
    requiresGranularConsent: true,
    requiresPrivacyPolicy: true,
    requiresDataRetentionPolicy: true,
    maxPenalty: '€20 million or 4% of annual revenue',
    consentExpiry: 12,
  },
  name: 'GDPR Compliant Banner',
  position: 'bottom',
  theme: 'light',
  colors: {
    background: '#ffffff',
    text: '#1f2937',
    button: '#2563eb', // Blue for EU
    buttonText: '#ffffff',
    link: '#2563eb',
  },
  language: 'en',
  text: {
    title: 'Cookie Consent Required',
    message: 'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies. You can customize your preferences or learn more in our Privacy Policy.',
    acceptButton: 'Accept All',
    rejectButton: 'Reject All',
    preferencesButton: 'Customize',
  },
  behavior: {
    autoShow: true,
    dismissOnScroll: false,
    showPreferences: true, // GDPR requires granular controls
    cookieExpiry: 182, // 6 months default
  },
  branding: {
    logo: {
      enabled: false,
      url: '',
      position: 'left',
      maxWidth: 120,
      maxHeight: 40,
    },
    privacyPolicy: {
      url: '',
      text: 'Privacy Policy',
      openInNewTab: true,
      required: true,
    },
    footerLink: {
      enabled: true,
      text: 'Cookie Preferences',
      position: 'floating',
      floatingPosition: 'bottom-left',
    },
  },
  layout: {
    width: 'container',
    borderRadius: 8,
    padding: 20,
    margin: 20,
    shadow: 'medium',
    animation: 'slide',
  },
  scripts: {
    strictlyNecessary: [],
    functionality: [],
    trackingPerformance: [],
    targetingAdvertising: [],
  },
  advanced: {
    googleConsentMode: true,
    customCSS: '',
    customJS: '',
    performance: {
      deferNonCriticalScripts: true,
      useRequestIdleCallback: true,
      lazyLoadAnalytics: true,
      inlineCriticalCSS: true,
    },
  },
}

export const CCPA_TEMPLATE: BannerConfig = {
  version: '2.1.0',
  lastUpdated: new Date().toISOString(),
  compliance: {
    framework: 'ccpa',
    requiresExplicitConsent: false,
    requiresOptIn: false,
    requiresGranularConsent: true,
    requiresPrivacyPolicy: true,
    requiresDataRetentionPolicy: false,
    maxPenalty: '$7,500 per violation',
    consentExpiry: 12,
  },
  name: 'CCPA Compliant Banner',
  position: 'bottom',
  theme: 'light',
  colors: {
    background: '#ffffff',
    text: '#1f2937',
    button: '#059669', // Green for California
    buttonText: '#ffffff',
    link: '#059669',
  },
  language: 'en',
  text: {
    title: 'Your Privacy Rights',
    message: 'We collect and use personal information as described in our Privacy Policy. California residents have additional privacy rights, including the right to opt-out of the sale of personal information. You can manage your preferences or learn more about your rights.',
    acceptButton: 'Accept',
    rejectButton: 'Do Not Sell My Info',
    preferencesButton: 'Privacy Settings',
  },
  behavior: {
    autoShow: true,
    dismissOnScroll: false,
    showPreferences: true, // CCPA requires granular controls
    cookieExpiry: 182, // 6 months default
  },
  branding: {
    logo: {
      enabled: false,
      url: '',
      position: 'left',
      maxWidth: 120,
      maxHeight: 40,
    },
    privacyPolicy: {
      url: '',
      text: 'Privacy Policy',
      openInNewTab: true,
      required: true,
    },
    footerLink: {
      enabled: true,
      text: 'Privacy Rights',
      position: 'floating',
      floatingPosition: 'bottom-left',
    },
  },
  layout: {
    width: 'container',
    borderRadius: 8,
    padding: 20,
    margin: 20,
    shadow: 'medium',
    animation: 'slide',
  },
  scripts: {
    strictlyNecessary: [],
    functionality: [],
    trackingPerformance: [],
    targetingAdvertising: [],
  },
  advanced: {
    googleConsentMode: true,
    customCSS: '',
    customJS: '',
    performance: {
      deferNonCriticalScripts: true,
      useRequestIdleCallback: true,
      lazyLoadAnalytics: true,
      inlineCriticalCSS: true,
    },
  },
}

export const CUSTOM_TEMPLATE: BannerConfig = {
  version: '2.1.0',
  lastUpdated: new Date().toISOString(),
  compliance: {
    framework: 'custom',
    requiresExplicitConsent: true,
    requiresOptIn: true,
    requiresGranularConsent: true,
    requiresPrivacyPolicy: true,
    requiresDataRetentionPolicy: false,
    maxPenalty: 'Varies by jurisdiction',
    consentExpiry: 12,
  },
  name: 'Custom Compliance Banner',
  position: 'bottom',
  theme: 'light',
  colors: {
    background: '#ffffff',
    text: '#1f2937',
    button: '#9333ea', // Purple for custom
    buttonText: '#ffffff',
    link: '#9333ea',
  },
  language: 'en',
  text: {
    title: 'Cookie Consent',
    message: 'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your preferences or learn more in our Privacy Policy.',
    acceptButton: 'Accept All',
    rejectButton: 'Reject All',
    preferencesButton: 'Customize',
  },
  behavior: {
    autoShow: true,
    dismissOnScroll: false,
    showPreferences: true,
    cookieExpiry: 182,
    buttonLayout: 'standard',
    showRejectButton: true,
  },
  branding: {
    logo: {
      enabled: false,
      url: '',
      position: 'left',
      maxWidth: 120,
      maxHeight: 40,
    },
    privacyPolicy: {
      url: '',
      text: 'Privacy Policy',
      openInNewTab: true,
      required: true,
    },
    footerLink: {
      enabled: true,
      text: 'Cookie Settings',
      position: 'floating',
      floatingPosition: 'bottom-left',
      style: 'floating',
      floatingStyle: {
        shape: 'pill',
        size: 'small',
        showText: true,
        useCustomColors: false
      },
      inlineStyle: {
        linkType: 'plain',
        includeIcon: false,
        includeLogo: false
      }
    },
  },
  layout: {
    width: 'container',
    borderRadius: 8,
    padding: 20,
    margin: 20,
    shadow: 'medium',
    animation: 'slide',
  },
  scripts: {
    strictlyNecessary: [],
    functionality: [],
    trackingPerformance: [],
    targetingAdvertising: [],
  },
  advanced: {
    googleConsentMode: true,
    customCSS: '',
    customJS: '',
    performance: {
      deferNonCriticalScripts: true,
      useRequestIdleCallback: true,
      lazyLoadAnalytics: true,
      inlineCriticalCSS: true,
    },
  },
}

export function getBannerTemplate(framework: ComplianceFramework): BannerConfig {
  switch (framework) {
    case 'pipeda':
      return PIPEDA_TEMPLATE
    case 'gdpr':
      return GDPR_TEMPLATE
    case 'ccpa':
      return CCPA_TEMPLATE
    case 'custom':
      return CUSTOM_TEMPLATE
    default:
      return CUSTOM_TEMPLATE // Default to custom template
  }
}

export function getLegalText(framework: ComplianceFramework, section: 'banner' | 'preferences' | 'privacy'): string {
  const texts = {
    pipeda: {
      banner: 'We use cookies to improve your experience on our website. By continuing to browse, you consent to our use of cookies. You can manage your preferences or learn more in our Privacy Policy.',
      preferences: 'Manage your cookie preferences. You can enable or disable different types of cookies below.',
      privacy: 'Under PIPEDA, you have the right to access, correct, and request deletion of your personal information. Contact us to exercise these rights.'
    },
    gdpr: {
      banner: 'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies.',
      preferences: 'Customize your cookie preferences. Under GDPR, you have the right to granular consent for different types of data processing.',
      privacy: 'Under GDPR, you have the right to access, rectification, erasure, portability, and restriction of processing of your personal data.'
    },
    ccpa: {
      banner: 'We collect and use personal information as described in our Privacy Policy. California residents have additional privacy rights, including the right to opt-out of the sale of personal information.',
      preferences: 'Manage your privacy settings. California residents can opt-out of the sale of personal information and access their data.',
      privacy: 'California residents have the right to know, delete, and opt-out of the sale of personal information under CCPA.'
    },
    custom: {
      banner: 'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your preferences or learn more in our Privacy Policy.',
      preferences: 'Customize your cookie preferences. You can enable or disable different types of cookies below.',
      privacy: 'You have the right to access, correct, and request deletion of your personal information. Contact us to exercise these rights.'
    }
  }
  
  return texts[framework]?.[section] || texts.gdpr[section]
}

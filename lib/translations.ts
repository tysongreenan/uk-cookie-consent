// Language translations for cookie banner
export const translations = {
  en: {
    title: 'We use cookies',
    message: 'This website uses cookies to enhance your browsing experience and provide personalized content.',
    acceptButton: 'Accept All',
    rejectButton: 'Reject',
    preferencesButton: 'Preferences',
    privacyPolicy: 'Privacy Policy',
    footerLink: 'Cookie Settings',

    // Preferences panel
    preferencesTitle: 'Privacy Center',
    preferencesDescription: "By clicking 'Accept', you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.",
    managePreferences: 'Manage cookie preferences',
    savePreferences: 'Save Preferences',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    confirmChoices: 'Confirm My Choices',

    // Cookie categories
    strictlyNecessary: 'Strictly Necessary Cookies',
    strictlyNecessaryDescription: 'Always active',
    functionality: 'Functional Cookies',
    functionalityDescription: 'These cookies enable enhanced functionality and personalization, such as language preferences and user settings.',
    trackingPerformance: 'Performance Cookies',
    trackingPerformanceDescription: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    targetingAdvertising: 'Targeting Cookies',
    targetingAdvertisingDescription: 'These cookies are used to make advertising messages more relevant to you and your interests.',
    socialMedia: 'Social Media Cookies',
    socialMediaDescription: 'These cookies enable social media integration and sharing features.',

    // Always active
    alwaysActive: 'Always Active',

    // Additional UI elements
    close: 'Close',
    learnMore: 'Learn more',
    cookieSettings: 'Cookie Settings',
  },
  fr: {
    title: 'Nous utilisons des cookies',
    message: 'Ce site web utilise des cookies pour améliorer votre expérience de navigation et fournir du contenu personnalisé.',
    acceptButton: 'Accepter tout',
    rejectButton: 'Rejeter',
    preferencesButton: 'Préférences',
    privacyPolicy: 'Politique de confidentialité',
    footerLink: 'Paramètres des cookies',

    // Preferences panel
    preferencesTitle: 'Centre de confidentialité',
    preferencesDescription: "En cliquant sur « Accepter », vous acceptez le stockage de cookies sur votre appareil pour améliorer la navigation sur le site, analyser l\u2019utilisation du site et contribuer à nos efforts de marketing.",
    managePreferences: 'Gérer les préférences de cookies',
    savePreferences: 'Enregistrer les préférences',
    acceptAll: 'Accepter tout',
    rejectAll: 'Tout rejeter',
    confirmChoices: 'Confirmer mes choix',

    // Cookie categories
    strictlyNecessary: 'Cookies strictement nécessaires',
    strictlyNecessaryDescription: 'Toujours actif',
    functionality: 'Cookies fonctionnels',
    functionalityDescription: 'Ces cookies permettent des fonctionnalités améliorées et une personnalisation, telles que les préférences linguistiques et les paramètres utilisateur.',
    trackingPerformance: 'Cookies de performance',
    trackingPerformanceDescription: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant et en rapportant des informations de manière anonyme.',
    targetingAdvertising: 'Cookies de ciblage',
    targetingAdvertisingDescription: 'Ces cookies sont utilisés pour rendre les messages publicitaires plus pertinents pour vous et vos intérêts.',
    socialMedia: 'Cookies de réseaux sociaux',
    socialMediaDescription: 'Ces cookies permettent l\u2019intégration des réseaux sociaux et les fonctionnalités de partage.',

    // Always active
    alwaysActive: 'Toujours actif',

    // Additional UI elements
    close: 'Fermer',
    learnMore: 'En savoir plus',
    cookieSettings: 'Paramètres des cookies',
  }
}

export type Language = keyof typeof translations

export function getTranslation(language: Language, key: keyof typeof translations.en): string {
  return translations[language][key] || translations.en[key]
}

// Get all translations for a language
export function getAllTranslations(language: 'en' | 'fr' | 'auto') {
  const selectedLanguage: Language = language === 'auto' ? detectLanguage() : language
  return translations[selectedLanguage]
}

// Auto-detect browser language
export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'en'
  
  const browserLang = navigator.language.toLowerCase()
  
  // Check for French variants
  if (browserLang.startsWith('fr')) {
    return 'fr'
  }
  
  // Default to English
  return 'en'
}

// Apply translations to banner config text
export function applyTranslations(language: 'en' | 'fr' | 'auto') {
  let selectedLanguage: Language = language === 'auto' ? detectLanguage() : language
  
  return {
    title: translations[selectedLanguage].title,
    message: translations[selectedLanguage].message,
    acceptButton: translations[selectedLanguage].acceptButton,
    rejectButton: translations[selectedLanguage].rejectButton,
    preferencesButton: translations[selectedLanguage].preferencesButton,
  }
}

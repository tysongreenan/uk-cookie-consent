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
    preferencesTitle: 'Cookie Preferences',
    preferencesDescription: 'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking accept, you agree to this use of cookies and data.',
    savePreferences: 'Save Preferences',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    
    // Cookie categories
    strictlyNecessary: 'Strictly Necessary',
    strictlyNecessaryDescription: 'These cookies are essential for the website to function and cannot be disabled.',
    functionality: 'Functionality',
    functionalityDescription: 'These cookies enable enhanced functionality and personalization, such as language preferences and user settings.',
    trackingPerformance: 'Analytics & Performance',
    trackingPerformanceDescription: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    targetingAdvertising: 'Targeting & Advertising',
    targetingAdvertisingDescription: 'These cookies are used to make advertising messages more relevant to you and your interests.',
    
    // Always active
    alwaysActive: 'Always Active',
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
    preferencesTitle: 'Préférences des cookies',
    preferencesDescription: 'Nous utilisons des cookies et des technologies similaires pour aider à personnaliser le contenu, adapter et mesurer les publicités, et offrir une meilleure expérience. En cliquant sur accepter, vous acceptez cette utilisation des cookies et des données.',
    savePreferences: 'Enregistrer les préférences',
    acceptAll: 'Accepter tout',
    rejectAll: 'Tout rejeter',
    
    // Cookie categories
    strictlyNecessary: 'Strictement nécessaire',
    strictlyNecessaryDescription: 'Ces cookies sont essentiels au fonctionnement du site web et ne peuvent pas être désactivés.',
    functionality: 'Fonctionnalité',
    functionalityDescription: 'Ces cookies permettent des fonctionnalités améliorées et une personnalisation, telles que les préférences linguistiques et les paramètres utilisateur.',
    trackingPerformance: 'Analytique et performance',
    trackingPerformanceDescription: 'Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant et en rapportant des informations de manière anonyme.',
    targetingAdvertising: 'Ciblage et publicité',
    targetingAdvertisingDescription: 'Ces cookies sont utilisés pour rendre les messages publicitaires plus pertinents pour vous et vos intérêts.',
    
    // Always active
    alwaysActive: 'Toujours actif',
  }
}

export type Language = keyof typeof translations

export function getTranslation(language: Language, key: keyof typeof translations.en): string {
  return translations[language][key] || translations.en[key]
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

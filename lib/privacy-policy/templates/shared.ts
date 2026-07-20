import type { PrivacyPolicyInputs } from '@/types'

export type PolicyLang = 'en' | 'fr'

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function humanizeKey(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function formatList(items: string[], lang: PolicyLang = 'en'): string {
  if (items.length === 0) return lang === 'fr' ? 'aucun' : 'none'
  if (items.length === 1) return items[0]
  if (lang === 'fr') {
    return items.slice(0, -1).join(', ') + ' et ' + items[items.length - 1]
  }
  return items.slice(0, -1).join(', ') + ' and ' + items[items.length - 1]
}

const DATA_LABELS: Record<PolicyLang, Record<string, string>> = {
  en: {
    name: 'Full name',
    email: 'Email address',
    phone: 'Phone number',
    address: 'Mailing or billing address',
    ip_address: 'IP address',
    device_info: 'Device and browser information',
    location: 'Approximate geographic location',
    payment_data: 'Payment and billing information',
    browsing_history: 'Browsing and usage history',
    account_credentials: 'Account credentials',
    social_media_profiles: 'Social media profile information',
    employment_info: 'Employment information',
    health_info: 'Health information',
    payment: 'Payment and billing information',
    usage_data: 'Usage and browsing data',
    cookies: 'Cookies and similar tracking technologies',
    social_profiles: 'Social media profile information',
    demographics: 'Demographic information (age, gender)',
    employment: 'Employment information',
    government_id: 'Government-issued identification numbers',
  },
  fr: {
    name: 'Nom complet',
    email: 'Adresse courriel',
    phone: 'Numéro de téléphone',
    address: 'Adresse postale ou de facturation',
    ip_address: 'Adresse IP',
    device_info: 'Informations sur l’appareil et le navigateur',
    location: 'Localisation géographique approximative',
    payment_data: 'Informations de paiement et de facturation',
    browsing_history: 'Historique de navigation et d’utilisation',
    account_credentials: 'Identifiants de compte',
    social_media_profiles: 'Profils de médias sociaux',
    employment_info: 'Renseignements d’emploi',
    health_info: 'Renseignements sur la santé',
    payment: 'Informations de paiement et de facturation',
    usage_data: 'Données d’utilisation et de navigation',
    cookies: 'Témoins (cookies) et technologies similaires',
    social_profiles: 'Profils de médias sociaux',
    demographics: 'Renseignements démographiques (âge, genre)',
    employment: 'Renseignements d’emploi',
    government_id: 'Numéros d’identification délivrés par le gouvernement',
  },
}

const PURPOSE_LABELS: Record<PolicyLang, Record<string, string>> = {
  en: {
    service_delivery: 'To provide and maintain our services',
    communication: 'To communicate with you about your account, updates, and support requests',
    analytics: 'To analyse usage patterns and improve our services',
    analytics_improvement: 'To analyse usage patterns and improve our services',
    marketing: 'To send promotional materials and marketing communications (with your consent)',
    marketing_advertising: 'To send promotional materials and marketing communications (with your consent)',
    legal_compliance: 'To comply with applicable laws, regulations, and legal processes',
    customer_support: 'To provide customer support and respond to your requests',
    account_management: 'To create and manage your account',
    security: 'To detect, prevent, and address fraud, security breaches, and technical issues',
    personalisation: 'To personalise your experience and deliver content relevant to your interests',
    personalization: 'To personalise your experience and deliver content relevant to your interests',
    payment_processing: 'To process transactions and manage billing',
    research: 'To conduct research and development to improve our products',
  },
  fr: {
    service_delivery: 'Fournir et maintenir nos services',
    communication: 'Communiquer avec vous au sujet de votre compte, des mises à jour et des demandes de soutien',
    analytics: 'Analyser les habitudes d’utilisation et améliorer nos services',
    analytics_improvement: 'Analyser les habitudes d’utilisation et améliorer nos services',
    marketing: 'Envoyer des documents promotionnels et des communications marketing (avec votre consentement)',
    marketing_advertising: 'Envoyer des documents promotionnels et des communications marketing (avec votre consentement)',
    legal_compliance: 'Respecter les lois, règlements et procédures juridiques applicables',
    customer_support: 'Offrir du soutien à la clientèle et répondre à vos demandes',
    account_management: 'Créer et gérer votre compte',
    security: 'Détecter, prévenir et traiter la fraude, les incidents de sécurité et les problèmes techniques',
    personalisation: 'Personnaliser votre expérience et diffuser du contenu pertinent',
    personalization: 'Personnaliser votre expérience et diffuser du contenu pertinent',
    payment_processing: 'Traiter les transactions et gérer la facturation',
    research: 'Mener des activités de recherche et développement pour améliorer nos produits',
  },
}

const METHOD_LABELS: Record<PolicyLang, Record<string, string>> = {
  en: {
    forms: 'Information you provide directly through forms, registrations, and account creation',
    cookies: 'Automated data collection through cookies and similar technologies',
    analytics: 'Analytics tools that record how you interact with our services',
    account_creation: 'Information you provide when creating or managing an account',
    purchases: 'Information collected during purchases and checkout',
    third_party_sources: 'Information received from third-party services and partners',
    automatic_collection: 'Information collected automatically when you use our services',
    third_party: 'Information received from third-party services and partners',
    user_content: 'Content you create, upload, or share while using our services',
    support: 'Communications with our support team',
    payment_processor: 'Payment processors when you complete transactions',
  },
  fr: {
    forms: 'Renseignements que vous fournissez directement via des formulaires, inscriptions et création de compte',
    cookies: 'Collecte automatisée au moyen de témoins (cookies) et de technologies similaires',
    analytics: 'Outils d’analyse qui enregistrent votre interaction avec nos services',
    account_creation: 'Renseignements fournis lors de la création ou de la gestion d’un compte',
    purchases: 'Renseignements recueillis lors d’achats et du paiement',
    third_party_sources: 'Renseignements reçus de services et partenaires tiers',
    automatic_collection: 'Renseignements recueillis automatiquement lorsque vous utilisez nos services',
    third_party: 'Renseignements reçus de services et partenaires tiers',
    user_content: 'Contenu que vous créez, téléversez ou partagez en utilisant nos services',
    support: 'Communications avec notre équipe de soutien',
    payment_processor: 'Processeurs de paiement lorsque vous effectuez des transactions',
  },
}

const THIRD_PARTY_LABELS: Record<PolicyLang, Record<string, string>> = {
  en: {
    google_analytics: 'Google Analytics (usage analytics)',
    google_ads: 'Google Ads (advertising)',
    facebook_pixel: 'Meta Pixel / Facebook (advertising and analytics)',
    stripe: 'Stripe (payment processing)',
    mailchimp: 'Mailchimp (email marketing)',
    intercom: 'Intercom (customer support)',
    hotjar: 'Hotjar (session recording and heatmaps)',
    hubspot: 'HubSpot (CRM and marketing)',
    cloudflare: 'Cloudflare (security and performance)',
    aws: 'Amazon Web Services (cloud hosting)',
    sentry: 'Sentry (error monitoring)',
    linkedin: 'LinkedIn (advertising and analytics)',
    twitter_x: 'Twitter/X (advertising and analytics)',
    tiktok: 'TikTok (advertising and analytics)',
    shopify: 'Shopify (e-commerce platform)',
    wordpress_plugins: 'WordPress plugins (site functionality)',
  },
  fr: {
    google_analytics: 'Google Analytics (analyse d’utilisation)',
    google_ads: 'Google Ads (publicité)',
    facebook_pixel: 'Meta Pixel / Facebook (publicité et analyse)',
    stripe: 'Stripe (traitement des paiements)',
    mailchimp: 'Mailchimp (marketing par courriel)',
    intercom: 'Intercom (soutien à la clientèle)',
    hotjar: 'Hotjar (enregistrement de sessions et cartes de chaleur)',
    hubspot: 'HubSpot (CRM et marketing)',
    cloudflare: 'Cloudflare (sécurité et performance)',
    aws: 'Amazon Web Services (hébergement infonuagique)',
    sentry: 'Sentry (surveillance des erreurs)',
    linkedin: 'LinkedIn (publicité et analyse)',
    twitter_x: 'Twitter/X (publicité et analyse)',
    tiktok: 'TikTok (publicité et analyse)',
    shopify: 'Shopify (plateforme de commerce électronique)',
    wordpress_plugins: 'Extensions WordPress (fonctionnalités du site)',
  },
}

const COOKIE_CATEGORY_LABELS: Record<PolicyLang, Record<string, string>> = {
  en: {
    necessary: 'Strictly necessary',
    functional: 'Functional',
    analytics: 'Analytics',
    marketing: 'Marketing',
    social_media: 'Social media',
  },
  fr: {
    necessary: 'Strictement nécessaires',
    functional: 'Fonctionnels',
    analytics: 'Analytiques',
    marketing: 'Marketing',
    social_media: 'Médias sociaux',
  },
}

const RETENTION_LABELS: Record<PolicyLang, Record<string, string>> = {
  en: {
    '30_days': '30 days',
    '90_days': '90 days',
    '1_year': 'one (1) year',
    '2_years': 'two (2) years',
    '3_years': 'three (3) years',
    '5_years': 'five (5) years',
    as_needed: 'as long as necessary to fulfil the purposes described in this policy',
    custom: '',
  },
  fr: {
    '30_days': '30 jours',
    '90_days': '90 jours',
    '1_year': 'un (1) an',
    '2_years': 'deux (2) ans',
    '3_years': 'trois (3) ans',
    '5_years': 'cinq (5) ans',
    as_needed: 'aussi longtemps que nécessaire pour réaliser les finalités décrites dans la présente politique',
    custom: '',
  },
}

export function labelData(key: string, lang: PolicyLang = 'en'): string {
  return DATA_LABELS[lang][key] || DATA_LABELS.en[key] || humanizeKey(key)
}

export function labelPurpose(key: string, lang: PolicyLang = 'en'): string {
  return PURPOSE_LABELS[lang][key] || PURPOSE_LABELS.en[key] || humanizeKey(key)
}

export function labelMethod(key: string, lang: PolicyLang = 'en'): string {
  return METHOD_LABELS[lang][key] || METHOD_LABELS.en[key] || humanizeKey(key)
}

export function labelThirdParty(key: string, lang: PolicyLang = 'en'): string {
  return THIRD_PARTY_LABELS[lang][key] || THIRD_PARTY_LABELS.en[key] || humanizeKey(key)
}

export function labelCookieCategory(key: string, lang: PolicyLang = 'en'): string {
  return COOKIE_CATEGORY_LABELS[lang][key] || COOKIE_CATEGORY_LABELS.en[key] || humanizeKey(key)
}

export function resolvePurposes(inputs: PrivacyPolicyInputs): string[] {
  if (inputs.dataPurposes.length > 0) return inputs.dataPurposes

  const purposes = new Set<string>([
    'service_delivery',
    'communication',
    'security',
    'legal_compliance',
  ])

  const cats = inputs.cookieCategories || []
  const methods = inputs.collectionMethods || []
  const services = inputs.thirdPartyServices || []

  if (
    cats.includes('analytics') ||
    methods.includes('analytics') ||
    services.includes('google_analytics') ||
    services.includes('hotjar')
  ) {
    purposes.add('analytics')
  }
  if (
    cats.includes('marketing') ||
    services.includes('facebook_pixel') ||
    services.includes('google_ads') ||
    services.includes('linkedin') ||
    services.includes('twitter_x') ||
    services.includes('tiktok')
  ) {
    purposes.add('marketing')
  }
  if (
    inputs.dataCollected.includes('payment_data') ||
    inputs.dataCollected.includes('payment') ||
    methods.includes('purchases') ||
    services.includes('stripe') ||
    services.includes('shopify')
  ) {
    purposes.add('payment_processing')
  }
  if (cats.includes('functional') || cats.includes('necessary')) {
    purposes.add('personalisation')
  }

  return Array.from(purposes)
}

export function resolveRetentionText(inputs: PrivacyPolicyInputs, lang: PolicyLang = 'en'): string {
  if (inputs.dataRetentionPeriod === 'custom' && inputs.customRetentionPeriod) {
    return inputs.customRetentionPeriod
  }
  const labels = RETENTION_LABELS[lang]
  if (inputs.dataRetentionPeriod && labels[inputs.dataRetentionPeriod]) {
    return labels[inputs.dataRetentionPeriod]
  }
  if (inputs.dataRetentionPeriod?.trim()) {
    return inputs.dataRetentionPeriod
  }
  return labels.as_needed
}

export function getPolicyLang(inputs: PrivacyPolicyInputs): PolicyLang {
  return inputs.language === 'fr' ? 'fr' : 'en'
}

export function formatLastUpdated(lang: PolicyLang): string {
  const locale = lang === 'fr' ? 'fr-CA' : 'en-GB'
  return new Date().toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

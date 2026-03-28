import { TCFPurpose } from '@/types'

// ── IAB TCF 2.2 Purpose Definitions ─────────────────────────────────

export const TCF_PURPOSES: TCFPurpose[] = [
  {
    id: 1,
    name: 'Store and/or access information on a device',
    description:
      'Cookies, device or similar online identifiers (e.g. login-based identifiers, randomly assigned identifiers, network based identifiers) together with other information (e.g. browser type and information, language, screen size, supported technologies etc.) can be stored or read on your device to recognise it each time it connects to an app or to a website, for one or several of the purposes presented here.',
    descriptionFr:
      "Des cookies, identifiants de votre appareil ou autres informations peuvent être stockés ou consultés sur votre appareil pour les finalités qui vous sont présentées.",
    legalBasis: 'consent',
  },
  {
    id: 2,
    name: 'Select basic ads',
    description:
      'Ads can be shown to you based on the content you are viewing, the app you are using, your approximate location, or your device type.',
    descriptionFr:
      "Des publicités peuvent vous être présentées en fonction du contenu que vous consultez, de l'application que vous utilisez, de votre localisation approximative ou de votre type d'appareil.",
    legalBasis: 'legitimate-interest',
  },
  {
    id: 3,
    name: 'Create profiles for personalised advertising',
    description:
      'Information about your activity on this service (such as forms you submit, content you look at) can be stored and combined with other information about you (for example, information from your previous activity on this service and other websites or apps, information you provided) or similar users. This is then used to build or improve a profile about you (that might include possible interests and personal aspects). Your profile can be used (also later) to present advertising that appears more relevant based on your possible interests by this and other entities.',
    descriptionFr:
      "Un profil peut être créé à partir de vos données pour vous présenter des publicités personnalisées.",
    legalBasis: 'consent',
  },
  {
    id: 4,
    name: 'Use profiles to select personalised advertising',
    description:
      'Advertising presented to you on this service can be based on your advertising profiles, which can reflect your activity on this service or other websites or apps (like the forms you submit, content you look at), possible interests and personal aspects.',
    descriptionFr:
      "Des publicités personnalisées peuvent vous être présentées en fonction de votre profil publicitaire.",
    legalBasis: 'consent',
  },
  {
    id: 5,
    name: 'Create profiles for personalised content',
    description:
      'Information about your activity on this service (for instance, forms you submit, non-advertising content you look at) can be stored and combined with other information about you (such as your previous activity on this service or other websites or apps) or similar users. This is then used to build or improve a profile about you (which might for example include possible interests and personal aspects). Your profile can be used (also later) to present content that appears more relevant based on your possible interests, such as by adapting the order in which content is shown to you, so that it is even easier for you to find content that matches your interests.',
    descriptionFr:
      "Un profil peut être créé à partir de vos données pour vous présenter du contenu personnalisé.",
    legalBasis: 'consent',
  },
  {
    id: 6,
    name: 'Use profiles to select personalised content',
    description:
      'Content presented to you on this service can be based on your content personalisation profiles, which can reflect your activity on this or other services (for instance, the forms you submit, content you look at), possible interests and personal aspects. This can for example be used to adapt the order in which content is shown to you, so that it is even easier for you to find (non-advertising) content that matches your interests.',
    descriptionFr:
      "Du contenu personnalisé peut vous être présenté en fonction de votre profil de personnalisation.",
    legalBasis: 'legitimate-interest',
  },
  {
    id: 7,
    name: 'Measure advertising performance',
    description:
      'Information regarding which advertising is presented to you and how you interact with it can be used to determine how well an advert has worked for you or other users and whether the goals of the advertising were reached.',
    descriptionFr:
      "La performance des publicités peut être mesurée afin de déterminer l'efficacité des campagnes.",
    legalBasis: 'legitimate-interest',
  },
  {
    id: 8,
    name: 'Measure content performance',
    description:
      'Information regarding which content is presented to you and how you interact with it can be used to determine whether the (non-advertising) content e.g. reached its intended audience and matched your interests.',
    descriptionFr:
      "La performance du contenu peut être mesurée pour évaluer s'il atteint son audience cible.",
    legalBasis: 'legitimate-interest',
  },
  {
    id: 9,
    name: 'Understand audiences through statistics or combinations of data from different sources',
    description:
      'Reports can be generated based on the combination of data sets (like user profiles, statistics, market research, analytics data) regarding your interactions and those of other users with advertising or (non-advertising) content to identify common characteristics (for instance, to determine which target audiences are more receptive to an ad campaign or to certain contents).',
    descriptionFr:
      "Des rapports peuvent être générés en combinant des ensembles de données pour comprendre les audiences.",
    legalBasis: 'legitimate-interest',
  },
  {
    id: 10,
    name: 'Develop and improve services',
    description:
      'Information about your activity on this service, such as your interaction with ads or content, can be very helpful to improve products and services and to build new products and services based on user interactions, the type of audience, etc.',
    descriptionFr:
      "Les informations sur votre activité peuvent être utilisées pour améliorer les produits et services existants.",
    legalBasis: 'legitimate-interest',
  },
  {
    id: 11,
    name: 'Use limited data to select content',
    description:
      'Content presented to you on this service can be based on limited data, such as the website or app you are using, your non-precise location, your device type, or which content you are interacting with (or have interacted with) (for example, to limit the number of times a video or an article is presented to you).',
    descriptionFr:
      "Du contenu peut vous être présenté sur la base de données limitées, comme le site que vous consultez ou votre type d'appareil.",
    legalBasis: 'legitimate-interest',
  },
]

// ── Special Features (require opt-in consent) ───────────────────────

export interface TCFSpecialFeature {
  id: number
  name: string
  description: string
  descriptionFr: string
}

export const TCF_SPECIAL_FEATURES: TCFSpecialFeature[] = [
  {
    id: 1,
    name: 'Use precise geolocation data',
    description:
      'With your acceptance, your precise location (within a radius of less than 500 metres) may be used in support of the purposes explained in this notice.',
    descriptionFr:
      "Avec votre consentement, votre localisation précise (dans un rayon de moins de 500 mètres) peut être utilisée.",
  },
  {
    id: 2,
    name: 'Actively scan device characteristics for identification',
    description:
      'With your acceptance, certain characteristics specific to your device might be requested and used to distinguish it from other devices (such as the installed fonts or plugins, the resolution of your screen) in support of the purposes explained in this notice.',
    descriptionFr:
      "Avec votre consentement, certaines caractéristiques de votre appareil peuvent être analysées pour l'identifier.",
  },
]

// ── Special Purposes (always active, no consent needed) ─────────────

export interface TCFSpecialPurpose {
  id: number
  name: string
  description: string
  descriptionFr: string
}

export const TCF_SPECIAL_PURPOSES: TCFSpecialPurpose[] = [
  {
    id: 1,
    name: 'Ensure security, prevent and detect fraud, and fix errors',
    description:
      'Your data can be used to monitor for and prevent unusual and possibly fraudulent activity (for example, regarding advertising, ad clicks by bots), and ensure systems and processes work properly and securely. It can also be used to correct any problems you, the provider or the domain operator experience in the delivery of content and ads and in your interaction with them.',
    descriptionFr:
      "Vos données peuvent être utilisées pour surveiller et prévenir les activités frauduleuses et assurer le bon fonctionnement des systèmes.",
  },
  {
    id: 2,
    name: 'Deliver and present advertising and content',
    description:
      'Certain information (like an IP address or device capabilities) is used to ensure the technical compatibility of the content or advertising, and to facilitate the transmission of the content or ad to your device.',
    descriptionFr:
      "Certaines informations techniques sont utilisées pour assurer la compatibilité et la diffusion des publicités et contenus.",
  },
]

// ── Purpose ↔ Category Mapping ──────────────────────────────────────
//
// Maps TCF purposes to our simplified cookie categories:
//   Purpose 1          → necessary (always true)
//   Purposes 2, 3, 4   → marketing
//   Purposes 5, 6, 11  → functionality
//   Purposes 7, 8, 9, 10 → analytics

const MARKETING_PURPOSES = [2, 3, 4]
const ANALYTICS_PURPOSES = [7, 8, 9, 10]
const FUNCTIONALITY_PURPOSES = [5, 6, 11]

/**
 * Convert per-purpose TCF consent into simplified category consent.
 * A category is granted if ALL its constituent purposes are granted.
 */
export function mapTcfPurposesToCategories(
  purposeConsent: Record<number, boolean>
): { functionality: boolean; analytics: boolean; marketing: boolean } {
  return {
    marketing: MARKETING_PURPOSES.every((id) => !!purposeConsent[id]),
    analytics: ANALYTICS_PURPOSES.every((id) => !!purposeConsent[id]),
    functionality: FUNCTIONALITY_PURPOSES.every((id) => !!purposeConsent[id]),
  }
}

/**
 * Convert simplified category consent into per-purpose TCF consent.
 * Purpose 1 (device storage) is always granted as it is strictly necessary.
 */
export function mapCategoriesToTcfPurposes(
  consent: { functionality: boolean; analytics: boolean; marketing: boolean }
): Record<number, boolean> {
  const result: Record<number, boolean> = {}

  // Purpose 1 is always required / strictly necessary
  result[1] = true

  for (const id of MARKETING_PURPOSES) {
    result[id] = consent.marketing
  }
  for (const id of ANALYTICS_PURPOSES) {
    result[id] = consent.analytics
  }
  for (const id of FUNCTIONALITY_PURPOSES) {
    result[id] = consent.functionality
  }

  return result
}

/**
 * Convert per-purpose TCF consent into Google Consent Mode v2 signals.
 */
export function mapTcfPurposesToGoogleConsent(
  purposeConsent: Record<number, boolean>
): {
  ad_storage: 'granted' | 'denied'
  ad_user_data: 'granted' | 'denied'
  ad_personalization: 'granted' | 'denied'
  analytics_storage: 'granted' | 'denied'
  functionality_storage: 'granted' | 'denied'
  personalization_storage: 'granted' | 'denied'
} {
  const categories = mapTcfPurposesToCategories(purposeConsent)

  return {
    ad_storage: categories.marketing ? 'granted' : 'denied',
    ad_user_data: categories.marketing ? 'granted' : 'denied',
    ad_personalization: categories.marketing ? 'granted' : 'denied',
    analytics_storage: categories.analytics ? 'granted' : 'denied',
    functionality_storage: categories.functionality ? 'granted' : 'denied',
    personalization_storage: categories.functionality ? 'granted' : 'denied',
  }
}

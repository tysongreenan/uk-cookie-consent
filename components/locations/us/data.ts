export type BannerPreview = {
  law: string
  title: string
  message: string
  accept: string
  reject: string
}

export type StateLaw = {
  code: string
  name: string
  law: string
  effective?: string
  summary: string
  cookie: string
  banner: BannerPreview
  col: number
  row: number
}

export const US_DEFAULT_BANNER: BannerPreview = {
  law: 'No comprehensive state privacy statute',
  title: 'We use cookies',
  message:
    'This site uses cookies to remember preferences and measure traffic. California visitors still get CCPA opt-out rights when they arrive.',
  accept: 'Accept',
  reject: 'Manage',
}

export const LAW_STATES: Record<string, Omit<StateLaw, 'col' | 'row'>> = {
  CA: {
    code: 'CA',
    name: 'California',
    law: 'CCPA / CPRA',
    effective: 'Jan 2020 · CPRA Jan 2023',
    summary:
      'The baseline US cookie law. Opt-out of sale and sharing, a clear “Do Not Sell or Share My Personal Information” link, and honor for Global Privacy Control.',
    cookie:
      'Show a “Do Not Sell or Share” control, disclose cookie purposes, and honor GPC / opt-out preference signals. Minors 13–15 must opt in to sale or sharing.',
    banner: {
      law: 'CCPA / CPRA',
      title: 'Your Privacy Rights',
      message:
        'We collect and use personal information as described in our Privacy Policy. California residents can opt out of the sale or sharing of personal information.',
      accept: 'Accept',
      reject: 'Do Not Sell My Info',
    },
  },
  VA: {
    code: 'VA',
    name: 'Virginia',
    law: 'VCDPA',
    effective: 'Jan 1, 2023',
    summary:
      'Consumer rights to access, delete, and opt out of targeted advertising and profiling, plus data protection assessments for high-risk processing.',
    cookie: 'Provide an opt-out of targeted advertising cookies and a clear privacy notice covering cookie collection.',
    banner: {
      law: 'VCDPA',
      title: 'Privacy choices',
      message:
        'Virginia residents can opt out of targeted advertising and profiling. Use the controls below to set how this site uses cookies.',
      accept: 'Accept',
      reject: 'Opt out of ads',
    },
  },
  CO: {
    code: 'CO',
    name: 'Colorado',
    law: 'CPA',
    effective: 'Jul 1, 2023',
    summary:
      'Colorado requires a Universal Opt-Out Mechanism. Browsers sending GPC must be treated as an opt-out of sale and targeted advertising.',
    cookie: 'Honor universal opt-out signals and offer a one-click opt-out of targeted advertising cookies.',
    banner: {
      law: 'Colorado CPA',
      title: 'Your privacy',
      message:
        'Colorado’s Privacy Act lets you opt out of targeted advertising. We honor Global Privacy Control and other universal opt-out signals.',
      accept: 'Accept',
      reject: 'Opt out',
    },
  },
  CT: {
    code: 'CT',
    name: 'Connecticut',
    law: 'CTDPA',
    effective: 'Jul 1, 2023',
    summary:
      'Access, correction, deletion, portability, and opt-out of targeted advertising, plus privacy-by-design and data-minimization duties.',
    cookie: 'Disclose cookie purposes and offer opt-out of targeted advertising. Honor browser opt-out preference signals.',
    banner: {
      law: 'CTDPA',
      title: 'Cookie choices',
      message:
        'Connecticut residents can opt out of targeted advertising. Manage cookies or continue with the defaults described in our privacy notice.',
      accept: 'Accept',
      reject: 'Opt out of ads',
    },
  },
  UT: {
    code: 'UT',
    name: 'Utah',
    law: 'UCPA',
    effective: 'Dec 31, 2023',
    summary: 'Opt-out of sale and targeted advertising with a lighter assessment burden than Virginia or Colorado.',
    cookie: 'Offer opt-out of targeted advertising cookies and disclose collection in the privacy notice.',
    banner: {
      law: 'Utah CPA',
      title: 'Privacy notice',
      message:
        'Utah residents can opt out of the sale of personal data and targeted advertising. Review cookie use or continue.',
      accept: 'Accept',
      reject: 'Opt out',
    },
  },
  IA: {
    code: 'IA',
    name: 'Iowa',
    law: 'ICDPA',
    effective: 'Jan 1, 2025',
    summary: 'Access, deletion, and opt-out of sale and targeted advertising for Iowa consumers.',
    cookie: 'Disclose advertising cookies and provide an opt-out of targeted advertising.',
    banner: {
      law: 'Iowa CDPA',
      title: 'We use cookies',
      message:
        'Iowa residents can opt out of targeted advertising and the sale of personal data collected through cookies.',
      accept: 'Accept',
      reject: 'Opt out',
    },
  },
  IN: {
    code: 'IN',
    name: 'Indiana',
    law: 'ICDPA',
    effective: 'Jan 1, 2026',
    summary: 'Virginia-style rights: access, correction, deletion, portability, and opt-out of targeted advertising.',
    cookie: 'Provide targeted-advertising opt-out and a privacy notice that covers cookies.',
    banner: {
      law: 'Indiana CDPA',
      title: 'Privacy choices',
      message:
        'Indiana’s consumer data law lets you opt out of targeted advertising cookies. Set your preference below.',
      accept: 'Accept',
      reject: 'Opt out of ads',
    },
  },
  TN: {
    code: 'TN',
    name: 'Tennessee',
    law: 'TIPA',
    effective: 'Jul 1, 2025',
    summary: 'Tennessee Information Protection Act — consumer rights and opt-out of targeted advertising.',
    cookie: 'Offer opt-out of targeted advertising and disclose cookie categories.',
    banner: {
      law: 'TIPA',
      title: 'Cookie settings',
      message:
        'Tennessee residents can opt out of targeted advertising. Choose how this site uses cookies.',
      accept: 'Accept',
      reject: 'Opt out',
    },
  },
  MT: {
    code: 'MT',
    name: 'Montana',
    law: 'MCDPA',
    effective: 'Oct 1, 2024',
    summary: 'Montana Consumer Data Privacy Act with opt-out of targeted advertising and sale.',
    cookie: 'Honor opt-out of targeted advertising cookies; disclose third-party sharing.',
    banner: {
      law: 'Montana CDPA',
      title: 'Your choices',
      message:
        'Montana residents can opt out of targeted advertising and sale of personal data collected via cookies.',
      accept: 'Accept',
      reject: 'Opt out',
    },
  },
  TX: {
    code: 'TX',
    name: 'Texas',
    law: 'TDPSA',
    effective: 'Jul 1, 2024',
    summary:
      'Texas Data Privacy and Security Act. Broad controller coverage (no revenue threshold) with consumer opt-out rights.',
    cookie: 'Provide opt-out of targeted advertising and sale. Texas has no small-business revenue floor like CCPA.',
    banner: {
      law: 'TDPSA',
      title: 'Privacy rights',
      message:
        'Texas residents can opt out of targeted advertising and the sale of personal data. Manage cookies below.',
      accept: 'Accept',
      reject: 'Opt out',
    },
  },
  OR: {
    code: 'OR',
    name: 'Oregon',
    law: 'OCPA',
    effective: 'Jul 1, 2024',
    summary: 'Oregon Consumer Privacy Act — consumer rights plus a relatively broad definition of personal data.',
    cookie: 'Opt-out of targeted advertising and sale; disclose cookie vendors in the privacy notice.',
    banner: {
      law: 'OCPA',
      title: 'We use cookies',
      message:
        'Oregon residents can opt out of targeted advertising. Review how this site uses cookies or continue.',
      accept: 'Accept',
      reject: 'Opt out of ads',
    },
  },
  DE: {
    code: 'DE',
    name: 'Delaware',
    law: 'DPDPA',
    effective: 'Jan 1, 2025',
    summary: 'Delaware Personal Data Privacy Act with opt-out of targeted advertising and sale.',
    cookie: 'Offer targeted-advertising opt-out and honor opt-out preference signals.',
    banner: {
      law: 'DPDPA',
      title: 'Cookie choices',
      message:
        'Delaware residents can opt out of targeted advertising cookies. Set your preference below.',
      accept: 'Accept',
      reject: 'Opt out',
    },
  },
  NJ: {
    code: 'NJ',
    name: 'New Jersey',
    law: 'NJDPA',
    effective: 'Jan 15, 2025',
    summary: 'New Jersey Data Privacy Act — consumer rights and opt-out of targeted advertising, sale, and profiling.',
    cookie: 'Provide opt-out of targeted advertising and sale; disclose cookie purposes.',
    banner: {
      law: 'NJDPA',
      title: 'Privacy choices',
      message:
        'New Jersey residents can opt out of targeted advertising, sale, and certain profiling.',
      accept: 'Accept',
      reject: 'Opt out',
    },
  },
  NH: {
    code: 'NH',
    name: 'New Hampshire',
    law: 'NHPA',
    effective: 'Jan 1, 2025',
    summary: 'New Hampshire Privacy Act with access, deletion, and targeted-advertising opt-out.',
    cookie: 'Disclose advertising cookies and provide an opt-out control.',
    banner: {
      law: 'NHPA',
      title: 'We use cookies',
      message:
        'New Hampshire residents can opt out of targeted advertising. Manage cookies or continue.',
      accept: 'Accept',
      reject: 'Opt out of ads',
    },
  },
  MN: {
    code: 'MN',
    name: 'Minnesota',
    law: 'MCDPA',
    effective: 'Jul 31, 2025',
    summary: 'Minnesota Consumer Data Privacy Act — consumer rights and opt-out of targeted advertising.',
    cookie: 'Offer opt-out of targeted advertising cookies and a privacy notice covering collection.',
    banner: {
      law: 'MCDPA',
      title: 'Privacy notice',
      message:
        'Minnesota residents can opt out of targeted advertising. Choose how this site uses cookies.',
      accept: 'Accept',
      reject: 'Opt out',
    },
  },
  MD: {
    code: 'MD',
    name: 'Maryland',
    law: 'MODPA',
    effective: 'Oct 1, 2025',
    summary: 'Maryland Online Data Privacy Act, including data-minimization rules stricter than many peer statutes.',
    cookie: 'Minimize advertising cookies to disclosed purposes; provide targeted-advertising opt-out.',
    banner: {
      law: 'MODPA',
      title: 'Your privacy',
      message:
        'Maryland residents can opt out of targeted advertising. We collect only what the privacy notice describes.',
      accept: 'Accept',
      reject: 'Opt out of ads',
    },
  },
  NE: {
    code: 'NE',
    name: 'Nebraska',
    law: 'NDPA',
    effective: 'Jan 1, 2025',
    summary: 'Nebraska Data Privacy Act with consumer rights and targeted-advertising opt-out.',
    cookie: 'Provide opt-out of targeted advertising and disclose cookie use.',
    banner: {
      law: 'NDPA',
      title: 'Cookie settings',
      message:
        'Nebraska residents can opt out of targeted advertising cookies. Set your preference below.',
      accept: 'Accept',
      reject: 'Opt out',
    },
  },
  KY: {
    code: 'KY',
    name: 'Kentucky',
    law: 'KCDPA',
    effective: 'Jan 1, 2026',
    summary: 'Kentucky Consumer Data Protection Act — access, deletion, and opt-out of targeted advertising.',
    cookie: 'Offer targeted-advertising opt-out and a privacy notice covering cookies.',
    banner: {
      law: 'KCDPA',
      title: 'Privacy choices',
      message:
        'Kentucky residents can opt out of targeted advertising. Manage how this site uses cookies.',
      accept: 'Accept',
      reject: 'Opt out of ads',
    },
  },
  RI: {
    code: 'RI',
    name: 'Rhode Island',
    law: 'RIDTPA',
    effective: 'Jan 1, 2026',
    summary: 'Rhode Island Data Transparency and Privacy Protection Act with consumer opt-out rights.',
    cookie: 'Disclose cookie vendors and provide opt-out of targeted advertising.',
    banner: {
      law: 'RIDTPA',
      title: 'We use cookies',
      message:
        'Rhode Island residents can opt out of targeted advertising. Review cookie use or continue.',
      accept: 'Accept',
      reject: 'Opt out',
    },
  },
}

/** Approximate cartogram positions (1-indexed CSS grid). */
export const CARTOGRAM: { code: string; name: string; col: number; row: number }[] = [
  { code: 'WA', name: 'Washington', col: 1, row: 2 },
  { code: 'OR', name: 'Oregon', col: 1, row: 3 },
  { code: 'CA', name: 'California', col: 1, row: 4 },
  { code: 'ID', name: 'Idaho', col: 2, row: 2 },
  { code: 'NV', name: 'Nevada', col: 2, row: 3 },
  { code: 'AZ', name: 'Arizona', col: 2, row: 4 },
  { code: 'MT', name: 'Montana', col: 3, row: 2 },
  { code: 'WY', name: 'Wyoming', col: 3, row: 3 },
  { code: 'UT', name: 'Utah', col: 3, row: 4 },
  { code: 'CO', name: 'Colorado', col: 3, row: 5 },
  { code: 'NM', name: 'New Mexico', col: 3, row: 6 },
  { code: 'ND', name: 'North Dakota', col: 4, row: 2 },
  { code: 'SD', name: 'South Dakota', col: 4, row: 3 },
  { code: 'NE', name: 'Nebraska', col: 4, row: 4 },
  { code: 'KS', name: 'Kansas', col: 4, row: 5 },
  { code: 'OK', name: 'Oklahoma', col: 4, row: 6 },
  { code: 'TX', name: 'Texas', col: 4, row: 7 },
  { code: 'MN', name: 'Minnesota', col: 5, row: 2 },
  { code: 'IA', name: 'Iowa', col: 5, row: 3 },
  { code: 'MO', name: 'Missouri', col: 5, row: 4 },
  { code: 'AR', name: 'Arkansas', col: 5, row: 5 },
  { code: 'LA', name: 'Louisiana', col: 5, row: 6 },
  { code: 'WI', name: 'Wisconsin', col: 6, row: 2 },
  { code: 'IL', name: 'Illinois', col: 6, row: 3 },
  { code: 'KY', name: 'Kentucky', col: 6, row: 4 },
  { code: 'TN', name: 'Tennessee', col: 6, row: 5 },
  { code: 'MS', name: 'Mississippi', col: 6, row: 6 },
  { code: 'MI', name: 'Michigan', col: 7, row: 2 },
  { code: 'IN', name: 'Indiana', col: 7, row: 3 },
  { code: 'OH', name: 'Ohio', col: 7, row: 4 },
  { code: 'AL', name: 'Alabama', col: 7, row: 6 },
  { code: 'PA', name: 'Pennsylvania', col: 8, row: 3 },
  { code: 'WV', name: 'West Virginia', col: 8, row: 4 },
  { code: 'NC', name: 'North Carolina', col: 8, row: 5 },
  { code: 'GA', name: 'Georgia', col: 8, row: 6 },
  { code: 'FL', name: 'Florida', col: 8, row: 7 },
  { code: 'NY', name: 'New York', col: 9, row: 3 },
  { code: 'VA', name: 'Virginia', col: 9, row: 4 },
  { code: 'SC', name: 'South Carolina', col: 9, row: 5 },
  { code: 'VT', name: 'Vermont', col: 10, row: 2 },
  { code: 'NJ', name: 'New Jersey', col: 10, row: 4 },
  { code: 'MD', name: 'Maryland', col: 10, row: 5 },
  { code: 'NH', name: 'New Hampshire', col: 11, row: 2 },
  { code: 'CT', name: 'Connecticut', col: 11, row: 3 },
  { code: 'DE', name: 'Delaware', col: 11, row: 4 },
  { code: 'ME', name: 'Maine', col: 12, row: 1 },
  { code: 'MA', name: 'Massachusetts', col: 12, row: 2 },
  { code: 'RI', name: 'Rhode Island', col: 12, row: 3 },
  { code: 'AK', name: 'Alaska', col: 1, row: 8 },
  { code: 'HI', name: 'Hawaii', col: 2, row: 8 },
]

export const FEATURED_CODES = ['CA', 'VA', 'CO', 'CT', 'TX', 'OR'] as const

export function bannerFor(code: string): BannerPreview {
  return LAW_STATES[code]?.banner ?? US_DEFAULT_BANNER
}

export function lawFor(code: string) {
  return LAW_STATES[code] ?? null
}

export const FAQ_US = [
  {
    question: 'Do I need a cookie banner for a US website?',
    answer:
      'If you sell to California residents and meet CCPA thresholds (over $25 million revenue, buy/sell data of 100,000+ consumers, or derive 50%+ of revenue from selling personal information), you need a “Do Not Sell or Share” mechanism and a clear privacy notice. Many other states now require an opt-out of targeted advertising even if you are under the California thresholds. A geo-aware banner is the practical way to cover visitors from every state.',
  },
  {
    question: 'Is US cookie consent opt-in or opt-out?',
    answer:
      'Opt-out for most US state laws. Unlike GDPR, you can set non-essential cookies by default for US traffic, but you must offer a clear way to opt out of sale, sharing, and targeted advertising — and you must honor Global Privacy Control. Children under 13 still need COPPA parental consent; California requires opt-in to sale/sharing for ages 13–15.',
  },
  {
    question: 'What does “Do Not Sell My Personal Information” actually mean for cookies?',
    answer:
      'Under CCPA/CPRA, “sale” and “sharing” include making personal information available to third parties for cross-context advertising — which is how most ad cookies and pixels work. The banner must let California residents opt out, and the site must stop those disclosures. Our CCPA template ships with a “Do Not Sell My Info” action and a privacy-rights footer link.',
  },
  {
    question: 'Do you honor Global Privacy Control (GPC)?',
    answer:
      'Yes. California, Colorado, and several other states treat a GPC signal as a valid opt-out. When the banner sees GPC, marketing cookies stay blocked. That is the US-specific equivalent of “the browser already answered.”',
  },
  {
    question: 'Can the banner detect California (or other state) visitors?',
    answer:
      'Yes. Pro includes geo-targeting so California visitors see CCPA copy and “Do Not Sell,” while EU visitors see GDPR opt-in and Canadian visitors see PIPEDA / Law 25. One snippet, the right framework for the person in front of the screen.',
  },
  {
    question: 'How is this different from a GDPR cookie banner?',
    answer:
      'GDPR requires prior opt-in for non-essential cookies. US state laws are mostly opt-out, with “Do Not Sell or Share,” targeted-advertising opt-out, and GPC. Using a European consent popup on a US store both over-blocks advertising and still misses the California-specific link. Switch the framework and we rewrite the legal copy and the behaviour.',
  },
  {
    question: 'Is the US cookie banner free?',
    answer:
      'Yes. The free plan includes CCPA copy, cookie categories, consent logging, and a “Do Not Sell” control. No credit card. Pro is $99 one-time for unlimited banners, geo-targeting, hosted policies, and no “powered by” badge.',
  },
  {
    question: 'What about COPPA, HIPAA, or GLBA?',
    answer:
      'Those are sector rules, not general cookie statutes. COPPA still applies if your site is directed at children under 13. HIPAA and GLBA apply to health and financial entities on top of state privacy laws. The banner handles the cookie layer; it is not a substitute for a BA agreement or a GLBA privacy notice.',
  },
]

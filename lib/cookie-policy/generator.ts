import type { CookieDetail, PrivacyPolicyInputs } from '@/types'

export interface CookiePolicyInputs {
  businessName: string
  websiteUrl: string
  contactEmail: string
  country: string
  province?: string
  logoUrl?: string
  cookies: CookieDetail[]
  cookieCategories: string[]
  thirdPartyServices: string[]
  jurisdictions?: string[]
  language?: 'en' | 'fr'
}

export interface CookiePolicyOutput {
  contentHtml: string
  metadata: {
    generatedAt: string
    businessName: string
    jurisdictions: string[]
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const CATEGORY_LABELS: Record<string, string> = {
  necessary: 'Strictly necessary',
  functional: 'Functional',
  analytics: 'Analytics',
  marketing: 'Marketing',
  social_media: 'Social media',
}

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  necessary:
    'Required for the website to function — they enable core features such as security, network management, and accessibility. These cookies are set without consent because the site cannot operate without them.',
  functional:
    'Allow the site to remember choices you make (such as language or region) and provide enhanced, personalised features.',
  analytics:
    'Help us understand how visitors interact with the site by collecting and reporting information anonymously.',
  marketing:
    'Used to track visitors across websites to display advertisements that are relevant and engaging.',
  social_media:
    'Set by social media services we have added to the site to enable you to share our content with your network.',
}

const SERVICE_LABELS: Record<string, { label: string; policy: string }> = {
  google_analytics: { label: 'Google Analytics', policy: 'https://policies.google.com/privacy' },
  google_ads: { label: 'Google Ads', policy: 'https://policies.google.com/privacy' },
  facebook_pixel: { label: 'Meta Pixel', policy: 'https://www.facebook.com/privacy/policy' },
  stripe: { label: 'Stripe', policy: 'https://stripe.com/privacy' },
  mailchimp: { label: 'Mailchimp', policy: 'https://www.intuit.com/privacy/statement/' },
  hubspot: { label: 'HubSpot', policy: 'https://legal.hubspot.com/privacy-policy' },
  intercom: { label: 'Intercom', policy: 'https://www.intercom.com/legal/privacy' },
  hotjar: { label: 'Hotjar', policy: 'https://www.hotjar.com/legal/policies/privacy/' },
  linkedin: { label: 'LinkedIn', policy: 'https://www.linkedin.com/legal/privacy-policy' },
  twitter_x: { label: 'Twitter / X', policy: 'https://twitter.com/en/privacy' },
  tiktok: { label: 'TikTok', policy: 'https://www.tiktok.com/legal/privacy-policy' },
  shopify: { label: 'Shopify', policy: 'https://www.shopify.com/legal/privacy' },
  wordpress_plugins: { label: 'WordPress plugins', policy: 'https://wordpress.org/about/privacy/' },
}

function renderCookieTable(cookies: CookieDetail[]): string {
  if (cookies.length === 0) return ''
  const rows = cookies
    .map(
      (c) =>
        `<tr><td><code>${escapeHtml(c.name)}</code></td><td>${escapeHtml(c.provider || '—')}</td><td>${escapeHtml(CATEGORY_LABELS[c.category] || c.category)}</td><td>${escapeHtml(c.duration || '—')}</td><td>${escapeHtml(c.purpose || '—')}</td></tr>`,
    )
    .join('\n')
  return `
<table class="cookie-table" style="width:100%;border-collapse:collapse;margin:1em 0;">
<thead>
<tr><th>Name</th><th>Provider</th><th>Category</th><th>Duration</th><th>Purpose</th></tr>
</thead>
<tbody>
${rows}
</tbody>
</table>`
}

function renderCategoryDescriptions(categories: string[]): string {
  if (categories.length === 0) return ''
  return `
<ul>
${categories
  .map(
    (cat) =>
      `<li><strong>${escapeHtml(CATEGORY_LABELS[cat] || cat)}.</strong> ${escapeHtml(CATEGORY_DESCRIPTIONS[cat] || '')}</li>`,
  )
  .join('\n')}
</ul>`
}

function renderThirdParties(services: string[]): string {
  if (services.length === 0) return ''
  const items = services
    .map((s) => {
      const meta = SERVICE_LABELS[s]
      if (!meta) return `<li>${escapeHtml(s)}</li>`
      return `<li><strong>${escapeHtml(meta.label)}</strong> — <a href="${escapeHtml(meta.policy)}" target="_blank" rel="noopener noreferrer">Privacy policy</a></li>`
    })
    .join('\n')
  return `<ul>${items}</ul>`
}

function jurisdictionNotes(jurisdictions: string[]): string {
  if (jurisdictions.length === 0) return ''
  const parts: string[] = []
  if (jurisdictions.includes('gdpr')) {
    parts.push(
      '<p><strong>GDPR (EU/EEA/UK).</strong> We only set non-essential cookies after you give explicit, opt-in consent through our cookie banner. You can withdraw your consent at any time using the cookie preferences link on our site.</p>',
    )
  }
  if (jurisdictions.includes('ccpa')) {
    parts.push(
      '<p><strong>CCPA / CPRA (California).</strong> You may opt out of the sale or sharing of personal information collected through cookies using the “Do Not Sell or Share My Personal Information” link.</p>',
    )
  }
  if (jurisdictions.includes('pipeda')) {
    parts.push(
      '<p><strong>PIPEDA (Canada).</strong> Where we rely on consent, you may withdraw it at any time by contacting us at the address below.</p>',
    )
  }
  if (jurisdictions.includes('law25')) {
    parts.push(
      '<p><strong>Law 25 (Quebec).</strong> Cookies that profile or track you are set only after you give express consent. A French-language version of this policy is available on request.</p>',
    )
  }
  return parts.join('\n')
}

export function generateCookiePolicy(inputs: CookiePolicyInputs): CookiePolicyOutput {
  const lastUpdated = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const jurisdictions = inputs.jurisdictions ?? []
  const business = escapeHtml(inputs.businessName)
  const site = escapeHtml(inputs.websiteUrl)
  const email = escapeHtml(inputs.contactEmail)

  const lines: string[] = []

  if (inputs.logoUrl) {
    lines.push(
      `<p><img src="${escapeHtml(inputs.logoUrl)}" alt="${business} logo" style="max-height:64px;" /></p>`,
    )
  }

  lines.push(`<h1>Cookie Policy</h1>`)
  lines.push(`<p><em>Last updated: ${lastUpdated}</em></p>`)
  lines.push(
    `<p>This Cookie Policy explains how ${business} (“we”, “us”, or “our”) uses cookies and similar tracking technologies when you visit <a href="${site}">${site}</a>. It explains what these technologies are, why we use them, and your rights to control our use of them.</p>`,
  )

  lines.push(`<h2>1. What Are Cookies?</h2>`)
  lines.push(
    `<p>Cookies are small text files placed on your device when you visit a website. They are widely used to make sites work, improve performance, and provide information to the site’s owners. Cookies may be set by us (first-party cookies) or by third-party services we use (third-party cookies).</p>`,
  )

  lines.push(`<h2>2. Categories of Cookies We Use</h2>`)
  lines.push(renderCategoryDescriptions(inputs.cookieCategories))

  lines.push(`<h2>3. Cookies Set on This Website</h2>`)
  if (inputs.cookies.length > 0) {
    lines.push(`<p>The table below lists the specific cookies set on our website:</p>`)
    lines.push(renderCookieTable(inputs.cookies))
  } else {
    lines.push(
      `<p>A full list of cookies is maintained inside our cookie preferences panel — open it on any page to see the current cookies and their purposes.</p>`,
    )
  }

  if (inputs.thirdPartyServices.length > 0) {
    lines.push(`<h2>4. Third-Party Services</h2>`)
    lines.push(
      `<p>We use the following third-party services, which may set their own cookies on your device. Their privacy policies govern how they process your information:</p>`,
    )
    lines.push(renderThirdParties(inputs.thirdPartyServices))
  }

  lines.push(`<h2>5. Managing Your Cookie Preferences</h2>`)
  lines.push(
    `<ul>
<li><strong>Our cookie banner.</strong> When you first visit our site, you can accept or reject non-essential cookies. You can change your preferences at any time by clicking the cookie settings icon.</li>
<li><strong>Browser settings.</strong> Most browsers allow you to block or delete cookies through their settings. Note that blocking strictly necessary cookies may affect site functionality.</li>
<li><strong>Opt-out links.</strong> For specific third-party cookies, you can use the opt-out mechanisms listed by the providers above.</li>
</ul>`,
  )

  const notes = jurisdictionNotes(jurisdictions)
  if (notes) {
    lines.push(`<h2>6. Regional Notices</h2>`)
    lines.push(notes)
  }

  lines.push(`<h2>${notes ? '7' : '6'}. Changes to This Cookie Policy</h2>`)
  lines.push(
    `<p>We may update this Cookie Policy from time to time to reflect changes in the cookies we use, changes in technology, or changes in applicable laws. When we make material changes we will update the “Last updated” date above and, where appropriate, notify you through our cookie banner.</p>`,
  )

  lines.push(`<h2>${notes ? '8' : '7'}. Contact Us</h2>`)
  lines.push(
    `<p>If you have questions about our use of cookies, contact us at <a href="mailto:${email}">${email}</a>.</p>`,
  )

  return {
    contentHtml: lines.join('\n'),
    metadata: {
      generatedAt: new Date().toISOString(),
      businessName: inputs.businessName,
      jurisdictions,
    },
  }
}

// Adapter so the cookie-policy form can reuse the privacy-policy inputs shape.
export function inputsToCookiePolicy(inputs: PrivacyPolicyInputs): CookiePolicyInputs {
  return {
    businessName: inputs.businessName,
    websiteUrl: inputs.websiteUrl,
    contactEmail: inputs.contactEmail,
    country: inputs.country,
    province: inputs.province,
    logoUrl: inputs.logoUrl,
    cookies: inputs.cookies ?? [],
    cookieCategories: inputs.cookieCategories,
    thirdPartyServices: inputs.thirdPartyServices,
    jurisdictions: inputs.jurisdictions,
    language: inputs.language,
  }
}

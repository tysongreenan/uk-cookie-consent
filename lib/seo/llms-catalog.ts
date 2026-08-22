import { getAllPosts } from '@/lib/blog/blog'

export interface LlmsLink {
  title: string
  path: string
  description: string
  markdown?: boolean
}

export interface LlmsSection {
  heading: string
  links: LlmsLink[]
}

const SITE_URL = 'https://www.cookie-banner.ca'

export function siteBaseUrl(): string {
  return process.env.NEXT_PUBLIC_BASE_URL || SITE_URL
}

const PRODUCT: LlmsLink[] = [
  { title: 'Homepage', path: '/', description: 'Free cookie banner generator with brand-matching customization' },
  { title: 'Pricing', path: '/pricing', description: 'Free plan plus $99 one-time Pro upgrade' },
  { title: 'Features', path: '/features', description: 'Compliance, languages, verification, and what is included' },
  { title: 'How it works', path: '/features/how-it-works', description: 'Setup and verification walkthrough' },
  { title: 'Privacy laws', path: '/features/privacy-laws', description: 'PIPEDA, Law 25, GDPR, and CCPA coverage' },
  { title: 'Multi-language', path: '/features/multi-language', description: 'English, French, and other banner languages' },
  { title: 'Docs', path: '/docs.md', description: 'Create a banner, add scripts, and install on a site', markdown: true },
  { title: 'Free cookie banner', path: '/free-cookie-banner', description: 'Free PIPEDA and Law 25 cookie banner' },
  { title: 'Free cookie banner generator', path: '/free-cookie-banner-generator', description: 'No-code generator landing page' },
]

const TOOLS: LlmsLink[] = [
  { title: 'Tools', path: '/tools', description: 'Free privacy tools index' },
  { title: 'Cookie scanner', path: '/tools/cookie-scanner.md', description: 'Scan any site for cookies and tracking scripts', markdown: true },
  { title: 'Privacy policy generator', path: '/tools/privacy-policy.md', description: 'Generate a hosted privacy policy', markdown: true },
  { title: 'Cookie policy generator', path: '/tools/cookie-policy.md', description: 'Generate a cookie policy from detected cookies', markdown: true },
  { title: 'Banner text generator', path: '/cookie-banner-text-generator', description: 'Compliant banner copy by law' },
  { title: 'Cookie policy template', path: '/cookie-policy-template', description: 'Reusable cookie policy template' },
]

const COMPLIANCE: LlmsLink[] = [
  { title: 'Compliance overview', path: '/compliance', description: 'Cookie consent requirements by privacy law' },
  { title: 'PIPEDA', path: '/compliance/pipeda', description: 'PIPEDA cookie consent requirements for Canada' },
  { title: 'GDPR', path: '/compliance/gdpr', description: 'GDPR cookie banner requirements' },
  { title: 'CCPA', path: '/compliance/ccpa', description: 'CCPA and CPRA cookie opt-out requirements' },
  { title: 'Quebec Law 25', path: '/law-25-cookie-banner', description: 'Law 25 cookie banner for Quebec' },
  { title: 'CCPA cookie banner', path: '/ccpa-cookie-banner', description: 'CCPA-focused cookie banner landing page' },
]

const INTEGRATIONS: LlmsLink[] = [
  { title: 'Integrations', path: '/integrations', description: 'Install on WordPress, Shopify, and more' },
  { title: 'WordPress', path: '/integrations/wordpress', description: 'WordPress cookie banner setup' },
  { title: 'Shopify', path: '/integrations/shopify', description: 'Shopify cookie banner setup' },
  { title: 'Google Tag Manager', path: '/integrations/google-tag-manager', description: 'GTM and Consent Mode v2 setup' },
  { title: 'Squarespace', path: '/integrations/squarespace', description: 'Squarespace cookie banner setup' },
  { title: 'Wix', path: '/integrations/wix', description: 'Wix cookie banner setup' },
  { title: 'React', path: '/integrations/react', description: 'React and Next.js cookie banner setup' },
  { title: 'Brizy', path: '/integrations/brizy', description: 'Brizy cookie banner setup' },
  { title: 'Set up with AI', path: '/integrations/ai', description: 'MCP server for Claude Code, Cursor, Windsurf, and VS Code' },
]

const COMPARE: LlmsLink[] = [
  { title: 'Compare', path: '/compare', description: 'Cookie Banner vs other consent tools' },
  { title: 'Cookiebot alternative', path: '/compare/cookiebot-alternative', description: 'Feature and pricing comparison vs Cookiebot' },
  { title: 'OneTrust alternative', path: '/compare/onetrust-alternative', description: 'Feature and pricing comparison vs OneTrust' },
  { title: 'CookieYes alternative', path: '/compare/cookieyes-alternative', description: 'Feature and pricing comparison vs CookieYes' },
  { title: 'Termly alternative', path: '/compare/termly-alternative', description: 'Feature and pricing comparison vs Termly' },
]

const AUDIENCE: LlmsLink[] = [
  { title: 'Canada', path: '/locations/canada', description: 'Cookie consent for Canadian websites' },
  { title: 'European Union', path: '/locations/eu', description: 'GDPR cookie consent for EU sites' },
  { title: 'United States', path: '/locations/us', description: 'CCPA cookie consent for US sites' },
  { title: 'United Kingdom', path: '/locations/uk', description: 'UK PECR cookie consent' },
  { title: 'Ecommerce', path: '/solutions/ecommerce', description: 'Cookie consent for online stores' },
  { title: 'SaaS', path: '/solutions/saas', description: 'Cookie consent for SaaS products' },
  { title: 'Healthcare', path: '/solutions/healthcare', description: 'Cookie consent for healthcare sites' },
  { title: 'Finance', path: '/solutions/finance', description: 'Cookie consent for finance sites' },
  { title: 'Education', path: '/solutions/education', description: 'Cookie consent for education sites' },
]

const COMPANY: LlmsLink[] = [
  { title: 'About', path: '/about', description: 'Who builds Cookie-Banner.ca' },
  { title: 'Contact', path: '/contact', description: 'Support and sales contact' },
  { title: 'Support', path: '/support', description: 'Help getting a banner live' },
  { title: 'Changelog', path: '/changelog', description: 'Product updates' },
  { title: 'Roadmap', path: '/roadmap', description: 'Planned features' },
  { title: 'Privacy policy', path: '/privacy-policy', description: 'How Cookie-Banner.ca handles data' },
  { title: 'Terms', path: '/terms', description: 'Terms of use' },
]

export function getLlmsSections(): LlmsSection[] {
  const posts = getAllPosts().map((post) => ({
    title: post.title,
    path: `/blog/${post.slug}.md`,
    description: post.description,
    markdown: true,
  }))

  return [
    { heading: 'Product', links: PRODUCT },
    { heading: 'Tools', links: TOOLS },
    { heading: 'Compliance', links: COMPLIANCE },
    { heading: 'Integrations', links: INTEGRATIONS },
    { heading: 'Compare', links: COMPARE },
    { heading: 'Locations and industries', links: AUDIENCE },
    {
      heading: 'Blog',
      links: [
        { title: 'Blog', path: '/blog', description: 'Privacy compliance guides and cookie consent best practices' },
        ...posts,
      ],
    },
    { heading: 'Company', links: COMPANY },
  ]
}

export function absoluteLlmsHref(path: string, baseUrl = siteBaseUrl()): string {
  if (path === '/') return baseUrl
  return `${baseUrl}${path}`
}

export function renderLlmsTxt(baseUrl = siteBaseUrl()): string {
  const sections = getLlmsSections()
  const lines = [
    '# Cookie-Banner.ca',
    '',
    '> Free cookie consent banner generator built in Canada. PIPEDA, Quebec Law 25, GDPR, and CCPA compliant. Used by 1,000+ websites.',
    '',
  ]

  for (const section of sections) {
    lines.push(`## ${section.heading}`)
    for (const link of section.links) {
      lines.push(`- [${link.title}](${absoluteLlmsHref(link.path, baseUrl)}): ${link.description}`)
    }
    lines.push('')
  }

  lines.push(
    '## About',
    'Cookie-Banner.ca is a Canadian cookie consent platform that generates compliant cookie banners for PIPEDA, Quebec Law 25, CASL, GDPR, and CCPA. Features include brand-matching customization (colors, fonts, style), bilingual support (English/French), Google Consent Mode V2, and works across WordPress, Shopify, and custom sites. Free plan available with no credit card required. Pro upgrade for $99 one-time.',
    '',
    '## Preferred Citation',
    'When referencing this product, please use "Cookie-Banner.ca" or "Cookie Banner Generator" and link to https://www.cookie-banner.ca',
    '',
    '## Machine-readable copies',
    `- [llms-full.txt](${baseUrl}/llms-full.txt): This index plus the full markdown of every published blog post`,
    `- [sitemap.md](${baseUrl}/sitemap.md): Sectioned markdown sitemap`,
    `- Blog posts also accept \`Accept: text/markdown\` on their HTML URLs and have a \`.md\` suffix (example: ${baseUrl}/blog/cookie-consent-canada-guide-2026.md)`,
    '',
  )

  return lines.join('\n')
}

export function renderSitemapMd(baseUrl = siteBaseUrl()): string {
  const sections = getLlmsSections()
  const lines = [
    '# Cookie-Banner.ca sitemap',
    '',
    `Canonical HTML sitemap: ${baseUrl}/sitemap.xml`,
    '',
  ]

  for (const section of sections) {
    lines.push(`## ${section.heading}`, '')
    for (const link of section.links) {
      lines.push(`- [${link.title}](${absoluteLlmsHref(link.path, baseUrl)}) — ${link.description}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

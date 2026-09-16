import type { BannerConfig, ComplianceFramework } from '@/types'
import { getBannerTemplate } from '@/lib/banner-templates'
import { hostedInstallSnippet } from '@/lib/install-snippet'
import { addScriptToConfig, emptyScriptBuckets } from '@/lib/developer-scripts'
import type { BuildScriptInput } from '@/lib/script-snippets'
import { sanitizeCssColor, sanitizeImageUrl } from '@/lib/banner-config-security'

export type SiteFramework =
  | 'nextjs'
  | 'react'
  | 'wordpress'
  | 'shopify'
  | 'webflow'
  | 'squarespace'
  | 'wix'
  | 'gtm'
  | 'html'

export const SITE_FRAMEWORKS: SiteFramework[] = [
  'nextjs',
  'react',
  'wordpress',
  'shopify',
  'webflow',
  'squarespace',
  'wix',
  'gtm',
  'html',
]

const COMPLIANCE_ALIASES: Record<string, ComplianceFramework> = {
  pipeda: 'pipeda',
  gdpr: 'gdpr',
  ccpa: 'ccpa',
  law25: 'gdpr',
  'law-25': 'gdpr',
  tcf: 'gdpr',
  custom: 'custom',
}

export function resolveComplianceFramework(value?: string): ComplianceFramework {
  if (!value) return 'pipeda'
  return COMPLIANCE_ALIASES[value.trim().toLowerCase()] || 'pipeda'
}

export function isSiteFramework(value: string): value is SiteFramework {
  return SITE_FRAMEWORKS.includes(value as SiteFramework)
}

export function cloneBannerTemplate(
  framework: ComplianceFramework,
  name: string,
  privacyPolicyUrl?: string
): BannerConfig {
  const template = structuredClone(getBannerTemplate(framework))
  template.name = name
  template.lastUpdated = new Date().toISOString()
  template.scripts = emptyScriptBuckets()
  if (privacyPolicyUrl) {
    template.branding = {
      ...template.branding,
      privacyPolicy: {
        ...template.branding.privacyPolicy,
        url: privacyPolicyUrl,
        required: true,
      },
    }
  }
  return template
}

export function resolveLogoUrl(logoUrl?: string, siteUrl?: string): string {
  if (!logoUrl || typeof logoUrl !== 'string') return ''
  const trimmed = logoUrl.trim()
  const absolute = sanitizeImageUrl(trimmed)
  if (absolute) return absolute
  if (siteUrl && trimmed.startsWith('/')) {
    try {
      return sanitizeImageUrl(new URL(trimmed, siteUrl).href)
    } catch {
      return ''
    }
  }
  return ''
}

export function applyBrandToConfig(
  config: BannerConfig,
  brand: {
    logoUrl?: string
    siteUrl?: string
    colors?: Partial<BannerConfig['colors']>
  }
): BannerConfig {
  const logoUrl = resolveLogoUrl(brand.logoUrl, brand.siteUrl)
  if (logoUrl) {
    config.branding = {
      ...config.branding,
      logo: {
        ...config.branding.logo,
        enabled: true,
        url: logoUrl,
      },
    }
  }

  if (brand.colors) {
    const current = config.colors
    config.colors = {
      ...current,
      background: sanitizeCssColor(brand.colors.background, current.background),
      text: sanitizeCssColor(brand.colors.text, current.text),
      button: sanitizeCssColor(brand.colors.button, current.button),
      buttonText: sanitizeCssColor(brand.colors.buttonText, current.buttonText),
      link: sanitizeCssColor(brand.colors.link, current.link),
    }
    config.theme = 'custom'
  }

  return config
}

export function applyScriptsToConfig(
  config: Record<string, unknown>,
  scripts: BuildScriptInput[],
  planTier: string
) {
  let next = config
  const added = []
  for (const script of scripts) {
    const result = addScriptToConfig(next, script, planTier)
    next = result.config
    added.push({ ...result.added, alreadyPresent: result.alreadyPresent })
  }
  return { config: next, added }
}

export interface InstallInstructions {
  framework: SiteFramework
  file: string
  location: string
  example: string
  after: string
}

export function getInstallInstructions(
  framework: SiteFramework,
  bannerId: string,
  snippet?: string
): InstallInstructions {
  const tag = snippet || hostedInstallSnippet(bannerId)
  const src = `/api/v1/banner.js?id=${bannerId}`

  const after =
    'Remove any raw GA4, GTM, Meta, or other marketing tags from the header so they only load through the banner after consent.'

  switch (framework) {
    case 'nextjs':
      return {
        framework,
        file: 'app/layout.tsx (App Router) or pages/_document.tsx (Pages Router)',
        location: 'Inside <head>, before other third-party scripts',
        example: `import Script from 'next/script'\n\n<Script src="https://www.cookie-banner.ca${src}" strategy="beforeInteractive" />`,
        after,
      }
    case 'react':
      return {
        framework,
        file: 'index.html (Vite) or public/index.html (CRA)',
        location: 'Inside <head>',
        example: tag,
        after,
      }
    case 'wordpress':
      return {
        framework,
        file: 'WPCode / Header & Footer plugin, or the theme header.php',
        location: 'Site-wide header, before </head>',
        example: tag,
        after,
      }
    case 'shopify':
      return {
        framework,
        file: 'theme.liquid',
        location: 'Online Store → Themes → Edit code → theme.liquid, before </head>',
        example: tag,
        after,
      }
    case 'webflow':
      return {
        framework,
        file: 'Project Settings → Custom Code → Head Code',
        location: 'Head Code, then publish the site',
        example: tag,
        after,
      }
    case 'squarespace':
      return {
        framework,
        file: 'Settings → Advanced → Code Injection → Header',
        location: 'Header injection (Business plan or higher)',
        example: tag,
        after,
      }
    case 'wix':
      return {
        framework,
        file: 'Settings → Custom Code',
        location: 'Add to Head, load on all pages',
        example: tag,
        after,
      }
    case 'gtm':
      return {
        framework,
        file: 'Google Tag Manager → New tag → Custom HTML',
        location: 'Fire on All Pages, Consent Initialization or first priority',
        example: tag,
        after,
      }
    default:
      return {
        framework: 'html',
        file: 'your site-wide HTML template',
        location: 'Inside <head>, before other tracking tags',
        example: tag,
        after,
      }
  }
}

export const SETUP_AGENT_HINT =
  'Paste the install snippet in the site header before other tracking tags. Then delete duplicate GA4/GTM/Meta tags from the repo so they only load through the banner after consent. The same snippet delivers the Accessibility Menu once the banner has config.accessibility.enabled; enable it with update_banner({ config: { accessibility: { enabled: true } } }). Sites that keep a different cookie banner can install the menu alone via GET /api/v1/a11y.js?id=BANNER_ID.'

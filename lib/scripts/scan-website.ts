// Orchestrator: tries a headless browser scan first (real cookies, real
// network requests, post-JS DOM). Falls back to the cheerio HTML scan when
// the headless launch fails (e.g., cold-start binary download error) or
// times out, so the public tool never returns a hard failure for a normal
// site.

import { discoverScripts } from '@/lib/scripts/discover'
import { SCRIPT_COOKIE_MAP, resolveCookieDomain, type InferredCookie } from '@/lib/scripts/known-cookies'
import { scanWithBrowser, type HeadlessScanResult, type FrenchLanguageCheck } from '@/lib/scripts/scan-website-headless'
import { classifyCookies, type ClassifiedCookie } from '@/lib/scripts/cookie-classifier'
import type { BannerConfig } from '@/types'

export interface ScannedCookie extends InferredCookie {
  source: string
}

export interface RegulationResult {
  score: number
  grade: string
  issues: string[]
}

export interface ProductRecommendation {
  title: string
  description: string
  settingPath?: string
}

export interface ProductAdvice {
  isOurBanner: boolean
  bannerId?: string
  recommendations: ProductRecommendation[]
}

export interface WebsiteScanResult {
  url: string
  fetchedAt: string
  // `url` is the live URL the headless scanner saw the tracker load from
  // (e.g. https://static.hotjar.com/c/hotjar-1778278.js?sv=7). Carried
  // through so the import-candidates layer can extract vendor IDs and
  // build canonical snippets even when the script wasn't in the raw HTML.
  scriptsDetected: { name: string; category: string; url?: string }[]
  consentBanner: { detected: boolean; vendor: string | null }
  privacyPolicyUrl: string | null
  cookies: ScannedCookie[]
  overallScore: number
  overallGrade: string
  compliance: {
    gdpr: RegulationResult
    pipeda: RegulationResult
    ccpa: RegulationResult
    law25: RegulationResult
  }
  recommendations: { text: string; regulation: string }[]
  warnings: string[]
  note: string
  scanMethod: 'headless' | 'static-html'
  frenchLanguage?: FrenchLanguageCheck
  productAdvice?: ProductAdvice
}

function getGrade(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 65) return 'C'
  if (score >= 50) return 'D'
  return 'F'
}

function clamp(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)))
}

interface ScoringInput {
  cookies: ScannedCookie[]
  scriptsDetected: { name: string; category: string; url?: string }[]
  consentBanner: { detected: boolean; vendor: string | null }
  privacyPolicyUrl: string | null
  frenchLanguage?: FrenchLanguageCheck
}

interface ScoringOutput {
  overallScore: number
  overallGrade: string
  compliance: WebsiteScanResult['compliance']
  recommendations: WebsiteScanResult['recommendations']
}

function scoreCompliance({ cookies, scriptsDetected, consentBanner, privacyPolicyUrl, frenchLanguage }: ScoringInput): ScoringOutput {
  const marketingCount = cookies.filter(c => c.category === 'marketing').length
  const analyticsCount = cookies.filter(c => c.category === 'analytics').length
  const thirdPartyCount = cookies.filter(c => c.thirdParty).length
  const hasBanner = consentBanner.detected
  const hasPolicy = !!privacyPolicyUrl
  const hasTrackingScripts = scriptsDetected.some(
    s => s.category === 'tracking-performance' || s.category === 'targeting-advertising',
  )

  // GDPR — strict opt-in regime. Heavy penalty for tracking without a CMP.
  // Note: the scanner loads the page without clicking the consent banner, so
  // cookies present here were set *before* consent — a real compliance signal.
  // If a CMP is present, cookies that leak through are a lighter issue (the
  // site has a mechanism, it just may not be blocking everything properly).
  const gdprIssues: string[] = []
  let gdpr = 100
  if (!hasBanner) {
    gdpr -= 35
    gdprIssues.push('No consent management platform (CMP) detected — GDPR requires explicit opt-in before non-essential cookies load.')
  }
  if (!hasPolicy) {
    gdpr -= 10
    gdprIssues.push('No privacy or cookie policy link found in the page footer.')
  }
  if (marketingCount > 0) {
    const examples = cookies.filter(c => c.category === 'marketing').slice(0, 3).map(c => c.name).join(', ')
    if (!hasBanner) {
      gdpr -= Math.min(25, marketingCount * 6)
      gdprIssues.push(`${marketingCount} marketing/advertising cookie${marketingCount > 1 ? 's' : ''} set without explicit consent${examples ? ` (e.g., ${examples})` : ''}.`)
    } else {
      gdpr -= Math.min(10, marketingCount * 3)
      gdprIssues.push(`${marketingCount} marketing/advertising cookie${marketingCount > 1 ? 's' : ''} detected before consent was given${examples ? ` (e.g., ${examples})` : ''}. Verify your CMP is configured to block these scripts until the user opts in.`)
    }
  }
  if (analyticsCount > 0 && !hasBanner) {
    gdpr -= Math.min(15, analyticsCount * 4)
    gdprIssues.push('Analytics cookies (e.g., Google Analytics) require prior consent under GDPR — they cannot run by default.')
  }
  if (thirdPartyCount > 0 && !hasBanner) {
    gdprIssues.push(`${thirdPartyCount} third-party cookie${thirdPartyCount > 1 ? 's' : ''} from external domains require granular opt-in.`)
  }

  // PIPEDA — Canadian federal law, meaningful consent + transparency.
  const pipedaIssues: string[] = []
  let pipeda = 100
  if (!hasBanner) {
    pipeda -= 25
    pipedaIssues.push('No consent notice detected — PIPEDA requires meaningful consent before collecting personal data.')
  }
  if (!hasPolicy) {
    pipeda -= 15
    pipedaIssues.push('Privacy policy link not found — PIPEDA requires an accessible policy describing what is collected and why.')
  }
  if (marketingCount > 0 && !hasBanner) {
    pipeda -= Math.min(15, marketingCount * 4)
    pipedaIssues.push('Marketing cookies should be opt-in and disclosed in the privacy policy.')
  }
  if (thirdPartyCount > 0 && !hasPolicy) {
    pipeda -= Math.min(10, thirdPartyCount * 2)
    pipedaIssues.push('Third-party data sharing must be disclosed to users.')
  }

  // CCPA — opt-out regime focused on the "sale" of personal information.
  // Unlike GDPR, having marketing cookies isn't inherently wrong — what
  // matters is whether users can opt out. A consent banner counts as an
  // opt-out mechanism.
  const ccpaIssues: string[] = []
  let ccpa = 100
  if (marketingCount > 0) {
    if (!hasBanner) {
      ccpa -= Math.min(40, marketingCount * 10)
      ccpaIssues.push(`${marketingCount} advertising cookie${marketingCount > 1 ? 's' : ''} likely constitute a "sale" or "sharing" of personal information under CCPA.`)
      ccpaIssues.push('A "Do Not Sell or Share My Personal Information" link or opt-out mechanism is required when ad-tech cookies are present.')
    } else {
      ccpa -= Math.min(10, marketingCount * 3)
      ccpaIssues.push(`${marketingCount} advertising cookie${marketingCount > 1 ? 's' : ''} detected — verify your consent banner includes a clear opt-out for the sale/sharing of personal information.`)
    }
  }
  if (!hasBanner && (marketingCount > 0 || analyticsCount > 0)) {
    ccpa -= 15
    ccpaIssues.push('No opt-out mechanism detected for tracking cookies.')
  }
  if (!hasPolicy) {
    ccpa -= 15
    ccpaIssues.push('Privacy policy must disclose categories of personal information collected.')
  }

  // Quebec Law 25 — strict consent + French language requirement.
  const law25Issues: string[] = []
  let law25 = 100
  if (!hasBanner) {
    law25 -= 30
    law25Issues.push('No consent mechanism detected — Law 25 requires express consent before non-essential cookies.')
  }
  if (marketingCount > 0 || analyticsCount > 0) {
    if (frenchLanguage && frenchLanguage.available) {
      // French support detected — no penalty, but note it for the report
    } else if (frenchLanguage && !frenchLanguage.available) {
      law25 -= 10
      law25Issues.push('No French language version detected — Law 25 requires consent and privacy notices to be available in French for Quebec visitors.')
    } else {
      law25 -= 10
      law25Issues.push('Consent and privacy notices must be available in French for Quebec visitors (could not be verified from a static scan).')
    }
  }
  if (!hasPolicy) {
    law25 -= 15
    law25Issues.push('Privacy policy link not found — required disclosure under Law 25.')
  }

  gdpr = clamp(gdpr)
  pipeda = clamp(pipeda)
  ccpa = clamp(ccpa)
  law25 = clamp(law25)
  const overallScore = clamp((gdpr + pipeda + ccpa + law25) / 4)

  const recommendations: WebsiteScanResult['recommendations'] = []
  if (!hasBanner) {
    recommendations.push({
      text: 'Add a cookie consent banner that blocks non-essential cookies until users opt in. Equal-prominence Accept and Reject buttons are required.',
      regulation: 'GDPR, PIPEDA, Law 25',
    })
  } else if (consentBanner.vendor) {
    recommendations.push({
      text: `${consentBanner.vendor} CMP detected — verify it is configured to block scripts before consent, not just show a notice.`,
      regulation: 'GDPR, Law 25',
    })
  }
  if (marketingCount > 0) {
    recommendations.push({
      text: 'Add a "Do Not Sell or Share My Personal Information" link in your footer to comply with CCPA when advertising cookies are present.',
      regulation: 'CCPA',
    })
  }
  if (!hasPolicy) {
    recommendations.push({
      text: 'Publish a privacy/cookie policy listing every cookie by name, purpose, and duration, and link to it from your footer.',
      regulation: 'GDPR, PIPEDA, CCPA, Law 25',
    })
  }
  if (cookies.some(c => c.name.startsWith('_ga') || c.name.startsWith('_gcl'))) {
    recommendations.push({
      text: 'Implement Google Consent Mode v2 so Analytics and Ads respect user choices automatically.',
      regulation: 'GDPR, CCPA',
    })
  }
  if ((marketingCount > 0 || analyticsCount > 0 || hasTrackingScripts) && (!frenchLanguage || !frenchLanguage.available)) {
    recommendations.push({
      text: 'Provide your privacy policy and cookie notice in French for Quebec visitors.',
      regulation: 'Law 25',
    })
  }
  recommendations.push({
    text: 'Review third-party scripts quarterly — plugins, widgets, and embeds often add tracking without notice.',
    regulation: 'All',
  })

  return {
    overallScore,
    overallGrade: getGrade(overallScore),
    compliance: {
      gdpr: { score: gdpr, grade: getGrade(gdpr), issues: gdprIssues },
      pipeda: { score: pipeda, grade: getGrade(pipeda), issues: pipedaIssues },
      ccpa: { score: ccpa, grade: getGrade(ccpa), issues: ccpaIssues },
      law25: { score: law25, grade: getGrade(law25), issues: law25Issues },
    },
    recommendations,
  }
}

async function fetchBannerConfig(bannerId: string): Promise<BannerConfig | null> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
    if (!supabaseUrl || !supabaseKey) return null

    const { createClient } = await import('@supabase/supabase-js')
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data } = await supabase
      .from('consent_banners')
      .select('config')
      .eq('id', bannerId)
      .single()

    return data?.config as BannerConfig | null
  } catch {
    return null
  }
}

function generateOurBannerAdvice(
  config: BannerConfig,
  cookies: ScannedCookie[],
  frenchLanguage?: FrenchLanguageCheck,
): ProductRecommendation[] {
  const recs: ProductRecommendation[] = []
  const marketingCookies = cookies.filter(c => c.category === 'marketing')
  const analyticsCookies = cookies.filter(c => c.category === 'analytics')

  if (marketingCookies.length > 0) {
    const names = marketingCookies.slice(0, 3).map(c => c.source || c.name).join(', ')
    const hasAdScriptsConfigured = config.scripts?.targetingAdvertising?.length > 0
    if (!hasAdScriptsConfigured) {
      recs.push({
        title: 'Add advertising scripts to Script Manager',
        description: `We detected ${marketingCookies.length} marketing cookie${marketingCookies.length > 1 ? 's' : ''} (${names}) loading before consent. Add these scripts to the "Targeting & Advertising" category in your Script Manager so they're blocked until the user opts in.`,
        settingPath: 'Scripts → Targeting & Advertising',
      })
    } else {
      recs.push({
        title: 'Check script categorization',
        description: `${marketingCookies.length} marketing cookie${marketingCookies.length > 1 ? 's' : ''} (${names}) loaded before consent was given. Verify these scripts are in the "Targeting & Advertising" category and not in "Strictly Necessary."`,
        settingPath: 'Scripts → Targeting & Advertising',
      })
    }
  }

  if (analyticsCookies.length > 0 && !config.advanced?.googleConsentMode) {
    recs.push({
      title: 'Enable Google Consent Mode v2',
      description: 'Analytics cookies were detected before consent. Turn on Google Consent Mode v2 so Google Analytics and Ads respect user choices automatically.',
      settingPath: 'Advanced → Google Consent Mode',
    })
  }

  if (!config.behavior?.gpc?.enabled) {
    recs.push({
      title: 'Enable Global Privacy Control (GPC)',
      description: 'GPC lets your banner automatically respect browser-level opt-out signals required by CCPA and some US state laws.',
      settingPath: 'Behavior → GPC',
    })
  }

  if (!config.behavior?.showRejectButton && config.behavior?.buttonLayout !== 'standard') {
    recs.push({
      title: 'Show the Reject button',
      description: 'GDPR and Law 25 require an equally prominent Reject button. Switch your button layout to "Standard" or enable the Reject button.',
      settingPath: 'Behavior → Button Layout',
    })
  }

  if (config.language !== 'auto' && config.language !== 'fr') {
    const hasQuebecGeoRule = config.geoRules?.some(
      r => r.enabled && r.country === 'CA' && r.region === 'QC' && r.overrides?.language === 'fr'
    )
    if (!hasQuebecGeoRule && (!frenchLanguage || !frenchLanguage.available)) {
      recs.push({
        title: 'Add French language support for Law 25',
        description: 'Quebec\'s Law 25 requires consent notices in French. Set your banner language to "Auto-detect" or add a Quebec geo-rule with French override.',
        settingPath: 'Language → Auto-detect / Geo Rules → Quebec',
      })
    }
  }

  if (!config.branding?.privacyPolicy?.url) {
    recs.push({
      title: 'Link your privacy policy',
      description: 'Add your privacy policy URL in the Branding settings so the banner links to it. Every major privacy law requires this.',
      settingPath: 'Branding → Privacy Policy',
    })
  }

  if (!config.integrations?.tcf?.enabled) {
    recs.push({
      title: 'Consider enabling IAB TCF v2.2',
      description: 'If you run programmatic ads in the EU, enabling TCF ensures your ad partners receive standardized consent signals.',
      settingPath: 'Integrations → TCF',
    })
  }

  if (!config.branding?.footerLink?.enabled) {
    recs.push({
      title: 'Enable the floating cookie settings button',
      description: 'Let returning visitors change their cookie preferences anytime with a persistent settings button — required by some interpretations of GDPR.',
      settingPath: 'Branding → Footer Link',
    })
  }

  if (recs.length === 0) {
    recs.push({
      title: 'Your banner is well configured',
      description: 'No issues detected with your Cookie Banner setup. Keep reviewing your script categories quarterly as you add new integrations.',
    })
  }

  return recs
}

function generateCompetitorAdvice(
  cookies: ScannedCookie[],
  consentBanner: { detected: boolean; vendor: string | null },
  privacyPolicyUrl: string | null,
  frenchLanguage?: FrenchLanguageCheck,
): ProductRecommendation[] {
  const recs: ProductRecommendation[] = []
  const marketingCount = cookies.filter(c => c.category === 'marketing').length
  const analyticsCount = cookies.filter(c => c.category === 'analytics').length
  const hasBanner = consentBanner.detected

  if (!hasBanner) {
    recs.push({
      title: 'Add a consent banner with automatic script blocking',
      description: 'Cookie Banner blocks all non-essential scripts until the user consents — just paste your tracking codes into the Script Manager and the banner handles the rest. Free plan available.',
    })
  } else {
    if (marketingCount > 0) {
      recs.push({
        title: 'Block marketing scripts before consent',
        description: `${marketingCount} advertising cookie${marketingCount > 1 ? 's' : ''} loaded before consent was given. Cookie Banner's Script Manager blocks these automatically until the user opts in — no code changes needed.`,
      })
    }
  }

  if (analyticsCount > 0) {
    recs.push({
      title: 'Built-in Google Consent Mode v2',
      description: 'Cookie Banner includes native Google Consent Mode v2 integration — Google Analytics and Ads automatically respect user choices without extra configuration.',
    })
  }

  if (!frenchLanguage || !frenchLanguage.available) {
    recs.push({
      title: 'Automatic French translations for Law 25',
      description: 'Cookie Banner auto-detects Quebec visitors and displays the consent notice in French — built in, no translation work required. Supports 17 languages total.',
    })
  }

  if (marketingCount > 0) {
    recs.push({
      title: 'GPC & CCPA opt-out built in',
      description: 'Cookie Banner supports Global Privacy Control (GPC) signals and provides automatic opt-out for CCPA — no "Do Not Sell" link configuration needed.',
    })
  }

  recs.push({
    title: 'Geo-targeting for multi-region compliance',
    description: 'Set different consent rules per country and region — strict opt-in for the EU, opt-out for California, French language for Quebec — all from one banner.',
  })

  if (!hasBanner || consentBanner.vendor === 'Custom / Unknown') {
    recs.push({
      title: 'IAB TCF v2.2 for programmatic advertising',
      description: 'Cookie Banner supports IAB Transparency and Consent Framework v2.2 for standardized consent signals to ad partners.',
    })
  }

  return recs
}

function buildFromHeadless(targetUrl: string, headless: HeadlessScanResult, hostname: string, productAdvice?: ProductAdvice): WebsiteScanResult {
  const classified = classifyCookies(headless.cookies, hostname)
  const cookies: ScannedCookie[] = classified.map((c: ClassifiedCookie) => ({
    name: c.name,
    domain: c.domain,
    purpose: c.purpose,
    category: c.category,
    expires: c.expires,
    secure: c.secure,
    httpOnly: c.httpOnly,
    sameSite: c.sameSite,
    thirdParty: c.thirdParty,
    source: c.source,
  }))

  const scriptsDetected = headless.loadedScripts.map(s => ({ name: s.name, category: s.category, url: s.url }))
  const scored = scoreCompliance({
    cookies,
    scriptsDetected,
    consentBanner: headless.consentBanner,
    privacyPolicyUrl: headless.privacyPolicyUrl,
    frenchLanguage: headless.frenchLanguage,
  })

  return {
    url: targetUrl,
    fetchedAt: new Date().toISOString(),
    scriptsDetected,
    consentBanner: headless.consentBanner,
    privacyPolicyUrl: headless.privacyPolicyUrl,
    frenchLanguage: headless.frenchLanguage,
    cookies,
    ...scored,
    warnings: [],
    note: `Cookies and scripts observed directly via a headless browser scan of ${headless.finalUrl}. Sites that block headless browsers or that only load trackers after user interaction may show fewer results.`,
    scanMethod: 'headless',
    productAdvice,
  }
}

async function buildFromCheerio(targetUrl: string, hostname: string): Promise<WebsiteScanResult> {
  const discovery = await discoverScripts(targetUrl)
  const scriptsDetected = discovery.scripts.map(s => ({ name: s.name, category: s.category }))
  // PR #8's discoverScripts returns cmpDetected (string name) and no
  // privacyPolicyUrl — that's the headless path's job. We adapt to the
  // older WebsiteScanResult shape here.
  const consentBanner = discovery.cmpDetected
    ? { detected: true, vendor: discovery.cmpDetected }
    : { detected: false, vendor: null }
  const privacyPolicyUrl = null

  const cookies: ScannedCookie[] = []
  for (const script of discovery.scripts) {
    const mapped = SCRIPT_COOKIE_MAP[script.name]
    if (!mapped) continue
    for (const c of mapped) {
      cookies.push({
        ...c,
        domain: resolveCookieDomain(c.domain, hostname),
        source: script.name,
      })
    }
  }

  const scored = scoreCompliance({ cookies, scriptsDetected, consentBanner, privacyPolicyUrl })

  return {
    url: targetUrl,
    fetchedAt: discovery.fetchedAt,
    scriptsDetected,
    consentBanner,
    privacyPolicyUrl,
    cookies,
    ...scored,
    warnings: discovery.fetchError ? [discovery.fetchError, ...discovery.warnings] : discovery.warnings,
    note: 'Cookie list inferred from tracking scripts found in the page HTML. A static scan cannot observe cookies set at runtime by single-page apps; this is the fallback when a full browser scan is unavailable.',
    scanMethod: 'static-html',
  }
}

export async function scanWebsite(targetUrl: string): Promise<WebsiteScanResult> {
  const hostname = new URL(targetUrl).hostname

  // Try the headless browser scan first — it sees the post-JS world.
  try {
    const headless = await scanWithBrowser(targetUrl)

    let productAdvice: ProductAdvice | undefined
    const isOurBanner = headless.consentBanner.vendor === 'UK Cookie Consent'

    if (isOurBanner && headless.ourBannerId) {
      const config = await fetchBannerConfig(headless.ourBannerId)
      const result = buildFromHeadless(targetUrl, headless, hostname)
      if (config) {
        productAdvice = {
          isOurBanner: true,
          bannerId: headless.ourBannerId,
          recommendations: generateOurBannerAdvice(config, result.cookies, headless.frenchLanguage),
        }
      } else {
        productAdvice = {
          isOurBanner: true,
          bannerId: headless.ourBannerId,
          recommendations: [{
            title: 'Banner configuration not found',
            description: 'We detected your Cookie Banner script but couldn\'t load its configuration. Verify the banner ID in your script tag matches an active banner in your dashboard.',
          }],
        }
      }
      return { ...result, productAdvice }
    }

    const result = buildFromHeadless(targetUrl, headless, hostname)
    productAdvice = {
      isOurBanner: false,
      recommendations: generateCompetitorAdvice(
        result.cookies,
        headless.consentBanner,
        headless.privacyPolicyUrl,
        headless.frenchLanguage,
      ),
    }
    return { ...result, productAdvice }
  } catch (err) {
    console.warn('Headless scan failed, falling back to static HTML scan:', err instanceof Error ? err.message : err)
    const fallback = await buildFromCheerio(targetUrl, hostname)
    fallback.warnings = [
      ...fallback.warnings,
      'Full-browser scan was unavailable; results are based on static HTML only and may miss scripts loaded dynamically.',
    ]
    fallback.productAdvice = {
      isOurBanner: false,
      recommendations: generateCompetitorAdvice(
        fallback.cookies,
        fallback.consentBanner,
        fallback.privacyPolicyUrl,
      ),
    }
    return fallback
  }
}

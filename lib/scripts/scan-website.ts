// Orchestrator: tries a headless browser scan first (real cookies, real
// network requests, post-JS DOM). Falls back to the cheerio HTML scan when
// the headless launch fails (e.g., cold-start binary download error) or
// times out, so the public tool never returns a hard failure for a normal
// site.

import { discoverScripts } from '@/lib/scripts/discover'
import { SCRIPT_COOKIE_MAP, resolveCookieDomain, type InferredCookie } from '@/lib/scripts/known-cookies'
import { scanWithBrowser, type HeadlessScanResult } from '@/lib/scripts/scan-website-headless'
import { classifyCookies, type ClassifiedCookie } from '@/lib/scripts/cookie-classifier'

export interface ScannedCookie extends InferredCookie {
  source: string
}

export interface RegulationResult {
  score: number
  grade: string
  issues: string[]
}

export interface WebsiteScanResult {
  url: string
  fetchedAt: string
  scriptsDetected: { name: string; category: string }[]
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
  scriptsDetected: { name: string; category: string }[]
  consentBanner: { detected: boolean; vendor: string | null }
  privacyPolicyUrl: string | null
}

interface ScoringOutput {
  overallScore: number
  overallGrade: string
  compliance: WebsiteScanResult['compliance']
  recommendations: WebsiteScanResult['recommendations']
}

function scoreCompliance({ cookies, scriptsDetected, consentBanner, privacyPolicyUrl }: ScoringInput): ScoringOutput {
  const marketingCount = cookies.filter(c => c.category === 'marketing').length
  const analyticsCount = cookies.filter(c => c.category === 'analytics').length
  const thirdPartyCount = cookies.filter(c => c.thirdParty).length
  const hasBanner = consentBanner.detected
  const hasPolicy = !!privacyPolicyUrl
  const hasTrackingScripts = scriptsDetected.some(
    s => s.category === 'tracking-performance' || s.category === 'targeting-advertising',
  )

  // GDPR — strict opt-in regime. Heavy penalty for tracking without a CMP.
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
    gdpr -= Math.min(25, marketingCount * 6)
    if (!hasBanner) {
      const examples = cookies.filter(c => c.category === 'marketing').slice(0, 3).map(c => c.name).join(', ')
      gdprIssues.push(`${marketingCount} marketing/advertising cookie${marketingCount > 1 ? 's' : ''} set without explicit consent${examples ? ` (e.g., ${examples})` : ''}.`)
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
  if (thirdPartyCount > 0) {
    pipeda -= Math.min(10, thirdPartyCount * 2)
    if (!hasPolicy) {
      pipedaIssues.push('Third-party data sharing must be disclosed to users.')
    }
  }

  // CCPA — focused on the "sale" of personal information.
  const ccpaIssues: string[] = []
  let ccpa = 100
  if (marketingCount > 0) {
    ccpa -= Math.min(40, marketingCount * 10)
    ccpaIssues.push(`${marketingCount} advertising cookie${marketingCount > 1 ? 's' : ''} likely constitute a "sale" or "sharing" of personal information under CCPA.`)
    ccpaIssues.push('A "Do Not Sell or Share My Personal Information" link is required when ad-tech cookies are present.')
  }
  if (!hasBanner && (marketingCount > 0 || analyticsCount > 0)) {
    ccpa -= 15
    ccpaIssues.push('Opt-out mechanism not detected for tracking cookies.')
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
    law25Issues.push('Consent and privacy notices must be available in French for Quebec visitors (cannot be verified from a single-page scan).')
    law25 -= 10
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
  if (marketingCount > 0 || analyticsCount > 0 || hasTrackingScripts) {
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

function buildFromHeadless(targetUrl: string, headless: HeadlessScanResult, hostname: string): WebsiteScanResult {
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

  const scriptsDetected = headless.loadedScripts.map(s => ({ name: s.name, category: s.category }))
  const scored = scoreCompliance({
    cookies,
    scriptsDetected,
    consentBanner: headless.consentBanner,
    privacyPolicyUrl: headless.privacyPolicyUrl,
  })

  return {
    url: targetUrl,
    fetchedAt: new Date().toISOString(),
    scriptsDetected,
    consentBanner: headless.consentBanner,
    privacyPolicyUrl: headless.privacyPolicyUrl,
    cookies,
    ...scored,
    warnings: [],
    note: `Cookies and scripts observed directly via a headless browser scan of ${headless.finalUrl}. Sites that block headless browsers or that only load trackers after user interaction may show fewer results.`,
    scanMethod: 'headless',
  }
}

async function buildFromCheerio(targetUrl: string, hostname: string): Promise<WebsiteScanResult> {
  const discovery = await discoverScripts(targetUrl)
  const scriptsDetected = discovery.scripts.map(s => ({ name: s.name, category: s.category }))
  const consentBanner = discovery.consentBanner ?? { detected: false, vendor: null }
  const privacyPolicyUrl = discovery.privacyPolicyUrl ?? null

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
    warnings: discovery.warnings,
    note: 'Cookie list inferred from tracking scripts found in the page HTML. A static scan cannot observe cookies set at runtime by single-page apps; this is the fallback when a full browser scan is unavailable.',
    scanMethod: 'static-html',
  }
}

export async function scanWebsite(targetUrl: string): Promise<WebsiteScanResult> {
  const hostname = new URL(targetUrl).hostname

  // Try the headless browser scan first — it sees the post-JS world.
  try {
    const headless = await scanWithBrowser(targetUrl)
    return buildFromHeadless(targetUrl, headless, hostname)
  } catch (err) {
    console.warn('Headless scan failed, falling back to static HTML scan:', err instanceof Error ? err.message : err)
    const fallback = await buildFromCheerio(targetUrl, hostname)
    fallback.warnings = [
      ...fallback.warnings,
      'Full-browser scan was unavailable; results are based on static HTML only and may miss scripts loaded dynamically.',
    ]
    return fallback
  }
}

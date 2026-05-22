// Classifies a real browser cookie (observed by the headless scanner) into
// one of our four banner categories and writes a short human-readable purpose.
//
// Strategy, in order:
//   1. Exact-match against the known-vendor catalog
//   2. Prefix/wildcard pattern match (e.g., `_ga_*`, `intercom-id-*`)
//   3. Domain heuristic (.facebook.com → marketing, .google.com + ad cookie → marketing)
//   4. Default: functional / unknown
//
// We deliberately bias toward "non-essential" for unknown cookies — a false
// positive is fine (just shows up in the report), a false negative would
// hide a tracker that needs consent.

import type { BrowserCookie } from '@/lib/scripts/scan-website-headless'
import type { CookieCategory } from '@/lib/scripts/known-cookies'

export interface ClassifiedCookie {
  name: string
  domain: string
  purpose: string
  category: CookieCategory
  expires: string
  secure: boolean
  httpOnly: boolean
  sameSite: 'Strict' | 'Lax' | 'None'
  thirdParty: boolean
  source: string // Which vendor / pattern matched this cookie.
}

interface CookieRule {
  match: (name: string, domain: string) => boolean
  category: CookieCategory
  purpose: string
  source: string
}

const RULES: CookieRule[] = [
  // ─── Google Analytics ─────────────────────────────────────────────────
  { match: n => n === '_ga', category: 'analytics', purpose: 'Google Analytics — distinguishes unique visitors', source: 'Google Analytics' },
  { match: n => /^_ga_/.test(n), category: 'analytics', purpose: 'Google Analytics 4 — session state per property', source: 'Google Analytics 4' },
  { match: n => n === '_gid', category: 'analytics', purpose: 'Google Analytics — distinguishes users for 24 hours', source: 'Google Analytics' },
  { match: n => n === '_gat' || /^_gat_/.test(n), category: 'analytics', purpose: 'Google Analytics — throttles request rate', source: 'Google Analytics' },
  { match: n => /^__utm[a-z]?$/.test(n), category: 'analytics', purpose: 'Google Analytics (legacy Universal) — visitor tracking', source: 'Google Analytics (Universal)' },

  // ─── Google Ads ──────────────────────────────────────────────────────
  { match: n => n === '_gcl_au' || /^_gcl_/.test(n), category: 'marketing', purpose: 'Google Ads — stores ad-click conversion data', source: 'Google Ads' },
  { match: n => /^_gac_/.test(n), category: 'marketing', purpose: 'Google Ads — campaign attribution', source: 'Google Ads' },
  { match: (n, d) => (n === 'NID' || n === 'IDE' || n === 'DSID') && /\.google\.com|doubleclick\.net/.test(d), category: 'marketing', purpose: 'Google — ad personalization and measurement', source: 'Google Ads' },

  // ─── Meta / Facebook ─────────────────────────────────────────────────
  { match: n => n === '_fbp' || /^_fbp/.test(n), category: 'marketing', purpose: 'Meta Pixel — visit tracking for ad targeting and conversions', source: 'Facebook Pixel' },
  { match: n => n === '_fbc', category: 'marketing', purpose: 'Meta Pixel — click ID for ad attribution', source: 'Facebook Pixel' },
  { match: (n, d) => (n === 'fr' || n === 'sb' || n === 'datr') && /\.facebook\.com/.test(d), category: 'marketing', purpose: 'Meta — ad delivery, measurement, and retargeting', source: 'Facebook Pixel' },

  // ─── Microsoft Clarity ───────────────────────────────────────────────
  { match: n => n === '_clck' || n === '_clsk' || /^_clsk/.test(n), category: 'analytics', purpose: 'Microsoft Clarity — session and user identification', source: 'Microsoft Clarity' },
  { match: (n, d) => n === 'CLID' && /clarity\.ms/.test(d), category: 'analytics', purpose: 'Microsoft Clarity — first-party user identifier', source: 'Microsoft Clarity' },
  { match: n => /^_uet/.test(n) || n === 'MUID', category: 'marketing', purpose: 'Microsoft Ads / Bing — visitor identification for ad attribution', source: 'Microsoft Ads' },

  // ─── Hotjar ──────────────────────────────────────────────────────────
  { match: n => /^_hj/.test(n), category: 'analytics', purpose: 'Hotjar — session recording and heatmap analytics', source: 'Hotjar' },

  // ─── LinkedIn ────────────────────────────────────────────────────────
  { match: n => /^(li_|lidc|bcookie|UserMatchHistory|AnalyticsSyncHistory)$/.test(n) || /^li_/.test(n) || /^lang$/.test(n) === false && /^li_sugr$/.test(n), category: 'marketing', purpose: 'LinkedIn — ad targeting and attribution', source: 'LinkedIn Insight Tag' },
  { match: n => n === 'bcookie' || n === 'lidc' || n === 'UserMatchHistory' || n === 'li_sugr', category: 'marketing', purpose: 'LinkedIn — ad targeting and visitor identification', source: 'LinkedIn Insight Tag' },

  // ─── TikTok ──────────────────────────────────────────────────────────
  { match: n => n === '_ttp' || n === '_tt_enable_cookie' || /^_tt_/.test(n), category: 'marketing', purpose: 'TikTok Pixel — visit tracking for ad targeting', source: 'TikTok Pixel' },

  // ─── Pinterest / Reddit / Snap / X ───────────────────────────────────
  { match: n => n === '_pinterest_ct_ua' || n === '_pinterest_sess' || /^_pin_/.test(n), category: 'marketing', purpose: 'Pinterest — ad targeting and conversion tracking', source: 'Pinterest Tag' },
  { match: n => /^_rdt_/.test(n) || n === 'reddaid', category: 'marketing', purpose: 'Reddit Pixel — ad targeting and attribution', source: 'Reddit Pixel' },
  { match: n => /^_scid/.test(n) || n === 'sc_at', category: 'marketing', purpose: 'Snap Pixel — ad targeting and attribution', source: 'Snap Pixel' },
  { match: n => /^personalization_id$/.test(n) || /^guest_id/.test(n), category: 'marketing', purpose: 'X/Twitter — ad personalization and measurement', source: 'Twitter/X Pixel' },

  // ─── Customer support / chat ─────────────────────────────────────────
  { match: n => /^intercom-/.test(n), category: 'functional', purpose: 'Intercom — chat widget session and identification', source: 'Intercom' },
  { match: n => n === '__zlcmid' || /^_zendesk/.test(n), category: 'functional', purpose: 'Zendesk — chat widget state', source: 'Zendesk' },
  { match: n => /^drift_/.test(n) || n === 'driftt_aid', category: 'functional', purpose: 'Drift — chat widget session', source: 'Drift' },
  { match: n => /^_hsq|^hubspotutk$|^__hssc$|^__hssrc$|^__hstc$/.test(n), category: 'marketing', purpose: 'HubSpot — visitor tracking and marketing automation', source: 'HubSpot' },

  // ─── Other analytics ─────────────────────────────────────────────────
  { match: n => /^_mkto_trk/.test(n), category: 'marketing', purpose: 'Marketo — marketing automation tracking', source: 'Marketo' },
  { match: n => /^ajs_/.test(n), category: 'analytics', purpose: 'Segment — visitor tracking', source: 'Segment' },
  { match: n => /^mp_/.test(n), category: 'analytics', purpose: 'Mixpanel — product analytics', source: 'Mixpanel' },
  { match: n => /^amplitude_/.test(n) || /^amp_/.test(n), category: 'analytics', purpose: 'Amplitude — product analytics', source: 'Amplitude' },
  { match: n => /^_pk_/.test(n), category: 'analytics', purpose: 'Matomo — privacy-focused analytics', source: 'Matomo' },
  { match: n => n === '_dc_gtm' || /^_dc_gtm_/.test(n), category: 'analytics', purpose: 'Google Tag Manager — container load tracking', source: 'Google Tag Manager' },

  // ─── Payments & infrastructure (usually necessary) ───────────────────
  { match: n => /^__stripe/.test(n), category: 'necessary', purpose: 'Stripe — fraud detection and payment session', source: 'Stripe' },
  { match: n => /^__cf_bm$|^cf_clearance$|^__cflb$/.test(n), category: 'necessary', purpose: 'Cloudflare — bot management and security', source: 'Cloudflare' },
  { match: n => /^_csrf|^csrftoken|^XSRF-TOKEN|^csrf_token$/.test(n), category: 'necessary', purpose: 'CSRF protection — prevents cross-site request forgery', source: 'Site security' },
  { match: n => /^session|^sessionid|^PHPSESSID|^JSESSIONID|^connect\.sid$/.test(n), category: 'necessary', purpose: 'Session management — keeps users logged in', source: 'Site auth' },

  // ─── Common CMP cookies (necessary by definition) ────────────────────
  { match: n => /^CookieConsent$|^cookie_consent|^cookieyes-consent|^OptanonConsent$|^OptanonAlertBoxClosed$|^euconsent|^didomi_token|^consent$|^cmplz_/.test(n), category: 'necessary', purpose: 'Consent management — stores the user\'s cookie preferences', source: 'Consent banner' },
]

function formatExpires(expires: number): string {
  if (expires === -1 || expires === 0) return 'Session'
  const now = Date.now() / 1000
  const seconds = expires - now
  if (seconds < 0) return 'Expired'
  const days = seconds / 86400
  if (days < 1) return `${Math.round(seconds / 3600)} hours`
  if (days < 60) return `${Math.round(days)} days`
  const months = days / 30
  if (months < 18) return `${Math.round(months)} months`
  return `${Math.round(days / 365)} year${Math.round(days / 365) > 1 ? 's' : ''}`
}

export function classifyCookie(cookie: BrowserCookie, siteHostname: string): ClassifiedCookie {
  const siteHost = siteHostname.replace(/^www\./, '')
  const cookieDomain = cookie.domain.replace(/^\./, '')
  const thirdParty = !cookieDomain.endsWith(siteHost)

  const rule = RULES.find(r => r.match(cookie.name, cookie.domain))

  if (rule) {
    return {
      name: cookie.name,
      domain: cookie.domain,
      purpose: rule.purpose,
      category: rule.category,
      expires: formatExpires(cookie.expires),
      secure: cookie.secure,
      httpOnly: cookie.httpOnly,
      sameSite: cookie.sameSite,
      thirdParty,
      source: rule.source,
    }
  }

  // Unknown cookie — bias toward non-essential so it shows up in the report.
  // Third-party unknowns are most likely tracking; first-party unknowns are
  // most likely site functionality.
  const fallbackCategory: CookieCategory = thirdParty ? 'marketing' : 'functional'
  return {
    name: cookie.name,
    domain: cookie.domain,
    purpose: thirdParty
      ? 'Third-party cookie — purpose not in our catalog. Verify with the cookie\'s owner.'
      : 'First-party cookie — likely site functionality (auth, preferences, UI state).',
    category: fallbackCategory,
    expires: formatExpires(cookie.expires),
    secure: cookie.secure,
    httpOnly: cookie.httpOnly,
    sameSite: cookie.sameSite,
    thirdParty,
    source: 'Unknown',
  }
}

export function classifyCookies(cookies: BrowserCookie[], siteHostname: string): ClassifiedCookie[] {
  return cookies.map(c => classifyCookie(c, siteHostname))
}

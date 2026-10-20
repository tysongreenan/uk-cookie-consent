// Builds the list of first-party cookies the banner should delete when a visitor
// declines (or later turns off) a consent category. Used by banner-generator when
// behavior.cookieCleanup is on.
//
// Sources, per category:
// 1. Cookie names the customer listed as entries with no script code (e.g. "_ga", "BVBRANDID").
// 2. Known first-party cookies for common tools, detected from each script's name + code.
// Strictly necessary names and our own consent cookies are never included.

export type CleanupCategory = 'functionality' | 'analytics' | 'marketing'
export type CookieCleanupMap = Record<CleanupCategory, string[]>

// Patterns ending in * match by prefix.
// Matched against script name + code. Anchored on tracking URLs/calls and specific product
// names so widgets like "Bing Maps" or "Twitter embed" don't trigger deletions.
const VENDORS: { match: RegExp; cookies: string[] }[] = [
  { match: /\bgoogle analytics\b|gtag\(|googletagmanager\.com\/gtag|google-analytics\.com|\bG-[A-Z0-9]{6,}\b|\bUA-\d+-\d+\b/i,
    cookies: ['_ga', '_ga_*', '_gid', '_gat', '_gat_*', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'] },
  // GTM usually fires GA; if GTM's category is declined, GA can't have legitimately set cookies.
  { match: /\bgoogle tag manager\b|googletagmanager\.com\/gtm\.js|\bGTM-[A-Z0-9]{4,}\b/i, cookies: ['_ga', '_ga_*', '_gid', '_gat', '_gat_*'] },
  { match: /\bgoogle ads\b|googleadservices\.com|\bAW-\d+\b/i, cookies: ['_gcl_au', '_gcl_aw', '_gcl_dc', '_gcl_gb'] },
  { match: /\b(facebook|meta) pixel\b|fbevents\.js|fbq\(/i, cookies: ['_fbp', '_fbc'] },
  { match: /\bmicrosoft clarity\b|clarity\.ms/i, cookies: ['_clck', '_clsk'] },
  { match: /\bhotjar\b|static\.hotjar\.com/i, cookies: ['_hjSession*', '_hjFirstSeen', '_hjIncludedInSessionSample*', '_hjAbsoluteSessionInProgress'] },
  { match: /\btiktok pixel\b|analytics\.tiktok\.com|ttq\.(load|page|track)/i, cookies: ['_ttp', '_tt_enable_cookie'] },
  { match: /\blinkedin insight\b|snap\.licdn\.com|_linkedin_partner_id/i, cookies: ['li_fat_id', 'li_giant'] },
  { match: /\bmicrosoft (advertising|ads)\b|\bbing ads\b|bat\.bing\.com|uetq/i, cookies: ['_uetsid', '_uetvid', '_uetmsclkid'] },
  { match: /\bpinterest tag\b|s\.pinimg\.com\/ct|pintrk\(/i, cookies: ['_pin_unauth', '_pinterest_ct_ua', '_epik'] },
  { match: /\bhubspot (tracking|analytics)\b|js\.hs-scripts\.com|js\.hs-analytics\.net/i, cookies: ['__hstc', '__hssc', '__hssrc', 'hubspotutk'] },
  { match: /\breddit pixel\b|rdt\(/i, cookies: ['_rdt_uuid', '_rdt_cid'] },
  { match: /\bsnap(chat)? pixel\b|snaptr\(|sc-static\.net\/scevent/i, cookies: ['_scid', '_scid_r', '_sctr'] },
  { match: /\b(twitter|x) pixel\b|twq\(|static\.ads-twitter\.com/i, cookies: ['_twclid', 'muc_ads'] },
]

// Our own cookies, never deleted.
const PROTECTED = ['cookie_consent', 'euconsent-v2', 'cb_*']

const COOKIE_NAME_RE = /^[A-Za-z0-9_\-.$]+\*?$/

type ScriptEntry = { name?: string; scriptCode?: string; enabled?: boolean }

function isCookieName(s: string | undefined): s is string {
  return !!s && s.length <= 100 && COOKIE_NAME_RE.test(s.trim())
}

function patternsFor(entries: ScriptEntry[] | undefined): string[] {
  const out = new Set<string>()
  for (const e of entries || []) {
    if (!e || e.enabled === false) continue
    const name = (e.name || '').trim()
    const code = e.scriptCode || ''
    // Entries with no code are how customers list cookie names.
    if (!code.trim() && isCookieName(name)) out.add(name)
    const haystack = `${name}\n${code}`
    for (const v of VENDORS) if (v.match.test(haystack)) v.cookies.forEach((c) => out.add(c))
  }
  return Array.from(out)
}

export function matchesCookiePattern(cookieName: string, pattern: string): boolean {
  return pattern.endsWith('*') ? cookieName.startsWith(pattern.slice(0, -1)) : cookieName === pattern
}

export function buildCookieCleanupMap(config: any): { map: CookieCleanupMap; protectedNames: string[] } {
  const scripts = config?.scripts || {}
  const strict = (scripts.strictlyNecessary || [])
    .map((e: ScriptEntry) => (e?.name || '').trim())
    .filter(isCookieName)
  const protectedNames = Array.from(new Set([...PROTECTED, ...strict]))

  const analytics = patternsFor(scripts.trackingPerformance)
  // The built-in GA4 integration loads gtag on analytics consent.
  if (config?.integrations?.googleAnalytics?.enabled) {
    VENDORS[0].cookies.forEach((c) => { if (!analytics.includes(c)) analytics.push(c) })
  }

  // A pattern that would also hit a protected cookie is dropped entirely (safer to keep a cookie).
  const safe = (list: string[]) =>
    list.filter((pat) => !protectedNames.some((p) => matchesCookiePattern(p.replace(/\*$/, ''), pat) || matchesCookiePattern(pat.replace(/\*$/, ''), p)))

  return {
    map: {
      functionality: safe(patternsFor(scripts.functionality)),
      analytics: safe(analytics),
      marketing: safe(patternsFor(scripts.targetingAdvertising)),
    },
    protectedNames,
  }
}

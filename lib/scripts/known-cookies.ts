// Mapping from detected tracking scripts to the cookies they typically set.
// Used by the public website scanner to infer a cookie inventory from the
// scripts found on a page. The fetch is server-side HTML only, so we cannot
// observe real browser cookies — these are the well-documented defaults each
// vendor drops once their script runs.

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'functional'

export interface InferredCookie {
  name: string
  domain: string // "self" → use the scanned site's domain; otherwise the literal third-party domain
  purpose: string
  category: CookieCategory
  expires: string
  secure: boolean
  httpOnly: boolean
  sameSite: 'Strict' | 'Lax' | 'None'
  thirdParty: boolean
}

// Keyed by the `name` field returned by lib/scripts/discover.ts patterns.
export const SCRIPT_COOKIE_MAP: Record<string, InferredCookie[]> = {
  'Google Analytics 4': [
    { name: '_ga', domain: 'self', purpose: 'Google Analytics — distinguishes unique visitors', category: 'analytics', expires: '2 years', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: '_ga_*', domain: 'self', purpose: 'Google Analytics 4 — stores session state per property', category: 'analytics', expires: '2 years', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
  ],
  'Google Analytics (Universal)': [
    { name: '_ga', domain: 'self', purpose: 'Google Analytics — distinguishes unique visitors', category: 'analytics', expires: '2 years', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: '_gid', domain: 'self', purpose: 'Google Analytics — distinguishes users for 24 hours', category: 'analytics', expires: '24 hours', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: '_gat', domain: 'self', purpose: 'Google Analytics — throttles request rate', category: 'analytics', expires: '1 minute', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
  ],
  'Google Tag Manager': [
    { name: '_dcid', domain: 'self', purpose: 'Google Tag Manager — container session identifier', category: 'analytics', expires: 'Session', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
  ],
  'Facebook Pixel': [
    { name: '_fbp', domain: 'self', purpose: 'Meta Pixel — tracks visits for ad targeting and conversions', category: 'marketing', expires: '3 months', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: 'fr', domain: '.facebook.com', purpose: 'Meta — ad delivery, measurement, and retargeting', category: 'marketing', expires: '3 months', secure: true, httpOnly: true, sameSite: 'None', thirdParty: true },
  ],
  'Microsoft Clarity': [
    { name: '_clck', domain: 'self', purpose: 'Microsoft Clarity — persists user ID across sessions', category: 'analytics', expires: '1 year', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: '_clsk', domain: 'self', purpose: 'Microsoft Clarity — connects multiple page views into a session', category: 'analytics', expires: '1 day', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: 'CLID', domain: '.clarity.ms', purpose: 'Microsoft Clarity — first-party user identifier', category: 'analytics', expires: '1 year', secure: true, httpOnly: false, sameSite: 'None', thirdParty: true },
  ],
  'Hotjar': [
    { name: '_hjSessionUser_*', domain: 'self', purpose: 'Hotjar — identifies returning visitors', category: 'analytics', expires: '1 year', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: '_hjSession_*', domain: 'self', purpose: 'Hotjar — current session data', category: 'analytics', expires: '30 minutes', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: '_hjAbsoluteSessionInProgress', domain: 'self', purpose: 'Hotjar — detects first session pageview', category: 'analytics', expires: '30 minutes', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
  ],
  'LinkedIn Insight Tag': [
    { name: 'li_sugr', domain: '.linkedin.com', purpose: 'LinkedIn — probabilistic visitor identifier for ad attribution', category: 'marketing', expires: '3 months', secure: true, httpOnly: false, sameSite: 'None', thirdParty: true },
    { name: 'bcookie', domain: '.linkedin.com', purpose: 'LinkedIn — browser identifier for ad tracking', category: 'marketing', expires: '1 year', secure: true, httpOnly: false, sameSite: 'None', thirdParty: true },
    { name: 'lidc', domain: '.linkedin.com', purpose: 'LinkedIn — facilitates data center selection', category: 'marketing', expires: '1 day', secure: true, httpOnly: false, sameSite: 'None', thirdParty: true },
    { name: 'UserMatchHistory', domain: '.linkedin.com', purpose: 'LinkedIn Ads — ID syncs for retargeting', category: 'marketing', expires: '1 month', secure: true, httpOnly: false, sameSite: 'None', thirdParty: true },
  ],
  'TikTok Pixel': [
    { name: '_ttp', domain: 'self', purpose: 'TikTok Pixel — tracks visits for ad targeting', category: 'marketing', expires: '13 months', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: '_tt_enable_cookie', domain: 'self', purpose: 'TikTok Pixel — confirms cookie consent flag', category: 'marketing', expires: '13 months', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
  ],
  'Google Ads': [
    { name: '_gcl_au', domain: 'self', purpose: 'Google Ads — stores ad-click conversion data', category: 'marketing', expires: '3 months', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: '_gcl_aw', domain: 'self', purpose: 'Google Ads — conversion linker for ad clicks', category: 'marketing', expires: '3 months', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: 'NID', domain: '.google.com', purpose: 'Google — ad personalization and preferences', category: 'marketing', expires: '6 months', secure: true, httpOnly: true, sameSite: 'None', thirdParty: true },
  ],
  'Intercom': [
    { name: 'intercom-id-*', domain: 'self', purpose: 'Intercom — anonymous visitor identifier', category: 'functional', expires: '9 months', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: 'intercom-session-*', domain: 'self', purpose: 'Intercom — logged-in messenger session', category: 'functional', expires: '1 week', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
    { name: 'intercom-device-id-*', domain: 'self', purpose: 'Intercom — device identifier for the messenger', category: 'functional', expires: '9 months', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
  ],
  'Zendesk Chat': [
    { name: '__zlcmid', domain: 'self', purpose: 'Zendesk — preserves chat widget state across pages', category: 'functional', expires: '1 year', secure: true, httpOnly: false, sameSite: 'Lax', thirdParty: false },
  ],
}

// Resolves the `domain` placeholder. When the cookie map marks a cookie as
// "self", we substitute the scanned site's hostname so the report displays
// the user's own domain (e.g., `.example.com`) instead of "self".
export function resolveCookieDomain(domainHint: string, siteHostname: string): string {
  if (domainHint === 'self') {
    return `.${siteHostname.replace(/^www\./, '')}`
  }
  return domainHint
}

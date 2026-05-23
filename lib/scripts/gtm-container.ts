// Public GTM container introspection.
//
// When a site is using Google Tag Manager (GTM-XXXXXXX), its container is
// served as a public JS file at https://www.googletagmanager.com/gtm.js?id=GTM-XXX.
// That file references — as string literals — every tag the container is
// configured to fire: GA4 measurement IDs, Universal Analytics IDs, Google
// Ads/Floodlight conversion IDs, Facebook Pixel IDs, etc.
//
// Headless scanning can only see what *actually* fires during a page load
// (subject to consent state, trigger conditions like "only on /checkout",
// and timing). The container introspection gives the *configured* truth —
// what GTM is wired to fire — which is what the user typically wants to
// know when migrating to a new consent banner.
//
// Limitations: container fetch is anonymous and won't include account-level
// data; tags that GTM only loads dynamically from a third-party CDN won't
// appear as IDs. False positives are rare because we look for very specific
// ID shapes (G-, UA-, AW-, DC-, FB-pixel-pattern).

import type { TrackingScript } from '@/types'

const GTM_CONTAINER_TIMEOUT_MS = 8000
const GTM_CONTAINER_MAX_BYTES = 2 * 1024 * 1024

const GTM_FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
  'Accept': '*/*',
  'Accept-Language': 'en-US,en;q=0.9',
}

export interface GtmConfiguredTag {
  name: string
  category: TrackingScript['category']
  vendorId?: string
  scriptCode: string
  bodyCode?: string
  confidence: 'high' | 'medium'
  reason: string
}

export interface GtmContainerResult {
  containerId: string
  fetchedAt: string
  tags: GtmConfiguredTag[]
  warnings: string[]
  fetchError?: string
}

function isLikelyGtmId(id: string): boolean {
  return /^GTM-[A-Z0-9]{4,}$/i.test(id)
}

/**
 * Fetch a GTM container and extract every tracker ID it references as a
 * string literal. Caller is responsible for de-duplicating against tags
 * already detected via other paths.
 */
export async function inspectGtmContainer(containerId: string): Promise<GtmContainerResult> {
  const fetchedAt = new Date().toISOString()
  const tags: GtmConfiguredTag[] = []
  const warnings: string[] = []

  if (!isLikelyGtmId(containerId)) {
    return {
      containerId,
      fetchedAt,
      tags: [],
      warnings: [],
      fetchError: `"${containerId}" is not a valid GTM container ID.`,
    }
  }

  const url = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`

  let text: string
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), GTM_CONTAINER_TIMEOUT_MS)
    try {
      const response = await fetch(url, { headers: GTM_FETCH_HEADERS, signal: controller.signal })
      if (!response.ok) {
        return {
          containerId,
          fetchedAt,
          tags: [],
          warnings: [],
          fetchError: `Failed to fetch GTM container ${containerId} (HTTP ${response.status}). The container may be private or use server-side delivery.`,
        }
      }
      const buf = await response.arrayBuffer()
      if (buf.byteLength > GTM_CONTAINER_MAX_BYTES) {
        return {
          containerId,
          fetchedAt,
          tags: [],
          warnings: [`GTM container ${containerId} exceeded ${GTM_CONTAINER_MAX_BYTES} bytes; skipping parse.`],
        }
      }
      text = new TextDecoder('utf-8').decode(buf)
    } finally {
      clearTimeout(timeout)
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return {
      containerId,
      fetchedAt,
      tags: [],
      warnings: [],
      fetchError: `Couldn't fetch GTM container ${containerId}: ${message}`,
    }
  }

  // --- GA4 measurement IDs (G-XXXXXXX) ---
  for (const id of uniqueMatches(text, /\bG-[A-Z0-9]{6,}\b/g)) {
    tags.push({
      name: 'Google Analytics 4',
      category: 'tracking-performance',
      vendorId: id,
      confidence: 'high',
      reason: `Found GA4 measurement ID ${id} as a string literal inside the GTM container.`,
      scriptCode: `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
</script>`,
    })
  }

  // --- Universal Analytics (legacy) IDs (UA-XXXXXX-X) ---
  for (const id of uniqueMatches(text, /\bUA-\d{4,}-\d+\b/g)) {
    tags.push({
      name: 'Google Analytics (Universal)',
      category: 'tracking-performance',
      vendorId: id,
      confidence: 'medium',
      reason: `Found Universal Analytics ID ${id} inside the GTM container. Universal Analytics was sunset in 2023 — this tag may no longer collect data.`,
      scriptCode: `<script async src="https://www.google-analytics.com/analytics.js"></script>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', '${id}', 'auto');
  ga('send', 'pageview');
</script>`,
    })
  }

  // --- Google Ads conversion IDs (AW-XXXXXXXXXX) ---
  for (const id of uniqueMatches(text, /\bAW-\d{6,}\b/g)) {
    tags.push({
      name: 'Google Ads',
      category: 'targeting-advertising',
      vendorId: id,
      confidence: 'high',
      reason: `Found Google Ads conversion ID ${id} inside the GTM container.`,
      scriptCode: `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
</script>`,
    })
  }

  // --- Floodlight / Campaign Manager 360 (DC-XXXXXXXX) ---
  // We deliberately only emit ONE Floodlight entry even if multiple IDs are
  // present — they're typically variants of the same advertiser config and
  // users don't need to manage them as separate banner entries.
  const floodlightIds = uniqueMatches(text, /\bDC-\d{4,}\b/g)
  if (floodlightIds.length > 0) {
    tags.push({
      name: 'Floodlight / Campaign Manager 360',
      category: 'targeting-advertising',
      vendorId: floodlightIds[0],
      confidence: 'high',
      reason: `Found Floodlight tag${floodlightIds.length > 1 ? 's' : ''} ${floodlightIds.join(', ')} inside the GTM container.`,
      scriptCode: `<!-- Floodlight tag managed via GTM container ${containerId}. The tag is configured for ${floodlightIds.length} advertiser ID${floodlightIds.length === 1 ? '' : 's'}: ${floodlightIds.join(', ')}. Re-publish your GTM container to update. -->`,
    })
  }

  // --- Facebook Pixel ---
  // GTM containers embed pixel IDs as 15-16 digit numeric strings inside
  // template parameter blocks. Heuristic: look for the pixel-init pattern
  // OR connect.facebook.net references combined with a numeric ID nearby.
  if (/connect\.facebook\.net/i.test(text) || /facebook\.com\/tr/i.test(text)) {
    const pixelIds = uniqueMatches(text, /['"](\d{14,17})['"]/g).filter(id => {
      // Filter out things that look like timestamps or other long numerics
      // that happen to be in the container.
      const n = Number(id)
      // Pixel IDs are 14-17 digits and don't look like JS timestamps.
      return id.length >= 14 && n > 100000000000000
    })
    const pixelId = pixelIds[0]
    if (pixelId) {
      tags.push({
        name: 'Facebook Pixel',
        category: 'targeting-advertising',
        vendorId: pixelId,
        confidence: 'medium',
        reason: `GTM container references Facebook Pixel infrastructure and the likely pixel ID ${pixelId}.`,
        scriptCode: `<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');
</script>`,
      })
    } else {
      tags.push({
        name: 'Facebook Pixel',
        category: 'targeting-advertising',
        confidence: 'medium',
        reason: 'GTM container references Facebook Pixel infrastructure, but the pixel ID could not be extracted automatically.',
        scriptCode: `<!-- Facebook Pixel is configured inside GTM container ${containerId} but the pixel ID could not be auto-extracted. Find it in your Meta Events Manager and paste here. -->`,
      })
    }
  }

  // --- Other vendors mentioned by domain (no extractable IDs from container alone) ---
  const domainMentions: { pattern: RegExp; name: string; category: TrackingScript['category'] }[] = [
    { pattern: /clarity\.ms/i, name: 'Microsoft Clarity', category: 'tracking-performance' },
    { pattern: /static\.hotjar\.com/i, name: 'Hotjar', category: 'tracking-performance' },
    { pattern: /snap\.licdn\.com/i, name: 'LinkedIn Insight Tag', category: 'targeting-advertising' },
    { pattern: /analytics\.tiktok\.com|tr\.tiktok\.com/i, name: 'TikTok Pixel', category: 'targeting-advertising' },
    { pattern: /s\.pinimg\.com\/ct|ct\.pinterest\.com/i, name: 'Pinterest Tag', category: 'targeting-advertising' },
    { pattern: /sc-static\.net\/scevent|tr\.snapchat\.com/i, name: 'Snap Pixel', category: 'targeting-advertising' },
    { pattern: /static\.ads-twitter\.com|analytics\.twitter\.com/i, name: 'Twitter/X Pixel', category: 'targeting-advertising' },
    { pattern: /redditstatic\.com\/ads|events\.redditmedia\.com/i, name: 'Reddit Pixel', category: 'targeting-advertising' },
    { pattern: /bing\.com\/bat|bat\.bing\.com/i, name: 'Microsoft Bing Ads (UET)', category: 'targeting-advertising' },
  ]
  for (const dm of domainMentions) {
    if (dm.pattern.test(text)) {
      tags.push({
        name: dm.name,
        category: dm.category,
        confidence: 'medium',
        reason: `GTM container references the ${dm.name} infrastructure.`,
        scriptCode: `<!-- ${dm.name} is configured inside GTM container ${containerId}. The tag-specific ID could not be auto-extracted; copy the snippet from the vendor and replace this comment. -->`,
      })
    }
  }

  return {
    containerId,
    fetchedAt,
    tags,
    warnings,
  }
}

function uniqueMatches(text: string, pattern: RegExp): string[] {
  // For patterns with a capturing group, prefer the first capture;
  // otherwise return the whole match.
  const re = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g')
  const all = Array.from(text.matchAll(re))
  const captures = all.map(a => a[1] ?? a[0]).filter(Boolean) as string[]
  return Array.from(new Set(captures))
}

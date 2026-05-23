import type { BannerConfig, TrackingScript } from '@/types'
import type { ScannedCookie, WebsiteScanResult } from '@/lib/scripts/scan-website'
import { inspectGtmContainer } from '@/lib/scripts/gtm-container'

export interface ScannerImportCandidate {
  id: string
  name: string
  category: TrackingScript['category']
  scriptCode: string
  bodyCode?: string
  enabled: boolean
  sourceUrl?: string
  detectedVendor?: string
  confidence: 'high' | 'medium' | 'low'
  importWarning?: string
  /** How importWarning should be rendered. 'info' = blue ℹ️ (context, not
   *  an issue), 'warning' = orange triangle (needs attention). Defaults
   *  to 'warning' for backwards compatibility. */
  importNoteType?: 'info' | 'warning'
  /** Set when this candidate is sourced from a tag-manager container
   *  introspection (e.g., GTM-PZHQ5C2). The string is the container ID.
   *  Used to group "already managed by your tag manager" entries in the
   *  import UI. They remain importable for users who are replacing the
   *  tag manager — the grouping is informational, not a filter. */
  managedByTagManager?: string
  duplicate?: boolean
  duplicateReason?: string
}

export interface BuilderScannerResult {
  url: string
  fetchedAt: string
  scanMethod: 'headless' | 'static-html'
  consentBanner: { detected: boolean; vendor: string | null }
  privacyPolicyUrl: string | null
  cookies: ScannedCookie[]
  scripts: ScannerImportCandidate[]
  compliance: WebsiteScanResult['compliance']
  recommendations: WebsiteScanResult['recommendations']
  warnings: string[]
}

const CMP_NAMES = [
  'Cookiebot',
  'OneTrust',
  'Termly',
  'CookieYes',
  'Iubenda',
  'Osano',
  'Quantcast Choice',
  'TrustArc',
  'Usercentrics',
  'Didomi',
  'UK Cookie Consent',
  'Sourcepoint',
  'Complianz',
  'Civic Cookie Control',
]

export function categoryToConfigKey(category: TrackingScript['category']): keyof BannerConfig['scripts'] {
  switch (category) {
    case 'strictly-necessary':
      return 'strictlyNecessary'
    case 'functionality':
      return 'functionality'
    case 'tracking-performance':
      return 'trackingPerformance'
    case 'targeting-advertising':
      return 'targetingAdvertising'
  }
}

export function extractSrc(scriptCode: string): string {
  const raw = scriptCode.match(/src=["']([^"']+)["']/i)?.[1] || ''
  if (!raw) return ''
  // Reject obvious junk pulled out of JS string literals inside bundles.
  // A real script src is one of:
  //   - absolute (http:// or https://)
  //   - protocol-relative (//cdn...)
  //   - root-relative (/path/to/file.js)
  // Anything else (template fragments like "+x+", concatenation pieces,
  // single tokens) is noise from regex-matching inside JS source code.
  if (/^https?:\/\//i.test(raw)) return raw
  if (raw.startsWith('//')) return raw
  if (raw.startsWith('/') && raw.length > 2) return raw
  return ''
}

function extractKnownId(scriptCode: string): string {
  const patterns = [
    /\bGTM-[A-Z0-9]+\b/i,
    /\bG-[A-Z0-9]+\b/i,
    /\bUA-\d+-\d+\b/i,
    /\bAW-\d+\b/i,
    /fbq\(['"]init['"],\s*['"](\d+)['"]\)/i,
    /ttq\.load\(['"]([^'"]+)['"]\)/i,
    /clarity\(['"]init['"],\s*['"]([^'"]+)['"]\)/i,
    /hjid\s*[:=]\s*['"]?(\d+)/i,
  ]

  for (const pattern of patterns) {
    const match = scriptCode.match(pattern)
    if (match) return match[1] || match[0]
  }

  return ''
}

function normalizeCode(scriptCode: string): string {
  return scriptCode.replace(/\s+/g, ' ').trim().toLowerCase()
}

function isCmpScript(script: TrackingScript): boolean {
  return CMP_NAMES.some(name => script.name.toLowerCase().includes(name.toLowerCase()))
}

function inferWarning(script: TrackingScript): string | undefined {
  // GTM ships two install pieces: the JS loader (head) and a <noscript>
  // <iframe> fallback (body) for visitors with JS disabled. We preserve
  // both — but whether the noscript piece reaches the site depends on
  // which install mode the user picks in the Code tab. Explain plainly.
  if (script.name.toLowerCase().includes('google tag manager') && script.bodyCode) {
    return 'GTM noscript iframe is preserved — it appears in the Body Code snippet of your generated install. If you use the one-line Hosted Script instead, only the JS loader is migrated (visitors with JavaScript disabled won\'t be tracked).'
  }

  if (!script.scriptCode.trim()) {
    return 'No importable script code was extracted. Add this script manually if you still need it.'
  }

  if (script.confidence === 'low') {
    return 'Low-confidence detection. Review the script code before importing it.'
  }

  return script.importWarning
}

/**
 * Returns 'info' for purely informational notes (rendered with the blue
 * ℹ️ icon) and undefined for everything else (defaults to the amber
 * triangle treatment, which signals "needs attention").
 */
function inferNoteType(script: TrackingScript): 'info' | 'warning' | undefined {
  if (script.name.toLowerCase().includes('google tag manager') && script.bodyCode) {
    return 'info'
  }
  return undefined
}

function makeFallbackScriptCode(name: string, sourceUrl?: string, existingCode = ''): string {
  if (name === 'Google Analytics 4') {
    const id = sourceUrl?.match(/[?&]id=([^&]+)/)?.[1] || existingCode.match(/\bG-[A-Z0-9]+\b/i)?.[0] || ''
    if (id) {
      return `<script async src="https://www.googletagmanager.com/gtag/js?id=${id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${id}');
</script>`
    }
  }

  if (name === 'Google Tag Manager') {
    const id = sourceUrl?.match(/[?&]id=([^&]+)/)?.[1] || sourceUrl?.match(/\bGTM-[A-Z0-9]+\b/i)?.[0] || existingCode.match(/\bGTM-[A-Z0-9]+\b/i)?.[0] || ''
    if (id) {
      return `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');</script>`
    }
  }

  // Hotjar URL pattern: https://static.hotjar.com/c/hotjar-1778278.js?sv=7
  if (name === 'Hotjar') {
    const id = sourceUrl?.match(/hotjar-(\d+)\.js/i)?.[1] || existingCode.match(/hjid['"]?\s*[:=]\s*['"]?(\d+)/)?.[1] || ''
    if (id) {
      return `<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:${id},hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`
    }
  }

  // Microsoft Clarity URL pattern: https://www.clarity.ms/tag/abcdefgh
  if (name === 'Microsoft Clarity') {
    const id = sourceUrl?.match(/clarity\.ms\/tag\/([a-z0-9]+)/i)?.[1] || existingCode.match(/clarity\(['"]init['"],\s*['"]([^'"]+)['"]/)?.[1] || ''
    if (id) {
      return `<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${id}");
</script>`
    }
  }

  // Facebook Pixel URL pattern: https://connect.facebook.net/en_US/fbevents.js
  // (the pixel ID isn't in the URL — try existingCode for fbq('init', '...')).
  if (name === 'Facebook Pixel') {
    const id = existingCode.match(/fbq\(['"]init['"],\s*['"](\d{10,})['"]\)/)?.[1] || ''
    if (id) {
      return `<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${id}');
fbq('track', 'PageView');
</script>`
    }
    if (sourceUrl) {
      // No pixel ID extractable, but we know FB Pixel is on the site — give
      // the user the loader URL plus a placeholder so they can fill in the ID.
      return `<script async src="${sourceUrl}"></script>
<!-- Replace YOUR_PIXEL_ID with your Meta pixel ID (find it in Events Manager). -->
<script>fbq('init', 'YOUR_PIXEL_ID'); fbq('track', 'PageView');</script>`
    }
  }

  // LinkedIn Insight Tag URL pattern: https://snap.licdn.com/li.lms-analytics/insight.min.js
  // (partner ID isn't in the URL — try existingCode for _linkedin_partner_id).
  if (name === 'LinkedIn Insight Tag') {
    const id = existingCode.match(/_linkedin_partner_id\s*=\s*['"]?(\d+)/)?.[1] || ''
    if (id) {
      return `<script type="text/javascript">
_linkedin_partner_id = "${id}";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);
</script><script type="text/javascript">
(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);
</script>`
    }
  }

  // TikTok Pixel URL pattern: https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=ABCDEF
  if (name === 'TikTok Pixel') {
    const id = sourceUrl?.match(/[?&]sdkid=([^&]+)/)?.[1] || existingCode.match(/ttq\.load\(['"]([^'"]+)['"]\)/)?.[1] || ''
    if (id) {
      return `<script>
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
  ttq.load('${id}');
  ttq.page();
}(window, document, 'ttq');
</script>`
    }
  }

  if (!sourceUrl) return ''

  return `<script src="${sourceUrl}"></script>`
}

export async function toImportCandidates(
  scanResult: WebsiteScanResult,
  discoveredScripts: TrackingScript[] = [],
): Promise<ScannerImportCandidate[]> {
  const candidates = discoveredScripts
    .filter(script => !isCmpScript(script))
    .map(script => {
      const sourceUrl = script.sourceUrl || extractSrc(script.scriptCode)
      const confidence = script.confidence || (extractKnownId(script.scriptCode) ? 'high' : sourceUrl ? 'medium' : 'low')
      const scriptCode = makeFallbackScriptCode(script.name, sourceUrl, script.scriptCode) || script.scriptCode
      const confidenceWithCode = extractKnownId(scriptCode) ? 'high' : confidence

      const ctx = { ...script, scriptCode, confidence: confidenceWithCode }
      return {
        id: script.id,
        name: script.name,
        category: script.category,
        scriptCode,
        bodyCode: script.bodyCode,
        enabled: true,
        sourceUrl,
        detectedVendor: script.detectedVendor || script.name,
        confidence: confidenceWithCode,
        importWarning: inferWarning(ctx),
        importNoteType: inferNoteType(ctx),
      }
    })

  const discoveredNames = new Set(candidates.map(candidate => candidate.name))
  const fallbackCandidates = scanResult.scriptsDetected
    .filter(script => !discoveredNames.has(script.name))
    .filter(script => !CMP_NAMES.some(name => script.name.toLowerCase().includes(name.toLowerCase())))
    .map(script => {
      // Use the live URL the headless scanner captured. If it embeds a
      // vendor ID (Hotjar site ID, Clarity tag, TikTok sdkid, GA4 id, etc.)
      // we can rebuild a canonical loader snippet from it instead of giving
      // the user an empty preview.
      const sourceUrl = script.url
      const builtCode = makeFallbackScriptCode(script.name, sourceUrl)
      // makeFallbackScriptCode returns either a multi-line canonical loader
      // (when it could extract an ID) or just `<script src="${url}"></script>`
      // (when it couldn't). Treat the multi-line case as high-confidence —
      // unless the snippet is a partial template with a YOUR_X placeholder
      // (e.g., FB Pixel when we have the loader URL but not the pixel ID).
      const hasPlaceholder = /YOUR_[A-Z_]+/.test(builtCode)
      const isCanonical =
        builtCode.length > 0
        && !/^<script[^>]*src=[^>]*><\/script>$/.test(builtCode)
        && !hasPlaceholder
      const scriptCode = builtCode || ''
      return {
        id: `headless-${script.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        name: script.name,
        category: script.category as TrackingScript['category'],
        scriptCode,
        enabled: true,
        sourceUrl,
        detectedVendor: script.name,
        confidence: (isCanonical ? 'high' : sourceUrl ? 'medium' : 'low') as 'high' | 'medium' | 'low',
        importWarning: isCanonical
          ? undefined
          : hasPlaceholder
            ? `We detected ${script.name} but couldn't auto-extract the account ID from the page. The snippet below has a placeholder — fill in your ID before saving.`
            : sourceUrl
              ? 'We saw this tag load on your site but couldn\'t auto-extract its account ID. Paste the vendor\'s install snippet to complete the import.'
              : 'Detected in the browser scan, but no importable script code was extracted. Add this manually if you still need it.',
      }
    })

  const base = [...candidates, ...fallbackCandidates]

  // Look for a GTM container ID in any candidate. If we find one, fetch
  // the public container and add what GTM is configured to fire — even if
  // the live scan never observed those tags because consent gated them.
  const gtmIds = new Set<string>()
  for (const c of base) {
    const id = extractKnownId(c.scriptCode) || extractKnownId(c.sourceUrl || '')
    if (id && /^GTM-/i.test(id)) {
      gtmIds.add(id.toUpperCase())
    }
  }

  if (gtmIds.size === 0) {
    return base
  }

  const existingNames = new Set(base.map(c => c.name))
  const gtmConfiguredCandidates: ScannerImportCandidate[] = []

  for (const gtmId of Array.from(gtmIds)) {
    let inspection
    try {
      inspection = await inspectGtmContainer(gtmId)
    } catch {
      continue // Don't fail the scan if GTM introspection fails.
    }

    for (const tag of inspection.tags) {
      if (existingNames.has(tag.name)) continue // Already detected via live scan.
      existingNames.add(tag.name)
      gtmConfiguredCandidates.push({
        id: `gtm-${gtmId.toLowerCase()}-${tag.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        name: tag.name,
        category: tag.category,
        scriptCode: tag.scriptCode,
        bodyCode: tag.bodyCode,
        enabled: true,
        sourceUrl: undefined,
        detectedVendor: `Configured in ${gtmId}`,
        confidence: tag.confidence,
        importWarning: tag.vendorId
          ? `Loaded by ${gtmId} (ID ${tag.vendorId}). Only import if replacing GTM.`
          : `Loaded by ${gtmId}. Only import if replacing GTM.`,
        importNoteType: 'info',
        managedByTagManager: gtmId,
      })
    }
  }

  return [...base, ...gtmConfiguredCandidates]
}

export function dedupeTrackingScripts(
  existing: BannerConfig['scripts'],
  candidates: ScannerImportCandidate[],
): ScannerImportCandidate[] {
  const existingScripts = [
    ...existing.strictlyNecessary,
    ...existing.functionality,
    ...existing.trackingPerformance,
    ...existing.targetingAdvertising,
  ]

  const existingSources = new Set(existingScripts.map(script => extractSrc(script.scriptCode)).filter(Boolean))
  const existingIds = new Set(existingScripts.map(script => extractKnownId(script.scriptCode)).filter(Boolean))
  const existingCode = new Set(existingScripts.map(script => normalizeCode(script.scriptCode)).filter(Boolean))
  const existingNameSrc = new Set(
    existingScripts
      .map(script => `${script.name.toLowerCase()}::${extractSrc(script.scriptCode)}`)
      .filter(key => !key.endsWith('::')),
  )

  return candidates.map(candidate => {
    const src = candidate.sourceUrl || extractSrc(candidate.scriptCode)
    const knownId = extractKnownId(candidate.scriptCode)
    const code = normalizeCode(candidate.scriptCode)
    const nameSrc = `${candidate.name.toLowerCase()}::${src}`

    if (src && existingNameSrc.has(nameSrc)) {
      return { ...candidate, duplicate: true, duplicateReason: 'Already in banner with the same source URL.' }
    }

    if (knownId && existingIds.has(knownId)) {
      return { ...candidate, duplicate: true, duplicateReason: 'Already in banner with the same tracking ID.' }
    }

    if (src && existingSources.has(src)) {
      return { ...candidate, duplicate: true, duplicateReason: 'Already in banner with the same script URL.' }
    }

    if (code && existingCode.has(code)) {
      return { ...candidate, duplicate: true, duplicateReason: 'Already in banner with the same script code.' }
    }

    return candidate
  })
}

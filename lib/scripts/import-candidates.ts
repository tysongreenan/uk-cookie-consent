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

function extractSrc(scriptCode: string): string {
  return scriptCode.match(/src=["']([^"']+)["']/i)?.[1] || ''
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
  if (script.name.toLowerCase().includes('google tag manager') && script.bodyCode) {
    return 'GTM noscript body code cannot be fully migrated through the hosted script. The JavaScript GTM loader will be gated by consent; the noscript iframe requires manual placement if needed.'
  }

  if (!script.scriptCode.trim()) {
    return 'No importable script code was extracted. Add this script manually if you still need it.'
  }

  if (script.confidence === 'low') {
    return 'Low-confidence detection. Review the script code before importing it.'
  }

  return script.importWarning
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
        importWarning: inferWarning({ ...script, scriptCode, confidence: confidenceWithCode }),
      }
    })

  const discoveredNames = new Set(candidates.map(candidate => candidate.name))
  const fallbackCandidates = scanResult.scriptsDetected
    .filter(script => !discoveredNames.has(script.name))
    .filter(script => !CMP_NAMES.some(name => script.name.toLowerCase().includes(name.toLowerCase())))
    .map(script => ({
      id: `headless-${script.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name: script.name,
      category: script.category as TrackingScript['category'],
      scriptCode: '',
      enabled: true,
      sourceUrl: undefined as string | undefined,
      detectedVendor: script.name,
      confidence: 'low' as const,
      importWarning: 'Detected in the browser scan, but no importable script code was extracted from the page HTML. Add this manually if you still need it.',
    }))

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

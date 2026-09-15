import type { BannerConfig, TrackingScript } from '@/types'
import {
  buildTrackingScript,
  getScriptTemplate,
  resolveVendorId,
  ScriptSnippetError,
  type BuildScriptInput,
} from '@/lib/script-snippets'

export const SCRIPT_BUCKETS = [
  'strictlyNecessary',
  'functionality',
  'trackingPerformance',
  'targetingAdvertising',
] as const

export type ScriptBucket = (typeof SCRIPT_BUCKETS)[number]

export const CATEGORY_TO_BUCKET: Record<TrackingScript['category'], ScriptBucket> = {
  'strictly-necessary': 'strictlyNecessary',
  functionality: 'functionality',
  'tracking-performance': 'trackingPerformance',
  'targeting-advertising': 'targetingAdvertising',
}

export const GA4_INTEGRATION_ID = 'ga4-integration'

export type ListedScript = {
  id: string
  name: string
  category: TrackingScript['category']
  enabled: boolean
  source?: TrackingScript['source']
  kind: 'script' | 'ga4-integration'
  vendorId?: string
}

export function emptyScriptBuckets(): BannerConfig['scripts'] {
  return {
    strictlyNecessary: [],
    functionality: [],
    trackingPerformance: [],
    targetingAdvertising: [],
  }
}

export function normalizeScriptBuckets(
  raw: unknown
): BannerConfig['scripts'] {
  const scripts = emptyScriptBuckets()
  if (!raw || typeof raw !== 'object') return scripts
  const record = raw as Record<string, unknown>
  for (const bucket of SCRIPT_BUCKETS) {
    const list = record[bucket]
    if (Array.isArray(list)) {
      scripts[bucket] = list.filter(
        (item): item is TrackingScript =>
          !!item && typeof item === 'object' && typeof (item as TrackingScript).id === 'string'
      )
    }
  }
  return scripts
}

export function flattenScripts(scripts: BannerConfig['scripts']): TrackingScript[] {
  return SCRIPT_BUCKETS.flatMap((bucket) => scripts[bucket] || [])
}

function vendorIdFromScript(script: TrackingScript): string | undefined {
  const fromGtag = script.scriptCode.match(/\b(G-[A-Z0-9]+|GTM-[A-Z0-9]+|AW-\d+)\b/i)
  if (fromGtag) return fromGtag[1]
  const fromFbq = script.scriptCode.match(/fbq\(['"]init['"],\s*['"](\d+)['"]\)/)
  if (fromFbq) return fromFbq[1]
  const fromClarity = script.scriptCode.match(/clarity\.ms\/tag\/([A-Za-z0-9]+)/)
  if (fromClarity) return fromClarity[1]
  const fromHotjar = script.scriptCode.match(/hjid['":\s]+(\d+)/)
  if (fromHotjar) return fromHotjar[1]
  return undefined
}

export function listScriptsFromConfig(config: Record<string, unknown>): ListedScript[] {
  const scripts = normalizeScriptBuckets(config.scripts)
  const listed: ListedScript[] = flattenScripts(scripts).map((script) => ({
    id: script.id,
    name: script.name,
    category: script.category,
    enabled: script.enabled,
    source: script.source,
    kind: 'script',
    vendorId: vendorIdFromScript(script),
  }))

  const integrations = config.integrations as
    | { googleAnalytics?: { enabled?: boolean; measurementId?: string } }
    | undefined
  const ga = integrations?.googleAnalytics
  if (ga?.measurementId) {
    listed.unshift({
      id: GA4_INTEGRATION_ID,
      name: 'Google Analytics 4',
      category: 'tracking-performance',
      enabled: ga.enabled !== false,
      source: 'template',
      kind: 'ga4-integration',
      vendorId: ga.measurementId,
    })
  }

  return listed
}

function alreadyHasVendor(config: Record<string, unknown>, vendorId: string): ListedScript | undefined {
  return listScriptsFromConfig(config).find(
    (script) => script.vendorId && script.vendorId.toUpperCase() === vendorId.toUpperCase()
  )
}

export function applyGa4Integration(
  config: Record<string, unknown>,
  measurementId: string,
  enabled = true
): Record<string, unknown> {
  const integrations =
    config.integrations && typeof config.integrations === 'object'
      ? { ...(config.integrations as Record<string, unknown>) }
      : {}
  const existing = (integrations.googleAnalytics || {}) as Record<string, unknown>
  integrations.googleAnalytics = {
    trackConsentEvents: true,
    trackImpressions: true,
    anonymizeIp: true,
    ...existing,
    enabled,
    measurementId,
  }
  return { ...config, integrations }
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

const SCRIPT_CATEGORIES: TrackingScript['category'][] = [
  'strictly-necessary',
  'functionality',
  'tracking-performance',
  'targeting-advertising',
]

export function parseScriptInput(body: Record<string, unknown>): BuildScriptInput {
  const category = asString(body.category)
  return {
    template: asString(body.template),
    measurementId: asString(body.measurementId || body.measurement_id),
    containerId: asString(body.containerId || body.container_id),
    pixelId: asString(body.pixelId || body.pixel_id),
    projectId: asString(body.projectId || body.project_id),
    siteId: asString(body.siteId || body.site_id),
    partnerId: asString(body.partnerId || body.partner_id),
    conversionId: asString(body.conversionId || body.conversion_id),
    appId: asString(body.appId || body.app_id),
    name: asString(body.name),
    category: SCRIPT_CATEGORIES.includes(category as TrackingScript['category'])
      ? (category as TrackingScript['category'])
      : undefined,
    scriptCode: asString(body.scriptCode || body.script_code),
    bodyCode: asString(body.bodyCode || body.body_code),
    enabled: typeof body.enabled === 'boolean' ? body.enabled : undefined,
    scriptId: asString(body.scriptId || body.script_id),
  }
}

export function addScriptToConfig(
  config: Record<string, unknown>,
  input: BuildScriptInput,
  planTier = 'free'
): { config: Record<string, unknown>; added: ListedScript; alreadyPresent: boolean } {
  const template = getScriptTemplate(input.template || (input.scriptCode ? 'custom' : ''))
  if (!template) {
    throw new ScriptSnippetError(
      `Unknown template "${input.template}". Use list_script_templates for valid ids.`
    )
  }

  const useGa4Integration = template.usesGa4Integration && planTier !== 'free'
  if (useGa4Integration) {
    const measurementId = resolveVendorId(input, 'measurementId')
    const script = buildTrackingScript({ ...input, template: 'google-analytics-4' })
    const vendorId = vendorIdFromScript(script) || measurementId
    const existing = alreadyHasVendor(config, vendorId)
    if (existing) {
      return { config, added: existing, alreadyPresent: true }
    }
    const next = applyGa4Integration(config, vendorId, input.enabled !== false)
    return {
      config: next,
      alreadyPresent: false,
      added: {
        id: GA4_INTEGRATION_ID,
        name: 'Google Analytics 4',
        category: 'tracking-performance',
        enabled: input.enabled !== false,
        source: 'template',
        kind: 'ga4-integration',
        vendorId,
      },
    }
  }

  const script = buildTrackingScript(input)
  const vendorId = vendorIdFromScript(script)
  if (vendorId) {
    const existing = alreadyHasVendor(config, vendorId)
    if (existing) {
      return { config, added: existing, alreadyPresent: true }
    }
  }

  const scripts = normalizeScriptBuckets(config.scripts)
  const bucket = CATEGORY_TO_BUCKET[script.category]
  scripts[bucket] = [...scripts[bucket], script]

  return {
    config: { ...config, scripts },
    alreadyPresent: false,
    added: {
      id: script.id,
      name: script.name,
      category: script.category,
      enabled: script.enabled,
      source: script.source,
      kind: 'script',
      vendorId,
    },
  }
}

export function removeScriptFromConfig(
  config: Record<string, unknown>,
  scriptId: string
): { config: Record<string, unknown>; removed: boolean } {
  if (scriptId === GA4_INTEGRATION_ID) {
    const integrations =
      config.integrations && typeof config.integrations === 'object'
        ? { ...(config.integrations as Record<string, unknown>) }
        : {}
    if (!integrations.googleAnalytics) {
      return { config, removed: false }
    }
    delete integrations.googleAnalytics
    return { config: { ...config, integrations }, removed: true }
  }

  const scripts = normalizeScriptBuckets(config.scripts)
  let removed = false
  for (const bucket of SCRIPT_BUCKETS) {
    const next = scripts[bucket].filter((script) => script.id !== scriptId)
    if (next.length !== scripts[bucket].length) removed = true
    scripts[bucket] = next
  }
  return { config: { ...config, scripts }, removed }
}

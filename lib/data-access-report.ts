/**
 * DSAR Report Generator — Law 25 / GDPR Data Subject Access Requests
 *
 * Generates a structured report of all personal data held about a specific
 * individual, scoped to the requesting organization's data only.
 *
 * SECURITY: Every query MUST scope through the organization's banners/projects.
 * Never query by subject identifier alone without an org-level filter.
 */

import { createClient } from '@supabase/supabase-js'
import { prisma } from '@/lib/prisma'
import type {
  DSARIdentifierType,
  DSARReport,
  DSARReportSection,
  DataAccessRequest,
} from '@/types'

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase config missing: SUPABASE_SERVICE_ROLE_KEY is required for DSAR operations')
  return createClient(url, key)
}

// ── Bilingual labels ──────────────────────────────────────────────────

const LABELS: Record<string, Record<'en' | 'fr', string>> = {
  consent_records: { en: 'Consent Records', fr: 'Registres de consentement' },
  consent_records_desc: {
    en: 'Every interaction with cookie consent banners operated by this organization.',
    fr: 'Chaque interaction avec les bannières de consentement aux cookies exploitées par cette organisation.',
  },
  analytics_events: { en: 'Analytics Events', fr: 'Événements analytiques' },
  analytics_events_desc: {
    en: 'Banner view, accept, reject, and preference events recorded.',
    fr: 'Événements d\'affichage, d\'acceptation, de rejet et de préférences des bannières enregistrés.',
  },
  technical_data: { en: 'Technical Data Collected', fr: 'Données techniques collectées' },
  technical_data_desc: {
    en: 'IP addresses, user agents, device types, countries, and page paths recorded during consent interactions.',
    fr: 'Adresses IP, agents utilisateurs, types d\'appareils, pays et chemins de pages enregistrés lors des interactions de consentement.',
  },
  processing_purposes: { en: 'Data Processing Purposes', fr: 'Finalités du traitement des données' },
  processing_purposes_desc: {
    en: 'Why each category of data is collected, the legal basis, and retention periods.',
    fr: 'Pourquoi chaque catégorie de données est collectée, la base juridique et les périodes de conservation.',
  },
  retention_info: { en: 'Data Retention Information', fr: 'Informations sur la conservation des données' },
  retention_info_desc: {
    en: 'How long different categories of personal data are retained.',
    fr: 'Durée de conservation des différentes catégories de données personnelles.',
  },
  truncated: {
    en: 'Results truncated. Contact support for full export.',
    fr: 'Résultats tronqués. Contactez le support pour une exportation complète.',
  },
  report_title: { en: 'Data Subject Access Report', fr: 'Rapport d\'accès aux données personnelles' },
}

function t(key: string, lang: 'en' | 'fr'): string {
  return LABELS[key]?.[lang] || LABELS[key]?.en || key
}

// ── Org scoping ───────────────────────────────────────────────────────

/** Get all banner IDs and project IDs owned by the organization */
async function getOrgScope(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  userId: string,
  teamId: string | null
) {
  // Get projects: team-owned OR user-owned (before team existed)
  const projectWhere = teamId
    ? { OR: [{ teamId }, { userId, teamId: null }] }
    : { userId }

  const projects = await prisma.project.findMany({
    where: projectWhere,
    select: { id: true },
  })
  const projectIds = projects.map((p) => p.id)

  // Get simple banners: team-owned OR user-owned (before team existed)
  let bannerQuery = supabase.from('SimpleBanners').select('id')
  if (teamId) {
    bannerQuery = bannerQuery.or(`teamId.eq.${teamId},and(userId.eq.${userId},teamId.is.null)`)
  } else {
    bannerQuery = bannerQuery.eq('userId', userId)
  }
  const { data: banners } = await bannerQuery
  const bannerIds = (banners || []).map((b: { id: string }) => b.id)

  return { projectIds, bannerIds }
}

// ── Section generators ────────────────────────────────────────────────

const ROW_LIMIT = 10_000

async function generateConsentRecords(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  identifierType: DSARIdentifierType,
  identifierValue: string,
  bannerIds: string[],
  lang: 'en' | 'fr'
): Promise<DSARReportSection> {
  if (bannerIds.length === 0) {
    return {
      name: t('consent_records', lang),
      description: t('consent_records_desc', lang),
      data: [],
      refused: false,
    }
  }

  const filterColumn = identifierType === 'ip' ? 'ip_address' : identifierType === 'email' ? 'email' : 'name'

  const { data: visitors, count } = await supabase
    .from('banner_visitors')
    .select('date, banner_id, source, device, country, page_path, impressions, accepts, rejects, dismisses, gpc', { count: 'exact' })
    .in('banner_id', bannerIds)
    .ilike(filterColumn, identifierValue)
    .order('date', { ascending: false })
    .limit(ROW_LIMIT)

  const section: DSARReportSection = {
    name: t('consent_records', lang),
    description: t('consent_records_desc', lang),
    data: (visitors || []).map((v: Record<string, unknown>) => ({
      date: v.date,
      banner_id: v.banner_id,
      source: v.source,
      device: v.device,
      country: v.country,
      page_path: v.page_path,
      impressions: v.impressions,
      accepts: v.accepts,
      rejects: v.rejects,
      dismisses: v.dismisses,
      gpc_signal: v.gpc,
    })),
    refused: false,
  }

  if (count && count > ROW_LIMIT) {
    section.description += ` ${t('truncated', lang)}`
  }

  return section
}

async function generateAnalyticsEvents(
  identifierType: DSARIdentifierType,
  identifierValue: string,
  projectIds: string[],
  lang: 'en' | 'fr'
): Promise<DSARReportSection> {
  if (projectIds.length === 0) {
    return {
      name: t('analytics_events', lang),
      description: t('analytics_events_desc', lang),
      data: [],
      refused: false,
    }
  }

  const where: Record<string, unknown> = { projectId: { in: projectIds } }
  if (identifierType === 'ip') {
    where.ipAddress = identifierValue
  } else {
    // BannerAnalytics doesn't store email or name — return empty for non-IP lookups
    return {
      name: t('analytics_events', lang),
      description: t('analytics_events_desc', lang),
      data: [],
      refused: false,
    }
  }

  const events = await prisma.bannerAnalytics.findMany({
    where,
    select: {
      event: true,
      userAgent: true,
      ipAddress: true,
      country: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: ROW_LIMIT,
  })

  return {
    name: t('analytics_events', lang),
    description: t('analytics_events_desc', lang),
    data: events.map((e) => ({
      event: e.event,
      user_agent: e.userAgent,
      ip_address: e.ipAddress,
      country: e.country,
      timestamp: e.createdAt.toISOString(),
    })),
    refused: false,
  }
}

function generateProcessingPurposes(lang: 'en' | 'fr'): DSARReportSection {
  const purposes = [
    {
      category: lang === 'fr' ? 'Données de consentement' : 'Consent Data',
      purpose: lang === 'fr'
        ? 'Enregistrer les choix de consentement aux cookies des visiteurs conformément au RGPD, à la Loi 25 et au PECR.'
        : 'Record visitor cookie consent choices as required by GDPR, Law 25, and PECR.',
      legal_basis: lang === 'fr' ? 'Obligation légale' : 'Legal obligation',
      retention: lang === 'fr' ? '24 mois' : '24 months',
    },
    {
      category: lang === 'fr' ? 'Données techniques' : 'Technical Data',
      purpose: lang === 'fr'
        ? 'Adresses IP et agents utilisateurs collectés pour détecter la fraude et fournir des analyses agrégées.'
        : 'IP addresses and user agents collected for fraud detection and aggregate analytics.',
      legal_basis: lang === 'fr' ? 'Intérêt légitime' : 'Legitimate interest',
      retention: lang === 'fr' ? '24 mois' : '24 months',
    },
    {
      category: lang === 'fr' ? 'Données analytiques' : 'Analytics Data',
      purpose: lang === 'fr'
        ? 'Statistiques agrégées sur les taux de consentement pour aider les organisations à optimiser la conformité.'
        : 'Aggregate statistics on consent rates to help organizations optimize compliance.',
      legal_basis: lang === 'fr' ? 'Intérêt légitime' : 'Legitimate interest',
      retention: lang === 'fr' ? '24 mois' : '24 months',
    },
  ]

  return {
    name: t('processing_purposes', lang),
    description: t('processing_purposes_desc', lang),
    data: purposes,
    refused: false,
  }
}

function generateRetentionInfo(lang: 'en' | 'fr'): DSARReportSection {
  const policies = [
    {
      data_category: lang === 'fr' ? 'Interactions des visiteurs avec les bannières' : 'Banner visitor interactions',
      retention_period: lang === 'fr' ? '24 mois' : '24 months',
    },
    {
      data_category: lang === 'fr' ? 'Journal d\'audit' : 'Audit log',
      retention_period: lang === 'fr' ? '13 mois' : '13 months',
    },
    {
      data_category: lang === 'fr' ? 'Demandes d\'accès aux données' : 'Data access requests',
      retention_period: lang === 'fr' ? '36 mois (preuve de conformité)' : '36 months (proof of compliance)',
    },
  ]

  return {
    name: t('retention_info', lang),
    description: t('retention_info_desc', lang),
    data: policies,
    refused: false,
  }
}

// ── Main generator ────────────────────────────────────────────────────

export interface GenerateReportOptions {
  request: DataAccessRequest
  organizationName: string
  language?: 'en' | 'fr'
}

export async function generateDSARReport(
  options: GenerateReportOptions
): Promise<DSARReport> {
  const startTime = Date.now()
  const supabase = getSupabaseAdmin()
  const { request, organizationName, language = 'en' } = options
  const lang = language

  // Build the set of refused section names for quick lookup
  const refusedSet = new Set(
    (request.refusedSections || []).map((s) => s.section)
  )

  // Get org-scoped banner and project IDs
  const { projectIds, bannerIds } = await getOrgScope(
    supabase,
    request.organizationUserId,
    request.teamId
  )

  // Generate sections in parallel (only non-refused ones query the DB)
  const [consentRecords, analyticsEvents] = await Promise.all([
    refusedSet.has('consent_records')
      ? Promise.resolve({
          name: t('consent_records', lang),
          description: t('consent_records_desc', lang),
          data: [],
          refused: true,
          refusalReason: request.refusedSections.find((s) => s.section === 'consent_records')?.reason,
        })
      : generateConsentRecords(supabase, request.subjectIdentifierType, request.subjectIdentifierValue, bannerIds, lang),
    refusedSet.has('analytics_events')
      ? Promise.resolve({
          name: t('analytics_events', lang),
          description: t('analytics_events_desc', lang),
          data: [],
          refused: true,
          refusalReason: request.refusedSections.find((s) => s.section === 'analytics_events')?.reason,
        })
      : generateAnalyticsEvents(request.subjectIdentifierType, request.subjectIdentifierValue, projectIds, lang),
  ])

  const processingPurposes = generateProcessingPurposes(lang)
  const retentionInfo = generateRetentionInfo(lang)

  const sections: DSARReportSection[] = [
    consentRecords,
    analyticsEvents,
    processingPurposes,
    retentionInfo,
  ]

  const totalRecords = sections.reduce((sum, s) => sum + s.data.length, 0)

  return {
    generatedAt: new Date().toISOString(),
    requestId: request.id,
    subjectIdentifier: {
      type: request.subjectIdentifierType,
      value: request.subjectIdentifierValue,
    },
    organization: {
      name: organizationName,
      teamId: request.teamId || '',
    },
    sections,
    language: lang,
    metadata: {
      dataSourcesQueried: ['banner_visitors', 'BannerAnalytics'],
      recordsFound: totalRecords,
      generationDurationMs: Date.now() - startTime,
    },
  }
}

// ── CSV formatter ─────────────────────────────────────────────────────

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return ''
  let str = String(value)
  // Prevent CSV formula injection — prefix formula-start characters with a tab
  if (/^[=+\-@\t\r]/.test(str)) {
    str = '\t' + str
  }
  if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\t')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export function formatReportAsCSV(report: DSARReport): string {
  let csv = `# ${t('report_title', report.language)}\n`
  csv += `# Generated: ${report.generatedAt}\n`
  csv += `# Request ID: ${report.requestId}\n`
  csv += `# Subject: ${report.subjectIdentifier.type} = ${report.subjectIdentifier.value}\n\n`

  for (const section of report.sections) {
    csv += `# ${section.name}\n`
    if (section.refused) {
      csv += `# REFUSED: ${section.refusalReason || 'No reason provided'}\n\n`
      continue
    }
    if (section.data.length === 0) {
      csv += '# No data found\n\n'
      continue
    }

    const headers = Object.keys(section.data[0])
    csv += headers.join(',') + '\n'
    for (const row of section.data) {
      csv += headers.map((h) => csvEscape(row[h])).join(',') + '\n'
    }
    csv += '\n'
  }

  return csv
}

// ── JSON formatter ────────────────────────────────────────────────────

export function formatReportAsJSON(report: DSARReport): string {
  return JSON.stringify(report, null, 2)
}

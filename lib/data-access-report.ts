/**
 * DSAR Report Generator — Law 25 / GDPR Data Subject Access Requests
 *
 * Generates a structured report of all personal data held about a specific
 * individual, scoped to the requesting organization's data only.
 *
 * SECURITY: Every query MUST scope through the organization's banners/projects.
 * Never query by subject identifier alone without an org-level filter.
 */

import { createHash } from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabase-admin'
import type {
  DSARIdentifierType,
  DSARReport,
  DSARReportSection,
  DataAccessRequest,
} from '@/types'

// ── Bilingual labels ──────────────────────────────────────────────────

const LABELS: Record<string, Record<'en' | 'fr', string>> = {
  consent_records: { en: 'Consent Records (Aggregate)', fr: 'Registres de consentement (agrégés)' },
  consent_records_desc: {
    en: 'Aggregate consent interaction records. Individual per-decision proof has moved to the Individual Consent Logs section below.',
    fr: 'Enregistrements agrégés des interactions de consentement. La preuve individuelle de chaque décision se trouve dans la section Journaux de consentement individuels ci-dessous.',
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
  individual_consent_logs: { en: 'Individual Consent Logs', fr: 'Journaux de consentement individuels' },
  individual_consent_logs_desc: {
    en: 'Individual consent records showing each consent decision made by the data subject, including the consent reference ID, decision, cookie categories, and page visited.',
    fr: 'Enregistrements individuels de consentement montrant chaque décision prise par la personne concernée, incluant l\'identifiant de référence du consentement, la décision, les catégories de cookies et la page visitée.',
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
  const projectRecords = new Map<string, { id: string }>()
  let orgUserIds = [userId]

  if (teamId) {
    const { data: teamMembers, error: teamMembersError } = await supabase
      .from('TeamMember')
      .select('userId')
      .eq('teamId', teamId)

    if (teamMembersError) {
      throw teamMembersError
    }

    orgUserIds = Array.from(new Set([
      userId,
      ...(teamMembers || []).map((member: { userId: string }) => member.userId),
    ]))

    const [teamProjectsResult, legacyProjectsResult] = await Promise.all([
      supabase
        .from('Project')
        .select('id')
        .eq('teamId', teamId),
      supabase
        .from('Project')
        .select('id')
        .eq('userId', userId)
        .is('teamId', null),
    ])

    if (teamProjectsResult.error) {
      throw teamProjectsResult.error
    }

    if (legacyProjectsResult.error) {
      throw legacyProjectsResult.error
    }

    for (const project of [...(teamProjectsResult.data || []), ...(legacyProjectsResult.data || [])]) {
      projectRecords.set((project as { id: string }).id, project as { id: string })
    }
  } else {
    const { data: projects, error: projectsError } = await supabase
      .from('Project')
      .select('id')
      .eq('userId', userId)

    if (projectsError) {
      throw projectsError
    }

    for (const project of projects || []) {
      projectRecords.set((project as { id: string }).id, project as { id: string })
    }
  }

  const projectIds = Array.from(projectRecords.keys())

  // SimpleBanners are user-owned; for team scope include all team members.
  const { data: banners } = await supabase
    .from('SimpleBanners')
    .select('id')
    .in('userId', orgUserIds)
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

  const section: DSARReportSection = {
    name: t('consent_records', lang),
    description: t('consent_records_desc', lang),
    data: [],
    refused: false,
  }

  return section
}

async function generateIndividualConsentLogs(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  identifierType: DSARIdentifierType,
  identifierValue: string,
  userId: string,
  teamId: string | null,
  bannerIds: string[],
  lang: 'en' | 'fr'
): Promise<DSARReportSection> {
  const emptySection: DSARReportSection = {
    name: t('individual_consent_logs', lang),
    description: t('individual_consent_logs_desc', lang),
    data: [],
    refused: false,
  }

  if (bannerIds.length === 0) return emptySection

  // Consent logs don't store PII (name/email) — only hashed cookie IDs and consent IDs
  if (identifierType === 'name' || identifierType === 'email') return emptySection

  let hashedCookieId: string | null = null
  let consentId: string | null = null

  if (identifierType === 'ip') {
    hashedCookieId = createHash('sha256').update(identifierValue).digest('hex')
  } else if (identifierType === 'consent_id') {
    consentId = identifierValue
  }

  const { data: records, error } = await supabase.rpc('search_consent_records_for_dsar', {
    p_user_id: userId,
    p_team_id: teamId,
    p_hashed_cookie_id: hashedCookieId,
    p_consent_id: consentId,
    p_limit: ROW_LIMIT,
  })

  if (error || !records) return emptySection

  const section: DSARReportSection = {
    name: t('individual_consent_logs', lang),
    description: t('individual_consent_logs_desc', lang),
    data: (records as Record<string, unknown>[]).map((r) => ({
      consent_id: r.consent_id,
      recorded_at: r.recorded_at,
      decision: r.decision,
      categories: r.categories,
      country: r.country,
      page_path: r.page_path,
      banner_id: r.banner_id,
    })),
    refused: false,
  }

  if (records.length >= ROW_LIMIT) {
    section.description += ` ${t('truncated', lang)}`
  }

  return section
}

async function generateAnalyticsEvents(
  supabase: ReturnType<typeof getSupabaseAdmin>,
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

  if (identifierType !== 'ip') {
    // BannerAnalytics doesn't store email or name — return empty for non-IP lookups
    return {
      name: t('analytics_events', lang),
      description: t('analytics_events_desc', lang),
      data: [],
      refused: false,
    }
  }

  const { data: events, error } = await supabase
    .from('BannerAnalytics')
    .select('event, userAgent, ipAddress, country, createdAt')
    .in('projectId', projectIds)
    .eq('ipAddress', identifierValue)
    .order('createdAt', { ascending: false })
    .limit(ROW_LIMIT)

  if (error && error.code !== 'PGRST205') {
    throw error
  }

  return {
    name: t('analytics_events', lang),
    description: t('analytics_events_desc', lang),
    data: (events || []).map((e: Record<string, unknown>) => ({
      event: e.event,
      user_agent: e.userAgent,
      ip_address: e.ipAddress,
      country: e.country,
      timestamp: e.createdAt,
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
      category: lang === 'fr' ? 'Journaux de consentement individuels' : 'Individual Consent Logs',
      purpose: lang === 'fr'
        ? 'Enregistrer les décisions de consentement individuelles comme preuve de consentement conformément à la Loi 25 et au RGPD.'
        : 'Record individual consent decisions as proof of consent per Law 25 and GDPR.',
      legal_basis: lang === 'fr' ? 'Obligation légale' : 'Legal obligation',
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
      data_category: lang === 'fr' ? 'Journaux de consentement individuels' : 'Individual consent logs',
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
  const [consentRecords, individualConsentLogs, analyticsEvents] = await Promise.all([
    refusedSet.has('consent_records')
      ? Promise.resolve({
          name: t('consent_records', lang),
          description: t('consent_records_desc', lang),
          data: [],
          refused: true,
          refusalReason: request.refusedSections.find((s) => s.section === 'consent_records')?.reason,
        })
      : generateConsentRecords(supabase, request.subjectIdentifierType, request.subjectIdentifierValue, bannerIds, lang),
    refusedSet.has('individual_consent_logs')
      ? Promise.resolve({
          name: t('individual_consent_logs', lang),
          description: t('individual_consent_logs_desc', lang),
          data: [],
          refused: true,
          refusalReason: request.refusedSections.find((s) => s.section === 'individual_consent_logs')?.reason,
        })
      : generateIndividualConsentLogs(supabase, request.subjectIdentifierType, request.subjectIdentifierValue, request.organizationUserId, request.teamId, bannerIds, lang),
    refusedSet.has('analytics_events')
      ? Promise.resolve({
          name: t('analytics_events', lang),
          description: t('analytics_events_desc', lang),
          data: [],
          refused: true,
          refusalReason: request.refusedSections.find((s) => s.section === 'analytics_events')?.reason,
        })
      : generateAnalyticsEvents(supabase, request.subjectIdentifierType, request.subjectIdentifierValue, projectIds, lang),
  ])

  const processingPurposes = generateProcessingPurposes(lang)
  const retentionInfo = generateRetentionInfo(lang)

  const sections: DSARReportSection[] = [
    consentRecords,
    individualConsentLogs,
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
      dataSourcesQueried: ['banner_visitors', 'consent_records', 'BannerAnalytics'],
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

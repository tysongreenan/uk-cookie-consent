import { PrivacyPolicyInputs, PolicySection, PolicyOutput } from '@/types'
import { getCommonSections } from './templates/common'
import { getCommonSectionsFr } from './templates/common.fr'
import { getGdprSections } from './templates/gdpr'
import { getGdprSectionsFr } from './templates/gdpr.fr'
import { getCcpaSections } from './templates/ccpa'
import { getCcpaSectionsFr } from './templates/ccpa.fr'
import { getPipedaSections } from './templates/pipeda'
import { getPipedaSectionsFr } from './templates/pipeda.fr'
import { getLaw25Sections } from './templates/law25'
import { getLaw25SectionsFr } from './templates/law25.fr'
import { getPolicyLang } from './templates/shared'

// ── Jurisdiction → template mapping ──────────────────────────────────

type TemplateFn = (inputs: PrivacyPolicyInputs) => PolicySection[]

const JURISDICTION_TEMPLATES_EN: Record<string, TemplateFn> = {
  gdpr: getGdprSections,
  ccpa: getCcpaSections,
  pipeda: getPipedaSections,
  law25: getLaw25Sections,
}

const JURISDICTION_TEMPLATES_FR: Record<string, TemplateFn> = {
  gdpr: getGdprSectionsFr,
  ccpa: getCcpaSectionsFr,
  pipeda: getPipedaSectionsFr,
  law25: getLaw25SectionsFr,
}

// ── Section ordering ─────────────────────────────────────────────────

const SECTION_ORDER: string[] = [
  'introduction',
  'data-collection',
  'data-usage',
  'data-sharing',
  // GDPR sections
  'gdpr-legal-basis',
  'gdpr-dpo',
  'gdpr-rights',
  'gdpr-transfers',
  'gdpr-breach',
  // CCPA sections
  'ccpa-notice',
  'ccpa-categories',
  'ccpa-do-not-sell',
  'ccpa-rights',
  'ccpa-financial-incentives',
  'ccpa-shine-the-light',
  // PIPEDA sections
  'pipeda-overview',
  'pipeda-accountability',
  'pipeda-consent',
  'pipeda-limiting-collection',
  'pipeda-rights',
  'pipeda-openness',
  // Law 25 sections
  'law25-overview',
  'law25-privacy-officer',
  'law25-consent',
  'law25-rights',
  'law25-pia',
  'law25-breach',
  'law25-language',
  // Common tail sections
  'data-retention',
  'data-security',
  'international-transfers',
  'your-rights',
  'children',
  'third-party-links',
  'changes',
  'contact',
  'faq',
]

function sortSections(sections: PolicySection[]): PolicySection[] {
  return sections.sort((a, b) => {
    const aIdx = SECTION_ORDER.indexOf(a.id)
    const bIdx = SECTION_ORDER.indexOf(b.id)
    const aOrder = aIdx === -1 ? 999 : aIdx
    const bOrder = bIdx === -1 ? 999 : bIdx
    return aOrder - bOrder
  })
}

// ── Deduplication ────────────────────────────────────────────────────

function deduplicateSections(
  sections: PolicySection[],
  jurisdictions: string[]
): PolicySection[] {
  const hasSpecificRights = jurisdictions.some((j) =>
    ['gdpr', 'ccpa', 'pipeda', 'law25'].includes(j)
  )
  if (hasSpecificRights) {
    return sections.filter((s) => s.id !== 'your-rights')
  }
  return sections
}

function deduplicateTransfers(
  sections: PolicySection[],
  jurisdictions: string[]
): PolicySection[] {
  if (jurisdictions.includes('gdpr')) {
    return sections.filter((s) => s.id !== 'international-transfers')
  }
  return sections
}

// ── HTML rendering ───────────────────────────────────────────────────

function renderSectionsToHtml(sections: PolicySection[]): string {
  const lines: string[] = []

  for (const section of sections) {
    const tag = section.id === 'introduction' ? 'h1' : 'h2'
    lines.push(`<${tag} id="${section.id}">${section.heading}</${tag}>`)

    if (section.subheading) {
      lines.push(`<p class="policy-subheading"><em>${section.subheading}</em></p>`)
    }

    lines.push(section.content)
    lines.push('')
  }

  return lines.join('\n')
}

// ── Public API ───────────────────────────────────────────────────────

/**
 * Generate a complete privacy policy from structured inputs.
 * When inputs.language === 'fr', full French (fr-CA) templates are used.
 */
export function generatePrivacyPolicy(
  inputs: PrivacyPolicyInputs
): PolicyOutput {
  return generatePolicyFromInputs(inputs)
}

/**
 * Alias used by the API route handler.
 */
export function generatePolicyFromInputs(
  inputs: PrivacyPolicyInputs
): PolicyOutput {
  const lang = getPolicyLang(inputs)
  const isFr = lang === 'fr'

  const getCommon = isFr ? getCommonSectionsFr : getCommonSections
  const jurisdictionTemplates = isFr
    ? JURISDICTION_TEMPLATES_FR
    : JURISDICTION_TEMPLATES_EN

  // 1. Collect all applicable sections
  let sections: PolicySection[] = [...getCommon(inputs)]

  for (const jurisdiction of inputs.jurisdictions) {
    const templateFn = jurisdictionTemplates[jurisdiction]
    if (templateFn) {
      sections.push(...templateFn(inputs))
    }
  }

  // 2. Deduplicate
  sections = deduplicateSections(sections, inputs.jurisdictions)
  sections = deduplicateTransfers(sections, inputs.jurisdictions)

  // 3. Sort
  sections = sortSections(sections)

  // 4. Render HTML
  const contentHtml = renderSectionsToHtml(sections)

  return {
    sections,
    contentHtml,
    contentJson: { sections },
    metadata: {
      generatedAt: new Date().toISOString(),
      jurisdictions: inputs.jurisdictions,
      language: lang,
      businessName: inputs.businessName,
    },
  }
}

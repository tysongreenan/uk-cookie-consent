import { PrivacyPolicyInputs, PolicySection, PolicyOutput } from '@/types'
import { getCommonSections } from './templates/common'
import { getGdprSections } from './templates/gdpr'
import { getCcpaSections } from './templates/ccpa'
import { getPipedaSections } from './templates/pipeda'
import { getLaw25Sections } from './templates/law25'

// ── Jurisdiction → template mapping ──────────────────────────────────

type TemplateFn = (inputs: PrivacyPolicyInputs) => PolicySection[]

const JURISDICTION_TEMPLATES: Record<string, TemplateFn> = {
  gdpr: getGdprSections,
  ccpa: getCcpaSections,
  pipeda: getPipedaSections,
  law25: getLaw25Sections,
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
    // Unknown sections go to the end
    const aOrder = aIdx === -1 ? 999 : aIdx
    const bOrder = bIdx === -1 ? 999 : bIdx
    return aOrder - bOrder
  })
}

// ── Deduplication ────────────────────────────────────────────────────

/** If GDPR or CCPA provides jurisdiction-specific rights, remove the
 *  generic "Your Rights" common section to avoid redundancy. */
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

/** If GDPR transfers section is present, remove the generic international
 *  transfers section. */
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

function renderSectionsToHtml(
  sections: PolicySection[],
  businessName: string
): string {
  const lines: string[] = []

  for (const section of sections) {
    // Use H1 for the top-level title, H2 for all others
    const tag = section.id === 'introduction' ? 'h1' : 'h2'
    lines.push(`<${tag} id="${section.id}">${section.heading}</${tag}>`)

    if (section.subheading) {
      lines.push(`<p class="policy-subheading"><em>${section.subheading}</em></p>`)
    }

    lines.push(section.content)
    lines.push('') // blank line separator
  }

  return lines.join('\n')
}

// ── Public API ───────────────────────────────────────────────────────

/**
 * Generate a complete privacy policy from structured inputs.
 *
 * This is a pure function — no side effects, no database access.
 * It combines common sections with jurisdiction-specific sections,
 * deduplicates overlapping content, orders everything logically,
 * and renders to HTML.
 */
export function generatePrivacyPolicy(
  inputs: PrivacyPolicyInputs
): PolicyOutput {
  return generatePolicyFromInputs(inputs)
}

/**
 * Alias used by the API route handler.
 * Kept as a separate export for backward compatibility.
 */
export function generatePolicyFromInputs(
  inputs: PrivacyPolicyInputs
): PolicyOutput {
  // 1. Collect all applicable sections
  let sections: PolicySection[] = [...getCommonSections(inputs)]

  for (const jurisdiction of inputs.jurisdictions) {
    const templateFn = JURISDICTION_TEMPLATES[jurisdiction]
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
  const contentHtml = renderSectionsToHtml(sections, inputs.businessName)

  return {
    sections,
    contentHtml,
    contentJson: { sections },
    metadata: {
      generatedAt: new Date().toISOString(),
      jurisdictions: inputs.jurisdictions,
      language: inputs.language,
      businessName: inputs.businessName,
    },
  }
}

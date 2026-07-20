import { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import {
  isPolicyDocSegment,
  publicPolicyUrl,
} from '@/lib/privacy-policy/hosted-url'
import {
  resolvePublishedPolicy,
  canonicalPathForPolicy,
  expectedDocForPolicy,
} from '@/lib/privacy-policy/resolve-hosted'

interface HostedPolicyPageProps {
  params: { slug: string; doc: string }
}

function resolveBusinessName(policy: any): string {
  return (
    policy.inputs?.businessName ||
    policy.business_name ||
    policy.metadata?.businessName ||
    policy.name ||
    'Business'
  )
}

function resolveLanguage(policy: any): 'en' | 'fr' {
  const lang = policy.language || policy.inputs?.language || policy.metadata?.language
  return lang === 'fr' ? 'fr' : 'en'
}

function resolveLogoUrl(policy: any): string | null {
  const url = policy.inputs?.logoUrl
  if (typeof url === 'string' && url.trim() && !url.startsWith('data:')) {
    return url.trim()
  }
  if (typeof url === 'string' && url.startsWith('data:image/') && url.length < 200_000) {
    return url
  }
  return null
}

function preparePolicyHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '')
    .replace(/^\s*<p class="policy-subheading">[\s\S]*?<\/p>\s*/i, '')
}

export async function generateMetadata({ params }: HostedPolicyPageProps): Promise<Metadata> {
  if (!isPolicyDocSegment(params.doc)) {
    return { title: 'Privacy Policy Not Found' }
  }

  const resolved = await resolvePublishedPolicy(params.slug)

  if (resolved.kind === 'redirect') {
    return {
      title: 'Redirecting…',
      alternates: { canonical: `https://www.cookie-banner.ca${resolved.path}` },
    }
  }

  if (resolved.kind !== 'found') {
    return { title: 'Privacy Policy Not Found' }
  }

  const policy = resolved.policy
  const businessName = resolveBusinessName(policy)
  const isFr = resolveLanguage(policy) === 'fr'
  const liveKey = policy.slug || policy.id || params.slug
  const canonical = publicPolicyUrl(liveKey, policy.language)

  return {
    title: isFr
      ? `Politique de confidentialité — ${businessName}`
      : `Privacy Policy — ${businessName}`,
    description: isFr
      ? `Politique de confidentialité de ${businessName}. Découvrez comment vos renseignements personnels sont recueillis, utilisés et protégés.`
      : `Privacy policy for ${businessName}. Learn how your personal information is collected, used, and protected.`,
    alternates: { canonical },
    robots: 'index, follow',
  }
}

/**
 * Canonical hosted policy:
 *   /p/{uniqueKey}/privacy-policy
 *   /p/{uniqueKey}/politique-de-confidentialite
 *
 * {uniqueKey} is unique per policy. The last segment is the same for everyone.
 */
export default async function HostedPolicyPage({ params }: HostedPolicyPageProps) {
  if (!isPolicyDocSegment(params.doc)) {
    notFound()
  }

  const resolved = await resolvePublishedPolicy(params.slug)

  if (resolved.kind === 'redirect') {
    permanentRedirect(resolved.path)
  }

  if (resolved.kind !== 'found') {
    notFound()
  }

  const policy = resolved.policy
  const expectedDoc = expectedDocForPolicy(policy)
  const liveKey = policy.slug || policy.id || params.slug

  // Wrong language segment or outdated key → canonical path
  if (params.doc !== expectedDoc || (policy.slug && params.slug !== policy.slug)) {
    permanentRedirect(canonicalPathForPolicy(policy))
  }

  const businessName = resolveBusinessName(policy)
  const isFr = resolveLanguage(policy) === 'fr'
  const logoUrl = resolveLogoUrl(policy)
  const locale = isFr ? 'fr-CA' : 'en-US'
  const updatedAt = policy.updated_at
    ? new Date(policy.updated_at).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null
  const jurisdictions: string[] =
    policy.jurisdictions ||
    policy.metadata?.jurisdictions ||
    policy.inputs?.jurisdictions ||
    []

  const contentJson = policy.content_json
  const faqItems: Array<{ question: string; answer: string }> = []
  if (contentJson?.sections) {
    for (const section of contentJson.sections) {
      if (section.faqQuestion && section.faqAnswer) {
        faqItems.push({
          question: section.faqQuestion,
          answer: section.faqAnswer,
        })
      }
    }
  }

  const pageUrl = publicPolicyUrl(liveKey, policy.language)
  const title = isFr
    ? `Politique de confidentialité — ${businessName}`
    : `Privacy Policy — ${businessName}`

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: isFr
      ? `Politique de confidentialité de ${businessName}`
      : `Privacy policy for ${businessName}`,
    url: pageUrl,
    dateModified: policy.updated_at,
    inLanguage: isFr ? 'fr-CA' : 'en',
    publisher: {
      '@type': 'Organization',
      name: businessName,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isFr ? 'Accueil' : 'Home',
        item: 'https://www.cookie-banner.ca',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isFr ? 'Politiques de confidentialité' : 'Privacy Policies',
        item: 'https://www.cookie-banner.ca/tools/privacy-policy',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: businessName,
        item: pageUrl,
      },
    ],
  }

  const faqSchema =
    faqItems.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null

  const policyHtml = preparePolicyHtml(policy.content_html || '')

  const jurisdictionLabels: Record<string, string> = {
    gdpr: 'GDPR',
    ccpa: 'CCPA / CPRA',
    pipeda: 'PIPEDA',
    law25: isFr ? 'Loi 25' : 'Law 25',
  }

  // Neutral white page so any brand can embed/link this without our product chrome.
  return (
    <div
      className="min-h-screen bg-white text-neutral-900 antialiased"
      lang={isFr ? 'fr' : 'en'}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="mx-auto max-w-[720px] px-6 sm:px-8 py-12 sm:py-16 md:py-20">
        {/* Document header — plain structure, no cards or tinted backgrounds */}
        <header className="mb-10 pb-8 border-b border-neutral-200">
          <div className="flex items-center gap-3 mb-6">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt=""
                className="h-8 w-8 object-contain shrink-0"
              />
            ) : null}
            <p className="text-sm font-medium text-neutral-500 tracking-wide">
              {businessName}
            </p>
          </div>

          <h1 className="text-[1.75rem] sm:text-3xl md:text-[2rem] font-semibold tracking-tight text-neutral-900 leading-snug">
            {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
          </h1>

          <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap gap-x-5 gap-y-1 text-sm text-neutral-500">
            {updatedAt && (
              <p>
                {isFr ? 'Dernière mise à jour : ' : 'Last updated: '}
                <time dateTime={policy.updated_at} className="text-neutral-700">
                  {updatedAt}
                </time>
              </p>
            )}
            {jurisdictions.length > 0 && (
              <p>
                {isFr ? 'Cadres : ' : 'Applies to: '}
                <span className="text-neutral-700">
                  {jurisdictions
                    .map((j) => jurisdictionLabels[j] || j.toUpperCase())
                    .join(', ')}
                </span>
              </p>
            )}
          </div>
        </header>

        <article
          className="policy-document
            prose prose-neutral max-w-none
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-neutral-900
            prose-h2:text-lg prose-h2:mt-10 prose-h2:mb-3 prose-h2:pt-2
            prose-h3:text-base prose-h3:mt-6 prose-h3:mb-2 prose-h3:text-neutral-800
            prose-p:text-[15px] prose-p:leading-[1.7] prose-p:text-neutral-700
            prose-li:text-[15px] prose-li:leading-[1.65] prose-li:text-neutral-700
            prose-strong:text-neutral-900 prose-strong:font-semibold
            prose-a:text-neutral-900 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-neutral-600
            prose-ul:my-3 prose-ol:my-3
            prose-table:text-sm
            print:prose-sm"
          dangerouslySetInnerHTML={{ __html: policyHtml }}
        />

        <footer className="mt-14 pt-6 border-t border-neutral-200 print:hidden">
          <p className="text-xs text-neutral-400">
            {isFr ? 'Document hébergé pour ' : 'Document hosted for '}
            <span className="text-neutral-600">{businessName}</span>
            {updatedAt ? (
              <>
                {' · '}
                {isFr ? 'mis à jour le ' : 'updated '}
                {updatedAt}
              </>
            ) : null}
          </p>
        </footer>
      </main>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .policy-document .policy-subheading {
              color: #737373;
              font-size: 0.875rem;
              margin-top: -0.15rem;
              margin-bottom: 1.25rem;
            }
            .policy-document table.cookie-table,
            .policy-document table {
              width: 100%;
              border-collapse: collapse;
              margin: 1.25rem 0;
              font-size: 0.875rem;
              border: 1px solid #e5e5e5;
            }
            .policy-document table thead {
              background: #fafafa;
            }
            .policy-document table th {
              text-align: left;
              font-weight: 600;
              color: #171717;
              padding: 0.65rem 0.85rem;
              border-bottom: 1px solid #e5e5e5;
            }
            .policy-document table td {
              padding: 0.6rem 0.85rem;
              border-bottom: 1px solid #f0f0f0;
              color: #404040;
              vertical-align: top;
            }
            .policy-document table tr:last-child td {
              border-bottom: none;
            }
            .policy-document table code {
              font-size: 0.8em;
              background: #f5f5f5;
              padding: 0.1rem 0.3rem;
              border-radius: 0.2rem;
              color: #171717;
            }
            .policy-document h2:first-child {
              margin-top: 0;
            }
            @media print {
              body, .min-h-screen { background: white !important; }
              .policy-document table { break-inside: avoid; }
            }
          `,
        }}
      />
    </div>
  )
}

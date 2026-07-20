import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

interface HostedPolicyPageProps {
  params: { slug: string }
}

async function getPublishedPolicy(slug: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return null
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { data, error } = await supabase
    .from('privacy_policies')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) {
    return null
  }

  return data
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
  // Data URLs can be huge; still allow small ones for branding
  if (typeof url === 'string' && url.startsWith('data:image/') && url.length < 200_000) {
    return url
  }
  return null
}

/**
 * Policy HTML already includes an H1 "Privacy Policy" / "Politique…".
 * The page has its own document title, so strip the first H1 to avoid
 * a doubled, unprofessional header.
 */
function preparePolicyHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\s*/i, '')
    .replace(/^\s*<p class="policy-subheading">[\s\S]*?<\/p>\s*/i, '')
}

export async function generateMetadata({ params }: HostedPolicyPageProps): Promise<Metadata> {
  const policy = await getPublishedPolicy(params.slug)

  if (!policy) {
    return {
      title: 'Privacy Policy Not Found',
    }
  }

  const businessName = resolveBusinessName(policy)
  const isFr = resolveLanguage(policy) === 'fr'

  return {
    title: isFr
      ? `Politique de confidentialité — ${businessName}`
      : `Privacy Policy — ${businessName}`,
    description: isFr
      ? `Politique de confidentialité de ${businessName}. Découvrez comment vos renseignements personnels sont recueillis, utilisés et protégés.`
      : `Privacy policy for ${businessName}. Learn how your personal information is collected, used, and protected.`,
    alternates: {
      canonical: `https://www.cookie-banner.ca/p/${params.slug}`,
    },
    robots: 'index, follow',
  }
}

export default async function HostedPolicyPage({ params }: HostedPolicyPageProps) {
  const policy = await getPublishedPolicy(params.slug)

  if (!policy) {
    notFound()
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
    url: `https://www.cookie-banner.ca/p/${params.slug}`,
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
        item: `https://www.cookie-banner.ca/p/${params.slug}`,
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

  return (
    <div
      className="min-h-screen bg-[#f7f6f3] text-slate-900 antialiased"
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

      {/* Slim top bar — no card boxes */}
      <header className="print:hidden border-b border-slate-200/80 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoUrl}
                alt=""
                className="h-7 w-7 rounded object-contain shrink-0"
              />
            ) : (
              <span className="h-7 w-7 rounded-full bg-slate-900 text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
                {businessName.trim().charAt(0).toUpperCase() || 'P'}
              </span>
            )}
            <span className="text-sm font-medium text-slate-800 truncate">
              {businessName}
            </span>
          </div>
          <nav className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
            <Link
              href="/tools/privacy-policy"
              className="hover:text-slate-800 transition-colors hidden sm:inline"
            >
              {isFr ? 'Générateur' : 'Generator'}
            </Link>
            <Link
              href="/"
              className="hover:text-slate-800 transition-colors"
            >
              Cookie Banner
            </Link>
          </nav>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-10 sm:py-14">
        {/* Document surface */}
        <article className="max-w-3xl mx-auto bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_8px_24px_rgba(15,23,42,0.04)] sm:rounded-xl border border-slate-200/60 overflow-hidden">
          {/* Document header — clean, no chip boxes */}
          <div className="px-6 sm:px-12 pt-10 sm:pt-14 pb-8 border-b border-slate-100">
            <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-slate-400 mb-4">
              {businessName}
            </p>
            <h1 className="text-3xl sm:text-[2.35rem] font-semibold tracking-tight text-slate-900 leading-tight">
              {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
            </h1>

            <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              {updatedAt && (
                <p>
                  <span className="text-slate-400">
                    {isFr ? 'Dernière mise à jour' : 'Last updated'}
                  </span>
                  <span className="mx-1.5 text-slate-300">·</span>
                  <time dateTime={policy.updated_at}>{updatedAt}</time>
                </p>
              )}
              {jurisdictions.length > 0 && (
                <p>
                  <span className="text-slate-400">
                    {isFr ? 'Cadres' : 'Frameworks'}
                  </span>
                  <span className="mx-1.5 text-slate-300">·</span>
                  <span className="text-slate-600">
                    {jurisdictions
                      .map((j) => jurisdictionLabels[j] || j.toUpperCase())
                      .join(' · ')}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Body */}
          <div
            className="policy-document px-6 sm:px-12 py-10 sm:py-12
              prose prose-slate max-w-none
              prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-slate-900
              prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100
              prose-h3:text-base prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-800
              prose-p:text-[15.5px] prose-p:leading-[1.75] prose-p:text-slate-600
              prose-li:text-[15.5px] prose-li:leading-[1.7] prose-li:text-slate-600
              prose-strong:text-slate-800 prose-strong:font-semibold
              prose-a:text-teal-700 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
              prose-ul:my-4 prose-ol:my-4
              prose-table:text-sm
              print:prose-sm print:px-0"
            dangerouslySetInnerHTML={{ __html: policyHtml }}
          />
        </article>

        {/* Quiet footer under document */}
        <footer className="max-w-3xl mx-auto mt-8 px-1 print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-400">
            <p>
              {isFr ? 'Hébergé par ' : 'Hosted by '}
              <Link
                href="https://www.cookie-banner.ca"
                className="text-slate-500 hover:text-slate-700 transition-colors"
              >
                Cookie Banner
              </Link>
            </p>
            {updatedAt && (
              <p>
                {isFr ? 'Mise à jour le ' : 'Updated '}
                {updatedAt}
              </p>
            )}
          </div>
        </footer>
      </main>

      {/* Policy-specific table + subheading polish (not card boxes) */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .policy-document .policy-subheading {
              color: #94a3b8;
              font-size: 0.875rem;
              margin-top: -0.25rem;
              margin-bottom: 1.5rem;
            }
            .policy-document table.cookie-table,
            .policy-document table {
              width: 100%;
              border-collapse: collapse;
              margin: 1.5rem 0;
              font-size: 0.875rem;
              border: 1px solid #e2e8f0;
              border-radius: 0.5rem;
              overflow: hidden;
            }
            .policy-document table thead {
              background: #f8fafc;
            }
            .policy-document table th {
              text-align: left;
              font-weight: 600;
              color: #334155;
              padding: 0.75rem 1rem;
              border-bottom: 1px solid #e2e8f0;
            }
            .policy-document table td {
              padding: 0.7rem 1rem;
              border-bottom: 1px solid #f1f5f9;
              color: #475569;
              vertical-align: top;
            }
            .policy-document table tr:last-child td {
              border-bottom: none;
            }
            .policy-document table code {
              font-size: 0.8em;
              background: #f1f5f9;
              padding: 0.1rem 0.35rem;
              border-radius: 0.25rem;
              color: #0f172a;
            }
            .policy-document h2:first-child {
              margin-top: 0;
            }
            @media print {
              body { background: white !important; }
              .policy-document table { break-inside: avoid; }
            }
          `,
        }}
      />
    </div>
  )
}

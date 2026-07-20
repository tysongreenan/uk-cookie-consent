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
      ? `Politique de confidentialité - ${businessName}`
      : `Privacy Policy - ${businessName}`,
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
    ? `Politique de confidentialité - ${businessName}`
    : `Privacy Policy - ${businessName}`

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
      { '@type': 'ListItem', position: 1, name: isFr ? 'Accueil' : 'Home', item: 'https://www.cookie-banner.ca' },
      {
        '@type': 'ListItem',
        position: 2,
        name: isFr ? 'Générateur de politique de confidentialité' : 'Privacy Policy Generator',
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

  const policyHtml = policy.content_html

  return (
    <div className="min-h-screen bg-white" lang={isFr ? 'fr' : 'en'}>
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

      <nav className="border-b border-gray-200 print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-800 transition-colors">
                {isFr ? 'Accueil' : 'Home'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/tools/privacy-policy"
                className="hover:text-gray-800 transition-colors"
              >
                {isFr ? 'Générateur de politique' : 'Privacy Policy Generator'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-800 font-medium">{businessName}</li>
          </ol>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <header className="mb-8 pb-8 border-b border-gray-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
          </h1>
          <p className="text-lg text-gray-600">{businessName}</p>
          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
            {updatedAt && (
              <span>
                {isFr ? 'Dernière mise à jour :' : 'Last updated:'} {updatedAt}
              </span>
            )}
            {jurisdictions.length > 0 && (
              <span>
                {isFr ? 'Couvre :' : 'Covers:'} {jurisdictions.join(', ')}
              </span>
            )}
          </div>
        </header>

        <article
          className="prose prose-gray prose-lg max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-li:text-gray-700
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            print:prose-sm"
          dangerouslySetInnerHTML={{ __html: policyHtml }}
        />
      </main>

      <footer className="border-t border-gray-200 print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>
              {isFr ? 'Généré avec ' : 'Generated with '}
              <Link
                href="https://www.cookie-banner.ca/tools/privacy-policy"
                className="text-blue-600 hover:underline font-medium"
              >
                {isFr
                  ? 'le générateur Cookie Banner'
                  : 'Cookie Banner Privacy Policy Generator'}
              </Link>
            </p>
            {updatedAt && (
              <p>
                {isFr ? 'Dernière mise à jour :' : 'Last updated:'} {updatedAt}
              </p>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}

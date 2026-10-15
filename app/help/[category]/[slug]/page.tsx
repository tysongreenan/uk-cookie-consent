import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { FileText } from 'lucide-react'
import {
  getAllHelpArticles,
  getArticlesInCategory,
  getHelpArticle,
  getHelpCategory,
  getHelpSearchItems,
  helpArticlePath,
} from '@/lib/help/help'
import { HelpShell, HelpContactCard } from '@/components/help/help-shell'
import { ArticleFeedback } from '@/components/help/article-feedback'
import { formatDate } from '@/lib/utils'

const SITE_URL = 'https://www.cookie-banner.ca'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllHelpArticles().map((a) => ({ category: a.category, slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { category: string; slug: string } }): Promise<Metadata> {
  const article = await getHelpArticle(params.category, params.slug)
  if (!article) return { title: 'Not Found', robots: { index: false, follow: false } }
  const url = `${SITE_URL}${helpArticlePath(article)}`
  return {
    title: `${article.title} | Cookie Banner Help Center`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: { title: article.title, description: article.description, url, type: 'article' },
  }
}

export default async function HelpArticlePage({ params }: { params: { category: string; slug: string } }) {
  const article = await getHelpArticle(params.category, params.slug)
  const category = getHelpCategory(params.category)
  if (!article || !category) notFound()

  const inSection = getArticlesInCategory(category.slug).filter((a) => a.section === article.section)

  return (
    <HelpShell
      searchItems={getHelpSearchItems()}
      breadcrumbs={[
        { label: 'Help Center', href: '/help' },
        { label: category.title, href: `/help/${category.slug}` },
        { label: article.section || article.title },
      ]}
    >
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <article className="min-w-0">
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">{article.title}</h1>
            {article.updated && (
              <p className="mt-4 text-sm text-muted-foreground">Updated {formatDate(`${article.updated}T12:00:00Z`)}</p>
            )}
            <hr className="mt-6" />

            <div className="help-article mt-8" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />

            <div className="mt-12">
              <ArticleFeedback slug={article.slug} />
            </div>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="Articles in this section" className="rounded-lg bg-muted/60 p-7">
              <h2 className="text-lg font-semibold text-foreground">Articles in this section</h2>
              <span className="mt-2 block h-[3px] w-12 rounded-full bg-primary" aria-hidden="true" />
              <ul className="mt-5 space-y-4">
                {inSection.map((a) => (
                  <li key={a.slug} className="flex items-start gap-3">
                    <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    {a.slug === article.slug ? (
                      <span aria-current="page" className="text-primary">
                        {a.title}
                      </span>
                    ) : (
                      <Link href={helpArticlePath(a)} className="text-foreground hover:text-primary">
                        {a.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
            <HelpContactCard />
          </aside>
        </div>
      </div>
    </HelpShell>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getAllHelpArticles, getArticlesInCategory, getHelpArticle, getHelpCategory, helpArticlePath } from '@/lib/help/help'
import { HelpShell, HelpBreadcrumbs, HelpContactCard } from '@/components/help/help-shell'
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
    <HelpShell>
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-6xl">
          <HelpBreadcrumbs
            items={[
              { label: 'Help Center', href: '/help' },
              { label: category.title, href: `/help/${category.slug}` },
              { label: article.title },
            ]}
          />

          <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_280px]">
            <article className="min-w-0">
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{article.title}</h1>
              {article.updated && (
                <p className="mt-3 text-sm text-muted-foreground">Updated {formatDate(`${article.updated}T12:00:00Z`)}</p>
              )}

              <div
                className="help-article mt-8"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />

              <div className="mt-12">
                <ArticleFeedback slug={article.slug} />
              </div>
            </article>

            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              {inSection.length > 1 && (
                <nav aria-label={`Articles in ${article.section}`}>
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    Articles in this section
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {inSection.map((a) => (
                      <li key={a.slug}>
                        {a.slug === article.slug ? (
                          <span aria-current="page" className="font-medium text-foreground">
                            {a.title}
                          </span>
                        ) : (
                          <Link href={helpArticlePath(a)} className="text-muted-foreground hover:text-primary">
                            {a.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <HelpContactCard />
            </aside>
          </div>
        </div>
      </div>
    </HelpShell>
  )
}

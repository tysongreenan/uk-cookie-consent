import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, FileText } from 'lucide-react'
import { getActiveHelpCategories, getAllHelpArticles, getHelpCategory, helpArticlePath } from '@/lib/help/help'
import { HelpShell, HelpContactCard } from '@/components/help/help-shell'
import { HelpSearch } from '@/components/help/help-search'
import { HelpCategoryIconView } from '@/components/help/help-category-icon'

export const metadata: Metadata = {
  title: 'Help Center | Cookie Banner',
  description: 'Answers to common questions about installing, customizing, and troubleshooting your cookie consent banner.',
  alternates: { canonical: 'https://www.cookie-banner.ca/help' },
}

export default function HelpCenterPage() {
  const categories = getActiveHelpCategories()
  const articles = getAllHelpArticles()
  const popular = articles.filter((a) => a.popular)

  const searchItems = articles.map((a) => ({
    title: a.title,
    description: a.description,
    keywords: a.keywords,
    href: helpArticlePath(a),
    categoryTitle: getHelpCategory(a.category)?.title || '',
  }))

  return (
    <HelpShell>
      <section className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-16 text-center sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">How can we help?</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Guides and fixes for your cookie banner, written by the team that builds it.
          </p>
          <div className="mt-8">
            <HelpSearch items={searchItems} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14">
        <div className="mx-auto max-w-5xl">
          <h2 className="sr-only">Browse by topic</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/help/${category.slug}`}
                className="group flex flex-col rounded-xl border p-6 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <HelpCategoryIconView icon={category.icon} className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground group-hover:text-primary">{category.title}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{category.description}</p>
                <p className="mt-4 text-xs font-medium text-muted-foreground">
                  {category.articleCount} {category.articleCount === 1 ? 'article' : 'articles'}
                </p>
              </Link>
            ))}
          </div>

          {popular.length > 0 && (
            <div className="mt-14">
              <h2 className="text-xl font-semibold text-foreground">Popular articles</h2>
              <ul className="mt-4 grid gap-x-8 sm:grid-cols-2">
                {popular.map((article) => (
                  <li key={article.slug} className="border-b">
                    <Link
                      href={helpArticlePath(article)}
                      className="group flex items-center gap-3 py-3 text-foreground hover:text-primary"
                    >
                      <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                      <span className="flex-1">{article.title}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mx-auto mt-14 max-w-xl">
            <HelpContactCard />
          </div>
        </div>
      </section>
    </HelpShell>
  )
}

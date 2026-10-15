import Link from 'next/link'
import { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { getActiveHelpCategories, getAllHelpArticles, getHelpSearchItems, helpArticlePath } from '@/lib/help/help'
import { HelpShell, HelpContactCard } from '@/components/help/help-shell'
import { HelpCategoryIconView } from '@/components/help/help-category-icon'

export const metadata: Metadata = {
  title: 'Help Center | Cookie Banner',
  description: 'Answers to common questions about installing, customizing, and troubleshooting your cookie consent banner.',
  alternates: { canonical: 'https://www.cookie-banner.ca/help' },
}

export default function HelpCenterPage() {
  const categories = getActiveHelpCategories()
  const popular = getAllHelpArticles().filter((a) => a.popular)

  return (
    <HelpShell
      searchItems={getHelpSearchItems()}
      heroTitle="How can we help?"
      heroSubtitle="Guides and fixes for your cookie banner, from the team that builds it."
    >
      <div className="container mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold text-foreground">Browse by topic</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/help/${category.slug}`}
              className="group flex flex-col rounded-lg border bg-background p-6 transition-all hover:border-primary/40 hover:shadow-md"
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
            <h2 className="text-2xl font-semibold text-foreground">Popular articles</h2>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
              {popular.map((article) => (
                <li key={article.slug} className="border-b">
                  <Link href={helpArticlePath(article)} className="flex items-start gap-3 py-3.5 text-foreground hover:text-primary">
                    <FileText className="mt-1 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
                    <span>{article.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-14 max-w-xl">
          <HelpContactCard />
        </div>
      </div>
    </HelpShell>
  )
}

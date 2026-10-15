import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { getActiveHelpCategories, getArticlesInCategory, getHelpCategory, helpArticlePath } from '@/lib/help/help'
import { HelpShell, HelpBreadcrumbs, HelpContactCard } from '@/components/help/help-shell'
import { HelpCategoryIconView } from '@/components/help/help-category-icon'

export const dynamicParams = false

export function generateStaticParams() {
  return getActiveHelpCategories().map((c) => ({ category: c.slug }))
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = getHelpCategory(params.category)
  if (!category) return { title: 'Not Found', robots: { index: false, follow: false } }
  return {
    title: `${category.title} | Cookie Banner Help Center`,
    description: category.description,
    alternates: { canonical: `https://www.cookie-banner.ca/help/${category.slug}` },
  }
}

export default function HelpCategoryPage({ params }: { params: { category: string } }) {
  const category = getHelpCategory(params.category)
  const articles = getArticlesInCategory(params.category)
  if (!category || articles.length === 0) notFound()

  // Sections in the declared order, then any section only named in frontmatter
  const sectionNames = [
    ...category.sections,
    ...Array.from(new Set(articles.map((a) => a.section))).filter((s) => !category.sections.includes(s)),
  ]
  const sections = sectionNames
    .map((name) => ({ name, articles: articles.filter((a) => a.section === name) }))
    .filter((s) => s.articles.length > 0)

  return (
    <HelpShell>
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-4xl">
          <HelpBreadcrumbs items={[{ label: 'Help Center', href: '/help' }, { label: category.title }]} />

          <div className="mt-8 flex items-start gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <HelpCategoryIconView icon={category.icon} className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">{category.title}</h1>
              <p className="mt-1 text-muted-foreground">{category.description}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {sections.map((section) => (
              <section key={section.name}>
                <h2 className="text-lg font-semibold text-foreground">{section.name || 'Articles'}</h2>
                <ul className="mt-3">
                  {section.articles.map((article) => (
                    <li key={article.slug}>
                      <Link
                        href={helpArticlePath(article)}
                        className="flex gap-3 border-b py-3 text-foreground hover:text-primary"
                      >
                        <FileText className="mt-1 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                        <span>{article.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-14 max-w-xl">
            <HelpContactCard />
          </div>
        </div>
      </div>
    </HelpShell>
  )
}

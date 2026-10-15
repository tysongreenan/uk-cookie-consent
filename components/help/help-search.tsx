'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, FileText } from 'lucide-react'

export interface HelpSearchItem {
  title: string
  description: string
  keywords: string
  href: string
  categoryTitle: string
}

export function HelpSearch({ items }: { items: HelpSearchItem[] }) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (terms.length === 0) return []
    return items.filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.keywords}`.toLowerCase()
      return terms.every((term) => haystack.includes(term))
    })
  }, [items, query])

  const hasQuery = query.trim().length > 0

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <label htmlFor="help-search" className="sr-only">
        Search help articles
      </label>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <input
        id="help-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for answers, e.g. banner not showing"
        autoComplete="off"
        className="h-14 w-full rounded-xl border bg-background pl-12 pr-4 text-base shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      {hasQuery && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border bg-background text-left shadow-lg">
          {results.length > 0 ? (
            <ul className="max-h-96 divide-y overflow-y-auto">
              {results.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex gap-3 px-4 py-3 transition-colors hover:bg-muted/60">
                    <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" aria-hidden="true" />
                    <span>
                      <span className="block font-medium text-foreground">{item.title}</span>
                      <span className="block text-xs text-muted-foreground">{item.categoryTitle}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-4 text-sm text-muted-foreground">
              No articles match &ldquo;{query.trim()}&rdquo;.{' '}
              <Link href="/support" className="font-medium text-primary hover:underline">
                Contact support
              </Link>{' '}
              and we&apos;ll help.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

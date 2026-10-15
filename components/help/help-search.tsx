'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FileText } from 'lucide-react'

export interface HelpSearchItem {
  title: string
  description: string
  keywords: string
  href: string
  categoryTitle: string
}

export function HelpSearch({ items }: { items: HelpSearchItem[] }) {
  const router = useRouter()
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
    <form
      role="search"
      className="relative w-full max-w-2xl"
      onSubmit={(e) => {
        e.preventDefault()
        if (results[0]) router.push(results[0].href)
      }}
    >
      <label htmlFor="help-search" className="sr-only">
        Search the help center
      </label>
      <div className="flex rounded-lg bg-white p-1.5 shadow-lg">
        <input
          id="help-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the help center..."
          autoComplete="off"
          className="h-12 min-w-0 flex-1 bg-transparent px-4 text-base text-neutral-900 outline-none placeholder:text-neutral-500"
        />
        <button
          type="submit"
          className="rounded-md bg-neutral-900 px-6 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Search
        </button>
      </div>

      {hasQuery && (
        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-lg border bg-background text-left shadow-xl">
          {results.length > 0 ? (
            <ul className="max-h-96 divide-y overflow-y-auto">
              {results.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex gap-3 px-4 py-3 transition-colors hover:bg-muted/60">
                    <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" aria-hidden="true" />
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
    </form>
  )
}

import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { BlogHeroCta as BlogHeroCtaData } from '@/lib/blog/blog'

export function BlogHeroCta({ primary, secondary }: BlogHeroCtaData) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-1">
      <Button asChild>
        <Link href={primary.href}>
          <Search className="mr-2 h-4 w-4" aria-hidden="true" />
          {primary.label}
        </Link>
      </Button>
      {secondary && (
        <Button asChild variant="outline">
          <Link href={secondary.href}>
            {secondary.label}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      )}
    </div>
  )
}

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { BlogCtaLink } from '@/lib/blog/blog'

const DEFAULT_PRIMARY: BlogCtaLink = {
  label: 'Start a free banner',
  href: '/free-cookie-banner',
}

const DEFAULT_SECONDARY: BlogCtaLink = {
  label: 'Scan your site',
  href: '/tools/cookie-scanner',
}

interface BlogCTAProps {
  primary?: BlogCtaLink
  secondary?: BlogCtaLink
  compact?: boolean
}

export function BlogCTA({
  primary = DEFAULT_PRIMARY,
  secondary = DEFAULT_SECONDARY,
  compact = false,
}: BlogCTAProps) {
  if (compact) {
    return (
      <Card className="border border-border bg-card">
        <CardContent className="p-5">
          <h3 className="text-base font-semibold tracking-tight mb-1">
            Fix it in 5 minutes
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Free banner. No signup. Copy-paste install.
          </p>
          <Button asChild className="w-full">
            <Link href={primary.href}>
              {primary.label}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Link
            href={secondary.href}
            className="mt-3 block text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
          >
            {secondary.label}
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-border bg-muted/30">
      <CardContent className="p-8 text-center">
        <span className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Next step
        </span>

        <h3 className="text-2xl font-bold mt-2 mb-4">
          Ready to add a cookie banner?
        </h3>

        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Create a free banner in minutes and paste it onto your site. No signup required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href={primary.href}>
              {primary.label}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg">
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          Free plan: 1 banner on unlimited sites. Pro is $99 one-time.
        </p>
      </CardContent>
    </Card>
  )
}

import Link from 'next/link'
import { ArrowRight, Check, Shield, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

/** 21st.dev: 7ovr/comparison-2 — Us vs Them side-by-side cards. */
export function Comparison2({
  title,
  lede,
  left,
  right,
}: {
  title: string
  lede?: string
  left: {
    title: string
    badge?: string
    description: string
    points: string[]
    ctaLabel: string
    ctaHref: string
  }
  right: {
    title: string
    description: string
    points: string[]
    ctaLabel: string
    ctaHref: string
  }
}) {
  return (
    <section className="bg-background px-6 py-20 text-foreground lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <Badge variant="outline" className="mb-4 gap-1.5">
            <Shield className="size-3.5" />
            CCPA vs GDPR
          </Badge>
          <h2 className="font-heading text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-[52px]">
            {title}
          </h2>
          {lede ? (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{lede}</p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="rounded-[20px] border-primary/30 ring-1 ring-primary/20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <CardTitle className="font-heading text-base font-semibold">{left.title}</CardTitle>
                {left.badge ? <Badge variant="default">{left.badge}</Badge> : null}
              </div>
              <CardDescription>{left.description}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <ul className="flex flex-col gap-3">
                {left.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm bg-primary">
                      <Check className="size-3 text-primary-foreground" aria-hidden />
                    </span>
                    <span className="text-sm text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t">
              <Button asChild className="w-full">
                <Link href={left.ctaHref}>
                  {left.ctaLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="rounded-[20px] bg-muted/30">
            <CardHeader>
              <CardTitle className="font-heading text-base font-semibold text-muted-foreground">
                {right.title}
              </CardTitle>
              <CardDescription>{right.description}</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-4">
              <ul className="flex flex-col gap-3">
                {right.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-sm bg-muted">
                      <X className="size-3 text-muted-foreground" aria-hidden />
                    </span>
                    <span className="text-sm text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t">
              <Button asChild variant="secondary" className="w-full">
                <Link href={right.ctaHref}>
                  {right.ctaLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

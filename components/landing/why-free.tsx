import { Heart, Users, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function WhyFree() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
            Why Is This Free?
          </h2>
        </div>

        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="p-8 md:p-10">
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              
              <div className="space-y-4">
                <p className="text-lg leading-relaxed text-foreground">
                  We&apos;re building something better than the bloated tools out there — and we want to prove it. The first 1,000 people get full access, forever. No card. No spam. Just a chance to be part of a better solution.
                </p>
                
                <div className="rounded-lg bg-primary/5 p-6">
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <p className="font-semibold text-foreground">
                      Limited Time Offer
                    </p>
                  </div>
                  <p className="text-muted-foreground">
                    Once we hit 1,000 accounts, pricing kicks in. But you&apos;ll be grandfathered in at $0.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span>No catch. No hidden fees. Just cookie banner tools that actually work.</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

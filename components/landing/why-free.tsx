import { Heart, Users, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function WhyFree() {
  return (
    <section className="container px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-center sm:mb-8">
          <h2 className="mb-3 font-heading text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
            Why Is This Free?
          </h2>
        </div>

        <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
          <CardContent className="p-6 sm:p-8 md:p-10">
            <div className="space-y-5 text-center sm:space-y-6">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 sm:h-16 sm:w-16">
                <Heart className="h-7 w-7 text-primary sm:h-8 sm:w-8" />
              </div>
              
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-foreground sm:text-lg">
                  We&apos;re building something better than the bloated tools out there — and we want to prove it. The first 1,000 people get full access, forever. No card. No spam. Just a chance to be part of a better solution.
                </p>
                
                <div className="rounded-lg bg-primary/5 p-4 sm:p-6">
                  <div className="mb-2 flex items-center justify-center gap-2 sm:mb-3">
                    <Users className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                    <p className="text-sm font-semibold text-foreground sm:text-base">
                      Limited Time Offer
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    Once we hit 1,000 accounts, pricing kicks in. But you&apos;ll be grandfathered in at $0.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground sm:text-sm">
                  <Sparkles className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
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

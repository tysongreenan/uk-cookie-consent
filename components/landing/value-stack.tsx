import { Check, Repeat, Palette, FileText, Globe, Zap, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const features = [
  {
    icon: Repeat,
    title: 'Save 3+ Hours Per Website',
    description: 'Unlimited banners across all your sites',
  },
  {
    icon: Palette,
    title: 'Match Your Brand Perfectly',
    description: 'Custom colors, fonts, and style in 2 clicks',
  },
  {
    icon: FileText,
    title: 'Avoid $20K+ GDPR Fines',
    description: 'Automatic compliance with all privacy laws',
  },
  {
    icon: Globe,
    title: 'Works on Any Platform',
    description: 'WordPress, Shopify, Webflow, custom sites',
  },
  {
    icon: Zap,
    title: 'Zero Performance Impact',
    description: 'Lightweight code that loads in milliseconds',
  },
]

export function ValueStack() {
  return (
    <section className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="mb-3 font-heading text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              What You Get
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              Everything to stay compliant and save time
            </p>
          </div>

          <ul className="space-y-3 sm:space-y-4">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="flex items-start gap-3 rounded-lg bg-background p-4 shadow-sm transition-all hover:shadow-md sm:gap-4 sm:p-6"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 sm:h-10 sm:w-10">
                  <feature.icon className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <Check className="h-4 w-4 shrink-0 text-green-600 sm:h-5 sm:w-5" />
                    <h3 className="text-base font-semibold sm:text-lg">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          
          {/* Mini CTA after benefits */}
          <div className="mt-8 text-center">
            <Button asChild size="lg" className="bg-brand-red hover:bg-brand-red/90 text-white">
              <Link href="/dashboard">
                Build Mine Like This
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

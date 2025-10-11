import { Check, Repeat, Palette, FileText, Globe, Zap } from 'lucide-react'

const features = [
  {
    icon: Repeat,
    title: 'Unlimited cookie banners',
    description: 'use on as many sites as you want',
  },
  {
    icon: Palette,
    title: 'Fully branded designs',
    description: 'match your site\'s colors, fonts, and style',
  },
  {
    icon: FileText,
    title: 'Visual banner builder',
    description: 'customize every detail with live preview',
  },
  {
    icon: Globe,
    title: 'Works everywhere',
    description: 'WordPress, Shopify, Webflow, and custom sites',
  },
  {
    icon: Zap,
    title: 'Fast and lightweight',
    description: 'optimized code that won\'t slow down your site',
  },
]

export function ValueStack() {
  return (
    <section className="bg-muted/30 px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="mb-3 font-heading text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              What&apos;s Included
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              Everything you need to stay compliant and keep your brand consistent
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
        </div>
      </div>
    </section>
  )
}

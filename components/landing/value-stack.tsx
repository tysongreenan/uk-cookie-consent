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
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
              What&apos;s Included
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to stay compliant and keep your brand consistent
            </p>
          </div>

          <ul className="space-y-4">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="flex items-start gap-4 rounded-lg bg-background p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <Check className="h-5 w-5 shrink-0 text-green-600" />
                    <h3 className="text-lg font-semibold">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="mt-1 text-muted-foreground">
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

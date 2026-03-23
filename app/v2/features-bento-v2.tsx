'use client'

import { Palette, Shield, Globe, Zap, Clock, DollarSign, Layers, Smartphone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/**
 * V2 FeaturesBento — A/B test variant
 *
 * Change from V1: Added font-heading to h2 (Bricolage Grotesque instead of Geist Sans)
 */
export function FeaturesBentoV2() {
  const features = [
    {
      Icon: Shield,
      name: "Avoid $20K+ Fines Automatically",
      description: "GDPR, PIPEDA, CASL & Quebec Law 25 compliant out of the box. Automatic compliance protects you from costly privacy law violations.",
      href: "/features/privacy-laws",
      cta: "See compliance details",
      gradient: "from-red-500/10 via-orange-500/5 to-yellow-500/10",
      className: "md:col-span-2",
    },
    {
      Icon: Clock,
      name: "5-Minute Setup, No Coding",
      description: "Visual drag-and-drop builder with live preview. Copy-paste installation works on any platform. From signup to live banner in minutes.",
      href: "#",
      cta: "Try the builder",
      gradient: "from-blue-500/10 via-cyan-500/5 to-teal-500/10",
      className: "md:col-span-1",
    },
    {
      Icon: Palette,
      name: "Match Your Brand Perfectly",
      description: "13 position options, full color customization, logo upload, animations, and custom CSS/JS. Looks custom-built, not a template.",
      href: "#",
      cta: "Customize now",
      gradient: "from-pink-500/10 via-purple-500/5 to-indigo-500/10",
      className: "md:col-span-2",
    },
    {
      Icon: Globe,
      name: "Canadian-First Compliance",
      description: "PIPEDA, CASL & Quebec Law 25 built-in. Full bilingual support (EN/FR) with auto-detection. The only solution designed for Canadian businesses.",
      href: "/compliance/pipeda",
      cta: "Learn more",
      gradient: "from-red-500/10 via-white/5 to-red-500/10",
      className: "md:col-span-1",
    },
    {
      Icon: DollarSign,
      name: "Free Plan + One-Time Pro Upgrade",
      description: "Start free with no credit card. Upgrade to Pro for $99 one-time — unlimited banners, analytics, and team features. No monthly fees. Competitors charge $9-15/month.",
      href: "/pricing",
      cta: "View pricing",
      gradient: "from-green-500/10 via-emerald-500/5 to-teal-500/10",
      className: "md:col-span-1",
    },
    {
      Icon: Zap,
      name: "Zero Performance Impact",
      description: "Lightweight code (under 10KB) loads in milliseconds. Doesn't affect Core Web Vitals or SEO. Mobile-optimized and fast.",
      href: "#",
      cta: "See performance",
      gradient: "from-purple-500/10 via-violet-500/5 to-fuchsia-500/10",
      className: "md:col-span-1",
    },
    {
      Icon: Layers,
      name: "Smart Script Management",
      description: "Pre-filled templates for Google Analytics, Facebook Pixel, and more. Category-based organization. Google Consent Mode V2 ready.",
      href: "#",
      cta: "View templates",
      gradient: "from-indigo-500/10 via-blue-500/5 to-cyan-500/10",
      className: "md:col-span-1",
    },
    {
      Icon: Smartphone,
      name: "Works on Any Platform",
      description: "WordPress, Shopify, Webflow, or custom sites. Copy-paste installation works everywhere. No plugins or complex setup required.",
      href: "#",
      cta: "View integrations",
      gradient: "from-slate-500/10 via-gray-500/5 to-zinc-500/10",
      className: "md:col-span-2",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <header className="text-center mb-12">
            <Badge className="mb-4 bg-muted text-foreground border-border">
              Features & Benefits
            </Badge>
            {/* V2: Added font-heading for Bricolage Grotesque */}
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Everything You Need, From Start to Finish
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional cookie consent banners that protect you legally, match your brand perfectly, and work everywhere—all in 5 minutes.
            </p>
          </header>

          {/* Desktop: Dynamic Bento Grid */}
          <div className="hidden md:grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {features.map((feature, idx) => {
              const FeatureIcon = feature.Icon
              return (
                <article
                  key={idx}
                  className={cn(
                    "group relative flex flex-col justify-between overflow-hidden rounded-xl",
                    "bg-background border border-border",
                    "transform-gpu transition-all duration-300 ease-out hover:scale-[1.02]",
                    "min-h-[18rem]",
                    feature.className
                  )}
                >
                  <div className={cn("absolute inset-0 bg-gradient-to-br", feature.gradient)} />
                  <div className="relative z-10 flex flex-col gap-3 p-6">
                    <FeatureIcon className="h-8 w-8 text-foreground" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-foreground">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">{feature.description}</p>
                  </div>
                  {feature.href && feature.cta && (
                    <div className="relative z-20 p-4 pt-0">
                      <a href={feature.href} className="text-sm font-semibold text-foreground hover:underline inline-flex items-center gap-1">
                        {feature.cta} →
                      </a>
                    </div>
                  )}
                </article>
              )
            })}
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-4">
            {features.map((feature, idx) => {
              const FeatureIcon = feature.Icon
              return (
                <article key={idx} className="group relative flex flex-col overflow-hidden rounded-xl bg-background border border-border p-6">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", feature.gradient)} />
                  <div className="relative z-10 flex flex-col gap-3">
                    <FeatureIcon className="h-8 w-8 text-foreground" aria-hidden="true" />
                    <h3 className="text-xl font-semibold text-foreground">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    {feature.href && feature.cta && (
                      <a href={feature.href} className="text-sm font-semibold text-foreground hover:underline inline-flex items-center gap-1 mt-2">
                        {feature.cta} →
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

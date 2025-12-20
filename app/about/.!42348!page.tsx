
import { Metadata } from 'next'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'About Cookie-Banner.ca — The Rebellious Cookie Banner Tool Built in Canada',
  description: 'Discover why Cookie-Banner.ca was built. A no-BS, unlimited, branded cookie banner generator from a Canadian founder who believes compliance should empower creativity — not kill it.',
  keywords: [
    'about cookie banner tool',
    'Canadian cookie consent',
    'GDPR PIPEDA compliance',
    'branded banners',
    'privacy law',
    'unlimited cookie banners',
    'custom branded',
    'no per-domain fees',
    'creative-first compliance',
  ],
  openGraph: {
    title: 'About Cookie-Banner.ca — Built in Canada',
    description: 'A no-BS, unlimited, branded cookie banner generator from a Canadian founder who believes compliance should empower creativity.',
    type: 'website',
    locale: 'en_CA',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl py-16">
        <Link 
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="mb-6 font-heading text-4xl font-bold leading-tight sm:text-5xl">
            About Cookie-Banner.ca
          </h1>
        </div>

        <div className="prose prose-gray max-w-none space-y-12 dark:prose-invert">
          
          <section>
            <h2 className="mb-6 text-3xl font-bold">Born From Frustration. Built For Freedom.</h2>
            
            <div className="space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>We didn&apos;t set out to build a &quot;cookie banner tool.&quot;</p>
              <p className="font-semibold">We set out to fix a broken space.</p>
              
              <p>Because let&apos;s be real — most cookie banners?</p>
              
              <div className="my-6 rounded-lg border-l-4 border-primary bg-muted/30 p-6">
                <p className="text-xl font-semibold">
                  Ugly. Clunky. Overpriced.
                </p>
                <p className="mt-2">
                  Locked behind limits, buried in jargon, and completely out of step with how modern websites are built.
                </p>
              </div>
              
              <p>I looked around and thought:</p>
              <p className="text-2xl font-bold text-brand-red">&quot;Why are we settling for this?&quot;</p>
              <p>So I built something better.</p>
            </div>
          </section>

          <section className="rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 p-8 md:p-10">
            <h2 className="mb-6 text-3xl font-bold">Who&apos;s Behind This?</h2>
            
            <div className="space-y-6">
              <div className="mx-auto max-w-md">
                <img 
                  src="/tyson-girlfriend-universal.webp" 
                  alt="Tyson Greenan with Emily Trenchard"
                  className="w-full rounded-lg shadow-lg"
                />
                <p className="mt-2 text-center text-sm text-muted-foreground italic">
                  Tyson Greenan with Emily Trenchard
                </p>
              </div>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p>Hey — I&apos;m Tyson Greenan, co-founder of Cookie-Banner.ca, along with Emily Trenchard.</p>
              
                <p>
                  We&apos;re Canadian builders who don&apos;t believe in copying what&apos;s already out there. 
                  We believe in seeing the gap, challenging the default, and shipping things that make sense.
                </p>
                
                <p>
                  We&apos;re not interested in fake urgency, growth hacks, or legal fear-mongering.<br />
                  <span className="font-semibold">We&apos;re interested in clarity, creativity, and control.</span>
                </p>
                
                <div className="my-8 space-y-4 rounded-lg bg-background/80 p-6">
                  <p className="font-semibold text-foreground">This product is built on the same values we run on:</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-teal/20 text-brand-teal">✓</div>
                      <div>
                        <p className="font-semibold">Freedom over fear</p>
                        <p className="text-muted-foreground">You should never feel boxed in by compliance.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-teal/20 text-brand-teal">✓</div>
                      <div>
                        <p className="font-semibold">Creativity over compliance</p>
                        <p className="text-muted-foreground">Design matters. Brand matters. Your site should still look and feel like you.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-teal/20 text-brand-teal">✓</div>
                      <div>
                        <p className="font-semibold">Transparency over tricks</p>
                        <p className="text-muted-foreground">No bait, no switch, no &quot;gotcha&quot; pricing.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-teal/20 text-brand-teal">✓</div>
                      <div>
                        <p className="font-semibold">Community over clout</p>
                        <p className="text-muted-foreground">I&apos;d rather serve 1,000 loyal customers than chase vanity downloads.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-3xl font-bold">What We Believe</h2>
            
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="text-xl font-semibold">This is more than a tool — it&apos;s a small rebellion.</p>
              
              <p>We believe cookie banners can be:</p>
              
              <div className="my-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border bg-card p-4">
                  <p className="flex items-center gap-2 font-semibold">
                    <span className="text-2xl">✅</span> Branded, not boring
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <p className="flex items-center gap-2 font-semibold">
                    <span className="text-2xl">✅</span> Unlimited, not nickel-and-dimed
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <p className="flex items-center gap-2 font-semibold">
                    <span className="text-2xl">✅</span> Clear, not buried in legalese
                  </p>
                </div>
                <div className="rounded-lg border bg-card p-4">
                  <p className="flex items-center gap-2 font-semibold">
                    <span className="text-2xl">✅</span> Fast to install, and easy to love
                  </p>
                </div>
              </div>
              
              <p className="rounded-lg bg-brand-teal/10 p-6 font-semibold">
                And we believe Canada deserves tools made for its own standards — like <strong>PIPEDA</strong> and <strong>CASL</strong>, not just EU-centric GDPR clones.
              </p>
            </div>
          </section>

          <section className="rounded-xl border-2 border-brand-teal/20 bg-gradient-to-br from-brand-teal/5 to-brand-purple/5 p-8 md:p-10">
            <h2 className="mb-6 text-3xl font-bold">Why We&apos;re Free (for the First 1,000)</h2>
            
            <div className="space-y-4 text-lg leading-relaxed">
              <p>Most startups throw up a paywall before they earn your trust.</p>
              <p className="font-semibold">We&apos;re doing the opposite.</p>
              
              <p>
                We&apos;re giving away the full product — no restrictions — to the first 1,000 accounts.
              </p>
              
              <p className="text-xl font-semibold">Why?</p>
              
              <p className="text-xl">Because we&apos;re not here to extract. We&apos;re here to build trust.</p>
              
              <p>
                If the product&apos;s great, we won&apos;t need clever pricing tricks.<br />
                You&apos;ll stick around because it&apos;s the right fit — not because we locked you in.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 text-3xl font-bold">The Vision Moving Forward</h2>
            
            <div className="space-y-4 text-lg leading-relaxed">
              <p className="text-xl font-semibold">Cookie-Banner.ca is just the start.</p>
              
              <p>

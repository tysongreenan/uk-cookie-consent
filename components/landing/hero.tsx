'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { HeroBannerShowcase } from './hero-banner-showcase'

export function Hero() {
  const { data: session } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    // Navigate to signup page with email pre-filled
    router.push(`/auth/signup?email=${encodeURIComponent(email)}`)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-12 sm:py-16 md:py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="flex flex-col items-center gap-4 text-center lg:text-left lg:items-start">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-muted-foreground">Used by 1,000+ websites</span>
            </div>

            {/* H1 - Following Audience + Outcome + Proof formula */}
            <div className="space-y-4">
              <h1 className="font-heading text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
                Create GDPR-Compliant Cookie Banners in 5 Minutes —{' '}
                <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Used by 1,000+ Websites
                </span>
              </h1>
              
              <div className="mx-auto max-w-2xl space-y-3">
                <p className="text-lg font-semibold text-foreground">
                  ✓ Save 3+ Hours Per Website Setup
                </p>
                
                <p className="text-lg font-semibold text-foreground">
                  ✓ Avoid $20K+ GDPR Fines Automatically
                </p>
                
                <p className="text-lg font-semibold text-foreground">
                  ✓ Copy & Paste in 5 Minutes
                </p>
              </div>
            </div>

            {/* CTA - More prominent */}
            <div className="w-full max-w-sm">
              {session ? (
                <Button asChild size="lg" className="w-full h-12 text-base font-semibold">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <form onSubmit={handleEmailSubmit} className="space-y-2">
                  <div className="flex flex-col gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 text-base"
                      autoComplete="email"
                      inputMode="email"
                    />
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="h-11 w-full text-base font-semibold bg-brand-red hover:bg-brand-red/90 text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Start My Free Banner Now'}
                    </Button>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-sm font-semibold text-green-600">
                      ✓ Free Forever. No Credit Card. Cancel Anytime.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Join 1,000+ websites already protected
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column - Banner Showcase */}
          <div className="flex justify-center lg:justify-end">
            <HeroBannerShowcase />
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'

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
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pb-16 pt-20 md:pb-24 md:pt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container max-w-6xl">
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Cookie banners that don&apos;t suck.</span>
          </div>

          {/* H1 */}
          <div className="space-y-4">
            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Unlimited, Branded Cookie Banners —{' '}
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                GDPR & PIPEDA Compliant
              </span>
            </h1>
            
            <div className="mx-auto max-w-3xl space-y-4">
              <p className="text-lg text-muted-foreground sm:text-xl">
                Most cookie banner tools lock you into ugly templates or charge you per domain. We don&apos;t. You get unlimited, custom banners that match your website — and keep you fully compliant.
              </p>
              
              <p className="text-lg font-semibold text-foreground sm:text-xl">
                🎉 First 1,000 accounts are free — no credit card, no catch.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="w-full max-w-md">
            {session ? (
              <Button asChild size="lg" className="w-full text-lg">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email to get started"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 text-base"
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="h-12 px-8 text-base font-semibold bg-brand-red hover:bg-brand-red/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Claim Your Free Banner'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Join the first 1,000 and get lifetime access for free
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
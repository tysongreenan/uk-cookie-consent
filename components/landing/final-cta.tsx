'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Clock } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export function FinalCTA() {
  const { data: session } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setIsLoading(true)
    router.push(`/auth/signup?email=${encodeURIComponent(email)}`)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-teal via-brand-purple to-brand-pink px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Limited to first 1,000 accounts</span>
          </div>

          <h2 className="mb-5 font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl sm:mb-6">
            Join 1,000+ Websites Already Protected
          </h2>
          
          <div className="mb-8 space-y-3 sm:mb-10">
            <p className="text-lg font-semibold text-white">
              ✓ Save 3+ Hours Per Website Setup
            </p>
            <p className="text-lg font-semibold text-white">
              ✓ Avoid $20K+ GDPR Fines Automatically  
            </p>
            <p className="text-lg font-semibold text-white">
              ✓ Copy & Paste in 5 Minutes
            </p>
          </div>

          <div className="mx-auto max-w-md">
            {session ? (
              <Button asChild size="lg" className="w-full min-h-[48px] bg-white text-brand-teal hover:bg-white/90 text-base font-semibold sm:h-14 sm:text-lg">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-3 sm:space-y-4">
                <div className="flex flex-col gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    inputMode="email"
                    className="h-12 border-white/20 bg-white/10 text-base text-white placeholder:text-white/60 backdrop-blur-sm focus:border-white focus:bg-white/20 sm:h-14 sm:text-lg"
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="h-12 w-full bg-white text-base font-semibold text-brand-teal hover:bg-white/90 sm:h-14 sm:text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Start My Free Banner Now'}
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
                <p className="text-xs text-white/80 sm:text-sm">
                  No credit card required • Free forever for early adopters
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

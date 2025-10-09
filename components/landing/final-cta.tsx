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
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-purple-600 to-pink-600 py-20 md:py-28">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            <Clock className="h-4 w-4" />
            <span>Limited to first 1,000 accounts</span>
          </div>

          <h2 className="mb-6 font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Get Started Free — No Limits, No Legal Headaches
          </h2>
          
          <p className="mb-10 text-xl text-white/90">
            The first 1,000 accounts get everything, free for life. After that, it&apos;s gone.
          </p>

          <div className="mx-auto max-w-md">
            {session ? (
              <Button asChild size="lg" className="w-full bg-white text-primary hover:bg-white/90 text-lg font-semibold h-14">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-14 border-white/20 bg-white/10 text-white placeholder:text-white/60 backdrop-blur-sm focus:border-white focus:bg-white/20 text-base"
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="h-14 bg-white px-8 text-base font-semibold text-primary hover:bg-white/90"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Claim My Free Account'}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
                <p className="text-sm text-white/80">
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

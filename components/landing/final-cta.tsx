'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Clock } from '@phosphor-icons/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export function FinalCTA() {
  const { data: session } = useSession()
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return
    
    setIsLoading(true)
    try {
      // Normalize URL
      let normalizedUrl = url.trim()
      if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
        normalizedUrl = `https://${normalizedUrl}`
      }
      
      router.push(`/builder?url=${encodeURIComponent(normalizedUrl)}`)
    } catch (error) {
      console.error('Error processing URL:', error)
      setIsLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-muted border-t border-border px-4 py-16 sm:px-6 sm:py-20 md:py-28">
      {/* Background pattern - minimal grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e0_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e0_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium sm:mb-6 sm:px-4 sm:py-2 sm:text-sm">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Limited to first 1,000 accounts</span>
          </div>

          <h2 className="mb-5 font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl lg:text-6xl sm:mb-6">
            Ready to Get Started?
          </h2>
          
          <p className="mb-8 text-lg text-muted-foreground sm:mb-10">
            Free forever. No credit card required.
          </p>

          <div className="mx-auto max-w-md">
            {session ? (
              <Button asChild size="lg" className="w-full min-h-[48px] text-base font-semibold sm:h-14 sm:text-lg">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            ) : (
              <form onSubmit={handleUrlSubmit} className="space-y-3 sm:space-y-4">
                <div className="flex flex-col gap-3">
                  <Input
                    type="url"
                    placeholder="millerwaste.ca"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    autoComplete="url"
                    inputMode="url"
                    className="h-12 text-base sm:h-14 sm:text-lg"
                  />
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="h-12 w-full text-base font-semibold sm:h-14 sm:text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Scanning...' : 'Scan Website'}
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground sm:text-sm">
                  We will search your website for any scripts and import them for you as well as branding.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

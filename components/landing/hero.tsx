'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useSession, signIn } from 'next-auth/react'

export function Hero() {
  const { data: session } = useSession()

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          Create Professional
          <span className="text-primary"> Cookie Consent Banners</span>
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Build GDPR-compliant cookie consent banners in minutes. Customize colors, 
          add your logo, manage tracking scripts, and generate embeddable code for your website.
        </p>
        <div className="flex gap-4">
          {session ? (
            <Button asChild size="lg">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button size="lg" asChild>
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
          )}
          <Button variant="outline" size="lg" asChild>
            <Link href="/demo">View Demo</Link>
          </Button>
        </div>
      </div>
      
      {/* Preview Banner */}
      <div className="container max-w-4xl">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded bg-white/20"></div>
                  <div>
                    <h3 className="font-semibold">We use cookies</h3>
                    <p className="text-sm opacity-90">
                      This website uses cookies to enhance your browsing experience.
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="rounded bg-white/20 px-4 py-2 text-sm font-medium hover:bg-white/30">
                    Accept All
                  </button>
                  <button className="rounded border border-white/30 px-4 py-2 text-sm font-medium hover:bg-white/10">
                    Preferences
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

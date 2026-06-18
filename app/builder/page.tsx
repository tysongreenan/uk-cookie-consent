'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { InteractiveBannerDemo } from '@/components/landing/interactive-banner-demo'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'

function BuilderContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const url = searchParams.get('url')

  // After signup, save the banner configured in the public builder and continue in the dashboard.
  useEffect(() => {
    if (!session) {
      return
    }

    const savedConfig = localStorage.getItem('pendingBannerConfig')
    if (!savedConfig) {
      if (url) {
        router.push('/dashboard/builder')
      }
      return
    }

    try {
      const config = JSON.parse(savedConfig)
      fetch('/api/banners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: config.name || 'My Cookie Banner',
          config: config,
          isActive: true
        })
      }).then(async (response) => {
        localStorage.removeItem('pendingBannerConfig')
        if (response.ok) {
          const data = await response.json()
          if (data.banner?.id) {
            router.push(`/dashboard/builder?id=${data.banner.id}`)
            return
          }
        }
        router.push('/dashboard/builder')
      }).catch(() => {
        router.push('/dashboard/builder')
      })
    } catch {
      localStorage.removeItem('pendingBannerConfig')
      router.push('/dashboard/builder')
    }
  }, [session, url, router])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <InteractiveBannerDemo initialUrl={url || undefined} />
      </main>
      <Footer />
    </div>
  )
}

export default function PublicBuilderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading builder...</p>
        </div>
      </div>
    }>
      <BuilderContent />
    </Suspense>
  )
}

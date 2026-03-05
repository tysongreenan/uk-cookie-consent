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

  // If user is signed in and came from this page, save banner and redirect to dashboard builder
  useEffect(() => {
    if (session && url) {
      // User signed up, save banner config from localStorage if it exists
      const savedConfig = localStorage.getItem('pendingBannerConfig')
      if (savedConfig) {
        try {
          const config = JSON.parse(savedConfig)
          // Save banner to account
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
              // Redirect to dashboard builder with the saved banner ID
              if (data.banner?.id) {
                router.push(`/dashboard/builder?id=${data.banner.id}`)
              } else {
                router.push('/dashboard/builder')
              }
            } else {
              router.push('/dashboard/builder')
            }
          }).catch(() => {
            router.push('/dashboard/builder')
          })
        } catch {
          router.push('/dashboard/builder')
        }
      } else {
        router.push('/dashboard/builder')
      }
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


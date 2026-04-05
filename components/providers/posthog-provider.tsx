'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      capture_pageview: false, // We capture manually for SPA route changes
      capture_pageleave: true,
      loaded: (ph) => {
        if (process.env.NODE_ENV === 'development') ph.debug()
      },
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}

// Track SPA page views on route change
export function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return
    const url = `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    posthog.capture('$pageview', { $current_url: url })
  }, [pathname, searchParams])

  return null
}

// Identify user after NextAuth sign-in
export function PostHogIdentify() {
  const { data: session } = useSession()

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return
    if (!session?.user) return

    const user = session.user as any
    posthog.identify(user.id, {
      email: user.email,
      name: user.name,
      plan: user.planTier || 'free',
    })
  }, [session])

  return null
}

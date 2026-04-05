'use client'

import { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { SmoothScroll } from '@/components/providers/smooth-scroll'
import { PostHogProvider, PostHogPageView, PostHogIdentify } from '@/components/providers/posthog-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <PostHogProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
          <PostHogIdentify />
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </PostHogProvider>
    </SessionProvider>
  )
}

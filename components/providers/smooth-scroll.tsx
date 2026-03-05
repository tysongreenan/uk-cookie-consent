'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePathname } from 'next/navigation'

// Make Lenis available globally for framer-motion integration
declare global {
  interface Window {
    lenis?: Lenis
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      // Prevent Lenis from interfering with scroll snap
      wheelMultiplier: 1,
      infinite: false,
    })

    // Make Lenis available globally for framer-motion
    window.lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Scroll to top on route change
    if (pathname) {
      lenis.scrollTo(0, { immediate: true })
    }

    return () => {
      lenis.destroy()
      delete window.lenis
    }
  }, [pathname])

  return <>{children}</>
}


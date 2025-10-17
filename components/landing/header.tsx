'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useSession, signIn } from 'next-auth/react'
import { Menu, X } from 'lucide-react'
import { useAnnouncement } from '@/lib/announcement-context'

export function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isVisible: announcementVisible } = useAnnouncement()

  return (
    <header className={`sticky z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
      announcementVisible ? 'top-[72px]' : 'top-0'
    }`}>
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 md:h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img 
            src="/logos/logo.svg" 
            alt="Cookie Banner Generator" 
            width="120"
            height="32"
            className="h-7 w-auto sm:h-8"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#how-it-works"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Features
            </Link>
            <Link
              href="/blog"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Pricing
            </Link>
            <Link
              href="/locations"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Locations
            </Link>
            <Link
              href="/tools"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Tools
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              About
            </Link>
            <Link
              href="#faq"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              FAQ
            </Link>
          </nav>
          
          <div className="flex items-center space-x-2">
            {session ? (
              <Button asChild size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild size="sm">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="bg-brand-red hover:bg-brand-red/90 text-white">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg border bg-background hover:bg-accent"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container space-y-1 px-4 py-4">
            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              Features
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              Blog
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              Pricing
            </Link>
            <Link
              href="/locations"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              Locations
            </Link>
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              Tools
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              About
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              FAQ
            </Link>
            
            <div className="flex flex-col gap-2 pt-4">
              {session ? (
                <Button asChild size="lg" className="w-full">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" variant="outline" className="w-full">
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button asChild size="lg" className="w-full bg-brand-red hover:bg-brand-red/90 text-white">
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

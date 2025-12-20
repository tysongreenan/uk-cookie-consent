'use client'

import Link from 'next/link'
import Image from 'next/image'
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
          <Image 
            src="/logos/logo.svg" 
            alt="Cookie Banner Generator" 
            width={120}
            height={32}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-6">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/pricing"
              className="transition-colors hover:text-foreground text-foreground/60"
            >
              Pricing
            </Link>
            <Link
              href="/integrations"
              className="transition-colors hover:text-foreground text-foreground/60"
            >
              Integrations
            </Link>
            <Link
              href="/compliance"
              className="transition-colors hover:text-foreground text-foreground/60"
            >
              Compliance
            </Link>
            <Link
              href="/support"
              className="transition-colors hover:text-foreground text-foreground/60"
            >
              Support
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
                <Button asChild size="sm">
                  <Link href="/builder">Start Building</Link>
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
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              Pricing
            </Link>
            <Link
              href="/integrations"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              Integrations
            </Link>
            <Link
              href="/compliance"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              Compliance
            </Link>
            <Link
              href="/support"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium hover:bg-accent"
            >
              Support
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
                  <Button asChild size="lg" className="w-full">
                    <Link href="/builder">Start Building</Link>
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

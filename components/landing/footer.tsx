import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t px-4 py-10 sm:px-6 sm:py-12 md:py-16">
      <div className="container">
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {/* Brand */}
                  <div className="lg:col-span-2">
                    <Link href="/" className="mb-4 inline-block">
                      <img 
                        src="/logos/logo.svg" 
                        alt="Cookie Banner Generator" 
                        width="120"
                        height="32"
                        className="h-8 w-auto"
                      />
                    </Link>
            <p className="text-sm text-muted-foreground max-w-md">
              Unlimited, branded cookie banners that match your website. GDPR & PIPEDA compliant. Built in Canada.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/#how-it-works" className="text-muted-foreground hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-muted-foreground hover:text-foreground">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-muted-foreground hover:text-foreground">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-muted-foreground hover:text-foreground">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-muted-foreground hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Cookie Banner Generator. Made with ❤️ in Canada.
            </p>
            <p className="text-center text-xs text-muted-foreground md:text-right">
              First 1,000 accounts free — forever
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

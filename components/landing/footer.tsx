'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Logo Section */}
        <div className="mb-8">
          <Link href="/" className="inline-block">
            <img 
              src="/logos/logo.svg" 
              alt="Cookie Banner Generator" 
              width="120"
              height="32"
              className="h-8 w-auto"
            />
          </Link>
          <div className="mt-4 h-px bg-border"></div>
        </div>

        {/* Main Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Product & Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Product & Tools</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/builder" className="text-muted-foreground hover:text-foreground transition-colors">
                  Banner Builder
                </Link>
              </li>
              <li>
                <Link href="/dashboard/analytics" className="text-muted-foreground hover:text-foreground transition-colors">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/dashboard/integrations" className="text-muted-foreground hover:text-foreground transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/tools/cookie-scanner" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Scanner
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-muted-foreground hover:text-foreground transition-colors">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link href="/webflow-cookie-consent-free" className="text-muted-foreground hover:text-foreground transition-colors">
                  Webflow Free
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Compliance & Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/compliance/gdpr" className="text-muted-foreground hover:text-foreground transition-colors">
                  GDPR Compliance
                </Link>
              </li>
              <li>
                <Link href="/compliance/pipeda" className="text-muted-foreground hover:text-foreground transition-colors">
                  PIPEDA Compliance
                </Link>
              </li>
              <li>
                <Link href="/compliance/ccpa" className="text-muted-foreground hover:text-foreground transition-colors">
                  CCPA Compliance
                </Link>
              </li>
              <li>
                <Link href="/locations/canada" className="text-muted-foreground hover:text-foreground transition-colors">
                  Canada Privacy Laws
                </Link>
              </li>
              <li>
                <Link href="/locations/eu" className="text-muted-foreground hover:text-foreground transition-colors">
                  EU Privacy Laws
                </Link>
              </li>
              <li>
                <Link href="/locations/us" className="text-muted-foreground hover:text-foreground transition-colors">
                  US Privacy Laws
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Integrations</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/integrations/wordpress" className="text-muted-foreground hover:text-foreground transition-colors">
                  WordPress
                </Link>
              </li>
              <li>
                <Link href="/integrations/webflow" className="text-muted-foreground hover:text-foreground transition-colors">
                  Webflow
                </Link>
              </li>
              <li>
                <Link href="/integrations/shopify" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shopify
                </Link>
              </li>
              <li>
                <Link href="/integrations/squarespace" className="text-muted-foreground hover:text-foreground transition-colors">
                  Squarespace
                </Link>
              </li>
              <li>
                <Link href="/integrations/wix" className="text-muted-foreground hover:text-foreground transition-colors">
                  Wix
                </Link>
              </li>
              <li>
                <Link href="/integrations/react" className="text-muted-foreground hover:text-foreground transition-colors">
                  React
                </Link>
              </li>
              <li>
                <Link href="/integrations/google-tag-manager" className="text-muted-foreground hover:text-foreground transition-colors">
                  Google Tag Manager
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/solutions/ecommerce" className="text-muted-foreground hover:text-foreground transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/solutions/saas" className="text-muted-foreground hover:text-foreground transition-colors">
                  SaaS Platforms
                </Link>
              </li>
              <li>
                <Link href="/solutions/healthcare" className="text-muted-foreground hover:text-foreground transition-colors">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link href="/solutions/finance" className="text-muted-foreground hover:text-foreground transition-colors">
                  Finance
                </Link>
              </li>
              <li>
                <Link href="/solutions/education" className="text-muted-foreground hover:text-foreground transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/compare/cookiebot-alternative" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookiebot Alternative
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company & Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/upgrade" className="text-muted-foreground hover:text-foreground transition-colors">
                  Upgrade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Separator */}
        <div className="mb-8">
          <div className="h-px bg-border mb-6"></div>
          <div className="flex justify-end">
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="h-px bg-border mb-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Cookie Banner Generator. Made with ❤️ in Canada.
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">Your Privacy Choices</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-foreground rounded flex items-center justify-center">
                  <span className="text-background text-xs">✓</span>
                </div>
                <span className="text-xs text-muted-foreground">✓</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <Link href="/sitemap.xml" className="hover:text-foreground transition-colors">Sitemap</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Use</Link>
            <span>|</span>
            <Link href="/support" className="hover:text-foreground transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

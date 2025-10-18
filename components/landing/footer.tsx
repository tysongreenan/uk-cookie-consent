import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
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
          <div className="mt-4 h-px bg-slate-700"></div>
        </div>

        {/* Main Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Product & Tools */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Product & Tools</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/dashboard" className="text-slate-300 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/builder" className="text-slate-300 hover:text-white">
                  Banner Builder
                </Link>
              </li>
              <li>
                <Link href="/dashboard/analytics" className="text-slate-300 hover:text-white">
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/dashboard/integrations" className="text-slate-300 hover:text-white">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/tools/cookie-scanner" className="text-slate-300 hover:text-white">
                  Cookie Scanner
                </Link>
              </li>
              <li>
                <Link href="/demo" className="text-slate-300 hover:text-white">
                  Live Demo
                </Link>
              </li>
              <li>
                <Link href="/webflow-cookie-consent-free" className="text-slate-300 hover:text-white">
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
                <Link href="/compliance/gdpr" className="text-slate-300 hover:text-white">
                  GDPR Compliance
                </Link>
              </li>
              <li>
                <Link href="/compliance/pipeda" className="text-slate-300 hover:text-white">
                  PIPEDA Compliance
                </Link>
              </li>
              <li>
                <Link href="/compliance/ccpa" className="text-slate-300 hover:text-white">
                  CCPA Compliance
                </Link>
              </li>
              <li>
                <Link href="/locations/canada" className="text-slate-300 hover:text-white">
                  Canada Privacy Laws
                </Link>
              </li>
              <li>
                <Link href="/locations/eu" className="text-slate-300 hover:text-white">
                  EU Privacy Laws
                </Link>
              </li>
              <li>
                <Link href="/locations/us" className="text-slate-300 hover:text-white">
                  US Privacy Laws
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-300 hover:text-white">
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
                <Link href="/integrations/wordpress" className="text-slate-300 hover:text-white">
                  WordPress
                </Link>
              </li>
              <li>
                <Link href="/integrations/webflow" className="text-slate-300 hover:text-white">
                  Webflow
                </Link>
              </li>
              <li>
                <Link href="/integrations/shopify" className="text-slate-300 hover:text-white">
                  Shopify
                </Link>
              </li>
              <li>
                <Link href="/integrations/squarespace" className="text-slate-300 hover:text-white">
                  Squarespace
                </Link>
              </li>
              <li>
                <Link href="/integrations/wix" className="text-slate-300 hover:text-white">
                  Wix
                </Link>
              </li>
              <li>
                <Link href="/integrations/react" className="text-slate-300 hover:text-white">
                  React
                </Link>
              </li>
              <li>
                <Link href="/integrations/google-tag-manager" className="text-slate-300 hover:text-white">
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
                <Link href="/solutions/ecommerce" className="text-slate-300 hover:text-white">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/solutions/saas" className="text-slate-300 hover:text-white">
                  SaaS Platforms
                </Link>
              </li>
              <li>
                <Link href="/solutions/healthcare" className="text-slate-300 hover:text-white">
                  Healthcare
                </Link>
              </li>
              <li>
                <Link href="/solutions/finance" className="text-slate-300 hover:text-white">
                  Finance
                </Link>
              </li>
              <li>
                <Link href="/solutions/education" className="text-slate-300 hover:text-white">
                  Education
                </Link>
              </li>
              <li>
                <Link href="/compare/cookiebot-alternative" className="text-slate-300 hover:text-white">
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
                <Link href="/about" className="text-slate-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-slate-300 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-slate-300 hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-300 hover:text-white">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-slate-300 hover:text-white">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="/upgrade" className="text-slate-300 hover:text-white">
                  Upgrade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Separator */}
        <div className="mb-8">
          <div className="h-px bg-slate-700 mb-6"></div>
          <div className="flex justify-end">
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-300 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="h-px bg-slate-700 mb-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-slate-300">
              © {new Date().getFullYear()} Cookie Banner Generator. Made with ❤️ in Canada.
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <span className="text-xs text-slate-400">Your Privacy Choices</span>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
                <span className="text-xs text-slate-400">✓</span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-slate-400">
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <span>|</span>
            <Link href="/terms" className="hover:text-white">Terms of Use</Link>
            <span>|</span>
            <Link href="/support" className="hover:text-white">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

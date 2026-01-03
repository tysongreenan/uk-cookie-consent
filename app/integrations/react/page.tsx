import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { HeroSection } from '@/components/blocks/hero-section'
import { FinalCTA } from '@/components/landing/final-cta'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, Zap, CheckCircle, Shield, Rocket, Globe, Settings, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'React Cookie Consent Integration | Next.js & React Apps 2025',
  description: 'Add GDPR, PIPEDA, and CCPA compliant cookie consent to your React or Next.js app in under 2 minutes. No npm package needed - just one script tag.',
  keywords: 'react cookie consent, nextjs cookie banner, react gdpr compliance, next.js cookie consent, react cookie banner',
  openGraph: {
    title: 'React Cookie Consent Integration | Next.js & React Apps 2025',
    description: 'Add GDPR, PIPEDA, and CCPA compliant cookie consent to your React or Next.js app in under 2 minutes.',
    type: 'article',
  },
}

export default function ReactIntegrationPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does this work with Next.js 14 and the App Router?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Our solution works perfectly with Next.js 14, 13, and older versions. It's compatible with both the App Router (app directory) and Pages Router (pages directory). Just use the appropriate installation method shown above."
        }
      },
      {
        "@type": "Question",
        "name": "Will this affect my Core Web Vitals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Our script is optimized for performance and loads asynchronously. It won't block your page rendering or affect your Largest Contentful Paint (LCP), First Input Delay (FID), or Cumulative Layout Shift (CLS) scores."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to redeploy to update my banner?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No! That's the beauty of our hosted solution. Make changes in our dashboard and click 'Push Live' - your changes appear on your site within seconds. No code changes, no redeployment, no downtime."
        }
      },
      {
        "@type": "Question",
        "name": "Is there an npm package available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We don't offer an npm package because our hosted script approach is simpler and more flexible. You get instant updates, no dependency management, and zero bundle size impact. The script loads from our CDN which is optimized for global delivery."
        }
      }
    ]
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Add Cookie Consent to React App",
    "description": "Step-by-step guide to add GDPR-compliant cookie consent to your React or Next.js application",
    "totalTime": "PT2M",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Create Your Banner",
        "text": "Sign up and design your cookie banner in our visual builder. Head to our dashboard, create a free account, and use the visual builder to customize your banner's appearance, text, colors, and compliance settings.",
        "url": "https://www.cookie-banner.ca/integrations/react#installation"
      },
      {
        "@type": "HowToStep",
        "name": "Add Script to Next.js App Router",
        "text": "Add the script to your root layout using Next.js Script component with strategy='beforeInteractive' to ensure it loads before tracking scripts.",
        "url": "https://www.cookie-banner.ca/integrations/react#installation"
      },
      {
        "@type": "HowToStep",
        "name": "Deploy and Test",
        "text": "Deploy your app and the cookie banner will appear automatically. Any changes you make in our dashboard will be reflected on your live site within seconds - no redeployment needed.",
        "url": "https://www.cookie-banner.ca/integrations/react#installation"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection
          badge={{
            text: "React & Next.js Integration",
          }}
          title="Cookie Consent for React"
          title2="2 Minutes to Compliance"
          description="Add a GDPR-compliant cookie banner to your React or Next.js app. Design your banner in our visual builder, copy one line of code, and you're done."
          emailCapture={false}
          useGeometricBackground={true}
        />

        {/* How It Works */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-muted-foreground">
                  Three simple steps to add cookie consent to your React app
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl">
                        1
                      </div>
                      <CardTitle>Design Your Banner</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Use our visual builder to create a cookie banner that matches your brand. Choose colors, text, button styles, and compliance settings.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white font-bold text-xl">
                        2
                      </div>
                      <CardTitle>Copy the Script Tag</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We generate a unique script tag for your banner. Copy it from the dashboard and paste it into your React app's layout or HTML.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white font-bold text-xl">
                        3
                      </div>
                      <CardTitle>You're Done!</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Deploy your app and the banner appears. Update it anytime from the dashboard - no code changes needed.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Guide */}
        <section id="installation" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Installation Guide
                </h2>
                <p className="text-xl text-muted-foreground">
                  Add the script tag to your React app in 2 minutes
                </p>
              </div>

              <div className="space-y-8">
                {/* Step 1 */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                        1
                      </div>
                      <div>
                        <CardTitle className="text-xl">Create Your Banner in the Dashboard</CardTitle>
                        <CardDescription>Sign up and use our visual builder</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Head to our dashboard and create a free account. Use the visual builder to:
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Choose your banner colors and styles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Write your cookie consent message</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Configure cookie categories (Analytics, Marketing, etc.)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Set up compliance for GDPR, PIPEDA, or CCPA</span>
                      </li>
                    </ul>
                    <p className="text-muted-foreground mb-4">
                      When you're happy with your design, click "Get Code" to get your unique script tag.
                    </p>
                    <Link href="/auth/register">
                      <Button>
                        <Rocket className="mr-2 h-4 w-4" />
                        Create Free Account
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Step 2 - Next.js App Router */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-lg">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-xl">Next.js App Router (Recommended)</CardTitle>
                        <CardDescription>Add the script to your root layout</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        Open your <code className="bg-muted px-2 py-1 rounded">app/layout.tsx</code> file and add the Script component:
                      </p>
                      <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{`// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Cookie Consent Banner */}
        <Script
          src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}`}</pre>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          <strong>Replace YOUR_BANNER_ID</strong> with the actual ID from your dashboard. The script URL will be provided when you click "Get Code" in the builder.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 2 Alt - Pages Router */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 text-white font-bold text-lg">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-xl">Next.js Pages Router (Alternative)</CardTitle>
                        <CardDescription>Add to _document.tsx</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        If you're using the Pages Router, add the script to your <code className="bg-muted px-2 py-1 rounded">pages/_document.tsx</code> file:
                      </p>
                      <div className="bg-gray-900 text-blue-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{`// pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Cookie Consent Banner */}
        <script
          src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
          async
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}`}</pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 2 Alt - Vite/CRA */}
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 text-white font-bold text-lg">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-xl">Create React App / Vite (Alternative)</CardTitle>
                        <CardDescription>Add to index.html</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        For CRA or Vite projects, add the script tag directly to your <code className="bg-muted px-2 py-1 rounded">public/index.html</code> or <code className="bg-muted px-2 py-1 rounded">index.html</code> file:
                      </p>
                      <div className="bg-gray-900 text-purple-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                        <pre>{`<!-- public/index.html (CRA) or index.html (Vite) -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My React App</title>

    <!-- Cookie Consent Banner - Place BEFORE analytics scripts -->
    <script
      src="https://www.cookie-banner.ca/api/scripts/YOUR_BANNER_ID.js"
      async
    ></script>

    <!-- Your Google Analytics and other tracking scripts go here -->
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`}</pre>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                        <p className="text-sm text-amber-900 dark:text-amber-100">
                          <strong>Important:</strong> Place the cookie consent script BEFORE any analytics or tracking scripts (Google Analytics, Facebook Pixel, etc.) to ensure they only load after the user consents.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Step 3 */}
                <Card className="border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-600 text-white font-bold text-lg">
                        3
                      </div>
                      <div>
                        <CardTitle className="text-xl">Deploy and Test</CardTitle>
                        <CardDescription>Your cookie banner is now live!</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Deploy your React app and the cookie banner will appear automatically on your site.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      <strong>Want to make changes?</strong> Just log back into your dashboard, update your banner design or text,
                      and click "Push Live". Your changes will appear on your live site within seconds - no code changes or redeployment needed!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">No redeployment needed</Badge>
                      <Badge variant="secondary">Instant updates</Badge>
                      <Badge variant="secondary">Zero maintenance</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does this work with Next.js 14 and the App Router?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! Our solution works perfectly with Next.js 14, 13, and older versions. It's compatible with both
                      the App Router (app directory) and Pages Router (pages directory). Just use the appropriate installation
                      method shown above.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Will this affect my Core Web Vitals?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No. Our script is lightweight and loads asynchronously. It won't block your page rendering
                      or negatively impact your Largest Contentful Paint (LCP), First Input Delay (FID), or Cumulative Layout Shift (CLS) scores.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do I need to redeploy to update my banner?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No! That's the benefit of our hosted solution. Make changes in our dashboard and click "Push Live" -
                      your changes appear on your site within seconds. No code changes, no redeployment, no downtime.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is there an npm package available?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We use a hosted script approach instead of an npm package because it's simpler and more flexible.
                      You get instant updates without needing to update dependencies or rebuild your app. The script loads from
                      our CDN which is optimized for fast global delivery.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How do I customize the banner colors and text?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Use our visual builder in the dashboard. You can customize colors, fonts, text, button styles, position,
                      and all compliance settings. See your changes in real-time before deploying.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does this block Google Analytics and Facebook Pixel automatically?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, when you use <code className="bg-muted px-2 py-1 rounded">strategy="beforeInteractive"</code> in Next.js
                      or place our script tag before your analytics scripts in the HTML. Our banner will load first and prevent
                      tracking scripts from running until the user gives consent.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Other Platforms Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                  Looking for Other Platforms?
                </h2>
                <p className="text-xl text-muted-foreground">
                  We support all major web platforms with the same easy integration
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      WordPress Cookie Consent
                    </CardTitle>
                    <CardDescription>Simple plugin installation for WordPress sites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/integrations/wordpress">
                      <Button variant="outline" className="w-full">
                        View WordPress Guide
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-green-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-green-500" />
                      Shopify Cookie Consent
                    </CardTitle>
                    <CardDescription>E-commerce focused cookie consent for Shopify</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/integrations/shopify">
                      <Button variant="outline" className="w-full">
                        View Shopify Guide
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-purple-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-purple-500" />
                      Webflow Cookie Consent
                    </CardTitle>
                    <CardDescription>No-code integration for Webflow websites</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/integrations/webflow">
                      <Button variant="outline" className="w-full">
                        View Webflow Guide
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-orange-500 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-orange-500" />
                      Google Tag Manager
                    </CardTitle>
                    <CardDescription>Integrate with GTM for advanced tracking control</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/integrations/google-tag-manager">
                      <Button variant="outline" className="w-full">
                        View GTM Guide
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}

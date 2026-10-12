import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, Database, Shield, Zap, Users, Globe, BarChart3, CheckCircle, AlertTriangle, ExternalLink, Download, Settings } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Consent for SaaS | One Script, No SDK',
  description: 'Paste one async cookie banner on a SaaS site. Consent modes for GDPR, CCPA, and PIPEDA. No SDK and no SSO. Free for one banner. Pro is $99 once or $99 a year.',
  keywords: 'cookie consent for saas, saas cookie banner, b2b cookie banner',
  openGraph: {
    title: 'Cookie Consent for SaaS | One Script, No SDK',
    description: 'Paste one async cookie banner on a SaaS site. No SSO, no tenant API, and no developer SDK.',
    type: 'article',
  },
}

export default function SaaSSolutionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500 text-white">SaaS Solution</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SaaS Cookie Consent
              <span className="block text-blue-200">Built for Developers</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              One async script for the marketing site or the app. No SDK and no SSO. An API key can create banners. It does not read a visitor's consent inside your app. Free for one banner. Pro is $99 once or $99 a year.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/builder">Open the builder</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SaaS Challenges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                SaaS Cookie Compliance Challenges
              </h2>
              <p className="text-xl text-gray-600">
                B2B software has hard consent problems. This product is a cookie banner you paste onto a site. It does not add SSO, and it does not read consent inside each tenant.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Database className="h-6 w-6 text-blue-500" />
                    <CardTitle>Multi-Tenant Architecture</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Managing consent across multiple customers, organizations, and regions with different privacy requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-green-500" />
                    <CardTitle>API-First Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Developers need programmatic access to consent data for real-time decision making in applications.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-500" />
                    <CardTitle>Enterprise Authentication</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Integrating with SSO, SAML, OAuth, and other enterprise authentication systems while managing consent.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-orange-500" />
                    <CardTitle>Global Data Flows</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Handling data transfers across regions with different privacy laws and consent requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-red-500" />
                    <CardTitle>Data Residency Requirements</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ensuring consent data stays in specific regions or countries as required by enterprise customers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Settings className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Complex Consent Workflows</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Managing consent across multiple features, data types, and user roles within complex SaaS applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The install is one script tag
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              There is no npm package, no GraphQL API, and no webhook that pushes a visitor's choice into your app. An API key can create and list banners. Paste this where the site allows a script.
            </p>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre>{`<script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID" async></script>`}</pre>
            </div>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>Scripts you add in the builder can stay off until opt-in. The banner cannot block cookies set by other code.</li>
              <li>Modes for Canada, the EU, and California. Pro geo rules apply only to countries you pick.</li>
              <li>Team roles on Pro: owner, admin, editor, viewer. No SSO.</li>
              <li>Consent logs are on Pro Annual and Enterprise. One-time Pro does not include features shipped later.</li>
              <li>A standard banner is about 28 KB gzipped. That is not a Core Web Vitals promise.</li>
              <li>A banner does not make a SaaS product legally compliant.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Paste the script, then check it
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Create one banner, add the scripts that should wait for a choice, and confirm in the browser that they do.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/builder">Open the builder</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

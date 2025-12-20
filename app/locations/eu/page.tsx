
import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { MapPin, Shield, Users, Globe, CheckCircle, AlertTriangle, ExternalLink, Download, FileText, Scale, Building, Flag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'EU Cookie Consent | GDPR & ePrivacy Directive Guide 2025',
  description: 'Complete guide to EU cookie consent compliance. GDPR requirements, ePrivacy Directive, Cookie Law, Data Protection Authorities, and multi-language support across 27 EU countries.',
  keywords: 'eu cookie consent, gdpr compliance, eprivacy directive, cookie law eu, eu data protection, dpa enforcement, multi-language cookie banner',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
  },
  openGraph: {
    title: 'EU Cookie Consent | GDPR & ePrivacy Directive Guide 2025',
    description: 'Complete guide to EU cookie consent compliance. GDPR requirements, ePrivacy Directive, and multi-language support.',
    type: 'article',
  },
}

export default function EUCompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-yellow-500 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500 text-white">EU Compliance</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              EU Cookie Consent
              <span className="block text-blue-200">GDPR + ePrivacy Directive</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Complete guide to EU cookie consent compliance. GDPR requirements, ePrivacy Directive, Cookie Law, Data Protection Authorities, and multi-language support across 27 EU countries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <MapPin className="mr-2 h-5 w-5" />
                Get EU Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download GDPR Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* EU Privacy Landscape */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                EU Privacy Law Landscape
              </h2>
              <p className="text-xl text-gray-600">
                Understanding the comprehensive EU privacy framework across 27 member states
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-blue-500" />
                    <CardTitle>GDPR</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    General Data Protection Regulation - EU's comprehensive data protection law governing personal data processing across all member states.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Scale className="h-6 w-6 text-green-500" />
                    <CardTitle>ePrivacy Directive</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Privacy and Electronic Communications Directive - EU law specifically governing cookies, electronic marketing, and communications privacy.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-500" />
                    <CardTitle>Cookie Law</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    EU Cookie Law - National implementations of ePrivacy Directive requiring consent for non-essential cookies across all EU websites.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building className="h-6 w-6 text-orange-500" />
                    <CardTitle>Data Protection Authorities</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    National DPAs in each EU member state with enforcement powers, guidance, and cross-border cooperation through the EDPB.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-red-500" />
                    <CardTitle>Multi-Language Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Cookie consent must be provided in the user's language, with support for all 24 official EU languages across member states.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Flag className="h-6 w-6 text-indigo-500" />
                    <CardTitle>One-Stop-Shop</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    GDPR's One-Stop-Shop mechanism allows cross-border data protection enforcement through lead supervisory authorities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* GDPR Deep Dive */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                GDPR Cookie Consent Requirements
              </h2>
              <p className="text-xl text-gray-600">
                Understanding GDPR's comprehensive approach to cookie consent and data protection
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Shield className="h-5 w-5" />
                    GDPR Principles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Lawfulness, Fairness, Transparency</h4>
                      <p className="text-sm text-gray-600">Processing must be lawful, fair, and transparent to data subjects</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Purpose Limitation</h4>
                      <p className="text-sm text-gray-600">Data collected for specified, explicit, and legitimate purposes only</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Data Minimization</h4>
                      <p className="text-sm text-gray-600">Personal data must be adequate, relevant, and limited to what's necessary</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Accuracy</h4>
                      <p className="text-sm text-gray-600">Personal data must be accurate and kept up to date</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Scale className="h-5 w-5" />
                    Cookie-Specific Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Explicit Consent</h4>
                      <p className="text-sm text-gray-600">Clear, affirmative action indicating agreement to cookie processing</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Granular Control</h4>
                      <p className="text-sm text-gray-600">Users must be able to choose specific cookie categories</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Consent Withdrawal</h4>
                      <p className="text-sm text-gray-600">Easy mechanism to withdraw consent at any time</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Transparent Information</h4>
                      <p className="text-sm text-gray-600">Clear information about cookie purposes and processing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">GDPR vs. ePrivacy: Cookie Consent Framework</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-600 mb-3">GDPR (General)</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Lawful basis for processing personal data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Data subject rights and protections</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Privacy by design and by default</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Cross-border enforcement cooperation</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-green-600 mb-3">ePrivacy (Specific)</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Specific rules for cookies and tracking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Electronic communications privacy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Marketing and advertising restrictions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>National implementation variations</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Multi-Language Requirements */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Multi-Language Cookie Consent
              </h2>
              <p className="text-xl text-gray-600">
                Meeting EU's 24 official language requirements for cookie consent
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Globe className="h-5 w-5" />
                    EU Official Languages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">24 Official Languages</h4>
                      <p className="text-sm text-gray-600">EU recognizes 24 official languages across member states</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">User Language Rights</h4>
                      <p className="text-sm text-gray-600">Users have the right to receive information in their language</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Territorial Application</h4>
                      <p className="text-sm text-gray-600">Language requirements apply based on user location and preferences</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Accessibility</h4>
                      <p className="text-sm text-gray-600">Consent must be understandable in the user's language</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    Implementation Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Automatic Detection</h4>
                      <p className="text-sm text-gray-600">Detect user language from browser settings</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Manual Selection</h4>
                      <p className="text-sm text-gray-600">Allow users to manually select their preferred language</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Fallback Language</h4>
                      <p className="text-sm text-gray-600">Provide English as fallback for unsupported languages</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Consistent Translation</h4>
                      <p className="text-sm text-gray-600">Ensure consistent terminology across all languages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">EU Language Examples</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">German (Deutsch)</h4>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                      <pre>{`"title": "Cookie-Einstellungen",
"acceptAll": "Alle akzeptieren",
"rejectAll": "Alle ablehnen",
"customize": "Anpassen"`}</pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">French (Français)</h4>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                      <pre>{`"title": "Paramètres des cookies",
"acceptAll": "Tout accepter",
"rejectAll": "Tout refuser",
"customize": "Personnaliser"`}</pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Spanish (Español)</h4>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                      <pre>{`"title": "Configuración de cookies",
"acceptAll": "Aceptar todo",
"rejectAll": "Rechazar todo",
"customize": "Personalizar"`}</pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Italian (Italiano)</h4>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                      <pre>{`"title": "Impostazioni cookie",
"acceptAll": "Accetta tutto",
"rejectAll": "Rifiuta tutto",
"customize": "Personalizza"`}</pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Dutch (Nederlands)</h4>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                      <pre>{`"title": "Cookie-instellingen",
"acceptAll": "Alles accepteren",
"rejectAll": "Alles weigeren",
"customize": "Aanpassen"`}</pre>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Polish (Polski)</h4>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs">
                      <pre>{`"title": "Ustawienia plików cookie",
"acceptAll": "Zaakceptuj wszystkie",
"rejectAll": "Odrzuć wszystkie",
"customize": "Dostosuj"`}</pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* DPA Enforcement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Data Protection Authority Enforcement
              </h2>
              <p className="text-xl text-gray-600">
                Understanding enforcement across EU member states and the One-Stop-Shop mechanism
              </p>
            </div>

            <div className="space-y-8">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-600">
                    <Building className="h-5 w-5" />
                    Major EU DPAs
                  </CardTitle>
                  <CardDescription>Leading enforcement authorities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">CNIL (France)</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• €50M fine to Google (2019)</li>
                        <li>• €20M fine to Amazon (2020)</li>
                        <li>• €150M fine to Google (2022)</li>
                        <li>• €60M fine to Facebook (2022)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">ICO (UK)</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• £44M fine to Google (2019)</li>
                        <li>• £500K fine to Facebook (2019)</li>
                        <li>• £20M fine to BA (2019)</li>
                        <li>• £18.4M fine to Marriott (2019)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Garante (Italy)</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• €27.8M fine to Google (2022)</li>
                        <li>• €18M fine to TikTok (2021)</li>
                        <li>• €10M fine to WhatsApp (2021)</li>
                        <li>• €6M fine to Apple (2020)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Flag className="h-5 w-5" />
                    One-Stop-Shop Mechanism
                  </CardTitle>
                  <CardDescription>Cross-border enforcement cooperation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Lead Supervisory Authority</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Single point of contact for cross-border processing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Coordination with concerned supervisory authorities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Consistent enforcement across EU</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Reduced administrative burden</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Concerned Supervisory Authorities</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Input on cross-border cases</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Local enforcement when needed</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>National law interpretation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>Cooperation in investigations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <AlertTriangle className="h-5 w-5" />
                    Cookie-Specific Enforcement
                  </CardTitle>
                  <CardDescription>Recent cookie consent violations and fines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Common Violations</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Non-compliant cookie banners</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Pre-ticked consent boxes</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Lack of granular control</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Insufficient cookie information</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Enforcement Trends</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Increasing fine amounts</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Focus on tech giants</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Cross-border cooperation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>Public enforcement notices</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* EU Case Studies */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                EU Case Studies
              </h2>
              <p className="text-xl text-gray-600">
                Real-world examples of EU organizations achieving GDPR and ePrivacy compliance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Berlin E-commerce</CardTitle>
                  <CardDescription>German online marketplace</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">E-commerce</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Germany</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">GDPR + ePrivacy</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Achieved 89% consent acceptance with German-language cookie banners. Compliant with BDSG and GDPR requirements.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Paris SaaS Platform</CardTitle>
                  <CardDescription>French B2B software company</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">SaaS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">France</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">GDPR + CNIL</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Multi-language cookie consent with French compliance. Enhanced B2B client trust and CNIL approval.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Madrid Financial Services</CardTitle>
                      <CardDescription>Spanish banking platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Finance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Spain</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">GDPR + AEPD</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Banking-grade cookie consent with Spanish compliance. Met AEPD requirements and client expectations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Amsterdam Healthcare</CardTitle>
                  <CardDescription>Dutch medical technology</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Healthcare</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Netherlands</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">GDPR + AP</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Healthcare-specific cookie consent with Dutch compliance. Maintained AP approval and patient trust.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Rome Education</CardTitle>
                  <CardDescription>Italian e-learning platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Education</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Italy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">GDPR + Garante</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Student-friendly cookie consent with Italian compliance. Enhanced learning experience and Garante approval.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">Warsaw Government</CardTitle>
                  <CardDescription>Polish public sector portal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Industry:</span>
                      <span className="text-sm font-medium">Government</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Location:</span>
                      <span className="text-sm font-medium">Poland</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Compliance:</span>
                      <span className="text-sm font-medium">GDPR + UODO</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600">
                        Public sector cookie consent with Polish compliance. Enhanced citizen engagement and UODO approval.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                EU Compliance Implementation Guide
              </h2>
              <p className="text-xl text-gray-600">
                Step-by-step guide to achieving EU privacy law compliance
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Assess EU Privacy Law Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Determine which EU privacy laws apply to your organization:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>GDPR applies to all organizations processing EU personal data</li>
                    <li>ePrivacy Directive applies to cookies and electronic communications</li>
                    <li>National implementations may have additional requirements</li>
                    <li>Consider One-Stop-Shop lead supervisory authority</li>
                    <li>Review multi-language requirements for target markets</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Implement GDPR-Compliant Cookie Consent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up cookie consent meeting EU requirements:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Configure explicit consent for non-essential cookies</li>
                    <li>Implement granular cookie category control</li>
                    <li>Provide clear information about cookie purposes</li>
                    <li>Enable easy consent withdrawal</li>
                    <li>Support multiple EU languages</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Create EU-Compliant Privacy Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Develop comprehensive privacy documentation:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Draft GDPR-compliant privacy notice</li>
                    <li>Create comprehensive cookie policy</li>
                    <li>Develop data processing records</li>
                    <li>Prepare consent withdrawal procedures</li>
                    <li>Establish data protection impact assessments</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Establish Data Protection Governance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up proper data protection governance:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Appoint Data Protection Officer if required</li>
                    <li>Train staff on EU privacy requirements</li>
                    <li>Implement privacy by design principles</li>
                    <li>Establish data breach response procedures</li>
                    <li>Create regular compliance monitoring</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    Monitor and Maintain EU Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Ongoing compliance monitoring and updates:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Monitor DPA guidance updates</li>
                    <li>Track consent rates across EU markets</li>
                    <li>Regular privacy audits and assessments</li>
                    <li>Stay updated on enforcement trends</li>
                    <li>Handle DPA inquiries and complaints</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-yellow-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for EU Privacy Compliance?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join EU organizations using our GDPR and ePrivacy Directive compliant cookie consent solution. Multi-language support, DPA guidance compliance, and EU privacy expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <MapPin className="mr-2 h-5 w-5" />
                Get EU Solution
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <FileText className="mr-2 h-5 w-5" />
                Download GDPR Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

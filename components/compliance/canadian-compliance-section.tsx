import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Shield, Globe, Gear } from 'lucide-react'
import { GranularControlsDemo } from './granular-controls-demo'
import { ConsentWithdrawalDemo } from './consent-withdrawal-demo'
import { BilingualDemo } from './bilingual-demo'
import { ExpressConsentDemo } from './express-consent-demo'

const complianceFeatures = [
  {
    id: 'express-consent',
    title: 'Express Consent & Opt-in Behavior',
    description: 'Our cookie banner blocks all non-essential cookies until users explicitly consent. This meets PIPEDA requirements and Quebec Law 25 standards where implied consent is not sufficient for tracking cookies.',
    icon: Shield,
    demo: ExpressConsentDemo,
    badge: 'PIPEDA Compliant'
  },
  {
    id: 'granular-controls',
    title: 'Granular Cookie Controls',
    description: 'Users can select specific cookie categories (analytics, marketing, functionality) rather than a blanket accept/reject. This gives users meaningful control over their data as required by Canadian privacy laws.',
    icon: Settings,
    demo: GranularControlsDemo,
    badge: 'User Choice'
  },
  {
    id: 'consent-withdrawal',
    title: 'Easy Consent Withdrawal',
    description: 'Users can change their cookie preferences at any time through a persistent "Cookie Gear" link. This meets PIPEDA requirements for consent withdrawal and gives users ongoing control.',
    icon: CheckCircle,
    demo: ConsentWithdrawalDemo,
    badge: 'Always Available'
  },
  {
    id: 'bilingual-support',
    title: 'Bilingual Support (EN/FR)',
    description: 'Full French language support for Quebec Law 25 compliance. Cookie banners, privacy policies, and consent mechanisms are available in both English and French to meet Quebec\'s language requirements.',
    icon: Globe,
    demo: BilingualDemo,
    badge: 'Quebec Law 25'
  }
]

export function CanadianComplianceSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-500 text-white">Canadian Compliance</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Handle Canadian Privacy Requirements
            </h2>
            <p className="text-xl text-gray-600">
              Our cookie consent solution meets PIPEDA, Quebec Law 25, and provincial privacy law requirements
            </p>
          </div>

          <div className="space-y-12">
            {complianceFeatures.map((feature) => {
              const FeatureIcon = feature.icon
              const DemoComponent = feature.demo
              
              return (
                <Card key={feature.id} className="overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Left side - Text content */}
                    <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-100 rounded-lg">
                          <FeatureIcon className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {feature.title}
                          </h3>
                          <Badge className="bg-red-100 text-red-800">
                            {feature.badge}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Right side - Interactive demo */}
                    <div className="p-8 bg-gray-50 flex items-center justify-center">
                      <DemoComponent />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Summary section */}
          <Card className="mt-12 bg-gradient-to-r from-red-50 to-blue-50 border-red-200">
            <CardContent className="p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready for Canadian Privacy Compliance?
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Our cookie consent solution handles the complex requirements of Canadian privacy laws, 
                  including PIPEDA, Quebec Law 25, Alberta PIPA, and BC PIPA.
                </p>
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What's Included:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Express consent mechanisms</li>
                      <li>• Granular cookie controls</li>
                      <li>• Easy consent withdrawal</li>
                      <li>• Bilingual support (EN/FR)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Compliance Coverage:</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>• PIPEDA (Federal)</li>
                      <li>• Quebec Law 25</li>
                      <li>• Alberta PIPA</li>
                      <li>• BC PIPA</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

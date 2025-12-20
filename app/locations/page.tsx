import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Globe, Shield, FileText } from '@phosphor-icons/react'

export const metadata: Metadata = {
  title: 'Cookie Consent by Location | GDPR, PIPEDA, CCPA Compliance',
  description: 'Find the right cookie consent requirements for your location. GDPR for Europe, PIPEDA for Canada, CCPA for California, and more.',
  keywords: ['cookie consent by location', 'GDPR compliance', 'PIPEDA compliance', 'CCPA compliance', 'privacy laws by country'],
}

const locations = [
  {
    name: 'Canada',
    code: 'CA',
    path: '/locations/canada',
    description: 'PIPEDA compliance for Canadian businesses',
    icon: MapPin,
    requirements: ['PIPEDA', 'CASL', 'Provincial laws'],
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  },
  {
    name: 'European Union',
    code: 'EU',
    path: '/locations/eu',
    description: 'GDPR compliance for EU businesses',
    icon: Globe,
    requirements: ['GDPR', 'ePrivacy Directive'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    name: 'United Kingdom',
    code: 'UK',
    path: '/locations/uk',
    description: 'UK GDPR compliance for British businesses',
    icon: Shield,
    requirements: ['UK GDPR', 'PECR'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    name: 'United States',
    code: 'US',
    path: '/locations/us',
    description: 'CCPA and state privacy law compliance',
    icon: FileText,
    requirements: ['CCPA', 'State laws', 'COPPA'],
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  }
]

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
              Cookie Consent by Location
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the right cookie consent requirements for your business location. 
              Each region has different privacy laws and compliance requirements.
            </p>
          </div>

          {/* Location Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {locations.map((location) => (
              <Card key={location.code} className={`${location.borderColor} hover:shadow-lg transition-shadow`}>
                <CardHeader className={`${location.bgColor} rounded-t-lg`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${location.bgColor} border ${location.borderColor}`}>
                      <location.icon className={`h-6 w-6 ${location.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{location.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {location.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Compliance Requirements:</h4>
                      <div className="flex flex-wrap gap-2">
                        {location.requirements.map((req) => (
                          <span
                            key={req}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <Button asChild className="w-full">
                      <Link href={location.path}>
                        View {location.name} Requirements
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Need Help Choosing?</h3>
                <p className="text-muted-foreground mb-4">
                  Not sure which privacy laws apply to your business? Our compliance checker 
                  can help you determine the right requirements based on your location and business model.
                </p>
                <Button asChild>
                  <Link href="/tools/cookie-scanner">
                    Use Compliance Checker
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Shield, FileText, Globe, Zap, CheckCircle } from '@phosphor-icons/react'

export const metadata: Metadata = {
  title: 'Cookie Consent Tools | Free Compliance Checker & Scanner',
  description: 'Free tools to help you achieve cookie consent compliance. Cookie scanner, compliance checker, and more privacy tools.',
  keywords: ['cookie consent tools', 'compliance checker', 'cookie scanner', 'privacy tools', 'GDPR tools'],
}

const tools = [
  {
    name: 'Cookie Scanner',
    description: 'Scan your website for cookies and tracking scripts',
    icon: Search,
    path: '/tools/cookie-scanner',
    features: ['Detect all cookies', 'Identify tracking scripts', 'Compliance report'],
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    status: 'Available'
  },
  {
    name: 'Compliance Checker',
    description: 'Determine which privacy laws apply to your business',
    icon: Shield,
    path: '/tools/compliance-checker',
    features: ['Location-based requirements', 'Business type analysis', 'Compliance roadmap'],
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    status: 'Coming Soon'
  },
  {
    name: 'Privacy Policy Generator',
    description: 'Generate compliant privacy policies for your website',
    icon: FileText,
    path: '/tools/privacy-policy',
    features: ['GDPR compliant', 'Multiple languages', 'Auto-updates'],
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    status: 'Coming Soon'
  },
  {
    name: 'Cookie Audit Tool',
    description: 'Comprehensive audit of your cookie practices',
    icon: Globe,
    path: '/tools/cookie-audit',
    features: ['Full website scan', 'Risk assessment', 'Remediation plan'],
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    status: 'Coming Soon'
  }
]

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12 sm:px-6 sm:py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
              Free Privacy Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to achieve cookie consent compliance. 
              Free tools to scan, audit, and optimize your privacy practices.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {tools.map((tool) => (
              <Card key={tool.name} className={`${tool.borderColor} hover:shadow-lg transition-shadow`}>
                <CardHeader className={`${tool.bgColor} rounded-t-lg`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${tool.bgColor} border ${tool.borderColor}`}>
                        <tool.icon className={`h-6 w-6 ${tool.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{tool.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {tool.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {tool.status === 'Available' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3" />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Zap className="h-3 w-3" />
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-2">Features:</h4>
                      <ul className="space-y-1">
                        {tool.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {tool.status === 'Available' ? (
                      <Button asChild className="w-full">
                        <Link href={tool.path}>
                          Use {tool.name}
                        </Link>
                      </Button>
                    ) : (
                      <Button disabled className="w-full">
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">Need More Help?</h3>
                <p className="text-muted-foreground mb-4">
                  Our tools are just the beginning. Get personalized compliance guidance 
                  and custom cookie banner solutions for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <Link href="/dashboard">
                      Get Started Free
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/support">
                      Contact Support
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

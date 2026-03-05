'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  BookOpen, 
  Play, 
  Code, 
  Settings, 
  Shield, 
  Zap, 
  ArrowRight,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react'
import { toast } from 'react-hot-toast'


const steps = [
  {
    id: 1,
    title: 'Create Your First Banner',
    description: 'Set up your cookie consent banner with our intuitive builder',
    icon: Settings,
    content: [
      'Sign up for a free account',
      'Click "Create New Banner" in your dashboard',
      'Choose your banner position (top, bottom, or floating)',
      'Select a theme (light, dark, or custom colors)',
      'Customize your banner text and button labels'
    ]
  },
  {
    id: 2,
    title: 'Add Tracking Scripts',
    description: 'Configure which cookies and tracking scripts to manage',
    icon: Code,
    content: [
      'Navigate to the "Scripts" tab in the banner builder',
      'Add your Google Analytics, Facebook Pixel, or other tracking codes',
      'Categorize scripts as Strictly Necessary, Functionality, Performance, or Advertising',
      'Configure script loading behavior and consent requirements'
    ]
  },
  {
    id: 3,
    title: 'Integrate Into Your Website',
    description: 'Add the generated code to your website',
    icon: Zap,
    content: [
      'Copy the generated HTML/JavaScript code from your dashboard',
      'Paste it into your website\'s `<body>` section (before closing `</body>` tag)',
      'Test the banner on your live website',
      'Verify that scripts load only after user consent'
    ]
  },
  {
    id: 4,
    title: 'Ensure Compliance',
    description: 'Make sure your banner meets GDPR and PIPEDA requirements',
    icon: Shield,
    content: [
      'Review your privacy policy and cookie policy',
      'Ensure users can easily access cookie preferences',
      'Test the banner on different devices and browsers',
      'Monitor consent rates and user interactions'
    ]
  }
]

const codeExample = `<!-- Add this code to your website's <body> section (before closing </body> tag) -->
<script>
(function() {
  // Cookie Banner Configuration
  const bannerConfig = {
    title: "We use cookies",
    message: "This website uses cookies to enhance your browsing experience.",
    acceptButton: "Accept All",
    preferencesButton: "Cookie Settings",
    position: "bottom",
    theme: "dark"
  };
  
  // Cookie Banner Implementation
  // ... (full implementation code)
})();
</script>`

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <BookOpen className="w-4 h-4 mr-2" />
              Documentation
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              Get Started with Cookie Consent Banners
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Learn how to create, customize, and integrate GDPR-compliant cookie consent banners in just a few simple steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/dashboard/builder">
                  <Play className="w-5 h-5 mr-2" />
                  Start Building
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#quick-start">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Quick Start Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Guide */}
      <section id="quick-start" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Quick Start Guide</h2>
              <p className="text-muted-foreground">
                Follow these simple steps to create your first cookie consent banner
              </p>
            </div>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <Card key={step.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                          <step.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="secondary">Step {step.id}</Badge>
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 ml-16">
                      {step.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Integration Example</h2>
              <p className="text-muted-foreground">
                Here's how to add your cookie banner to your website
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  HTML Integration
                </CardTitle>
                <CardDescription>
                  Copy and paste this code into your website's body section (before closing &lt;/body&gt; tag)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{codeExample}</code>
                  </pre>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="absolute top-2 right-2"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(codeExample)
                        toast.success('Code copied to clipboard!')
                      } catch (error) {
                        toast.error('Failed to copy code')
                      }
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
              <p className="text-muted-foreground">
                Learn more about cookie consent and compliance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Compliance Guide
                  </CardTitle>
                  <CardDescription>
                    Understand GDPR, PIPEDA, and other privacy regulations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/blog/gdpr-cookie-consent-requirements">
                      Read Guide
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Advanced Configuration
                  </CardTitle>
                  <CardDescription>
                    Learn about advanced banner customization options
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/support">
                      Get Support
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Create your first cookie consent banner in minutes
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/dashboard/builder">
                <Play className="w-5 h-5 mr-2" />
                Create Your Banner
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Metadata } from 'next'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Code, HelpCircle, ArrowRight } from '@phosphor-icons/react'

export const metadata: Metadata = {
  title: 'Support - Cookie Banner Generator',
  description: 'Get help with Cookie Banner Generator. Contact our support team for assistance with your cookie consent banners.',
}

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              Support Center
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              We're Here to Help
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get personalized help from our support team. We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Contact Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Email Support */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Email Support</CardTitle>
                <CardDescription className="text-center">
                  Get personalized help from our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  We typically respond within 24 hours
                </p>
                <Button asChild className="w-full">
                  <a href="mailto:greenantyson@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    greenantyson@gmail.com
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Webflow Extension Support */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-center">Webflow Extension Help</CardTitle>
                <CardDescription className="text-center">
                  Having trouble with the Designer Extension?
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  We can help you get it working
                </p>
                <Button asChild variant="outline" className="w-full">
                  <a href="mailto:greenantyson@gmail.com?subject=Webflow Extension Support">
                    <Code className="w-4 h-4 mr-2" />
                    Extension Support
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-b border-border pb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    How do I install the Webflow Extension?
                  </h3>
                  <p className="text-muted-foreground">
                    Install the extension from your Webflow workspace settings, then press 'E' in the Designer to launch it. 
                    Sign in with your Cookie Banner account to access your saved configurations.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Is my banner GDPR compliant?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! All banners generated through our platform are designed to meet GDPR, PIPEDA, CASL, and Quebec Law 25 requirements. 
                    We regularly update our templates to stay current with changing privacy laws.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Can I customize the banner colors and text?
                  </h3>
                  <p className="text-muted-foreground">
                    Absolutely! You can customize everything - colors, text, positioning, button labels, and more. 
                    Use the visual builder to see changes in real-time before generating your code.
                  </p>
                </div>

                <div className="border-b border-border pb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    What if I need help with my specific website?
                  </h3>
                  <p className="text-muted-foreground">
                    Our support team can help you implement the banner on your specific platform (WordPress, Shopify, custom sites, etc.). 
                    Just email us with your website details and we'll provide personalized guidance.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Do you offer custom banner development?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes! For complex requirements or custom integrations, we can create tailored solutions. 
                    Contact us with your specific needs and we'll provide a custom quote.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card className="bg-primary text-primary-foreground mb-12 border-primary">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Quick Response Times</CardTitle>
              <CardDescription className="text-center text-primary-foreground/80">
                We pride ourselves on fast, helpful support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold mb-2">24h</div>
                  <div className="text-primary-foreground/80">Email Response</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">48h</div>
                  <div className="text-primary-foreground/80">Complex Issues</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">Same Day</div>
                  <div className="text-primary-foreground/80">Urgent Requests</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Get in Touch</CardTitle>
              <CardDescription className="text-center">
                For any questions, issues, or feedback, we're here to help
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild size="lg" className="mt-4">
                <a href="mailto:greenantyson@gmail.com">
                  <Mail className="w-5 h-5 mr-2" />
                  greenantyson@gmail.com
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

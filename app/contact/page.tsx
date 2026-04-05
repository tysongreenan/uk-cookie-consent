import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StructuredData } from '@/components/seo/structured-data'
import { Mail, Clock, MessageSquare, FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us — Cookie Banner Generator Support',
  description: 'Get help with your cookie consent banner. Email support, documentation, and FAQs. We respond within 24 hours on business days.',
  openGraph: {
    title: 'Contact Us — Cookie Banner Generator',
    description: 'Get help with your cookie consent banner. We respond within 24 hours.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="faq"
        data={[
          { question: 'How quickly do you respond to support requests?', answer: 'We aim to respond within 24 hours on business days. Pro users receive priority support.' },
          { question: 'What should I include in my support message?', answer: 'Include your account email, what you were trying to do, what happened instead, and any error messages or screenshots.' },
          { question: 'Do you offer phone support?', answer: 'We currently offer email support only. For enterprise accounts, we offer video call support.' },
        ]}
      />

      <Header />

      <main>
        <section className="py-20 md:py-28 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Badge variant="outline" className="mb-6">Support</Badge>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              How can we help?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re here to help you get the most out of your cookie consent banners.
              Reach out and we&apos;ll get back to you within 24 hours.
            </p>
          </div>
        </section>

        <section className="py-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Email Support</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    For technical issues, billing questions, or general inquiries.
                  </p>
                  <Button asChild>
                    <a href="mailto:support@cookie-banner.ca">support@cookie-banner.ca</a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    We respond within <strong>24 hours</strong> on business days.
                    Pro users receive priority support with faster response times.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Knowledge Base</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Browse guides, tutorials, and answers to common questions.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/docs">Browse Documentation</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>Blog & Guides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    In-depth articles on GDPR, PIPEDA, Law 25, and cookie compliance.
                  </p>
                  <Button variant="outline" asChild>
                    <Link href="/blog">Read the Blog</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 border-b border-border">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-center mb-12">What to include in your message</h2>
            <div className="space-y-4">
              {[
                'Your account email address',
                'What you were trying to do',
                'What happened instead (include any error messages)',
                'Your website URL (if relevant)',
                'Screenshots if possible',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

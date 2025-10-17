'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Crown, BarChart3, Users, Palette, Upload, Shield, Clock } from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function PricingPage() {
  const { data: session } = useSession()
  
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '',
      description: 'Start free, upgrade when ready',
      features: [
        'Unlimited websites',
        'GA4 integration (send events to Google Analytics)',
        'All compliance frameworks (GDPR, CCPA, PIPEDA)',
        'Standard layouts (Bottom, Top, Center, Side)',
        'Basic customization',
        'Community support'
      ],
      cta: 'Get Started Free',
      tier: 'free',
      icon: <Zap className="w-6 h-6" />,
      popular: true,
      ctaLink: '/auth/signup'
    },
    {
      name: 'Pro',
      price: '$48.99',
      period: ' one-time',
      description: 'Everything you need, forever',
      features: [
        'Everything in Free',
        'Analytics dashboard (impressions, acceptance rates)',
        'Team collaboration (invite members, role-based permissions)',
        'Custom layouts (Modal, Slide-in, Minimalist, etc.)',
        'Image upload for logos',
        'Advanced customization',
        'Priority email support',
        'Lifetime updates included'
      ],
      cta: 'Upgrade to Pro',
      tier: 'pro',
      icon: <Crown className="w-6 h-6" />,
      ctaLink: '/upgrade'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Unlimited team members',
        'White-label solution',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment'
      ],
      cta: 'Contact Sales',
      tier: 'enterprise',
      icon: <Shield className="w-6 h-6" />,
      ctaLink: 'mailto:sales@cookie-banner.ca'
    }
  ]
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Start Free, Upgrade Once, Own Forever</h1>
          <p className="text-xl text-muted-foreground mb-8">
            No subscriptions. No hidden fees. Just simple, transparent pricing.
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              One-time payment
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Lifetime updates
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              No recurring fees
            </Badge>
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
        
        {/* Value Proposition Section */}
        <div className="bg-muted/50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Pro is a No-Brainer</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold mb-2">Save Money</h3>
              <p className="text-sm text-muted-foreground">
                $48.99 once vs competitors charging $9-19/month. 
                You save money after just 3-6 months.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold mb-2">Future-Proof</h3>
              <p className="text-sm text-muted-foreground">
                Lifetime updates included. New features, 
                compliance updates, and improvements forever.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold mb-2">Team Ready</h3>
              <p className="text-sm text-muted-foreground">
                Invite team members, collaborate on banners, 
                and manage permissions. Perfect for agencies.
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">What happens after I upgrade to Pro?</h3>
              <p className="text-sm text-muted-foreground">
                You'll immediately get access to all Pro features including analytics dashboard, 
                team collaboration, custom layouts, and image uploads. Your account will be 
                upgraded instantly after payment.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Do I get lifetime updates?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! All future features, compliance updates, and improvements are included 
                in your one-time payment. No additional charges ever.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I invite team members with Pro?</h3>
              <p className="text-sm text-muted-foreground">
                Absolutely! Pro includes unlimited team members with role-based permissions. 
                Perfect for agencies and businesses with multiple team members.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, debit cards, and PayPal through our secure 
                Stripe payment processor.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Is there a free trial for Pro?</h3>
              <p className="text-sm text-muted-foreground">
                You can use the Free plan with unlimited websites and GA4 integration. 
                Upgrade to Pro when you need advanced features like analytics and team collaboration.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

function PricingCard({ 
  name, 
  price, 
  period, 
  description, 
  features, 
  cta, 
  tier, 
  icon,
  popular,
  ctaLink
}: {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  tier: string
  icon: React.ReactNode
  popular?: boolean
  ctaLink?: string
}) {
  const isFree = tier === 'free'
  const isEnterprise = tier === 'enterprise'
  const isPro = tier === 'pro'
  
  return (
    <Card className={`relative ${popular ? 'border-primary shadow-lg scale-105' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1">
            {tier === 'free' ? 'Best Value' : 'Better Value'}
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className={`p-3 rounded-lg ${popular ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl">{name}</CardTitle>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold">{price}</span>
          {period && <span className="text-muted-foreground ml-1">{period}</span>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <div className="text-green-500 mt-0.5">
                <Check className="w-4 h-4" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${popular ? 'bg-primary hover:bg-primary/90' : ''}`}
          variant={popular ? 'default' : 'outline'}
          size="lg"
        >
          {isEnterprise ? (
            <a href={ctaLink} className="w-full">
              {cta}
            </a>
          ) : (
            <Link href={ctaLink || '#'} className="w-full">
              {cta}
            </Link>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

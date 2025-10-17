'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Users, Building, Crown } from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function PricingPage() {
  const { data: session } = useSession()
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '',
      description: 'Perfect for getting started',
      features: [
        'Unlimited banner customization',
        'Script injection on consent',
        'Up to 1 website',
        'Basic compliance frameworks',
        '❌ No analytics'
      ],
      cta: 'Get Started',
      tier: 'free',
      icon: <Zap className="w-6 h-6" />
    },
    {
      name: 'Starter',
      price: billingCycle === 'yearly' ? '$8' : '$9',
      period: '/month',
      description: 'For individual websites',
      features: [
        'Everything in Free',
        '✅ Full analytics dashboard',
        'Up to 5 websites',
        'Acceptance rate tracking',
        'Traffic estimation',
        '30-day data retention',
        'Email support'
      ],
      cta: 'Start Free Trial',
      tier: 'starter',
      icon: <Users className="w-6 h-6" />,
      popular: true
    },
    {
      name: 'Agency',
      price: billingCycle === 'yearly' ? '$16' : '$19',
      period: '/month',
      description: 'For agencies & multi-site businesses',
      features: [
        'Everything in Starter',
        'Up to 25 websites',
        billingCycle === 'yearly' ? 'Just $0.64 per site' : 'Just $0.76 per site',
        'Consolidated dashboard',
        'Priority support',
        'Custom branding',
        'API access'
      ],
      cta: 'Start Free Trial',
      tier: 'agency',
      icon: <Building className="w-6 h-6" />
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations',
      features: [
        'Everything in Agency',
        'Unlimited websites',
        'White-label solution',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment'
      ],
      cta: 'Contact Sales',
      tier: 'enterprise',
      icon: <Crown className="w-6 h-6" />
    }
  ]
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Stay compliant and understand your true website traffic
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm ${billingCycle === 'monthly' ? 'font-semibold' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm ${billingCycle === 'yearly' ? 'font-semibold' : 'text-muted-foreground'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            )}
          </div>
        </div>
        
        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
        
        {/* Why Analytics Section */}
        <div className="bg-muted/50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Why add analytics?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="font-semibold mb-2">Understand True Traffic</h3>
              <p className="text-sm text-muted-foreground">
                Your Google Analytics is missing 20-40% of visitors who reject cookies. 
                See the real numbers and make data-driven decisions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold mb-2">Prove Compliance</h3>
              <p className="text-sm text-muted-foreground">
                GDPR/CCPA requires proof of consent. Get automated compliance reporting 
                and audit trails for legal protection.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold mb-2">Optimize Your Banner</h3>
              <p className="text-sm text-muted-foreground">
                Test different copy and designs. Track acceptance rates to improve 
                results and maximize consent rates.
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">How does the analytics tracking work?</h3>
              <p className="text-sm text-muted-foreground">
                We provide a lightweight JavaScript snippet that tracks banner impressions, 
                user decisions, and timing. All data is anonymized and stored securely.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I upgrade or downgrade anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! You can change your plan at any time. Upgrades take effect immediately, 
                and downgrades take effect at the next billing cycle.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">What happens to my data if I cancel?</h3>
              <p className="text-sm text-muted-foreground">
                Your banner configurations are preserved, but analytics data is deleted 
                after 30 days. You can export your data before canceling.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Do you offer custom enterprise plans?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Contact our sales team for custom pricing, dedicated support, 
                and enterprise features like white-labeling and on-premise deployment.
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
  popular 
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
}) {
  const isFree = tier === 'free'
  const isEnterprise = tier === 'enterprise'
  
  return (
    <Card className={`relative ${popular ? 'border-primary shadow-lg scale-105' : ''}`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1">
            Most Popular
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
              <div className={`mt-0.5 ${feature.startsWith('❌') ? 'text-red-500' : 'text-green-500'}`}>
                {feature.startsWith('❌') ? '❌' : <Check className="w-4 h-4" />}
              </div>
              <span>{feature.replace(/^[✅❌]\s*/, '')}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          className={`w-full ${popular ? 'bg-primary hover:bg-primary/90' : ''}`}
          variant={popular ? 'default' : 'outline'}
          size="lg"
        >
          {isEnterprise ? (
            <a href="mailto:sales@cookie-banner.ca" className="w-full">
              {cta}
            </a>
          ) : isFree ? (
            <Link href="/auth/signup" className="w-full">
              {cta}
            </Link>
          ) : (
            cta
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

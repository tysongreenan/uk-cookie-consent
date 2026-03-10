import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started quickly',
    features: [
      '1 cookie banner',
      'Unlimited websites',
      '4 standard layouts',
      'GDPR & CCPA compliance',
      '"Powered by" branding',
      'Community support',
    ],
    buttonText: 'Get Started Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$99',
    period: 'one-time',
    description: 'Everything you need, forever',
    features: [
      'Unlimited banners',
      'GA4 analytics integration',
      'Remove branding',
      '11 custom layouts',
      'Analytics dashboard',
      'Team collaboration',
      'Logo & image upload',
      'Priority support',
      'Lifetime updates',
    ],
    buttonText: 'Upgrade to Pro',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'White-label options',
      'API access',
      'Custom integrations',
      'Dedicated support',
      '99.9% SLA guarantee',
    ],
    buttonText: 'Contact Sales',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Choose the plan that fits your needs. Upgrade or downgrade at any time.
        </p>
      </div>
      
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
        {plans.map((plan) => (
          <Card key={plan.name} className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="text-3xl font-bold">{plan.price}{(plan as any).period && <span className="text-sm font-normal text-muted-foreground"> {(plan as any).period}</span>}</div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                variant={plan.popular ? 'default' : 'outline'}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

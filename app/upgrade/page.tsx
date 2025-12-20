'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Crown, Zap, Users, Palette, Upload, BarChart3, Shield, Clock, ArrowLeft } from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function UpgradePage() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/upgrade/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session?.user?.id })
      })
      
      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No checkout URL received')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const proFeatures = [
    { icon: <BarChart3 className="h-5 w-5" />, title: 'Analytics Dashboard', description: 'Track impressions, acceptance rates, and traffic estimation' },
    { icon: <Users className="h-5 w-5" />, title: 'Team Collaboration', description: 'Invite team members with role-based permissions' },
    { icon: <Palette className="h-5 w-5" />, title: 'Custom Layouts', description: 'Modal, slide-in, minimalist, and more advanced layouts' },
    { icon: <Upload className="h-5 w-5" />, title: 'Image Upload', description: 'Upload custom logos and branding elements' },
    { icon: <Shield className="h-5 w-5" />, title: 'Priority Support', description: 'Get help when you need it with priority email support' },
    { icon: <Clock className="h-5 w-5" />, title: 'Lifetime Updates', description: 'All future features and improvements included forever' }
  ]

  const freeFeatures = [
    'Unlimited websites',
    'GA4 integration',
    'All compliance frameworks',
    'Standard layouts (Bottom, Top, Center, Side)',
    'Basic customization',
    'Community support'
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-4xl font-bold mb-4">Upgrade to Pro</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Unlock advanced features and team collaboration for just $48.99
          </p>
          <div className="flex items-center justify-center space-x-4">
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

        {/* Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5" />
                <span>Free Plan</span>
              </CardTitle>
              <CardDescription>What you have now</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-primary shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="h-5 w-5 text-primary" />
                  <span>Pro Plan</span>
                </CardTitle>
                <Badge className="bg-primary text-primary-foreground">
                  Best Value
                </Badge>
              </div>
              <CardDescription>Everything in Free, plus:</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="text-primary mt-0.5">{feature.icon}</div>
                    <div>
                      <div className="font-medium text-sm">{feature.title}</div>
                      <div className="text-xs text-muted-foreground">{feature.description}</div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t pt-4">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold">$48.99</div>
                  <div className="text-sm text-muted-foreground">One-time payment</div>
                </div>
                <Button 
                  onClick={handleUpgrade}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Crown className="h-4 w-4 mr-2" />
                      Upgrade to Pro
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Value Proposition */}
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

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">What happens after I upgrade?</h3>
              <p className="text-sm text-muted-foreground">
                You'll immediately get access to all Pro features including analytics dashboard, 
                team collaboration, custom layouts, and image uploads. Your account will be 
                upgraded instantly.
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
              <h3 className="font-semibold mb-2">Can I invite team members?</h3>
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
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

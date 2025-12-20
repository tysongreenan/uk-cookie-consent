'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, BarChart3, Users, Palette, Upload, ArrowRight } from '@phosphor-icons/react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import Link from 'next/link'

export default function UpgradeSuccessPage() {
  const nextSteps = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: 'Explore Analytics',
      description: 'Check out your new analytics dashboard to track banner performance',
      href: '/dashboard/analytics'
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Invite Team Members',
      description: 'Add team members and set up role-based permissions',
      href: '/dashboard/team'
    },
    {
      icon: <Palette className="h-5 w-5" />,
      title: 'Try Custom Layouts',
      description: 'Create banners with advanced layouts like modal and slide-in',
      href: '/dashboard/builder'
    },
    {
      icon: <Upload className="h-5 w-5" />,
      title: 'Upload Your Logo',
      description: 'Add custom branding to your cookie banners',
      href: '/dashboard/builder'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12 px-4 max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Pro!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your account has been successfully upgraded. You now have access to all Pro features.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
              ✅ Pro Account Active
            </div>
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
              🎉 Lifetime Updates Included
            </div>
          </div>
        </div>

        {/* What's New */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>What's New in Your Pro Account</CardTitle>
            <CardDescription>
              Here are the features you now have access to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Analytics Dashboard</div>
                    <div className="text-sm text-muted-foreground">Track impressions and acceptance rates</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Team Collaboration</div>
                    <div className="text-sm text-muted-foreground">Invite team members with roles</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Palette className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Custom Layouts</div>
                    <div className="text-sm text-muted-foreground">Modal, slide-in, and more</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Upload className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium">Image Upload</div>
                    <div className="text-sm text-muted-foreground">Add custom logos and branding</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-center">What Would You Like to Do Next?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {nextSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{step.description}</p>
                      <Button asChild size="sm" variant="outline">
                        <Link href={step.href}>
                          Get Started
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Support */}
        <Card className="bg-muted/50">
          <CardContent className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">Need Help Getting Started?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you make the most of your Pro features.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button asChild variant="outline">
                <Link href="/support">
                  Contact Support
                </Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  )
}

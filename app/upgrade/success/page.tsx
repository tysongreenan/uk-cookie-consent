'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, BarChart3, Users, Palette, Upload, ArrowRight, RefreshCw, Clock } from 'lucide-react'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function UpgradeSuccessPage() {
  const { data: session } = useSession()
  const planTier = session?.user?.planTier || 'pro_lifetime'
  const isAnnual = planTier === 'pro_annual'

  const nextSteps = [
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: 'Explore Analytics',
      description: 'Track banner performance and consent rates',
      href: '/dashboard/analytics',
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: 'Invite Team Members',
      description: 'Add your team with role-based permissions',
      href: '/dashboard/team',
    },
    {
      icon: <Palette className="h-5 w-5" />,
      title: 'Try Custom Layouts',
      description: 'Create banners with modal, slide-in, and more',
      href: '/dashboard/builder',
    },
    {
      icon: <Upload className="h-5 w-5" />,
      title: 'Upload Your Logo',
      description: 'Add custom branding to your banners',
      href: '/dashboard/builder',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20 pb-12 px-4 max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="mx-auto h-20 w-20 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Welcome to Pro!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your account has been upgraded. All Pro features are now unlocked.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <div className="bg-green-100 dark:bg-green-950/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5" />
              Pro Account Active
            </div>
            <div className="bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium inline-flex items-center gap-1.5">
              {isAnnual
                ? <><RefreshCw className="h-3.5 w-3.5" /> All Future Features Included</>
                : <><Clock className="h-3.5 w-3.5" /> Lifetime Access</>
              }
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          {nextSteps.map((step, i) => (
            <Link key={i} href={step.href}>
              <Card className="hover:border-primary/50 hover:shadow-md transition-all cursor-pointer h-full">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{step.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground ml-auto mt-1 shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Info card */}
        {isAnnual ? (
          <div className="text-center border rounded-lg p-6 bg-muted/30">
            <h3 className="font-semibold mb-2">Annual Subscription Active</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your plan renews automatically. You can manage your subscription, update payment methods, or view invoices anytime.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/settings">Manage Subscription</Link>
            </Button>
          </div>
        ) : (
          <div className="text-center border rounded-lg p-6 bg-muted/30">
            <h3 className="font-semibold mb-2">Lifetime Access Activated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              All current Pro features are yours forever. Want all future features too? You can upgrade to annual anytime at a loyalty discount.
            </p>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        )}

        {/* Support */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Questions? Email us at{' '}
            <a href="mailto:support@cookie-banner.ca" className="text-primary hover:underline">
              support@cookie-banner.ca
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { Plus, FileText, ExternalLink, Loader2, Trash2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { publicPolicyDisplay } from '@/lib/privacy-policy/hosted-url'

interface SavedPolicy {
  id: string
  title: string
  businessName: string
  status: 'draft' | 'published' | 'archived'
  slug?: string
  language?: string
  createdAt: string
  updatedAt: string
}

export default function PrivacyPoliciesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [policies, setPolicies] = useState<SavedPolicy[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchPolicies()
    }
  }, [session])

  const fetchPolicies = async () => {
    try {
      const res = await fetch('/api/privacy-policy')
      if (res.status === 401) {
        router.push('/auth/signin')
        return
      }
      if (!res.ok) throw new Error('Failed to fetch policies')
      const data = await res.json()
      // API returns { policies } (and legacy { data }) — accept either shape.
      const list = Array.isArray(data.policies)
        ? data.policies
        : Array.isArray(data.data)
          ? data.data
          : []
      setPolicies(
        list.map((p: any) => ({
          id: p.id,
          title: p.title || p.name || p.businessName || 'Untitled policy',
          businessName: p.businessName || p.title || p.name || 'Untitled',
          status: p.status || 'draft',
          slug: p.slug,
          language: p.language || 'en',
          createdAt: p.createdAt || p.created_at || new Date().toISOString(),
          updatedAt: p.updatedAt || p.updated_at || new Date().toISOString(),
        })),
      )
    } catch (err) {
      console.error('Failed to fetch policies:', err)
      toast.error('Failed to load privacy policies')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || (status === 'authenticated' && isLoading)) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    )
  }

  if (status === 'unauthenticated') return null

  return (
    <DashboardLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Privacy Policies' },
          ]}
        />

        <div className="flex items-center justify-between mb-8 mt-4">
          <div>
            <h1 className="text-2xl font-bold">Privacy Policies</h1>
            <p className="text-muted-foreground mt-1">
              Create, manage, and publish privacy policies for your websites.
            </p>
          </div>
          <Button asChild>
            <Link href="/dashboard/privacy-policy/new">
              <Plus className="h-4 w-4 mr-2" />
              Create New Policy
            </Link>
          </Button>
        </div>

        {policies.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No privacy policies yet</h3>
              <p className="text-muted-foreground mb-4 text-center max-w-md">
                Generate a policy tailored to your business, then publish it to a clean hosted URL
                (e.g. cookie-banner.ca/p/your-brand/privacy-policy).
              </p>
              <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
                Need French? On step 1 choose <span className="font-medium text-foreground">Français</span>
                — selecting Quebec suggests French automatically. You can keep separate EN and FR policies.
              </p>
              <Button asChild>
                <Link href="/dashboard/privacy-policy/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Policy
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {policies.map((policy) => (
              <Card key={policy.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="font-semibold truncate">{policy.title || policy.businessName}</h3>
                        <Badge variant={
                          policy.status === 'published' ? 'default' :
                          policy.status === 'archived' ? 'secondary' : 'outline'
                        }>
                          {policy.status}
                        </Badge>
                        <Badge variant="outline">
                          {policy.language === 'fr' ? 'FR' : 'EN'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {policy.businessName} &middot; Updated {new Date(policy.updatedAt).toLocaleDateString()}
                      </p>
                      {policy.status === 'published' && policy.slug && (
                        <p className="text-sm text-primary mt-1">
                          <ExternalLink className="h-3 w-3 inline mr-1" />
                          {publicPolicyDisplay(policy.slug, policy.language)}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/privacy-policy/${policy.id}`}>
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

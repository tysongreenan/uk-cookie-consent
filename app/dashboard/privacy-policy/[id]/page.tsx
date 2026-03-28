'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import {
  Loader2,
  Copy,
  Check,
  Download,
  Globe,
  Trash2,
  Edit,
  ExternalLink,
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import type { PolicyOutput } from '@/types'

interface PolicyDetail {
  id: string
  title: string
  businessName: string
  status: 'draft' | 'published' | 'archived'
  slug?: string
  contentHtml: string
  contentJson: PolicyOutput['contentJson']
  inputs: Record<string, any>
  metadata: PolicyOutput['metadata']
  createdAt: string
  updatedAt: string
}

export default function PolicyDetailPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const policyId = params.id as string

  const [policy, setPolicy] = useState<PolicyDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasCopied, setHasCopied] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session && policyId) {
      fetchPolicy()
    }
  }, [session, policyId])

  const fetchPolicy = async () => {
    try {
      const res = await fetch(`/api/privacy-policy/${policyId}`)
      if (!res.ok) {
        if (res.status === 404) {
          toast.error('Policy not found')
          router.push('/dashboard/privacy-policy')
          return
        }
        throw new Error('Failed to fetch policy')
      }
      const data = await res.json()
      setPolicy(data)
    } catch (err) {
      console.error('Failed to fetch policy:', err)
      toast.error('Failed to load policy')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = useCallback(async () => {
    if (!policy) return
    try {
      await navigator.clipboard.writeText(policy.contentHtml)
      setHasCopied(true)
      toast.success('Privacy policy HTML copied to clipboard')
      setTimeout(() => setHasCopied(false), 2000)
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }, [policy])

  const handleDownload = useCallback(() => {
    if (!policy) return
    const blob = new Blob([policy.contentHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `privacy-policy-${policy.businessName.toLowerCase().replace(/\s+/g, '-')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [policy])

  const handlePublish = useCallback(async () => {
    if (!policy) return
    setIsPublishing(true)
    try {
      const res = await fetch(`/api/privacy-policy/${policyId}/publish`, {
        method: 'POST',
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || 'Failed to publish')
      }
      const updated = await res.json()
      setPolicy((prev) => prev ? { ...prev, ...updated } : prev)
      toast.success('Privacy policy published successfully')
    } catch (err: any) {
      toast.error(err.message || 'Failed to publish policy')
    } finally {
      setIsPublishing(false)
    }
  }, [policy, policyId])

  const handleDelete = useCallback(async () => {
    if (!policy) return
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/privacy-policy/${policyId}`, {
        method: 'DELETE',
      })
      if (!res.ok) {
        throw new Error('Failed to delete policy')
      }
      toast.success('Privacy policy deleted')
      router.push('/dashboard/privacy-policy')
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete policy')
      setIsDeleting(false)
    }
  }, [policy, policyId, router])

  if (status === 'loading' || (status === 'authenticated' && isLoading)) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    )
  }

  if (status === 'unauthenticated' || !policy) return null

  return (
    <DashboardLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Privacy Policies', href: '/dashboard/privacy-policy' },
            { label: policy.title || policy.businessName },
          ]}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-6 mt-4 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">{policy.title || `Privacy Policy - ${policy.businessName}`}</h1>
              <Badge variant={
                policy.status === 'published' ? 'default' :
                policy.status === 'archived' ? 'secondary' : 'outline'
              }>
                {policy.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Last updated {new Date(policy.updatedAt).toLocaleDateString()}
              {policy.metadata?.jurisdictions?.length > 0 && (
                <> &middot; Covers: {policy.metadata.jurisdictions.join(', ')}</>
              )}
            </p>
            {policy.status === 'published' && policy.slug && (
              <p className="text-sm text-primary mt-1">
                <ExternalLink className="h-3 w-3 inline mr-1" />
                <a
                  href={`https://www.cookie-banner.ca/p/${policy.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  cookie-banner.ca/p/{policy.slug}
                </a>
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {hasCopied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {hasCopied ? 'Copied' : 'Copy HTML'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/privacy-policy/new">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Link>
            </Button>
            {policy.status !== 'published' && (
              <Button
                size="sm"
                onClick={handlePublish}
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                ) : (
                  <Globe className="h-4 w-4 mr-1" />
                )}
                Publish
              </Button>
            )}
          </div>
        </div>

        {/* Published URL notice */}
        {policy.status === 'published' && policy.slug && (
          <Card className="mb-6 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950">
            <CardContent className="p-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Your policy is live</p>
                  <p className="text-sm text-muted-foreground">
                    Visitors can view it at{' '}
                    <a
                      href={`https://www.cookie-banner.ca/p/${policy.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      cookie-banner.ca/p/{policy.slug}
                    </a>
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://www.cookie-banner.ca/p/${policy.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Live Page
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Policy Content - rendered from our server-generated policy, not raw user input */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <PolicyContent html={policy.contentHtml} />
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-lg text-red-600 dark:text-red-400">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            {showDeleteConfirm ? (
              <div className="flex items-center gap-4">
                <p className="text-sm text-muted-foreground flex-1">
                  Are you sure you want to delete this privacy policy? This action cannot be undone.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-1" />
                  )}
                  Delete Forever
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Permanently delete this privacy policy and its hosted page.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete Policy
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

/**
 * Renders server-generated privacy policy HTML.
 * The content is produced by our own generator (lib/privacy-policy/generator)
 * from Zod-validated inputs -- it is not arbitrary user-supplied HTML.
 */
function PolicyContent({ html }: { html: string }) {
  return (
    <div
      className="prose prose-sm max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

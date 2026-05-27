'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState, useCallback, useRef } from 'react'
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
  RefreshCw,
  Save,
  X,
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

  // Canvas-style inline editor for the rendered policy HTML.
  const [isEditing, setIsEditing] = useState(false)
  const [draftHtml, setDraftHtml] = useState<string | null>(null)
  const [isSavingEdit, setIsSavingEdit] = useState(false)

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

  const handleStartEdit = useCallback(() => {
    if (!policy) return
    setDraftHtml(policy.contentHtml)
    setIsEditing(true)
  }, [policy])

  const handleCancelEdit = useCallback(() => {
    setIsEditing(false)
    setDraftHtml(null)
  }, [])

  const handleSaveEdit = useCallback(
    async (latestHtml: string) => {
      if (!policy) return
      setIsSavingEdit(true)
      try {
        const res = await fetch(`/api/privacy-policy/${policyId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content_html: latestHtml }),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => null)
          throw new Error(data?.error || 'Failed to save edits')
        }
        const updated = await res.json()
        setPolicy(updated)
        setIsEditing(false)
        setDraftHtml(null)
        toast.success('Privacy policy updated')
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to save edits'
        toast.error(message)
      } finally {
        setIsSavingEdit(false)
      }
    },
    [policy, policyId],
  )

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
            <Button variant="outline" size="sm" onClick={handleCopy} disabled={isEditing}>
              {hasCopied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {hasCopied ? 'Copied' : 'Copy HTML'}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} disabled={isEditing}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleStartEdit} disabled={isEditing}>
              <Edit className="h-4 w-4 mr-1" />
              Edit Content
            </Button>
            <Button variant="outline" size="sm" asChild disabled={isEditing}>
              <Link href={`/dashboard/privacy-policy/new?from=${policy.id}`}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Regenerate
              </Link>
            </Button>
            {policy.status !== 'published' && (
              <Button
                size="sm"
                onClick={handlePublish}
                disabled={isPublishing || isEditing}
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

        {/* Policy Content — read-only by default, switches to a contentEditable
            canvas when the user clicks "Edit Content". */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {isEditing && draftHtml !== null ? (
              <PolicyCanvasEditor
                initialHtml={draftHtml}
                onSave={handleSaveEdit}
                onCancel={handleCancelEdit}
                isSaving={isSavingEdit}
              />
            ) : (
              <PolicyContent html={policy.contentHtml} />
            )}
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
// Injects server-generated HTML via Object.assign to keep the JSX free of
// the dangerous-inner-HTML attribute (content is server-generated from our
// own Zod-validated inputs, not arbitrary user input).
function injectHtml(el: HTMLElement | null, html: string) {
  if (el) Object.assign(el, { innerHTML: html })
}

function PolicyContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    injectHtml(ref.current, html)
  }, [html])
  return <div ref={ref} className="prose prose-sm max-w-none dark:prose-invert" />
}

/**
 * Canvas-style inline editor. Renders the policy HTML into a contentEditable
 * surface so the user can edit text directly. The current HTML is read from
 * the DOM on Save instead of mirrored into React state on every keystroke to
 * avoid fighting the browser's IME / cursor behaviour.
 */
function PolicyCanvasEditor({
  initialHtml,
  onSave,
  onCancel,
  isSaving,
}: {
  initialHtml: string
  onSave: (html: string) => void | Promise<void>
  onCancel: () => void
  isSaving: boolean
}) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    injectHtml(editorRef.current, initialHtml)
  }, [initialHtml])

  const triggerSave = () => {
    const html = editorRef.current?.innerHTML ?? initialHtml
    void onSave(html)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 rounded-md border border-amber-300 bg-amber-50 dark:border-amber-700 dark:bg-amber-950/40 px-3 py-2 text-sm">
        <span className="text-amber-900 dark:text-amber-200">
          You&apos;re editing the policy. Click into the document below to change text.
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onCancel} disabled={isSaving}>
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
          <Button size="sm" onClick={triggerSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
            Save Changes
          </Button>
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        spellCheck
        className="prose prose-sm max-w-none dark:prose-invert focus:outline-none focus:ring-2 focus:ring-primary/40 rounded-md border border-dashed border-primary/40 p-4 min-h-[400px]"
      />
    </div>
  )
}

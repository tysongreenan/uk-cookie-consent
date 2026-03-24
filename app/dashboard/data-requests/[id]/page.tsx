'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Download,
  Loader2,
  Play,
  Shield,
  XCircle,
  AlertTriangle,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import type { DataAccessRequest, DSARStatus, DSARVerificationMethod } from '@/types'

const STATUS_STEPS: DSARStatus[] = ['pending', 'identity_verified', 'processing', 'completed']

function getDeadlineInfo(deadlineAt: string) {
  const now = new Date()
  const deadline = new Date(deadlineAt)
  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  if (daysLeft < 0) return { label: `${Math.abs(daysLeft)} days overdue`, color: 'text-red-600 bg-red-50', urgent: true }
  if (daysLeft <= 7) return { label: `${daysLeft} days remaining`, color: 'text-red-600 bg-red-50', urgent: true }
  if (daysLeft <= 15) return { label: `${daysLeft} days remaining`, color: 'text-yellow-600 bg-yellow-50', urgent: false }
  return { label: `${daysLeft} days remaining`, color: 'text-green-600 bg-green-50', urgent: false }
}

export default function DataRequestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [request, setRequest] = useState<DataAccessRequest | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState('')

  // Verification form state
  const [verificationMethod, setVerificationMethod] = useState<DSARVerificationMethod>('government_id')
  const [verificationNotes, setVerificationNotes] = useState('')
  // Refusal form state
  const [showRefusalForm, setShowRefusalForm] = useState(false)
  const [refusalReason, setRefusalReason] = useState('')

  const fetchRequest = useCallback(async () => {
    try {
      const res = await fetch(`/api/data-access-requests/${id}`, {
        headers: { 'x-requested-with': 'dashboard' },
      })
      if (res.ok) {
        const json = await res.json()
        setRequest(json.data)
      } else {
        setError('Request not found')
      }
    } catch {
      setError('Failed to load request')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchRequest()
  }, [fetchRequest])

  const handleVerify = async () => {
    setActionLoading('verify')
    setError('')
    try {
      const res = await fetch(`/api/data-access-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-requested-with': 'dashboard' },
        body: JSON.stringify({
          identityVerified: true,
          verificationMethod,
          verificationNotes,
        }),
      })
      if (res.ok) {
        await fetchRequest()
      } else {
        const json = await res.json()
        setError(json.error || 'Verification failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setActionLoading(null)
    }
  }

  const handleGenerate = async () => {
    setActionLoading('generate')
    setError('')
    try {
      const res = await fetch(`/api/data-access-requests/${id}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-requested-with': 'dashboard' },
        body: JSON.stringify({ language: 'en' }),
      })
      if (res.ok) {
        await fetchRequest()
      } else {
        const json = await res.json()
        setError(json.error || 'Generation failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDownload = async () => {
    setActionLoading('download')
    setError('')
    try {
      const res = await fetch(`/api/data-access-requests/${id}/download`, {
        headers: { 'x-requested-with': 'dashboard' },
      })
      if (res.ok) {
        const json = await res.json()
        window.open(json.data.url, '_blank')
      } else {
        const json = await res.json()
        setError(json.error || 'Download failed')
      }
    } catch {
      setError('Download failed')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRetry = async () => {
    setActionLoading('retry')
    setError('')
    try {
      // Transition failed → identity_verified, then generate
      const res = await fetch(`/api/data-access-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-requested-with': 'dashboard' },
        body: JSON.stringify({ status: 'identity_verified' }),
      })
      if (res.ok) {
        // Now trigger generation
        const genRes = await fetch(`/api/data-access-requests/${id}/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-requested-with': 'dashboard' },
          body: JSON.stringify({ language: 'en' }),
        })
        if (!genRes.ok) {
          const json = await genRes.json()
          setError(json.error || 'Retry generation failed')
          await fetchRequest()
          return
        }
        await fetchRequest()
      } else {
        const json = await res.json()
        setError(json.error || 'Retry failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setActionLoading(null)
    }
  }

  const handleRefuse = async (reason: string) => {
    setActionLoading('refuse')
    setError('')
    try {
      const res = await fetch(`/api/data-access-requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-requested-with': 'dashboard' },
        body: JSON.stringify({ status: 'refused', refusalReason: reason }),
      })
      if (res.ok) {
        await fetchRequest()
      } else {
        const json = await res.json()
        setError(json.error || 'Refusal failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    )
  }

  if (!request) {
    return (
      <DashboardLayout>
        <div className="text-center py-24">
          <p className="text-muted-foreground">{error || 'Request not found'}</p>
          <button onClick={() => router.push('/dashboard/data-requests')} className="mt-4 text-primary text-sm">
            Back to requests
          </button>
        </div>
      </DashboardLayout>
    )
  }

  const isTerminal = ['completed', 'partially_refused', 'refused', 'failed'].includes(request.status)
  const deadline = getDeadlineInfo(request.deadlineAt)
  const currentStepIndex = STATUS_STEPS.indexOf(request.status as DSARStatus)

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        <Breadcrumbs items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Data Requests', href: '/dashboard/data-requests' },
          { label: `Request ${id.slice(0, 8)}...` },
        ]} />

        <button
          onClick={() => router.push('/dashboard/data-requests')}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to requests
        </button>

        {/* Header with deadline */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">Data Access Request</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {request.subjectIdentifierType}: {request.subjectIdentifierValue}
            </p>
          </div>
          {!isTerminal && (
            <div className={`px-4 py-2 rounded-lg font-medium text-sm ${deadline.color}`}>
              <Clock className="h-4 w-4 inline mr-1" />
              {deadline.label}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">{error}</div>
        )}

        {/* Status Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              {STATUS_STEPS.map((step, i) => {
                const isActive = request.status === step
                const isPast = currentStepIndex > i || isTerminal
                const isFailed = request.status === 'refused' || request.status === 'failed'

                return (
                  <div key={step} className="flex items-center gap-2 flex-1">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
                      isActive ? 'bg-primary text-primary-foreground' :
                      isPast ? 'bg-green-100 text-green-600' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {isPast && !isActive ? <CheckCircle className="h-4 w-4" /> :
                       isFailed && isActive ? <XCircle className="h-4 w-4" /> :
                       <span className="text-xs font-medium">{i + 1}</span>}
                    </div>
                    <span className={`text-xs ${isActive ? 'font-medium' : 'text-muted-foreground'}`}>
                      {step.replace(/_/g, ' ')}
                    </span>
                    {i < STATUS_STEPS.length - 1 && (
                      <div className={`flex-1 h-px ${isPast ? 'bg-green-300' : 'bg-border'}`} />
                    )}
                  </div>
                )
              })}
            </div>
            {(request.status === 'refused' || request.status === 'failed') && (
              <div className="mt-3 px-3 py-2 bg-red-50 rounded-lg text-sm text-red-700">
                {request.status === 'refused' ? `Refused: ${request.refusalReason}` : 'Report generation failed'}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Request Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Request Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Subject Identifier</dt>
                <dd className="font-medium capitalize">{request.subjectIdentifierType}: {request.subjectIdentifierValue}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Contact Email</dt>
                <dd className="font-medium">{request.subjectEmail || 'Not provided'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Report Format</dt>
                <dd className="font-medium uppercase">{request.reportFormat}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Requested</dt>
                <dd className="font-medium">{new Date(request.requestedAt).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Deadline</dt>
                <dd className="font-medium">{new Date(request.deadlineAt).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Timezone</dt>
                <dd className="font-medium">{request.orgTimezone}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Identity Verification */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Identity Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            {request.identityVerified ? (
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-700">Identity verified</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Method: {request.verificationMethod?.replace(/_/g, ' ')} |
                    Verified: {request.verifiedAt ? new Date(request.verifiedAt).toLocaleString() : 'Unknown'}
                  </p>
                  {request.verificationNotes && (
                    <p className="text-xs text-muted-foreground mt-1">Notes: {request.verificationNotes}</p>
                  )}
                </div>
              </div>
            ) : request.status === 'pending' ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Law 25 requires identity verification before releasing personal information. Select a method and confirm.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Verification Method</label>
                    <select
                      value={verificationMethod}
                      onChange={(e) => setVerificationMethod(e.target.value as DSARVerificationMethod)}
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="government_id">Government ID</option>
                      <option value="email_confirmation">Email Confirmation</option>
                      <option value="in_person">In Person</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Notes</label>
                    <input
                      type="text"
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      placeholder="e.g. Driver's license verified"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleVerify}
                    disabled={actionLoading === 'verify'}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    {actionLoading === 'verify' ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                    Confirm Identity Verified
                  </button>
                  <button
                    onClick={() => setShowRefusalForm(true)}
                    disabled={!!actionLoading || showRefusalForm}
                    className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    <XCircle className="h-4 w-4" />
                    Refuse Request
                  </button>
                </div>
                {showRefusalForm && (
                  <div className="mt-4 p-4 border border-red-200 rounded-lg bg-red-50/50 space-y-3">
                    <label className="text-sm font-medium block">Reason for refusal</label>
                    <textarea
                      value={refusalReason}
                      onChange={(e) => setRefusalReason(e.target.value)}
                      placeholder="e.g. Unable to verify identity, insufficient information provided..."
                      className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                      maxLength={1000}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (refusalReason.trim()) handleRefuse(refusalReason.trim())
                        }}
                        disabled={!refusalReason.trim() || actionLoading === 'refuse'}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        {actionLoading === 'refuse' ? <Loader2 className="h-4 w-4 animate-spin" /> : <XCircle className="h-4 w-4" />}
                        Confirm Refusal
                      </button>
                      <button
                        onClick={() => { setShowRefusalForm(false); setRefusalReason('') }}
                        className="px-4 py-2 border border-input rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Not applicable for current status.</p>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        {request.status === 'identity_verified' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Generate Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Identity has been verified. Generate the data access report to fulfill this request.
              </p>
              <button
                onClick={handleGenerate}
                disabled={actionLoading === 'generate'}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {actionLoading === 'generate' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Generate Report
              </button>
            </CardContent>
          </Card>
        )}

        {request.status === 'failed' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Generation Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Report generation failed. You can retry the generation — the request will be reset to verified status.
              </p>
              <button
                onClick={handleRetry}
                disabled={actionLoading === 'retry'}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {actionLoading === 'retry' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                Retry Generation
              </button>
            </CardContent>
          </Card>
        )}

        {['completed', 'partially_refused'].includes(request.status) && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Download Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Report generated on {request.completedAt ? new Date(request.completedAt).toLocaleString() : 'unknown date'}.
                Download link is valid for 15 minutes.
              </p>
              {request.status === 'partially_refused' && request.refusedSections.length > 0 && (
                <div className="mb-4 px-3 py-2 bg-orange-50 rounded-lg text-sm">
                  <p className="font-medium text-orange-700 flex items-center gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Partially refused sections:
                  </p>
                  <ul className="mt-1 list-disc list-inside text-orange-600">
                    {request.refusedSections.map((s, i) => (
                      <li key={i}>{s.section}: {s.reason}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={handleDownload}
                disabled={actionLoading === 'download'}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium disabled:opacity-50"
              >
                {actionLoading === 'download' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Download {request.reportFormat.toUpperCase()} Report
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

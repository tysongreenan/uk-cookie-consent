'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  FileSearch,
  Plus,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Loader2,
  ChevronRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import type { DataAccessRequest, DSARStatus } from '@/types'

const STATUS_CONFIG: Record<DSARStatus, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  identity_verified: { label: 'Verified', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  processing: { label: 'Processing', color: 'bg-purple-100 text-purple-800', icon: Loader2 },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  partially_refused: { label: 'Partial', color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
  refused: { label: 'Refused', color: 'bg-red-100 text-red-800', icon: XCircle },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-800', icon: XCircle },
}

function getDeadlineInfo(deadlineAt: string): { label: string; color: string; daysLeft: number } {
  const now = new Date()
  const deadline = new Date(deadlineAt)
  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (daysLeft < 0) return { label: `${Math.abs(daysLeft)}d overdue`, color: 'text-red-600 font-bold', daysLeft }
  if (daysLeft <= 7) return { label: `${daysLeft}d left`, color: 'text-red-600', daysLeft }
  if (daysLeft <= 15) return { label: `${daysLeft}d left`, color: 'text-yellow-600', daysLeft }
  return { label: `${daysLeft}d left`, color: 'text-green-600', daysLeft }
}

export default function DataRequestsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [requests, setRequests] = useState<DataAccessRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const fetchRequests = useCallback(async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.set('status', statusFilter)
      const res = await fetch(`/api/data-access-requests?${params}`, {
        headers: { 'x-requested-with': 'dashboard' },
      })
      if (res.ok) {
        const json = await res.json()
        setRequests(json.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch requests:', error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Breadcrumbs items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Data Requests' },
        ]} />

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Data Access Requests</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage data subject access requests (Law 25 / GDPR compliance)
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <Plus className="h-4 w-4" />
            New Request
          </button>
        </div>

        {/* Status filter */}
        <div className="flex gap-2 flex-wrap">
          {['', 'pending', 'identity_verified', 'processing', 'completed', 'partially_refused', 'refused', 'failed'].map((status) => (
            <button
              key={status || 'all'}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {status ? STATUS_CONFIG[status as DSARStatus]?.label || status : 'All'}
            </button>
          ))}
        </div>

        {/* Requests table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : requests.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileSearch className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No data requests yet</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  When someone requests access to their personal data, create a request here to track the 30-day deadline and generate their report.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <th className="px-4 py-3">Subject</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Deadline</th>
                      <th className="px-4 py-3">Format</th>
                      <th className="px-4 py-3">Created</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((req, i) => {
                      const statusCfg = STATUS_CONFIG[req.status as DSARStatus]
                      const deadline = getDeadlineInfo(req.deadlineAt)
                      const isTerminal = ['completed', 'partially_refused', 'refused', 'failed'].includes(req.status)

                      return (
                        <motion.tr
                          key={req.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => router.push(`/dashboard/data-requests/${req.id}`)}
                        >
                          <td className="px-4 py-3">
                            <span className="text-sm font-medium">{req.subjectIdentifierValue}</span>
                            {req.subjectEmail && (
                              <span className="text-xs text-muted-foreground block">{req.subjectEmail}</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="text-xs capitalize">{req.subjectIdentifierType}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusCfg?.color || ''}`}>
                              {statusCfg?.label || req.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {!isTerminal ? (
                              <span className={`text-sm font-medium ${deadline.color}`}>{deadline.label}</span>
                            ) : (
                              <span className="text-xs text-muted-foreground">-</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs uppercase text-muted-foreground">{req.reportFormat}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-muted-foreground">
                              {new Date(req.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create Modal */}
        {showCreateModal && (
          <CreateRequestModal
            onClose={() => setShowCreateModal(false)}
            onCreated={() => {
              setShowCreateModal(false)
              fetchRequests()
            }}
          />
        )}
      </div>
    </DashboardLayout>
  )
}

// ── Create Request Modal ──────────────────────────────────────────────

function CreateRequestModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [identifierType, setIdentifierType] = useState<'email' | 'ip' | 'name'>('email')
  const [identifierValue, setIdentifierValue] = useState('')
  const [subjectEmail, setSubjectEmail] = useState('')
  const [reportFormat, setReportFormat] = useState<'json' | 'csv' | 'pdf'>('json')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/data-access-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-requested-with': 'dashboard' },
        body: JSON.stringify({
          subjectIdentifierType: identifierType,
          subjectIdentifierValue: identifierValue,
          subjectEmail: subjectEmail || undefined,
          reportFormat,
        }),
      })

      if (!res.ok) {
        const json = await res.json()
        setError(json.error || 'Failed to create request')
        return
      }

      onCreated()
    } catch {
      setError('Network error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-dsar-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background rounded-xl shadow-xl max-w-md w-full p-6"
      >
        <h2 id="create-dsar-title" className="text-lg font-semibold mb-4">New Data Access Request</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Identifier Type</label>
            <select
              value={identifierType}
              onChange={(e) => setIdentifierType(e.target.value as typeof identifierType)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="email">Email Address</option>
              <option value="ip">IP Address</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">
              {identifierType === 'email' ? 'Email Address' : identifierType === 'ip' ? 'IP Address' : 'Full Name'}
            </label>
            <input
              type={identifierType === 'email' ? 'email' : 'text'}
              value={identifierValue}
              onChange={(e) => setIdentifierValue(e.target.value)}
              placeholder={identifierType === 'email' ? 'user@example.com' : identifierType === 'ip' ? '192.168.1.1' : 'John Doe'}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Contact Email (for delivery)</label>
            <input
              type="email"
              value={subjectEmail}
              onChange={(e) => setSubjectEmail(e.target.value)}
              placeholder="Optional — where to send the report"
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Report Format</label>
            <select
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value as typeof reportFormat)}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-input text-sm font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !identifierValue}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {submitting ? 'Creating...' : 'Create Request'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

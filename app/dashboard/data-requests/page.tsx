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

// ── Create Request Modal (search-first flow) ─────────────────────────

interface SearchResult {
  found: boolean
  totalRecords: number
  sources: {
    banner_visitors: { count: number; banners: string[]; dateRange: { first: string; last: string } | null }
    banner_analytics: { count: number }
  }
  hint: string | null
}

function CreateRequestModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [step, setStep] = useState<'search' | 'create'>('search')
  const [identifierType, setIdentifierType] = useState<'ip' | 'email' | 'name'>('ip')
  const [identifierValue, setIdentifierValue] = useState('')
  const [subjectEmail, setSubjectEmail] = useState('')
  const [reportFormat, setReportFormat] = useState<'json' | 'csv' | 'pdf'>('json')
  const [searching, setSearching] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!identifierValue.trim()) return
    setSearching(true)
    setError('')
    setSearchResult(null)

    try {
      const params = new URLSearchParams({ type: identifierType, value: identifierValue.trim() })
      const res = await fetch(`/api/data-access-requests/search?${params}`, {
        headers: { 'x-requested-with': 'dashboard' },
      })
      if (res.ok) {
        const json = await res.json()
        setSearchResult(json.data)
      } else {
        const json = await res.json()
        setError(json.error || 'Search failed')
      }
    } catch {
      setError('Network error')
    } finally {
      setSearching(false)
    }
  }

  const handleCreate = async () => {
    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/data-access-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-requested-with': 'dashboard' },
        body: JSON.stringify({
          subjectIdentifierType: identifierType,
          subjectIdentifierValue: identifierValue.trim(),
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
        className="bg-background rounded-xl shadow-xl max-w-lg w-full p-6"
      >
        {step === 'search' ? (
          <>
            <h2 id="create-dsar-title" className="text-lg font-semibold mb-1">Find Person in Your Data</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Search your banner data to check if you hold records for this person. Cookie banners collect <strong>IP addresses</strong> — search by IP for best results.
            </p>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-3">
                <div className="w-32">
                  <label className="text-sm font-medium block mb-1">Search by</label>
                  <select
                    value={identifierType}
                    onChange={(e) => { setIdentifierType(e.target.value as typeof identifierType); setSearchResult(null) }}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="ip">IP Address</option>
                    <option value="email">Email</option>
                    <option value="name">Name</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium block mb-1">Value</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={identifierValue}
                      onChange={(e) => { setIdentifierValue(e.target.value); setSearchResult(null) }}
                      placeholder={identifierType === 'ip' ? '192.168.1.1' : identifierType === 'email' ? 'user@example.com' : 'John Doe'}
                      className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm"
                      required
                    />
                    <button
                      type="submit"
                      disabled={searching || !identifierValue.trim()}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
                    >
                      {searching ? 'Searching...' : 'Search'}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* Search results */}
            {searchResult && (
              <div className={`mt-4 p-4 rounded-lg border ${searchResult.found ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                {searchResult.found ? (
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Found {searchResult.totalRecords} record{searchResult.totalRecords !== 1 ? 's' : ''}
                    </p>
                    {searchResult.sources.banner_visitors.count > 0 && (
                      <div className="mt-2 text-xs text-green-700">
                        <p>{searchResult.sources.banner_visitors.count} visitor records across {searchResult.sources.banner_visitors.banners.length} banner{searchResult.sources.banner_visitors.banners.length !== 1 ? 's' : ''}</p>
                        {searchResult.sources.banner_visitors.dateRange && (
                          <p>Date range: {searchResult.sources.banner_visitors.dateRange.first} to {searchResult.sources.banner_visitors.dateRange.last}</p>
                        )}
                        <p className="mt-1">Banners: {searchResult.sources.banner_visitors.banners.join(', ')}</p>
                      </div>
                    )}
                    {searchResult.sources.banner_analytics.count > 0 && (
                      <p className="mt-1 text-xs text-green-700">{searchResult.sources.banner_analytics.count} analytics events</p>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-yellow-800">No records found</p>
                    {searchResult.hint && (
                      <p className="text-xs text-yellow-700 mt-1">{searchResult.hint}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {error && <p className="text-sm text-red-600 mt-3">{error}</p>}

            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-lg border border-input text-sm font-medium hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('create')}
                disabled={!identifierValue.trim()}
                className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
              >
                {searchResult?.found ? 'Create Request' : 'Create Anyway'}
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-1">Create Data Access Request</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Searching for: <strong>{identifierType}</strong> = <strong>{identifierValue}</strong>
              {searchResult && <span className="ml-1">({searchResult.totalRecords} records found)</span>}
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Contact Email (to deliver the report)</label>
                <input
                  type="email"
                  value={subjectEmail}
                  onChange={(e) => setSubjectEmail(e.target.value)}
                  placeholder="person@example.com"
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
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('search')}
                  className="flex-1 px-4 py-2 rounded-lg border border-input text-sm font-medium hover:bg-muted transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleCreate}
                  disabled={submitting}
                  className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
                >
                  {submitting ? 'Creating...' : 'Create Request'}
                </button>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

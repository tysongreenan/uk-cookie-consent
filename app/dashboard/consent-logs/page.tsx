'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileSearch,
  Copy,
  Check,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { canAccessFeatureWithFreeze } from '@/lib/plan-restrictions'
import type { PlanTier } from '@/types'

// ── Types ──────────────────────────────────────────────────────────────

interface ConsentLog {
  id: string
  consent_id: string
  decision: 'accept' | 'reject' | 'custom'
  country: string | null
  page_path: string | null
  categories: Record<string, boolean> | null
  recorded_at: string
  banner_id: string
}

interface Banner {
  id: string
  name: string
}

// ── Decision badge config ──────────────────────────────────────────────

const DECISION_BADGE: Record<string, { label: string; className: string }> = {
  accept: { label: 'Accept', className: 'bg-green-100 text-green-800' },
  reject: { label: 'Reject', className: 'bg-red-100 text-red-800' },
  custom: { label: 'Custom', className: 'bg-blue-100 text-blue-800' },
}

const DECISION_TABS = ['all', 'accept', 'reject', 'custom'] as const

// ── Page ───────────────────────────────────────────────────────────────

export default function ConsentLogsPage() {
  const { data: session, status: sessionStatus } = useSession()

  // Data state
  const [logs, setLogs] = useState<ConsentLog[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [banners, setBanners] = useState<Banner[]>([])

  // Filters
  const [bannerId, setBannerId] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [consentIdSearch, setConsentIdSearch] = useState('')
  const [decision, setDecision] = useState<string>('all')

  // Pagination
  const [page, setPage] = useState(1)
  const limit = 50

  // Copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // ── Plan gate ──────────────────────────────────────────────────────

  const planTier = (session?.user?.planTier || 'free') as PlanTier
  // featureFreezeDate is not on the session, so we pass null here.
  // The server-side API performs the authoritative check with the DB value.
  // This client-side check is a UX gate only.
  const hasAccess = sessionStatus === 'authenticated'
    ? canAccessFeatureWithFreeze(planTier, 'hasConsentLogs', null)
    : true // Don't block while session is loading

  // ── Fetch banners ──────────────────────────────────────────────────

  useEffect(() => {
    async function loadBanners() {
      try {
        const res = await fetch('/api/banners/simple', {
          headers: { 'x-requested-with': 'dashboard' },
        })
        if (res.ok) {
          const json = await res.json()
          setBanners(json.data || json || [])
        }
      } catch {
        // non-fatal
      }
    }
    if (hasAccess) loadBanners()
  }, [hasAccess])

  // ── Fetch consent logs ─────────────────────────────────────────────

  const fetchLogs = useCallback(async () => {
    if (!hasAccess) return
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (bannerId) params.set('bannerId', bannerId)
      if (dateFrom) params.set('dateFrom', dateFrom)
      if (dateTo) params.set('dateTo', dateTo)
      if (consentIdSearch) params.set('consentId', consentIdSearch)
      if (decision && decision !== 'all') params.set('decision', decision)
      params.set('page', String(page))
      params.set('limit', String(limit))

      const res = await fetch(`/api/consent-logs?${params}`, {
        headers: { 'x-requested-with': 'dashboard' },
      })

      if (res.ok) {
        const json = await res.json()
        setLogs(json.data || [])
        setTotal(json.total || 0)
      } else if (res.status === 403) {
        // Plan access denied by server
        setLogs([])
        setTotal(0)
      }
    } catch (error) {
      console.error('Failed to fetch consent logs:', error)
    } finally {
      setLoading(false)
    }
  }, [hasAccess, bannerId, dateFrom, dateTo, consentIdSearch, decision, page])

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      fetchLogs()
    }
  }, [fetchLogs, sessionStatus])

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1)
  }, [bannerId, dateFrom, dateTo, consentIdSearch, decision])

  // ── Copy consent ID ────────────────────────────────────────────────

  function copyConsentId(id: string) {
    navigator.clipboard.writeText(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // ── Pagination helpers ─────────────────────────────────────────────

  const totalPages = Math.ceil(total / limit)

  function getPageNumbers(): (number | 'ellipsis')[] {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | 'ellipsis')[] = [1]
    if (page > 3) pages.push('ellipsis')
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i)
    }
    if (page < totalPages - 2) pages.push('ellipsis')
    if (totalPages > 1) pages.push(totalPages)
    return pages
  }

  // ── Render ─────────────────────────────────────────────────────────

  // Upgrade prompt for users without access
  if (sessionStatus === 'authenticated' && !hasAccess) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
          <Breadcrumbs items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Consent Logs' },
          ]} />
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-primary/10 p-4 mb-4">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Consent Logs requires Pro Annual</h2>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                Individual consent records for proof-of-consent and DSAR compliance are available on the Pro Annual plan. Upgrade to unlock consent logging, audit trails, and more.
              </p>
              <a
                href="/upgrade"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                Upgrade to Pro Annual
              </a>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        <Breadcrumbs items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Consent Logs' },
        ]} />

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Consent Logs</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Individual consent records for proof-of-consent and DSAR compliance
          </p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col gap-4">
              {/* Row 1: Banner selector, date range, consent ID search */}
              <div className="flex flex-wrap items-end gap-3">
                {/* Banner selector */}
                <div className="flex flex-col gap-1 min-w-[180px]">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Filter className="h-3 w-3" />
                    Banner
                  </label>
                  <select
                    value={bannerId}
                    onChange={(e) => setBannerId(e.target.value)}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">All banners</option>
                    {banners.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>

                {/* Date from */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-muted-foreground">From</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>

                {/* Date to */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-muted-foreground">To</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>

                {/* Consent ID search */}
                <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Search className="h-3 w-3" />
                    Consent ID
                  </label>
                  <input
                    type="text"
                    value={consentIdSearch}
                    onChange={(e) => setConsentIdSearch(e.target.value)}
                    placeholder="Search by consent ID..."
                    className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Row 2: Decision filter tabs */}
              <div className="flex gap-2 flex-wrap">
                {DECISION_TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDecision(tab)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      decision === tab
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {tab === 'all' ? 'All' : DECISION_BADGE[tab]?.label || tab}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Shield className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No consent logs yet</h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  Consent records will appear here when visitors interact with your cookie banners. Each interaction is logged with a unique consent ID for proof-of-consent.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <th className="px-4 py-3">Consent ID</th>
                      <th className="px-4 py-3">Decision</th>
                      <th className="px-4 py-3">Country</th>
                      <th className="px-4 py-3">Page Path</th>
                      <th className="px-4 py-3">Timestamp</th>
                      <th className="px-4 py-3">Categories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log, i) => {
                      const badge = DECISION_BADGE[log.decision] || {
                        label: log.decision,
                        className: 'bg-gray-100 text-gray-800',
                      }

                      return (
                        <motion.tr
                          key={log.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="border-b last:border-0 hover:bg-muted/50 transition-colors"
                        >
                          {/* Consent ID — truncated + copy */}
                          <td className="px-4 py-3">
                            <button
                              onClick={() => copyConsentId(log.consent_id)}
                              className="flex items-center gap-1.5 group text-left"
                              title={log.consent_id}
                            >
                              <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                                {log.consent_id.slice(0, 8)}...
                              </span>
                              {copiedId === log.consent_id ? (
                                <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
                              ) : (
                                <Copy className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-muted-foreground shrink-0 transition-colors" />
                              )}
                            </button>
                          </td>

                          {/* Decision badge */}
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${badge.className}`}>
                              {badge.label}
                            </span>
                          </td>

                          {/* Country */}
                          <td className="px-4 py-3">
                            <span className="text-sm text-muted-foreground">
                              {log.country || '-'}
                            </span>
                          </td>

                          {/* Page path */}
                          <td className="px-4 py-3">
                            <span className="text-sm text-muted-foreground max-w-[200px] truncate block" title={log.page_path || ''}>
                              {log.page_path || '-'}
                            </span>
                          </td>

                          {/* Timestamp */}
                          <td className="px-4 py-3">
                            <span className="text-sm text-muted-foreground whitespace-nowrap">
                              {new Date(log.recorded_at).toLocaleString()}
                            </span>
                          </td>

                          {/* Categories */}
                          <td className="px-4 py-3">
                            {log.categories ? (
                              <div className="flex flex-wrap gap-1">
                                {Object.entries(log.categories).map(([cat, enabled]) => (
                                  <Badge
                                    key={cat}
                                    variant="outline"
                                    className={`text-[10px] ${enabled ? 'border-green-300 text-green-700' : 'border-red-300 text-red-600 line-through opacity-60'}`}
                                  >
                                    {cat}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">-</span>
                            )}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total.toLocaleString()} records
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {getPageNumbers().map((num, i) =>
                num === 'ellipsis' ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground text-sm">...</span>
                ) : (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`min-w-[32px] h-8 rounded-lg text-sm font-medium transition-colors ${
                      page === num
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    {num}
                  </button>
                )
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg hover:bg-muted disabled:opacity-30 disabled:pointer-events-none transition-colors"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

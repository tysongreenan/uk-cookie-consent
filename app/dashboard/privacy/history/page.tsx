'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, ChevronDown, History, FileText } from 'lucide-react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'

interface ConsentEntry {
  id: number
  domain: string
  action: string
  categories_applied: Record<string, boolean> | null
  created_at: string
}

const ACTION_BADGES: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  auto_reject: { label: 'Rejected', variant: 'destructive' },
  auto_accept: { label: 'Accepted', variant: 'default' },
  auto_custom: { label: 'Custom', variant: 'secondary' },
  manual: { label: 'Manual', variant: 'outline' },
  skipped: { label: 'Skipped', variant: 'outline' },
}

function relativeTime(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default function HistoryPage() {
  const { data: session } = useSession()
  const [items, setItems] = useState<ConsentEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [domainFilter, setDomainFilter] = useState('')
  const [actionFilter, setActionFilter] = useState('all')
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)

  const fetchHistory = useCallback(async (cursor?: string, append = false) => {
    if (!append) setLoading(true)
    else setLoadingMore(true)

    try {
      const params = new URLSearchParams({ limit: '50' })
      if (cursor) params.set('cursor', cursor)
      if (domainFilter) params.set('domain', domainFilter)
      if (actionFilter !== 'all') params.set('action', actionFilter)

      const res = await fetch(`/api/consumer/history?${params}`)
      if (res.ok) {
        const data = await res.json()
        setItems(prev => append ? [...prev, ...data.items] : data.items)
        setNextCursor(data.nextCursor)
        setHasMore(data.hasMore)
      }
    } catch (error) {
      console.error('Error fetching history:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [domainFilter, actionFilter])

  useEffect(() => {
    if (!session?.user?.id) return
    fetchHistory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, actionFilter])

  // Debounced domain search
  function handleDomainSearch(value: string) {
    setDomainFilter(value)
    if (searchTimeout) clearTimeout(searchTimeout)
    const timeout = setTimeout(() => {
      fetchHistory()
    }, 400)
    setSearchTimeout(timeout)
  }

  function loadMore() {
    if (nextCursor) fetchHistory(nextCursor, true)
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="relative mx-auto h-10 w-10">
            <div className="absolute inset-0 rounded-full border-2 border-muted" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <Breadcrumbs items={[{ label: 'My Privacy' }, { label: 'History' }]} />

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Consent History</h1>
          <p className="text-muted-foreground text-sm mt-1">Every cookie banner the extension has handled for you.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative max-w-xs flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search domains..."
              value={domainFilter}
              onChange={(e) => handleDomainSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={actionFilter} onValueChange={(v) => setActionFilter(v)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="auto_reject">Rejected</SelectItem>
              <SelectItem value="auto_accept">Accepted</SelectItem>
              <SelectItem value="auto_custom">Custom</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {items.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Domain</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4">Action</th>
                      <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4 hidden md:table-cell">Categories</th>
                      <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-3 px-4 hidden sm:table-cell">When</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((entry) => {
                      const badge = ACTION_BADGES[entry.action] || { label: entry.action, variant: 'outline' as const }
                      const categories = entry.categories_applied
                        ? Object.entries(entry.categories_applied).filter(([, v]) => v).map(([k]) => k).join(', ')
                        : ''
                      return (
                        <tr key={entry.id} className="border-b border-border/50 last:border-b-0 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={`https://www.google.com/s2/favicons?domain=${entry.domain}&sz=32`}
                                alt=""
                                className="h-4 w-4 rounded-sm flex-shrink-0"
                                loading="lazy"
                              />
                              <span className="text-sm font-mono text-foreground truncate max-w-[250px]">{entry.domain}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={badge.variant} className="text-xs">{badge.label}</Badge>
                          </td>
                          <td className="py-3 px-4 hidden md:table-cell">
                            <span className="text-xs text-muted-foreground">{categories || '—'}</span>
                          </td>
                          <td className="py-3 px-4 text-right hidden sm:table-cell">
                            <span className="text-xs text-muted-foreground" title={new Date(entry.created_at).toLocaleString()}>
                              {relativeTime(entry.created_at)}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <History className="h-10 w-10 mb-3 opacity-30" />
                <p className="text-sm font-medium">No consent history yet</p>
                <p className="text-xs mt-1">Install the extension and browse the web to start building your history.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Load more */}
        {hasMore && (
          <Button
            variant="outline"
            onClick={loadMore}
            disabled={loadingMore}
            className="w-full"
          >
            {loadingMore ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current" />
                Loading...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <ChevronDown className="h-4 w-4" />
                Load more
              </span>
            )}
          </Button>
        )}
      </div>
    </DashboardLayout>
  )
}

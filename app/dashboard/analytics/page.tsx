'use client'

import { useEffect, useState, useMemo, useCallback, lazy, Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from 'recharts'
import {
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  ChevronRight,
  BarChart3,
  Lightbulb,
  AlertTriangle,
  ArrowUpRight,
  ArrowLeft,
  X,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  FileText,
  Users,
  Trophy,
  Lock,
  HelpCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { UpgradePrompt } from '@/components/dashboard/upgrade-prompt'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface BannerStats {
  id: string
  user_id: string
  banner_id: string | null
  date: string
  accepts: number
  rejects: number
  dismisses: number
  impressions: number
  total_decision_time_ms: number
  decision_count: number
  returning_visitor_impressions: number
}

interface BannerOption {
  id: string
  name: string
}

interface AnalyticsSummary {
  impressions: number
  accepts: number
  rejects: number
  dismisses: number
  acceptRate: string
  rejectRate: string
  dismissRate: string
  avgDecisionTime: string
  totalDecisionTime: number
  decisionCount: number
}

interface DimensionData {
  value: string
  impressions: number
  accepts: number
  rejects: number
  dismisses: number
}

interface BenchmarkData {
  platform: {
    totalUsers: number
    avgAcceptRate: number
    avgRejectRate: number
    avgDismissRate: number
    avgDecisionTimeMs: number | null
  } | null
  user: {
    acceptRate: number
    rejectRate: number
    dismissRate: number
    avgDecisionTimeMs: number | null
  }
  insights: { metric: string; direction: 'above' | 'below'; diff: number }[]
}

// Brand-aligned chart colors — light/dark pairs
const CHART_COLORS_LIGHT = {
  accept: '#0E768C',     // brand teal
  reject: '#d97757',     // brand orange accent
  dismiss: '#b0aea5',    // brand mid gray
  primary: '#0E768C',
  secondary: '#6a9bcc',  // brand blue accent
  tertiary: '#788c5d',   // brand green accent
}
const CHART_COLORS_DARK = {
  accept: '#3AAFCA',
  reject: '#E89A82',
  dismiss: '#c4c2ba',
  primary: '#3AAFCA',
  secondary: '#8DB8E0',
  tertiary: '#9BB377',
}

function useChartColors() {
  const [isDark, setIsDark] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    // Also check for the class-based dark mode
    const check = () => setIsDark(mq.matches || document.documentElement.classList.contains('dark'))
    check()
    mq.addEventListener('change', check)
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => { mq.removeEventListener('change', check); observer.disconnect() }
  }, [])
  return isDark ? CHART_COLORS_DARK : CHART_COLORS_LIGHT
}

// Static fallback for non-hook contexts
const CHART_COLORS = CHART_COLORS_LIGHT

// Custom tooltip component for polished chart tooltips
function ChartTooltip({ active, payload, label, formatter }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-card px-3.5 py-2.5 shadow-lg">
      {label && (
        <p className="mb-1.5 text-xs font-medium text-muted-foreground">
          {typeof label === 'string' && label.includes('-')
            ? new Date(label).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
            : label}
        </p>
      )}
      {payload.map((entry: any, i: number) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry.color || entry.fill }}
          />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-semibold text-foreground">
            {formatter ? formatter(entry.value, entry.name) : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<BannerStats[]>([])
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [banners, setBanners] = useState<BannerOption[]>([])
  const [selectedBanner, setSelectedBanner] = useState<string>('all')
  const [dimensions, setDimensions] = useState<Record<string, DimensionData[]>>({})
  const [dimensionsLoading, setDimensionsLoading] = useState(false)
  const [benchmarks, setBenchmarks] = useState<BenchmarkData | null>(null)
  const [benchmarksLoading, setBenchmarksLoading] = useState(false)
  const chartColors = useChartColors()

  useEffect(() => {
    if (session) {
      fetchAnalyticsData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, selectedBanner])

  // Compute per-banner comparison data from raw stats
  const bannerComparisonData = useMemo(() => {
    if (selectedBanner !== 'all' || banners.length === 0) return []

    const bannerMap = new Map<string, { impressions: number; accepts: number; rejects: number; dismisses: number; totalDecisionTime: number; decisionCount: number }>()

    for (const row of stats) {
      const bid = row.banner_id || 'unknown'
      const existing = bannerMap.get(bid) || { impressions: 0, accepts: 0, rejects: 0, dismisses: 0, totalDecisionTime: 0, decisionCount: 0 }
      existing.impressions += row.impressions
      existing.accepts += row.accepts
      existing.rejects += row.rejects
      existing.dismisses += row.dismisses
      existing.totalDecisionTime += row.total_decision_time_ms
      existing.decisionCount += row.decision_count
      bannerMap.set(bid, existing)
    }

    const bannerNameMap = new Map(banners.map(b => [b.id, b.name]))

    return Array.from(bannerMap.entries())
      .map(([bid, data]) => {
        const name = bannerNameMap.get(bid) || 'Pre-tracking data'
        const hasImpressions = data.impressions > 0
        return {
          id: bid,
          name,
          impressions: data.impressions,
          acceptRate: hasImpressions ? parseFloat((data.accepts / data.impressions * 100).toFixed(1)) : 0,
          rejectRate: hasImpressions ? parseFloat((data.rejects / data.impressions * 100).toFixed(1)) : 0,
          dismissRate: hasImpressions ? parseFloat((data.dismisses / data.impressions * 100).toFixed(1)) : 0,
          avgDecisionTime: data.decisionCount > 0 ? parseFloat((data.totalDecisionTime / data.decisionCount / 1000).toFixed(1)) : 0,
        }
      })
      .sort((a, b) => b.impressions - a.impressions)
  }, [stats, banners, selectedBanner])

  // Prepare area chart data by aggregating per-date across banners when "all"
  const chartData = useMemo(() => {
    if (selectedBanner !== 'all') return stats

    const dateMap = new Map<string, { date: string; accepts: number; rejects: number; dismisses: number; impressions: number }>()
    for (const row of stats) {
      const existing = dateMap.get(row.date) || { date: row.date, accepts: 0, rejects: 0, dismisses: 0, impressions: 0 }
      existing.accepts += row.accepts
      existing.rejects += row.rejects
      existing.dismisses += row.dismisses
      existing.impressions += row.impressions
      dateMap.set(row.date, existing)
    }
    return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date))
  }, [stats, selectedBanner])

  // Determine which banners have had impressions in the last 7 days
  const bannerActivity = useMemo(() => {
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 7)
    const cutoffStr = cutoff.toISOString().split('T')[0]
    const activeSet = new Set<string>()
    for (const row of stats) {
      if (row.date >= cutoffStr && row.impressions > 0 && row.banner_id) {
        activeSet.add(row.banner_id)
      }
    }
    return activeSet
  }, [stats])

  // Resolve selected banner name for the detail back bar
  const selectedBannerName = useMemo(() => {
    if (selectedBanner === 'all') return ''
    return banners.find(b => b.id === selectedBanner)?.name || 'Banner'
  }, [selectedBanner, banners])

  async function fetchAnalyticsData() {
    if (!session?.user?.id) return

    try {
      const params = selectedBanner !== 'all' ? `?bannerId=${selectedBanner}` : ''
      const res = await fetch(`/api/analytics${params}`)
      if (!res.ok) throw new Error('Failed to fetch analytics')

      const data = await res.json()

      const isEnabled = data.analyticsEnabled || false
      setAnalyticsEnabled(isEnabled)

      if (data.banners) {
        setBanners(data.banners)
      }

      if (data.stats) {
        setStats(data.stats)
        calculateSummary(data.stats)
      } else {
        setStats([])
        setSummary(null)
      }

      // Lazy-load dimensions and benchmarks for pro users
      if (isEnabled) {
        fetchDimensions()
        fetchBenchmarks()
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchDimensions() {
    if (!session?.user?.id) return
    setDimensionsLoading(true)
    try {
      const dims = ['source', 'device', 'country', 'page_path']
      const bannerParam = selectedBanner !== 'all' ? `&bannerId=${selectedBanner}` : ''
      const results = await Promise.all(
        dims.map(d => fetch(`/api/analytics/dimensions?dimension=${d}${bannerParam}`).then(r => r.json()))
      )
      const map: Record<string, DimensionData[]> = {}
      dims.forEach((d, i) => { map[d] = results[i].data || [] })
      setDimensions(map)
    } catch (error) {
      console.error('Error fetching dimensions:', error)
    } finally {
      setDimensionsLoading(false)
    }
  }

  async function fetchBenchmarks() {
    if (!session?.user?.id) return
    setBenchmarksLoading(true)
    try {
      const res = await fetch('/api/analytics/benchmarks')
      if (res.ok) {
        const data = await res.json()
        setBenchmarks(data)
      }
    } catch (error) {
      console.error('Error fetching benchmarks:', error)
    } finally {
      setBenchmarksLoading(false)
    }
  }

  function calculateSummary(data: BannerStats[]) {
    const totals = data.reduce((acc, day) => ({
      impressions: acc.impressions + day.impressions,
      accepts: acc.accepts + day.accepts,
      rejects: acc.rejects + day.rejects,
      dismisses: acc.dismisses + day.dismisses,
      totalDecisionTime: acc.totalDecisionTime + day.total_decision_time_ms,
      decisionCount: acc.decisionCount + day.decision_count
    }), { impressions: 0, accepts: 0, rejects: 0, dismisses: 0, totalDecisionTime: 0, decisionCount: 0 })

    const acceptRate = totals.impressions > 0 ? (totals.accepts / totals.impressions * 100).toFixed(1) : '0'
    const rejectRate = totals.impressions > 0 ? (totals.rejects / totals.impressions * 100).toFixed(1) : '0'
    const dismissRate = totals.impressions > 0 ? (totals.dismisses / totals.impressions * 100).toFixed(1) : '0'
    const avgDecisionTime = totals.decisionCount > 0 ? (totals.totalDecisionTime / totals.decisionCount / 1000).toFixed(1) : '0'

    setSummary({
      ...totals,
      acceptRate,
      rejectRate,
      dismissRate,
      avgDecisionTime
    })
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-3">
            <div className="relative mx-auto h-10 w-10">
              <div className="absolute inset-0 rounded-full border-2 border-muted" />
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <TooltipProvider delayDuration={200}>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Cookie Banner' },
          { label: 'Analytics' }
        ]} />

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold tracking-tight">Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Banner performance and visitor consent patterns
            </p>
          </div>
          {analyticsEnabled && (
            <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
              Pro
            </Badge>
          )}
        </div>

        {!analyticsEnabled ? (
          <UpgradePrompt
            feature="Analytics Dashboard"
            description="Upgrade to Pro to track impressions, acceptance rates, decision time, and traffic estimation with detailed analytics."
            variant="banner"
          />
        ) : (
          <>
            {/* Detail Back Bar — shown when drilling into a single banner */}
            <AnimatePresence mode="wait">
              {selectedBanner !== 'all' && (
                <motion.div
                  key="detail-bar"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-2.5">
                    <button
                      onClick={() => setSelectedBanner('all')}
                      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      All Banners
                    </button>
                    <span className="text-border">/</span>
                    <span className="text-sm font-semibold text-foreground">{selectedBannerName}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Impressions"
                value={summary?.impressions.toLocaleString() || '0'}
                icon={<Eye className="h-5 w-5" />}
                color="teal"
                tooltip="The number of times your cookie banner was shown to visitors. Each page load where the banner appears counts as one impression."
              />
              <StatCard
                title="Accept Rate"
                value={`${summary?.acceptRate || 0}%`}
                subtitle={`${summary?.accepts.toLocaleString() || 0} accepts`}
                icon={<CheckCircle className="h-5 w-5" />}
                color="green"
                tooltip="Percentage of visitors who clicked 'Accept'. Calculated as accepts divided by total impressions."
              />
              <StatCard
                title="Reject Rate"
                value={`${summary?.rejectRate || 0}%`}
                subtitle={`${summary?.rejects.toLocaleString() || 0} rejects`}
                icon={<XCircle className="h-5 w-5" />}
                color="orange"
                tooltip="Percentage of visitors who clicked 'Reject'. These visitors are invisible to analytics tools like Google Analytics."
              />
              <StatCard
                title="Avg Decision Time"
                value={`${summary?.avgDecisionTime || 0}s`}
                icon={<Clock className="h-5 w-5" />}
                color="blue"
                tooltip="Average time in seconds between the banner appearing and the visitor making a choice. Lower times usually mean clearer banner copy."
              />
            </div>

            {/* Banner Hub Table — shown when viewing all banners */}
            <AnimatePresence mode="wait">
              {selectedBanner === 'all' && banners.length > 0 && (
                <motion.div
                  key="hub-table"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                          <BarChart3 className="h-4.5 w-4.5 text-primary" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div>
                            <CardTitle className="text-base">Your Banners</CardTitle>
                            <CardDescription className="text-xs">Click a banner to view detailed analytics</CardDescription>
                          </div>
                          <InfoTooltip text="Overview of all your banners. Click any row to drill into that banner's detailed analytics, including visitor dimensions and page-level data." />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-0 pt-0 pb-0">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[580px]">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-2.5 px-4">Banner</th>
                              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-2.5 px-4">Impressions</th>
                              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-2.5 px-4 hidden sm:table-cell">Accept Rate</th>
                              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-2.5 px-4 hidden sm:table-cell">Reject Rate</th>
                              <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider py-2.5 px-4 hidden md:table-cell">Decision Time</th>
                              <th className="w-8 px-2"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {bannerComparisonData.map((row) => {
                              const isActive = bannerActivity.has(row.id)
                              return (
                                <tr
                                  key={row.id}
                                  onClick={() => setSelectedBanner(row.id)}
                                  className="border-b border-border/50 last:border-b-0 cursor-pointer transition-colors hover:bg-muted/50 group"
                                >
                                  <td className="py-3.5 px-4">
                                    <div className="flex items-center gap-2.5">
                                      <span className={`inline-block h-2 w-2 rounded-full shrink-0 ${isActive ? 'bg-emerald-500' : 'bg-muted-foreground/30'}`} />
                                      <span className="text-sm font-medium text-foreground truncate max-w-[200px]">{row.name}</span>
                                    </div>
                                  </td>
                                  <td className="py-3.5 px-4 text-right">
                                    <span className="text-sm font-semibold tabular-nums text-foreground">{row.impressions.toLocaleString()}</span>
                                  </td>
                                  <td className="py-3.5 px-4 text-right hidden sm:table-cell">
                                    <div className="inline-flex flex-col items-end gap-1">
                                      <span className="text-sm font-semibold tabular-nums text-foreground">{row.acceptRate}%</span>
                                      <div className="h-0.5 w-16 rounded-full bg-border/50">
                                        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(row.acceptRate, 100)}%`, backgroundColor: chartColors.accept }} />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3.5 px-4 text-right hidden sm:table-cell">
                                    <div className="inline-flex flex-col items-end gap-1">
                                      <span className="text-sm font-semibold tabular-nums text-foreground">{row.rejectRate}%</span>
                                      <div className="h-0.5 w-16 rounded-full bg-border/50">
                                        <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(row.rejectRate, 100)}%`, backgroundColor: chartColors.reject }} />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3.5 px-4 text-right hidden md:table-cell">
                                    <span className="text-sm font-semibold tabular-nums text-foreground">{row.avgDecisionTime}s</span>
                                  </td>
                                  <td className="px-2">
                                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                                  </td>
                                </tr>
                              )
                            })}
                            {/* Show banners with no stats yet */}
                            {banners.filter(b => !bannerComparisonData.some(r => r.id === b.id)).map((b) => (
                              <tr
                                key={b.id}
                                onClick={() => setSelectedBanner(b.id)}
                                className="border-b border-border/50 last:border-b-0 cursor-pointer transition-colors hover:bg-muted/50 group"
                              >
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-2.5">
                                    <span className="inline-block h-2 w-2 rounded-full shrink-0 bg-muted-foreground/30" />
                                    <span className="text-sm font-medium text-foreground truncate max-w-[200px]">{b.name}</span>
                                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">No data</Badge>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4 text-right text-sm text-muted-foreground">—</td>
                                <td className="py-3.5 px-4 text-right hidden sm:table-cell text-sm text-muted-foreground">—</td>
                                <td className="py-3.5 px-4 text-right hidden sm:table-cell text-sm text-muted-foreground">—</td>
                                <td className="py-3.5 px-4 text-right hidden md:table-cell text-sm text-muted-foreground">—</td>
                                <td className="px-2">
                                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Daily Trends -- takes 2 columns */}
              <Card className="lg:col-span-2 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUp className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <CardTitle className="text-base">30-Day Trends</CardTitle>
                        <CardDescription className="text-xs">Daily consent decisions over time</CardDescription>
                      </div>
                      <InfoTooltip text="Shows the daily count of accepts, rejects, and dismisses over the last 30 days. Look for trends after changing your banner design or copy." />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  {chartData.length > 0 ? (
                    <div role="img" aria-label="Area chart showing daily accepts, rejects, and dismisses over the last 30 days">
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                        <defs>
                          <linearGradient id="gradAccept" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={chartColors.accept} stopOpacity={0.15} />
                            <stop offset="100%" stopColor={chartColors.accept} stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradReject" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={chartColors.reject} stopOpacity={0.1} />
                            <stop offset="100%" stopColor={chartColors.reject} stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradDismiss" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={chartColors.dismiss} stopOpacity={0.08} />
                            <stop offset="100%" stopColor={chartColors.dismiss} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                          strokeOpacity={0.6}
                          vertical={false}
                        />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(date) => new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                          dy={8}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <RechartsTooltip content={<ChartTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="accepts"
                          stroke={chartColors.accept}
                          strokeWidth={2}
                          fill="url(#gradAccept)"
                          name="Accepts"
                          dot={false}
                          activeDot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="rejects"
                          stroke={chartColors.reject}
                          strokeWidth={2}
                          fill="url(#gradReject)"
                          name="Rejects"
                          dot={false}
                          activeDot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="dismisses"
                          stroke={chartColors.dismiss}
                          strokeWidth={2}
                          fill="url(#gradDismiss)"
                          name="Dismisses"
                          dot={false}
                          activeDot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                    </div>
                  ) : (
                    <EmptyChartState
                      icon={<TrendingUp className="h-8 w-8" />}
                      message="Trends will appear once your banner starts receiving traffic."
                    />
                  )}
                  {/* Inline legend */}
                  {chartData.length > 0 && (
                    <div className="flex items-center justify-center gap-5 mt-3 pt-3 border-t border-border/50">
                      <LegendItem color={chartColors.accept} label="Accepts" />
                      <LegendItem color={chartColors.reject} label="Rejects" />
                      <LegendItem color={chartColors.dismiss} label="Dismisses" />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Consent Distribution -- donut chart */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <Eye className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <CardTitle className="text-base">Consent Split</CardTitle>
                        <CardDescription className="text-xs">Overall distribution</CardDescription>
                      </div>
                      <InfoTooltip text="The overall breakdown of how visitors respond to your banner. Accepts + rejects + dismisses may not equal 100% since some visitors leave without interacting." />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  {summary && summary.impressions > 0 ? (
                    <>
                      <div role="img" aria-label="Donut chart showing the split between accepts, rejects, and dismisses">
                      <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Accepts', value: summary.accepts },
                              { name: 'Rejects', value: summary.rejects },
                              { name: 'Dismisses', value: summary.dismisses }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={3}
                            dataKey="value"
                            strokeWidth={0}
                          >
                            <Cell fill={chartColors.accept} />
                            <Cell fill={chartColors.reject} />
                            <Cell fill={chartColors.dismiss} />
                          </Pie>
                          <RechartsTooltip
                            content={
                              <ChartTooltip
                                formatter={(value: number, name: string) => {
                                  const total = summary.impressions
                                  const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0'
                                  return `${value.toLocaleString()} (${pct}%)`
                                }}
                              />
                            }
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      </div>
                      {/* Legend below donut */}
                      <div className="flex flex-col gap-2.5 mt-1">
                        <DonutLegendRow
                          color={chartColors.accept}
                          label="Accepts"
                          value={summary.accepts}
                          pct={summary.acceptRate}
                        />
                        <DonutLegendRow
                          color={chartColors.reject}
                          label="Rejects"
                          value={summary.rejects}
                          pct={summary.rejectRate}
                        />
                        <DonutLegendRow
                          color={chartColors.dismiss}
                          label="Dismisses"
                          value={summary.dismisses}
                          pct={summary.dismissRate}
                        />
                      </div>
                    </>
                  ) : (
                    <EmptyChartState
                      icon={<Eye className="h-8 w-8" />}
                      message="Distribution will appear after users interact with your banner."
                    />
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Visitor Insights — 2x2 dimension grid */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6a9bcc]/10">
                  <Globe className="h-4.5 w-4.5 text-[#6a9bcc]" />
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <h2 className="text-base font-semibold">Visitor Insights</h2>
                    <p className="text-xs text-muted-foreground">Where your visitors come from and how they interact</p>
                  </div>
                  <InfoTooltip text="Breaks down your consent data by traffic source, device type, country, and page. Collected automatically from each visitor's browser — no cookies or third-party services required." />
                </div>
              </div>
              {dimensionsLoading ? (
                <div className="flex items-center justify-center h-[200px]">
                  <div className="relative h-8 w-8">
                    <div className="absolute inset-0 rounded-full border-2 border-muted" />
                    <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Traffic Sources */}
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-1.5">Traffic Sources <InfoTooltip text="Detected from UTM parameters or the referring website. 'Direct' means no referrer was detected (typed URL, bookmarks, or apps)." /></CardTitle>
                      <CardDescription className="text-xs">Where visitors find your site</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      {(dimensions.source?.length ?? 0) > 0 ? (
                        <ResponsiveContainer width="100%" height={220}>
                          <BarChart data={dimensions.source?.slice(0, 8)} layout="vertical" margin={{ left: 4, right: 16, top: 4, bottom: 4 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" strokeOpacity={0.6} />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                            <YAxis type="category" dataKey="value" width={80} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }} />
                            <RechartsTooltip content={<ChartTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} />
                            <Bar dataKey="impressions" fill={chartColors.primary} radius={[0, 6, 6, 0]} maxBarSize={24} name="Impressions" />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <EmptyChartState icon={<Globe className="h-8 w-8" />} message="Source data will appear as visitors interact with your banner." />
                      )}
                    </CardContent>
                  </Card>

                  {/* Device Breakdown */}
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-1.5">Device Breakdown <InfoTooltip text="Based on screen width: mobile (under 768px), tablet (768-1023px), desktop (1024px+). Helps you optimise banner layout for your most common devices." /></CardTitle>
                      <CardDescription className="text-xs">Desktop, mobile, and tablet split</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      {(dimensions.device?.length ?? 0) > 0 ? (
                        <>
                          <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                              <Pie
                                data={dimensions.device?.map(d => ({ name: d.value, value: d.impressions }))}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={70}
                                paddingAngle={3}
                                dataKey="value"
                                strokeWidth={0}
                              >
                                <Cell fill={chartColors.primary} />
                                <Cell fill={chartColors.reject} />
                                <Cell fill={chartColors.dismiss} />
                              </Pie>
                              <RechartsTooltip content={<ChartTooltip />} />
                            </PieChart>
                          </ResponsiveContainer>
                          <div className="flex flex-col gap-2 mt-1">
                            {dimensions.device?.map((d, i) => {
                              const colors = [chartColors.primary, chartColors.reject, chartColors.dismiss]
                              const icons: Record<string, React.ReactNode> = {
                                desktop: <Monitor className="h-3.5 w-3.5" />,
                                mobile: <Smartphone className="h-3.5 w-3.5" />,
                                tablet: <Tablet className="h-3.5 w-3.5" />,
                              }
                              return (
                                <div key={d.value} className="flex items-center justify-between text-sm">
                                  <div className="flex items-center gap-2">
                                    <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: colors[i] || chartColors.dismiss }} />
                                    <span className="flex items-center gap-1.5 text-muted-foreground">
                                      {icons[d.value] || null}
                                      {d.value}
                                    </span>
                                  </div>
                                  <span className="font-medium tabular-nums">{d.impressions.toLocaleString()}</span>
                                </div>
                              )
                            })}
                          </div>
                        </>
                      ) : (
                        <EmptyChartState icon={<Monitor className="h-8 w-8" />} message="Device data will appear as visitors interact with your banner." />
                      )}
                    </CardContent>
                  </Card>

                  {/* Top Countries */}
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-1.5">Top Countries <InfoTooltip text="Approximated from the visitor's browser language setting (e.g. en-GB = GB). This is privacy-friendly but not exact — a visitor with en-US set while abroad will show as US." /></CardTitle>
                      <CardDescription className="text-xs">Approximate location by browser language</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      {(dimensions.country?.length ?? 0) > 0 ? (
                        <ResponsiveContainer width="100%" height={220}>
                          <BarChart data={dimensions.country?.slice(0, 8)} layout="vertical" margin={{ left: 4, right: 16, top: 4, bottom: 4 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" strokeOpacity={0.6} />
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                            <YAxis type="category" dataKey="value" width={60} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }} />
                            <RechartsTooltip content={<ChartTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} />
                            <Bar dataKey="impressions" fill={chartColors.tertiary} radius={[0, 6, 6, 0]} maxBarSize={24} name="Impressions" />
                          </BarChart>
                        </ResponsiveContainer>
                      ) : (
                        <EmptyChartState icon={<Globe className="h-8 w-8" />} message="Country data will appear as visitors interact with your banner." />
                      )}
                    </CardContent>
                  </Card>

                  {/* Top Pages */}
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-1.5">Top Pages <InfoTooltip text="The pages where visitors see and interact with your banner most. The accept rate per page can help you identify which pages might need different banner copy or positioning." /></CardTitle>
                      <CardDescription className="text-xs">Pages with the most consent interactions</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      {(dimensions.page_path?.length ?? 0) > 0 ? (
                        <div className="space-y-2.5">
                          {dimensions.page_path?.slice(0, 8).map((d, i) => {
                            const maxImp = dimensions.page_path?.[0]?.impressions || 1
                            const pct = Math.round((d.impressions / maxImp) * 100)
                            const acceptRate = d.impressions > 0 ? ((d.accepts / d.impressions) * 100).toFixed(1) : '0'
                            return (
                              <div key={d.value} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="flex-1 min-w-0 truncate text-foreground font-mono text-xs">{d.value}</span>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="tabular-nums">{d.impressions.toLocaleString()} views</span>
                                    <span className="tabular-nums text-[#788c5d]">{acceptRate}% accept</span>
                                  </div>
                                </div>
                                <div className="h-1.5 w-full rounded-full bg-muted">
                                  <div
                                    className="h-full rounded-full bg-primary/60 transition-all"
                                    style={{ width: `${pct}%` }}
                                  />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <EmptyChartState icon={<FileText className="h-8 w-8" />} message="Page data will appear as visitors interact with your banner." />
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Platform Benchmarks */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#788c5d]/10">
                    <Trophy className="h-4.5 w-4.5 text-[#788c5d]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <CardTitle className="text-base">Platform Benchmarks</CardTitle>
                      <CardDescription className="text-xs">How you compare to other sites on the platform</CardDescription>
                    </div>
                    <InfoTooltip text="Compares your banner's performance against anonymized averages from all sites on the platform. Requires at least 5 active sites for privacy. No individual site data is ever shared." />
                  </div>
                  <Badge className="ml-auto bg-primary/10 text-primary border-primary/20 text-xs">Pro</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {benchmarksLoading ? (
                  <div className="flex items-center justify-center h-[120px]">
                    <div className="relative h-8 w-8">
                      <div className="absolute inset-0 rounded-full border-2 border-muted" />
                      <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
                    </div>
                  </div>
                ) : benchmarks?.platform ? (
                  <div className="space-y-5">
                    {/* Metric comparison grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <BenchmarkMetric
                        label="Accept Rate"
                        yours={`${benchmarks.user.acceptRate}%`}
                        platform={`${benchmarks.platform.avgAcceptRate}%`}
                        better={benchmarks.user.acceptRate >= benchmarks.platform.avgAcceptRate}
                        tooltip="Higher is better. A higher accept rate means more visitors are opting in to cookies, giving your analytics tools better data coverage."
                      />
                      <BenchmarkMetric
                        label="Reject Rate"
                        yours={`${benchmarks.user.rejectRate}%`}
                        platform={`${benchmarks.platform.avgRejectRate}%`}
                        better={benchmarks.user.rejectRate <= benchmarks.platform.avgRejectRate}
                        tooltip="Lower is better. Visitors who reject cookies become invisible to analytics tools like Google Analytics."
                      />
                      <BenchmarkMetric
                        label="Dismiss Rate"
                        yours={`${benchmarks.user.dismissRate}%`}
                        platform={`${benchmarks.platform.avgDismissRate}%`}
                        better={benchmarks.user.dismissRate <= benchmarks.platform.avgDismissRate}
                        tooltip="Lower is better. A dismiss means the visitor closed the banner without making a clear choice. High dismiss rates may indicate confusing banner copy."
                      />
                      <BenchmarkMetric
                        label="Decision Time"
                        yours={benchmarks.user.avgDecisionTimeMs != null ? `${(benchmarks.user.avgDecisionTimeMs / 1000).toFixed(1)}s` : 'N/A'}
                        platform={benchmarks.platform.avgDecisionTimeMs != null ? `${(benchmarks.platform.avgDecisionTimeMs / 1000).toFixed(1)}s` : 'N/A'}
                        better={benchmarks.user.avgDecisionTimeMs != null && benchmarks.platform.avgDecisionTimeMs != null ? benchmarks.user.avgDecisionTimeMs <= benchmarks.platform.avgDecisionTimeMs : false}
                        tooltip="Lower is better. The average time visitors take to decide. Faster decisions usually mean your banner copy is clear and your buttons are easy to find."
                      />
                    </div>
                    {/* Insight badges */}
                    {benchmarks.insights.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                        {benchmarks.insights.map((insight, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className={`text-xs font-medium ${
                              (insight.metric === 'accept rate' && insight.direction === 'above') ||
                              (insight.metric !== 'accept rate' && insight.direction === 'below')
                                ? 'bg-[#788c5d]/10 text-[#788c5d] dark:text-[#9BB377] border-[#788c5d]/20'
                                : 'bg-[#d97757]/10 text-[#d97757] dark:text-[#E89A82] border-[#d97757]/20'
                            }`}
                          >
                            Your {insight.metric} is {insight.diff}% {insight.direction} average
                          </Badge>
                        ))}
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Based on anonymized data from {benchmarks.platform.totalUsers} sites over the last 30 days.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[120px]">
                    <div className="text-center max-w-[280px]">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground/40">
                        <Users className="h-6 w-6" />
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Benchmarks require at least 5 active sites on the platform. Check back soon.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Traffic Impact Analysis */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--accent-warm))]/10">
                    <AlertTriangle className="h-4.5 w-4.5 text-[hsl(var(--accent-warm))]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <div>
                      <CardTitle className="text-base">Traffic Impact Analysis</CardTitle>
                      <CardDescription className="text-xs">Understanding your true website traffic</CardDescription>
                    </div>
                    <InfoTooltip text="Visitors who reject cookies are invisible to tools like Google Analytics. This section estimates how much traffic you're actually missing based on your reject rate." />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Missing data column */}
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Missing Analytics Data</h3>
                    {summary && summary.impressions > 0 ? (
                      <>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          Your analytics tools are missing <strong className="text-foreground">{summary.rejects.toLocaleString()} visitors ({summary.rejectRate}%)</strong> who rejected cookies.
                        </p>
                        <div className="rounded-lg bg-[hsl(var(--accent-warm))]/5 border border-[hsl(var(--accent-warm))]/15 p-4">
                          <div className="flex items-start gap-2.5">
                            <ArrowUpRight className="h-4 w-4 text-[hsl(var(--accent-warm))] mt-0.5 flex-shrink-0" />
                            <p className="text-sm leading-relaxed">
                              <span className="font-semibold text-foreground">Estimated real traffic:</span>{' '}
                              <span className="text-muted-foreground">
                                If GA shows 10,000 sessions, your actual traffic is likely{' '}
                                <strong className="text-foreground">
                                  {parseFloat(summary.acceptRate) > 0 ? Math.round(10000 / (parseFloat(summary.acceptRate) / 100)).toLocaleString() : 'N/A'} visitors
                                </strong>.
                              </span>
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Once your banner collects data, we&apos;ll show you how much traffic your analytics tools are missing due to cookie rejections.
                      </p>
                    )}
                  </div>
                  {/* Tips column */}
                  <div>
                    <h3 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5 text-muted-foreground" />
                      Optimisation Tips
                    </h3>
                    <ul className="space-y-2">
                      {[
                        'A/B test different banner copy to improve accept rates',
                        'Try different banner positions (top vs bottom)',
                        'Test different button colours and call-to-action text',
                        'Add a "Learn more" link for transparency',
                      ].map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/40 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
      </TooltipProvider>
    </DashboardLayout>
  )
}

/* -------------------------------------------------------------------
   Sub-components
   ------------------------------------------------------------------- */

function InfoTooltip({ text }: { text: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="inline-flex items-center justify-center min-h-[28px] min-w-[28px] text-muted-foreground/50 hover:text-muted-foreground transition-colors">
          <HelpCircle className="h-3.5 w-3.5" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed">
        {text}
      </TooltipContent>
    </Tooltip>
  )
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = 'teal',
  tooltip,
}: {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  color?: 'teal' | 'green' | 'orange' | 'blue'
  tooltip?: string
}) {
  const colorMap = {
    teal: {
      bg: 'bg-[#0E768C]/8 dark:bg-[#0E768C]/15',
      icon: 'text-[#0E768C] dark:text-[#3AAFCA]',
      ring: 'ring-[#0E768C]/10',
    },
    green: {
      bg: 'bg-[#788c5d]/8 dark:bg-[#788c5d]/15',
      icon: 'text-[#788c5d] dark:text-[#9BB377]',
      ring: 'ring-[#788c5d]/10',
    },
    orange: {
      bg: 'bg-[#d97757]/8 dark:bg-[#d97757]/15',
      icon: 'text-[#d97757] dark:text-[#E89A82]',
      ring: 'ring-[#d97757]/10',
    },
    blue: {
      bg: 'bg-[#6a9bcc]/8 dark:bg-[#6a9bcc]/15',
      icon: 'text-[#6a9bcc] dark:text-[#8DB8E0]',
      ring: 'ring-[#6a9bcc]/10',
    },
  }

  const c = colorMap[color]

  return (
    <Card className="relative overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              {title}
              {tooltip && <InfoTooltip text={tooltip} />}
            </p>
            <p className="text-2xl font-bold tracking-tight font-heading">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.bg} ${c.icon} ring-1 ${c.ring}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </div>
  )
}

function DonutLegendRow({ color, label, value, pct }: { color: string; label: string; value: number; pct: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: color }} />
        <span className="text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium tabular-nums">{value.toLocaleString()}</span>
        <span className="text-xs text-muted-foreground tabular-nums w-12 text-right">{pct}%</span>
      </div>
    </div>
  )
}

function EmptyChartState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="flex items-center justify-center h-[220px]">
      <div className="text-center max-w-[240px]">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground/40">
          {icon}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
      </div>
    </div>
  )
}

function BenchmarkMetric({
  label,
  yours,
  platform,
  better,
  tooltip,
}: {
  label: string
  yours: string
  platform: string
  better: boolean
  tooltip?: string
}) {
  return (
    <div className="rounded-lg border border-border p-3.5 space-y-2">
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
        {label}
        {tooltip && <InfoTooltip text={tooltip} />}
      </p>
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-lg font-bold tracking-tight font-heading">{yours}</p>
          <p className="text-[10px] text-muted-foreground">You</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-muted-foreground">{platform}</p>
          <p className="text-[10px] text-muted-foreground">Platform avg</p>
        </div>
      </div>
      <div className={`text-[10px] font-medium ${better ? 'text-[#788c5d]' : 'text-[#d97757]'}`}>
        {better ? 'Above average' : 'Below average'}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
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
  Filter,
  ChevronDown,
  BarChart3,
  Lightbulb,
  AlertTriangle,
  ArrowUpRight,
  X,
} from 'lucide-react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { UpgradePrompt } from '@/components/dashboard/upgrade-prompt'

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

type ComparisonMetric = 'impressions' | 'acceptRate' | 'rejectRate' | 'dismissRate' | 'avgDecisionTime'

const METRIC_OPTIONS: { value: ComparisonMetric; label: string; suffix: string }[] = [
  { value: 'impressions', label: 'Impressions', suffix: '' },
  { value: 'acceptRate', label: 'Accept Rate', suffix: '%' },
  { value: 'rejectRate', label: 'Reject Rate', suffix: '%' },
  { value: 'dismissRate', label: 'Dismiss Rate', suffix: '%' },
  { value: 'avgDecisionTime', label: 'Avg Decision Time', suffix: 's' },
]

// Brand-aligned chart colors that work in both light and dark mode
const CHART_COLORS = {
  accept: '#0E768C',     // brand teal
  reject: '#d97757',     // brand orange accent
  dismiss: '#b0aea5',    // brand mid gray
  primary: '#0E768C',
  secondary: '#6a9bcc',  // brand blue accent
  tertiary: '#788c5d',   // brand green accent
}

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
  const [comparisonMetric, setComparisonMetric] = useState<ComparisonMetric>('impressions')

  useEffect(() => {
    if (session) {
      fetchAnalyticsData()
    }
  }, [session])

  useEffect(() => {
    if (session && analyticsEnabled) {
      fetchAnalyticsData()
    }
  }, [selectedBanner])

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
        const imp = data.impressions || 1 // avoid division by zero
        return {
          name,
          impressions: data.impressions,
          acceptRate: parseFloat((data.accepts / imp * 100).toFixed(1)),
          rejectRate: parseFloat((data.rejects / imp * 100).toFixed(1)),
          dismissRate: parseFloat((data.dismisses / imp * 100).toFixed(1)),
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

  async function fetchAnalyticsData() {
    if (!session?.user?.id) return

    try {
      const params = selectedBanner !== 'all' ? `?bannerId=${selectedBanner}` : ''
      const res = await fetch(`/api/analytics${params}`)
      if (!res.ok) throw new Error('Failed to fetch analytics')

      const data = await res.json()

      setAnalyticsEnabled(data.analyticsEnabled || false)

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
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
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

  const activeMetric = METRIC_OPTIONS.find(m => m.value === comparisonMetric)!

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Cookie Banner' },
          { label: 'Analytics' }
        ]} />

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold tracking-tight">Analytics</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Banner performance and visitor consent patterns
            </p>
          </div>
          <div className="flex items-center gap-3">
            {analyticsEnabled && (
              <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
                Pro
              </Badge>
            )}
            {/* Inline banner filter */}
            {analyticsEnabled && banners.length > 1 && (
              <div className="relative">
                <select
                  id="banner-filter"
                  value={selectedBanner}
                  onChange={(e) => setSelectedBanner(e.target.value)}
                  className="appearance-none rounded-md border border-border bg-card pl-3 pr-8 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="all">All banners</option>
                  {banners.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        {!analyticsEnabled ? (
          <UpgradePrompt
            feature="Analytics Dashboard"
            description="Upgrade to Pro to track impressions, acceptance rates, decision time, and traffic estimation with detailed analytics."
            variant="banner"
          />
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Impressions"
                value={summary?.impressions.toLocaleString() || '0'}
                icon={<Eye className="h-5 w-5" />}
                color="teal"
              />
              <StatCard
                title="Accept Rate"
                value={`${summary?.acceptRate || 0}%`}
                subtitle={`${summary?.accepts.toLocaleString() || 0} accepts`}
                icon={<CheckCircle className="h-5 w-5" />}
                color="green"
              />
              <StatCard
                title="Reject Rate"
                value={`${summary?.rejectRate || 0}%`}
                subtitle={`${summary?.rejects.toLocaleString() || 0} rejects`}
                icon={<XCircle className="h-5 w-5" />}
                color="orange"
              />
              <StatCard
                title="Avg Decision Time"
                value={`${summary?.avgDecisionTime || 0}s`}
                icon={<Clock className="h-5 w-5" />}
                color="blue"
              />
            </div>

            {/* Banner Comparison Chart -- only on "All Banners" with multiple banners */}
            {selectedBanner === 'all' && bannerComparisonData.length > 1 && (
              <Card className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <BarChart3 className="h-4.5 w-4.5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">Banner Comparison</CardTitle>
                        <CardDescription className="text-xs">Performance across your banners</CardDescription>
                      </div>
                    </div>
                    {/* Metric toggle pills */}
                    <div className="flex gap-1 flex-wrap">
                      {METRIC_OPTIONS.map((metric) => (
                        <button
                          key={metric.value}
                          onClick={() => setComparisonMetric(metric.value)}
                          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                            comparisonMetric === metric.value
                              ? 'bg-foreground text-background shadow-sm'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                          }`}
                        >
                          {metric.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ResponsiveContainer width="100%" height={Math.max(180, bannerComparisonData.length * 52)}>
                    <BarChart data={bannerComparisonData} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={false}
                        stroke="hsl(var(--border))"
                        strokeOpacity={0.6}
                      />
                      <XAxis
                        type="number"
                        tickFormatter={(v) => `${v}${activeMetric.suffix}`}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={140}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                      />
                      <RechartsTooltip
                        content={
                          <ChartTooltip
                            formatter={(value: number) => `${value.toLocaleString()}${activeMetric.suffix}`}
                          />
                        }
                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                      />
                      <Bar
                        dataKey={comparisonMetric}
                        fill={CHART_COLORS.primary}
                        radius={[0, 6, 6, 0]}
                        maxBarSize={28}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Daily Trends -- takes 2 columns */}
              <Card className="lg:col-span-2 overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <TrendingUp className="h-4.5 w-4.5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">30-Day Trends</CardTitle>
                      <CardDescription className="text-xs">Daily consent decisions over time</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                        <defs>
                          <linearGradient id="gradAccept" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={CHART_COLORS.accept} stopOpacity={0.15} />
                            <stop offset="100%" stopColor={CHART_COLORS.accept} stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradReject" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={CHART_COLORS.reject} stopOpacity={0.1} />
                            <stop offset="100%" stopColor={CHART_COLORS.reject} stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gradDismiss" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor={CHART_COLORS.dismiss} stopOpacity={0.08} />
                            <stop offset="100%" stopColor={CHART_COLORS.dismiss} stopOpacity={0} />
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
                          stroke={CHART_COLORS.accept}
                          strokeWidth={2}
                          fill="url(#gradAccept)"
                          name="Accepts"
                          dot={false}
                          activeDot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="rejects"
                          stroke={CHART_COLORS.reject}
                          strokeWidth={2}
                          fill="url(#gradReject)"
                          name="Rejects"
                          dot={false}
                          activeDot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="dismisses"
                          stroke={CHART_COLORS.dismiss}
                          strokeWidth={2}
                          fill="url(#gradDismiss)"
                          name="Dismisses"
                          dot={false}
                          activeDot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--card))' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyChartState
                      icon={<TrendingUp className="h-8 w-8" />}
                      message="Trends will appear once your banner starts receiving traffic."
                    />
                  )}
                  {/* Inline legend */}
                  {chartData.length > 0 && (
                    <div className="flex items-center justify-center gap-5 mt-3 pt-3 border-t border-border/50">
                      <LegendItem color={CHART_COLORS.accept} label="Accepts" />
                      <LegendItem color={CHART_COLORS.reject} label="Rejects" />
                      <LegendItem color={CHART_COLORS.dismiss} label="Dismisses" />
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
                    <div>
                      <CardTitle className="text-base">Consent Split</CardTitle>
                      <CardDescription className="text-xs">Overall distribution</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  {summary && summary.impressions > 0 ? (
                    <>
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
                            <Cell fill={CHART_COLORS.accept} />
                            <Cell fill={CHART_COLORS.reject} />
                            <Cell fill={CHART_COLORS.dismiss} />
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
                      {/* Legend below donut */}
                      <div className="flex flex-col gap-2.5 mt-1">
                        <DonutLegendRow
                          color={CHART_COLORS.accept}
                          label="Accepts"
                          value={summary.accepts}
                          pct={summary.acceptRate}
                        />
                        <DonutLegendRow
                          color={CHART_COLORS.reject}
                          label="Rejects"
                          value={summary.rejects}
                          pct={summary.rejectRate}
                        />
                        <DonutLegendRow
                          color={CHART_COLORS.dismiss}
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

            {/* Traffic Impact Analysis */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--accent-warm))]/10">
                    <AlertTriangle className="h-4.5 w-4.5 text-[hsl(var(--accent-warm))]" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Traffic Impact Analysis</CardTitle>
                    <CardDescription className="text-xs">Understanding your true website traffic</CardDescription>
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
    </DashboardLayout>
  )
}

/* -------------------------------------------------------------------
   Sub-components
   ------------------------------------------------------------------- */

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = 'teal'
}: {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  color?: 'teal' | 'green' | 'orange' | 'blue'
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
    <Card className="relative overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</p>
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
    <div className="flex items-center justify-center h-[280px]">
      <div className="text-center max-w-[240px]">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground/40">
          {icon}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{message}</p>
      </div>
    </div>
  )
}

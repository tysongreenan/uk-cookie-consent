'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'
import {
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Filter
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

const METRIC_OPTIONS: { value: ComparisonMetric; label: string; color: string; suffix: string }[] = [
  { value: 'impressions', label: 'Impressions', color: '#3b82f6', suffix: '' },
  { value: 'acceptRate', label: 'Accept Rate', color: '#10b981', suffix: '%' },
  { value: 'rejectRate', label: 'Reject Rate', color: '#ef4444', suffix: '%' },
  { value: 'dismissRate', label: 'Dismiss Rate', color: '#6b7280', suffix: '%' },
  { value: 'avgDecisionTime', label: 'Avg Decision Time', color: '#8b5cf6', suffix: 's' },
]

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
        const name = bannerNameMap.get(bid) || 'Unknown'
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
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const activeMetric = METRIC_OPTIONS.find(m => m.value === comparisonMetric)!

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Cookie Banner' },
          { label: 'Analytics' }
        ]} />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Cookie Banner Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Track your banner performance and user consent patterns
            </p>
          </div>
          {analyticsEnabled && (
            <Badge variant="default">Pro Analytics</Badge>
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
            {/* Banner Filter */}
            {banners.length > 1 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <label htmlFor="banner-filter" className="text-sm font-medium">
                      Filter by banner:
                    </label>
                    <select
                      id="banner-filter"
                      value={selectedBanner}
                      onChange={(e) => setSelectedBanner(e.target.value)}
                      className="border rounded-md px-3 py-1.5 text-sm bg-background"
                    >
                      <option value="all">All Banners</option>
                      {banners.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                    {selectedBanner !== 'all' && (
                      <button
                        onClick={() => setSelectedBanner('all')}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        Clear filter
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Banner Comparison Chart — only on "All Banners" view */}
            {selectedBanner === 'all' && bannerComparisonData.length > 1 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Banner Comparison</CardTitle>
                      <CardDescription>Compare performance across your banners</CardDescription>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      {METRIC_OPTIONS.map((metric) => (
                        <button
                          key={metric.value}
                          onClick={() => setComparisonMetric(metric.value)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            comparisonMetric === metric.value
                              ? 'text-white'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                          style={comparisonMetric === metric.value ? { backgroundColor: metric.color } : undefined}
                        >
                          {metric.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={Math.max(200, bannerComparisonData.length * 50)}>
                    <BarChart data={bannerComparisonData} layout="vertical" margin={{ left: 20, right: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis
                        type="number"
                        tickFormatter={(v) => `${v}${activeMetric.suffix}`}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={140}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip
                        formatter={(value: number) => [`${value}${activeMetric.suffix}`, activeMetric.label]}
                      />
                      <Bar
                        dataKey={comparisonMetric}
                        fill={activeMetric.color}
                        radius={[0, 4, 4, 0]}
                        maxBarSize={32}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard
                title="Total Impressions"
                value={summary?.impressions.toLocaleString() || '0'}
                icon={<Eye className="w-5 h-5" />}
                color="blue"
              />
              <StatCard
                title="Accept Rate"
                value={`${summary?.acceptRate}%`}
                subtitle={`${summary?.accepts.toLocaleString()} accepts`}
                icon={<CheckCircle className="w-5 h-5" />}
                color="green"
              />
              <StatCard
                title="Reject Rate"
                value={`${summary?.rejectRate}%`}
                subtitle={`${summary?.rejects.toLocaleString()} rejects`}
                icon={<XCircle className="w-5 h-5" />}
                color="red"
              />
              <StatCard
                title="Avg Decision Time"
                value={`${summary?.avgDecisionTime}s`}
                icon={<Clock className="w-5 h-5" />}
                color="purple"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Daily Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>30-Day Trends</CardTitle>
                  <CardDescription>Daily consent decisions over time</CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={stats}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="date"
                          tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="accepts" stroke="#10b981" name="Accepts" strokeWidth={2} />
                        <Line type="monotone" dataKey="rejects" stroke="#ef4444" name="Rejects" strokeWidth={2} />
                        <Line type="monotone" dataKey="dismisses" stroke="#6b7280" name="Dismisses" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                      <div className="text-center">
                        <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No data yet. Trends will appear once your banner starts receiving traffic.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Consent Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Consent Distribution</CardTitle>
                  <CardDescription>Overall user consent patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  {summary && summary.impressions > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Accepts', value: summary.accepts, color: '#10b981' },
                            { name: 'Rejects', value: summary.rejects, color: '#ef4444' },
                            { name: 'Dismisses', value: summary.dismisses, color: '#6b7280' }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { color: '#10b981' },
                            { color: '#ef4444' },
                            { color: '#6b7280' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                      <div className="text-center">
                        <Eye className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No consent data yet. Distribution will appear after users interact with your banner.</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Traffic Impact Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Impact Analysis</CardTitle>
                <CardDescription>Understanding your true website traffic</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Missing Analytics Data</h3>
                    {summary && summary.impressions > 0 ? (
                      <>
                        <p className="text-sm text-muted-foreground mb-4">
                          Your Google Analytics is missing <strong>{summary.rejects.toLocaleString()} visitors ({summary.rejectRate}%)</strong> who rejected cookies.
                        </p>
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                          <p className="text-sm">
                            <strong>Estimated Traffic Loss:</strong><br />
                            If your GA shows 10,000 sessions, your actual traffic is likely closer to{' '}
                            <strong>
                              {parseFloat(summary.acceptRate) > 0 ? Math.round(10000 / (parseFloat(summary.acceptRate) / 100)).toLocaleString() : 'N/A'} visitors
                            </strong>.
                          </p>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Once your banner collects data, we&apos;ll show you how much traffic your analytics tools are missing due to cookie rejections.
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Optimization Opportunities</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>Consider A/B testing different banner copy</li>
                      <li>Try different positioning (top vs bottom)</li>
                      <li>Test different button colors and text</li>
                      <li>Add a &quot;Learn More&quot; link for transparency</li>
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

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color = 'blue'
}: {
  title: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  color?: 'blue' | 'green' | 'red' | 'purple'
}) {
  const colors = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-green-500/10 text-green-500',
    red: 'bg-red-500/10 text-red-500',
    purple: 'bg-purple-500/10 text-purple-500'
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${colors[color]}`}>
            {icon}
          </div>
          <span className="text-3xl font-bold">{value}</span>
        </div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}

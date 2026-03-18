'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  BarChart, 
  Bar, 
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
  Cell
} from 'recharts'
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Settings
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { UpgradePrompt } from '@/components/dashboard/upgrade-prompt'
import { canAccessFeature } from '@/lib/plan-restrictions'

interface BannerStats {
  id: string
  user_id: string
  date: string
  accepts: number
  rejects: number
  dismisses: number
  impressions: number
  total_decision_time_ms: number
  decision_count: number
  returning_visitor_impressions: number
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

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<BannerStats[]>([])
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'enterprise'>('free')
  
  useEffect(() => {
    if (session) {
      fetchUserPlan()
      fetchAnalyticsData()
    }
  }, [session])

  async function fetchUserPlan() {
    if (!session?.user) return

    const planTier = (session.user?.planTier || 'free') as 'free' | 'pro' | 'enterprise'
    setUserPlan(planTier)
  }

  async function fetchAnalyticsData() {
    if (!session?.user?.id) return

    try {
      const res = await fetch('/api/analytics')
      if (!res.ok) throw new Error('Failed to fetch analytics')

      const data = await res.json()

      if (data.stats) {
        setStats(data.stats)
        calculateSummary(data.stats)
      }
      setAnalyticsEnabled(data.analyticsEnabled || false)
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
  
  async function toggleAnalytics() {
    if (!session?.user?.id) return

    try {
      const newStatus = !analyticsEnabled

      const res = await fetch('/api/analytics', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: newStatus })
      })

      if (!res.ok) throw new Error('Failed to update analytics settings')

      setAnalyticsEnabled(newStatus)
      toast.success(`Analytics ${newStatus ? 'enabled' : 'disabled'}`)
    } catch (error) {
      console.error('Error toggling analytics:', error)
      toast.error('Failed to update analytics settings')
    }
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
          <div className="flex items-center gap-3">
            <Badge variant={analyticsEnabled ? 'default' : 'secondary'}>
              {analyticsEnabled ? 'Analytics Enabled' : 'Analytics Disabled'}
            </Badge>
            <Button onClick={toggleAnalytics} variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              {analyticsEnabled ? 'Disable' : 'Enable'} Analytics
            </Button>
          </div>
        </div>
        
        {/* Plan Gate */}
        {!canAccessFeature(userPlan, 'hasInternalAnalytics') && (
          <UpgradePrompt 
            feature="Analytics Dashboard"
            description="Track impressions, acceptance rates, and traffic estimation with detailed analytics"
            variant="banner"
          />
        )}
        
        {!analyticsEnabled ? (
          <Card className="p-8 text-center">
            <CardContent>
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analytics Disabled</h3>
              <p className="text-muted-foreground mb-6">
                Enable analytics to start tracking your banner performance and user consent patterns.
              </p>
              <Button onClick={toggleAnalytics}>
                Enable Analytics
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
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

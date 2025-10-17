'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { createClient } from '@supabase/supabase-js'
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
  ArrowUpRight,
  Settings,
  Copy
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { UpgradePrompt } from '@/components/dashboard/upgrade-prompt'
import { canAccessFeature } from '@/lib/plan-restrictions'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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
  const [embedCode, setEmbedCode] = useState('')
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false)
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'enterprise'>('free')
  
  useEffect(() => {
    if (session) {
      fetchUserPlan()
      fetchAnalytics()
      generateEmbedCode()
      checkAnalyticsStatus()
    }
  }, [session])
  
  async function fetchUserPlan() {
    if (!session?.user?.id) return
    
    try {
      const { data, error } = await supabase
        .from('User')
        .select('planTier')
        .eq('id', session.user.id)
        .single()
      
      if (data?.planTier) {
        setUserPlan(data.planTier as 'free' | 'pro' | 'enterprise')
      }
    } catch (error) {
      console.error('Error fetching user plan:', error)
    }
  }
  
  async function fetchAnalytics() {
    if (!session?.user?.id) return
    
    try {
      // Fetch last 30 days
      const { data, error } = await supabase
        .from('banner_stats')
        .select('*')
        .eq('user_id', session.user.id)
        .order('date', { ascending: true })
        .limit(30)
      
      if (data) {
        setStats(data)
        calculateSummary(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }
  
  async function checkAnalyticsStatus() {
    if (!session?.user?.id) return
    
    try {
      const { data } = await supabase
        .from('User')
        .select('analytics_enabled')
        .eq('id', session.user.id)
        .single()
      
      setAnalyticsEnabled(data?.analytics_enabled || false)
    } catch (error) {
      console.error('Error checking analytics status:', error)
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
  
  async function generateEmbedCode() {
    if (!session?.user?.id) return
    
    const code = `<script src="${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/banner.js?id=${session.user.id}"></script>`
    setEmbedCode(code)
  }
  
  async function toggleAnalytics() {
    if (!session?.user?.id) return
    
    try {
      const newStatus = !analyticsEnabled
      
      const { error } = await supabase
        .from('User')
        .update({ analytics_enabled: newStatus })
        .eq('id', session.user.id)
      
      if (error) throw error
      
      setAnalyticsEnabled(newStatus)
      toast.success(`Analytics ${newStatus ? 'enabled' : 'disabled'}`)
    } catch (error) {
      console.error('Error toggling analytics:', error)
      toast.error('Failed to update analytics settings')
    }
  }
  
  async function copyEmbedCode() {
    try {
      await navigator.clipboard.writeText(embedCode)
      toast.success('Embed code copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy embed code')
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
            {/* Embed Code Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpRight className="w-5 h-5" />
                  Embed Code
                </CardTitle>
                <CardDescription>
                  Add this script to your website to enable analytics tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <code className="flex-1 text-sm font-mono">
                    {embedCode}
                  </code>
                  <Button onClick={copyEmbedCode} size="sm" variant="outline">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
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
                </CardContent>
              </Card>
              
              {/* Consent Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Consent Distribution</CardTitle>
                  <CardDescription>Overall user consent patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Accepts', value: summary?.accepts || 0, color: '#10b981' },
                          { name: 'Rejects', value: summary?.rejects || 0, color: '#ef4444' },
                          { name: 'Dismisses', value: summary?.dismisses || 0, color: '#6b7280' }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: 'Accepts', value: summary?.accepts || 0, color: '#10b981' },
                          { name: 'Rejects', value: summary?.rejects || 0, color: '#ef4444' },
                          { name: 'Dismisses', value: summary?.dismisses || 0, color: '#6b7280' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
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
                    <h3 className="font-semibold mb-2">📊 Missing Analytics Data</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Your Google Analytics is missing <strong>{summary?.rejects.toLocaleString()} visitors ({summary?.rejectRate}%)</strong> who rejected cookies.
                    </p>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-sm">
                        <strong>Estimated Traffic Loss:</strong><br />
                        If your GA shows 10,000 sessions, your actual traffic is likely closer to{' '}
                        <strong>
                          {summary?.acceptRate ? Math.round(10000 / (parseFloat(summary.acceptRate) / 100)).toLocaleString() : 'N/A'} visitors
                        </strong>.
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">🎯 Optimization Opportunities</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Consider A/B testing different banner copy</li>
                      <li>• Try different positioning (top vs bottom)</li>
                      <li>• Test different button colors and text</li>
                      <li>• Add a "Learn More" link for transparency</li>
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
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    red: 'bg-red-50 border-red-200 text-red-700',
    purple: 'bg-purple-50 border-purple-200 text-purple-700'
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
        <p className="text-sm font-medium text-gray-700">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}

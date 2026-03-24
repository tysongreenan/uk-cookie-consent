'use client'

import { useEffect, useState, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell,
} from 'recharts'
import {
  ShieldCheck, Globe, Clock, Eye, TrendingUp, ArrowRight, Download, Shield,
} from 'lucide-react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface DailyStats {
  date: string
  banners_handled: number
  auto_accepts: number
  auto_rejects: number
  auto_custom: number
  manual_overrides: number
}

interface Summary {
  bannersHandled: number
  autoAccepts: number
  autoRejects: number
  autoCustom: number
  manualOverrides: number
  uniqueDomains: number
  estimatedTimeSavedSeconds: number
}

const CHART_COLORS = {
  handled: '#0E768C',
  reject: '#d97757',
  accept: '#788c5d',
  custom: '#6a9bcc',
  manual: '#b0aea5',
}

export default function PrivacyDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState<DailyStats[]>([])
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [hasExtension, setHasExtension] = useState(false)

  useEffect(() => {
    if (!session?.user?.id) return
    fetchStats()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  async function fetchStats() {
    try {
      const res = await fetch('/api/consumer/stats?days=30')
      if (res.ok) {
        const data = await res.json()
        setStats(data.stats || [])
        setSummary(data.summary || null)
        setHasExtension((data.summary?.bannersHandled || 0) > 0)
      }
    } catch (error) {
      console.error('Error fetching consumer stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const pieData = useMemo(() => {
    if (!summary) return []
    return [
      { name: 'Auto Reject', value: summary.autoRejects },
      { name: 'Auto Accept', value: summary.autoAccepts },
      { name: 'Custom', value: summary.autoCustom },
      { name: 'Manual', value: summary.manualOverrides },
    ].filter(d => d.value > 0)
  }, [summary])

  const timeSavedDisplay = useMemo(() => {
    if (!summary) return '0s'
    const seconds = summary.estimatedTimeSavedSeconds
    if (seconds < 60) return `${seconds}s`
    if (seconds < 3600) return `~${Math.round(seconds / 60)} min`
    return `~${(seconds / 3600).toFixed(1)} hrs`
  }, [summary])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-3">
            <div className="relative mx-auto h-10 w-10">
              <div className="absolute inset-0 rounded-full border-2 border-muted" />
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Loading privacy dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        <Breadcrumbs items={[{ label: 'My Privacy' }, { label: 'Overview' }]} />

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Privacy Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Your personal cookie consent activity across the web.</p>
        </div>

        {/* Onboarding — shown when no extension data */}
        {!hasExtension && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-l-4 border-l-[#0E768C]">
              <CardHeader>
                <CardTitle className="text-lg">Get Started with Privacy Protection</CardTitle>
                <CardDescription>Three steps to automate your cookie consent across every website.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <Link href="/dashboard/privacy/preferences" className="group">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">1</div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">Set your preferences</p>
                        <p className="text-sm text-muted-foreground">Choose which cookies to accept or reject globally.</p>
                      </div>
                    </div>
                  </Link>
                  <Link href="/dashboard/privacy/settings" className="group">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">2</div>
                      <div>
                        <p className="font-medium group-hover:text-primary transition-colors">Generate an API key</p>
                        <p className="text-sm text-muted-foreground">Connect the Chrome extension to your account.</p>
                      </div>
                    </div>
                  </Link>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">3</div>
                    <div>
                      <p className="font-medium">Install the extension</p>
                      <p className="text-sm text-muted-foreground">Coming soon to the Chrome Web Store.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Banners Handled</p>
                  <p className="text-2xl font-bold tracking-tight">{summary?.bannersHandled?.toLocaleString() || '0'}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0E768C]/10">
                  <ShieldCheck className="h-5 w-5 text-[#0E768C]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Domains Protected</p>
                  <p className="text-2xl font-bold tracking-tight">{summary?.uniqueDomains?.toLocaleString() || '0'}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6a9bcc]/10">
                  <Globe className="h-5 w-5 text-[#6a9bcc]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Time Saved</p>
                  <p className="text-2xl font-bold tracking-tight">{timeSavedDisplay}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#788c5d]/10">
                  <Clock className="h-5 w-5 text-[#788c5d]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Reject Rate</p>
                  <p className="text-2xl font-bold tracking-tight">
                    {summary && summary.bannersHandled > 0
                      ? `${((summary.autoRejects / summary.bannersHandled) * 100).toFixed(0)}%`
                      : '0%'}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d97757]/10">
                  <Shield className="h-5 w-5 text-[#d97757]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Activity Trend */}
          <Card className="lg:col-span-2 overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">30-Day Activity</CardTitle>
              <CardDescription className="text-xs">Banners handled per day</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              {stats.length > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={stats} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gradHandled" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={CHART_COLORS.handled} stopOpacity={0.15} />
                        <stop offset="100%" stopColor={CHART_COLORS.handled} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.6} vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      axisLine={false} tickLine={false}
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} />
                    <RechartsTooltip
                      contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 13 }}
                    />
                    <Area type="monotone" dataKey="banners_handled" stroke={CHART_COLORS.handled} strokeWidth={2} fill="url(#gradHandled)" name="Banners Handled" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-[260px] text-muted-foreground">
                  <TrendingUp className="h-8 w-8 mb-2 opacity-40" />
                  <p className="text-sm">Activity will appear once the extension starts handling banners.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Breakdown */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Action Breakdown</CardTitle>
              <CardDescription className="text-xs">How banners were handled</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              {pieData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value" strokeWidth={0}>
                        <Cell fill={CHART_COLORS.reject} />
                        <Cell fill={CHART_COLORS.accept} />
                        <Cell fill={CHART_COLORS.custom} />
                        <Cell fill={CHART_COLORS.manual} />
                      </Pie>
                      <RechartsTooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 13 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { color: CHART_COLORS.reject, label: 'Auto Reject', value: summary?.autoRejects || 0 },
                      { color: CHART_COLORS.accept, label: 'Auto Accept', value: summary?.autoAccepts || 0 },
                      { color: CHART_COLORS.custom, label: 'Custom', value: summary?.autoCustom || 0 },
                      { color: CHART_COLORS.manual, label: 'Manual', value: summary?.manualOverrides || 0 },
                    ].filter(d => d.value > 0).map(d => (
                      <div key={d.label} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
                          <span className="text-muted-foreground">{d.label}</span>
                        </div>
                        <span className="font-medium tabular-nums">{d.value.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[180px] text-muted-foreground">
                  <Eye className="h-8 w-8 mb-2 opacity-40" />
                  <p className="text-sm text-center">No actions yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link href="/dashboard/privacy/preferences">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-medium">Cookie Preferences</p>
                  <p className="text-sm text-muted-foreground">Manage your global settings</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/privacy/history">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-medium">Consent History</p>
                  <p className="text-sm text-muted-foreground">View past decisions</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/privacy/settings">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-medium">Extension Settings</p>
                  <p className="text-sm text-muted-foreground">API keys & connection</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}

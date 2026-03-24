'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  ShieldAlert, ShieldCheck, Cookie, BarChart3, Megaphone, Share2, Settings, Lock, CheckCircle, Info,
} from 'lucide-react'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'

type DefaultAction = 'accept_all' | 'reject_all' | 'accept_essential' | 'custom'

interface Preferences {
  strictlyNecessary: 'accept'
  functionality: 'accept' | 'reject'
  analytics: 'accept' | 'reject'
  marketing: 'accept' | 'reject'
}

const presets: { id: DefaultAction; title: string; description: string; icon: React.ComponentType<{ className?: string }>; prefs: Omit<Preferences, 'strictlyNecessary'> }[] = [
  {
    id: 'reject_all',
    title: 'Reject All',
    description: 'Block all non-essential cookies',
    icon: ShieldAlert,
    prefs: { functionality: 'reject', analytics: 'reject', marketing: 'reject' },
  },
  {
    id: 'accept_essential',
    title: 'Accept Essential',
    description: 'Allow functional + analytics, block marketing',
    icon: ShieldCheck,
    prefs: { functionality: 'accept', analytics: 'accept', marketing: 'reject' },
  },
  {
    id: 'accept_all',
    title: 'Accept All',
    description: 'Allow all cookies on every site',
    icon: Cookie,
    prefs: { functionality: 'accept', analytics: 'accept', marketing: 'accept' },
  },
]

export default function PreferencesPage() {
  const { data: session } = useSession()
  const [preferences, setPreferences] = useState<Preferences>({
    strictlyNecessary: 'accept',
    functionality: 'accept',
    analytics: 'reject',
    marketing: 'reject',
  })
  const [selectedPreset, setSelectedPreset] = useState<DefaultAction>('reject_all')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!session?.user?.id) return
    fetchPreferences()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  async function fetchPreferences() {
    try {
      const res = await fetch('/api/consumer/preferences')
      if (res.ok) {
        const data = await res.json()
        setPreferences({ strictlyNecessary: 'accept', ...data.preferences })
        setSelectedPreset(data.defaultAction || detectPreset(data.preferences))
      }
    } catch (error) {
      console.error('Error fetching preferences:', error)
    } finally {
      setLoading(false)
    }
  }

  function detectPreset(prefs: Preferences): DefaultAction {
    if (prefs.functionality === 'reject' && prefs.analytics === 'reject' && prefs.marketing === 'reject') return 'reject_all'
    if (prefs.functionality === 'accept' && prefs.analytics === 'accept' && prefs.marketing === 'reject') return 'accept_essential'
    if (prefs.functionality === 'accept' && prefs.analytics === 'accept' && prefs.marketing === 'accept') return 'accept_all'
    return 'custom'
  }

  const savePreferences = useCallback(async (prefs: Preferences, action: DefaultAction) => {
    setSaving(true)
    try {
      const res = await fetch('/api/consumer/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences: prefs, defaultAction: action }),
      })
      if (res.ok) {
        toast.success('Preferences saved')
      }
    } catch {
      toast.error('Failed to save preferences')
    } finally {
      setSaving(false)
    }
  }, [])

  function selectPreset(preset: typeof presets[number]) {
    const newPrefs: Preferences = { strictlyNecessary: 'accept', ...preset.prefs }
    setPreferences(newPrefs)
    setSelectedPreset(preset.id)
    savePreferences(newPrefs, preset.id)
  }

  function toggleCategory(category: 'functionality' | 'analytics' | 'marketing') {
    const newPrefs = { ...preferences, [category]: preferences[category] === 'accept' ? 'reject' : 'accept' }
    setPreferences(newPrefs)
    const detectedPreset = detectPreset(newPrefs)
    setSelectedPreset(detectedPreset)
    savePreferences(newPrefs, detectedPreset)
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
      <div className="p-6 lg:p-8 max-w-3xl mx-auto space-y-8">
        <Breadcrumbs items={[{ label: 'My Privacy' }, { label: 'Preferences' }]} />

        <div>
          <h1 className="text-2xl font-bold tracking-tight">Cookie Preferences</h1>
          <p className="text-muted-foreground text-sm mt-1">Set your global cookie preferences. The extension applies these automatically on every site.</p>
        </div>

        {/* Quick Presets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {presets.map(preset => (
            <div
              key={preset.id}
              onClick={() => selectPreset(preset)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPreset === preset.id
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                  : 'border-border hover:border-muted-foreground/50'
              }`}
            >
              <preset.icon className={`h-5 w-5 mb-2 ${selectedPreset === preset.id ? 'text-primary' : 'text-muted-foreground'}`} />
              <p className="font-medium text-sm">{preset.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{preset.description}</p>
              {preset.id === 'reject_all' && (
                <Badge variant="secondary" className="mt-2 text-[10px]">Recommended</Badge>
              )}
            </div>
          ))}
        </div>

        {selectedPreset === 'custom' && (
          <Badge variant="outline" className="text-xs">Custom configuration</Badge>
        )}

        {/* Per-category toggles */}
        <div className="space-y-3">
          {/* Essential — always on */}
          <Card className="opacity-60">
            <CardContent className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Lock className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Essential Cookies</p>
                  <p className="text-xs text-muted-foreground">Required for websites to function. Cannot be disabled.</p>
                </div>
              </div>
              <Switch checked disabled />
            </CardContent>
          </Card>

          {/* Functionality */}
          <Card className={preferences.functionality === 'reject' ? 'bg-muted/30' : ''}>
            <CardContent className="p-5 flex items-center justify-between cursor-pointer" onClick={() => toggleCategory('functionality')}>
              <div className="flex items-center gap-4">
                <Settings className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Functional Cookies</p>
                  <p className="text-xs text-muted-foreground">Remembers your preferences like language and region.</p>
                </div>
              </div>
              <Switch checked={preferences.functionality === 'accept'} onCheckedChange={() => toggleCategory('functionality')} />
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card className={preferences.analytics === 'reject' ? 'bg-muted/30' : ''}>
            <CardContent className="p-5 flex items-center justify-between cursor-pointer" onClick={() => toggleCategory('analytics')}>
              <div className="flex items-center gap-4">
                <BarChart3 className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Analytics Cookies</p>
                  <p className="text-xs text-muted-foreground">Helps website owners understand how visitors interact with their site.</p>
                </div>
              </div>
              <Switch checked={preferences.analytics === 'accept'} onCheckedChange={() => toggleCategory('analytics')} />
            </CardContent>
          </Card>

          {/* Marketing */}
          <Card className={preferences.marketing === 'reject' ? 'bg-muted/30' : ''}>
            <CardContent className="p-5 flex items-center justify-between cursor-pointer" onClick={() => toggleCategory('marketing')}>
              <div className="flex items-center gap-4">
                <Megaphone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm">Marketing Cookies</p>
                  <p className="text-xs text-muted-foreground">Used for targeted advertising and tracking across websites.</p>
                </div>
              </div>
              <Switch checked={preferences.marketing === 'accept'} onCheckedChange={() => toggleCategory('marketing')} />
            </CardContent>
          </Card>
        </div>

        {/* Save indicator */}
        <AnimatePresence>
          {saving && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
              Saving...
            </motion.div>
          )}
        </AnimatePresence>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            These preferences are synced with the Chrome extension automatically. Changes take effect on the next page you visit.
            GPC (Global Privacy Control) provides a baseline signal. Your per-category preferences here give you finer control on top of that.
          </AlertDescription>
        </Alert>
      </div>
    </DashboardLayout>
  )
}

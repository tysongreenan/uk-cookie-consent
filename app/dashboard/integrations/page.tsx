'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { 
  Target, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  BarChart3,
  Shield,
  Zap
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import { BannerConfig } from '@/types'

interface BannerWithGA4 {
  id: string
  name: string
  config: BannerConfig
  ga4Settings: {
    enabled: boolean
    measurementId: string
    trackConsentEvents: boolean
    anonymizeIp: boolean
  }
}

export default function IntegrationsPage() {
  const { data: session } = useSession()
  const [banners, setBanners] = useState<BannerWithGA4[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null) // Track which banner is being saved
  
  useEffect(() => {
    if (session?.user?.id) {
      loadBannerConfig()
    }
  }, [session])

  const loadBannerConfig = async () => {
    try {
      const response = await fetch('/api/banners/simple')
      const data = await response.json()
      
      if (response.ok && data.banners && data.banners.length > 0) {
        const bannersWithGA4: BannerWithGA4[] = data.banners.map((banner: any) => {
          const gaSettings = banner.config?.integrations?.googleAnalytics || {
            enabled: false,
            measurementId: '',
            trackConsentEvents: true,
            anonymizeIp: true
          }
          
          return {
            id: banner.id,
            name: banner.name,
            config: banner.config,
            ga4Settings: gaSettings
          }
        })
        
        setBanners(bannersWithGA4)
      }
    } catch (error) {
      console.error('Error loading banner config:', error)
      toast.error('Failed to load banner configuration')
    } finally {
      setLoading(false)
    }
  }

  const saveGASettings = async (bannerId: string, bannerName: string, newSettings: any) => {
    setSaving(bannerId)
    try {
      // Validate measurement ID format
      if (newSettings.enabled && newSettings.measurementId) {
        const gaIdRegex = /^G-[A-Z0-9]{10}$/
        if (!gaIdRegex.test(newSettings.measurementId)) {
          toast.error('Invalid GA4 Measurement ID format. Expected: G-XXXXXXXXXX')
          setSaving(null)
          return
        }
      }

      // Find the banner and update its config
      const bannerIndex = banners.findIndex(b => b.id === bannerId)
      if (bannerIndex === -1) return

      const banner = banners[bannerIndex]
      const updatedConfig = {
        ...banner.config,
        integrations: {
          ...banner.config.integrations,
          googleAnalytics: newSettings
        }
      }

      const updateResponse = await fetch(`/api/banners/simple/${bannerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          config: updatedConfig,
          name: bannerName
        }),
      })

      if (updateResponse.ok) {
        // Update local state
        const updatedBanners = [...banners]
        updatedBanners[bannerIndex] = {
          ...updatedBanners[bannerIndex],
          config: updatedConfig,
          ga4Settings: newSettings
        }
        setBanners(updatedBanners)
        toast.success(`Google Analytics settings saved for "${bannerName}"!`)
      } else {
        throw new Error('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving GA settings:', error)
      toast.error('Failed to save Google Analytics settings')
    } finally {
      setSaving(null)
    }
  }

  const testGAConnection = (measurementId: string) => {
    if (!measurementId) {
      toast.error('Please enter a Measurement ID first')
      return
    }

    const gaIdRegex = /^G-[A-Z0-9]{10}$/
    if (!gaIdRegex.test(measurementId)) {
      toast.error('Invalid GA4 Measurement ID format. Expected: G-XXXXXXXXXX')
      return
    }

    // Open GA4 property in new tab
    window.open(`https://analytics.google.com/analytics/web/#/p${measurementId}`, '_blank')
    toast.success('Opening your GA4 property in a new tab')
  }

  const updateBannerSettings = (bannerId: string, field: string, value: any) => {
    setBanners(prev => prev.map(banner => {
      if (banner.id === bannerId) {
        return {
          ...banner,
          ga4Settings: {
            ...banner.ga4Settings,
            [field]: value
          }
        }
      }
      return banner
    }))
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading integrations...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[
          { label: 'Cookie Banner' },
          { label: 'Integrations' }
        ]} />

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Connect Google Analytics to each banner individually for targeted tracking
          </p>
        </div>

        {/* Per-Banner GA4 Configuration */}
        <div className="space-y-6">
          {banners.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Banners Found</h3>
                <p className="text-muted-foreground">
                  Create a banner first to configure Google Analytics integration.
                </p>
              </CardContent>
            </Card>
          ) : (
            banners.map((banner) => (
              <Card key={banner.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <BarChart3 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {banner.name}
                          <Badge variant="outline">Banner</Badge>
                        </CardTitle>
                        <CardDescription>
                          Configure GA4 tracking for this specific banner
                        </CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={banner.ga4Settings.enabled}
                      onCheckedChange={(checked) => updateBannerSettings(banner.id, 'enabled', checked)}
                      disabled={saving === banner.id}
                    />
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {banner.ga4Settings.enabled && (
                    <>
                      {/* Measurement ID Input */}
                      <div className="space-y-2">
                        <Label htmlFor={`measurementId-${banner.id}`} className="flex items-center gap-2">
                          Measurement ID
                          <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id={`measurementId-${banner.id}`}
                            placeholder="G-XXXXXXXXXX"
                            value={banner.ga4Settings.measurementId}
                            onChange={(e) => updateBannerSettings(banner.id, 'measurementId', e.target.value.toUpperCase())}
                            className="font-mono"
                            disabled={saving === banner.id}
                          />
                          <Button
                            variant="outline"
                            onClick={() => testGAConnection(banner.ga4Settings.measurementId)}
                            disabled={!banner.ga4Settings.measurementId || saving === banner.id}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Test
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Find your Measurement ID in your GA4 property settings
                        </p>
                      </div>

                      {/* Advanced Settings */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">Advanced Settings</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor={`trackConsentEvents-${banner.id}`}>Track Consent Events</Label>
                            <p className="text-sm text-muted-foreground">
                              Send accept/reject/dismiss events to Google Analytics
                            </p>
                          </div>
                          <Switch
                            id={`trackConsentEvents-${banner.id}`}
                            checked={banner.ga4Settings.trackConsentEvents}
                            onCheckedChange={(checked) => updateBannerSettings(banner.id, 'trackConsentEvents', checked)}
                            disabled={saving === banner.id}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor={`anonymizeIp-${banner.id}`}>Anonymize IP Addresses</Label>
                            <p className="text-sm text-muted-foreground">
                              Recommended for privacy compliance
                            </p>
                          </div>
                          <Switch
                            id={`anonymizeIp-${banner.id}`}
                            checked={banner.ga4Settings.anonymizeIp}
                            onCheckedChange={(checked) => updateBannerSettings(banner.id, 'anonymizeIp', checked)}
                            disabled={saving === banner.id}
                          />
                        </div>
                      </div>

                      {/* Info Alert */}
                      <Alert>
                        <Shield className="h-4 w-4" />
                        <AlertDescription>
                          <div className="font-semibold mb-1">Privacy Compliant</div>
                          GA4 tracking only activates when users accept cookies. No data is collected without consent.
                        </AlertDescription>
                      </Alert>
                    </>
                  )}

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <Button 
                      onClick={() => saveGASettings(banner.id, banner.name, banner.ga4Settings)}
                      disabled={saving === banner.id || (banner.ga4Settings.enabled && !banner.ga4Settings.measurementId)}
                    >
                      {saving === banner.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Save Settings
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Coming Soon Card */}
        <Card className="opacity-75">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Target className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  More Integrations
                  <Badge variant="outline">Coming Soon</Badge>
                </CardTitle>
                <CardDescription>
                  Facebook Pixel, Google Tag Manager, and more tracking platforms
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We're working on adding support for more popular tracking and analytics platforms. 
              Stay tuned for updates!
            </p>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              How It Works
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Automatic Injection</h3>
                <p className="text-sm text-muted-foreground">
                  When users accept cookies, GA4 tracking code is automatically injected into their browser.
                  No manual setup required on your website.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Consent Events</h3>
                <p className="text-sm text-muted-foreground">
                  Track user consent decisions as custom events in GA4, helping you understand 
                  your banner's effectiveness and user behavior.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

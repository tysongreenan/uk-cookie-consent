'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Save, Eye, Code, Download, Plus, Trash2, Shield, Settings, BarChart3, Target } from 'lucide-react'
import Link from 'next/link'
import { BannerPreview } from '@/components/banner/banner-preview'
import { CodeGenerator } from '@/components/banner/code-generator'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-hot-toast'
import { BannerConfig, TrackingScript, ComplianceFramework } from '@/types'
import { applyTranslations } from '@/lib/translations'
import { scriptTemplates, getTemplatesByCategory } from '@/lib/script-templates'
import { migrateBannerConfig, needsMigration, getMigrationNotes } from '@/lib/banner-migration'
import { NewBadge } from '@/components/ui/new-badge'
import { ComplianceSelector } from '@/components/banner/compliance-selector'
import { getBannerTemplate } from '@/lib/banner-templates'

const defaultConfig: BannerConfig = {
  version: '2.0.0',
  lastUpdated: new Date().toISOString(),
  compliance: {
    framework: 'pipeda',
    requiresExplicitConsent: false,
    requiresOptIn: false,
    requiresGranularConsent: false,
    requiresPrivacyPolicy: true,
    requiresDataRetentionPolicy: false,
    maxPenalty: 'Reputation damage and Privacy Commissioner findings',
    consentExpiry: 24,
  },
  name: 'My Cookie Banner',
  position: 'bottom',
  theme: 'dark',
  language: 'auto',
  colors: {
    background: '#1f2937',
    text: '#ffffff',
    button: '#3b82f6',
    buttonText: '#ffffff',
    link: '#60a5fa'
  },
  text: {
    title: 'We use cookies',
    message: 'This website uses cookies to enhance your browsing experience and provide personalized content.',
    acceptButton: 'Accept All',
    rejectButton: 'Reject',
    preferencesButton: 'Preferences'
  },
  behavior: {
    autoShow: true,
    dismissOnScroll: false,
    showPreferences: true,
    cookieExpiry: 30
  },
  branding: {
    logo: {
      enabled: false,
      url: '',
      position: 'left',
      maxWidth: 120,
      maxHeight: 40
    },
    privacyPolicy: {
      url: '',
      text: 'Privacy Policy',
      openInNewTab: true,
      required: false
    },
    footerLink: {
      enabled: true,
      text: 'Cookie Settings',
      position: 'floating',
      floatingPosition: 'bottom-left'
    }
  },
  layout: {
    width: 'full',
    customWidth: 400,
    maxWidth: 1200,
    borderRadius: 8,
    padding: 20,
    margin: 20,
    shadow: 'medium',
    animation: 'fade'
  },
  scripts: {
    strictlyNecessary: [
      {
        id: 'session-management',
        name: 'Session Management',
        category: 'strictly-necessary',
        scriptCode: `// Essential session management
if (!sessionStorage.getItem('sessionId')) {
  sessionStorage.setItem('sessionId', Date.now().toString());
}`,
        enabled: true
      }
    ],
    functionality: [],
    trackingPerformance: [],
    targetingAdvertising: []
  },
  advanced: {
    googleConsentMode: true,
    customCSS: '',
    customJS: '',
    performance: {
      deferNonCriticalScripts: true,
      useRequestIdleCallback: true,
      lazyLoadAnalytics: true,
      inlineCriticalCSS: true
    }
  }
}

// Common script database for autocomplete
const COMMON_SCRIPTS = {
  'strictly-necessary': [
    'Session Management',
    'Security Headers',
    'CSRF Protection',
    'Authentication',
    'Load Balancing',
    'Cookie Consent',
    'GDPR Compliance',
    'SSL Certificate',
    'Firewall Protection',
    'Rate Limiting'
  ],
  'functionality': [
    'User Preferences',
    'Language Selection',
    'Theme Settings',
    'Form Validation',
    'Local Storage',
    'Shopping Cart',
    'User Authentication',
    'Search Functionality',
    'Notifications',
    'Accessibility Tools'
  ],
  'tracking-performance': [
    'Google Analytics',
    'Google Analytics 4',
    'Microsoft Clarity',
    'Hotjar',
    'Mixpanel',
    'Amplitude',
    'Segment',
    'PostHog',
    'Plausible',
    'Fathom Analytics',
    'Adobe Analytics',
    'Piwik Pro',
    'Matomo',
    'Snowplow',
    'Heap Analytics',
    'Kissmetrics',
    'Crazy Egg',
    'FullStory',
    'LogRocket',
    'Sentry',
    'New Relic',
    'DataDog',
    'Cloudflare Analytics',
    'Vercel Analytics',
    'Netlify Analytics'
  ],
  'targeting-advertising': [
    'Facebook Pixel',
    'Google Ads',
    'Google Tag Manager',
    'LinkedIn Insight Tag',
    'Twitter Pixel',
    'Pinterest Tag',
    'TikTok Pixel',
    'Snapchat Pixel',
    'Pinterest Conversion',
    'Bing Ads',
    'YouTube Analytics',
    'Instagram Pixel',
    'Reddit Pixel',
    'Quora Pixel',
    'Outbrain Pixel',
    'Taboola Pixel',
    'Criteo Pixel',
    'The Trade Desk',
    'Amazon DSP',
    'Google Marketing Platform',
    'Adobe Experience Platform',
    'Salesforce Marketing Cloud',
    'HubSpot Tracking',
    'Mailchimp Tracking',
    'Klaviyo Tracking',
    'Intercom',
    'Zendesk Chat',
    'Drift',
    'Crisp',
    'Tidio',
    'LiveChat',
    'Olark',
    'Freshchat'
  ]
}

// Smart input component with autocomplete
const SmartScriptInput = ({ 
  value, 
  onChange, 
  category, 
  placeholder = "Script name" 
}: { 
  value: string
  onChange: (value: string) => void
  category: keyof typeof COMMON_SCRIPTS
  placeholder?: string
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredScripts, setFilteredScripts] = useState<string[]>([])
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Only show suggestions after user stops typing for 300ms
    if (value.trim() && value.length >= 2) {
      typingTimeoutRef.current = setTimeout(() => {
        const suggestions = COMMON_SCRIPTS[category].filter(script =>
          script.toLowerCase().includes(value.toLowerCase()) && 
          script.toLowerCase() !== value.toLowerCase()
        )
        console.log(`Autocomplete for ${category}:`, { value, suggestions })
        setFilteredScripts(suggestions)
        setShowSuggestions(suggestions.length > 0)
      }, 300)
    } else {
      setShowSuggestions(false)
      setFilteredScripts([])
    }

    // Cleanup timeout on unmount
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [value, category])

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => {
          // Only show suggestions on focus if we already have filtered results
          if (value.trim() && value.length >= 2 && filteredScripts.length > 0) {
            setShowSuggestions(true)
          }
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        placeholder={placeholder}
        className="font-medium border-0 p-0 h-auto"
      />
      {showSuggestions && filteredScripts.length > 0 && value.trim() && (
        <div className="absolute top-full left-0 right-0 z-50 bg-white border rounded-md shadow-lg mt-1 max-h-32 overflow-y-auto">
          {filteredScripts.map((script, index) => (
            <button
              key={index}
              className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
              onMouseDown={(e) => {
                e.preventDefault()
                onChange(script)
                setShowSuggestions(false)
              }}
            >
              {script}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function BannerBuilderPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [config, setConfig] = useState<BannerConfig>(defaultConfig)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('compliance')
  const [isEditing, setIsEditing] = useState(false)
  const [bannerId, setBannerId] = useState<string | null>(null)
  const [isLoadingBanner, setIsLoadingBanner] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
    }
  }, [session, router])

  useEffect(() => {
    const editId = searchParams.get('edit')
    if (editId && session) {
      loadBannerForEdit(editId)
    }
  }, [searchParams, session])

  const loadBannerForEdit = async (id: string) => {
    setIsLoadingBanner(true)
    try {
      const response = await fetch(`/api/banners/${id}`)
      const data = await response.json()
      
      if (response.ok) {
        // Check if banner needs migration
        const originalConfig = data.banner.config
        const needsUpdate = needsMigration(originalConfig)
        
        let bannerConfig = originalConfig
        
        if (needsUpdate) {
          // Migrate to latest version
          bannerConfig = migrateBannerConfig(originalConfig)
          const migrationNotes = getMigrationNotes(originalConfig.version || '1.0.0', bannerConfig.version!)
          
          // Show migration notification
          toast.success(
            `🎉 Banner updated with new features! ${migrationNotes.length > 0 ? migrationNotes[0] : 'Enhanced preferences modal added.'}`,
            { duration: 6000 }
          )
          
          // Auto-save the migrated configuration
          try {
            await fetch(`/api/banners/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: data.banner.name,
                config: bannerConfig,
                isActive: data.banner.isActive
              })
            })
          } catch (error) {
            console.error('Failed to save migrated banner:', error)
          }
        }
        
        setConfig(bannerConfig)
        setIsEditing(true)
        setBannerId(id)
        toast.success(`Loaded "${data.banner.name}" for editing`)
      } else {
        console.error('Failed to load banner:', data.error)
        toast.error(data.error || 'Failed to load banner for editing')
        router.push('/dashboard/builder')
      }
    } catch (error) {
      console.error('Error loading banner:', error)
      toast.error('Failed to load banner for editing')
      router.push('/dashboard/builder')
    } finally {
      setIsLoadingBanner(false)
    }
  }

  const updateConfig = (section: keyof BannerConfig, updates: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: { ...(prev[section] as any), ...updates }
    }))
  }

  const handleComplianceFrameworkChange = (framework: ComplianceFramework) => {
    const template = getBannerTemplate(framework)
    
    setConfig(prev => ({
      ...prev,
      compliance: template.compliance,
      text: template.text,
      colors: template.colors,
      behavior: {
        ...prev.behavior,
        showPreferences: template.compliance.requiresGranularConsent,
        cookieExpiry: template.compliance.consentExpiry
      }
    }))
    
    toast.success(`Switched to ${framework.toUpperCase()} compliance template`)
  }

  const handleLanguageChange = (newLanguage: 'en' | 'fr' | 'auto') => {
    setConfig(prev => ({
      ...prev,
      language: newLanguage
    }))
    
    // If user selects specific language (not auto), apply translations
    if (newLanguage !== 'auto') {
      const translations = applyTranslations(newLanguage)
      setConfig(prev => ({
        ...prev,
        language: newLanguage,
        text: translations
      }))
      toast.success(`Banner text updated to ${newLanguage === 'fr' ? 'French' : 'English'}`)
    }
  }

  const handleThemeChange = (theme: 'light' | 'dark' | 'custom') => {
    setConfig(prev => ({
      ...prev,
      theme,
      colors: theme === 'light' ? {
        background: '#ffffff',
        text: '#1f2937',
        button: '#3b82f6',
        buttonText: '#ffffff',
        link: '#1d4ed8'
      } : theme === 'dark' ? {
        background: '#1f2937',
        text: '#ffffff',
        button: '#3b82f6',
        buttonText: '#ffffff',
        link: '#60a5fa'
      } : prev.colors
    }))
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const url = isEditing ? `/api/banners/${bannerId}` : '/api/banners'
      const method = isEditing ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: config.name,
          config: config,
          isActive: true
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(isEditing ? 'Banner updated successfully!' : 'Banner saved successfully!')
        if (!isEditing) {
          // For new banners, redirect to dashboard after saving
          setTimeout(() => {
            router.push('/dashboard')
          }, 1500)
        } else {
          // For updated banners, stay on the page but show success
          console.log('Banner updated successfully:', data.banner)
        }
      } else {
        console.error('Save/Update error:', data.error)
        toast.error(data.error || 'Failed to save banner')
      }
    } catch (error) {
      console.error('Save error:', error)
      toast.error('Failed to save banner')
    } finally {
      setIsLoading(false)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (isLoadingBanner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading banner for editing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div className="h-6 w-px bg-border"></div>
                <Input
                  value={config.name}
                  onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Banner name"
                  className="text-lg font-semibold border-0 p-0 h-auto bg-transparent focus:bg-white focus:border focus:px-2 focus:py-1 focus:rounded"
                />
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={handleSave} disabled={isLoading} size="sm">
                <Save className="h-4 w-4" />
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground gap-1" role="tablist" aria-label="Banner configuration steps">
                  <TabsTrigger 
                    value="compliance" 
                    role="tab"
                    aria-selected={activeTab === 'compliance'}
                    aria-controls="compliance-panel"
                    className="relative px-3 py-1.5 data-[state=active]:!bg-transparent data-[state=active]:!border-2 data-[state=active]:!border-primary data-[state=active]:!text-primary"
                  >
                    <span className="flex items-center space-x-1 bg-transparent">
                      <Shield className="h-3.5 w-3.5" />
                      <span>Compliance</span>
                      <NewBadge variant="sparkle" size="sm" />
                    </span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="design" 
                    role="tab"
                    aria-selected={activeTab === 'design'}
                    aria-controls="design-panel"
                  >
                    Design
                  </TabsTrigger>
                  <TabsTrigger 
                    value="content" 
                    role="tab"
                    aria-selected={activeTab === 'content'}
                    aria-controls="content-panel"
                  >
                    Content
                  </TabsTrigger>
                  <TabsTrigger 
                    value="scripts" 
                    role="tab"
                    aria-selected={activeTab === 'scripts'}
                    aria-controls="scripts-panel"
                  >
                    Scripts
                  </TabsTrigger>
                  <TabsTrigger 
                    value="behavior" 
                    role="tab"
                    aria-selected={activeTab === 'behavior'}
                    aria-controls="behavior-panel"
                    className="relative px-3 py-1.5 data-[state=active]:!bg-transparent data-[state=active]:!border-2 data-[state=active]:!border-primary data-[state=active]:!text-primary"
                  >
                    <span className="flex items-center space-x-1 bg-transparent">
                      <span>Behavior</span>
                      <NewBadge variant="sparkle" size="sm" />
                    </span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="text-sm text-muted-foreground">
                  {activeTab === 'compliance' ? 'Step 1 of 5' :
                   activeTab === 'design' ? 'Step 2 of 5' : 
                   activeTab === 'content' ? 'Step 3 of 5' : 
                   activeTab === 'scripts' ? 'Step 4 of 5' : 'Step 5 of 5'}
                </div>
              </div>

              {/* Compliance Tab */}
              <TabsContent value="compliance" className="space-y-6" id="compliance-panel" role="tabpanel" aria-labelledby="compliance-tab">
                <ComplianceSelector
                  selectedFramework={config.compliance.framework}
                  onFrameworkChange={handleComplianceFrameworkChange}
                />
              </TabsContent>

              {/* Design Tab */}
              <TabsContent value="design" className="space-y-6" id="design-panel" role="tabpanel" aria-labelledby="design-tab">

                  <Card>
                    <CardHeader>
                      <CardTitle>Brand Style</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="theme" className="text-sm font-medium">Theme</Label>
                        <Select value={config.theme} onValueChange={handleThemeChange}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="bg-color" className="text-sm font-medium">Background</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="bg-color"
                                type="color"
                                value={config.colors.background}
                                onChange={(e) => updateConfig('colors', { background: e.target.value })}
                                className="w-12 h-8 p-1 border rounded"
                              />
                              <Input
                                value={config.colors.background}
                                onChange={(e) => updateConfig('colors', { background: e.target.value })}
                                placeholder="#ffffff"
                                className="flex-1"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="text-color" className="text-sm font-medium">Text</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="text-color"
                                type="color"
                                value={config.colors.text}
                                onChange={(e) => updateConfig('colors', { text: e.target.value })}
                                className="w-12 h-8 p-1 border rounded"
                              />
                              <Input
                                value={config.colors.text}
                                onChange={(e) => updateConfig('colors', { text: e.target.value })}
                                placeholder="#000000"
                                className="flex-1"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="button-color" className="text-sm font-medium">Button</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="button-color"
                                type="color"
                                value={config.colors.button}
                                onChange={(e) => updateConfig('colors', { button: e.target.value })}
                                className="w-12 h-8 p-1 border rounded"
                              />
                              <Input
                                value={config.colors.button}
                                onChange={(e) => updateConfig('colors', { button: e.target.value })}
                                placeholder="#3b82f6"
                                className="flex-1"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="button-text-color" className="text-sm font-medium">Button Text</Label>
                            <div className="flex items-center space-x-2">
                              <Input
                                id="button-text-color"
                                type="color"
                                value={config.colors.buttonText}
                                onChange={(e) => updateConfig('colors', { buttonText: e.target.value })}
                                className="w-12 h-8 p-1 border rounded"
                              />
                              <Input
                                value={config.colors.buttonText}
                                onChange={(e) => updateConfig('colors', { buttonText: e.target.value })}
                                placeholder="#ffffff"
                                className="flex-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                {/* Layout Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Layout & Spacing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Position Settings */}
                      <div className="space-y-3">
                        <Label htmlFor="position" className="text-sm font-medium">Position</Label>
                        <Select value={config.position} onValueChange={(value: any) => updateConfig('position', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top">Top Bar (Full Width)</SelectItem>
                            <SelectItem value="bottom">Bottom Bar (Full Width)</SelectItem>
                            <SelectItem value="floating-bottom-right">Floating - Bottom Right</SelectItem>
                            <SelectItem value="floating-bottom-left">Floating - Bottom Left</SelectItem>
                            <SelectItem value="floating-top-right">Floating - Top Right</SelectItem>
                            <SelectItem value="floating-top-left">Floating - Top Left</SelectItem>
                            <SelectItem value="modal-center">Modal - Center</SelectItem>
                            <SelectItem value="modal-bottom">Modal - Bottom</SelectItem>
                            <SelectItem value="modal-top">Modal - Top</SelectItem>
                            <SelectItem value="slide-in-right">Slide In - Right</SelectItem>
                            <SelectItem value="slide-in-left">Slide In - Left</SelectItem>
                            <SelectItem value="slide-in-top">Slide In - Top</SelectItem>
                            <SelectItem value="slide-in-bottom">Slide In - Bottom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Width Settings */}
                      <div className="space-y-3">
                        <Label htmlFor="width" className="text-sm font-medium">Width</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Select value={config.layout.width} onValueChange={(value: any) => updateConfig('layout', { ...config.layout, width: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full">Full Width</SelectItem>
                            <SelectItem value="container">Container Width</SelectItem>
                            <SelectItem value="custom">Custom Width</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {config.layout.width === 'custom' && (
                          <div>
                            <Input
                              id="custom-width"
                              type="number"
                              value={config.layout.customWidth || 400}
                              onChange={(e) => updateConfig('layout', { ...config.layout, customWidth: parseInt(e.target.value) || 400 })}
                              placeholder="400"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Spacing Settings */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Spacing & Effects</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="border-radius" className="text-xs">Border Radius (px)</Label>
                          <Input
                            id="border-radius"
                            type="number"
                            value={config.layout.borderRadius}
                            onChange={(e) => updateConfig('layout', { ...config.layout, borderRadius: parseInt(e.target.value) || 0 })}
                            placeholder="8"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="padding" className="text-xs">Padding (px)</Label>
                          <Input
                            id="padding"
                            type="number"
                            value={config.layout.padding}
                            onChange={(e) => updateConfig('layout', { ...config.layout, padding: parseInt(e.target.value) || 20 })}
                            placeholder="20"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="margin" className="text-xs">Margin (px)</Label>
                          <Input
                            id="margin"
                            type="number"
                            value={config.layout.margin}
                            onChange={(e) => updateConfig('layout', { ...config.layout, margin: parseInt(e.target.value) || 20 })}
                            placeholder="20"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="shadow" className="text-xs">Shadow</Label>
                          <Select value={config.layout.shadow} onValueChange={(value: any) => updateConfig('layout', { ...config.layout, shadow: value })}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Animation */}
                    <div className="space-y-3">
                      <Label htmlFor="animation" className="text-sm font-medium">Animation</Label>
                      <Select value={config.layout.animation} onValueChange={(value: any) => updateConfig('layout', { ...config.layout, animation: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="fade">Fade In</SelectItem>
                          <SelectItem value="slide">Slide In</SelectItem>
                          <SelectItem value="bounce">Bounce</SelectItem>
                          <SelectItem value="pulse">Pulse</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6" id="content-panel" role="tabpanel" aria-labelledby="content-tab">

                <Card>
                  <CardHeader>
                    <CardTitle>Language</CardTitle>
                    <CardDescription>
                      Choose your banner language. Auto-detect will show English for English browsers and French for French browsers (required for Quebec Law 25).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="language">Banner Language</Label>
                      <Select 
                        value={config.language} 
                        onValueChange={handleLanguageChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto-detect (Recommended)</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français (French)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-2">
                        {config.language === 'auto' && '🇨🇦 Language will be detected from user\'s browser. Perfect for Canadian sites serving English and French users.'}
                        {config.language === 'en' && 'Banner will always show in English.'}
                        {config.language === 'fr' && 'La bannière sera toujours affichée en français.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Banner Text</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label htmlFor="title" className="text-sm font-medium">Title</Label>
                      <Input
                        id="title"
                        value={config.text.title}
                        onChange={(e) => updateConfig('text', { title: e.target.value })}
                        placeholder="We use cookies"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                      <textarea
                        id="message"
                        value={config.text.message}
                        onChange={(e) => updateConfig('text', { message: e.target.value })}
                        placeholder="This website uses cookies to enhance your browsing experience and provide personalized content."
                        className="w-full h-20 p-3 border rounded-md resize-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Button Text</Label>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="accept-text" className="text-xs">Accept Button</Label>
                          <Input
                            id="accept-text"
                            value={config.text.acceptButton}
                            onChange={(e) => updateConfig('text', { acceptButton: e.target.value })}
                            placeholder="Accept All"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reject-text" className="text-xs">Reject Button</Label>
                          <Input
                            id="reject-text"
                            value={config.text.rejectButton}
                            onChange={(e) => updateConfig('text', { rejectButton: e.target.value })}
                            placeholder="Reject"
                            className="mt-1"
                          />
                        </div>
                        <div className="relative">
                          <div className="flex items-center space-x-1 mb-1">
                            <Label htmlFor="preferences-text" className="text-xs">Preferences Button</Label>
                            <NewBadge variant="glow" size="sm" />
                          </div>
                          <Input
                            id="preferences-text"
                            value={config.text.preferencesButton}
                            onChange={(e) => updateConfig('text', { preferencesButton: e.target.value })}
                            placeholder="Preferences"
                            className="mt-1 border-purple-200 focus:border-purple-400 focus:ring-purple-200"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Branding</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="logo-enabled"
                        checked={config.branding.logo.enabled}
                        onCheckedChange={(checked) => updateConfig('branding', { 
                          logo: { ...config.branding.logo, enabled: checked }
                        })}
                      />
                      <Label htmlFor="logo-enabled">Enable Logo</Label>
                    </div>

                    {config.branding.logo.enabled && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="logo-upload">Upload Logo</Label>
                          <div className="mt-2">
                            <input
                              id="logo-upload"
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const reader = new FileReader()
                                  reader.onload = (event) => {
                                    const result = event.target?.result as string
                                    updateConfig('branding', { 
                                      logo: { ...config.branding.logo, url: result }
                                    })
                                  }
                                  reader.readAsDataURL(file)
                                }
                              }}
                              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
                            />
                          </div>
                          {config.branding.logo.url && (
                            <div className="mt-3">
                              <img
                                src={config.branding.logo.url}
                                alt="Logo preview"
                                className="max-w-32 max-h-12 object-contain border rounded"
                                onError={(e) => {
                                  e.currentTarget.style.display = 'none'
                                }}
                              />
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="logo-url">Or Logo URL</Label>
                          <Input
                            id="logo-url"
                            value={config.branding.logo.url}
                            onChange={(e) => updateConfig('branding', { 
                              logo: { ...config.branding.logo, url: e.target.value }
                            })}
                            placeholder="https://example.com/logo.png"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="logo-position">Logo Position</Label>
                          <Select 
                            value={config.branding.logo.position} 
                            onValueChange={(value: any) => updateConfig('branding', { 
                              logo: { ...config.branding.logo, position: value }
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="left">Left</SelectItem>
                              <SelectItem value="right">Right</SelectItem>
                              <SelectItem value="center">Center</SelectItem>
                              <SelectItem value="hidden">Hidden</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="privacy-url">Privacy Policy URL</Label>
                      <Input
                        id="privacy-url"
                        value={config.branding.privacyPolicy.url}
                        onChange={(e) => updateConfig('branding', { 
                          privacyPolicy: { ...config.branding.privacyPolicy, url: e.target.value }
                        })}
                        placeholder="https://example.com/privacy-policy"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cookie Settings Link</CardTitle>
                    <CardDescription>
                      Add a persistent link for users to change their cookie preferences anytime (required for compliance).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="footer-link-enabled"
                        checked={config.branding?.footerLink?.enabled ?? true}
                        onCheckedChange={(checked) => updateConfig('branding', { 
                          footerLink: { 
                            ...(config.branding?.footerLink || {
                              text: 'Cookie Settings',
                              position: 'floating',
                              floatingPosition: 'bottom-left'
                            }), 
                            enabled: checked 
                          }
                        })}
                      />
                      <Label htmlFor="footer-link-enabled">Enable Cookie Settings Link</Label>
                    </div>

                    {config.branding?.footerLink?.enabled && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="footer-link-text">Link Text</Label>
                          <Input
                            id="footer-link-text"
                            value={config.branding?.footerLink?.text || 'Cookie Settings'}
                            onChange={(e) => updateConfig('branding', { 
                              footerLink: { ...(config.branding?.footerLink || {}), text: e.target.value }
                            })}
                            placeholder="Cookie Settings"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="footer-link-position">Position</Label>
                          <Select 
                            value={config.branding?.footerLink?.position || 'floating'} 
                            onValueChange={(value: any) => updateConfig('branding', { 
                              footerLink: { ...(config.branding?.footerLink || {}), position: value }
                            })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="floating">Floating Button (Recommended)</SelectItem>
                              <SelectItem value="inline">Inline HTML (For Footer)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {config.branding?.footerLink?.position === 'floating' && (
                          <div>
                            <Label htmlFor="floating-position">Floating Position</Label>
                            <Select 
                              value={config.branding?.footerLink?.floatingPosition || 'bottom-left'} 
                              onValueChange={(value: any) => updateConfig('branding', { 
                                footerLink: { ...(config.branding?.footerLink || {}), floatingPosition: value }
                              })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bottom-left">Bottom Left</SelectItem>
                                <SelectItem value="bottom-right">Bottom Right</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {config.branding?.footerLink?.position === 'inline' && (
                          <div className="mt-4 p-4 bg-muted rounded-lg">
                            <p className="text-sm font-medium mb-2">Add this to your website footer:</p>
                            <code className="block p-3 bg-background rounded text-xs overflow-x-auto">
                              {`<a href="#" onclick="window.showCookiePreferences?.(); return false;" class="cookie-settings-link">${config.branding?.footerLink?.text || 'Cookie Settings'}</a>`}
                            </code>
                            <p className="text-xs text-muted-foreground mt-2">
                              This link will reopen the cookie banner when clicked.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Scripts Tab */}
              <TabsContent value="scripts" className="space-y-6" id="scripts-panel" role="tabpanel" aria-labelledby="scripts-tab">
                <Card>
                  <CardHeader>
                    <CardTitle>Tracking Scripts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Strictly Necessary Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-green-600" />
                        Strictly Necessary Scripts
                        {config.scripts.strictlyNecessary.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.strictlyNecessary.filter(s => s.enabled && s.scriptCode.trim()).length}
                          </Badge>
                        )}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.strictlyNecessary.map((script, index) => (
                          <div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput
                                  value={script.name}
                                  onChange={(value) => {
                                    const newScripts = [...config.scripts.strictlyNecessary]
                                    newScripts[index].name = value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                    }))
                                  }}
                                  category="strictly-necessary"
                                  placeholder="Script name"
                                />
                                {script.scriptCode.trim() && (
                                  <Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  script.enabled ? (
                                    <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        const newScripts = [...config.scripts.strictlyNecessary]
                                        newScripts[index].enabled = true
                                        setConfig(prev => ({
                                          ...prev,
                                          scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                        }))
                                        toast.success(`"${script.name || 'Script'}" added to generated code!`)
                                      }}
                                    >
                                      Add Script
                                    </Button>
                                  )
                                ) : null}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newScripts = config.scripts.strictlyNecessary.filter((_, i) => i !== index)
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                    }))
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            {script.scriptCode.trim() && (
                              <div className="px-3 pb-3">
                                <textarea
                                  value={script.scriptCode}
                                  onChange={(e) => {
                                    const newScripts = [...config.scripts.strictlyNecessary]
                                    newScripts[index].scriptCode = e.target.value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                    }))
                                  }}
                                  placeholder="Paste your script code here..."
                                  className="w-full h-20 p-2 text-xs font-mono border rounded resize-none"
                                />
                              </div>
                            )}
                            {!script.scriptCode.trim() && (
                              <div className="px-3 pb-3">
                                <textarea
                                  value={script.scriptCode}
                                  onChange={(e) => {
                                    const newScripts = [...config.scripts.strictlyNecessary]
                                    newScripts[index].scriptCode = e.target.value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                    }))
                                  }}
                                  placeholder="Paste your script code here..."
                                  className="w-full h-20 p-2 text-xs font-mono border rounded resize-none"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newScript = {
                              id: `strict-${Date.now()}`,
                              name: '',
                              category: 'strictly-necessary' as const,
                              scriptCode: '',
                              enabled: true
                            }
                            setConfig(prev => ({
                              ...prev,
                              scripts: {
                                ...prev.scripts,
                                strictlyNecessary: [...prev.scripts.strictlyNecessary, newScript]
                              }
                            }))
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Strictly Necessary Script
                        </Button>
                      </div>
                    </div>

                    {/* Functionality Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Settings className="mr-2 h-4 w-4 text-blue-600" />
                        Functionality Scripts
                        {config.scripts.functionality.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.functionality.filter(s => s.enabled && s.scriptCode.trim()).length}
                          </Badge>
                        )}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.functionality.map((script, index) => (
                          <div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput
                                  value={script.name}
                                  onChange={(value) => {
                                    const newScripts = [...config.scripts.functionality]
                                    newScripts[index].name = value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, functionality: newScripts }
                                    }))
                                  }}
                                  category="functionality"
                                  placeholder="Script name"
                                />
                                {script.scriptCode.trim() && (
                                  <Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  script.enabled ? (
                                    <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        const newScripts = [...config.scripts.functionality]
                                        newScripts[index].enabled = true
                                        setConfig(prev => ({
                                          ...prev,
                                          scripts: { ...prev.scripts, functionality: newScripts }
                                        }))
                                        toast.success(`"${script.name || 'Script'}" added to generated code!`)
                                      }}
                                    >
                                      Add Script
                                    </Button>
                                  )
                                ) : null}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newScripts = config.scripts.functionality.filter((_, i) => i !== index)
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, functionality: newScripts }
                                    }))
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="px-3 pb-3 space-y-3">
                              {!script.scriptCode.trim() && (
                                <div className="p-3 bg-muted/50 rounded-lg border">
                                  <Label className="text-xs font-medium mb-2 block">💬 What functionality are you adding?</Label>
                                  <Select onValueChange={(templateKey) => {
                                    const template = scriptTemplates[templateKey]
                                    if (template) {
                                      const newScripts = [...config.scripts.functionality]
                                      newScripts[index].name = template.name
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, functionality: newScripts }
                                      }))
                                    }
                                  }}>
                                    <SelectTrigger className="text-xs h-9">
                                      <SelectValue placeholder="Select tool (Intercom, Zendesk, etc.)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(scriptTemplates)
                                        .filter(([_, template]) => template.category === 'functionality')
                                        .map(([key, template]) => (
                                          <SelectItem key={key} value={key} className="text-xs">
                                            {template.name}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                  {script.name && scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || ''] && (
                                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded text-xs space-y-2">
                                      <p className="font-medium text-primary">
                                        📍 Where to find your {script.name} code:
                                      </p>
                                      <p className="text-muted-foreground">
                                        {scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || '']?.instructions}
                                      </p>
                                      <p className="text-muted-foreground">
                                        Copy the tracking code and paste it in the box below.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              <div>
                                <Label className="text-xs font-medium mb-2 block">
                                  {script.scriptCode.trim() ? 'Script Code:' : 'Paste your script code here:'}
                                </Label>
                                <textarea
                                  value={script.scriptCode}
                                  onChange={(e) => {
                                    const newScripts = [...config.scripts.functionality]
                                    newScripts[index].scriptCode = e.target.value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, functionality: newScripts }
                                    }))
                                  }}
                                  placeholder={`Paste your ${script.name || 'functionality'} code here...`}
                                  className="w-full h-32 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newScript = {
                              id: `func-${Date.now()}`,
                              name: '',
                              category: 'functionality' as const,
                              scriptCode: '',
                              enabled: true
                            }
                            setConfig(prev => ({
                              ...prev,
                              scripts: {
                                ...prev.scripts,
                                functionality: [...prev.scripts.functionality, newScript]
                              }
                            }))
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Functionality Script
                        </Button>
                      </div>
                    </div>

                    {/* Tracking & Performance Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <BarChart3 className="mr-2 h-4 w-4 text-yellow-600" />
                        Tracking & Performance Scripts
                        {config.scripts.trackingPerformance.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.trackingPerformance.filter(s => s.enabled && s.scriptCode.trim()).length}
                          </Badge>
                        )}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.trackingPerformance.map((script, index) => (
                          <div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput
                                  value={script.name}
                                  onChange={(value) => {
                                    const newScripts = [...config.scripts.trackingPerformance]
                                    newScripts[index].name = value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                    }))
                                  }}
                                  category="tracking-performance"
                                  placeholder="Script name"
                                />
                                {script.scriptCode.trim() && (
                                  <Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  script.enabled ? (
                                    <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        const newScripts = [...config.scripts.trackingPerformance]
                                        newScripts[index].enabled = true
                                        setConfig(prev => ({
                                          ...prev,
                                          scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                        }))
                                        toast.success(`"${script.name || 'Script'}" added to generated code!`)
                                      }}
                                    >
                                      Add Script
                                    </Button>
                                  )
                                ) : null}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newScripts = config.scripts.trackingPerformance.filter((_, i) => i !== index)
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                    }))
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="px-3 pb-3 space-y-3">
                              {!script.scriptCode.trim() && (
                                <div className="p-3 bg-muted/50 rounded-lg border">
                                  <Label className="text-xs font-medium mb-2 block">📊 What are you tracking?</Label>
                                  <Select onValueChange={(templateKey) => {
                                    const template = scriptTemplates[templateKey]
                                    if (template) {
                                      const newScripts = [...config.scripts.trackingPerformance]
                                      newScripts[index].name = template.name
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                      }))
                                    }
                                  }}>
                                    <SelectTrigger className="text-xs h-9">
                                      <SelectValue placeholder="Select tool (Google Analytics, Hotjar, etc.)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(scriptTemplates)
                                        .filter(([_, template]) => template.category === 'tracking-performance')
                                        .map(([key, template]) => (
                                          <SelectItem key={key} value={key} className="text-xs">
                                            {template.name}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                  {script.name && scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || ''] && (
                                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded text-xs space-y-2">
                                      <p className="font-medium text-primary">
                                        📍 Where to find your {script.name} code:
                                      </p>
                                      <p className="text-muted-foreground">
                                        {scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || '']?.instructions}
                                      </p>
                                      <p className="text-muted-foreground">
                                        Copy the tracking code and paste it in the box below.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              <div>
                                <Label className="text-xs font-medium mb-2 block">
                                  {script.scriptCode.trim() ? 'Script Code:' : 'Paste your tracking code here:'}
                                </Label>
                                <textarea
                                  value={script.scriptCode}
                                  onChange={(e) => {
                                    const newScripts = [...config.scripts.trackingPerformance]
                                    newScripts[index].scriptCode = e.target.value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                    }))
                                  }}
                                  placeholder={`Paste your ${script.name || 'tracking'} code here...`}
                                  className="w-full h-32 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newScript = {
                              id: `tracking-${Date.now()}`,
                              name: '',
                              category: 'tracking-performance' as const,
                              scriptCode: '',
                              enabled: true
                            }
                            setConfig(prev => ({
                              ...prev,
                              scripts: {
                                ...prev.scripts,
                                trackingPerformance: [...prev.scripts.trackingPerformance, newScript]
                              }
                            }))
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Tracking Script
                        </Button>
                      </div>
                    </div>

                    {/* Targeting & Advertising Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Target className="mr-2 h-4 w-4 text-red-600" />
                        Targeting & Advertising Scripts
                        {config.scripts.targetingAdvertising.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.targetingAdvertising.filter(s => s.enabled && s.scriptCode.trim()).length}
                          </Badge>
                        )}
                      </h4>
                      <div className="space-y-3">
                        {config.scripts.targetingAdvertising.map((script, index) => (
                          <div key={script.id} className="border rounded-lg">
                            <div className="flex items-center justify-between p-3">
                              <div className="flex items-center space-x-3">
                                <SmartScriptInput
                                  value={script.name}
                                  onChange={(value) => {
                                    const newScripts = [...config.scripts.targetingAdvertising]
                                    newScripts[index].name = value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                    }))
                                  }}
                                  category="targeting-advertising"
                                  placeholder="Script name"
                                />
                                {script.scriptCode.trim() && (
                                  <Badge variant={script.enabled ? "default" : "secondary"}>
                                    {script.enabled ? 'Active' : 'Inactive'}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  script.enabled ? (
                                    <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                      <span>Live</span>
                                    </div>
                                  ) : (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        const newScripts = [...config.scripts.targetingAdvertising]
                                        newScripts[index].enabled = true
                                        setConfig(prev => ({
                                          ...prev,
                                          scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                        }))
                                        toast.success(`"${script.name || 'Script'}" added to generated code!`)
                                      }}
                                    >
                                      Add Script
                                    </Button>
                                  )
                                ) : null}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    const newScripts = config.scripts.targetingAdvertising.filter((_, i) => i !== index)
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                    }))
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="px-3 pb-3 space-y-3">
                              {!script.scriptCode.trim() && (
                                <div className="p-3 bg-muted/50 rounded-lg border">
                                  <Label className="text-xs font-medium mb-2 block">🎯 What are you advertising with?</Label>
                                  <Select onValueChange={(templateKey) => {
                                    const template = scriptTemplates[templateKey]
                                    if (template) {
                                      const newScripts = [...config.scripts.targetingAdvertising]
                                      newScripts[index].name = template.name
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                      }))
                                    }
                                  }}>
                                    <SelectTrigger className="text-xs h-9">
                                      <SelectValue placeholder="Select tool (Facebook Pixel, Google Ads, etc.)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {Object.entries(scriptTemplates)
                                        .filter(([_, template]) => template.category === 'targeting-advertising')
                                        .map(([key, template]) => (
                                          <SelectItem key={key} value={key} className="text-xs">
                                            {template.name}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                  {script.name && scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || ''] && (
                                    <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded text-xs space-y-2">
                                      <p className="font-medium text-primary">
                                        📍 Where to find your {script.name} code:
                                      </p>
                                      <p className="text-muted-foreground">
                                        {scriptTemplates[Object.keys(scriptTemplates).find(k => scriptTemplates[k].name === script.name) || '']?.instructions}
                                      </p>
                                      <p className="text-muted-foreground">
                                        Copy the tracking code and paste it in the box below.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              <div>
                                <Label className="text-xs font-medium mb-2 block">
                                  {script.scriptCode.trim() ? 'Script Code:' : 'Paste your tracking code here:'}
                                </Label>
                                <textarea
                                  value={script.scriptCode}
                                  onChange={(e) => {
                                    const newScripts = [...config.scripts.targetingAdvertising]
                                    newScripts[index].scriptCode = e.target.value
                                    setConfig(prev => ({
                                      ...prev,
                                      scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                    }))
                                  }}
                                  placeholder={`Paste your ${script.name || 'advertising'} code here...`}
                                  className="w-full h-32 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newScript = {
                              id: `targeting-${Date.now()}`,
                              name: '',
                              category: 'targeting-advertising' as const,
                              scriptCode: '',
                              enabled: true
                            }
                            setConfig(prev => ({
                              ...prev,
                              scripts: {
                                ...prev.scripts,
                                targetingAdvertising: [...prev.scripts.targetingAdvertising, newScript]
                              }
                            }))
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Advertising Script
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Behavior Tab */}
              <TabsContent value="behavior" className="space-y-6" id="behavior-panel" role="tabpanel" aria-labelledby="behavior-tab">
                <Card className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Banner Behavior</CardTitle>
                      <NewBadge variant="sparkle" size="sm" />
                    </div>
                    <CardDescription>Configure how the banner behaves and interacts with users</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="auto-show"
                        checked={config.behavior.autoShow}
                        onCheckedChange={(checked) => updateConfig('behavior', { autoShow: checked })}
                      />
                      <Label htmlFor="auto-show">Auto-show banner</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dismiss-scroll"
                        checked={config.behavior.dismissOnScroll}
                        onCheckedChange={(checked) => updateConfig('behavior', { dismissOnScroll: checked })}
                      />
                      <Label htmlFor="dismiss-scroll">Dismiss on scroll</Label>
                    </div>

                    <div className="relative p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
                      <div className="absolute top-2 right-2">
                        <NewBadge variant="pulse" size="sm" />
                      </div>
                      <div className="flex items-center space-x-2 pr-16">
                        <Switch
                          id="show-preferences"
                          checked={config.behavior.showPreferences}
                          onCheckedChange={(checked) => updateConfig('behavior', { showPreferences: checked })}
                        />
                        <Label htmlFor="show-preferences" className="font-medium">
                          Show preferences button
                        </Label>
                      </div>
                      <p className="text-xs text-purple-600 mt-2 ml-6">
                        ✨ Enables the advanced preferences modal with cookie category toggles
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="cookie-expiry">Cookie Expiry (days)</Label>
                      <Input
                        id="cookie-expiry"
                        type="number"
                        value={config.behavior.cookieExpiry}
                        onChange={(e) => updateConfig('behavior', { cookieExpiry: parseInt(e.target.value) })}
                        min="1"
                        max="365"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" />
                      Performance Optimization
                    </CardTitle>
                    <CardDescription>
                      Optimize your banner's impact on page speed and Core Web Vitals
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="defer-scripts" className="text-sm font-medium">
                            Defer Non-Critical Scripts
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Load analytics and marketing scripts after page load
                          </p>
                        </div>
                        <Switch
                          id="defer-scripts"
                          checked={config.advanced.performance?.deferNonCriticalScripts ?? true}
                          onCheckedChange={(checked) => 
                            updateConfig('advanced', { 
                              performance: { ...(config.advanced.performance || {}), deferNonCriticalScripts: checked }
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="idle-callback" className="text-sm font-medium">
                            Use RequestIdleCallback
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Load scripts during browser idle time for better performance
                          </p>
                        </div>
                        <Switch
                          id="idle-callback"
                          checked={config.advanced.performance?.useRequestIdleCallback ?? true}
                          onCheckedChange={(checked) => 
                            updateConfig('advanced', { 
                              performance: { ...(config.advanced.performance || {}), useRequestIdleCallback: checked }
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="lazy-analytics" className="text-sm font-medium">
                            Lazy Load Analytics
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Delay analytics scripts until user interaction
                          </p>
                        </div>
                        <Switch
                          id="lazy-analytics"
                          checked={config.advanced.performance?.lazyLoadAnalytics ?? true}
                          onCheckedChange={(checked) => 
                            updateConfig('advanced', { 
                              performance: { ...(config.advanced.performance || {}), lazyLoadAnalytics: checked }
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="inline-css" className="text-sm font-medium">
                            Inline Critical CSS
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Prevent render-blocking by inlining banner styles
                          </p>
                        </div>
                        <Switch
                          id="inline-css"
                          checked={config.advanced.performance?.inlineCriticalCSS ?? true}
                          onCheckedChange={(checked) => 
                            updateConfig('advanced', { 
                              performance: { ...(config.advanced.performance || {}), inlineCriticalCSS: checked }
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Performance Benefits</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• <strong>Faster LCP:</strong> Deferred scripts don't block page rendering</li>
                        <li>• <strong>Better INP:</strong> Scripts load during idle time</li>
                        <li>• <strong>Reduced CLS:</strong> Inline CSS prevents layout shifts</li>
                        <li>• <strong>Improved TTFB:</strong> Non-blocking script loading</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Advanced Tab */}
              <TabsContent value="advanced" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Settings</CardTitle>
                    <CardDescription>Advanced configuration options</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="google-consent"
                        checked={config.advanced.googleConsentMode}
                        onCheckedChange={(checked) => updateConfig('advanced', { googleConsentMode: checked })}
                      />
                      <Label htmlFor="google-consent">Enable Google Consent Mode v2</Label>
                    </div>

                    <div>
                      <Label htmlFor="custom-css">Custom CSS</Label>
                      <textarea
                        id="custom-css"
                        className="w-full h-32 p-3 border rounded-md font-mono text-sm"
                        value={config.advanced.customCSS}
                        onChange={(e) => updateConfig('advanced', { customCSS: e.target.value })}
                        placeholder="/* Custom CSS styles */"
                      />
                    </div>

                    <div>
                      <Label htmlFor="custom-js">Custom JavaScript</Label>
                      <textarea
                        id="custom-js"
                        className="w-full h-32 p-3 border rounded-md font-mono text-sm"
                        value={config.advanced.customJS}
                        onChange={(e) => updateConfig('advanced', { customJS: e.target.value })}
                        placeholder="// Custom JavaScript code"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Eye className="mr-2 h-5 w-5" />
                    Live Preview
                  </CardTitle>
                  {config.behavior.showPreferences && (
                    <NewBadge variant="sparkle" size="sm" />
                  )}
                </div>
                {config.behavior.showPreferences && (
                  <CardDescription className="text-purple-600">
                    ✨ Try clicking the "Preferences" button to see the new modal!
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <BannerPreview config={config} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Copy This Code To Your Website
                </CardTitle>
            
              </CardHeader>
              <CardContent>
                <CodeGenerator config={config} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
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
import { BannerConfig, TrackingScript } from '@/types'

const defaultConfig: BannerConfig = {
  name: 'My Cookie Banner',
  position: 'bottom',
  theme: 'dark',
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

export default function BannerBuilderPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [config, setConfig] = useState<BannerConfig>(defaultConfig)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('design')
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
        // Ensure performance settings exist for backward compatibility
        const bannerConfig = {
          ...data.banner.config,
          advanced: {
            ...data.banner.config.advanced,
            performance: {
              deferNonCriticalScripts: true,
              useRequestIdleCallback: true,
              lazyLoadAnalytics: true,
              inlineCriticalCSS: true,
              ...data.banner.config.advanced?.performance
            }
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
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {isEditing ? 'Edit Banner' : 'Banner Builder'}
              </h1>
              <p className="text-muted-foreground">
                {isEditing ? 'Update your cookie consent banner' : 'Create and customize your cookie consent banner'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={handleSave} disabled={isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? 'Update Banner' : 'Save Banner'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="design">Design</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="scripts">Scripts</TabsTrigger>
                <TabsTrigger value="behavior">Behavior</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              {/* Design Tab */}
              <TabsContent value="design" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Settings</CardTitle>
                    <CardDescription>Configure the basic appearance of your banner</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="banner-name">Banner Name</Label>
                      <Input
                        id="banner-name"
                        value={config.name}
                        onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="My Cookie Banner"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="position">Position & Layout</Label>
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

                    <div>
                      <Label htmlFor="theme">Theme</Label>
                      <Select value={config.theme} onValueChange={handleThemeChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Layout Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Layout Settings</CardTitle>
                    <CardDescription>Customize the banner's layout, spacing, and visual effects</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="width">Width</Label>
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
                      </div>
                      
                      {config.layout.width === 'custom' && (
                        <div>
                          <Label htmlFor="custom-width">Custom Width (px)</Label>
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

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="border-radius">Border Radius (px)</Label>
                        <Input
                          id="border-radius"
                          type="number"
                          value={config.layout.borderRadius}
                          onChange={(e) => updateConfig('layout', { ...config.layout, borderRadius: parseInt(e.target.value) || 0 })}
                          placeholder="8"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="padding">Padding (px)</Label>
                        <Input
                          id="padding"
                          type="number"
                          value={config.layout.padding}
                          onChange={(e) => updateConfig('layout', { ...config.layout, padding: parseInt(e.target.value) || 20 })}
                          placeholder="20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="margin">Margin (px)</Label>
                        <Input
                          id="margin"
                          type="number"
                          value={config.layout.margin}
                          onChange={(e) => updateConfig('layout', { ...config.layout, margin: parseInt(e.target.value) || 20 })}
                          placeholder="20"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="shadow">Shadow</Label>
                        <Select value={config.layout.shadow} onValueChange={(value: any) => updateConfig('layout', { ...config.layout, shadow: value })}>
                          <SelectTrigger>
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

                    <div>
                      <Label htmlFor="animation">Animation</Label>
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

                <Card>
                  <CardHeader>
                    <CardTitle>Colors</CardTitle>
                    <CardDescription>Customize the color scheme</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bg-color">Background</Label>
                        <Input
                          id="bg-color"
                          type="color"
                          value={config.colors.background}
                          onChange={(e) => updateConfig('colors', { background: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="text-color">Text</Label>
                        <Input
                          id="text-color"
                          type="color"
                          value={config.colors.text}
                          onChange={(e) => updateConfig('colors', { text: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="button-color">Button</Label>
                        <Input
                          id="button-color"
                          type="color"
                          value={config.colors.button}
                          onChange={(e) => updateConfig('colors', { button: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="button-text-color">Button Text</Label>
                        <Input
                          id="button-text-color"
                          type="color"
                          value={config.colors.buttonText}
                          onChange={(e) => updateConfig('colors', { buttonText: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Content Tab */}
              <TabsContent value="content" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Banner Text</CardTitle>
                    <CardDescription>Customize the text content of your banner</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={config.text.title}
                        onChange={(e) => updateConfig('text', { title: e.target.value })}
                        placeholder="We use cookies"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Input
                        id="message"
                        value={config.text.message}
                        onChange={(e) => updateConfig('text', { message: e.target.value })}
                        placeholder="This website uses cookies..."
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="accept-text">Accept Button</Label>
                        <Input
                          id="accept-text"
                          value={config.text.acceptButton}
                          onChange={(e) => updateConfig('text', { acceptButton: e.target.value })}
                          placeholder="Accept All"
                        />
                      </div>
                      <div>
                        <Label htmlFor="reject-text">Reject Button</Label>
                        <Input
                          id="reject-text"
                          value={config.text.rejectButton}
                          onChange={(e) => updateConfig('text', { rejectButton: e.target.value })}
                          placeholder="Reject"
                        />
                      </div>
                      <div>
                        <Label htmlFor="preferences-text">Preferences Button</Label>
                        <Input
                          id="preferences-text"
                          value={config.text.preferencesButton}
                          onChange={(e) => updateConfig('text', { preferencesButton: e.target.value })}
                          placeholder="Preferences"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Branding</CardTitle>
                    <CardDescription>Add your logo and privacy policy link</CardDescription>
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
                          <Label htmlFor="logo-url">Logo URL</Label>
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
              </TabsContent>

              {/* Scripts Tab */}
              <TabsContent value="scripts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tracking Scripts</CardTitle>
                    <CardDescription>
                      Add your existing tracking scripts. They will only load after users accept the appropriate cookie consent.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Strictly Necessary Scripts */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-green-600" />
                        Strictly Necessary Scripts
                        <Badge variant="secondary" className="ml-2">Always Loaded</Badge>
                        {config.scripts.strictlyNecessary.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.strictlyNecessary.filter(s => s.enabled && s.scriptCode.trim()).length} inserted
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Essential scripts for website functionality (session management, security, etc.)
                      </p>
                      <div className="space-y-3">
                        {config.scripts.strictlyNecessary.map((script, index) => (
                          <div key={script.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <Input
                                value={script.name}
                                onChange={(e) => {
                                  const newScripts = [...config.scripts.strictlyNecessary]
                                  newScripts[index].name = e.target.value
                                  setConfig(prev => ({
                                    ...prev,
                                    scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                  }))
                                }}
                                placeholder="Script name (e.g., Session Management)"
                                className="font-medium"
                              />
                              <Button
                                variant="outline"
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
                              className="w-full h-24 p-2 text-sm font-mono border rounded"
                            />
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs text-muted-foreground">
                                {script.scriptCode.trim() && script.enabled 
                                  ? '✅ Script inserted and will be included in generated code' 
                                  : script.scriptCode.trim() 
                                    ? '📋 Script code ready - click "Insert Script" to add to generated code' 
                                    : '⚠️ Paste your script code above to get started'
                                }
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  <Button
                                    size="sm"
                                    variant={script.enabled ? "default" : "outline"}
                                    onClick={() => {
                                      const newScripts = [...config.scripts.strictlyNecessary]
                                      newScripts[index].enabled = !newScripts[index].enabled
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, strictlyNecessary: newScripts }
                                      }))
                                      toast.success(
                                        newScripts[index].enabled 
                                          ? `"${script.name || 'Script'}" inserted into generated code!`
                                          : `"${script.name || 'Script'}" removed from generated code!`
                                      )
                                    }}
                                  >
                                    {script.enabled ? '✓ Inserted' : 'Insert Script'}
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    disabled
                                  >
                                    Insert Script
                                  </Button>
                                )}
                              </div>
                            </div>
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
                        <Badge variant="secondary" className="ml-2">User Choice</Badge>
                        {config.scripts.functionality.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.functionality.filter(s => s.enabled && s.scriptCode.trim()).length} inserted
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Scripts that remember user choices and preferences
                      </p>
                      <div className="space-y-3">
                        {config.scripts.functionality.map((script, index) => (
                          <div key={script.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <Input
                                value={script.name}
                                onChange={(e) => {
                                  const newScripts = [...config.scripts.functionality]
                                  newScripts[index].name = e.target.value
                                  setConfig(prev => ({
                                    ...prev,
                                    scripts: { ...prev.scripts, functionality: newScripts }
                                  }))
                                }}
                                placeholder="Script name (e.g., User Preferences)"
                                className="font-medium"
                              />
                              <Button
                                variant="outline"
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
                              placeholder="Paste your script code here..."
                              className="w-full h-24 p-2 text-sm font-mono border rounded"
                            />
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs text-muted-foreground">
                                {script.scriptCode.trim() && script.enabled 
                                  ? '✅ Script inserted and will be included in generated code' 
                                  : script.scriptCode.trim() 
                                    ? '📋 Script code ready - click "Insert Script" to add to generated code' 
                                    : '⚠️ Paste your script code above to get started'
                                }
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  <Button
                                    size="sm"
                                    variant={script.enabled ? "default" : "outline"}
                                    onClick={() => {
                                      const newScripts = [...config.scripts.functionality]
                                      newScripts[index].enabled = !newScripts[index].enabled
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, functionality: newScripts }
                                      }))
                                      toast.success(
                                        newScripts[index].enabled 
                                          ? `"${script.name || 'Script'}" inserted into generated code!`
                                          : `"${script.name || 'Script'}" removed from generated code!`
                                      )
                                    }}
                                  >
                                    {script.enabled ? '✓ Inserted' : 'Insert Script'}
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    disabled
                                  >
                                    Insert Script
                                  </Button>
                                )}
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
                        <Badge variant="secondary" className="ml-2">User Choice</Badge>
                        {config.scripts.trackingPerformance.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.trackingPerformance.filter(s => s.enabled && s.scriptCode.trim()).length} inserted
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Analytics and performance monitoring (Google Analytics, Microsoft Clarity, etc.)
                      </p>
                      <div className="space-y-3">
                        {config.scripts.trackingPerformance.map((script, index) => (
                          <div key={script.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <Input
                                value={script.name}
                                onChange={(e) => {
                                  const newScripts = [...config.scripts.trackingPerformance]
                                  newScripts[index].name = e.target.value
                                  setConfig(prev => ({
                                    ...prev,
                                    scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                  }))
                                }}
                                placeholder="Script name (e.g., Google Analytics)"
                                className="font-medium"
                              />
                              <Button
                                variant="outline"
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
                              placeholder="Paste your Google Analytics or other tracking script here..."
                              className="w-full h-24 p-2 text-sm font-mono border rounded"
                            />
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs text-muted-foreground">
                                {script.scriptCode.trim() && script.enabled 
                                  ? '✅ Script inserted and will be included in generated code' 
                                  : script.scriptCode.trim() 
                                    ? '📋 Script code ready - click "Insert Script" to add to generated code' 
                                    : '⚠️ Paste your script code above to get started'
                                }
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  <Button
                                    size="sm"
                                    variant={script.enabled ? "default" : "outline"}
                                    onClick={() => {
                                      const newScripts = [...config.scripts.trackingPerformance]
                                      newScripts[index].enabled = !newScripts[index].enabled
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, trackingPerformance: newScripts }
                                      }))
                                      toast.success(
                                        newScripts[index].enabled 
                                          ? `"${script.name || 'Script'}" inserted into generated code!`
                                          : `"${script.name || 'Script'}" removed from generated code!`
                                      )
                                    }}
                                  >
                                    {script.enabled ? '✓ Inserted' : 'Insert Script'}
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    disabled
                                  >
                                    Insert Script
                                  </Button>
                                )}
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
                        <Badge variant="secondary" className="ml-2">User Choice</Badge>
                        {config.scripts.targetingAdvertising.filter(s => s.enabled && s.scriptCode.trim()).length > 0 && (
                          <Badge variant="default" className="ml-2">
                            {config.scripts.targetingAdvertising.filter(s => s.enabled && s.scriptCode.trim()).length} inserted
                          </Badge>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Marketing and advertising scripts (Facebook Pixel, Google Ads, etc.)
                      </p>
                      <div className="space-y-3">
                        {config.scripts.targetingAdvertising.map((script, index) => (
                          <div key={script.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <Input
                                value={script.name}
                                onChange={(e) => {
                                  const newScripts = [...config.scripts.targetingAdvertising]
                                  newScripts[index].name = e.target.value
                                  setConfig(prev => ({
                                    ...prev,
                                    scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                  }))
                                }}
                                placeholder="Script name (e.g., Facebook Pixel)"
                                className="font-medium"
                              />
                              <Button
                                variant="outline"
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
                              placeholder="Paste your Facebook Pixel or other advertising script here..."
                              className="w-full h-24 p-2 text-sm font-mono border rounded"
                            />
                            <div className="flex justify-between items-center mt-2">
                              <div className="text-xs text-muted-foreground">
                                {script.scriptCode.trim() && script.enabled 
                                  ? '✅ Script inserted and will be included in generated code' 
                                  : script.scriptCode.trim() 
                                    ? '📋 Script code ready - click "Insert Script" to add to generated code' 
                                    : '⚠️ Paste your script code above to get started'
                                }
                              </div>
                              <div className="flex items-center space-x-2">
                                {script.scriptCode.trim() ? (
                                  <Button
                                    size="sm"
                                    variant={script.enabled ? "default" : "outline"}
                                    onClick={() => {
                                      const newScripts = [...config.scripts.targetingAdvertising]
                                      newScripts[index].enabled = !newScripts[index].enabled
                                      setConfig(prev => ({
                                        ...prev,
                                        scripts: { ...prev.scripts, targetingAdvertising: newScripts }
                                      }))
                                      toast.success(
                                        newScripts[index].enabled 
                                          ? `"${script.name || 'Script'}" inserted into generated code!`
                                          : `"${script.name || 'Script'}" removed from generated code!`
                                      )
                                    }}
                                  >
                                    {script.enabled ? '✓ Inserted' : 'Insert Script'}
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    disabled
                                  >
                                    Insert Script
                                  </Button>
                                )}
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
              <TabsContent value="behavior" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Banner Behavior</CardTitle>
                    <CardDescription>Configure how the banner behaves</CardDescription>
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

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="show-preferences"
                        checked={config.behavior.showPreferences}
                        onCheckedChange={(checked) => updateConfig('behavior', { showPreferences: checked })}
                      />
                      <Label htmlFor="show-preferences">Show preferences button</Label>
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
                <CardTitle className="flex items-center">
                  <Eye className="mr-2 h-5 w-5" />
                  Live Preview
                </CardTitle>
                <CardDescription>See how your banner will look</CardDescription>
              </CardHeader>
              <CardContent>
                <BannerPreview config={config} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Generated Code
                </CardTitle>
                <CardDescription>Copy this code to your website</CardDescription>
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

'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Palette, Languages, Settings, Code, Copy, Check, ArrowRight, Zap, Shield, Globe } from 'lucide-react'
import { useSession } from 'next-auth/react'

export function InteractiveDemo() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState<'design' | 'scripts' | 'code'>('design')
  const [bannerTheme, setBannerTheme] = useState<'light' | 'dark'>('dark')
  const [bannerPosition, setBannerPosition] = useState<'top' | 'bottom' | 'floating'>('bottom')
  const [language, setLanguage] = useState<'en' | 'fr'>('en')
  const [showPreview, setShowPreview] = useState(true)
  const [copied, setCopied] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userWebsite, setUserWebsite] = useState('')
  const [trackingScripts, setTrackingScripts] = useState<Array<{id: string, name: string, scriptCode: string}>>([])
  const [advertisingScripts, setAdvertisingScripts] = useState<Array<{id: string, name: string, scriptCode: string}>>([])
  const [customTitle, setCustomTitle] = useState('We use cookies')
  const [customMessage, setCustomMessage] = useState('This website uses cookies to enhance your browsing experience.')
  const [customAccept, setCustomAccept] = useState('Accept All')
  const [customReject, setCustomReject] = useState('Reject')

  const translations = {
    en: {
      title: customTitle,
      message: customMessage,
      accept: customAccept,
      reject: customReject,
      preferences: 'Preferences'
    },
    fr: {
      title: 'Nous utilisons des cookies',
      message: 'Ce site web utilise des cookies pour améliorer votre expérience.',
      accept: 'Accepter tout',
      reject: 'Rejeter',
      preferences: 'Préférences'
    }
  }

  const colors = {
    light: {
      background: '#ffffff',
      text: '#1f2937',
      button: '#2A6270',
      buttonText: '#ffffff'
    },
    dark: {
      background: '#1f2937',
      text: '#ffffff',
      button: '#2A6270',
      buttonText: '#ffffff'
    }
  }

  const currentColors = colors[bannerTheme]
  const currentText = translations[language]

  const generateCode = () => {
    let config = {
      title: currentText.title,
      message: currentText.message,
      acceptButton: currentText.accept,
      rejectButton: currentText.reject,
      preferencesButton: currentText.preferences,
      position: bannerPosition,
      theme: bannerTheme,
      language: language
    }

    // Only add scripts if they're provided
    if (trackingScripts.length > 0) {
      config.trackingScripts = trackingScripts
    }
    if (advertisingScripts.length > 0) {
      config.advertisingScripts = advertisingScripts
    }

    const script = `
<!-- Cookie Consent Banner -->
<script>
  window.cookieConsentConfig = ${JSON.stringify(config, null, 2)};
</script>
<script src='https://cdn.yoursite.com/cookie-banner.js'></script>`

    return script.trim()
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(generateCode())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const addTrackingScript = () => {
    const newScript = {
      id: `script-${Date.now()}`,
      name: '',
      scriptCode: ''
    }
    setTrackingScripts([...trackingScripts, newScript])
  }

  const addAdvertisingScript = () => {
    const newScript = {
      id: `script-${Date.now()}`,
      name: '',
      scriptCode: ''
    }
    setAdvertisingScripts([...advertisingScripts, newScript])
  }

  const updateTrackingScript = (index: number, field: 'name' | 'scriptCode', value: string) => {
    const newScripts = [...trackingScripts]
    newScripts[index] = { ...newScripts[index], [field]: value }
    setTrackingScripts(newScripts)
  }

  const updateAdvertisingScript = (index: number, field: 'name' | 'scriptCode', value: string) => {
    const newScripts = [...advertisingScripts]
    newScripts[index] = { ...newScripts[index], [field]: value }
    setAdvertisingScripts(newScripts)
  }

  const removeTrackingScript = (index: number) => {
    setTrackingScripts(trackingScripts.filter((_, i) => i !== index))
  }

  const removeAdvertisingScript = (index: number) => {
    setAdvertisingScripts(advertisingScripts.filter((_, i) => i !== index))
  }

  const handleGetCode = () => {
    // Always require signup - no code without account
    const config = {
      theme: bannerTheme,
      position: bannerPosition,
      language,
      title: customTitle,
      message: customMessage,
      accept: customAccept,
      reject: customReject,
      trackingScripts,
      advertisingScripts,
      website: userWebsite,
      email: userEmail
    }
    
    // Store config in localStorage for after signup
    localStorage.setItem('bannerConfig', JSON.stringify(config))
    
    // Redirect to signup with their banner configuration
    window.location.href = '/auth/signup'
  }

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="mb-3 font-heading text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              Build Your First Banner
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              Customize your cookie banner and get the code. No technical skills needed.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Builder Controls */}
            <div className="space-y-6">
              {/* Tab Navigation */}
              <Card>
                <CardContent className="p-0">
                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="design" className="flex items-center gap-2">
                        <Palette className="h-4 w-4" />
                        Design
                      </TabsTrigger>
                      <TabsTrigger value="scripts" className="flex items-center gap-2">
                        <Settings className="h-4 w-4" />
                        Advanced
                      </TabsTrigger>
                      <TabsTrigger value="code" className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        Create Account
                      </TabsTrigger>
                    </TabsList>

                    {/* Design Tab */}
                    <TabsContent value="design" className="p-6 space-y-6">
                      <div>
                        <h3 className="mb-4 flex items-center gap-2 font-semibold">
                          <Palette className="h-5 w-5 text-primary" />
                          Appearance
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <Label className="mb-2 block text-sm font-medium">Theme</Label>
                            <div className="flex gap-2">
                              <Button
                                variant={bannerTheme === 'light' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setBannerTheme('light')}
                                className="flex-1"
                              >
                                ☀️ Light
                              </Button>
                              <Button
                                variant={bannerTheme === 'dark' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setBannerTheme('dark')}
                                className="flex-1"
                              >
                                🌙 Dark
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label className="mb-2 block text-sm font-medium">Position</Label>
                            <div className="grid grid-cols-3 gap-2">
                              <Button
                                variant={bannerPosition === 'top' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setBannerPosition('top')}
                              >
                                ⬆️ Top
                              </Button>
                              <Button
                                variant={bannerPosition === 'bottom' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setBannerPosition('bottom')}
                              >
                                ⬇️ Bottom
                              </Button>
                              <Button
                                variant={bannerPosition === 'floating' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setBannerPosition('floating')}
                              >
                                🎈 Floating
                              </Button>
                            </div>
                          </div>

                          <div>
                            <Label className="mb-2 block text-sm font-medium">Language</Label>
                            <div className="flex gap-2">
                              <Button
                                variant={language === 'en' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setLanguage('en')}
                                className="flex-1"
                              >
                                🇨🇦 English
                              </Button>
                              <Button
                                variant={language === 'fr' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setLanguage('fr')}
                                className="flex-1"
                              >
                                🇨🇦 Français
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-4 flex items-center gap-2 font-semibold">
                          <Languages className="h-5 w-5 text-primary" />
                          Custom Text
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="title">Banner Title</Label>
                            <Input
                              id="title"
                              value={customTitle}
                              onChange={(e) => setCustomTitle(e.target.value)}
                              placeholder="We use cookies"
                            />
                          </div>
                          <div>
                            <Label htmlFor="message">Banner Message</Label>
                            <Input
                              id="message"
                              value={customMessage}
                              onChange={(e) => setCustomMessage(e.target.value)}
                              placeholder="This website uses cookies to enhance your browsing experience."
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label htmlFor="accept">Accept Button</Label>
                              <Input
                                id="accept"
                                value={customAccept}
                                onChange={(e) => setCustomAccept(e.target.value)}
                                placeholder="Accept All"
                              />
                            </div>
                            <div>
                              <Label htmlFor="reject">Reject Button</Label>
                              <Input
                                id="reject"
                                value={customReject}
                                onChange={(e) => setCustomReject(e.target.value)}
                                placeholder="Reject"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Scripts Tab */}
                    <TabsContent value="scripts" className="p-6 space-y-6">
                      <div>
                        <h3 className="mb-6 font-semibold text-lg">Tracking Scripts</h3>
                        
                        {/* Tracking & Performance Scripts */}
                        <div className="mb-8">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                              <div className="w-4 h-4 bg-orange-500 rounded-sm flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-sm"></div>
                                <div className="w-1 h-3 bg-white rounded-sm ml-0.5"></div>
                                <div className="w-1 h-4 bg-white rounded-sm ml-0.5"></div>
                              </div>
                            </div>
                            <h4 className="font-semibold text-gray-900">Tracking & Performance Scripts</h4>
                          </div>
                          
                          {trackingScripts.map((script, index) => (
                            <div key={script.id} className="border rounded-lg p-4 mb-3">
                              <div className="flex items-center justify-between mb-3">
                                <Input
                                  placeholder="Script name (e.g., Google Analytics)"
                                  value={script.name}
                                  onChange={(e) => updateTrackingScript(index, 'name', e.target.value)}
                                  className="text-sm"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTrackingScript(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Remove
                                </Button>
                              </div>
                              <textarea
                                value={script.scriptCode}
                                onChange={(e) => updateTrackingScript(index, 'scriptCode', e.target.value)}
                                placeholder="Paste your tracking script code here..."
                                className="w-full h-24 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          ))}
                          
                          <Button
                            variant="outline"
                            onClick={addTrackingScript}
                            className="w-full border-dashed"
                          >
                            + Add Tracking Script
                          </Button>
                        </div>

                        {/* Targeting & Advertising Scripts */}
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                            </div>
                            <h4 className="font-semibold text-gray-900">Targeting & Advertising Scripts</h4>
                          </div>
                          
                          {advertisingScripts.map((script, index) => (
                            <div key={script.id} className="border rounded-lg p-4 mb-3">
                              <div className="flex items-center justify-between mb-3">
                                <Input
                                  placeholder="Script name (e.g., Facebook Pixel)"
                                  value={script.name}
                                  onChange={(e) => updateAdvertisingScript(index, 'name', e.target.value)}
                                  className="text-sm"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeAdvertisingScript(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Remove
                                </Button>
                              </div>
                              <textarea
                                value={script.scriptCode}
                                onChange={(e) => updateAdvertisingScript(index, 'scriptCode', e.target.value)}
                                placeholder="Paste your advertising script code here..."
                                className="w-full h-24 p-3 text-xs font-mono border rounded resize-none focus:ring-2 focus:ring-primary"
                              />
                            </div>
                          ))}
                          
                          <Button
                            variant="outline"
                            onClick={addAdvertisingScript}
                            className="w-full border-dashed"
                          >
                            + Add Advertising Script
                          </Button>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">Automatic Cookie Management</span>
                          </div>
                          <p className="text-xs text-blue-600">
                            These scripts will only load after users accept cookies, ensuring full GDPR compliance.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Get Code Tab */}
                    <TabsContent value="code" className="p-6 space-y-6">
                      <div className="text-center space-y-4">
                        <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg p-6">
                          <h3 className="text-lg font-semibold mb-2">Get Your Code</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Create a free account and we'll automatically set up your project with all the customizations you just made.
                          </p>
                          
                          <div className="space-y-3 mb-4">
                            <Input
                              type="email"
                              placeholder="Your email address"
                              value={userEmail}
                              onChange={(e) => setUserEmail(e.target.value)}
                            />
                            <Input
                              placeholder="Your website URL (optional)"
                              value={userWebsite}
                              onChange={(e) => setUserWebsite(e.target.value)}
                            />
                          </div>

                          <Button 
                            onClick={handleGetCode}
                            className="w-full"
                            disabled={!userEmail}
                          >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Create Account & Setup Project
                          </Button>

                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Check className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-800">What happens next:</span>
                            </div>
                            <div className="text-xs text-green-600 text-left space-y-1">
                              <div>✓ Account created instantly</div>
                              <div>✓ Your banner project saved with all settings</div>
                              <div>✓ Code generated and ready to copy</div>
                              <div>✓ No need to rebuild anything!</div>
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground mt-3">
                            ✓ Free forever for first 1,000 users<br/>
                            ✓ No credit card required<br/>
                            ✓ GDPR & PIPEDA compliant
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Live Preview */}
            <div className="relative">
              <div className="sticky top-24">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Code className="h-5 w-5 text-primary" />
                    Live Preview
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? 'Hide' : 'Show'} Banner
                  </Button>
                </div>

                {/* Browser Frame */}
                <Card className="overflow-hidden shadow-xl">
                  <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex-1 rounded bg-background px-3 py-1 text-xs text-muted-foreground">
                      {userWebsite || 'www.your-website.com'}
                    </div>
                  </div>

                  {/* Website Preview Area */}
                  <div className="relative h-96 bg-gradient-to-br from-muted/20 to-muted/40 p-8">
                    <div className="space-y-4">
                      <div className="h-8 w-48 rounded bg-muted/60"></div>
                      <div className="h-4 w-full rounded bg-muted/40"></div>
                      <div className="h-4 w-3/4 rounded bg-muted/40"></div>
                      <div className="h-4 w-5/6 rounded bg-muted/40"></div>
                      <div className="mt-6 h-32 rounded bg-muted/30"></div>
                    </div>

                    {/* Cookie Banner Overlay */}
                    {showPreview && (
                      <div
                        className={`absolute shadow-2xl transition-all duration-300 ${
                          bannerPosition === 'top' 
                            ? 'top-0 left-0 right-0' 
                            : bannerPosition === 'floating'
                            ? 'top-1/2 right-4 transform -translate-y-1/2 max-w-sm'
                            : 'bottom-0 left-0 right-0'
                        }`}
                        style={{
                          background: currentColors.background,
                          color: currentColors.text,
                          padding: bannerPosition === 'floating' ? '16px' : '20px',
                          borderRadius: bannerPosition === 'floating' ? '12px' : '0',
                          borderTop: bannerPosition === 'bottom' ? '1px solid rgba(0,0,0,0.1)' : 'none',
                          borderBottom: bannerPosition === 'top' ? '1px solid rgba(0,0,0,0.1)' : 'none'
                        }}
                      >
                        <div className={bannerPosition === 'floating' ? '' : 'mx-auto max-w-4xl'}>
                          <div className="mb-4">
                            <h3 className="mb-2 text-lg font-semibold" style={{ color: currentColors.text }}>
                              {currentText.title}
                            </h3>
                            <p className="text-sm opacity-90" style={{ color: currentColors.text }}>
                              {currentText.message}
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button
                              className="rounded px-4 py-2 text-sm font-medium transition-all hover:opacity-90"
                              style={{
                                background: currentColors.button,
                                color: currentColors.buttonText
                              }}
                              onClick={() => setShowPreview(false)}
                            >
                              {currentText.accept}
                            </button>
                            <button
                              className="rounded border px-4 py-2 text-sm font-medium transition-all hover:bg-black/5"
                              style={{
                                borderColor: currentColors.text,
                                color: currentColors.text,
                                background: 'transparent'
                              }}
                              onClick={() => setShowPreview(false)}
                            >
                              {currentText.reject}
                            </button>
                            <button
                              className="rounded px-4 py-2 text-sm font-medium transition-all hover:underline"
                              style={{
                                background: 'transparent',
                                color: currentColors.button
                              }}
                            >
                              {currentText.preferences}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Floating Cookie Settings Button (Demo) */}
                    {!showPreview && (
                      <div
                        className="absolute bottom-4 left-4 cursor-pointer rounded px-4 py-2 text-sm font-medium shadow-lg transition-all hover:opacity-90 hover:-translate-y-0.5"
                        style={{
                          background: currentColors.button,
                          color: currentColors.buttonText
                        }}
                        onClick={() => setShowPreview(true)}
                      >
                        {language === 'fr' ? 'Paramètres des cookies' : 'Cookie Settings'}
                      </div>
                    )}
                  </div>

                  <div className="border-t bg-muted/30 px-4 py-3 text-center text-xs text-muted-foreground">
                    👆 Your banner updates in real-time as you customize it!
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


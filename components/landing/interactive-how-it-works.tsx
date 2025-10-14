'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Code, Shield, Copy, Check, ArrowRight, Play } from 'lucide-react'

interface BannerConfig {
  title: string
  message: string
  acceptButton: string
  rejectButton: string
  position: 'top' | 'bottom' | 'floating'
  theme: 'light' | 'dark'
  colors: {
    background: string
    text: string
    button: string
    buttonText: string
  }
}

const defaultConfig: BannerConfig = {
  title: 'We use cookies',
  message: 'This website uses cookies to enhance your browsing experience.',
  acceptButton: 'Accept All',
  rejectButton: 'Reject',
  position: 'bottom',
  theme: 'light',
  colors: {
    background: '#ffffff',
    text: '#1f2937',
    button: '#2A6270',
    buttonText: '#ffffff'
  }
}

export function InteractiveHowItWorks() {
  const [config, setConfig] = useState<BannerConfig>(defaultConfig)
  const [activeStep, setActiveStep] = useState(1)
  const [copied, setCopied] = useState(false)

  const updateConfig = (key: keyof BannerConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const updateColors = (key: keyof BannerConfig['colors'], value: string) => {
    setConfig(prev => ({
      ...prev,
      colors: { ...prev.colors, [key]: value }
    }))
  }

  const generateCode = () => {
    const code = [
      '<!-- Cookie Consent Banner -->',
      '<script>',
      '  window.cookieConsentConfig = {',
      `    title: "${config.title}",`,
      `    message: "${config.message}",`,
      `    acceptButton: "${config.acceptButton}",`,
      `    rejectButton: "${config.rejectButton}",`,
      `    position: "${config.position}",`,
      `    theme: "${config.theme}",`,
      '    colors: {',
      `      background: "${config.colors.background}",`,
      `      text: "${config.colors.text}",`,
      `      button: "${config.colors.button}",`,
      `      buttonText: "${config.colors.buttonText}"`,
      '    }',
      '  };',
      '</script>',
      '<script src="https://cdn.yoursite.com/cookie-banner.js"></script>'
    ].join('\n')
    return code
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateCode())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const steps = [
    {
      id: 1,
      title: 'Customize Your Banner',
      description: 'Use our visual builder to create the perfect banner',
      icon: Palette
    },
    {
      id: 2,
      title: 'Get Your Code',
      description: 'Copy the generated code to your clipboard',
      icon: Code
    },
    {
      id: 3,
      title: 'Stay Compliant',
      description: 'Your banner is GDPR & PIPEDA compliant',
      icon: Shield
    }
  ]

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="mb-3 font-heading text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              How It Works
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              See how easy it is to create your perfect cookie banner in 3 simple steps
            </p>
          </div>

          {/* Step Indicators */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center gap-4">
                  <button
                    onClick={() => setActiveStep(step.id)}
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold transition-all ${
                      activeStep === step.id
                        ? 'bg-primary text-primary-foreground scale-110'
                        : 'bg-background border-2 border-primary/20 text-muted-foreground hover:border-primary/40'
                    }`}
                  >
                    {activeStep === step.id ? <step.icon className="h-5 w-5" /> : step.id}
                  </button>
                  {index < steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Content */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Side - Controls */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {(() => {
                      const IconComponent = steps[activeStep - 1].icon
                      return <IconComponent className="h-5 w-5 text-primary" />
                    })()}
                    {steps[activeStep - 1].title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {steps[activeStep - 1].description}
                  </p>
                </CardHeader>
                <CardContent>
                  {activeStep === 1 && (
                    <Tabs defaultValue="content" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="style">Style</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="content" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Banner Title</Label>
                          <Input
                            id="title"
                            value={config.title}
                            onChange={(e) => updateConfig('title', e.target.value)}
                            placeholder="We use cookies"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Input
                            id="message"
                            value={config.message}
                            onChange={(e) => updateConfig('message', e.target.value)}
                            placeholder="This website uses cookies..."
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="accept">Accept Button</Label>
                            <Input
                              id="accept"
                              value={config.acceptButton}
                              onChange={(e) => updateConfig('acceptButton', e.target.value)}
                              placeholder="Accept All"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="reject">Reject Button</Label>
                            <Input
                              id="reject"
                              value={config.rejectButton}
                              onChange={(e) => updateConfig('rejectButton', e.target.value)}
                              placeholder="Reject"
                            />
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="style" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="position">Position</Label>
                            <Select value={config.position} onValueChange={(value: any) => updateConfig('position', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="top">Top</SelectItem>
                                <SelectItem value="bottom">Bottom</SelectItem>
                                <SelectItem value="floating">Floating</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="theme">Theme</Label>
                            <Select value={config.theme} onValueChange={(value: any) => updateConfig('theme', value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Background Color</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={config.colors.background}
                                onChange={(e) => updateColors('background', e.target.value)}
                                className="h-10 w-16 p-1"
                              />
                              <Input
                                value={config.colors.background}
                                onChange={(e) => updateColors('background', e.target.value)}
                                className="flex-1"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Text Color</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={config.colors.text}
                                onChange={(e) => updateColors('text', e.target.value)}
                                className="h-10 w-16 p-1"
                              />
                              <Input
                                value={config.colors.text}
                                onChange={(e) => updateColors('text', e.target.value)}
                                className="flex-1"
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Button Color</Label>
                            <div className="flex gap-2">
                              <Input
                                type="color"
                                value={config.colors.button}
                                onChange={(e) => updateColors('button', e.target.value)}
                                className="h-10 w-16 p-1"
                              />
                              <Input
                                value={config.colors.button}
                                onChange={(e) => updateColors('button', e.target.value)}
                                className="flex-1"
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  )}

                  {activeStep === 2 && (
                    <div className="space-y-4">
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">
                          <code>{generateCode()}</code>
                        </pre>
                        <Button
                          onClick={handleCopy}
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2"
                        >
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          {copied ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Paste this code before the closing &lt;/body&gt; tag on your website
                      </p>
                    </div>
                  )}

                  {activeStep === 3 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium">GDPR Compliant</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-blue-600" />
                          <span className="text-sm font-medium">PIPEDA Compliant</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-purple-600" />
                          <span className="text-sm font-medium">CASL Compliant</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-orange-600" />
                          <span className="text-sm font-medium">CCPA Compliant</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Your banner automatically includes all necessary compliance features and legal text requirements.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                      disabled={activeStep === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      onClick={() => setActiveStep(Math.min(3, activeStep + 1))}
                      disabled={activeStep === 3}
                    >
                      Next
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Side - Live Preview */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <Play className="h-5 w-5 text-primary" />
                    Live Preview
                  </h3>
                  <div className="text-xs text-muted-foreground">
                    Updates in real-time
                  </div>
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
                      www.your-website.com
                    </div>
                  </div>

                  {/* Website Content */}
                  <div className="relative h-64 bg-gradient-to-br from-muted/20 to-muted/40 p-6">
                    <div className="space-y-3">
                      <div className="h-4 w-32 rounded bg-muted/60"></div>
                      <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-muted/40"></div>
                        <div className="h-3 w-3/4 rounded bg-muted/40"></div>
                        <div className="h-3 w-5/6 rounded bg-muted/40"></div>
                      </div>
                      <div className="mt-6 h-20 rounded bg-muted/30"></div>
                    </div>

                    {/* Cookie Banner */}
                    <div
                      className={`absolute z-50 transition-all duration-300 ${
                        config.position === 'top' 
                          ? 'top-4 left-4 right-4' 
                          : config.position === 'floating'
                          ? 'top-1/2 right-4 transform -translate-y-1/2 max-w-sm'
                          : 'bottom-4 left-4 right-4'
                      }`}
                      style={{
                        backgroundColor: config.colors.background,
                        color: config.colors.text,
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}
                    >
                      <h3 className="font-semibold text-base mb-2">
                        {config.title}
                      </h3>
                      
                      <p className="text-sm mb-4 leading-relaxed opacity-90">
                        {config.message}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          style={{
                            backgroundColor: config.colors.button,
                            color: config.colors.buttonText,
                          }}
                          className="hover:opacity-90"
                        >
                          {config.acceptButton}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          style={{
                            borderColor: config.colors.button,
                            color: config.colors.button,
                            backgroundColor: 'transparent'
                          }}
                          className="hover:bg-opacity-10"
                        >
                          {config.rejectButton}
                        </Button>
                      </div>
                    </div>
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

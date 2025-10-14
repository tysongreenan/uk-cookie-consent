'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Palette, Code, Shield, Check, ArrowRight, Play, Zap, Clock, Globe, Copy } from 'lucide-react'

const steps = [
  {
    id: 1,
    title: 'Customize',
    description: 'Build your banner',
    icon: Palette,
    content: {
      heading: 'Customize Your Banner',
      description: 'Design your perfect cookie banner in seconds.',
      features: [
        'Match your brand colors',
        'Choose position & style',
        'Edit text instantly',
        'Live preview'
      ]
    }
  },
  {
    id: 2,
    title: 'Copy Code',
    description: 'Get your code',
    icon: Code,
    content: {
      heading: 'Copy & Paste',
      description: 'One-click code generation. No technical skills needed.',
      features: [
        'Generated in seconds',
        'Works everywhere',
        'Mobile optimized',
        'Copy with one click'
      ]
    }
  },
  {
    id: 3,
    title: 'Compliant',
    description: 'Stay legal',
    icon: Shield,
    content: {
      heading: 'Automatically Compliant',
      description: 'Built-in legal compliance for all major regulations.',
      features: [
        'GDPR ready',
        'PIPEDA compliant',
        'CASL & CCPA included',
        'Always up-to-date'
      ]
    }
  }
]

export function HowItWorksShowcase() {
  const [activeStep, setActiveStep] = useState(1)
  const [animationStep, setAnimationStep] = useState(0)
  const [copied, setCopied] = useState(false)
  const [showCodeEditor, setShowCodeEditor] = useState(false)

  const currentStep = steps.find(step => step.id === activeStep) || steps[0]

  // Animation configurations for each step
  const animationConfigs = {
    1: [ // Customize step animations
      { position: 'bottom', colors: { bg: '#ffffff', text: '#1f2937', button: '#2A6270' }, delay: 0 },
      { position: 'top', colors: { bg: '#f3f4f6', text: '#374151', button: '#059669' }, delay: 1500 },
      { position: 'floating', colors: { bg: '#1f2937', text: '#ffffff', button: '#dc2626' }, delay: 3000 },
      { position: 'bottom', colors: { bg: '#ffffff', text: '#1f2937', button: '#2A6270' }, delay: 4500 }
    ],
    2: [ // Copy code step animations
      { showCode: false, showScripts: false, delay: 0 },
      { showCode: true, showScripts: false, delay: 1000 },
      { showCode: true, showScripts: true, delay: 2000 }
    ],
    3: [ // Done step animations - realistic user flow (slower for readability)
      { step: 'banner', delay: 0 },
      { step: 'customize', delay: 2500 },
      { step: 'accept', delay: 4000 },
      { step: 'analytics', delay: 6000 },
      { step: 'preferences', delay: 8000 },
      { step: 'reject', delay: 10000 },
      { step: 'compliance', delay: 12000 }
    ]
  }

  const currentAnimation = animationConfigs[activeStep as keyof typeof animationConfigs]?.[animationStep] || animationConfigs[1][0]

  // Auto-advance animations
  useEffect(() => {
    const configs = animationConfigs[activeStep as keyof typeof animationConfigs]
    if (!configs) return

    const timers = configs.map((config, index) => {
      return setTimeout(() => {
        setAnimationStep(index)
      }, config.delay)
    })

    // Reset animation step when changing tabs
    setAnimationStep(0)

    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [activeStep])

  // Handle copy for step 2
  const handleCopy = async () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="mb-4 font-heading text-3xl font-bold sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-primary">
              <span>1.</span>
              <span>Customize</span>
              <ArrowRight className="h-4 w-4" />
              <span>2.</span>
              <span>Copy</span>
              <ArrowRight className="h-4 w-4" />
              <span>3.</span>
              <span>Done</span>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Side - Process Tabs */}
            <div className="space-y-6">
              <Tabs value={activeStep.toString()} onValueChange={(value) => setActiveStep(parseInt(value))}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="1" className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    <span>Customize</span>
                  </TabsTrigger>
                  <TabsTrigger value="2" className="flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    <span>Copy Code</span>
                  </TabsTrigger>
                  <TabsTrigger value="3" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Done</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeStep.toString()} className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <currentStep.icon className="h-5 w-5 text-primary" />
                        {currentStep.content.heading}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground font-medium">
                        {currentStep.content.description}
                      </p>
                      
                      <ul className="space-y-1">
                        {currentStep.content.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {activeStep === 3 && (
                        <div className="pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-950">
                              <Shield className="h-5 w-5 text-green-600" />
                              <span className="text-sm font-medium">GDPR</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950">
                              <Shield className="h-5 w-5 text-blue-600" />
                              <span className="text-sm font-medium">PIPEDA</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-purple-50 dark:bg-purple-950">
                              <Shield className="h-5 w-5 text-purple-600" />
                              <span className="text-sm font-medium">CASL</span>
                            </div>
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-50 dark:bg-orange-950">
                              <Shield className="h-5 w-5 text-orange-600" />
                              <span className="text-sm font-medium">CCPA</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Benefits */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <Zap className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-green-700 dark:text-green-300">No Coding</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <Clock className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-300">5 Min Setup</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                  <Globe className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs font-bold text-purple-700 dark:text-purple-300">Any Website</p>
                </div>
              </div>
            </div>

            {/* Right Side - Live Preview */}
            <div className="relative">
              <div className="sticky top-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-semibold text-lg">
                    <Play className="h-5 w-5 text-primary" />
                    {activeStep === 1 ? 'Customization Demo' : activeStep === 2 ? 'Code Integration' : 'Final Result'}
                  </h3>
                  <div className="text-xs text-green-600 font-semibold bg-green-50 dark:bg-green-950 px-2 py-1 rounded-full">
                    {activeStep === 1 ? 'Animating' : 'Live Demo'}
                  </div>
                </div>

                {/* Step 1: Customization Animation */}
                {activeStep === 1 && (
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

                    <div className="relative h-80 bg-gradient-to-br from-muted/20 to-muted/40 p-6">
                      <div className="space-y-3">
                        <div className="h-4 w-32 rounded bg-muted/60"></div>
                        <div className="space-y-2">
                          <div className="h-3 w-full rounded bg-muted/40"></div>
                          <div className="h-3 w-3/4 rounded bg-muted/40"></div>
                          <div className="h-3 w-5/6 rounded bg-muted/40"></div>
                        </div>
                        <div className="mt-6 h-24 rounded bg-muted/30"></div>
                      </div>

                      {/* Animated Cookie Banner */}
                      {'position' in currentAnimation && 'colors' in currentAnimation && (
                        <div
                          className={`absolute z-50 transition-all duration-700 ease-in-out ${
                            currentAnimation.position === 'top' 
                              ? 'top-4 left-4 right-4' 
                              : currentAnimation.position === 'floating'
                              ? 'top-1/2 right-4 transform -translate-y-1/2 max-w-sm'
                              : 'bottom-4 left-4 right-4'
                          }`}
                          style={{
                            backgroundColor: currentAnimation.colors.bg,
                            color: currentAnimation.colors.text,
                            borderRadius: '8px',
                            padding: '16px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                          }}
                        >
                        <h3 className="font-semibold text-base mb-2">
                          We use cookies
                        </h3>
                        
                        <p className="text-sm mb-4 leading-relaxed opacity-90">
                          This website uses cookies to enhance your browsing experience.
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            style={{
                              backgroundColor: currentAnimation.colors.button,
                              color: '#ffffff',
                            }}
                            className="hover:opacity-90"
                          >
                            Accept All
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            style={{
                              borderColor: currentAnimation.colors.button,
                              color: currentAnimation.colors.button,
                              backgroundColor: 'transparent'
                            }}
                            className="hover:bg-opacity-10"
                          >
                            Reject
                          </Button>
                        </div>
                        </div>
                      )}
                    </div>
                  </Card>
                )}

                {/* Step 2: Code Integration Animation */}
                {activeStep === 2 && (
                  <Card className="overflow-hidden shadow-xl">
                    <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2">
                      <div className="flex gap-1.5">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="flex-1 rounded bg-background px-3 py-1 text-xs text-muted-foreground">
                        {showCodeEditor ? 'Code Editor' : 'Website Builder Settings'}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Webflow</span>
                        <button
                          onClick={() => setShowCodeEditor(!showCodeEditor)}
                          className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              showCodeEditor ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className="text-xs text-muted-foreground">Code</span>
                      </div>
                    </div>

                    {showCodeEditor ? (
                      /* Code Editor View */
                      <div className="relative h-80 bg-gray-900 text-gray-100 p-4 font-mono text-xs overflow-hidden">
                        {/* Website HTML */}
                        <div className="space-y-1 opacity-60">
                          <div>&lt;!DOCTYPE html&gt;</div>
                          <div>&lt;html&gt;</div>
                          <div>&nbsp;&nbsp;&lt;head&gt;</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;title&gt;My Website&lt;/title&gt;</div>
                          <div>&nbsp;&nbsp;&lt;/head&gt;</div>
                          <div>&nbsp;&nbsp;&lt;body&gt;</div>
                          <div>&nbsp;&nbsp;&nbsp;&nbsp;&lt;h1&gt;Welcome to my site&lt;/h1&gt;</div>
                        </div>

                        {/* Cookie Banner Code - appears with animation */}
                        {'showCode' in currentAnimation && currentAnimation.showCode && (
                          <div className="space-y-1 mt-4 border-l-2 border-green-500 pl-4 animate-pulse">
                            <div className="text-green-400">&lt;!-- Cookie Consent Banner --&gt;</div>
                            <div>&lt;script&gt;</div>
                            <div>&nbsp;&nbsp;window.cookieConsentConfig = {'{'}</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;title: "We use cookies",</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;message: "This website uses cookies...",</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;acceptButton: "Accept All",</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;rejectButton: "Reject"</div>
                            <div>&nbsp;&nbsp;{'}'};</div>
                            <div>&lt;/script&gt;</div>
                            <div>&lt;script src="https://cdn.yoursite.com/cookie-banner.js"&gt;&lt;/script&gt;</div>
                            
                            {/* Copy button */}
                            <div className="mt-2">
                              <Button
                                onClick={handleCopy}
                                size="sm"
                                variant="outline"
                                className="text-xs"
                              >
                                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                {copied ? 'Copied!' : 'Copy Code'}
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* Integration Scripts - appear after code */}
                        {'showScripts' in currentAnimation && currentAnimation.showScripts && (
                          <div className="space-y-1 mt-4 border-l-2 border-blue-500 pl-4 animate-pulse">
                            <div className="text-blue-400">&lt;!-- Google Tag Manager --&gt;</div>
                            <div>&lt;script&gt;</div>
                            <div>&nbsp;&nbsp;(function(w,d,s,l,i){'{'}</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;w[l]=w[l]||[];w[l].push({'{'}'gtm.start'{'}':</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;new Date().getTime(),event:{'{'}'gtm.js'{'}'}{'{'}});</div>
                            <div>&nbsp;&nbsp;var f=d.getElementsByTagName(s)[0],</div>
                            <div>&nbsp;&nbsp;j=d.createElement(s),dl=l!={'{'}'dataLayer'{'}'}?{'{'}'&l='{'}':+l:{'{'}'{'{'}};</div>
                            <div>&nbsp;&nbsp;j.async=true;j.src={'{'}'https://www.googletagmanager.com/gtm.js?id='{'}':+i+dl;</div>
                            <div>&nbsp;&nbsp;f.parentNode.insertBefore(j,f);</div>
                            <div>&nbsp;&nbsp;{'}'})(window,document,{'{'}'script'{'}'},{'{'}'dataLayer'{'}'},{'{'}'GTM-XXXXXX'{'}'});</div>
                            <div>&lt;/script&gt;</div>
                            
                            <div className="text-blue-400 mt-2">&lt;!-- Microsoft Clarity --&gt;</div>
                            <div>&lt;script type="text/javascript"&gt;</div>
                            <div>&nbsp;&nbsp;(function(c,l,a,r,i,t,y){'{'}</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;c[a]=c[a]||function(){'{'}(c[a].q=c[a].q||[]).push(arguments){'}'};</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;t=l.createElement(r);t.async=1;t.src={'{'}'https://www.clarity.ms/tag/'{'}':+i;</div>
                            <div>&nbsp;&nbsp;&nbsp;&nbsp;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);</div>
                            <div>&nbsp;&nbsp;{'}'})(window, document, {'{'}'clarity'{'}'}, {'{'}'script'{'}'}, {'{'}'XXXXXXXXXX'{'}'});</div>
                            <div>&lt;/script&gt;</div>
                          </div>
                        )}

                        <div className="space-y-1 mt-4 opacity-60">
                          <div>&nbsp;&nbsp;&lt;/body&gt;</div>
                          <div>&lt;/html&gt;</div>
                        </div>
                      </div>
                    ) : (
                      /* Website Builder Settings View */
                      <div className="relative h-80 bg-white p-4 text-gray-900">
                        {/* Webflow-like Interface */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 pb-3 border-b">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <h3 className="font-semibold text-sm">Site Settings</h3>
                          </div>

                          {/* Custom Code Section */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-sm font-medium">Custom Code</label>
                              <span className="text-xs text-gray-500">Before &lt;/body&gt; tag</span>
                            </div>

                            {/* Code Input Area */}
                            {'showCode' in currentAnimation && currentAnimation.showCode && (
                              <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 animate-pulse">
                                <textarea
                                  className="w-full h-24 text-xs font-mono bg-transparent border-none resize-none focus:outline-none"
                                  placeholder="Paste your code here..."
                                  defaultValue="<!-- Cookie Consent Banner -->
<script>
  window.cookieConsentConfig = {
    title: 'We use cookies',
    message: 'This website uses cookies...',
    acceptButton: 'Accept All',
    rejectButton: 'Reject'
  };
</script>
<script src='https://cdn.yoursite.com/cookie-banner.js'></script>"
                                  readOnly
                                />
                              </div>
                            )}

                            {/* Copy Button */}
                            {'showCode' in currentAnimation && currentAnimation.showCode && (
                              <div className="flex justify-between items-center">
                                <Button
                                  onClick={handleCopy}
                                  size="sm"
                                  className="text-xs"
                                >
                                  {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                  {copied ? 'Copied!' : 'Copy Code'}
                                </Button>
                                <span className="text-xs text-green-600 font-medium">✓ Ready to paste</span>
                              </div>
                            )}

                            {/* Integration Scripts */}
                            {'showScripts' in currentAnimation && currentAnimation.showScripts && (
                              <div className="space-y-2 mt-4 animate-pulse">
                                <div className="text-xs text-gray-600 font-medium">Analytics Integration</div>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded border border-blue-200">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-xs text-blue-700">Google Tag Manager detected</span>
                                  </div>
                                  <div className="flex items-center gap-2 p-2 bg-purple-50 rounded border border-purple-200">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span className="text-xs text-purple-700">Microsoft Clarity detected</span>
                                  </div>
                                </div>
                                <div className="text-xs text-green-600 font-medium">✓ Automatically integrated</div>
                              </div>
                            )}

                            {/* Universal Integration Showcase */}
                            <div className="space-y-2 mt-4">
                              <div className="text-xs text-gray-600 font-medium">🔧 Works Everywhere</div>
                              <div className="grid grid-cols-3 gap-1.5">
                                <div className="flex items-center gap-1 bg-blue-50 rounded p-1.5 border border-blue-200">
                                  <div className="w-3 h-3 bg-blue-500 rounded text-xs flex items-center justify-center text-white font-bold">W</div>
                                  <span className="text-xs text-blue-700">WordPress</span>
                                </div>
                                <div className="flex items-center gap-1 bg-green-50 rounded p-1.5 border border-green-200">
                                  <div className="w-3 h-3 bg-green-500 rounded text-xs flex items-center justify-center text-white font-bold">S</div>
                                  <span className="text-xs text-green-700">Shopify</span>
                                </div>
                                <div className="flex items-center gap-1 bg-purple-50 rounded p-1.5 border border-purple-200">
                                  <div className="w-3 h-3 bg-purple-500 rounded text-xs flex items-center justify-center text-white font-bold">W</div>
                                  <span className="text-xs text-purple-700">Webflow</span>
                                </div>
                                <div className="flex items-center gap-1 bg-pink-50 rounded p-1.5 border border-pink-200">
                                  <div className="w-3 h-3 bg-pink-500 rounded text-xs flex items-center justify-center text-white font-bold">W</div>
                                  <span className="text-xs text-pink-700">Wix</span>
                                </div>
                                <div className="flex items-center gap-1 bg-orange-50 rounded p-1.5 border border-orange-200">
                                  <div className="w-3 h-3 bg-orange-500 rounded text-xs flex items-center justify-center text-white font-bold">C</div>
                                  <span className="text-xs text-orange-700">Custom</span>
                                </div>
                                <div className="flex items-center gap-1 bg-indigo-50 rounded p-1.5 border border-indigo-200">
                                  <div className="w-3 h-3 bg-indigo-500 rounded text-xs flex items-center justify-center text-white font-bold">+</div>
                                  <span className="text-xs text-indigo-700">Any Platform</span>
                                </div>
                              </div>
                              <div className="text-xs text-gray-500">No platform limitations - works on any website</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                )}

                {/* Step 3: Final Result Animation - Realistic User Flow */}
                {activeStep === 3 && (
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

                    <div className="relative h-80 bg-gradient-to-br from-muted/20 to-muted/40 p-6">
                      <div className="space-y-3">
                        <div className="h-4 w-32 rounded bg-muted/60"></div>
                        <div className="space-y-2">
                          <div className="h-3 w-full rounded bg-muted/40"></div>
                          <div className="h-3 w-3/4 rounded bg-muted/40"></div>
                          <div className="h-3 w-5/6 rounded bg-muted/40"></div>
                        </div>
                        <div className="mt-6 h-24 rounded bg-muted/30"></div>
                      </div>

                      {/* Step 1: Cookie Banner appears */}
                      {currentAnimation.step === 'banner' && (
                        <div className="absolute bottom-4 right-4 z-50 max-w-sm bg-white rounded-lg p-4 shadow-lg border transition-all duration-500">
                          <h3 className="font-semibold text-base mb-2 text-gray-900">
                            We use cookies
                          </h3>
                          
                          <p className="text-sm mb-4 leading-relaxed text-gray-600">
                            This website uses cookies to enhance your browsing experience.
                          </p>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              className="bg-primary text-primary-foreground hover:opacity-90"
                            >
                              Accept All
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary text-primary hover:bg-primary/10"
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Step 1.5: Banner Customization Showcase */}
                      {currentAnimation.step === 'customize' && (
                        <div className="absolute bottom-4 right-4 z-50 max-w-sm bg-white rounded-lg p-4 shadow-lg border transition-all duration-500">
                          {/* Customization Controls */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                <img 
                                  src="/logos/logo.svg" 
                                  alt="Logo" 
                                  className="w-4 h-4 text-white"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                    e.currentTarget.nextElementSibling.style.display = 'block'
                                  }}
                                />
                                <Shield className="h-3 w-3 text-white hidden" />
                              </div>
                              <span className="text-sm font-semibold text-gray-900">🎨 Customize Banner</span>
                            </div>
                            
                            {/* Color Customization */}
                            <div className="space-y-2">
                              <div className="text-xs text-gray-600">Colors:</div>
                              <div className="flex gap-2">
                                <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-blue-600"></div>
                                <div className="w-6 h-6 bg-green-500 rounded-full border border-gray-300"></div>
                                <div className="w-6 h-6 bg-purple-500 rounded-full border border-gray-300"></div>
                                <div className="w-6 h-6 bg-primary rounded-full border border-gray-300"></div>
                              </div>
                            </div>
                            
                            {/* Position Options */}
                            <div className="space-y-2">
                              <div className="text-xs text-gray-600">Position:</div>
                              <div className="flex gap-1">
                                <div className="px-2 py-1 bg-primary text-white text-xs rounded">Bottom</div>
                                <div className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">Top</div>
                                <div className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">Floating</div>
                              </div>
                            </div>
                          </div>

                          <h3 className="font-semibold text-base mb-2 text-gray-900">
                            We use cookies
                          </h3>
                          
                          <p className="text-sm mb-4 leading-relaxed text-gray-600">
                            This website uses cookies to enhance your browsing experience.
                          </p>

                          <div className="flex flex-wrap gap-2">
                            <Button
                              size="sm"
                              className="bg-primary text-primary-foreground hover:opacity-90"
                            >
                              Accept All
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-primary text-primary hover:bg-primary/10"
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Step 2: User clicks Accept - Banner disappears with success animation */}
                      {currentAnimation.step === 'accept' && (
                        <div className="absolute bottom-4 right-4 z-50 max-w-sm bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg transition-all duration-500">
                          <div className="flex items-center gap-2 mb-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-semibold text-green-800">Cookies Accepted</span>
                          </div>
                          <p className="text-sm text-green-600">
                            Analytics and marketing cookies enabled
                          </p>
                        </div>
                      )}

                      {/* Step 3: Analytics notifications appear */}
                      {currentAnimation.step === 'analytics' && (
                        <div className="absolute top-4 left-4 z-50 space-y-2">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 transition-all duration-500">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm text-blue-700 font-medium">Google Tag Manager</span>
                            </div>
                            <p className="text-sm text-blue-600 mt-1">Analytics tracking activated</p>
                          </div>
                          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 transition-all duration-500">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span className="text-sm text-purple-700 font-medium">Microsoft Clarity</span>
                            </div>
                            <p className="text-sm text-purple-600 mt-1">User behavior tracking enabled</p>
                          </div>
                        </div>
                      )}

                      {/* Step 4: Cookie Preferences modal with customization and logo */}
                      {currentAnimation.step === 'preferences' && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-80 bg-white rounded-lg p-6 shadow-xl border transition-all duration-500">
                          {/* Header with Logo */}
                          <div className="flex items-center gap-3 mb-4 pb-3 border-b">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                              <img 
                                src="/logos/logo.svg" 
                                alt="Your Logo" 
                                className="w-5 h-5 text-white"
                                onError={(e) => {
                                  // Fallback if logo doesn't load
                                  e.currentTarget.style.display = 'none'
                                  e.currentTarget.nextElementSibling.style.display = 'block'
                                }}
                              />
                              <Shield className="h-4 w-4 text-white hidden" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">Cookie Preferences</h3>
                              <p className="text-xs text-gray-500">Customize your experience</p>
                            </div>
                          </div>
                          
                          {/* Customization Features */}
                          <div className="space-y-3 mb-4">
                            <div className="text-xs text-gray-600 font-medium">🎨 Fully Customizable</div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">Necessary Cookies</span>
                              <div className="w-8 h-4 bg-primary rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">Analytics</span>
                              <div className="w-8 h-4 bg-primary rounded-full"></div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">Marketing</span>
                              <div className="w-8 h-4 bg-gray-300 rounded-full"></div>
                            </div>
                          </div>

                          {/* Brand Integration Showcase */}
                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <div className="text-xs text-gray-600 font-medium mb-2">✨ Brand Integration</div>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                <img 
                                  src="/logos/logo.svg" 
                                  alt="Logo" 
                                  className="w-4 h-4 text-white"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                    e.currentTarget.nextElementSibling.style.display = 'block'
                                  }}
                                />
                                <Shield className="h-3 w-3 text-white hidden" />
                              </div>
                              <span className="text-xs text-gray-600">Your logo appears on consent banners</span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="bg-primary text-primary-foreground">
                              Save Preferences
                            </Button>
                            <Button variant="outline" size="sm">
                              Accept All
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Step 5: User clicks Reject */}
                      {currentAnimation.step === 'reject' && (
                        <div className="absolute bottom-4 right-4 z-50 max-w-sm bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg transition-all duration-500">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-semibold text-red-800">Cookies Declined</span>
                          </div>
                          <p className="text-sm text-red-600">
                            Only necessary cookies will be used
                          </p>
                        </div>
                      )}

                      {/* Step 6: Compliance confirmation */}
                      {currentAnimation.step === 'compliance' && (
                        <div className="absolute top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-3 transition-all duration-500">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-green-700 font-medium">
                              GDPR Compliant
                            </span>
                          </div>
                          <p className="text-sm text-green-600 mt-1">
                            User consent properly recorded
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

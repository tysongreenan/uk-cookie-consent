'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Palette, Languages, Settings, Code } from 'lucide-react'

export function InteractiveDemo() {
  const [bannerTheme, setBannerTheme] = useState<'light' | 'dark'>('dark')
  const [bannerPosition, setBannerPosition] = useState<'top' | 'bottom'>('bottom')
  const [language, setLanguage] = useState<'en' | 'fr'>('en')
  const [showPreview, setShowPreview] = useState(true)

  const translations = {
    en: {
      title: 'We use cookies',
      message: 'This website uses cookies to enhance your browsing experience.',
      accept: 'Accept All',
      reject: 'Reject',
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

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 md:py-24">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center sm:mb-12">
            <h2 className="mb-3 font-heading text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              See It In Action
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              Try customizing your cookie banner in real-time. This is exactly how easy it is.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Controls */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold">
                    <Palette className="h-5 w-5 text-primary" />
                    Customize Appearance
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Theme</label>
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
                      <label className="mb-2 block text-sm font-medium">Position</label>
                      <div className="flex gap-2">
                        <Button
                          variant={bannerPosition === 'top' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setBannerPosition('top')}
                          className="flex-1"
                        >
                          ⬆️ Top
                        </Button>
                        <Button
                          variant={bannerPosition === 'bottom' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setBannerPosition('bottom')}
                          className="flex-1"
                        >
                          ⬇️ Bottom
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center gap-2 font-semibold">
                    <Languages className="h-5 w-5 text-primary" />
                    Language (Quebec Compliance)
                  </h3>
                  
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
                  <p className="mt-3 text-xs text-muted-foreground">
                    Full French language support for Quebec Law 25 compliance
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6 text-center">
                  <h3 className="mb-2 font-semibold">This is Just a Preview!</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    The full builder has 50+ customization options: colors, fonts, animations, scripts, and more.
                  </p>
                  <Button asChild className="w-full">
                    <a href="/auth/signup">
                      Try Full Builder Free →
                    </a>
                  </Button>
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
                      www.your-website.com
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
                        className={`absolute left-0 right-0 shadow-2xl transition-all duration-300 ${
                          bannerPosition === 'top' ? 'top-0' : 'bottom-0'
                        }`}
                        style={{
                          background: currentColors.background,
                          color: currentColors.text,
                          padding: '20px',
                          borderTop: bannerPosition === 'bottom' ? '1px solid rgba(0,0,0,0.1)' : 'none',
                          borderBottom: bannerPosition === 'top' ? '1px solid rgba(0,0,0,0.1)' : 'none'
                        }}
                      >
                        <div className="mx-auto max-w-4xl">
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
                    👆 Try clicking the buttons - this is a real interactive demo!
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


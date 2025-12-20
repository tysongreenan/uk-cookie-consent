'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Globe } from '@phosphor-icons/react'

export function BilingualDemo() {
  const [language, setLanguage] = useState<'en' | 'fr'>('en')

  const content = {
    en: {
      title: 'Cookie Consent',
      message: 'We use cookies to improve your experience on our website. You can choose which cookies to accept.',
      acceptAll: 'Accept All',
      rejectAll: 'Reject All',
      customize: 'Customize',
      necessary: {
        title: 'Necessary Cookies',
        description: 'These cookies are essential for the website to function properly.'
      },
      analytics: {
        title: 'Analytics Cookies',
        description: 'These cookies help us understand how you use our website.'
      }
    },
    fr: {
      title: 'Gestion des témoins (cookies)',
      message: 'Nous utilisons des témoins pour améliorer votre expérience sur notre site web. Vous pouvez choisir quels témoins accepter.',
      acceptAll: 'Accepter tout',
      rejectAll: 'Refuser tout',
      customize: 'Personnaliser',
      necessary: {
        title: 'Témoins essentiels',
        description: 'Ces témoins sont nécessaires au fonctionnement du site web.'
      },
      analytics: {
        title: 'Témoins d\'analyse',
        description: 'Ces témoins nous aident à comprendre comment vous utilisez notre site.'
      }
    }
  }

  const currentContent = content[language]

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Bilingual Support
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Full French language support for Quebec Law 25 compliance
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Language toggle */}
        <div className="flex gap-2">
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('en')}
            className="flex-1"
          >
            English
          </Button>
          <Button
            variant={language === 'fr' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('fr')}
            className="flex-1"
          >
            Français
          </Button>
        </div>

        {/* Cookie banner preview */}
        <div className="p-4 bg-muted rounded-lg border">
          <h4 className="font-semibold text-sm mb-2">{currentContent.title}</h4>
          <p className="text-xs text-muted-foreground mb-3">{currentContent.message}</p>
          
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium">{currentContent.necessary.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs font-medium">{currentContent.analytics.title}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="text-xs">
              {currentContent.rejectAll}
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              {currentContent.customize}
            </Button>
            <Button size="sm" className="text-xs">
              {currentContent.acceptAll}
            </Button>
          </div>
        </div>

        {/* Compliance badge */}
        <div className="pt-3 border-t">
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800">
              Quebec Law 25
            </Badge>
            <span className="text-xs text-muted-foreground">
              French language required
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

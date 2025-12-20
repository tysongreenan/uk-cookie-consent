'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Globe, Languages } from '@phosphor-icons/react'

interface BilingualBannerToggleProps {
  className?: string
}

export function BilingualBannerToggle({ className = '' }: BilingualBannerToggleProps) {
  const [language, setLanguage] = useState<'en' | 'fr'>('en')

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en')
  }

  const bannerTexts = {
    en: {
      title: "We use cookies to enhance your experience",
      message: "We use cookies to analyze our traffic and improve your experience. You can choose to accept all cookies or customize your preferences.",
      accept: "Accept All",
      reject: "Reject All",
      preferences: "Preferences"
    },
    fr: {
      title: "Nous utilisons des cookies pour améliorer votre expérience",
      message: "Nous utilisons des cookies pour analyser notre trafic et améliorer votre expérience. Vous pouvez choisir d'accepter tous les cookies ou personnaliser vos préférences.",
      accept: "Accepter Tout",
      reject: "Rejeter Tout",
      preferences: "Préférences"
    }
  }

  const currentText = bannerTexts[language]

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Bilingual Cookie Banner</h3>
        <Button
          onClick={toggleLanguage}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Languages className="h-4 w-4" />
          {language === 'en' ? 'English' : 'Français'}
        </Button>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium text-gray-700">
            {language === 'en' ? 'English Version' : 'Version Française'}
          </span>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">{currentText.title}</h4>
          <p className="text-sm text-gray-600">{currentText.message}</p>
          
          <div className="flex gap-2 pt-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              {currentText.accept}
            </Button>
            <Button size="sm" variant="outline">
              {currentText.reject}
            </Button>
            <Button size="sm" variant="outline">
              {currentText.preferences}
            </Button>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 text-center">
        Automatically detects user location and shows appropriate language
      </div>
    </div>
  )
}

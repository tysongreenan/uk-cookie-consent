'use client'

import { Globe } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', sample: 'We use cookies' },
  { code: 'es', name: 'Spanish', native: 'Español', sample: 'Usamos cookies' },
  { code: 'fr', name: 'French', native: 'Français', sample: 'Nous utilisons des cookies' },
  { code: 'de', name: 'German', native: 'Deutsch', sample: 'Wir verwenden Cookies' },
  { code: 'pt', name: 'Portuguese', native: 'Português', sample: 'Utilizamos cookies' },
  { code: 'ja', name: 'Japanese', native: '日本語', sample: 'Cookieの使用について' },
  { code: 'zh', name: 'Chinese', native: '中文', sample: '我们使用Cookie' },
  { code: 'ko', name: 'Korean', native: '한국어', sample: '쿠키를 사용합니다' },
  { code: 'ar', name: 'Arabic', native: 'العربية', sample: 'نستخدم ملفات تعريف الارتباط', rtl: true },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', sample: 'हम कुकीज़ का उपयोग करते हैं' },
]

export function LanguageSection() {
  return (
    <section className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Globe className="w-3 h-3 mr-1" />
            Global Coverage
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            One banner, 10 languages
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Your cookie banner automatically detects your visitor&apos;s browser language and displays
            in their native tongue. No configuration needed — it just works.
          </p>
        </div>

        {/* Language grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-12">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              className="group border border-border rounded-xl p-4 hover:border-primary/50 hover:bg-muted/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-muted-foreground uppercase">{lang.code}</span>
                <span className="text-sm font-semibold">{lang.native}</span>
              </div>
              <p
                className="text-xs text-muted-foreground leading-relaxed"
                dir={lang.rtl ? 'rtl' : undefined}
              >
                {lang.sample}
              </p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 text-sm font-bold">1</div>
            <h3 className="font-semibold mb-1 text-sm">Auto-detect</h3>
            <p className="text-xs text-muted-foreground">Banner reads the visitor&apos;s browser language automatically</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 text-sm font-bold">2</div>
            <h3 className="font-semibold mb-1 text-sm">Translate</h3>
            <p className="text-xs text-muted-foreground">All banner text — buttons, categories, descriptions — switches to their language</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3 text-sm font-bold">3</div>
            <h3 className="font-semibold mb-1 text-sm">Comply</h3>
            <p className="text-xs text-muted-foreground">Legally valid consent in every language, including RTL support for Arabic</p>
          </div>
        </div>
      </div>
    </section>
  )
}

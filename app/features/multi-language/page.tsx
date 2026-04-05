import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { FinalCTA } from '@/components/landing/final-cta'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StructuredData } from '@/components/seo/structured-data'

export const metadata: Metadata = {
  title: 'Multi-Language Cookie Banner — 10 Languages, Auto-Detect | Cookie Banner Generator',
  description: 'Cookie consent banners that auto-translate into 10 languages including English, French, Spanish, German, Japanese, Chinese, Korean, Arabic, Hindi, and Portuguese. GDPR & PIPEDA compliant in every language.',
  keywords: [
    'multi-language cookie banner',
    'translated cookie banner',
    'cookie banner translation',
    'multilingual cookie consent',
    'cookie banner auto translate',
    'GDPR cookie banner languages',
    'cookie banner Japanese',
    'cookie banner German',
    'cookie banner Arabic',
    'cookie banner Chinese',
    'international cookie consent',
    'cookie banner multiple languages',
  ],
  openGraph: {
    title: 'Multi-Language Cookie Banner — 10 Languages with Auto-Detect',
    description: 'One banner, 10 languages. Auto-detects visitor language. GDPR, PIPEDA, Law 25 compliant in every language.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.cookie-banner.ca/features/multi-language',
  },
}

const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', title: 'We use cookies', accept: 'Accept All', reject: 'Reject', necessary: 'Strictly Necessary Cookies', functional: 'Functional Cookies', performance: 'Performance Cookies', targeting: 'Targeting Cookies' },
  { code: 'es', name: 'Spanish', native: 'Español', title: 'Usamos cookies', accept: 'Aceptar todo', reject: 'Rechazar', necessary: 'Cookies estrictamente necesarias', functional: 'Cookies funcionales', performance: 'Cookies de rendimiento', targeting: 'Cookies de segmentación' },
  { code: 'fr', name: 'French', native: 'Français', title: 'Nous utilisons des cookies', accept: 'Accepter tout', reject: 'Rejeter', necessary: 'Cookies strictement nécessaires', functional: 'Cookies fonctionnels', performance: 'Cookies de performance', targeting: 'Cookies de ciblage' },
  { code: 'de', name: 'German', native: 'Deutsch', title: 'Wir verwenden Cookies', accept: 'Alle akzeptieren', reject: 'Ablehnen', necessary: 'Unbedingt erforderliche Cookies', functional: 'Funktionale Cookies', performance: 'Leistungs-Cookies', targeting: 'Targeting-Cookies' },
  { code: 'pt', name: 'Portuguese', native: 'Português', title: 'Utilizamos cookies', accept: 'Aceitar tudo', reject: 'Rejeitar', necessary: 'Cookies estritamente necessários', functional: 'Cookies funcionais', performance: 'Cookies de desempenho', targeting: 'Cookies de segmentação' },
  { code: 'ja', name: 'Japanese', native: '日本語', title: 'Cookieを使用しています', accept: 'すべて受け入れる', reject: '拒否', necessary: '必須Cookie', functional: '機能Cookie', performance: 'パフォーマンスCookie', targeting: 'ターゲティングCookie' },
  { code: 'zh', name: 'Chinese', native: '中文', title: '我们使用Cookie', accept: '全部接受', reject: '拒绝', necessary: '必要Cookie', functional: '功能Cookie', performance: '性能Cookie', targeting: '定向Cookie' },
  { code: 'ko', name: 'Korean', native: '한국어', title: '쿠키를 사용합니다', accept: '모두 수락', reject: '거부', necessary: '필수 쿠키', functional: '기능 쿠키', performance: '성능 쿠키', targeting: '타겟팅 쿠키' },
  { code: 'ar', name: 'Arabic', native: 'العربية', title: 'نستخدم ملفات تعريف الارتباط', accept: 'قبول الكل', reject: 'رفض', necessary: 'ملفات تعريف الارتباط الضرورية', functional: 'ملفات تعريف الارتباط الوظيفية', performance: 'ملفات تعريف الارتباط الأدائية', targeting: 'ملفات تعريف الارتباط الاستهدافية', rtl: true },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', title: 'हम कुकीज़ का उपयोग करते हैं', accept: 'सभी स्वीकार करें', reject: 'अस्वीकार', necessary: 'आवश्यक कुकीज़', functional: 'कार्यात्मक कुकीज़', performance: 'प्रदर्शन कुकीज़', targeting: 'लक्ष्य कुकीज़' },
]

const FEATURES = [
  {
    title: 'Auto-detect browser language',
    description: 'The banner reads navigator.language and instantly shows the right translation. No server round-trip, no delay.',
  },
  {
    title: 'Full banner translation',
    description: 'Every string is translated: title, message, accept/reject buttons, preferences panel, cookie category names, and descriptions.',
  },
  {
    title: 'RTL support for Arabic',
    description: 'Arabic banners automatically switch to right-to-left layout with dir="rtl" and proper text alignment.',
  },
  {
    title: 'Geo-targeting override',
    description: 'Pro users can force a specific language per country. Show French to visitors from France, German to visitors from Germany.',
  },
  {
    title: 'Custom text per language',
    description: 'Override any translation with your own text. Set your banner to Japanese and customize every string in the builder.',
  },
  {
    title: 'Legally compliant in every language',
    description: 'Cookie category names and descriptions are accurately translated per GDPR, PIPEDA, and Law 25 terminology.',
  },
]

export default function MultiLanguagePage() {
  return (
    <div className="min-h-screen bg-background">
      <StructuredData
        type="faq"
        data={[
          { question: 'How many languages does the cookie banner support?', answer: 'The cookie banner supports 10 languages: English, Spanish, French, German, Portuguese, Japanese, Chinese (Simplified), Korean, Arabic, and Hindi.' },
          { question: 'Does the banner automatically detect the visitor language?', answer: 'Yes. When set to Auto-detect mode, the banner reads the visitor\'s browser language and displays in their native language automatically.' },
          { question: 'Does the Arabic cookie banner support RTL?', answer: 'Yes. When Arabic is detected, the banner automatically switches to right-to-left layout with proper text alignment.' },
          { question: 'Can I customize the translated text?', answer: 'Yes. Select a language in the builder and customize every string — title, message, buttons, cookie categories — in your own words.' },
          { question: 'Is the multi-language feature free?', answer: 'Yes. Auto-detect translation is included in the free plan. Geo-targeting language override (force language by country) is a Pro feature.' },
        ]}
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="py-20 md:py-28 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <Badge variant="outline" className="mb-6">10 Languages Supported</Badge>
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
              Cookie banners that speak
              <br />
              <span className="text-primary">your visitor&apos;s language</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              One banner, auto-translated into 10 languages. Japanese visitors see Japanese. German visitors see German.
              Arabic visitors get full RTL support. Zero configuration needed.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8">Build Your Banner — Free</Button>
              </Link>
              <Link href="#languages">
                <Button variant="outline" size="lg" className="h-12 px-8">See All Languages</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Language showcase */}
        <section id="languages" className="py-20 border-b border-border">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-center mb-12">Every language, fully translated</h2>
            <div className="space-y-6">
              {LANGUAGES.map((lang) => (
                <div key={lang.code} className="border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 px-6 py-3 bg-muted/30 border-b border-border">
                    <span className="text-xs font-mono text-muted-foreground uppercase">{lang.code}</span>
                    <span className="font-semibold text-sm">{lang.native}</span>
                    <span className="text-xs text-muted-foreground">({lang.name})</span>
                    {lang.code === 'ar' && <Badge variant="outline" className="text-xs">RTL</Badge>}
                  </div>
                  <div className="p-6" dir={(lang as any).rtl ? 'rtl' : undefined}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Banner title</p>
                        <p className="font-medium mb-4">{lang.title}</p>
                        <div className="flex gap-2">
                          <span className="inline-block bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded">{lang.accept}</span>
                          <span className="inline-block border border-border text-xs px-3 py-1.5 rounded">{lang.reject}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground mb-1">Cookie categories</p>
                        <p className="text-sm">{lang.necessary}</p>
                        <p className="text-sm">{lang.functional}</p>
                        <p className="text-sm">{lang.performance}</p>
                        <p className="text-sm">{lang.targeting}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 border-b border-border">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-center mb-12">How it works</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {FEATURES.map((f) => (
                <div key={f.title} className="space-y-2">
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 border-b border-border">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-center mb-12">Frequently asked questions</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold mb-2">How many languages does the cookie banner support?</h3>
                <p className="text-sm text-muted-foreground">10 languages: English, Spanish, French, German, Portuguese, Japanese, Chinese (Simplified), Korean, Arabic, and Hindi. We&apos;re adding more based on demand.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Does auto-detect work on mobile?</h3>
                <p className="text-sm text-muted-foreground">Yes. Mobile browsers expose the same navigator.language API. The banner detects the phone&apos;s language setting and translates accordingly.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What if my visitor&apos;s language isn&apos;t supported?</h3>
                <p className="text-sm text-muted-foreground">The banner falls back to English. For example, a visitor with their browser set to Thai would see the English version.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I force a specific language?</h3>
                <p className="text-sm text-muted-foreground">Yes. In the builder, select a specific language instead of &ldquo;Auto-detect.&rdquo; The banner will always show in that language regardless of the visitor&apos;s browser settings.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Is the multi-language feature free?</h3>
                <p className="text-sm text-muted-foreground">Auto-detect translation is free. Geo-targeting (force different languages per country) is a Pro feature.</p>
              </div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}

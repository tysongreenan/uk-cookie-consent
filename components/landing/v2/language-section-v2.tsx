import { SectionHead } from './section-head'

const LANGUAGES = [
  { code: 'EN', name: 'English', sample: 'We use cookies' },
  { code: 'FR', name: 'Français', sample: 'Nous utilisons des cookies' },
  { code: 'ES', name: 'Español', sample: 'Usamos cookies' },
  { code: 'DE', name: 'Deutsch', sample: 'Wir verwenden Cookies' },
  { code: 'PT', name: 'Português', sample: 'Utilizamos cookies' },
  { code: 'IT', name: 'Italiano', sample: 'Utilizziamo i cookie' },
  { code: 'NL', name: 'Nederlands', sample: 'Wij gebruiken cookies' },
  { code: 'SV', name: 'Svenska', sample: 'Vi använder cookies' },
  { code: 'DA', name: 'Dansk', sample: 'Vi bruger cookies' },
  { code: 'JA', name: '日本語', sample: 'Cookieの使用について' },
  { code: 'ZH', name: '中文', sample: '我们使用Cookie' },
  { code: 'KO', name: '한국어', sample: '쿠키를 사용합니다' },
  { code: 'AR', name: 'العربية', sample: 'نستخدم ملفات تعريف', rtl: true },
  { code: 'HI', name: 'हिन्दी', sample: 'हम कुकीज़ का उपयोग करते हैं' },
  { code: 'NB', name: 'Norsk', sample: 'Vi bruker informasjonskapsler' },
  { code: 'FI', name: 'Suomi', sample: 'Käytämme evästeitä' },
] as const

export function LanguageSectionV2() {
  return (
    <section
      id="languages"
      className="border-y border-border bg-secondary py-20 lg:py-24"
    >
      <div className="container mx-auto max-w-7xl px-6">
        <SectionHead
          eyebrow="Global coverage"
          title={<>One banner,<br />16 languages.</>}
          lede="Your cookie banner automatically detects your visitor's browser language and displays in their native tongue. No configuration needed — it just works."
        />

        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
          {LANGUAGES.map((lang) => (
            <div
              key={lang.code}
              className="flex flex-col gap-1 rounded-2xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary"
            >
              <span className="font-mono text-[11px] tracking-[0.06em] text-muted-foreground">
                {lang.code}
              </span>
              <span className="mb-1 text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                {lang.name}
              </span>
              <span
                className="text-[12.5px] leading-snug text-muted-foreground"
                dir={'rtl' in lang && lang.rtl ? 'rtl' : undefined}
              >
                {lang.sample}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

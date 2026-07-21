'use client'

import { useMemo, useState } from 'react'
import { BannerPreview } from '@/components/banner/banner-preview'
import type { BannerConfig } from '@/types'
import { Monitor, Smartphone, Eye } from 'lucide-react'

const LAYOUTS: { id: BannerConfig['position']; label: string; tier: 'Free' | 'Pro' }[] = [
  { id: 'top', label: 'Top bar', tier: 'Free' },
  { id: 'bottom', label: 'Bottom bar', tier: 'Free' },
  { id: 'floating-bottom-right', label: 'Floating · bottom right', tier: 'Free' },
  { id: 'floating-bottom-left', label: 'Floating · bottom left', tier: 'Free' },
  { id: 'floating-top-right', label: 'Floating · top right', tier: 'Free' },
  { id: 'floating-top-left', label: 'Floating · top left', tier: 'Free' },
  { id: 'modal-center', label: 'Modal · center', tier: 'Pro' },
  { id: 'modal-bottom', label: 'Modal · bottom', tier: 'Pro' },
  { id: 'modal-top', label: 'Modal · top', tier: 'Pro' },
  { id: 'slide-in-right', label: 'Slide-in · right', tier: 'Pro' },
  { id: 'slide-in-left', label: 'Slide-in · left', tier: 'Pro' },
  { id: 'slide-in-top', label: 'Slide-in · top', tier: 'Pro' },
  { id: 'slide-in-bottom', label: 'Slide-in · bottom', tier: 'Pro' },
]

function baseConfig(position: BannerConfig['position']): BannerConfig {
  return {
    name: `Layout · ${position}`,
    position,
    theme: 'light',
    language: 'en',
    colors: {
      background: '#ffffff',
      text: '#1f2937',
      button: '#0f766e',
      buttonText: '#ffffff',
      link: '#0f766e',
      rejectButton: 'transparent',
      rejectButtonText: '#1f2937',
    },
    text: {
      title: 'We value your privacy',
      message:
        'We use cookies to improve your experience, personalize content, and analyze traffic. You can accept all or reject non-essential cookies.',
      acceptButton: 'Accept all',
      rejectButton: 'Reject',
      preferencesButton: 'Preferences',
    },
    behavior: {
      autoShow: true,
      dismissOnScroll: false,
      showPreferences: true,
      cookieExpiry: 182,
      buttonLayout: 'standard',
      showRejectButton: true,
    },
    branding: {
      logo: {
        enabled: false,
        url: '',
        position: 'left',
        maxWidth: 120,
        maxHeight: 40,
      },
      privacyPolicy: {
        url: 'https://cookie-banner.ca/privacy',
        text: 'Privacy Policy',
        openInNewTab: true,
        required: false,
      },
      footerLink: {
        enabled: true,
        text: 'Cookie Settings',
        position: 'floating',
        floatingPosition: 'bottom-right',
        style: 'floating',
        floatingStyle: {
          shape: 'pill',
          size: 'small',
          showText: true,
          useCustomColors: false,
        },
      } as any,
      showPoweredBy: false,
    },
    layout: {
      width: 'full',
      customWidth: 400,
      maxWidth: 1200,
      borderRadius: 12,
      padding: 20,
      margin: 0,
      shadow: 'medium',
      animation: 'fade',
    },
    scripts: {
      strictlyNecessary: [],
      functionality: [],
      trackingPerformance: [],
      targetingAdvertising: [],
    },
    advanced: {
      googleConsentMode: true,
      customCSS: '',
      customJS: '',
    },
  } as BannerConfig
}

export default function LayoutGalleryPage() {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop')
  const [active, setActive] = useState<BannerConfig['position']>('floating-bottom-left')
  const [showFr, setShowFr] = useState(false)

  const config = useMemo(() => {
    const c = baseConfig(active)
    if (showFr) {
      c.language = 'fr'
      c.text = {
        title: 'Nous respectons votre vie privée',
        message:
          'Ce site web utilise des cookies pour améliorer votre expérience de navigation, fournir du contenu personnalisé et analyser notre trafic.',
        acceptButton: 'Accepter tout',
        rejectButton: 'Rejeter',
        preferencesButton: 'Préférences',
      }
      c.branding.privacyPolicy.text = 'Politique de confidentialité'
      c.colors.button = '#97a629'
      c.colors.buttonText = '#1f2937'
      c.colors.link = '#1d4ed8'
    }
    return c
  }, [active, showFr])

  const frameWidth = viewport === 'mobile' ? 390 : '100%'
  const frameHeight = viewport === 'mobile' ? 720 : 560

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-teal-700">Local QA</p>
            <h1 className="text-xl font-semibold tracking-tight">Cookie banner layouts</h1>
            <p className="text-sm text-slate-500">
              No login required · all Free + Pro positions · toggle desktop / mobile
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-lg border bg-slate-50 p-0.5 text-sm">
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 ${
                  viewport === 'desktop' ? 'bg-white shadow-sm font-medium' : 'text-slate-500'
                }`}
              >
                <Monitor className="h-4 w-4" /> Desktop
              </button>
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 ${
                  viewport === 'mobile' ? 'bg-white shadow-sm font-medium' : 'text-slate-500'
                }`}
              >
                <Smartphone className="h-4 w-4" /> Mobile
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowFr((v) => !v)}
              className={`rounded-lg border px-3 py-1.5 text-sm ${
                showFr ? 'border-teal-600 bg-teal-50 text-teal-800' : 'bg-white text-slate-600'
              }`}
            >
              {showFr ? 'FR copy (on)' : 'EN copy'}
            </button>
            <a
              href="/dashboard/builder"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              <Eye className="h-4 w-4" /> Open builder
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[280px_1fr]">
        {/* Position list */}
        <aside className="h-fit rounded-xl border bg-white p-3 shadow-sm lg:sticky lg:top-4">
          <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Positions ({LAYOUTS.length})
          </p>
          <ul className="space-y-1">
            {LAYOUTS.map((layout) => (
              <li key={layout.id}>
                <button
                  type="button"
                  onClick={() => setActive(layout.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                    active === layout.id
                      ? 'bg-teal-50 font-medium text-teal-900 ring-1 ring-teal-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{layout.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase ${
                      layout.tier === 'Pro'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {layout.tier}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-3 border-t px-2 pt-3 text-xs text-slate-500">
            Builder preview lives on the right of{' '}
            <a href="/dashboard/builder" className="font-medium text-teal-700 underline">
              /dashboard/builder
            </a>{' '}
            (login required). This page is the full layout gallery without auth.
          </p>
        </aside>

        {/* Live frame */}
        <section className="min-w-0">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">
                {LAYOUTS.find((l) => l.id === active)?.label}
              </h2>
              <p className="text-sm text-slate-500">
                Preview frame mimics the builder browser chrome · position:{' '}
                <code className="rounded bg-slate-200/70 px-1 text-xs">{active}</code>
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="w-full overflow-hidden rounded-xl border bg-white shadow-lg"
              style={{ maxWidth: frameWidth === '100%' ? 960 : frameWidth }}
            >
              <div className="flex items-center gap-2 border-b bg-slate-100 px-3 py-2">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 truncate rounded-md bg-white/80 px-3 py-1 text-center text-xs text-slate-500">
                  yoursite.com · {viewport}
                </div>
              </div>
              <div
                className="relative overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] transform-gpu"
                style={{ height: frameHeight }}
              >
                {/* Fake page content so the banner has context */}
                <div className="pointer-events-none p-6 opacity-60">
                  <div className="mb-4 h-4 w-1/3 rounded bg-slate-300/80" />
                  <div className="mb-2 h-3 w-full rounded bg-slate-200/90" />
                  <div className="mb-2 h-3 w-5/6 rounded bg-slate-200/90" />
                  <div className="mb-6 h-3 w-2/3 rounded bg-slate-200/90" />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-24 rounded-lg bg-white/70 shadow-sm" />
                    <div className="h-24 rounded-lg bg-white/70 shadow-sm" />
                  </div>
                </div>
                <BannerPreview config={config} view="banner" />
              </div>
            </div>
          </div>

          {/* Mini grid of all layouts */}
          <div className="mt-10">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
              All layouts at a glance
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {LAYOUTS.map((layout) => (
                <button
                  key={layout.id}
                  type="button"
                  onClick={() => setActive(layout.id)}
                  className={`overflow-hidden rounded-xl border bg-white text-left shadow-sm transition hover:shadow-md ${
                    active === layout.id ? 'ring-2 ring-teal-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between border-b px-3 py-2">
                    <span className="text-sm font-medium">{layout.label}</span>
                    <span className="text-[10px] font-semibold uppercase text-slate-400">
                      {layout.tier}
                    </span>
                  </div>
                  <div className="relative h-44 overflow-hidden bg-slate-100 transform-gpu">
                    <div className="pointer-events-none scale-[0.72] origin-top-left absolute inset-0 w-[138%] h-[138%]">
                      <BannerPreview config={baseConfig(layout.id)} view="banner" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

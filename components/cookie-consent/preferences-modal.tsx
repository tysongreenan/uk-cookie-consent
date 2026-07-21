'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

interface BannerConfig {
  branding: {
    logo: {
      enabled: boolean
      url: string
      position: 'left' | 'right' | 'center' | 'hidden'
      maxWidth: number
      maxHeight: number
    }
  }
  text: {
    title: string
    message: string
    acceptButton: string
    rejectButton: string
    preferencesButton: string
  }
  colors: {
    background: string
    text: string
    button: string
    buttonText: string
    link: string
  }
  theme?: string
}

interface PreferencesModalProps {
  config: BannerConfig
  isVisible: boolean
  onClose: () => void
  onAcceptAll: () => void
  onConfirmChoices: (preferences: {
    strictlyNecessary: boolean
    functionality: boolean
    trackingPerformance: boolean
    targetingAdvertising: boolean
    socialMedia: boolean
  }) => void
  domain?: string
  /** When true, sizes to its containing preview frame instead of the viewport. */
  previewMode?: boolean
}

export function PreferencesModal({
  config,
  isVisible,
  onClose,
  onAcceptAll,
  onConfirmChoices,
  domain = 'cookie-banner.ca',
  previewMode = false,
}: PreferencesModalProps) {
  const [cookiePreferences, setCookiePreferences] = useState({
    strictlyNecessary: true,
    functionality: false,
    trackingPerformance: false,
    targetingAdvertising: false,
    socialMedia: false,
  })

  // Lock background page scroll when the real (non-preview) modal is open
  useEffect(() => {
    if (previewMode || !isVisible) return
    const scrollY = window.scrollY
    const { style } = document.body
    const prev = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
    }
    style.overflow = 'hidden'
    style.position = 'fixed'
    style.top = `-${scrollY}px`
    style.left = '0'
    style.right = '0'
    style.width = '100%'
    return () => {
      style.overflow = prev.overflow
      style.position = prev.position
      style.top = prev.top
      style.left = prev.left
      style.right = prev.right
      style.width = prev.width
      window.scrollTo(0, scrollY)
    }
  }, [isVisible, previewMode])

  const handleToggle = (category: keyof typeof cookiePreferences) => {
    if (category === 'strictlyNecessary') return
    setCookiePreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  if (!isVisible) return null

  const bg = config.colors.background || '#ffffff'
  const text = config.colors.text || '#111827'
  const muted =
    config.theme === 'dark' ? 'rgba(255,255,255,0.65)' : 'rgba(17,24,39,0.6)'
  const border =
    config.theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'
  const footerBg =
    config.theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'

  // Flex column: header (fixed) → scroll body (flex-1 min-h-0 overflow-y-auto) → footer (fixed)
  const wrapperClass = previewMode
    ? 'absolute inset-0 z-50 flex flex-col overflow-hidden'
    : 'fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4'
  const wrapperStyle = previewMode
    ? { backgroundColor: bg }
    : { backgroundColor: 'rgba(0,0,0,0.5)' }
  const cardClass = previewMode
    ? 'flex h-full w-full min-h-0 flex-col overflow-hidden'
    : 'flex w-full max-w-lg min-h-0 flex-col overflow-hidden rounded-xl shadow-2xl'
  const cardStyle = previewMode
    ? { backgroundColor: bg }
    : {
        backgroundColor: bg,
        maxHeight: 'min(90vh, calc(100dvh - 24px))',
      }

  const categories: {
    key: keyof typeof cookiePreferences
    title: string
    desc: string
    locked?: boolean
  }[] = [
    {
      key: 'strictlyNecessary',
      title: 'Strictly Necessary Cookies',
      desc: 'Always active',
      locked: true,
    },
    {
      key: 'functionality',
      title: 'Functional Cookies',
      desc: 'Remember preferences and choices',
    },
    {
      key: 'trackingPerformance',
      title: 'Performance Cookies',
      desc: 'Help us improve our website',
    },
    {
      key: 'targetingAdvertising',
      title: 'Targeting Cookies',
      desc: 'Personalized ads and content',
    },
    {
      key: 'socialMedia',
      title: 'Social Media Cookies',
      desc: 'Social media integration',
    },
  ]

  return (
    <div
      className={wrapperClass}
      style={wrapperStyle}
      onClick={(e) => {
        if (!previewMode && e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="prefs-title-preview"
    >
      <div className={cardClass} style={cardStyle}>
        {/* Header — pinned */}
        <div
          className="flex shrink-0 items-center justify-between gap-3 border-b px-4 py-3 sm:px-5"
          style={{ borderColor: border }}
        >
          {config.branding.logo.enabled && config.branding.logo.url ? (
            <img
              src={config.branding.logo.url}
              alt="Logo"
              className="h-8 flex-shrink-0 object-contain"
              style={{
                maxWidth: `${config.branding.logo.maxWidth}px`,
                maxHeight: `${config.branding.logo.maxHeight}px`,
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ) : (
            <span className="text-sm font-semibold" style={{ color: text }}>
              Cookie Settings
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg opacity-70 transition hover:opacity-100"
            style={{ color: text }}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable body — min-h-0 is required for overflow to work in flex */}
        <div
          className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-4 sm:px-5"
          style={{ WebkitOverflowScrolling: 'touch' } as CSSProperties}
        >
          <h2
            id="prefs-title-preview"
            className="mb-2 text-lg font-bold tracking-tight"
            style={{ color: text }}
          >
            Privacy Center
          </h2>

          <p className="mb-5 text-sm leading-relaxed" style={{ color: muted }}>
            By clicking &apos;Accept&apos;, you agree to the storing of cookies on
            your device to enhance site navigation, analyze site usage, and
            assist in our marketing efforts.
          </p>

          <Button
            onClick={onAcceptAll}
            className="mb-5 h-12 w-full rounded-lg text-base font-semibold"
            style={{
              backgroundColor: config.colors.button,
              color: config.colors.buttonText,
            }}
          >
            Accept All
          </Button>

          <div className="mb-2">
            <h3 className="mb-3 text-sm font-bold" style={{ color: text }}>
              Manage cookie preferences
            </h3>

            <div className="space-y-2.5">
              {categories.map((cat) => (
                <div
                  key={cat.key}
                  className="flex items-center justify-between gap-3 rounded-[10px] border px-4 py-3.5"
                  style={{
                    borderColor: border,
                    backgroundColor: cat.locked ? footerBg : 'transparent',
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-sm font-semibold"
                      style={{ color: text }}
                    >
                      {cat.title}
                    </div>
                    <div
                      className="mt-1 text-xs leading-snug"
                      style={{ color: muted }}
                    >
                      {cat.desc}
                    </div>
                  </div>
                  {!cat.locked && (
                    <div className="flex-shrink-0">
                      <Switch
                        checked={cookiePreferences[cat.key]}
                        onCheckedChange={() => handleToggle(cat.key)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer — pinned */}
        <div
          className="shrink-0 border-t px-4 py-3.5 sm:px-5"
          style={{
            borderColor: border,
            backgroundColor: footerBg,
            paddingBottom: previewMode
              ? undefined
              : 'max(0.875rem, env(safe-area-inset-bottom, 0px))',
          }}
        >
          <Button
            onClick={() => onConfirmChoices(cookiePreferences)}
            className="mb-3 h-12 w-full rounded-lg text-base font-semibold"
            style={{
              backgroundColor: config.colors.button,
              color: config.colors.buttonText,
            }}
          >
            Confirm My Choices
          </Button>

          <p className="text-center text-[11px]" style={{ color: muted }}>
            Powered by{' '}
            <a
              href={`https://cookie-banner.ca/?ref=preview&d=${encodeURIComponent(domain)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline-offset-2 hover:underline"
              style={{ color: config.colors.link }}
            >
              cookie-banner.ca
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import {
  Accessibility,
  BookOpen,
  Contrast,
  Eye,
  Focus,
  Heading,
  ImageOff,
  Layers,
  Link2,
  MicOff,
  Minus,
  Moon,
  MousePointer2,
  Pause,
  Plus,
  RotateCcw,
  Sun,
  Type,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import type { A11yFeatureKey, BannerConfig } from '@/types'
import { A11Y_TRANSLATIONS, type A11yProfileId, type A11yStrings } from '@/lib/accessibility/translations'
import { bannerFontStack, resolveA11yRuntimeConfig } from '@/lib/accessibility/config'
import { accentInk } from '@/lib/accessibility/palette'
import { A11yTriggerPreview } from '@/components/banner/a11y-trigger-preview'

interface A11yMenuPreviewProps {
  config: BannerConfig
  customization: boolean
  /** Owner has turned the live menu on. False = preview only. */
  shipping: boolean
  layoutKey?: string
}

const PROFILE_ORDER: A11yProfileId[] = [
  'seizureSafe',
  'readAloud',
  'visuallyImpaired',
  'adhd',
  'cognitive',
  'motorImpaired',
]

const GROUPS: Array<{ title: keyof A11yStrings; keys: A11yFeatureKey[] }> = [
  { title: 'sectionContent', keys: ['fontWeight', 'lineHeight', 'letterSpacing', 'dyslexiaFont', 'highlightLinks', 'highlightTitles'] },
  { title: 'sectionVisual', keys: ['readAloud', 'superFocus', 'readingGuide', 'bigCursor', 'pageStructure'] },
  { title: 'sectionColor', keys: ['monochrome', 'lowSaturation', 'highSaturation', 'highContrast', 'lightContrast', 'darkContrast'] },
  { title: 'sectionTools', keys: ['stopAnimations', 'hideImages', 'imageTooltips', 'muteSounds'] },
]

const TILE_ICON: Partial<Record<A11yFeatureKey, typeof Type>> = {
  fontWeight: Type,
  lineHeight: Type,
  letterSpacing: Type,
  dyslexiaFont: Type,
  highlightLinks: Link2,
  highlightTitles: Heading,
  readAloud: Volume2,
  superFocus: Focus,
  readingGuide: BookOpen,
  bigCursor: MousePointer2,
  pageStructure: Layers,
  monochrome: Contrast,
  lowSaturation: Contrast,
  highSaturation: Contrast,
  highContrast: Contrast,
  lightContrast: Sun,
  darkContrast: Moon,
  stopAnimations: Pause,
  hideImages: ImageOff,
  imageTooltips: Eye,
  muteSounds: VolumeX,
}

function IconBtn({ label, onClick, children, inert }: { label: string; onClick?: () => void; children: ReactNode; inert?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      tabIndex={inert ? -1 : undefined}
      aria-hidden={inert || undefined}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-current bg-transparent hover:bg-white/20"
    >
      {children}
    </button>
  )
}

export function A11yMenuPreview({ config, customization, shipping, layoutKey }: A11yMenuPreviewProps) {
  const runtime = useMemo(
    () => resolveA11yRuntimeConfig(config, { customization, baseUrl: '', preview: true }),
    [config, customization],
  )
  const [open, setOpen] = useState(true)
  const [triggerVisible, setTriggerVisible] = useState(false)
  const [profile, setProfile] = useState<A11yProfileId | null>(null)
  const [fontSize, setFontSize] = useState(100)
  const [onKeys, setOnKeys] = useState<Partial<Record<A11yFeatureKey, boolean>>>({})

  // Hide the trigger while the drawer is open; wait for the slide-out before
  // showing it again so it does not pop in on top of the closing panel.
  useEffect(() => {
    if (open) {
      setTriggerVisible(false)
      return
    }
    const t = window.setTimeout(() => setTriggerVisible(true), 260)
    return () => window.clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (!runtime) return null

  const lang = runtime.lang === 'auto' || !runtime.strings[runtime.lang] ? 'en' : runtime.lang
  const s = runtime.strings[lang] || A11Y_TRANSLATIONS.en
  const enabled = new Set(runtime.features)
  const accent = runtime.panel.accent
  const accentText = runtime.panel.accentText || '#ffffff'
  const headerBg = runtime.panel.headerBg || accent
  const headerFg = runtime.panel.headerFg || accentText
  const side: 'left' | 'right' = runtime.trigger.position.endsWith('right') ? 'right' : 'left'
  const surface = runtime.panel.surface
  const dark = surface ? surface.theme === 'dark' : runtime.panel.theme === 'dark'

  const vars: CSSProperties = {
    ['--bg' as string]: surface?.bg || (dark ? '#15171d' : '#eef0f6'),
    ['--card' as string]: surface?.card || (dark ? '#1f222b' : '#ffffff'),
    ['--card-2' as string]: surface?.card2 || (dark ? '#262a35' : '#f7f8fb'),
    ['--text' as string]: surface?.text || (dark ? '#f3f4f8' : '#17181c'),
    ['--muted' as string]: surface?.muted || (dark ? '#c5cad8' : '#4a5568'),
    ['--border' as string]: surface?.border || (dark ? '#8b93a8' : '#5c6578'),
    ['--control' as string]: surface?.control || (dark ? '#8b93a8' : '#5c6578'),
    ['--tint' as string]: surface?.tint || (dark ? 'rgba(255,255,255,0.08)' : 'rgba(74,79,209,0.1)'),
    ['--accent' as string]: accent,
    ['--accent-text' as string]: accentText,
    ['--header-bg' as string]: headerBg,
    ['--header-fg' as string]: headerFg,
    ['--accent-ink' as string]: accentInk(accent, surface?.card2 || (dark ? '#262a35' : '#f7f8fb')),
  }

  const toggleKey = (key: A11yFeatureKey) => {
    if (key === 'pageStructure') return
    setOnKeys((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="absolute inset-0 z-50 pointer-events-none motion-reduce:[&_*]:transition-none" style={vars}>
      <div
        aria-hidden={!open}
        className={`pointer-events-auto absolute inset-0 z-[55] bg-black/35 backdrop-blur-[2px] transition-opacity duration-200 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cb-a11y-preview-title"
        data-side={side}
        className={`absolute top-0 bottom-0 z-[60] flex w-[min(340px,92%)] flex-col shadow-[0_12px_40px_rgba(20,24,40,0.28)] ${
          open ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        style={{
          background: 'var(--bg)',
          color: 'var(--text)',
          [side]: 0,
          transform: open ? 'translateX(0)' : `translateX(${side === 'left' ? '-105%' : '105%'})`,
          visibility: open ? 'visible' : 'hidden',
          transition: open
            ? 'transform 260ms cubic-bezier(0.2,0.8,0.2,1)'
            : 'transform 260ms cubic-bezier(0.2,0.8,0.2,1), visibility 0s linear 260ms',
          fontFamily: bannerFontStack(runtime.fontFamily || (config as BannerConfig).fontFamily),
        }}
      >
        <div
          className="flex shrink-0 items-center gap-2 px-3 py-3"
          style={{ background: 'var(--header-bg)', color: 'var(--header-fg)' }}
        >
          <h2
            id="cb-a11y-preview-title"
            className="min-w-0 flex-1 text-[16px] font-bold tracking-tight"
            style={{ color: 'var(--header-fg)', textWrap: 'balance' } as CSSProperties}
          >
            {s.menuTitle}
          </h2>
          <IconBtn label={s.menuVoiceOn} inert>
            <MicOff className="h-4 w-4" aria-hidden="true" />
          </IconBtn>
          <IconBtn
            label={s.resetSettings}
            onClick={() => {
              setProfile(null)
              setFontSize(100)
              setOnKeys({})
            }}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
          </IconBtn>
          <IconBtn label={s.closeMenu} onClick={() => setOpen(false)}>
            <X className="h-4 w-4" aria-hidden="true" />
          </IconBtn>
        </div>
        {!shipping && (
          <p className="shrink-0 px-3 py-2 text-center text-[11px] font-medium" style={{ background: 'var(--card)', color: 'var(--text)', borderBottom: '1px solid var(--border)' }}>
            Preview only — turn On to add this to your snippet
          </p>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3">
          {Object.keys(runtime.strings).length > 1 && (
            <select
              aria-label={s.language}
              defaultValue={lang}
              className="mb-3 h-11 w-full rounded-xl border px-3 text-sm"
              style={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              {Object.entries(runtime.languageNames).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          )}

          {enabled.has('profiles') && (
            <section className="mb-3 rounded-2xl border p-3" style={{ background: 'var(--card-2)', borderColor: 'var(--border)' }}>
              <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: 'var(--accent-ink, var(--text))' }}>{s.sectionProfiles}</h3>
              <div className="space-y-2">
                {PROFILE_ORDER.map((id) => {
                  if (id === 'readAloud' && !enabled.has('readAloud')) return null
                  const on = profile === id
                  return (
                    <button
                      key={id}
                      type="button"
                      role="switch"
                      aria-checked={on}
                      onClick={() => setProfile(on ? null : id)}
                      className="flex w-full items-center gap-3 rounded-[14px] border p-2.5 text-left"
                      style={{
                        background: 'var(--card)',
                        borderColor: on ? 'var(--accent)' : 'var(--border)',
                        boxShadow: on ? 'inset 0 0 0 1px var(--accent)' : undefined,
                        color: 'var(--text)',
                      }}
                    >
                      <span
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                        style={{ background: 'var(--tint)' }}
                        aria-hidden="true"
                      >
                        {id === 'readAloud' ? <Volume2 className="h-5 w-5" /> : <Accessibility className="h-5 w-5" />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <b className="block text-[13px] font-bold leading-tight" style={{ color: 'inherit' }}>{s.profiles[id].name}</b>
                        <span className="mt-0.5 block text-[11px] leading-snug" style={{ color: 'var(--muted)' }}>
                          {s.profiles[id].description}
                        </span>
                      </span>
                      <span
                        className="relative h-[22px] w-10 shrink-0 rounded-full transition-colors"
                        style={{ background: on ? 'var(--accent)' : 'var(--control, #5c6578)' }}
                        aria-hidden="true"
                      >
                        <span
                          className="absolute top-[2px] h-[18px] w-[18px] rounded-full bg-white shadow"
                          style={{ left: on ? 20 : 2 }}
                        />
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>
          )}

          {GROUPS.map((group) => {
            const keys = group.keys.filter((k) => enabled.has(k))
            const isContent = group.title === 'sectionContent'
            if (!keys.length && !(isContent && enabled.has('fontSize'))) return null
            return (
              <section
                key={group.title}
                className="mb-3 rounded-2xl border p-3"
                style={{ background: 'var(--card-2)', borderColor: 'var(--border)' }}
              >
                <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color: 'var(--accent-ink, var(--text))' }}>{s[group.title] as string}</h3>
                {isContent && enabled.has('fontSize') && (
                  <div
                    className="mb-2.5 grid grid-cols-[44px_1fr_44px] items-center gap-2 rounded-[14px] border p-2.5"
                    style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
                    role="group"
                    aria-label={s.fontSize}
                  >
                    <div className="col-span-3 mb-1 flex items-center gap-2 text-[13px] font-semibold">
                      <Type className="h-4 w-4" aria-hidden="true" />
                      {s.fontSize}
                    </div>
                    <button
                      type="button"
                      aria-label={s.fontSizeDecrease}
                      disabled={fontSize <= 80}
                      onClick={() => setFontSize((v) => Math.max(80, v - 10))}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border disabled:opacity-40"
                      style={{ borderColor: 'var(--border)', background: 'var(--card-2)' }}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-center text-lg font-bold tabular-nums">{fontSize}%</span>
                    <button
                      type="button"
                      aria-label={s.fontSizeIncrease}
                      disabled={fontSize >= 200}
                      onClick={() => setFontSize((v) => Math.min(200, v + 10))}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border disabled:opacity-40"
                      style={{ borderColor: 'var(--border)', background: 'var(--card-2)' }}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {keys.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {keys.map((key) => {
                      const Icon = TILE_ICON[key] || Type
                      const on = Boolean(onKeys[key])
                      const readAloud = key === 'readAloud'
                      return (
                        <button
                          key={key}
                          type="button"
                          role={key === 'pageStructure' ? undefined : 'switch'}
                          aria-checked={key === 'pageStructure' ? undefined : on}
                          onClick={() => toggleKey(key)}
                          className={`relative flex flex-col items-center justify-center gap-1.5 rounded-[14px] border px-1.5 py-2.5 text-center text-[11px] font-semibold leading-snug ${
                            readAloud ? 'col-span-3 flex-row justify-start gap-3 px-3 py-2.5 text-left' : 'min-h-[88px]'
                          }`}
                          style={{
                            background: on ? 'var(--tint)' : 'var(--card)',
                            borderColor: on ? 'var(--accent)' : 'var(--border)',
                            boxShadow: on ? 'inset 0 0 0 1px var(--accent)' : undefined,
                            color: 'var(--text)',
                          }}
                        >
                          <Icon className={readAloud ? 'h-9 w-9 shrink-0' : 'h-6 w-6'} aria-hidden="true" />
                          <span className={readAloud ? 'flex min-w-0 flex-col' : undefined}>
                            <b className={readAloud ? 'text-[13px]' : 'font-semibold'}>{s[key] as string}</b>
                            {readAloud && (
                              <span className="text-[11px] font-medium" style={{ color: 'var(--muted)' }}>
                                {s.readAloudShort}
                              </span>
                            )}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </section>
            )
          })}
        </div>

        <div className="shrink-0 border-t px-3 py-3" style={{ borderColor: 'var(--border)', background: 'var(--bg)' }}>
          <button
            type="button"
            className="h-11 w-full rounded-xl text-[15px] font-bold"
            style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
            onClick={() => {
              setProfile(null)
              setFontSize(100)
              setOnKeys({})
            }}
          >
            {s.resetSettings}
          </button>
          {(runtime.statementUrl || runtime.feedbackEmail) && (
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[12px] underline">
              {runtime.statementUrl && <span>{s.statementLink}</span>}
              {runtime.feedbackEmail && <span>{s.feedbackLink}</span>}
            </div>
          )}
          <p className="mt-2 text-[11px] leading-snug" style={{ color: 'var(--muted)' }}>
            {s.disclaimer}
            {runtime.poweredBy ? ` ${s.poweredBy}` : null}
          </p>
        </div>
      </div>

      <div
        className={triggerVisible ? 'pointer-events-auto' : 'pointer-events-none'}
        style={{
          visibility: triggerVisible ? 'visible' : 'hidden',
          opacity: triggerVisible ? 1 : 0,
          transition: triggerVisible ? 'opacity 160ms cubic-bezier(0.2,0.8,0.2,1)' : 'none',
        }}
      >
        <A11yTriggerPreview
          config={config}
          customization={customization}
          preview
          compact={false}
          layoutKey={layoutKey}
          onOpen={() => setOpen(true)}
        />
      </div>
    </div>
  )
}

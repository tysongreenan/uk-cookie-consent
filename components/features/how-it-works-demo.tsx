'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Eye,
  MousePointerClick,
  SlidersHorizontal,
  ShieldCheck,
  RotateCcw,
  ChevronRight,
  X,
  Globe,
  Lock,
  Minus,
  Square,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

// Steps for the walkthrough
const steps = [
  {
    id: 'appear',
    label: 'Banner Appears',
    icon: Eye,
    description: 'The cookie banner slides in when a visitor first arrives on your site. No tracking cookies are set until consent is given.',
  },
  {
    id: 'choose',
    label: 'Visitor Chooses',
    icon: MousePointerClick,
    description: 'Visitors can Accept All, Reject All, or open Preferences for granular control. Every choice is logged for compliance.',
  },
  {
    id: 'preferences',
    label: 'Granular Control',
    icon: SlidersHorizontal,
    description: 'The preferences modal lets visitors toggle individual cookie categories — required by GDPR and recommended under PIPEDA.',
  },
  {
    id: 'saved',
    label: 'Consent Saved',
    icon: ShieldCheck,
    description: 'Consent is stored in a cookie and synced to Google Consent Mode v2. The banner won\'t appear again until the consent expires.',
  },
] as const

type StepId = (typeof steps)[number]['id']

export function HowItWorksDemo() {
  const [activeStep, setActiveStep] = useState<StepId>('appear')
  const [preferences, setPreferences] = useState({
    functionality: false,
    performance: false,
    targeting: false,
    socialMedia: false,
  })

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleReset = () => {
    setActiveStep('appear')
    setPreferences({
      functionality: false,
      performance: false,
      targeting: false,
      socialMedia: false,
    })
  }

  const activeIndex = steps.findIndex((s) => s.id === activeStep)

  return (
    <div className="not-prose my-16">
      {/* Section heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          See Exactly How It Works
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Click through each step to see your cookie banner in action — built with the same components from our banner builder.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Step navigation */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = step.id === activeStep
            const isPast = index < activeIndex
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 min-w-[200px] lg:min-w-0 cursor-pointer',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : isPast
                      ? 'bg-primary/10 text-foreground hover:bg-primary/15'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                )}
              >
                <div
                  className={cn(
                    'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-foreground/20'
                      : isPast
                        ? 'bg-primary/10'
                        : 'bg-muted'
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate">
                    Step {index + 1}
                  </div>
                  <div
                    className={cn(
                      'text-xs truncate',
                      isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </div>
                </div>
              </button>
            )
          })}

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-muted-foreground hover:bg-muted transition-colors cursor-pointer min-w-[200px] lg:min-w-0"
          >
            <RotateCcw className="h-4 w-4" />
            Replay Demo
          </button>
        </div>

        {/* Browser frame + banner demo */}
        <div className="space-y-4">
          {/* Browser chrome */}
          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/60 border-b border-border">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <div className="h-3 w-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-background rounded-md px-3 py-1 text-xs text-muted-foreground border border-border max-w-sm w-full">
                  <Lock className="h-3 w-3 text-green-500" />
                  <span className="truncate">yourwebsite.com</span>
                </div>
              </div>
              <div className="flex gap-2 text-muted-foreground">
                <Minus className="h-3.5 w-3.5" />
                <Square className="h-3 w-3" />
                <X className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Page content area */}
            <div className="relative bg-gray-50 dark:bg-zinc-900 min-h-[420px] overflow-hidden">
              {/* Simulated page content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-8 rounded-lg bg-primary/20" />
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-zinc-700" />
                  <div className="ml-auto flex gap-4">
                    <div className="h-3 w-16 rounded bg-gray-200 dark:bg-zinc-700" />
                    <div className="h-3 w-16 rounded bg-gray-200 dark:bg-zinc-700" />
                    <div className="h-3 w-16 rounded bg-gray-200 dark:bg-zinc-700" />
                  </div>
                </div>
                <div className="h-5 w-64 rounded bg-gray-200 dark:bg-zinc-700" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-gray-200/70 dark:bg-zinc-800" />
                  <div className="h-3 w-4/5 rounded bg-gray-200/70 dark:bg-zinc-800" />
                  <div className="h-3 w-3/5 rounded bg-gray-200/70 dark:bg-zinc-800" />
                </div>
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-24 rounded-lg bg-gray-200/50 dark:bg-zinc-800/50"
                    />
                  ))}
                </div>
                <div className="space-y-2 mt-4">
                  <div className="h-3 w-full rounded bg-gray-200/70 dark:bg-zinc-800" />
                  <div className="h-3 w-5/6 rounded bg-gray-200/70 dark:bg-zinc-800" />
                </div>
              </div>

              {/* Overlay for preferences modal step */}
              <AnimatePresence>
                {activeStep === 'preferences' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/40 z-20 flex items-center justify-center p-4"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden"
                    >
                      {/* Modal header */}
                      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <span className="font-semibold text-gray-900 text-sm">
                          Cookie Settings
                        </span>
                        <button
                          onClick={() => setActiveStep('saved')}
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </button>
                      </div>

                      {/* Modal body */}
                      <div className="px-5 py-4 space-y-3">
                        <p className="text-xs text-gray-500 leading-relaxed">
                          Choose which cookies you allow. Your choices are saved and you can change them at any time.
                        </p>

                        {/* Strictly necessary - always on */}
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                          <div className="flex items-center gap-2">
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                Strictly Necessary
                              </div>
                              <div className="text-[10px] text-gray-400">
                                Always active
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Toggleable categories */}
                        {(
                          [
                            ['functionality', 'Functional Cookies'],
                            ['performance', 'Performance Cookies'],
                            ['targeting', 'Targeting Cookies'],
                            ['socialMedia', 'Social Media Cookies'],
                          ] as const
                        ).map(([key, label]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between p-3 rounded-lg border border-gray-100"
                          >
                            <div className="flex items-center gap-2">
                              <ChevronRight className="h-4 w-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900">
                                {label}
                              </span>
                            </div>
                            <Switch
                              checked={preferences[key]}
                              onCheckedChange={() => handleToggle(key)}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Modal footer */}
                      <div className="px-5 py-4 border-t border-gray-100 bg-gray-50 space-y-2">
                        <button
                          onClick={() => setActiveStep('saved')}
                          className="w-full py-2.5 rounded-lg bg-[#6366f1] text-white text-sm font-medium hover:bg-[#5558e6] transition-colors cursor-pointer"
                        >
                          Confirm My Choices
                        </button>
                        <div className="text-center">
                          <span className="text-[10px] text-gray-400">
                            Powered by{' '}
                            <span className="font-semibold">cookie-banner.ca</span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Cookie banner */}
              <AnimatePresence>
                {(activeStep === 'appear' || activeStep === 'choose') && (
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="absolute bottom-0 left-0 right-0 z-10"
                  >
                    <div
                      className="bg-white border-t border-gray-200 px-5 py-4"
                      style={{
                        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08)',
                      }}
                    >
                      <div className="max-w-xl">
                        <h3 className="font-semibold text-gray-900 text-base mb-1.5">
                          We Use Cookies
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                          This website uses cookies to enhance your browsing experience
                          and analyze our traffic.{' '}
                          <span className="text-[#6366f1] underline cursor-pointer">
                            Privacy Policy
                          </span>
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setActiveStep('saved')}
                            className={cn(
                              'px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer',
                              'bg-[#6366f1] text-white hover:bg-[#5558e6]',
                              activeStep === 'choose' && 'ring-2 ring-[#6366f1]/30 ring-offset-1'
                            )}
                          >
                            Accept All
                          </button>
                          <button
                            onClick={() => setActiveStep('saved')}
                            className={cn(
                              'px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer',
                              'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50',
                              activeStep === 'choose' && 'ring-2 ring-gray-300/50 ring-offset-1'
                            )}
                          >
                            Reject All
                          </button>
                          <button
                            onClick={() => setActiveStep('preferences')}
                            className={cn(
                              'px-4 py-2 rounded-md text-sm font-medium transition-all cursor-pointer',
                              'bg-transparent text-[#6366f1] hover:bg-[#6366f1]/5',
                              activeStep === 'choose' && 'ring-2 ring-[#6366f1]/20 ring-offset-1'
                            )}
                          >
                            Preferences
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Consent saved state */}
              <AnimatePresence>
                {activeStep === 'saved' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="absolute inset-0 z-20 flex items-center justify-center"
                  >
                    <div className="text-center space-y-3 p-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: 'spring',
                          damping: 15,
                          stiffness: 300,
                          delay: 0.1,
                        }}
                      >
                        <ShieldCheck className="h-16 w-16 text-green-500 mx-auto" />
                      </motion.div>
                      <h3 className="text-lg font-bold text-foreground">
                        Consent Saved
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                        The visitor's choice is stored in a cookie and synced to Google Consent Mode v2. The banner won't show again until consent expires.
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 pt-2">
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                          <ShieldCheck className="h-3 w-3" />
                          Cookie stored
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">
                          <Globe className="h-3 w-3" />
                          GCM v2 updated
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-400">
                          <Eye className="h-3 w-3" />
                          Consent logged
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Step description card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start gap-3">
                {(() => {
                  const step = steps[activeIndex]
                  const Icon = step.icon
                  return (
                    <>
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground mb-1">
                          Step {activeIndex + 1}: {step.label}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </>
                  )
                })()}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const prev = steps[activeIndex - 1]
                if (prev) setActiveStep(prev.id)
              }}
              disabled={activeIndex === 0}
              className="cursor-pointer"
            >
              Previous
            </Button>
            <span className="text-xs text-muted-foreground">
              {activeIndex + 1} / {steps.length}
            </span>
            <Button
              size="sm"
              onClick={() => {
                const next = steps[activeIndex + 1]
                if (next) setActiveStep(next.id)
              }}
              disabled={activeIndex === steps.length - 1}
              className="cursor-pointer"
            >
              Next Step
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

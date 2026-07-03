'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StepBusinessInfo } from '@/components/privacy-policy/wizard-steps/step-business-info'
import { StepDataCollection } from '@/components/privacy-policy/wizard-steps/step-data-collection'
import { StepCookies } from '@/components/privacy-policy/wizard-steps/step-cookies'
import type { PrivacyPolicyInputs, PolicyOutput } from '@/types'
import { ArrowLeft, ArrowRight, Loader2, Copy, Check, Download, Save } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

const DRAFT_STORAGE_KEY = 'privacy-policy-draft-v1'

// Field-level validation that runs before we even hit the server.
function validateStep(step: number, inputs: PrivacyPolicyInputs): Record<string, string> {
  const errors: Record<string, string> = {}
  if (step === 0) {
    if (!inputs.businessName.trim()) errors.businessName = 'Business name is required.'
    const url = inputs.websiteUrl.trim()
    if (!url) {
      errors.websiteUrl = 'Website URL is required.'
    } else {
      const withScheme = /^https?:\/\//i.test(url) ? url : `https://${url}`
      try {
        new URL(withScheme)
      } catch {
        errors.websiteUrl = 'Enter a valid URL (e.g. https://example.com).'
      }
    }
    const email = inputs.contactEmail.trim()
    if (!email) {
      errors.contactEmail = 'Contact email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.contactEmail = 'Enter a valid email address.'
    }
    if (!inputs.country) errors.country = 'Select your country.'
  }
  if (step === 1) {
    if (inputs.dataCollected.length === 0)
      errors.dataCollected = 'Select at least one type of data you collect.'
    if (inputs.collectionMethods.length === 0)
      errors.collectionMethods = 'Select at least one collection method.'
  }
  return errors
}

const STEPS = [
  { id: 'business', label: 'Business Info' },
  { id: 'data', label: 'Data Collection' },
  { id: 'cookies', label: 'Cookies & Services' },
] as const

const DEFAULT_INPUTS: PrivacyPolicyInputs = {
  businessName: '',
  businessType: 'website',
  websiteUrl: '',
  contactEmail: '',
  country: '',
  province: undefined,
  dataCollected: [],
  collectionMethods: [],
  cookieCategories: [],
  thirdPartyServices: [],
  dataPurposes: [],
  sharesDataWithThirdParties: false,
  thirdPartyRecipients: [],
  transfersDataInternationally: false,
  dataRetentionPeriod: '',
  customRetentionPeriod: undefined,
  allowsUserDeletion: false,
  allowsUserExport: false,
  jurisdictions: [],
  language: 'en',
  collectsChildrenData: false,
  minimumAge: undefined,
}

export function PrivacyPolicyGenerator() {
  const { data: session } = useSession()
  const [currentStep, setCurrentStep] = useState(0)
  const [inputs, setInputs] = useState<PrivacyPolicyInputs>(DEFAULT_INPUTS)
  const [isGenerating, setIsGenerating] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [draftSavedAt, setDraftSavedAt] = useState<Date | null>(null)
  const draftLoaded = useRef(false)

  const [output, setOutput] = useState<PolicyOutput | null>(() => {
    if (typeof window === 'undefined') return null
    try {
      const saved = sessionStorage.getItem('privacy-policy-output')
      if (saved) {
        sessionStorage.removeItem('privacy-policy-output')
        return JSON.parse(saved)
      }
    } catch {}
    return null
  })
  const [hasCopied, setHasCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Restore draft on mount.
  useEffect(() => {
    if (draftLoaded.current || typeof window === 'undefined') return
    draftLoaded.current = true
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (parsed?.inputs && typeof parsed.inputs === 'object') {
        setInputs({ ...DEFAULT_INPUTS, ...parsed.inputs })
        if (typeof parsed.currentStep === 'number') {
          setCurrentStep(Math.min(Math.max(0, parsed.currentStep), 2))
        }
        if (parsed.savedAt) setDraftSavedAt(new Date(parsed.savedAt))
        toast.success('Draft restored', { duration: 2000 })
      }
    } catch {
      // Ignore corrupt drafts.
    }
  }, [])

  // Auto-save draft (debounced) whenever inputs or step change.
  useEffect(() => {
    if (!draftLoaded.current) return
    const handle = window.setTimeout(() => {
      try {
        const now = new Date()
        localStorage.setItem(
          DRAFT_STORAGE_KEY,
          JSON.stringify({ inputs, currentStep, savedAt: now.toISOString() }),
        )
        setDraftSavedAt(now)
      } catch {
        // Quota exceeded; ignore.
      }
    }, 500)
    return () => window.clearTimeout(handle)
  }, [inputs, currentStep])

  // Save policy to sessionStorage before navigating to signup
  const saveAndNavigate = useCallback((href: string) => {
    if (output) {
      try {
        sessionStorage.setItem('privacy-policy-output', JSON.stringify(output))
      } catch {}
    }
    window.location.href = href
  }, [output])

  const handleChange = useCallback((updates: Partial<PrivacyPolicyInputs>) => {
    setInputs((prev) => ({ ...prev, ...updates }))
    // Clear errors for fields the user just edited.
    setFieldErrors((prev) => {
      if (Object.keys(prev).length === 0) return prev
      const next = { ...prev }
      let changed = false
      for (const key of Object.keys(updates)) {
        if (next[key]) {
          delete next[key]
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [])

  const handleNext = useCallback(() => {
    const errors = validateStep(currentStep, inputs)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      const firstMessage = Object.values(errors)[0]
      if (firstMessage) toast.error(firstMessage)
      return
    }
    setFieldErrors({})
    setCurrentStep((prev) => prev + 1)
  }, [currentStep, inputs])

  const handleGenerate = useCallback(async () => {
    // Re-run validation across every step before submitting so the user
    // doesn't get a generic server "Validation failed".
    for (let step = 0; step <= 2; step++) {
      const errors = validateStep(step, inputs)
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        setCurrentStep(step)
        const firstMessage = Object.values(errors)[0]
        toast.error(firstMessage || 'Please complete the required fields.')
        return
      }
    }
    setFieldErrors({})

    setIsGenerating(true)
    setError(null)
    try {
      // Auto-detect jurisdictions from country selection
      const jurisdictions: string[] = []
      const euCountries = ['DE', 'FR', 'NL', 'IE', 'SE', 'NO', 'DK', 'FI', 'ES', 'IT', 'PT', 'BE', 'AT', 'CH']
      if (euCountries.includes(inputs.country) || inputs.country === 'GB') jurisdictions.push('gdpr')
      if (inputs.country === 'CA') {
        jurisdictions.push('pipeda')
        if (inputs.province === 'QC') jurisdictions.push('law25')
      }
      if (inputs.country === 'US') jurisdictions.push('ccpa')
      if (['AU', 'NZ', 'SG', 'JP', 'IN', 'BR', 'MX', 'ZA'].includes(inputs.country)) {
        jurisdictions.push('gdpr')
      }
      if (jurisdictions.length === 0) jurisdictions.push('gdpr')

      const payload = { ...inputs, jurisdictions }

      const res = await fetch('/api/privacy-policy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        // Server-side validation: surface field errors and jump back.
        if (res.status === 400 && data?.details) {
          const serverErrors: Record<string, string> = {}
          for (const [field, msgs] of Object.entries(data.details)) {
            if (Array.isArray(msgs) && msgs[0]) serverErrors[field] = msgs[0] as string
          }
          setFieldErrors(serverErrors)
          // Jump to the step that owns the failing field.
          const businessFields = new Set(['businessName', 'websiteUrl', 'contactEmail', 'country', 'province', 'logoUrl'])
          const dataFields = new Set(['dataCollected', 'collectionMethods', 'dataPurposes'])
          const offending = data.field || Object.keys(serverErrors)[0]
          if (offending && businessFields.has(offending)) setCurrentStep(0)
          else if (offending && dataFields.has(offending)) setCurrentStep(1)
          else setCurrentStep(2)
          throw new Error(data.error || 'Please review the highlighted fields.')
        }
        throw new Error(data?.error || `Generation failed (${res.status})`)
      }
      const data: PolicyOutput = await res.json()
      setOutput(data)
      // Clear the saved draft on success — it's been generated.
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY)
      } catch {}
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
      toast.error(message)
    } finally {
      setIsGenerating(false)
    }
  }, [inputs])

  const handleCopy = useCallback(async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output.contentHtml)
      setHasCopied(true)
      toast.success('Privacy policy copied to clipboard')
      setTimeout(() => setHasCopied(false), 2000)
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }, [output])

  const handleDownload = useCallback(() => {
    if (!output) return
    const blob = new Blob([output.contentHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `privacy-policy-${inputs.businessName.toLowerCase().replace(/\s+/g, '-')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [output, inputs.businessName])

  const handleStartOver = useCallback(() => {
    setOutput(null)
    setCurrentStep(0)
    setInputs(DEFAULT_INPUTS)
    setError(null)
    setFieldErrors({})
    setDraftSavedAt(null)
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY)
    } catch {}
  }, [])

  // If we have output, show the result
  if (output) {
    return (
      <div className="space-y-6">
        {/* Success header */}
        <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Your privacy policy is ready!</p>
                <p className="text-sm text-muted-foreground">
                  Covers: {output.metadata.jurisdictions.join(', ')} &middot; {new Date(output.metadata.generatedAt).toLocaleDateString()}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleStartOver}>Start Over</Button>
            </div>
          </CardContent>
        </Card>

        {/* Signup CTA FIRST for non-signed-in users */}
        {!session && (
          <Card className="border-2 border-primary">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Create a free account to get your policy</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign up (free) to copy, download, and save your privacy policy. Pro users also get a hosted URL, automatic updates, and version history.
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto" onClick={() => saveAndNavigate('/auth/signup?callbackUrl=/tools/privacy-policy')}>
                    Sign Up Free
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">No credit card required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Policy content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg">
                Privacy Policy for {output.metadata.businessName}
              </CardTitle>
              {session && (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    {hasCopied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                    {hasCopied ? 'Copied' : 'Copy HTML'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Server-generated content from validated inputs, not user-supplied HTML */}
              <div
                className={`prose prose-sm max-w-none dark:prose-invert border border-border rounded-lg p-6 bg-white dark:bg-card overflow-y-auto ${session ? 'max-h-[600px]' : 'max-h-[300px]'}`}
                dangerouslySetInnerHTML={{ __html: output.contentHtml }}
              />
              {/* Blur overlay — sign up to see full policy */}
              {!session && (
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/90 to-transparent rounded-b-lg flex items-end justify-center pb-6">
                  <Button size="lg" onClick={() => saveAndNavigate('/auth/signup?callbackUrl=/tools/privacy-policy')}>
                    Sign Up Free to View Full Policy
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Save CTA for authenticated users */}
        {session && (
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Save to Your Dashboard</h3>
              <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                Save this policy to your dashboard to edit, publish to a hosted URL, and track version history.
              </p>
              <Button asChild>
                <Link href="/dashboard/privacy-policy/new">
                  Save & Manage Policy
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <Card className="border-2 border-primary/20 shadow-lg">
      <CardHeader className="pb-4">
        {/* What to do — clear instruction */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-lg">
              {currentStep === 0 && 'Step 1: Tell us about your business'}
              {currentStep === 1 && 'Step 2: What data do you collect?'}
              {currentStep === 2 && 'Step 3: Cookies & third-party services'}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">
              {currentStep === 0 && 'We use this to customize your privacy policy.'}
              {currentStep === 1 && 'Select all types of personal data your site collects.'}
              {currentStep === 2 && 'Almost done — select the services and cookies you use.'}
            </p>
          </div>
          <div className="text-xs text-muted-foreground font-medium bg-muted px-2.5 py-1 rounded-full shrink-0">
            {currentStep + 1} of {STEPS.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-[320px]">
          {currentStep === 0 && (
            <StepBusinessInfo inputs={inputs} onChange={handleChange} errors={fieldErrors} />
          )}
          {currentStep === 1 && (
            <StepDataCollection inputs={inputs} onChange={handleChange} />
          )}
          {currentStep === 2 && (
            <StepCookies inputs={inputs} onChange={handleChange} />
          )}
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>

          {currentStep < STEPS.length - 1 ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Privacy Policy
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>

        {/* Draft saved indicator */}
        {draftSavedAt && (
          <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-muted-foreground">
            <Save className="h-3 w-3" />
            <span>Draft saved {draftSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

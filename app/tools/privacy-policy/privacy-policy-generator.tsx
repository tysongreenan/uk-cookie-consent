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
import { captureEvent, getPostHogRequestHeaders } from '@/lib/analytics'

const DRAFT_STORAGE_KEY = 'privacy-policy-draft-v1'
/** Survives signup redirect so the generated policy is still available after auth. */
const OUTPUT_STORAGE_KEY = 'privacy-policy-output'
const INPUTS_STORAGE_KEY = 'privacy-policy-inputs'
/** localStorage handoff with TTL — survives OAuth full-page redirects and same-origin new tabs. */
const AUTH_HANDOFF_KEY = 'privacy-policy-auth-handoff-v1'
const AUTH_HANDOFF_TTL_MS = 2 * 60 * 60 * 1000 // 2 hours
const CALLBACK_PATH = '/tools/privacy-policy'
const SIGNUP_HREF = `/auth/signup?callbackUrl=${encodeURIComponent(CALLBACK_PATH)}`
const SIGNIN_HREF = `/auth/signin?callbackUrl=${encodeURIComponent(CALLBACK_PATH)}`

type AuthHandoff = {
  output: PolicyOutput
  inputs: PrivacyPolicyInputs
  savedAt: string
}

function stashPolicyForAuth(output: PolicyOutput, inputs: PrivacyPolicyInputs) {
  const payload: AuthHandoff = {
    output,
    inputs,
    savedAt: new Date().toISOString(),
  }
  try {
    sessionStorage.setItem(OUTPUT_STORAGE_KEY, JSON.stringify(output))
    sessionStorage.setItem(INPUTS_STORAGE_KEY, JSON.stringify(inputs))
  } catch {
    // Private mode / quota
  }
  try {
    localStorage.setItem(AUTH_HANDOFF_KEY, JSON.stringify(payload))
  } catch {
    // sessionStorage may still work same-tab
  }
}

function readAndClearAuthHandoff(
  defaults: PrivacyPolicyInputs,
): { output: PolicyOutput | null; inputs: PrivacyPolicyInputs | null } {
  let output: PolicyOutput | null = null
  let inputs: PrivacyPolicyInputs | null = null

  try {
    const rawOut = sessionStorage.getItem(OUTPUT_STORAGE_KEY)
    if (rawOut) {
      const parsed: PolicyOutput = JSON.parse(rawOut)
      if (parsed?.contentHtml) output = parsed
      sessionStorage.removeItem(OUTPUT_STORAGE_KEY)
    }
    const rawIn = sessionStorage.getItem(INPUTS_STORAGE_KEY)
    if (rawIn) {
      const parsed = JSON.parse(rawIn)
      if (parsed && typeof parsed === 'object') inputs = { ...defaults, ...parsed }
      sessionStorage.removeItem(INPUTS_STORAGE_KEY)
    }
  } catch {
    // ignore
  }

  try {
    const raw = localStorage.getItem(AUTH_HANDOFF_KEY)
    if (raw) {
      const parsed: AuthHandoff = JSON.parse(raw)
      const age = parsed?.savedAt ? Date.now() - new Date(parsed.savedAt).getTime() : Infinity
      if (age <= AUTH_HANDOFF_TTL_MS && parsed?.output?.contentHtml) {
        if (!output) output = parsed.output
        if (!inputs && parsed.inputs && typeof parsed.inputs === 'object') {
          inputs = { ...defaults, ...parsed.inputs }
        }
      }
      localStorage.removeItem(AUTH_HANDOFF_KEY)
    }
  } catch {
    try {
      localStorage.removeItem(AUTH_HANDOFF_KEY)
    } catch {
      // ignore
    }
  }

  return { output, inputs }
}

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // Firefox private mode / permissions — fall through
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.left = '-9999px'
    ta.style.top = '0'
    document.body.appendChild(ta)
    ta.select()
    ta.setSelectionRange(0, text.length)
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

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
  // Defaults used when the 3-step wizard does not ask for these fields
  dataRetentionPeriod: 'as_needed',
  customRetentionPeriod: undefined,
  allowsUserDeletion: true,
  allowsUserExport: true,
  jurisdictions: [],
  language: 'en',
  collectsChildrenData: false,
  minimumAge: undefined,
}

export function PrivacyPolicyGenerator() {
  const { data: session, status: sessionStatus } = useSession()
  const isAuthed = sessionStatus === 'authenticated'
  const isSessionLoading = sessionStatus === 'loading'
  const [currentStep, setCurrentStep] = useState(0)
  const [inputs, setInputs] = useState<PrivacyPolicyInputs>(DEFAULT_INPUTS)
  const [isGenerating, setIsGenerating] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [draftSavedAt, setDraftSavedAt] = useState<Date | null>(null)
  const draftLoaded = useRef(false)
  // When output is restored after signup redirect, treat completion as signup_callback.
  const entrySource = useRef<'tools' | 'signup_callback'>('tools')
  const hasTrackedStart = useRef(false)

  // Always start null on server + first client paint to avoid hydration mismatch.
  // Post-signup restore happens in useEffect (client storage only).
  const [output, setOutput] = useState<PolicyOutput | null>(null)
  const [hasCopied, setHasCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const planTier = session?.user?.planTier || (isAuthed ? 'free' : undefined)

  const analyticsProps = useCallback(() => {
    const props: Record<string, unknown> = {
      source: entrySource.current,
    }
    if (planTier) props.plan_tier = planTier
    if (inputs.language) props.language = inputs.language
    if (inputs.businessType) props.business_type = inputs.businessType
    return props
  }, [planTier, inputs.language, inputs.businessType])

  // Restore generated policy (and wizard inputs) after signup redirect, else draft.
  useEffect(() => {
    if (draftLoaded.current || typeof window === 'undefined') return
    draftLoaded.current = true

    const handoff = readAndClearAuthHandoff(DEFAULT_INPUTS)
    if (handoff.output) {
      setOutput(handoff.output)
      if (handoff.inputs) setInputs(handoff.inputs)
      entrySource.current = 'signup_callback'
      return
    }

    // No post-signup stash — restore in-progress wizard draft if present.
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

  // Auto-save draft (debounced) whenever inputs or step change — skip once we have output.
  useEffect(() => {
    if (!draftLoaded.current || output) return
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
  }, [inputs, currentStep, output])

  // Persist policy + inputs before full-page navigate to auth (session + local handoff).
  const saveAndNavigate = useCallback((href: string) => {
    if (output) {
      stashPolicyForAuth(output, inputs)
    }
    window.location.href = href
  }, [output, inputs])

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

    // First validated generate submit counts as starting the tool flow.
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true
      captureEvent('privacy_policy_started', analyticsProps())
    }

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
        headers: {
          'Content-Type': 'application/json',
          ...getPostHogRequestHeaders(),
        },
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
        if (res.status === 429) {
          throw new Error(
            data?.error ||
              'Too many policies generated from this network. Please wait a bit and try again, or sign in for higher limits.',
          )
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
  }, [inputs, analyticsProps])

  const handleCopy = useCallback(async () => {
    if (!output) return
    const ok = await copyTextToClipboard(output.contentHtml)
    if (ok) {
      setHasCopied(true)
      captureEvent('privacy_policy_copied', {
        ...analyticsProps(),
        format: 'html',
      })
      toast.success('Privacy policy copied to clipboard')
      setTimeout(() => setHasCopied(false), 2000)
    } else {
      toast.error('Could not copy automatically. Use Download instead, or select the policy text and copy.')
    }
  }, [output, analyticsProps])

  const handleDownload = useCallback(() => {
    if (!output) return
    const blob = new Blob([output.contentHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    const biz =
      inputs.businessName?.trim() ||
      output.metadata.businessName?.trim() ||
      'policy'
    a.download = `privacy-policy-${biz.toLowerCase().replace(/\s+/g, '-')}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    captureEvent('privacy_policy_downloaded', {
      ...analyticsProps(),
      format: 'html',
    })
  }, [output, inputs.businessName, analyticsProps])

  const handleStartOver = useCallback(() => {
    setOutput(null)
    setCurrentStep(0)
    setInputs(DEFAULT_INPUTS)
    setError(null)
    setFieldErrors({})
    setDraftSavedAt(null)
    entrySource.current = 'tools'
    hasTrackedStart.current = false
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY)
    } catch {}
  }, [])

  /** Save the already-generated policy to the Pro dashboard (no re-wizard). */
  const handleSaveToDashboard = useCallback(async () => {
    if (!output || !isAuthed) return
    setIsSaving(true)
    try {
      const biz = output.metadata.businessName || inputs.businessName || 'Business'
      const isFr = (output.metadata.language || inputs.language) === 'fr'
      const policyName = isFr
        ? `Politique de confidentialité — ${biz}`
        : `${biz} Privacy Policy`
      if (!output.contentHtml) {
        throw new Error('Generated policy has no content to save')
      }
      const res = await fetch('/api/privacy-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: policyName,
          inputs: {
            ...inputs,
            jurisdictions: output.metadata.jurisdictions,
            language: output.metadata.language || inputs.language || 'en',
          },
          content_html: output.contentHtml,
          content_json: output.contentJson,
          jurisdictions: output.metadata.jurisdictions,
          language: output.metadata.language || inputs.language || 'en',
        }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        if (res.status === 403 && data?.upgradeRequired) {
          toast.error('Hosting & dashboard save is a Pro feature — copy or download is free with your account.')
          window.location.href = '/upgrade'
          return
        }
        throw new Error(data?.error || `Save failed (${res.status})`)
      }
      if (!data?.id) {
        throw new Error('Save succeeded but no policy id was returned')
      }
      toast.success(isFr ? 'Politique enregistrée' : 'Policy saved to your dashboard')
      window.location.href = `/dashboard/privacy-policy/${data.id}`
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save policy'
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }, [output, isAuthed, inputs])

  // If we have output, show the result
  if (output) {
    const showGuestGate = !isAuthed && !isSessionLoading
    const showAuthedActions = isAuthed

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

        {/* Auth CTA — hide while session is loading so post-signup doesn't flash the wall */}
        {showGuestGate && (
          <Card className="border-2 border-primary">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">Create a free account to get your policy</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign up free to copy or download your privacy policy. Already registered? Sign in and we&apos;ll bring you right back.
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto" onClick={() => saveAndNavigate(SIGNUP_HREF)}>
                    Sign Up Free
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full sm:w-auto"
                    onClick={() => saveAndNavigate(SIGNIN_HREF)}
                  >
                    Already have an account? Sign in
                  </Button>
                  <p className="text-[11px] text-muted-foreground text-center">No credit card required</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {isSessionLoading && !isAuthed && (
          <Card>
            <CardContent className="p-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Checking your account…
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
              {showAuthedActions && (
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
                className={`prose prose-sm max-w-none dark:prose-invert border border-border rounded-lg p-6 bg-white dark:bg-card overflow-y-auto ${showAuthedActions ? 'max-h-[600px]' : 'max-h-[300px]'}`}
                dangerouslySetInnerHTML={{ __html: output.contentHtml }}
              />
              {showGuestGate && (
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/90 to-transparent rounded-b-lg flex flex-col items-center justify-end gap-2 pb-6">
                  <Button size="lg" onClick={() => saveAndNavigate(SIGNUP_HREF)}>
                    Sign Up Free to View Full Policy
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                  <button
                    type="button"
                    className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
                    onClick={() => saveAndNavigate(SIGNIN_HREF)}
                  >
                    Or sign in
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Optional Pro path — free accounts already have copy/download above */}
        {showAuthedActions && (
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 border-green-200 dark:border-green-800">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Want it hosted for you? (Pro)</h3>
              <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                You can already copy or download above for free. Pro saves to your dashboard, publishes a hosted URL, and keeps version history.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button onClick={handleSaveToDashboard} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-1" />
                      Save &amp; host (Pro)
                    </>
                  )}
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/pricing">See Pro pricing</Link>
                </Button>
              </div>
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

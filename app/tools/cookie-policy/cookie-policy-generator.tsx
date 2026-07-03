'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StepBusinessInfo } from '@/components/privacy-policy/wizard-steps/step-business-info'
import { StepCookies } from '@/components/privacy-policy/wizard-steps/step-cookies'
import type { PrivacyPolicyInputs } from '@/types'
import type { CookiePolicyOutput } from '@/lib/cookie-policy/generator'
import { ArrowLeft, ArrowRight, Check, Copy, Download, Loader2, Save } from 'lucide-react'
import { toast } from 'react-hot-toast'

const DRAFT_STORAGE_KEY = 'cookie-policy-draft-v1'

const STEPS = [
  { id: 'business', label: 'Business Info' },
  { id: 'cookies', label: 'Cookies & Services' },
] as const

const DEFAULT_INPUTS: PrivacyPolicyInputs = {
  businessName: '',
  businessType: 'website',
  websiteUrl: '',
  contactEmail: '',
  country: '',
  province: undefined,
  logoUrl: undefined,
  dataCollected: [],
  collectionMethods: [],
  cookieCategories: [],
  cookies: [],
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

function validateBusinessStep(inputs: PrivacyPolicyInputs): Record<string, string> {
  const errors: Record<string, string> = {}
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
  return errors
}

function detectJurisdictions(inputs: PrivacyPolicyInputs): string[] {
  const jurisdictions: string[] = []
  const euCountries = ['DE', 'FR', 'NL', 'IE', 'SE', 'NO', 'DK', 'FI', 'ES', 'IT', 'PT', 'BE', 'AT', 'CH']
  if (euCountries.includes(inputs.country) || inputs.country === 'GB') jurisdictions.push('gdpr')
  if (inputs.country === 'CA') {
    jurisdictions.push('pipeda')
    if (inputs.province === 'QC') jurisdictions.push('law25')
  }
  if (inputs.country === 'US') jurisdictions.push('ccpa')
  if (jurisdictions.length === 0) jurisdictions.push('gdpr')
  return jurisdictions
}

// HTML output comes from the server (validated inputs, escaped fields). We
// inject it via a ref instead of `dangerouslySetInnerHTML` so the output
// preview component stays simple and the linter doesn't flag the JSX.
function PolicyPreview({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = html
  }, [html])
  return (
    <div
      ref={ref}
      className="prose prose-sm max-w-none dark:prose-invert border border-border rounded-lg p-6 bg-white dark:bg-card max-h-[600px] overflow-y-auto"
    />
  )
}

export function CookiePolicyGenerator() {
  const { data: session } = useSession()
  const [currentStep, setCurrentStep] = useState(0)
  const [inputs, setInputs] = useState<PrivacyPolicyInputs>(DEFAULT_INPUTS)
  const [isGenerating, setIsGenerating] = useState(false)
  const [output, setOutput] = useState<CookiePolicyOutput | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [hasCopied, setHasCopied] = useState(false)
  const [draftSavedAt, setDraftSavedAt] = useState<Date | null>(null)
  const draftLoaded = useRef(false)

  useEffect(() => {
    if (draftLoaded.current || typeof window === 'undefined') return
    draftLoaded.current = true
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (parsed?.inputs) {
        setInputs({ ...DEFAULT_INPUTS, ...parsed.inputs })
        if (typeof parsed.currentStep === 'number') {
          setCurrentStep(Math.min(Math.max(0, parsed.currentStep), STEPS.length - 1))
        }
        if (parsed.savedAt) setDraftSavedAt(new Date(parsed.savedAt))
        toast.success('Draft restored', { duration: 2000 })
      }
    } catch {}
  }, [])

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
      } catch {}
    }, 500)
    return () => window.clearTimeout(handle)
  }, [inputs, currentStep])

  const handleChange = useCallback((updates: Partial<PrivacyPolicyInputs>) => {
    setInputs((prev) => ({ ...prev, ...updates }))
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
    if (currentStep === 0) {
      const errors = validateBusinessStep(inputs)
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors)
        const firstMessage = Object.values(errors)[0]
        if (firstMessage) toast.error(firstMessage)
        return
      }
    }
    setFieldErrors({})
    setCurrentStep((s) => s + 1)
  }, [currentStep, inputs])

  const handleGenerate = useCallback(async () => {
    const errors = validateBusinessStep(inputs)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setCurrentStep(0)
      toast.error(Object.values(errors)[0] || 'Please complete the required fields.')
      return
    }
    setIsGenerating(true)
    try {
      const payload = {
        businessName: inputs.businessName,
        websiteUrl: inputs.websiteUrl,
        contactEmail: inputs.contactEmail,
        country: inputs.country,
        province: inputs.province,
        logoUrl: inputs.logoUrl,
        cookies: inputs.cookies ?? [],
        cookieCategories: inputs.cookieCategories,
        thirdPartyServices: inputs.thirdPartyServices,
        jurisdictions: detectJurisdictions(inputs),
        language: inputs.language,
      }
      const res = await fetch('/api/cookie-policy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        if (res.status === 400 && data?.details) {
          const serverErrors: Record<string, string> = {}
          for (const [field, msgs] of Object.entries(data.details)) {
            if (Array.isArray(msgs) && msgs[0]) serverErrors[field] = msgs[0] as string
          }
          setFieldErrors(serverErrors)
          setCurrentStep(0)
        }
        throw new Error(data?.error || `Generation failed (${res.status})`)
      }
      const data: CookiePolicyOutput = await res.json()
      setOutput(data)
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY)
      } catch {}
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to generate cookie policy'
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
      toast.success('Cookie policy copied to clipboard')
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
    a.download = `cookie-policy-${inputs.businessName.toLowerCase().replace(/\s+/g, '-') || 'site'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [output, inputs.businessName])

  const handleStartOver = useCallback(() => {
    setOutput(null)
    setCurrentStep(0)
    setInputs(DEFAULT_INPUTS)
    setFieldErrors({})
    setDraftSavedAt(null)
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY)
    } catch {}
  }, [])

  if (output) {
    return (
      <div className="space-y-6">
        <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Your cookie policy is ready</p>
                <p className="text-sm text-muted-foreground">
                  Covers: {output.metadata.jurisdictions.join(', ') || 'GDPR'} ·{' '}
                  {new Date(output.metadata.generatedAt).toLocaleDateString()}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleStartOver}>
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-lg">Cookie Policy for {output.metadata.businessName}</CardTitle>
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
            </div>
          </CardHeader>
          <CardContent>
            <PolicyPreview html={output.contentHtml} />
          </CardContent>
        </Card>

        {!session && (
          <Card className="border-2 border-primary">
            <CardContent className="p-6 text-center space-y-3">
              <h3 className="text-lg font-semibold">Want a hosted, always-updated cookie policy?</h3>
              <p className="text-sm text-muted-foreground">
                Sign up free to host your policy at a custom URL, re-scan automatically, and keep version history.
              </p>
              <Button asChild>
                <a href="/auth/signup?callbackUrl=/tools/cookie-policy">Sign Up Free</a>
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle className="text-lg">
              {currentStep === 0 && 'Step 1: Tell us about your business'}
              {currentStep === 1 && 'Step 2: Your cookies & third-party services'}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-0.5">
              {currentStep === 0 && 'Required for the policy header, contact section, and jurisdiction detection.'}
              {currentStep === 1 && 'Scan your site to auto-fill, or add cookies manually.'}
            </p>
          </div>
          <div className="text-xs text-muted-foreground font-medium bg-muted px-2.5 py-1 rounded-full shrink-0">
            {currentStep + 1} of {STEPS.length}
          </div>
        </div>

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
          {currentStep === 1 && <StepCookies inputs={inputs} onChange={handleChange} />}
        </div>

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
                  Generate Cookie Policy
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>

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

'use client'

import { useState, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StepBusinessInfo } from '@/components/privacy-policy/wizard-steps/step-business-info'
import { StepDataCollection } from '@/components/privacy-policy/wizard-steps/step-data-collection'
import { StepCookies } from '@/components/privacy-policy/wizard-steps/step-cookies'
import type { PrivacyPolicyInputs, PolicyOutput } from '@/types'
import { ArrowLeft, ArrowRight, Loader2, Copy, Check, Download, Crown } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

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
  const [output, setOutput] = useState<PolicyOutput | null>(null)
  const [hasCopied, setHasCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = useCallback((updates: Partial<PrivacyPolicyInputs>) => {
    setInputs((prev) => ({ ...prev, ...updates }))
  }, [])

  const canProceed = useCallback(() => {
    if (currentStep === 0) {
      return inputs.businessName.trim() !== '' && inputs.websiteUrl.trim() !== '' && inputs.contactEmail.trim() !== '' && inputs.country !== ''
    }
    if (currentStep === 1) {
      return inputs.dataCollected.length > 0 && inputs.collectionMethods.length > 0
    }
    return true
  }, [currentStep, inputs])

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true)
    setError(null)
    try {
      const res = await fetch('/api/privacy-policy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error || `Generation failed (${res.status})`)
      }
      const data: PolicyOutput = await res.json()
      setOutput(data)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      toast.error(err.message || 'Failed to generate privacy policy')
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
  }, [])

  // If we have output, show the result
  if (output) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <CardTitle className="text-xl">
                Privacy Policy for {output.metadata.businessName}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  {hasCopied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {hasCopied ? 'Copied' : 'Copy HTML'}
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="ghost" size="sm" onClick={handleStartOver}>
                  Start Over
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Generated {new Date(output.metadata.generatedAt).toLocaleDateString()} &middot; Covers: {output.metadata.jurisdictions.join(', ')}
            </p>
          </CardHeader>
          <CardContent>
            {/* Content is generated server-side by our own generator from validated inputs, not user-supplied raw HTML */}
            <div
              className="prose prose-sm max-w-none dark:prose-invert border border-border rounded-lg p-6 bg-white dark:bg-card max-h-[600px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: output.contentHtml }}
            />
          </CardContent>
        </Card>

        {/* CTA for non-authenticated users */}
        {!session && (
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6 text-center">
              <Crown className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold mb-2">Save and Host This Policy</h3>
              <p className="text-muted-foreground mb-4 max-w-lg mx-auto">
                Upgrade to Pro to save your policy, get a hosted URL, automatic updates when laws change, and version history for compliance audits.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="/auth/signin">Sign Up Free</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/pricing">View Pro Features</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* CTA for authenticated users */}
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
            <StepBusinessInfo inputs={inputs} onChange={handleChange} />
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
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              disabled={!canProceed()}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !canProceed()}
            >
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
      </CardContent>
    </Card>
  )
}

'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StepBusinessInfo } from '@/components/privacy-policy/wizard-steps/step-business-info'
import { StepDataCollection } from '@/components/privacy-policy/wizard-steps/step-data-collection'
import { StepCookies } from '@/components/privacy-policy/wizard-steps/step-cookies'
import { DashboardLayout } from '@/components/dashboard/dashboard-layout'
import { Breadcrumbs } from '@/components/dashboard/breadcrumbs'
import type { PrivacyPolicyInputs, PolicyOutput } from '@/types'
import { ArrowLeft, ArrowRight, Loader2, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'

function detectJurisdictions(country: string, province?: string): string[] {
  const jurisdictions: string[] = []
  const euCountries = ['DE', 'FR', 'NL', 'IE', 'SE', 'NO', 'DK', 'FI', 'ES', 'IT', 'PT', 'BE', 'AT', 'CH']
  if (euCountries.includes(country) || country === 'GB') jurisdictions.push('gdpr')
  if (country === 'CA') {
    jurisdictions.push('pipeda')
    if (province === 'QC') jurisdictions.push('law25')
  }
  if (country === 'US') jurisdictions.push('ccpa')
  if (['AU', 'NZ', 'SG', 'JP', 'IN', 'BR', 'MX', 'ZA'].includes(country)) jurisdictions.push('gdpr')
  if (jurisdictions.length === 0) jurisdictions.push('gdpr')
  return jurisdictions
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

export default function NewPrivacyPolicyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromPolicyId = searchParams?.get('from') ?? null
  const [currentStep, setCurrentStep] = useState(0)
  const [inputs, setInputs] = useState<PrivacyPolicyInputs>(DEFAULT_INPUTS)
  const [name, setName] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPreloading, setIsPreloading] = useState(!!fromPolicyId)

  // Default the policy name from the business name unless the user edits it.
  useEffect(() => {
    if (nameTouched) return
    const trimmed = inputs.businessName.trim()
    setName(trimmed ? `${trimmed} Privacy Policy` : '')
  }, [inputs.businessName, nameTouched])

  // Preload from an existing policy when regenerating.
  useEffect(() => {
    if (!fromPolicyId || status !== 'authenticated') return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`/api/privacy-policy/${fromPolicyId}`)
        if (!res.ok) throw new Error('Could not load policy to regenerate')
        const policy = await res.json()
        if (cancelled) return
        const loaded = policy.inputs as Partial<PrivacyPolicyInputs>
        setInputs({ ...DEFAULT_INPUTS, ...loaded })
        if (policy.title) {
          setName(policy.title)
          setNameTouched(true)
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load policy'
        toast.error(message)
      } finally {
        if (!cancelled) setIsPreloading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [fromPolicyId, status])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

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

  const handleSave = useCallback(async () => {
    const policyName = name.trim()
    if (!policyName) {
      setError('Policy name is required.')
      toast.error('Policy name is required.')
      return
    }
    setIsSaving(true)
    setError(null)
    try {
      const jurisdictions = detectJurisdictions(inputs.country, inputs.province)
      const generationPayload = { ...inputs, jurisdictions }

      const genRes = await fetch('/api/privacy-policy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generationPayload),
      })
      if (!genRes.ok) {
        const data = await genRes.json().catch(() => null)
        throw new Error(data?.error || `Generation failed (${genRes.status})`)
      }
      const policyOutput: PolicyOutput = await genRes.json()

      // Regenerating an existing policy → PUT (creates a new version);
      // otherwise POST a brand-new policy.
      const isRegenerating = !!fromPolicyId
      const saveRes = await fetch(
        isRegenerating ? `/api/privacy-policy/${fromPolicyId}` : '/api/privacy-policy',
        {
          method: isRegenerating ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: policyName,
            inputs: generationPayload,
            content_html: policyOutput.contentHtml,
            content_json: policyOutput.contentJson,
            jurisdictions: policyOutput.metadata.jurisdictions,
            language: policyOutput.metadata.language,
          }),
        },
      )
      if (!saveRes.ok) {
        const data = await saveRes.json().catch(() => null)
        throw new Error(data?.error || `Save failed (${saveRes.status})`)
      }
      const saved = await saveRes.json()
      toast.success(isRegenerating ? 'Privacy policy regenerated' : 'Privacy policy created')
      router.push(`/dashboard/privacy-policy/${saved.id}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setError(message)
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }, [inputs, name, router, fromPolicyId])

  if (status === 'loading') {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    )
  }

  if (status === 'unauthenticated') return null

  return (
    <DashboardLayout>
      <div className="p-6 max-w-4xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Privacy Policies', href: '/dashboard/privacy-policy' },
            { label: 'New Policy' },
          ]}
        />

        <div className="mb-8 mt-4">
          <h1 className="text-2xl font-bold">
            {fromPolicyId ? 'Regenerate Privacy Policy' : 'Create New Privacy Policy'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {fromPolicyId
              ? 'Review and update your details. Regenerating creates a new version of this policy.'
              : 'Fill in your business details to generate and save a privacy policy.'}
          </p>
        </div>

        {/* Policy name — required by the dashboard save endpoint. */}
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="policyName">
                Policy Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="policyName"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setNameTouched(true)
                }}
                placeholder="e.g. Acme Inc. Privacy Policy"
              />
              <p className="text-xs text-muted-foreground">
                A short label so you can find this policy in your dashboard. Auto-filled from your business name.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-2">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-colors ${
                        index < currentStep
                          ? 'bg-primary border-primary text-primary-foreground'
                          : index === currentStep
                          ? 'border-primary text-primary'
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                    </div>
                    <span className={`text-sm hidden sm:inline ${
                      index <= currentStep ? 'font-medium text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`flex-1 h-px mx-3 ${
                      index < currentStep ? 'bg-primary' : 'bg-border'
                    }`} />
                  )}
                </div>
              ))}
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
                  onClick={handleSave}
                  disabled={isSaving || !canProceed()}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      {fromPolicyId ? 'Regenerating…' : 'Generating & Saving…'}
                    </>
                  ) : (
                    <>
                      {fromPolicyId ? 'Regenerate Policy' : 'Generate & Save Policy'}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
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

export default function NewPrivacyPolicyPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [inputs, setInputs] = useState<PrivacyPolicyInputs>(DEFAULT_INPUTS)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
    setIsSaving(true)
    setError(null)
    try {
      // First, generate the policy
      const genRes = await fetch('/api/privacy-policy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      })
      if (!genRes.ok) {
        const data = await genRes.json().catch(() => null)
        throw new Error(data?.error || `Generation failed (${genRes.status})`)
      }
      const policyOutput: PolicyOutput = await genRes.json()

      // Then, save to dashboard
      const saveRes = await fetch('/api/privacy-policy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs,
          output: policyOutput,
        }),
      })
      if (!saveRes.ok) {
        const data = await saveRes.json().catch(() => null)
        throw new Error(data?.error || `Save failed (${saveRes.status})`)
      }
      const saved = await saveRes.json()
      toast.success('Privacy policy created successfully')
      router.push(`/dashboard/privacy-policy/${saved.id}`)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
      toast.error(err.message || 'Failed to save privacy policy')
    } finally {
      setIsSaving(false)
    }
  }, [inputs, router])

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
          <h1 className="text-2xl font-bold">Create New Privacy Policy</h1>
          <p className="text-muted-foreground mt-1">
            Fill in your business details to generate and save a privacy policy.
          </p>
        </div>

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
                      Generating & Saving...
                    </>
                  ) : (
                    <>
                      Generate & Save Policy
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

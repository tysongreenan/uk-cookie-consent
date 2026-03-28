'use client'

import { useState } from 'react'
import type { PrivacyPolicyInputs } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Loader2, FileText } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { cn } from '@/lib/utils'

import { StepBusinessInfo } from './wizard-steps/step-business-info'
import { StepDataCollection } from './wizard-steps/step-data-collection'
import { StepCookies } from './wizard-steps/step-cookies'
import { StepDataUsage } from './wizard-steps/step-data-usage'
import { StepUserRights } from './wizard-steps/step-user-rights'
import { StepJurisdictions } from './wizard-steps/step-jurisdictions'
import { StepChildren } from './wizard-steps/step-children'
import { PolicyRenderer } from './policy-renderer'

const STEPS = [
  { label: 'Business Info', shortLabel: 'Business' },
  { label: 'Data Collection', shortLabel: 'Data' },
  { label: 'Cookies', shortLabel: 'Cookies' },
  { label: 'Data Usage', shortLabel: 'Usage' },
  { label: 'User Rights', shortLabel: 'Rights' },
  { label: 'Jurisdictions', shortLabel: 'Legal' },
  { label: 'Children', shortLabel: 'Children' },
]

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
  dataRetentionPeriod: '1_year',
  customRetentionPeriod: undefined,
  allowsUserDeletion: true,
  allowsUserExport: true,
  jurisdictions: [],
  language: 'en',
  collectsChildrenData: false,
  minimumAge: undefined,
}

export function PolicyWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [inputs, setInputs] = useState<PrivacyPolicyInputs>(DEFAULT_INPUTS)
  const [generatedHtml, setGeneratedHtml] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (updates: Partial<PrivacyPolicyInputs>) => {
    setInputs((prev) => ({ ...prev, ...updates }))
  }

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/privacy-policy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Failed to generate policy')
        return
      }

      setGeneratedHtml(data.html)
      toast.success('Privacy policy generated successfully')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // If we have a generated policy, show it
  if (generatedHtml) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Privacy Policy</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setGeneratedHtml(null)
              setCurrentStep(0)
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Start Over
          </Button>
        </div>
        <PolicyRenderer contentHtml={generatedHtml} />
      </div>
    )
  }

  const isLastStep = currentStep === STEPS.length - 1
  const progress = ((currentStep + 1) / STEPS.length) * 100

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Step {currentStep + 1} of {STEPS.length}
          </span>
          <span>{STEPS[currentStep].label}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        {/* Step labels (hidden on small screens) */}
        <div className="hidden sm:flex justify-between">
          {STEPS.map((step, i) => (
            <button
              key={step.label}
              onClick={() => setCurrentStep(i)}
              className={cn(
                'text-xs transition-colors',
                i === currentStep
                  ? 'text-primary font-medium'
                  : i < currentStep
                    ? 'text-foreground/70 hover:text-foreground cursor-pointer'
                    : 'text-muted-foreground'
              )}
            >
              {step.shortLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Step content */}
      <Card>
        <CardContent className="pt-6">
          {currentStep === 0 && (
            <StepBusinessInfo inputs={inputs} onChange={handleChange} />
          )}
          {currentStep === 1 && (
            <StepDataCollection inputs={inputs} onChange={handleChange} />
          )}
          {currentStep === 2 && (
            <StepCookies inputs={inputs} onChange={handleChange} />
          )}
          {currentStep === 3 && (
            <StepDataUsage inputs={inputs} onChange={handleChange} />
          )}
          {currentStep === 4 && (
            <StepUserRights inputs={inputs} onChange={handleChange} />
          )}
          {currentStep === 5 && (
            <StepJurisdictions inputs={inputs} onChange={handleChange} />
          )}
          {currentStep === 6 && (
            <StepChildren inputs={inputs} onChange={handleChange} />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Back
        </Button>

        {isLastStep ? (
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                Generating...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-1.5" />
                Generate Policy
              </>
            )}
          </Button>
        ) : (
          <Button onClick={() => setCurrentStep((s) => s + 1)}>
            Next
            <ArrowRight className="h-4 w-4 ml-1.5" />
          </Button>
        )}
      </div>
    </div>
  )
}

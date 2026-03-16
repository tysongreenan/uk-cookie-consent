'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, Code, Copy, Eye } from 'lucide-react'

interface InstallationStep {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  content: React.ReactNode
  isCompleted: boolean
}

export function ThreeStepInstallation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps: InstallationStep[] = [
    {
      id: 1,
      title: 'Get Your Code',
      description: 'Copy the integration code from your dashboard',
      icon: Code,
      isCompleted: false,
      content: (
        <div className="p-6 bg-background rounded-lg border border-border shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Go to your dashboard</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Click &quot;Get Code&quot;</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Copy the code snippet</span>
            </div>
            <div className="mt-4 p-3 bg-foreground/95 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-background/80">Integration Code</span>
                <button className="flex items-center space-x-1 px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>
              <pre className="text-xs text-background/80">
{`<script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID"></script>`}
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Add to Website',
      description: 'Paste the code into your website\'s head section',
      icon: Copy,
      isCompleted: false,
      content: (
        <div className="p-6 bg-background rounded-lg border border-border shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Open your website files</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Find the &lt;head&gt; section</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Paste the code before &lt;/head&gt;</span>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg border border-border">
              <div className="text-sm text-foreground">
                <strong>Pro Tip:</strong> Add the code to your main template file so it appears on all pages.
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Test & Deploy',
      description: 'Verify your banner is working and deploy to production',
      icon: Eye,
      isCompleted: false,
      content: (
        <div className="p-6 bg-background rounded-lg border border-border shadow-sm">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Refresh your website</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Check banner appears</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-sm text-muted-foreground">Test all buttons work</span>
            </div>
            <div className="mt-4 p-3 bg-muted rounded-lg border border-border">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Your banner is live and GDPR compliant!
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  const startAnimation = () => {
    setIsAnimating(true)
    setCurrentStep(0)
    setCompletedSteps([])
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps(prev => [...prev, currentStep])
      setCurrentStep(prev => prev + 1)
    } else {
      setCompletedSteps([0, 1, 2])
      setIsAnimating(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Installation in 3 Simple Steps
        </h3>
        <p className="text-muted-foreground">
          From code to live banner in under 5 minutes
        </p>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                  completedSteps.includes(index)
                    ? 'bg-primary text-primary-foreground'
                    : currentStep === index
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {completedSteps.includes(index) ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-6 w-6" />
                  )}
                </div>
                <span className="text-xs font-medium text-muted-foreground mt-2 text-center">
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="h-5 w-5 text-muted-foreground mx-4" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="mb-8">
        {steps[currentStep] && (
          <div className="text-center mb-6">
            <h4 className="text-xl font-semibold text-foreground mb-2">
              Step {currentStep + 1}: {steps[currentStep].title}
            </h4>
            <p className="text-muted-foreground">
              {steps[currentStep].description}
            </p>
          </div>
        )}

        <div className="min-h-[300px] flex items-center justify-center">
          {steps[currentStep]?.content}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Installation Progress</span>
          <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground transition-colors font-medium"
        >
          {isAnimating ? 'Running Demo...' : 'Start Installation Demo'}
        </button>

        {isAnimating && currentStep < steps.length - 1 && (
          <button
            onClick={nextStep}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Next Step
          </button>
        )}
      </div>

      {/* Completion Message */}
      {completedSteps.length === steps.length && (
        <div className="mt-8 p-6 bg-muted rounded-xl border border-border">
          <div className="text-center">
            <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="text-lg font-semibold text-foreground mb-2">
              Installation Complete!
            </h4>
            <p className="text-muted-foreground">
              Your cookie banner is now live and GDPR compliant
            </p>
          </div>
        </div>
      )}

      {/* Platform-Specific Tips */}
      <div className="mt-8 grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-muted rounded-lg">
          <h5 className="font-semibold text-foreground mb-2">WordPress</h5>
          <p className="text-sm text-muted-foreground">
            Add to your theme's functions.php or use a plugin
          </p>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h5 className="font-semibold text-foreground mb-2">HTML/CSS</h5>
          <p className="text-sm text-muted-foreground">
            Paste directly into your website's head section
          </p>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h5 className="font-semibold text-foreground mb-2">React/Next.js</h5>
          <p className="text-sm text-muted-foreground">
            Add to your main component or _app.js file
          </p>
        </div>
      </div>
    </div>
  )
}

'use client'

import { Check, Shield, Globe, Building, Info } from 'lucide-react'
import { ComplianceFramework } from '@/types'

interface ComplianceSelectorProps {
  selectedFramework: ComplianceFramework
  onFrameworkChange: (framework: ComplianceFramework) => void
}

const frameworkIcons = {
  pipeda: Building, // Canada
  gdpr: Shield, // EU
  ccpa: Globe, // California
  custom: Info
}

const frameworkColors = {
  pipeda: 'bg-red-100 text-red-800 border-red-200',
  gdpr: 'bg-blue-100 text-blue-800 border-blue-200',
  ccpa: 'bg-green-100 text-green-800 border-green-200',
  custom: 'bg-purple-100 text-purple-800 border-purple-200'
}

export function ComplianceSelector({ selectedFramework, onFrameworkChange }: ComplianceSelectorProps) {
  const frameworks: ComplianceFramework[] = ['pipeda', 'gdpr', 'ccpa', 'custom']

  const frameworkLabels = {
    pipeda: 'Canada',
    gdpr: 'European Union',
    ccpa: 'California, USA',
    custom: 'Custom Requirements'
  }

  return (
    <div className="space-y-4">
      {/* Compact Framework Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {frameworks.map((framework) => {
          const Icon = frameworkIcons[framework]
          const isSelected = selectedFramework === framework
          
          return (
            <button
              key={framework}
              type="button"
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all cursor-pointer ${
                isSelected 
                  ? 'border-primary bg-primary/10 ring-2 ring-primary/20' 
                  : 'border-border hover:border-gray-300 hover:bg-muted/50'
              }`}
              onClick={() => onFrameworkChange(framework)}
            >
              <div className={`p-2 rounded-lg mb-2 ${frameworkColors[framework]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="font-semibold text-sm capitalize mb-1">
                {framework === 'custom' ? 'CUSTOM' : framework.toUpperCase()}
              </div>
              <div className="text-xs text-muted-foreground text-center">
                {frameworkLabels[framework]}
              </div>
              {isSelected && (
                <Check className="h-4 w-4 text-primary mt-1" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

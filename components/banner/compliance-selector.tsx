'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Shield, Globe, Building, Info } from 'lucide-react'
import { ComplianceFramework } from '@/types'
import { 
  getComplianceRequirements, 
  getFrameworkDescription, 
  getFrameworkFeatures 
} from '@/lib/compliance-frameworks'

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
  const [showDetails, setShowDetails] = useState<ComplianceFramework | null>(null)

  const frameworks: ComplianceFramework[] = ['pipeda', 'gdpr', 'ccpa', 'custom']

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Choose Your Compliance Framework</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select the privacy law that applies to your website. This will configure your banner's requirements and legal text.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {frameworks.map((framework) => {
          const Icon = frameworkIcons[framework]
          const requirements = getComplianceRequirements(framework)
          const description = getFrameworkDescription(framework)
          const features = getFrameworkFeatures(framework)
          const isSelected = selectedFramework === framework
          
          return (
            <Card 
              key={framework}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary border-primary' : 'hover:border-gray-300'
              }`}
              onClick={() => onFrameworkChange(framework)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${frameworkColors[framework]}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg capitalize">
                        {framework.toUpperCase()}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {framework === 'pipeda' && 'Canada'}
                        {framework === 'gdpr' && 'European Union'}
                        {framework === 'ccpa' && 'California, USA'}
                        {framework === 'custom' && 'Custom Requirements'}
                      </CardDescription>
                    </div>
                  </div>
                  {isSelected && (
                    <Badge variant="default" className="bg-primary">
                      <Check className="h-3 w-3 mr-1" />
                      Selected
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4">
                  {framework === 'pipeda' && 'Canada\'s federal privacy law. Less strict than GDPR, allows implied consent.'}
                  {framework === 'gdpr' && 'EU\'s strict privacy law. Requires explicit opt-in consent and granular controls.'}
                  {framework === 'ccpa' && 'California privacy law. Opt-out based with clear disclosure requirements.'}
                  {framework === 'custom' && 'Custom framework for specific regional or multi-jurisdictional needs.'}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span>Consent Type:</span>
                    <Badge variant="outline" className="text-xs">
                      {requirements.requiresOptIn ? 'Opt-in' : 'Opt-out'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Granular Controls:</span>
                    <Badge variant="outline" className="text-xs">
                      {requirements.requiresGranularConsent ? 'Required' : 'Optional'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Max Penalty:</span>
                    <span className="text-xs text-muted-foreground">
                      {requirements.maxPenalty}
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-4 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowDetails(showDetails === framework ? null : framework)
                  }}
                >
                  {showDetails === framework ? 'Hide Details' : 'Show Details'}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Detailed View */}
      {showDetails && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className={`p-2 rounded-lg ${frameworkColors[showDetails]}`}>
                {(() => {
                  const Icon = frameworkIcons[showDetails]
                  return <Icon className="h-5 w-5" />
                })()}
              </div>
              <span>{showDetails.toUpperCase()} Compliance Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Overview</h4>
              <p className="text-sm text-muted-foreground">
                {getFrameworkDescription(showDetails)}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Key Requirements</h4>
                <ul className="space-y-2">
                  {getFrameworkFeatures(showDetails).map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Technical Specifications</h4>
                <div className="space-y-3">
                  {Object.entries(getComplianceRequirements(showDetails)).map(([key, value]) => {
                    if (key === 'framework') return null
                    return (
                      <div key={key} className="flex justify-between items-center text-sm">
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : 
                           typeof value === 'number' ? `${value} months` : 
                           value}
                        </Badge>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Framework Comparison */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Framework Comparison</CardTitle>
          <CardDescription>
            Quick comparison of key differences between compliance frameworks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Requirement</th>
                  <th className="text-center py-2">PIPEDA</th>
                  <th className="text-center py-2">GDPR</th>
                  <th className="text-center py-2">CCPA</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="py-2">Consent Type</td>
                  <td className="text-center py-2">
                    <Badge variant="outline" className="text-xs">Opt-out</Badge>
                  </td>
                  <td className="text-center py-2">
                    <Badge variant="outline" className="text-xs">Opt-in</Badge>
                  </td>
                  <td className="text-center py-2">
                    <Badge variant="outline" className="text-xs">Opt-out</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Granular Controls</td>
                  <td className="text-center py-2">
                    <Badge variant="secondary" className="text-xs">Optional</Badge>
                  </td>
                  <td className="text-center py-2">
                    <Badge variant="default" className="text-xs">Required</Badge>
                  </td>
                  <td className="text-center py-2">
                    <Badge variant="default" className="text-xs">Required</Badge>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Max Penalty</td>
                  <td className="text-center py-2 text-xs">Reputation</td>
                  <td className="text-center py-2 text-xs">€20M</td>
                  <td className="text-center py-2 text-xs">$7,500</td>
                </tr>
                <tr>
                  <td className="py-2">Consent Expiry</td>
                  <td className="text-center py-2 text-xs">24 months</td>
                  <td className="text-center py-2 text-xs">12 months</td>
                  <td className="text-center py-2 text-xs">12 months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

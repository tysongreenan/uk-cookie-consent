'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react'

export function ExpressConsentDemo() {
  const [consentGiven, setConsentGiven] = useState(false)
  const [showBlocked, setShowBlocked] = useState(false)

  const handleGiveConsent = () => {
    setConsentGiven(true)
    setShowBlocked(false)
  }

  const handleWithdrawConsent = () => {
    setConsentGiven(false)
    setShowBlocked(true)
  }

  const handleReset = () => {
    setConsentGiven(false)
    setShowBlocked(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Express Consent & Opt-in
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Non-essential cookies are blocked until explicit consent is given
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current state indicator */}
        <div className="p-3 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            {consentGiven ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Consent Given</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-600">No Consent</span>
              </>
            )}
          </div>
          
          <div className="text-xs text-muted-foreground">
            {consentGiven 
              ? 'Analytics and marketing scripts are now active'
              : 'Analytics and marketing scripts are blocked'
            }
          </div>
        </div>

        {/* Script status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span>Google Analytics:</span>
            <Badge variant={consentGiven ? "default" : "secondary"}>
              {consentGiven ? 'Active' : 'Blocked'}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Facebook Pixel:</span>
            <Badge variant={consentGiven ? "default" : "secondary"}>
              {consentGiven ? 'Active' : 'Blocked'}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span>Marketing Cookies:</span>
            <Badge variant={consentGiven ? "default" : "secondary"}>
              {consentGiven ? 'Active' : 'Blocked'}
            </Badge>
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-2">
          {!consentGiven ? (
            <Button onClick={handleGiveConsent} className="w-full">
              Give Consent
            </Button>
          ) : (
            <Button onClick={handleWithdrawConsent} variant="outline" className="w-full">
              Withdraw Consent
            </Button>
          )}
          
          <Button onClick={handleReset} variant="ghost" size="sm" className="w-full">
            Reset Demo
          </Button>
        </div>

        {/* Compliance info */}
        <div className="pt-3 border-t">
          <div className="text-xs text-muted-foreground">
            <strong>PIPEDA Compliant:</strong> Express opt-in required for non-essential cookies
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

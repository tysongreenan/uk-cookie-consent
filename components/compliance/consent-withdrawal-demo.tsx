'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Settings, ArrowRight } from 'lucide-react'

export function ConsentWithdrawalDemo() {
  const [showPreferences, setShowPreferences] = useState(false)
  const [currentConsent, setCurrentConsent] = useState({
    analytics: true,
    marketing: false
  })

  const handlePreferencesClick = () => {
    setShowPreferences(true)
  }

  const handleClosePreferences = () => {
    setShowPreferences(false)
  }

  const handleUpdateConsent = (newConsent: typeof currentConsent) => {
    setCurrentConsent(newConsent)
    setShowPreferences(false)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Consent Withdrawal</CardTitle>
        <p className="text-sm text-muted-foreground">
          Users can easily change their cookie preferences at any time
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current consent status */}
        <div className="p-3 bg-muted rounded-lg">
          <h4 className="font-medium text-sm mb-2">Current Settings</h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Analytics:</span>
              <Badge variant={currentConsent.analytics ? "default" : "secondary"}>
                {currentConsent.analytics ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span>Marketing:</span>
              <Badge variant={currentConsent.marketing ? "default" : "secondary"}>
                {currentConsent.marketing ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Cookie settings button */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handlePreferencesClick}
        >
          <Settings className="h-4 w-4 mr-2" />
          Change Cookie Settings
        </Button>

        {/* Preferences modal simulation */}
        {showPreferences && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-sm">
              <CardHeader>
                <CardTitle className="text-lg">Cookie Preferences</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Update your cookie settings
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Analytics</h4>
                      <p className="text-xs text-muted-foreground">Help us improve our site</p>
                    </div>
                    <Button
                      variant={currentConsent.analytics ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateConsent({
                        ...currentConsent,
                        analytics: !currentConsent.analytics
                      })}
                    >
                      {currentConsent.analytics ? 'On' : 'Off'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm">Marketing</h4>
                      <p className="text-xs text-muted-foreground">Personalized ads and content</p>
                    </div>
                    <Button
                      variant={currentConsent.marketing ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleUpdateConsent({
                        ...currentConsent,
                        marketing: !currentConsent.marketing
                      })}
                    >
                      {currentConsent.marketing ? 'On' : 'Off'}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClosePreferences}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleClosePreferences}
                    className="flex-1"
                  >
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="pt-3 border-t">
          <div className="text-xs text-muted-foreground">
            <strong>PIPEDA Compliant:</strong> Easy consent withdrawal mechanism always available
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

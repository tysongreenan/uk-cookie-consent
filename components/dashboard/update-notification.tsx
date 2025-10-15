'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Sparkles, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface UpdateNotificationProps {
  isVisible: boolean
  onDismiss: () => void
  migrationNotes?: string[]
  onUpdateBanner?: () => void
}

export function UpdateNotification({ 
  isVisible, 
  onDismiss, 
  migrationNotes = [],
  onUpdateBanner 
}: UpdateNotificationProps) {
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if user has dismissed this notification before
    const dismissed = localStorage.getItem('banner-update-dismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem('banner-update-dismissed', 'true')
    onDismiss()
  }

  if (!isVisible || isDismissed) {
    return null
  }

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50/50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-sm font-semibold text-blue-900">
                  New Features Available!
                </h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  v2.0.0
                </Badge>
              </div>
              <p className="text-sm text-blue-800 mb-3">
                Your cookie banners have been automatically updated with new features:
              </p>
              
              {migrationNotes.length > 0 ? (
                <ul className="text-sm text-blue-700 space-y-1 mb-3">
                  {migrationNotes.map((note, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="text-sm text-blue-700 space-y-1 mb-3">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                    <span>Enhanced preferences modal with cookie category toggles</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                    <span>Improved user experience and better compliance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-blue-600 flex-shrink-0" />
                    <span>Advanced script management and performance optimizations</span>
                  </li>
                </ul>
              )}
              
              <div className="flex items-center space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={onUpdateBanner}
                >
                  View Updated Banner
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="text-blue-600 hover:bg-blue-100"
                  onClick={handleDismiss}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="flex-shrink-0 text-blue-400 hover:text-blue-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

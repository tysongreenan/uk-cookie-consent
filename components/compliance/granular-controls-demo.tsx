'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle } from 'lucide-react'

export function GranularControlsDemo() {
  const [preferences, setPreferences] = useState({
    strictlyNecessary: true,
    functionality: false,
    analytics: false,
    marketing: false
  })

  const categories = [
    {
      id: 'strictlyNecessary',
      name: 'Strictly Necessary',
      description: 'Required for website functionality',
      required: true,
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'functionality',
      name: 'Functionality',
      description: 'Enhanced user experience features',
      required: false,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Help us understand site usage',
      required: false,
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      description: 'Personalized ads and content',
      required: false,
      color: 'bg-orange-100 text-orange-800'
    }
  ]

  const handleToggle = (categoryId: string) => {
    if (categoryId === 'strictlyNecessary') return // Can't disable required cookies
    
    setPreferences(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId as keyof typeof prev]
    }))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg">Granular Cookie Controls</CardTitle>
        <p className="text-sm text-muted-foreground">
          Users can select specific cookie categories rather than blanket accept/reject
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-sm">{category.name}</h4>
                <Badge className={category.color}>
                  {category.required ? 'Required' : 'Optional'}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>
            <div className="flex items-center gap-2">
              {preferences[category.id as keyof typeof preferences] ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400" />
              )}
              <Switch
                checked={preferences[category.id as keyof typeof preferences]}
                onCheckedChange={() => handleToggle(category.id)}
                disabled={category.required}
              />
            </div>
          </div>
        ))}
        
        <div className="pt-3 border-t">
          <div className="text-xs text-muted-foreground">
            <strong>PIPEDA Compliant:</strong> Users have granular control over their data preferences
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

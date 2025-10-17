'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Crown, Zap, Users, Palette, Upload, BarChart3 } from 'lucide-react'
import Link from 'next/link'

interface UpgradePromptProps {
  feature: string
  description?: string
  variant?: 'banner' | 'card' | 'inline'
  className?: string
}

export function UpgradePrompt({ 
  feature, 
  description, 
  variant = 'banner',
  className = '' 
}: UpgradePromptProps) {
  const proFeatures = [
    { icon: <BarChart3 className="h-4 w-4" />, text: 'Analytics Dashboard' },
    { icon: <Users className="h-4 w-4" />, text: 'Team Collaboration' },
    { icon: <Palette className="h-4 w-4" />, text: 'Custom Layouts' },
    { icon: <Upload className="h-4 w-4" />, text: 'Image Upload' },
    { icon: <Crown className="h-4 w-4" />, text: 'Priority Support' }
  ]

  if (variant === 'banner') {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Crown className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Unlock {feature} with Pro</h3>
              <p className="text-sm text-blue-700">
                {description || 'Get access to advanced features and team collaboration'}
              </p>
            </div>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/upgrade">
              <Zap className="h-4 w-4 mr-2" />
              Upgrade to Pro - $48.99
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <Card className={`border-dashed border-2 border-gray-300 ${className}`}>
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Crown className="h-6 w-6 text-gray-600" />
          </div>
          <CardTitle className="text-lg">Pro Feature</CardTitle>
          <CardDescription>
            {feature} is available in Pro
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {proFeatures.map((item, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className="text-green-600">{item.icon}</div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t">
            <div className="text-center mb-4">
              <div className="text-2xl font-bold">$48.99</div>
              <div className="text-sm text-gray-600">One-time payment</div>
            </div>
            <Button asChild className="w-full">
              <Link href="/upgrade">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={`inline-flex items-center space-x-2 ${className}`}>
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Pro
        </Badge>
        <span className="text-sm text-gray-600">
          {feature} available in Pro
        </span>
        <Button asChild size="sm" variant="outline">
          <Link href="/upgrade">
            Upgrade
          </Link>
        </Button>
      </div>
    )
  }

  return null
}

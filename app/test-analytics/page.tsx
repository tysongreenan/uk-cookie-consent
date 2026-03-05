'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'react-hot-toast'

export default function TestAnalyticsPage() {
  const [userId, setUserId] = useState('')
  const [testResult, setTestResult] = useState('')

  const testConfigEndpoint = async () => {
    if (!userId) {
      toast.error('Please enter a user ID')
      return
    }

    try {
      const response = await fetch(`/api/v1/config/${userId}`)
      const data = await response.json()
      setTestResult(`Config API: ${JSON.stringify(data, null, 2)}`)
      toast.success('Config API test completed')
    } catch (error) {
      setTestResult(`Config API Error: ${error}`)
      toast.error('Config API test failed')
    }
  }

  const testTrackingEndpoint = async () => {
    if (!userId) {
      toast.error('Please enter a user ID')
      return
    }

    try {
      const response = await fetch('/api/v1/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          events: [
            { type: 'impression', isReturning: false },
            { type: 'accept', decisionTime: 2500, isReturning: false }
          ]
        })
      })
      const data = await response.json()
      setTestResult(`Tracking API: ${JSON.stringify(data, null, 2)}`)
      toast.success('Tracking API test completed')
    } catch (error) {
      setTestResult(`Tracking API Error: ${error}`)
      toast.error('Tracking API test failed')
    }
  }

  const testBannerJS = async () => {
    if (!userId) {
      toast.error('Please enter a user ID')
      return
    }

    try {
      const response = await fetch(`/api/v1/banner.js?id=${userId}`)
      const bannerCode = await response.text()
      setTestResult(`Banner.js generated (${bannerCode.length} chars):\n${bannerCode.substring(0, 500)}...`)
      toast.success('Banner.js generated successfully')
    } catch (error) {
      setTestResult(`Banner.js Error: ${error}`)
      toast.error('Banner.js generation failed')
    }
  }

  const runMigration = async () => {
    try {
      const response = await fetch('/api/debug/migrate', {
        method: 'POST'
      })
      const data = await response.json()
      setTestResult(`Migration: ${JSON.stringify(data, null, 2)}`)
      toast.success('Migration completed')
    } catch (error) {
      setTestResult(`Migration Error: ${error}`)
      toast.error('Migration failed')
    }
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Analytics System Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Configuration</CardTitle>
            <CardDescription>Enter a user ID to test the analytics endpoints</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="Enter user ID"
              />
            </div>
            
            <div className="space-y-2">
              <Button onClick={runMigration} variant="outline" className="w-full">
                Run Database Migration
              </Button>
              <Button onClick={testConfigEndpoint} className="w-full">
                Test Config API
              </Button>
              <Button onClick={testTrackingEndpoint} variant="secondary" className="w-full">
                Test Tracking API
              </Button>
              <Button onClick={testBannerJS} variant="outline" className="w-full">
                Test Banner.js Generation
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
            <CardDescription>Results from the API tests</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-96">
              {testResult || 'No tests run yet...'}
            </pre>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Test</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>First, run the database migration to create the analytics tables</li>
            <li>Create a user account and note the user ID</li>
            <li>Create a banner in the dashboard</li>
            <li>Enter the user ID above and test each endpoint</li>
            <li>Check the results to ensure everything is working</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

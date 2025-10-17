'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Search, AlertTriangle, CheckCircle, Download, ExternalLink } from 'lucide-react'

interface CookieData {
  name: string
  domain: string
  purpose: string
  category: 'necessary' | 'analytics' | 'marketing' | 'functional'
  expires: string
  secure: boolean
  httpOnly: boolean
  sameSite: string
  thirdParty: boolean
}

interface ScanResult {
  url: string
  cookies: CookieData[]
  compliance: {
    gdpr: { score: number; issues: string[] }
    pipeda: { score: number; issues: string[] }
    ccpa: { score: number; issues: string[] }
  }
  recommendations: string[]
  timestamp: string
}

export function CookieScanner() {
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState('')

  const validateUrl = (inputUrl: string): boolean => {
    try {
      const url = new URL(inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`)
      return ['http:', 'https:'].includes(url.protocol)
    } catch {
      return false
    }
  }

  const simulateCookieScan = async (targetUrl: string): Promise<ScanResult> => {
    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock cookie data - in a real implementation, this would be actual scanning
    const mockCookies: CookieData[] = [
      {
        name: '_ga',
        domain: '.example.com',
        purpose: 'Google Analytics tracking',
        category: 'analytics',
        expires: '2 years',
        secure: true,
        httpOnly: false,
        sameSite: 'Lax',
        thirdParty: false
      },
      {
        name: '_fbp',
        domain: '.facebook.com',
        purpose: 'Facebook Pixel tracking',
        category: 'marketing',
        expires: '3 months',
        secure: true,
        httpOnly: false,
        sameSite: 'None',
        thirdParty: true
      },
      {
        name: 'sessionid',
        domain: '.example.com',
        purpose: 'User session management',
        category: 'necessary',
        expires: 'Session',
        secure: true,
        httpOnly: true,
        sameSite: 'Lax',
        thirdParty: false
      },
      {
        name: 'preferences',
        domain: '.example.com',
        purpose: 'User preferences storage',
        category: 'functional',
        expires: '1 year',
        secure: true,
        httpOnly: false,
        sameSite: 'Lax',
        thirdParty: false
      },
      {
        name: '_gid',
        domain: '.example.com',
        purpose: 'Google Analytics client ID',
        category: 'analytics',
        expires: '24 hours',
        secure: true,
        httpOnly: false,
        sameSite: 'Lax',
        thirdParty: false
      }
    ]

    const compliance = {
      gdpr: {
        score: 75,
        issues: [
          'Analytics cookies require explicit consent',
          'Marketing cookies need granular consent',
          'Cookie policy missing consent withdrawal mechanism'
        ]
      },
      pipeda: {
        score: 85,
        issues: [
          'Marketing cookies need explicit consent',
          'Cookie notice should be more prominent'
        ]
      },
      ccpa: {
        score: 70,
        issues: [
          'Marketing cookies constitute "sale" under CCPA',
          '"Do Not Sell" link required',
          'Opt-out mechanism needed for advertising cookies'
        ]
      }
    }

    const recommendations = [
      'Implement cookie consent banner with granular controls',
      'Add "Do Not Sell My Personal Information" link for CCPA compliance',
      'Update privacy policy to include detailed cookie information',
      'Consider implementing Consent Mode v2 for Google Analytics',
      'Review and categorize all third-party cookies',
      'Implement cookie consent management platform'
    ]

    return {
      url: targetUrl,
      cookies: mockCookies,
      compliance,
      recommendations,
      timestamp: new Date().toISOString()
    }
  }

  const handleScan = async () => {
    if (!url.trim()) {
      setError('Please enter a website URL')
      return
    }

    if (!validateUrl(url)) {
      setError('Please enter a valid website URL (e.g., example.com or https://example.com)')
      return
    }

    setIsScanning(true)
    setError('')
    setResult(null)

    try {
      const targetUrl = url.startsWith('http') ? url : `https://${url}`
      const scanResult = await simulateCookieScan(targetUrl)
      setResult(scanResult)
    } catch (err) {
      setError('Failed to scan website. Please try again.')
    } finally {
      setIsScanning(false)
    }
  }

  const getComplianceColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  const getComplianceBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">Good</Badge>
    if (score >= 60) return <Badge className="bg-orange-100 text-orange-800">Fair</Badge>
    return <Badge className="bg-red-100 text-red-800">Poor</Badge>
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'necessary': return 'bg-green-100 text-green-800'
      case 'analytics': return 'bg-blue-100 text-blue-800'
      case 'marketing': return 'bg-red-100 text-red-800'
      case 'functional': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="website-url">Website URL</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="website-url"
              type="url"
              placeholder="Enter website URL (e.g., example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleScan()}
              disabled={isScanning}
            />
            <Button 
              onClick={handleScan} 
              disabled={isScanning || !url.trim()}
              className="px-6"
            >
              {isScanning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Scan
                </>
              )}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Scan Results for {result.url}
              </CardTitle>
              <CardDescription>
                Scanned on {new Date(result.timestamp).toLocaleDateString()} at {new Date(result.timestamp).toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{result.cookies.length}</div>
                  <div className="text-sm text-gray-600">Total Cookies</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {result.cookies.filter(c => c.thirdParty).length}
                  </div>
                  <div className="text-sm text-gray-600">Third-Party Cookies</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {result.cookies.filter(c => c.category === 'marketing').length}
                  </div>
                  <div className="text-sm text-gray-600">Marketing Cookies</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Scores */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Analysis</CardTitle>
              <CardDescription>
                Your website's compliance score across different privacy laws
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">GDPR</h4>
                    {getComplianceBadge(result.compliance.gdpr.score)}
                  </div>
                  <div className={`text-2xl font-bold ${getComplianceColor(result.compliance.gdpr.score)}`}>
                    {result.compliance.gdpr.score}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {result.compliance.gdpr.issues.length} issues found
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">PIPEDA</h4>
                    {getComplianceBadge(result.compliance.pipeda.score)}
                  </div>
                  <div className={`text-2xl font-bold ${getComplianceColor(result.compliance.pipeda.score)}`}>
                    {result.compliance.pipeda.score}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {result.compliance.pipeda.issues.length} issues found
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">CCPA</h4>
                    {getComplianceBadge(result.compliance.ccpa.score)}
                  </div>
                  <div className={`text-2xl font-bold ${getComplianceColor(result.compliance.ccpa.score)}`}>
                    {result.compliance.ccpa.score}%
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {result.compliance.ccpa.issues.length} issues found
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Details */}
          <Card>
            <CardHeader>
              <CardTitle>Cookie Details</CardTitle>
              <CardDescription>
                Complete list of cookies found on your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.cookies.map((cookie, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{cookie.name}</h4>
                        <Badge className={getCategoryColor(cookie.category)}>
                          {cookie.category}
                        </Badge>
                        {cookie.thirdParty && (
                          <Badge variant="outline">Third-Party</Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <strong>Domain:</strong> {cookie.domain}
                      </div>
                      <div>
                        <strong>Purpose:</strong> {cookie.purpose}
                      </div>
                      <div>
                        <strong>Expires:</strong> {cookie.expires}
                      </div>
                      <div>
                        <strong>Security:</strong> {cookie.secure ? 'Secure' : 'Not Secure'}
                      </div>
                      <div>
                        <strong>HttpOnly:</strong> {cookie.httpOnly ? 'Yes' : 'No'}
                      </div>
                      <div>
                        <strong>SameSite:</strong> {cookie.sameSite}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Actionable steps to improve your cookie compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Full Report
            </Button>
            <Button variant="outline" className="flex-1">
              <ExternalLink className="mr-2 h-4 w-4" />
              Get Cookie Banner Solution
            </Button>
          </div>
        </div>
      )}

      {/* Info Section */}
      {!result && !isScanning && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                How Our Cookie Scanner Works
              </h3>
              <p className="text-blue-700 mb-4">
                Our advanced scanner analyzes your website to identify all cookies, categorize them by purpose, 
                and provide compliance recommendations for GDPR, PIPEDA, and CCPA.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>Scans all pages and scripts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>Identifies third-party cookies</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span>Provides compliance analysis</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

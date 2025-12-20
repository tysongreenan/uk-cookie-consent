import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, Database, Shield, Zap, Users, Globe, BarChart3, CheckCircle, AlertTriangle, ExternalLink, Download, Settings } from '@phosphor-icons/react'

export const metadata: Metadata = {
  title: 'SaaS Cookie Consent | B2B Privacy Compliance Solution 2025',
  description: 'Complete SaaS cookie consent solution for B2B software companies. Multi-tenant compliance, API-first consent management, developer SDKs, enterprise authentication integration.',
  keywords: 'saas gdpr compliance, b2b cookie consent, software privacy compliance, multi-tenant consent management, enterprise cookie consent',
  openGraph: {
    title: 'SaaS Cookie Consent | B2B Privacy Compliance Solution 2025',
    description: 'Complete SaaS cookie consent solution for B2B software companies. Multi-tenant compliance, API-first consent management, developer SDKs.',
    type: 'article',
  },
}

export default function SaaSSolutionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500 text-white">SaaS Solution</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              SaaS Cookie Consent
              <span className="block text-blue-200">Built for Developers</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Complete cookie consent solution for B2B software companies. Multi-tenant compliance, API-first consent management, developer SDKs, and enterprise authentication integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Code className="mr-2 h-5 w-5" />
                Get Developer SDK
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <BarChart3 className="mr-2 h-5 w-5" />
                View API Docs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SaaS Challenges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                SaaS Cookie Compliance Challenges
              </h2>
              <p className="text-xl text-gray-600">
                B2B software companies face unique privacy compliance challenges
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Database className="h-6 w-6 text-blue-500" />
                    <CardTitle>Multi-Tenant Architecture</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Managing consent across multiple customers, organizations, and regions with different privacy requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-green-500" />
                    <CardTitle>API-First Integration</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Developers need programmatic access to consent data for real-time decision making in applications.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-purple-500" />
                    <CardTitle>Enterprise Authentication</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Integrating with SSO, SAML, OAuth, and other enterprise authentication systems while managing consent.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe className="h-6 w-6 text-orange-500" />
                    <CardTitle>Global Data Flows</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Handling data transfers across regions with different privacy laws and consent requirements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-red-500" />
                    <CardTitle>Data Residency Requirements</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Ensuring consent data stays in specific regions or countries as required by enterprise customers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Settings className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Complex Consent Workflows</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Managing consent across multiple features, data types, and user roles within complex SaaS applications.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Developer-First API
              </h2>
              <p className="text-xl text-gray-600">
                Programmatic consent management for modern SaaS applications
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    REST API Endpoints
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// Get consent status for user
GET /api/v1/consent/{userId}

// Update consent preferences
POST /api/v1/consent/{userId}

// Get tenant-specific settings
GET /api/v1/tenant/{tenantId}/settings

// Webhook notifications
POST /webhooks/consent-updated`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>RESTful API with JSON responses</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Rate limiting and authentication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Webhook support for real-time updates</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    SDK Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// JavaScript SDK
npm install @cookiebanner/saas-sdk

import { ConsentManager } from '@cookiebanner/saas-sdk';

const consentManager = new ConsentManager({
  apiKey: 'your-api-key',
  tenantId: 'tenant-123'
});

// Check consent status
const hasConsent = await consentManager
  .hasConsent('analytics');`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>JavaScript, Python, PHP, Java SDKs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>TypeScript definitions included</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>React, Vue, Angular components</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Multi-Tenant Consent Architecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-yellow-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`// Multi-tenant consent management
class ConsentManager {
  constructor(config) {
    this.tenantId = config.tenantId;
    this.userId = config.userId;
    this.apiKey = config.apiKey;
  }

  async getConsent(category) {
    const response = await fetch(
      \`/api/v1/tenant/\${this.tenantId}/consent/\${this.userId}/\${category}\`,
      {
        headers: {
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.json();
  }

  async updateConsent(category, granted) {
    return fetch(
      \`/api/v1/tenant/\${this.tenantId}/consent/\${this.userId}\`,
      {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          category,
          granted,
          timestamp: new Date().toISOString()
        })
      }
    );
  }
}`}</pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enterprise Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Enterprise SaaS Features
              </h2>
              <p className="text-xl text-gray-600">
                Built for complex B2B software environments
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Multi-Tenant Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Tenant-specific consent configurations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Organization-level consent policies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Role-based consent management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Bulk consent operations</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>SOC 2 Type II compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Data encryption at rest and in transit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Audit trail and logging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>GDPR Article 30 compliance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Developer Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>GraphQL API support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Webhook event system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Testing sandbox environment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Postman collection</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Global Deployment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Multi-region data centers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Data residency controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Edge computing support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>99.9% SLA guarantee</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Examples */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Integration Examples
              </h2>
              <p className="text-xl text-gray-600">
                See how leading SaaS companies implement consent management
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    SSO Integration Example
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// SAML/OAuth consent integration
class SSOConsentHandler {
  async handleUserLogin(user, ssoProvider) {
    // Get user's consent preferences from SSO context
    const consentContext = await this.extractConsentFromSSO(user, ssoProvider);
    
    // Apply tenant-specific consent rules
    const tenantRules = await this.getTenantConsentRules(user.tenantId);
    
    // Merge SSO consent with tenant requirements
    const finalConsent = this.mergeConsentPreferences(
      consentContext, 
      tenantRules
    );
    
    // Store consent in our system
    await this.consentManager.updateConsent(user.id, finalConsent);
    
    return finalConsent;
  }
}`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Microservices Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// Consent-aware microservice
class AnalyticsService {
  constructor(consentManager) {
    this.consentManager = consentManager;
  }
  
  async trackEvent(userId, event) {
    // Check consent before tracking
    const hasConsent = await this.consentManager
      .hasConsent(userId, 'analytics');
    
    if (!hasConsent) {
      return; // Skip tracking
    }
    
    // Proceed with tracking
    await this.sendEventToAnalytics(event);
  }
  
  async getUserAnalytics(userId) {
    const hasConsent = await this.consentManager
      .hasConsent(userId, 'analytics');
    
    return hasConsent ? this.getFullAnalytics(userId) : null;
  }
}`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Real-time Consent Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-purple-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// WebSocket consent updates
class RealTimeConsentHandler {
  constructor(websocket) {
    this.websocket = websocket;
    this.consentCache = new Map();
  }
  
  async handleConsentUpdate(update) {
    const { userId, category, granted } = update;
    
    // Update local cache
    this.consentCache.set(\`\${userId}:\${category}\`, granted);
    
    // Notify all connected clients
    this.websocket.broadcast({
      type: 'consent_update',
      userId,
      category,
      granted
    });
    
    // Trigger feature updates
    await this.updateUserFeatures(userId, category, granted);
  }
  
  async updateUserFeatures(userId, category, granted) {
    // Disable/enable features based on consent
    if (category === 'analytics' && !granted) {
      await this.disableAnalyticsFeatures(userId);
    }
  }
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                SaaS Implementation Guide
              </h2>
              <p className="text-xl text-gray-600">
                Get your B2B software compliant in 5 developer-friendly steps
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
                    Install SDK
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Add our SDK to your application:
                  </p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`# Install the SDK
npm install @cookiebanner/saas-sdk

# Or with yarn
yarn add @cookiebanner/saas-sdk

# Initialize in your app
import { ConsentManager } from '@cookiebanner/saas-sdk';

const consentManager = new ConsentManager({
  apiKey: process.env.COOKIE_CONSENT_API_KEY,
  baseUrl: 'https://api.cookiebanner.ca'
});`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
                    Configure Multi-Tenancy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up tenant-specific consent configurations:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Create tenant-specific consent policies</li>
                    <li>Configure regional compliance requirements</li>
                    <li>Set up organization-level consent defaults</li>
                    <li>Define role-based consent permissions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
                    Integrate with Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Connect consent management with your SSO/authentication system:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Sync consent preferences from SSO providers</li>
                    <li>Handle consent during user registration</li>
                    <li>Manage consent across different user roles</li>
                    <li>Implement consent delegation for admin users</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</span>
                    Implement Consent Checks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Add consent checks throughout your application:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Check consent before data collection</li>
                    <li>Implement feature flags based on consent</li>
                    <li>Handle consent withdrawals gracefully</li>
                    <li>Update UI based on consent status</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">5</span>
                    Monitor & Scale
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Set up monitoring and scaling for enterprise use:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Monitor consent API performance</li>
                    <li>Set up alerts for consent violations</li>
                    <li>Implement caching for high-traffic scenarios</li>
                    <li>Plan for multi-region deployment</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-cyan-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Compliant SaaS?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join leading B2B software companies using our developer-friendly consent management solution. Enterprise-grade security, global compliance, and seamless integration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Code className="mr-2 h-5 w-5" />
                Get Developer SDK
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                Download API Docs
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

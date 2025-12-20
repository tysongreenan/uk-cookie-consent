import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Code, Zap, Package, Users, CheckCircle, ExternalLink, Download, Settings } from '@phosphor-icons/react'

export const metadata: Metadata = {
  title: 'React Cookie Consent Integration | Next.js Component Library 2025',
  description: 'Complete React cookie consent integration guide. NPM package, component implementation, SSR support, TypeScript definitions. GDPR, PIPEDA, CCPA compliant React components.',
  keywords: 'react cookie consent, nextjs cookie banner, react gdpr compliance, typescript cookie consent, react component library',
  openGraph: {
    title: 'React Cookie Consent Integration | Next.js Component Library 2025',
    description: 'Complete React cookie consent integration guide. NPM package, component implementation, SSR support, TypeScript definitions.',
    type: 'article',
  },
}

export default function ReactIntegrationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500 text-white">React Integration</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              React Cookie Consent
              <span className="block text-blue-200">Developer-First Solution</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Complete React cookie consent integration guide. NPM package, component implementation, SSR support, TypeScript definitions. GDPR, PIPEDA, CCPA compliant React components for modern web applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Package className="mr-2 h-5 w-5" />
                Install NPM Package
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Code className="mr-2 h-5 w-5" />
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why React Developers Choose Our Solution */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why React Developers Choose Our Solution
              </h2>
              <p className="text-xl text-gray-600">
                Built specifically for modern React applications and developer workflows
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Package className="h-6 w-6 text-blue-500" />
                    <CardTitle>NPM Package</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Install via npm/yarn with full TypeScript support, tree-shaking, and modern ES modules.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Code className="h-6 w-6 text-green-500" />
                    <CardTitle>React Components</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Pre-built React components with hooks, context, and full customization options.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-purple-500" />
                    <CardTitle>SSR Support</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Full server-side rendering support for Next.js, Gatsby, and other React frameworks.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Settings className="h-6 w-6 text-orange-500" />
                    <CardTitle>TypeScript Ready</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Complete TypeScript definitions, interfaces, and type safety for modern React development.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-red-500" />
                    <CardTitle>Performance Optimized</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Minimal bundle size, lazy loading, and optimized for React's reconciliation process.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-indigo-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-6 w-6 text-indigo-500" />
                    <CardTitle>Developer Experience</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Intuitive API, comprehensive documentation, and excellent developer tools integration.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Installation & Setup */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Installation & Setup
              </h2>
              <p className="text-xl text-gray-600">
                Get started with React cookie consent in minutes
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Install Package
                  </CardTitle>
                  <CardDescription>Install via your preferred package manager</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`# Using npm
npm install @cookiebanner/react

# Using yarn
yarn add @cookiebanner/react

# Using pnpm
pnpm add @cookiebanner/react`}</pre>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="mb-2">Package includes:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>React components and hooks</li>
                        <li>TypeScript definitions</li>
                        <li>CSS styles and themes</li>
                        <li>Utility functions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Basic Implementation
                  </CardTitle>
                  <CardDescription>Simple component integration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import React from 'react';
import { CookieBanner, ConsentProvider } from '@cookiebanner/react';

function App() {
  return (
    <ConsentProvider>
      <div className="App">
        <CookieBanner />
        {/* Your app content */}
      </div>
    </ConsentProvider>
  );
}

export default App;`}</pre>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>That's it! The cookie banner will automatically appear and handle consent management.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Configuration
                  </CardTitle>
                  <CardDescription>Customize the banner to your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-purple-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import { CookieBanner, ConsentProvider } from '@cookiebanner/react';

const config = {
  compliance: 'gdpr',
  position: 'bottom-right',
  theme: 'dark',
  languages: ['en', 'es', 'fr'],
  analytics: {
    googleAnalytics: 'GA_MEASUREMENT_ID'
  }
};

function App() {
  return (
    <ConsentProvider config={config}>
      <CookieBanner />
    </ConsentProvider>
  );
}`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Next.js Integration
                  </CardTitle>
                  <CardDescription>Server-side rendering support</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-orange-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// pages/_app.tsx or app/layout.tsx
import { ConsentProvider } from '@cookiebanner/react';

export default function MyApp({ Component, pageProps }) {
  return (
    <ConsentProvider>
      <Component {...pageProps} />
    </ConsentProvider>
  );
}

// pages/_document.tsx (optional)
import { Html, Head, Main, NextScript } from 'next/document';
import { CookieScripts } from '@cookiebanner/react';

export default function Document() {
  return (
    <Html>
      <Head>
        <CookieScripts />
      </Head>
      <Body>
        <Main />
        <NextScript />
      </Body>
    </Html>
  );
}`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* React Hooks & API */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                React Hooks & API
              </h2>
              <p className="text-xl text-gray-600">
                Powerful hooks and utilities for advanced React applications
              </p>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    useConsent Hook
                  </CardTitle>
                  <CardDescription>Access consent state and controls</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import { useConsent } from '@cookiebanner/react';

function MyComponent() {
  const {
    hasConsent,
    getConsent,
    updateConsent,
    showBanner,
    hideBanner,
    consentState
  } = useConsent();

  // Check if user has given consent for analytics
  const canTrackAnalytics = hasConsent('analytics');

  // Get specific consent category
  const analyticsConsent = getConsent('analytics');

  // Update consent programmatically
  const handleAcceptAll = () => {
    updateConsent({
      necessary: true,
      analytics: true,
      marketing: true
    });
  };

  return (
    <div>
      {canTrackAnalytics && <AnalyticsComponent />}
      <button onClick={handleAcceptAll}>
        Accept All Cookies
      </button>
    </div>
  );
}`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    useConsentManager Hook
                  </CardTitle>
                  <CardDescription>Advanced consent management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import { useConsentManager } from '@cookiebanner/react';

function ConsentManager() {
  const {
    consentCategories,
    updateCategory,
    resetConsent,
    exportConsent,
    importConsent,
    consentHistory
  } = useConsentManager();

  // Update specific category
  const handleCategoryChange = (category, value) => {
    updateCategory(category, value);
  };

  // Reset all consent
  const handleReset = () => {
    resetConsent();
  };

  // Export consent data
  const handleExport = () => {
    const data = exportConsent();
    console.log('Consent data:', data);
  };

  return (
    <div>
      {Object.entries(consentCategories).map(([category, config]) => (
        <div key={category}>
          <label>
            <input
              type="checkbox"
              checked={config.consented}
              onChange={(e) => handleCategoryChange(category, e.target.checked)}
            />
            {config.name}
          </label>
        </div>
      ))}
      <button onClick={handleReset}>Reset Consent</button>
      <button onClick={handleExport}>Export Data</button>
    </div>
  );
}`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Conditional Rendering
                  </CardTitle>
                  <CardDescription>Render components based on consent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-purple-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`import { useConsent, ConsentGate } from '@cookiebanner/react';

// Method 1: Using hooks
function AnalyticsComponent() {
  const { hasConsent } = useConsent();
  
  if (!hasConsent('analytics')) {
    return <div>Analytics disabled</div>;
  }

  return <div>Analytics tracking active</div>;
}

// Method 2: Using ConsentGate component
function App() {
  return (
    <div>
      <ConsentGate category="analytics">
        <GoogleAnalytics />
      </ConsentGate>
      
      <ConsentGate category="marketing">
        <FacebookPixel />
      </ConsentGate>
      
      <ConsentGate category="necessary">
        <EssentialScripts />
      </ConsentGate>
    </div>
  );
}`}</pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* TypeScript Support */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                TypeScript Support
              </h2>
              <p className="text-xl text-gray-600">
                Complete type safety and IntelliSense support
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Type Definitions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// Fully typed configuration
interface ConsentConfig {
  compliance: 'gdpr' | 'pipeda' | 'ccpa' | 'custom';
  position: 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  theme: 'light' | 'dark' | 'auto';
  languages: string[];
  analytics?: {
    googleAnalytics?: string;
    facebookPixel?: string;
  };
  categories: {
    necessary: CategoryConfig;
    analytics: CategoryConfig;
    marketing: CategoryConfig;
    functionality: CategoryConfig;
  };
}

interface CategoryConfig {
  name: string;
  description: string;
  required: boolean;
  cookies: string[];
}`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Complete interface definitions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Hook return type safety</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Event handler types</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Hook Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                      <pre>{`// Typed hook returns
interface ConsentHookReturn {
  hasConsent: (category: ConsentCategory) => boolean;
  getConsent: (category: ConsentCategory) => ConsentState;
  updateConsent: (consent: ConsentMap) => void;
  showBanner: () => void;
  hideBanner: () => void;
  consentState: ConsentState;
}

type ConsentCategory = 'necessary' | 'analytics' | 'marketing' | 'functionality';

interface ConsentState {
  consented: boolean;
  timestamp: string;
  version: string;
  categories: Record<ConsentCategory, boolean>;
}

// Usage with full type safety
const MyComponent: React.FC = () => {
  const { hasConsent, updateConsent } = useConsent();
  
  // TypeScript will enforce correct category names
  const analyticsAllowed = hasConsent('analytics');
  
  // Type-safe consent updates
  updateConsent({
    analytics: true,
    marketing: false
  });
  
  return <div>Analytics: {analyticsAllowed ? 'Enabled' : 'Disabled'}</div>;
};`}</pre>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Autocomplete for category names</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Compile-time error checking</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Refactoring support</span>
                      </li>
                    </ul>
                  </div>
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
              Ready to Build Compliant React Apps?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of React developers using our cookie consent solution. TypeScript support, modern hooks, and seamless integration with your favorite frameworks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Package className="mr-2 h-5 w-5" />
                Install NPM Package
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="mr-2 h-5 w-5" />
                Download Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

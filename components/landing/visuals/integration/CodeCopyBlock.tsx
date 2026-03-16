'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeExample {
  id: string
  title: string
  description: string
  code: string
  language: string
  platform: string
}

export function CodeCopyBlock() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const codeExamples: CodeExample[] = [
    {
      id: 'html',
      title: 'HTML Integration',
      description: 'Add this single line to your website\'s <head> section',
      code: `<!-- Cookie Consent Banner -->
<script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID"></script>`,
      language: 'html',
      platform: 'Any Website'
    },
    {
      id: 'wordpress',
      title: 'WordPress Integration',
      description: 'Add to your theme\'s functions.php or use a plugin',
      code: `// Add to functions.php
function add_cookie_consent_banner() {
    ?>
    <script src="https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID"></script>
    <?php
}
add_action('wp_head', 'add_cookie_consent_banner');`,
      language: 'php',
      platform: 'WordPress'
    },
    {
      id: 'react',
      title: 'React Integration',
      description: 'Add to your React app\'s main component',
      code: `import { useEffect } from 'react';

function CookieConsent() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.cookie-banner.ca/api/v1/banner.js?id=YOUR_BANNER_ID';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}

export default CookieConsent;`,
      language: 'javascript',
      platform: 'React'
    }
  ]

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'html':
        return 'bg-primary'
      case 'php':
        return 'bg-primary'
      case 'javascript':
        return 'bg-primary'
      default:
        return 'bg-muted'
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Copy & Paste Integration
        </h3>
        <p className="text-muted-foreground">
          Choose your platform and copy the code. It's that simple.
        </p>
      </div>

      {/* Platform Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {codeExamples.map((example) => (
          <button
            key={example.id}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              copiedCode === example.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
            onClick={() => copyToClipboard(example.code, example.id)}
          >
            {example.platform}
          </button>
        ))}
      </div>

      {/* Code Examples */}
      <div className="space-y-6">
        {codeExamples.map((example) => (
          <div key={example.id} className="bg-foreground/95 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-foreground/90">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(example.language)}`} />
                <span className="text-background font-medium">{example.title}</span>
                <span className="text-background/80 text-sm">({example.platform})</span>
              </div>
              <button
                onClick={() => copyToClipboard(example.code, example.id)}
                className="flex items-center space-x-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
              >
                {copiedCode === example.id ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            <div className="px-4 py-2 bg-foreground/90 border-t border-background/10">
              <p className="text-background/80 text-sm">{example.description}</p>
            </div>

            {/* Code */}
            <div className="p-4">
              <pre className="text-sm text-background/80 overflow-x-auto">
                <code>{example.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Steps */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-muted rounded-xl">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold">1</span>
          </div>
          <h4 className="font-semibold text-foreground mb-2">Copy Code</h4>
          <p className="text-sm text-muted-foreground">
            Click the copy button for your platform
          </p>
        </div>

        <div className="text-center p-6 bg-muted rounded-xl">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold">2</span>
          </div>
          <h4 className="font-semibold text-foreground mb-2">Paste Code</h4>
          <p className="text-sm text-muted-foreground">
            Add to your website's head section
          </p>
        </div>

        <div className="text-center p-6 bg-muted rounded-xl">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold">3</span>
          </div>
          <h4 className="font-semibold text-foreground mb-2">Done!</h4>
          <p className="text-sm text-muted-foreground">
            Your banner is live and GDPR compliant
          </p>
        </div>
      </div>

      {/* Success Message */}
      {copiedCode && (
        <div className="mt-6 p-4 bg-muted rounded-xl border border-border">
          <div className="flex items-center justify-center space-x-2">
            <Check className="h-5 w-5 text-primary" />
            <span className="text-foreground font-medium">
              Code copied to clipboard! Paste it into your website.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

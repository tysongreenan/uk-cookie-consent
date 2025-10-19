'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'

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
      description: 'Add this code to your website\'s <head> section',
      code: `<!-- Cookie Consent Banner -->
<script>
  (function() {
    // Cookie consent configuration
    const config = {
      position: 'bottom',
      theme: 'light',
      primaryColor: '#3B82F6',
      title: 'We use cookies',
      message: 'This website uses cookies to improve your experience.',
      acceptText: 'Accept All',
      rejectText: 'Reject',
      preferencesText: 'Preferences'
    };
    
    // Initialize banner
    window.cookieConsent = config;
  })();
</script>
<script src="https://cdn.cookiebanner.com/banner.js"></script>`,
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
    <script>
    (function() {
        const config = {
            position: 'bottom',
            theme: 'light',
            primaryColor: '<?php echo get_theme_mod("primary_color", "#3B82F6"); ?>',
            title: 'We use cookies',
            message: 'This website uses cookies to improve your experience.',
            acceptText: 'Accept All',
            rejectText: 'Reject',
            preferencesText: 'Preferences'
        };
        window.cookieConsent = config;
    })();
    </script>
    <script src="https://cdn.cookiebanner.com/banner.js"></script>
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
    const config = {
      position: 'bottom',
      theme: 'light',
      primaryColor: '#3B82F6',
      title: 'We use cookies',
      message: 'This website uses cookies to improve your experience.',
      acceptText: 'Accept All',
      rejectText: 'Reject',
      preferencesText: 'Preferences'
    };
    
    window.cookieConsent = config;
    
    // Load the script
    const script = document.createElement('script');
    script.src = 'https://cdn.cookiebanner.com/banner.js';
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
        return 'bg-orange-500'
      case 'php':
        return 'bg-purple-500'
      case 'javascript':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Copy & Paste Integration
        </h3>
        <p className="text-gray-600">
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
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
          <div key={example.id} className="bg-gray-900 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-800">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(example.language)}`} />
                <span className="text-white font-medium">{example.title}</span>
                <span className="text-gray-400 text-sm">({example.platform})</span>
              </div>
              <button
                onClick={() => copyToClipboard(example.code, example.id)}
                className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
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
            <div className="px-4 py-2 bg-gray-800 border-t border-gray-700">
              <p className="text-gray-300 text-sm">{example.description}</p>
            </div>

            {/* Code */}
            <div className="p-4">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{example.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Steps */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-blue-50 rounded-xl">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">1</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Copy Code</h4>
          <p className="text-sm text-gray-600">
            Click the copy button for your platform
          </p>
        </div>

        <div className="text-center p-6 bg-green-50 rounded-xl">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">2</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Paste Code</h4>
          <p className="text-sm text-gray-600">
            Add to your website's head section
          </p>
        </div>

        <div className="text-center p-6 bg-purple-50 rounded-xl">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold">3</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">Done!</h4>
          <p className="text-sm text-gray-600">
            Your banner is live and GDPR compliant
          </p>
        </div>
      </div>

      {/* Success Message */}
      {copiedCode && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
          <div className="flex items-center justify-center space-x-2">
            <Check className="h-5 w-5 text-green-500" />
            <span className="text-green-700 font-medium">
              Code copied to clipboard! Paste it into your website.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

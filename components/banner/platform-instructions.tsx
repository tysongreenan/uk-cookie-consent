'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

type Platform = 'wordpress' | 'wix' | 'squarespace' | 'shopify' | 'webflow' | 'other'

const platforms: { id: Platform; label: string }[] = [
  { id: 'wordpress', label: 'WordPress' },
  { id: 'wix', label: 'Wix' },
  { id: 'squarespace', label: 'Squarespace' },
  { id: 'shopify', label: 'Shopify' },
  { id: 'webflow', label: 'Webflow' },
  { id: 'other', label: 'Other' },
]

const instructions: Record<Platform, { steps: string[]; link?: string }> = {
  wordpress: {
    steps: [
      'Go to Appearance → Theme Editor → header.php',
      'Paste before </head>',
      'Or use "Insert Headers and Footers" plugin',
    ],
    link: '/integrations/wordpress',
  },
  wix: {
    steps: [
      'Go to Settings → Custom Code',
      'Choose "Head" placement',
      'Apply to All Pages',
    ],
    link: '/integrations/wix',
  },
  squarespace: {
    steps: [
      'Go to Settings → Advanced → Code Injection',
      'Paste in Header section',
      'Save',
    ],
    link: '/integrations/squarespace',
  },
  shopify: {
    steps: [
      'Go to Online Store → Themes → Edit Code',
      'Open theme.liquid',
      'Paste before </head>',
    ],
    link: '/integrations/shopify',
  },
  webflow: {
    steps: [
      'Go to Project Settings → Custom Code',
      'Paste in Head Code',
      'Publish',
    ],
    link: '/integrations/webflow',
  },
  other: {
    steps: [
      "Open your site's HTML",
      'Find the <head> section',
      'Paste the code before </head>',
    ],
  },
}

export function PlatformInstructions() {
  const [selected, setSelected] = useState<Platform>('wordpress')

  const current = instructions[selected]

  return (
    <Card className="border-border/50">
      <CardContent className="p-4">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {platforms.map((platform) => (
            <button
              key={platform.id}
              onClick={() => setSelected(platform.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selected === platform.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {platform.label}
            </button>
          ))}
        </div>

        <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
          {current.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>

        {current.link && (
          <Link
            href={current.link}
            className="inline-flex items-center gap-1 mt-2 text-xs text-primary hover:underline"
          >
            Full integration guide
            <ExternalLink className="h-3 w-3" />
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

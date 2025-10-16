'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface CopyAllButtonProps {
  content: string
  className?: string
}

export function CopyAllButton({ content, className = '' }: CopyAllButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      // Strip HTML tags and clean up the content for plain text
      const cleanContent = content
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
        .trim()

      await navigator.clipboard.writeText(cleanContent)
      setCopied(true)
      toast.success('Article copied to clipboard!')
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy article')
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={`flex items-center gap-2 ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-600" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" />
          Copy All
        </>
      )}
    </Button>
  )
}

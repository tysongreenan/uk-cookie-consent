'use client'

import { useEffect, useState } from 'react'
import { List } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from the HTML content
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    
    const items: TOCItem[] = []
    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`
      const text = heading.textContent || ''
      const level = parseInt(heading.tagName.charAt(1))
      
      // Skip the first H2 (TL;DR) as it's already highlighted
      if (level === 2 && index === 0 && text.toLowerCase().includes('tl;dr')) {
        return
      }
      
      items.push({ id, text, level })
    })
    
    setTocItems(items)
  }, [content])

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = tocItems.map(item => document.getElementById(item.id)).filter(Boolean)
      
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i]
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveId(element.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

  if (tocItems.length === 0) return null

  return (
    <Card className="sticky top-24 mb-8 bg-muted/30 border-brand-teal/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <List className="h-4 w-4 text-brand-teal" />
          <h3 className="font-semibold text-sm text-foreground">Table of Contents</h3>
        </div>
        <nav className="space-y-1">
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm transition-colors hover:text-brand-teal ${
                activeId === item.id 
                  ? 'text-brand-teal font-semibold' 
                  : 'text-muted-foreground'
              } ${
                item.level === 1 ? 'pl-0 font-bold' :
                item.level === 2 ? 'pl-2' :
                item.level === 3 ? 'pl-4' :
                item.level === 4 ? 'pl-6' :
                'pl-8'
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  )
}

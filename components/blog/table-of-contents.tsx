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
    // Extract only H2 headings from the HTML content
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headings = doc.querySelectorAll('h2')
    
    const items: TOCItem[] = []
    headings.forEach((heading, index) => {
      const id = heading.id || `heading-${index}`
      const text = heading.textContent || ''
      const level = 2 // All items are H2
      
      // Skip the first H2 (TL;DR) as it's already highlighted
      if (index === 0 && text.toLowerCase().includes('tl;dr')) {
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
    <Card className="sticky top-24 mb-8 bg-background border border-border">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <List className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-foreground">Table of Contents</h3>
        </div>
        <nav className="space-y-2">
          {tocItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`block text-sm transition-colors hover:text-primary ${
                activeId === item.id 
                  ? 'text-primary font-semibold' 
                  : 'text-muted-foreground hover:text-foreground'
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

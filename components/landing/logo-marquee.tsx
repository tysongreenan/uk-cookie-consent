'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ShowcaseItem {
  id: string
  companyName: string
  logoUrl: string
  websiteUrl: string
}

export function LogoMarquee() {
  const [items, setItems] = useState<ShowcaseItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchShowcase() {
      try {
        const response = await fetch('/api/showcase')
        const data = await response.json()
        setItems(data.items || [])
      } catch (error) {
        console.error('Failed to fetch showcase items:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchShowcase()
  }, [])

  if (loading || items.length === 0) {
    return null
  }

  // Double the items to create a seamless loop
  const marqueeItems = [...items, ...items]

  return (
    <div className="w-full py-12 border-b bg-slate-50/50">
      <div className="container px-4 md:px-6 mb-8 text-center">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Trusted by growing businesses worldwide
        </p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 px-8">
          {marqueeItems.map((item, index) => (
            <LogoItem key={`${item.id}-${index}`} item={item} />
          ))}
        </div>

        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-16 px-8 ml-[100%]">
          {marqueeItems.map((item, index) => (
            <LogoItem key={`${item.id}-${index}-dup`} item={item} />
          ))}
        </div>
        
        {/* Gradients for fade effect */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-slate-50/50 via-slate-50/20 to-transparent dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-slate-50/50 via-slate-50/20 to-transparent dark:from-background"></div>
      </div>
    </div>
  )
}

function LogoItem({ item }: { item: ShowcaseItem }) {
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  if (error) return null

  // Ensure logoUrl is absolute or valid
  if (!item.logoUrl || item.logoUrl.trim() === '') return null

  return (
    <a
      href={item.websiteUrl}
      target="_blank"
      rel="noopener noreferrer" 
      className={`relative flex items-center justify-center h-12 w-32 md:w-40 grayscale hover:grayscale-0 transition-all duration-300 transform hover:scale-110 ${isLoaded ? 'opacity-60 hover:opacity-100' : 'opacity-0'}`}
      title={`Visit ${item.companyName}`}
    >
      <img
        src={item.logoUrl}
        alt={`${item.companyName} logo`}
        className="max-h-12 max-w-full object-contain"
        onError={() => setError(true)}
        onLoad={() => setIsLoaded(true)}
      />
    </a>
  )
}


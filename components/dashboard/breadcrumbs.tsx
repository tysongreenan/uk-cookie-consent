'use client'

import Link from 'next/link'
import { ChevronRight, Home } from '@phosphor-icons/react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}>
      <Link href="/dashboard" className="flex items-center hover:text-foreground transition-colors">
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <Link 
              href={item.href} 
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}

// Helper function to generate breadcrumbs based on pathname
export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  // Remove 'dashboard' from the beginning if present
  if (segments[0] === 'dashboard') {
    segments.shift()
  }

  let currentPath = '/dashboard'

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // Skip if it's the last segment (current page)
    if (index === segments.length - 1) {
      breadcrumbs.push({
        label: formatSegmentLabel(segment),
        href: undefined // Current page, no link
      })
    } else {
      breadcrumbs.push({
        label: formatSegmentLabel(segment),
        href: currentPath
      })
    }
  })

  return breadcrumbs
}

function formatSegmentLabel(segment: string): string {
  // Convert kebab-case to Title Case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

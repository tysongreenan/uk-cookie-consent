'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Palette,
  FileText,
  Settings,
  BarChart3,
  Users,
  HelpCircle,
  ChevronDown as ChevronDown,
  ChevronRight as ChevronRight,
  Shield,
  Code,
  Globe,
  Target
} from 'lucide-react'
import { useState } from 'react'
import { NewBadge } from '@/components/ui/new-badge'
import { WorkspaceSwitcher } from '@/components/dashboard/workspace-switcher'

interface NavItem {
  title: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  badge?: 'new'
  children?: NavItem[]
}

const navigationItems: NavItem[] = [
  {
    title: 'Cookie Banner',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3
  },
  {
    title: 'Integrations',
    href: '/dashboard/integrations',
    icon: Target
  },
  {
    title: 'Team Settings',
    href: '/dashboard/team',
    icon: Users
  }
]

const supportItems: NavItem[] = [
  {
    title: 'Documentation',
    href: '/docs',
    icon: FileText,
  },
  {
    title: 'Roadmap',
    href: '/roadmap',
    icon: BarChart3,
  },
  {
    title: 'Support',
    href: '/support',
    icon: HelpCircle,
  }
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    const isActive = item.href === pathname
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.title}>
        <div
          className={cn(
            'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
            level > 0 && 'ml-4',
            isActive 
              ? 'bg-primary text-primary-foreground' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          )}
        >
          {item.href ? (
            <Link href={item.href} className="flex items-center space-x-3 flex-1">
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
              {item.badge === 'new' && <NewBadge variant="glow" size="sm" />}
            </Link>
          ) : (
            <div className="flex items-center space-x-3 flex-1">
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
              {item.badge === 'new' && <NewBadge variant="glow" size="sm" />}
            </div>
          )}
          
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.title)}
              className="p-1 hover:bg-accent rounded"
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className={cn('w-64 bg-background border-r border-border flex flex-col', className)}>
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">CookieBanner</h1>
            <p className="text-xs text-muted-foreground">Pro Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Workspace Switcher */}
      <div className="p-4 border-b border-border">
        <WorkspaceSwitcher />
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Main Menu
          </p>
          {navigationItems.map(item => renderNavItem(item))}
        </div>

        <div className="space-y-1 pt-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Support
          </p>
          {supportItems.map(item => renderNavItem(item))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Link href="/roadmap" className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Globe className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">New Updates</p>
            <p className="text-xs text-muted-foreground">See our roadmap</p>
          </div>
        </Link>
      </div>
    </aside>
  )
}

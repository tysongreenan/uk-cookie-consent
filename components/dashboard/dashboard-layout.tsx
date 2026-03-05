'use client'

import { Sidebar } from './sidebar'
import { DashboardHeader } from './header'
import { cn } from '@/lib/utils'

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className="w-64 bg-background border-r border-border flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className={cn('flex-1', className)}>
          {children}
        </main>
      </div>
    </div>
  )
}

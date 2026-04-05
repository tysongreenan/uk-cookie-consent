import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function BuilderLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border h-16 flex items-center px-6">
        <Skeleton className="h-6 w-32" />
        <div className="ml-auto flex gap-3">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Settings panel */}
        <div className="w-80 border-r border-border p-6 space-y-6 overflow-hidden">
          <Skeleton className="h-6 w-24" />
          {/* Tabs */}
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
          {/* Settings fields */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          {/* Color pickers */}
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>

        {/* Preview panel */}
        <div className="flex-1 flex items-end justify-center p-8 bg-muted/20">
          <Skeleton className="w-full max-w-2xl h-48 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

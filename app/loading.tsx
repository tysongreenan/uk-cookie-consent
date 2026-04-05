import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header skeleton */}
      <div className="border-b border-border h-16 flex items-center px-6">
        <Skeleton className="h-6 w-32" />
        <div className="ml-auto flex gap-4">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* Hero skeleton */}
      <div className="py-20 flex flex-col items-center px-6">
        <Skeleton className="h-6 w-40 mb-6 rounded-full" />
        <Skeleton className="h-12 w-96 max-w-full mb-3" />
        <Skeleton className="h-12 w-80 max-w-full mb-6" />
        <Skeleton className="h-5 w-[500px] max-w-full mb-2" />
        <Skeleton className="h-5 w-[400px] max-w-full mb-10" />
        <div className="flex gap-4">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-36" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="border-t border-border py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-border rounded-xl p-6 space-y-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

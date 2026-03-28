'use client'

import { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Search, Loader2, ExternalLink } from 'lucide-react'

interface Vendor {
  id: number
  name: string
  purposeIds: number[]
  policyUrl: string
}

interface TCFVendorSelectorProps {
  selectedVendorIds: number[]
  onChange: (vendorIds: number[]) => void
}

export function TCFVendorSelector({ selectedVendorIds, onChange }: TCFVendorSelectorProps) {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)

  const fetchVendors = useCallback(async (searchTerm: string, pageNum: number, append: boolean) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        page: String(pageNum),
        limit: '50',
      })
      const res = await fetch(`/api/tcf/vendors?${params}`)
      if (!res.ok) throw new Error('Failed to fetch vendors')
      const data = await res.json()
      const fetched: Vendor[] = data.vendors || []
      setVendors(prev => append ? [...prev, ...fetched] : fetched)
      setHasMore(fetched.length === 50)
    } catch {
      // Silently handle - vendors list may not be available yet
      if (!append) setVendors([])
      setHasMore(false)
    } finally {
      setLoading(false)
      setInitialLoad(false)
    }
  }, [])

  useEffect(() => {
    setPage(1)
    fetchVendors(search, 1, false)
  }, [search, fetchVendors])

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchVendors(search, nextPage, true)
  }

  const toggleVendor = (vendorId: number) => {
    if (selectedVendorIds.includes(vendorId)) {
      onChange(selectedVendorIds.filter(id => id !== vendorId))
    } else {
      onChange([...selectedVendorIds, vendorId])
    }
  }

  const selectAll = () => {
    const allIds = new Set([...selectedVendorIds, ...vendors.map(v => v.id)])
    onChange(Array.from(allIds))
  }

  const deselectAll = () => {
    const visibleIds = new Set(vendors.map(v => v.id))
    onChange(selectedVendorIds.filter(id => !visibleIds.has(id)))
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search vendors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {selectedVendorIds.length} vendor{selectedVendorIds.length !== 1 ? 's' : ''} selected
        </span>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" onClick={selectAll} className="text-xs h-7">
            Select All
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={deselectAll} className="text-xs h-7">
            Deselect All
          </Button>
        </div>
      </div>

      <div className="border rounded-md max-h-64 overflow-y-auto">
        {initialLoad && loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Loading vendors...</span>
          </div>
        ) : vendors.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            {search ? 'No vendors found matching your search.' : 'No vendors available.'}
          </div>
        ) : (
          <div className="divide-y">
            {vendors.map(vendor => {
              const isSelected = selectedVendorIds.includes(vendor.id)
              return (
                <label
                  key={vendor.id}
                  className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-muted/50 transition-colors ${isSelected ? 'bg-primary/5' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleVendor(vendor.id)}
                    className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{vendor.name}</span>
                      {vendor.policyUrl && (
                        <a
                          href={vendor.policyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-muted-foreground hover:text-primary shrink-0"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {vendor.purposeIds.length} purpose{vendor.purposeIds.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </label>
              )
            })}
          </div>
        )}

        {hasMore && !initialLoad && (
          <div className="p-2 border-t">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

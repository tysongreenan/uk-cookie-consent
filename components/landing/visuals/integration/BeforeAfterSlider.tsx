'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Eye, EyeOff, Globe, Cookie, XCircle, CheckCircle, Hand } from 'lucide-react'

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        if (sliderRef.current) {
          const rect = sliderRef.current.getBoundingClientRect()
          const x = e.clientX - rect.left
          const percentage = (x / rect.width) * 100
          setSliderPosition(Math.max(0, Math.min(100, percentage)))
        }
      }
    }

    const handleGlobalMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove)
      document.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Before vs After — See the Transformation
        </h3>
        <p className="text-muted-foreground">
          Drag the slider to see how your website looks with and without our cookie banner
        </p>
      </div>

      {/* Before/After Labels */}
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-2">
          <EyeOff className="h-5 w-5 text-muted-foreground" />
          <span className="font-semibold text-muted-foreground">Before: No Cookie Banner</span>
        </div>
        <div className="flex items-center space-x-2">
          <Eye className="h-5 w-5 text-primary" />
          <span className="font-semibold text-primary">After: GDPR Compliant</span>
        </div>
      </div>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="relative w-full h-96 bg-muted/30 rounded-xl overflow-hidden border border-border shadow-lg cursor-col-resize"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Before Image (Background) */}
        <div className="absolute inset-0 bg-muted">
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 bg-muted-foreground/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-muted-foreground" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Your Website</h4>
              <p className="text-sm">No cookie banner</p>
              <div className="mt-4 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm text-destructive font-medium flex items-center justify-center gap-1.5">
                  <XCircle className="h-4 w-4" />
                  Not GDPR Compliant
                </p>
                <p className="text-xs text-muted-foreground">
                  Risk of fines up to 4% of annual turnover
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* After Image (Overlay) */}
        <div
          className="absolute inset-0 bg-primary/5"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-foreground">
              <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                <Cookie className="h-8 w-8 text-primary-foreground" />
              </div>
              <h4 className="text-lg font-semibold mb-2">With Cookie Banner</h4>
              <p className="text-sm text-muted-foreground">GDPR compliant</p>
              <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-primary font-medium flex items-center justify-center gap-1.5">
                  <CheckCircle className="h-4 w-4" />
                  GDPR Compliant
                </p>
                <p className="text-xs text-muted-foreground">
                  Protected from fines
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full border-2 border-background shadow-lg flex items-center justify-center">
            <div className="flex space-x-1">
              <ChevronLeft className="h-3 w-3 text-primary-foreground" />
              <ChevronRight className="h-3 w-3 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-background shadow-lg"
          style={{ left: `${sliderPosition}%` }}
        />
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
          <Hand className="h-4 w-4" />
          Drag the slider to see the difference
        </p>
      </div>

      {/* Benefits Comparison */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-muted rounded-xl border border-border">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <EyeOff className="h-5 w-5 mr-2" />
            Without Cookie Banner
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-muted-foreground/40 shrink-0" /> Not GDPR compliant</li>
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-muted-foreground/40 shrink-0" /> Risk of fines up to 4% of annual turnover</li>
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-muted-foreground/40 shrink-0" /> No user consent tracking</li>
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-muted-foreground/40 shrink-0" /> Legal liability</li>
            <li className="flex items-center gap-2"><XCircle className="h-4 w-4 text-muted-foreground/40 shrink-0" /> Poor user experience</li>
          </ul>
        </div>

        <div className="p-6 bg-muted rounded-xl border border-border">
          <h4 className="font-semibold text-foreground mb-3 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            With Cookie Banner
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> GDPR compliant</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> Protected from fines</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> Consent tracking</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> Legal protection</li>
            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> Better user experience</li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
          Get Your Cookie Banner Now
        </button>
        <p className="text-sm text-muted-foreground mt-2">
          Setup takes less than 5 minutes
        </p>
      </div>
    </div>
  )
}

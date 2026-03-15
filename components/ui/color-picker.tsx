'use client'

import { useState, useRef, useEffect } from 'react'
import { HexColorPicker, HexColorInput } from 'react-colorful'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const swatchRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        swatchRef.current &&
        !swatchRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">{label}</label>
      )}
      <div className="relative flex items-center gap-2">
        <button
          ref={swatchRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="h-9 w-9 rounded-md border border-input shadow-sm cursor-pointer flex-shrink-0 transition-shadow hover:ring-2 hover:ring-ring/20"
          style={{ backgroundColor: value }}
          aria-label={`Pick color: ${value}`}
        />
        <HexColorInput
          color={value}
          onChange={onChange}
          prefixed
          className="h-9 flex-1 rounded-md border border-input bg-background px-3 text-sm font-mono shadow-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        {isOpen && (
          <div
            ref={popoverRef}
            className="absolute top-full left-0 z-50 mt-2 p-3 bg-popover border border-border rounded-lg shadow-lg"
          >
            <HexColorPicker color={value} onChange={onChange} />
          </div>
        )}
      </div>
    </div>
  )
}

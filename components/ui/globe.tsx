'use client'

import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

/** Continental US — cobe phi/theta that put the lower 48 on camera. */
const HOME_LAT = 39.83
const HOME_LNG = -98.58
const HOME_PHI = 4.15
const HOME_THETA = 0.38

const US_MARKERS: { location: [number, number]; size: number }[] = [
  { location: [34.05, -118.24], size: 0.06 },
  { location: [37.77, -122.42], size: 0.05 },
  { location: [47.61, -122.33], size: 0.04 },
  { location: [45.51, -122.68], size: 0.04 },
  { location: [33.45, -112.07], size: 0.04 },
  { location: [39.74, -104.99], size: 0.05 },
  { location: [41.88, -87.63], size: 0.05 },
  { location: [29.76, -95.37], size: 0.06 },
  { location: [25.76, -80.19], size: 0.04 },
  { location: [38.9, -77.04], size: 0.05 },
  { location: [40.71, -74.01], size: 0.06 },
  { location: [42.36, -71.06], size: 0.04 },
]

export function latLngToPose(lat: number, lng: number) {
  const dLng = lng - HOME_LNG
  const dLat = lat - HOME_LAT
  return {
    phi: HOME_PHI - (dLng * Math.PI) / 180,
    theta: Math.min(0.72, Math.max(0.12, HOME_THETA + (dLat * Math.PI) / 180 * 0.35)),
  }
}

export function Globe({
  className,
  focus,
}: {
  className?: string
  /** Look at this point. Defaults to the geographic center of the US. */
  focus?: { lat: number; lng: number }
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const focusRef = useRef(focus ?? { lat: HOME_LAT, lng: HOME_LNG })
  const poseRef = useRef(latLngToPose(focusRef.current.lat, focusRef.current.lng))

  useEffect(() => {
    focusRef.current = focus ?? { lat: HOME_LAT, lng: HOME_LNG }
  }, [focus])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let width = canvas.offsetWidth
    const onResize = () => {
      width = canvas.offsetWidth
    }
    window.addEventListener('resize', onResize)

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: poseRef.current.phi,
      theta: poseRef.current.theta,
      dark: 0,
      diffuse: 0.5,
      mapSamples: 18000,
      mapBrightness: 1.2,
      baseColor: [0.88, 0.9, 0.9],
      markerColor: [14 / 255, 118 / 255, 140 / 255],
      glowColor: [0.97, 0.97, 0.95],
      markers: US_MARKERS,
      onRender: (state) => {
        const target = latLngToPose(focusRef.current.lat, focusRef.current.lng)
        poseRef.current.phi += (target.phi - poseRef.current.phi) * 0.08
        poseRef.current.theta += (target.theta - poseRef.current.theta) * 0.08
        state.phi = poseRef.current.phi
        state.theta = poseRef.current.theta
        state.width = width * 2
        state.height = width * 2
      },
    })

    const t = window.setTimeout(() => {
      canvas.style.opacity = '1'
    }, 0)

    return () => {
      window.removeEventListener('resize', onResize)
      window.clearTimeout(t)
      globe.destroy()
    }
  }, [])

  return (
    <div className={cn('relative mx-auto aspect-square w-full max-w-[520px]', className)}>
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        aria-hidden="true"
      />
      <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        United States
      </p>
    </div>
  )
}

export const STATE_COORDS: Record<string, { lat: number; lng: number }> = {
  CA: { lat: 36.78, lng: -119.42 },
  VA: { lat: 37.43, lng: -78.66 },
  CO: { lat: 39.55, lng: -105.78 },
  CT: { lat: 41.6, lng: -73.09 },
  UT: { lat: 39.32, lng: -111.09 },
  IA: { lat: 41.88, lng: -93.1 },
  IN: { lat: 40.27, lng: -86.13 },
  TN: { lat: 35.52, lng: -86.58 },
  MT: { lat: 46.88, lng: -110.36 },
  TX: { lat: 31.97, lng: -99.9 },
  OR: { lat: 43.8, lng: -120.55 },
  DE: { lat: 38.91, lng: -75.53 },
  NJ: { lat: 40.06, lng: -74.41 },
  NH: { lat: 43.19, lng: -71.57 },
  MN: { lat: 46.73, lng: -94.69 },
  MD: { lat: 39.05, lng: -76.64 },
  NE: { lat: 41.49, lng: -99.9 },
  KY: { lat: 37.84, lng: -84.27 },
  RI: { lat: 41.58, lng: -71.48 },
}

import { CreditCard, Rocket, SlidersHorizontal, Wrench, type LucideIcon } from 'lucide-react'
import type { HelpCategoryIcon } from '@/lib/help/help'

const ICONS: Record<HelpCategoryIcon, LucideIcon> = {
  rocket: Rocket,
  sliders: SlidersHorizontal,
  wrench: Wrench,
  'credit-card': CreditCard,
}

export function HelpCategoryIconView({ icon, className }: { icon: HelpCategoryIcon; className?: string }) {
  const Icon = ICONS[icon]
  return <Icon className={className} aria-hidden="true" />
}

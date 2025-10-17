import { Metadata } from 'next'
import { DashboardClient } from './dashboard-client'

export const metadata: Metadata = {
  title: 'Dashboard - Cookie Banner Generator',
  description: 'Manage your cookie consent banners. Create, customize, and deploy GDPR & PIPEDA compliant cookie banners.',
  robots: 'noindex, nofollow', // Keep dashboard private
}

export default function DashboardPage() {
  return <DashboardClient />
}
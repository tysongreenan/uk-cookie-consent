import { Metadata } from 'next'
import { Header } from '@/components/landing/header'
import { Footer } from '@/components/landing/footer'
import { getServiceStatus } from '@/lib/uptime'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'System Status — Cookie Banner',
  description: 'Live status of cookie-banner.ca: banner delivery, dashboard sign-in and website.',
  alternates: { canonical: 'https://www.cookie-banner.ca/status' },
}

const DOT = { up: 'bg-emerald-500', down: 'bg-red-500', pending: 'bg-amber-400' }
const LABEL = { up: 'Operational', down: 'Down', pending: 'Checking' }

export default async function StatusPage() {
  const services = await getServiceStatus()
  const headline = !services
    ? 'Live status is unavailable right now'
    : services.some((s) => s.state === 'down')
      ? 'Some services are having problems'
      : 'All systems operational'

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="py-20 border-b border-border">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">System Status</h1>
            <p className="text-lg text-muted-foreground">{headline}</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6">
            {services && (
              <ul className="divide-y divide-border rounded-lg border border-border">
                {services.map((s) => (
                  <li key={s.name} className="flex items-center justify-between gap-4 px-5 py-4">
                    <span className="font-medium">{s.name}</span>
                    <span className="flex items-center gap-3 text-sm text-muted-foreground">
                      {s.uptime30d !== null && <span>{s.uptime30d.toFixed(2)}% uptime (30 days)</span>}
                      <span className="flex items-center gap-2 text-foreground">
                        <span className={`h-2.5 w-2.5 rounded-full ${DOT[s.state]}`} aria-hidden="true" />
                        {LABEL[s.state]}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-6 text-sm text-muted-foreground">
              Checked every 5 minutes from outside our servers by{' '}
              <a href="https://stats.uptimerobot.com/ClLHKQjvwi" className="underline hover:text-foreground">
                UptimeRobot
              </a>
              . This page refreshes every minute.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

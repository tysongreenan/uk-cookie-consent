// Live service status for /status, read from UptimeRobot (monitors check every 5 minutes).

export type ServiceStatus = { name: string; state: 'up' | 'down' | 'pending'; uptime30d: number | null }

// UptimeRobot monitor status codes: 0 paused, 1 not checked yet, 2 up, 8 seems down, 9 down.
const STATE: Record<number, ServiceStatus['state']> = { 2: 'up', 8: 'down', 9: 'down' }

/** Current status per monitor, or null if UptimeRobot can't be reached. */
export async function getServiceStatus(): Promise<ServiceStatus[] | null> {
  const apiKey = process.env.UPTIMEROBOT_API_KEY
  if (!apiKey) return null
  try {
    const res = await fetch('https://api.uptimerobot.com/v2/getMonitors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ api_key: apiKey, format: 'json', custom_uptime_ratios: '30' }),
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(5000),
    })
    const data = await res.json()
    if (data.stat !== 'ok') return null
    return (data.monitors as { friendly_name: string; status: number; custom_uptime_ratio?: string }[])
      .filter((m) => m.status !== 0)
      .map((m) => ({
        name: m.friendly_name,
        state: STATE[m.status] ?? 'pending',
        uptime30d: m.custom_uptime_ratio ? Number(m.custom_uptime_ratio) : null,
      }))
  } catch {
    return null
  }
}

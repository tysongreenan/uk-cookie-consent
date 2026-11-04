import { afterEach, describe, expect, it, vi } from 'vitest'
import { getServiceStatus } from './uptime'

const reply = (body: unknown) => vi.fn().mockResolvedValue({ json: async () => body })

describe('getServiceStatus', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.unstubAllEnvs()
  })

  it('maps monitors and hides paused ones', async () => {
    vi.stubEnv('UPTIMEROBOT_API_KEY', 'k')
    vi.stubGlobal('fetch', reply({
      stat: 'ok',
      monitors: [
        { friendly_name: 'Website', status: 2, custom_uptime_ratio: '99.950' },
        { friendly_name: 'Banner delivery', status: 9, custom_uptime_ratio: '98.000' },
        { friendly_name: 'Sign-in', status: 1 },
        { friendly_name: 'Old', status: 0 },
      ],
    }))
    expect(await getServiceStatus()).toEqual([
      { name: 'Website', state: 'up', uptime30d: 99.95 },
      { name: 'Banner delivery', state: 'down', uptime30d: 98 },
      { name: 'Sign-in', state: 'pending', uptime30d: null },
    ])
  })

  it('returns null when UptimeRobot fails or the key is missing', async () => {
    vi.stubEnv('UPTIMEROBOT_API_KEY', 'k')
    vi.stubGlobal('fetch', reply({ stat: 'fail' }))
    expect(await getServiceStatus()).toBeNull()
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('timeout')))
    expect(await getServiceStatus()).toBeNull()
    vi.stubEnv('UPTIMEROBOT_API_KEY', '')
    expect(await getServiceStatus()).toBeNull()
  })
})

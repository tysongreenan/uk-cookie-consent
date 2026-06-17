import * as dns from 'node:dns/promises'
import * as net from 'node:net'

/**
 * SSRF protection: validates that a URL resolves to a public IP address.
 * Blocks private networks, loopback, link-local, cloud metadata endpoints, etc.
 */

const PRIVATE_IPV4_RANGES: Array<{ base: number; mask: number }> = [
  { base: ipv4ToInt('0.0.0.0'), mask: 0xff000000 },       // 0.0.0.0/8
  { base: ipv4ToInt('10.0.0.0'), mask: 0xff000000 },       // 10.0.0.0/8
  { base: ipv4ToInt('100.64.0.0'), mask: 0xffc00000 },     // 100.64.0.0/10 (Carrier-grade NAT)
  { base: ipv4ToInt('127.0.0.0'), mask: 0xff000000 },      // 127.0.0.0/8
  { base: ipv4ToInt('169.254.0.0'), mask: 0xffff0000 },    // 169.254.0.0/16 (link-local / cloud metadata)
  { base: ipv4ToInt('172.16.0.0'), mask: 0xfff00000 },     // 172.16.0.0/12
  { base: ipv4ToInt('192.0.0.0'), mask: 0xffffff00 },      // 192.0.0.0/24
  { base: ipv4ToInt('192.168.0.0'), mask: 0xffff0000 },    // 192.168.0.0/16
  { base: ipv4ToInt('198.18.0.0'), mask: 0xfffe0000 },     // 198.18.0.0/15 (benchmarking)
  { base: ipv4ToInt('224.0.0.0'), mask: 0xf0000000 },      // 224.0.0.0/4 (multicast)
  { base: ipv4ToInt('240.0.0.0'), mask: 0xf0000000 },      // 240.0.0.0/4 (reserved)
]

function ipv4ToInt(ip: string): number {
  const parts = ip.split('.').map(Number)
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
}

export function isPrivateIPv4(ip: string): boolean {
  if (!net.isIPv4(ip)) return false
  const int = ipv4ToInt(ip)
  return PRIVATE_IPV4_RANGES.some(({ base, mask }) => (int & mask) === (base & mask))
}

export function isPrivateIPv6(ip: string): boolean {
  if (!net.isIPv6(ip)) return false
  const normalized = ip.toLowerCase()
  if (normalized === '::1') return true                   // loopback
  if (normalized === '::') return true                    // unspecified
  if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true  // ULA fc00::/7
  if (normalized.startsWith('fe80')) return true           // link-local fe80::/10
  if (normalized.startsWith('ff')) return true             // multicast
  // IPv4-mapped IPv6 (::ffff:x.x.x.x)
  const v4match = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/)
  if (v4match) return isPrivateIPv4(v4match[1])
  return false
}

export function isPrivateIP(ip: string): boolean {
  return isPrivateIPv4(ip) || isPrivateIPv6(ip)
}

/**
 * Resolves a URL's hostname to IP addresses and validates none are private.
 * Throws if the URL would resolve to a private/internal address.
 */
export async function validatePublicUrl(url: string | URL): Promise<void> {
  const parsed = typeof url === 'string' ? new URL(url) : url
  const hostname = parsed.hostname

  // If hostname is already an IP literal, check it directly
  if (net.isIP(hostname)) {
    if (isPrivateIP(hostname)) {
      throw new Error(`URL resolves to a private IP address`)
    }
    return
  }

  // Resolve DNS and check all results
  let addresses: string[]
  try {
    const result = await dns.resolve(hostname)
    // Also try to resolve IPv6
    let result6: string[] = []
    try { result6 = await dns.resolve6(hostname) } catch { /* no AAAA records is fine */ }
    addresses = [...result, ...result6]
  } catch {
    throw new Error(`Could not resolve hostname: ${hostname}`)
  }

  if (addresses.length === 0) {
    throw new Error(`Could not resolve hostname: ${hostname}`)
  }

  for (const addr of addresses) {
    if (isPrivateIP(addr)) {
      throw new Error(`URL resolves to a private IP address`)
    }
  }
}

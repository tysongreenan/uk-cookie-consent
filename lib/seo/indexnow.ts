const INDEXNOW_KEY = '79a0c07597fe2db879a3d3434deaf02c'
const ENDPOINT = 'https://api.indexnow.org/IndexNow'

function getHost(baseUrl: string): string {
  return new URL(baseUrl).host
}

export async function pingIndexNow(urls: string[]): Promise<void> {
  if (urls.length === 0) return
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.cookie-banner.ca'
  const host = getHost(baseUrl)

  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }

  await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
}

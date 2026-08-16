import { getCmsFeaturedVideo } from '@/lib/cms-content'

function isSafeHttpUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

function embedSrc(url: string): string | null {
  try {
    const parsed = new URL(url)
    const host = parsed.hostname.replace(/^www\./, '')
    if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null
    }
    if (host === 'youtu.be') {
      const id = parsed.pathname.replace(/^\//, '')
      return id ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}` : null
    }
    if (host === 'vimeo.com') {
      const id = parsed.pathname.split('/').filter(Boolean)[0]
      return id ? `https://player.vimeo.com/video/${encodeURIComponent(id)}` : null
    }
  } catch {
    return null
  }
  return null
}

export async function FeaturedVideo() {
  const video = await getCmsFeaturedVideo()
  if (!video || !isSafeHttpUrl(video.url)) return null

  const embed = embedSrc(video.url)

  return (
    <section className="border-b border-border bg-muted/30 py-12">
      <div className="container mx-auto max-w-4xl px-6">
        {video.title ? (
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">{video.title}</h2>
        ) : null}
        {embed ? (
          <div className="aspect-video overflow-hidden rounded-xl border border-border bg-black">
            <iframe
              src={embed}
              title={video.title || 'Featured video'}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            src={video.url}
            controls
            className="w-full rounded-xl border border-border"
            title={video.title || 'Featured video'}
          />
        )}
      </div>
    </section>
  )
}

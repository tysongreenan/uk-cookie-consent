import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export async function copyToClipboard(text: string | (() => Promise<string>)): Promise<void> {
  if (typeof text !== 'string') {
    // Deferred text (e.g. save the banner, then copy its snippet). Safari
    // revokes clipboard access after an await, so hand the browser a promise
    // via ClipboardItem — the write stays inside the original user gesture.
    const pending = text()
    if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
      try {
        const item = new ClipboardItem({
          'text/plain': pending.then((value) => new Blob([value], { type: 'text/plain' })),
        })
        await navigator.clipboard.write([item])
        return
      } catch {
        // Unsupported or blocked — fall through to the plain path.
        // (If `pending` itself rejected, the await below rethrows it.)
      }
    }
    return copyToClipboard(await pending)
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return
    }
  } catch {
    // Permissions / Firefox private mode — fall through to execCommand
  }

  const textArea = document.createElement('textarea')
  textArea.value = text
  textArea.setAttribute('readonly', '')
  textArea.style.position = 'fixed'
  textArea.style.left = '-9999px'
  textArea.style.top = '0'
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  textArea.setSelectionRange(0, text.length)
  try {
    const ok = document.execCommand('copy')
    if (!ok) throw new Error('Failed to copy text')
  } finally {
    document.body.removeChild(textArea)
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function generateBannerCode(config: any): string {
  // This will be implemented in the code generator
  return `<!-- Generated Cookie Consent Banner -->
<script>
  // Banner configuration
  const bannerConfig = ${JSON.stringify(config, null, 2)};
  
  // Implementation will be added here
</script>`
}

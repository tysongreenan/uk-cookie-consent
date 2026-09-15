/** Page structure: headings, landmarks and links as a navigable list. */
import { h, HOST_ID } from '../dom'
import type { A11yStrings } from '../types'

const LANDMARKS: Array<[string, string]> = [
  ['header,[role="banner"]', 'header'],
  ['nav,[role="navigation"]', 'nav'],
  ['main,[role="main"]', 'main'],
  ['aside,[role="complementary"]', 'aside'],
  ['form,[role="form"],[role="search"]', 'form'],
  ['footer,[role="contentinfo"]', 'footer'],
]

export interface StructureItem {
  label: string
  meta: string
  el: Element
}

function visible(el: Element): boolean {
  if (el.closest(`#${HOST_ID},[hidden],[aria-hidden="true"]`)) return false
  const r = el.getBoundingClientRect()
  if (r.width > 0 || r.height > 0) return true
  // Zero-size: either display:none or an environment without layout
  return getComputedStyle(el).display !== 'none'
}

function label(el: Element): string {
  return (
    el.getAttribute('aria-label') ||
    ((el as HTMLElement).innerText || el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 120)
  )
}

export function collectStructure(): { headings: StructureItem[]; landmarks: StructureItem[]; links: StructureItem[] } {
  const headings: StructureItem[] = []
  document.querySelectorAll('h1,h2,h3,h4,h5,h6,[role="heading"]').forEach((el) => {
    if (!visible(el)) return
    const level = el.getAttribute('aria-level') || el.tagName.replace(/\D/g, '') || '2'
    const text = label(el)
    if (text) headings.push({ label: text, meta: `H${level}`, el })
  })

  const landmarks: StructureItem[] = []
  const seen = new Set<Element>()
  for (const [selector, name] of LANDMARKS) {
    document.querySelectorAll(selector).forEach((el) => {
      if (seen.has(el) || !visible(el)) return
      seen.add(el)
      landmarks.push({ label: el.getAttribute('aria-label') || name, meta: name, el })
    })
  }

  const links: StructureItem[] = []
  document.querySelectorAll('a[href]').forEach((el) => {
    if (links.length >= 200 || !visible(el)) return
    const text = label(el) || (el.querySelector('img') as HTMLImageElement | null)?.alt || ''
    if (text) links.push({ label: text, meta: '', el })
  })

  return { headings, landmarks, links }
}

export function jumpTo(el: Element): void {
  const target = el as HTMLElement
  const hadTabIndex = target.hasAttribute('tabindex')
  if (!hadTabIndex) target.setAttribute('tabindex', '-1')
  target.scrollIntoView({ block: 'center' })
  target.focus({ preventScroll: true })
  if (!hadTabIndex) {
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true })
  }
}

export function renderStructure(strings: A11yStrings, onPick: (el: Element) => void): HTMLElement {
  const data = collectStructure()
  const section = (title: string, items: StructureItem[], indent = false) => {
    const list = h('ul', { class: 'cb-a11y-struct-list' })
    if (!items.length) list.appendChild(h('li', { class: 'cb-a11y-struct-empty', text: strings.structureEmpty }))
    for (const item of items) {
      const btn = h('button', { type: 'button', class: 'cb-a11y-struct-item' }, [
        item.meta ? h('span', { class: 'cb-a11y-struct-meta', text: item.meta }) : null,
        h('span', { text: item.label }),
      ])
      if (indent && item.meta) btn.style.paddingLeft = `${8 + (Number(item.meta.slice(1)) - 1) * 12}px`
      btn.addEventListener('click', () => onPick(item.el))
      list.appendChild(h('li', {}, [btn]))
    }
    return h('section', { class: 'cb-a11y-struct-section' }, [h('h3', { text: title }), list])
  }
  return h('div', { class: 'cb-a11y-struct' }, [
    section(strings.structureHeadings, data.headings, true),
    section(strings.structureLandmarks, data.landmarks),
    section(strings.structureLinks, data.links),
  ])
}

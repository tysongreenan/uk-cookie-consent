// Writes public/a11y/sandbox.html — a realistic host page for manual QA of the
// Accessibility Menu (fixed header, images with/without alt, video, animation,
// a mock cookie banner + floating "Cookie Settings" pill in the same corner).
// Run from the repo root: `node packages/a11y-widget/sandbox/make-sandbox.mjs`
import { build } from 'esbuild'
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../../..')

const result = await build({
  entryPoints: [resolve(here, 'config-entry.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
})
const mod = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`)

const version = Number(/A11Y_WIDGET_VERSION\s*=\s*(\d+)/.exec(readFileSync(resolve(root, 'lib/accessibility/version.ts'), 'utf8'))[1])
const hash = /A11Y_WIDGET_BUILD\s*=\s*'([^']+)'/.exec(readFileSync(resolve(root, 'lib/accessibility/build-hash.ts'), 'utf8'))?.[1] || String(Date.now())
const html = readFileSync(resolve(here, 'template.html'), 'utf8')
  .replace('__CONFIG_FREE__', JSON.stringify(mod.free))
  .replace('__CONFIG_PRO__', JSON.stringify(mod.pro))
  .replace(/__VERSION__/g, String(version))
  .replace('?dev=1', `?dev=1&b=${hash}`)

writeFileSync(resolve(root, 'public/a11y/sandbox.html'), html)
console.log('wrote public/a11y/sandbox.html')

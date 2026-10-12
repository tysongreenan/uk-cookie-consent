import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  esbuild: {
    // Next compiles JSX with the automatic runtime. Vitest's default classic
    // transform leaves `React` undefined in components that don't import it.
    jsx: 'automatic',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
  test: {
    environment: 'node',
    globals: false,
    // Node 26 exposes a broken global localStorage unless --localstorage-file
    // is set. That getter shadows jsdom, so a11y widget tests see undefined.
    poolOptions: {
      forks: {
        execArgv: ['--no-experimental-webstorage'],
      },
    },
    include: ['lib/**/*.test.ts', 'app/**/*.test.ts', 'packages/a11y-widget/test/**/*.test.ts'],
    // Smoke tests need a real chromium and take seconds, not millis.
    // Run them on demand with `npm run test:smoke`.
    exclude: ['node_modules/**', '.next/**', 'dist/**', '**/*.smoke.test.ts'],
  },
})

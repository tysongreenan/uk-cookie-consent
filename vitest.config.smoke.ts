import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

// Smoke-test config — runs ONLY the *.smoke.test.ts files. These spin
// up real Chromium via Playwright and take seconds per test.
//
//     npm run test:smoke
//
// Browser binary required: `npx playwright install chromium`.
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
  test: {
    environment: 'node',
    globals: false,
    include: ['lib/**/*.smoke.test.ts', 'app/**/*.smoke.test.ts'],
    // Each test launches its own browser — keep concurrency at 1 so
    // we don't fork chromium five times in parallel on a laptop.
    pool: 'forks',
    poolOptions: { forks: { singleFork: true } },
    testTimeout: 30_000,
  },
})

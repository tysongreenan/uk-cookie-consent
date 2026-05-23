import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    },
  },
  test: {
    environment: 'node',
    globals: false,
    include: ['lib/**/*.test.ts', 'app/**/*.test.ts'],
    // Smoke tests need a real chromium and take seconds, not millis.
    // Run them on demand with `npm run test:smoke`.
    exclude: ['node_modules/**', '.next/**', 'dist/**', '**/*.smoke.test.ts'],
  },
})

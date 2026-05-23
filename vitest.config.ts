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
    // Skip integration files that need a real browser / network.
    exclude: ['node_modules/**', '.next/**', 'dist/**'],
  },
})

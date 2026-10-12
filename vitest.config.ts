import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['apps/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reportsDirectory: 'reports/coverage',
      reporter: ['text', 'json-summary', 'html', 'lcov'],
      include: ['apps/api/src/**/*.ts', 'apps/web/src/**/*.{ts,tsx}'],
      exclude: ['**/*.test.{ts,tsx}'],
    },
  },
})

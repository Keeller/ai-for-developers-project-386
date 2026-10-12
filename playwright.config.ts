import { defineConfig } from '@playwright/test'

const databaseUrl =
  process.env.TEST_DATABASE_URL ??
  'postgres://calendar:test@127.0.0.1:55433/calendar_booking_test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run start --workspace @calendar/api',
    env: {
      ...process.env,
      DATABASE_URL: databaseUrl,
      HOST: '127.0.0.1',
      NODE_ENV: 'production',
      PORT: '3000',
    },
    reuseExistingServer: false,
    timeout: 30_000,
    url: 'http://127.0.0.1:3000/api/health',
  },
})

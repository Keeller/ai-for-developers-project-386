import { describe, expect, it } from 'vitest'

import { buildApp } from './app.js'

describe('GET /api/health', () => {
  it('starts the application and responds over HTTP', async () => {
    const app = buildApp()

    await app.listen({ host: '127.0.0.1', port: 0 })

    try {
      const address = app.server.address()

      if (address === null || typeof address === 'string') {
        throw new Error('The test server did not expose a TCP port')
      }

      const response = await fetch(
        `http://127.0.0.1:${address.port}/api/health`,
      )

      expect(response.status).toBe(200)
      await expect(response.json()).resolves.toEqual({
        status: 'ok',
        service: 'calendar-api',
      })
    } finally {
      await app.close()
    }
  })
})

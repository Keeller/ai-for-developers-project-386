import fastify, { type FastifyServerOptions } from 'fastify'

export function buildApp(options: FastifyServerOptions = {}) {
  const app = fastify(options)

  app.get('/api/health', async () => ({
    status: 'ok',
    service: 'calendar-api',
  }))

  return app
}

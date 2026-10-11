import fastifyStatic from '@fastify/static'
import fastify, { type FastifyServerOptions } from 'fastify'

type BuildAppOptions = {
  server?: FastifyServerOptions
  staticRoot?: string
}

export function buildApp({ server = {}, staticRoot }: BuildAppOptions = {}) {
  const app = fastify(server)

  app.get('/api/health', async () => ({
    status: 'ok',
    service: 'calendar-api',
  }))

  if (staticRoot !== undefined) {
    app.register(fastifyStatic, {
      root: staticRoot,
      index: 'index.html',
    })

    app.setNotFoundHandler((request, reply) => {
      if (request.url === '/api' || request.url.startsWith('/api/')) {
        return reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: `Route ${request.method}:${request.url} not found`,
        })
      }

      return reply.type('text/html').sendFile('index.html')
    })
  }

  return app
}

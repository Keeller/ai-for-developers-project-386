import fastifyStatic from '@fastify/static'
import fastify, { type FastifyServerOptions } from 'fastify'
import openapiGlue from 'fastify-openapi-glue'
import { fileURLToPath } from 'node:url'

import { serviceHandlers } from './service-handlers.js'

const openapiSpecification = fileURLToPath(
  new URL(
    '../../../packages/api-contract/generated/openapi.yaml',
    import.meta.url,
  ),
)

type BuildAppOptions = {
  server?: FastifyServerOptions
  staticRoot?: string
}

export function buildApp({ server = {}, staticRoot }: BuildAppOptions = {}) {
  const app = fastify(server)

  app.register(openapiGlue, {
    specification: openapiSpecification,
    serviceHandlers,
  })

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

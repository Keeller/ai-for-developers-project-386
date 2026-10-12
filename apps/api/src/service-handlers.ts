import type { RouteHandlers } from './generated/fastify.gen.js'

const notImplemented = {
  code: 'internal_error' as const,
  message: 'This contract route has not been implemented yet.',
}

export const serviceHandlers: RouteHandlers = {
  getHealth(_request, reply) {
    reply.code(200).send({
      status: 'ok',
      service: 'calendar-api',
    })
  },
  guestBookingsCreateBooking(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  guestEventTypesListPublicEventTypes(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  guestEventTypesGetPublicEventType(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  guestEventTypesListAvailableSlots(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  ownerAvailabilityGetAvailability(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  ownerAvailabilityReplaceAvailability(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  ownerAvailabilityListAvailabilityExceptions(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  ownerAvailabilityDeleteAvailabilityException(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  ownerAvailabilityPutAvailabilityException(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  ownerBookingsListFutureBookings(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  ownerEventTypesListEventTypes(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  ownerEventTypesCreateEventType(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  ownerEventTypesDeleteEventType(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  ownerEventTypesGetEventType(_request, reply) {
    reply.code(503).send(notImplemented)
  },
  ownerEventTypesUpdateEventType(_request, reply) {
    reply.code(503).send(notImplemented)
  },
}

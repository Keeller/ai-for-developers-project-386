import "@typespec/http";

using Http;

@service(#{ title: "Calendar Booking API" })
@server("http://127.0.0.1:3000", "Local development")
namespace CalendarBooking;

/** The API process is ready to receive requests. */
model HealthResponse {
  status: "ok";
  service: "calendar-api";
}

/** Return the current API health status. */
@route("/api/health")
@get
op getHealth(): HealthResponse;

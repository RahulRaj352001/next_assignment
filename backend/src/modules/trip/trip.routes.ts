import { FastifyInstance } from "fastify";
import {
  createTripHandler,
  listTripsHandler,
  updateTripHandler
} from "./trip.controller";

export default async function tripRoutes(app: FastifyInstance) {
  app.post("/api/trips", createTripHandler);
  app.get("/api/trips", listTripsHandler);
  app.put("/api/trips/:id", updateTripHandler);
}

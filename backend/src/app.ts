import Fastify from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import tripRoutes from "./modules/trip/trip.routes";

export function buildApp() {
  const app = Fastify({
    logger: true
  });

  app.register(cors, {
    origin: "*"
  });
  app.register(sensible);

  app.get("/api/health", async () => ({ status: "ok" }));

  app.register(tripRoutes);

  return app;
}

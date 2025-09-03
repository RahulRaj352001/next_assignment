import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import mongoose from "mongoose";
import { createTripSchema, listQuerySchema, updateTripSchema } from "./trip.schema";
import { createTrip, listTrips, updateTrip } from "./trip.service";

const paramsWithId = z.object({
  id: z.string().refine((v) => mongoose.Types.ObjectId.isValid(v), "Invalid id")
});

export async function createTripHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed = createTripSchema.safeParse(request.body);
  if (!parsed.success) {
    return reply.code(400).send({
      error: "Validation error",
      details: parsed.error.flatten()
    });
  }
  const trip = await createTrip(parsed.data);
  return reply.code(201).send(trip);
}

export async function listTripsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const parsed = listQuerySchema.safeParse(request.query);
  if (!parsed.success) {
    return reply.code(400).send({
      error: "Invalid query",
      details: parsed.error.flatten()
    });
  }
  const data = await listTrips(parsed.data);
  return reply.send(data);
}

export async function updateTripHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const idParsed = paramsWithId.safeParse((request.params as any) ?? {});
  if (!idParsed.success) {
    return reply.code(400).send({
      error: "Invalid params",
      details: idParsed.error.flatten()
    });
  }
  const bodyParsed = updateTripSchema.safeParse(request.body);
  if (!bodyParsed.success) {
    return reply.code(400).send({
      error: "Validation error",
      details: bodyParsed.error.flatten()
    });
  }
  const updated = await updateTrip(idParsed.data.id, bodyParsed.data);
  if (!updated) {
    return reply.code(404).send({ error: "Trip not found" });
  }
  return reply.send(updated);
}

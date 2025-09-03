import { z } from "zod";

export const tripBaseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  destination: z.string().min(1, "Destination is required").max(100),
  days: z.number().int().positive().max(365),
  budget: z.number().nonnegative().max(10_000_000)
});

export const createTripSchema = tripBaseSchema;
export const updateTripSchema = tripBaseSchema;

export const listQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  destination: z.string().trim().optional().transform(val => val === "" ? undefined : val),
  minBudget: z.coerce.number().nonnegative().optional(),
  maxBudget: z.coerce.number().nonnegative().optional()
});

export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;
export type ListQueryInput = z.infer<typeof listQuerySchema>;

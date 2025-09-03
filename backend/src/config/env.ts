import { z } from "zod";
import * as dotenv from "dotenv";
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  MONGODB_URI: z
    .string()
    .regex(/^mongodb(\+srv)?:\/\//, "MONGODB_URI must be a valid Mongo connection string"),
  NODE_ENV: z.string().optional()
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = {
  PORT: parseInt(parsed.data.PORT, 10),
  MONGODB_URI: parsed.data.MONGODB_URI,
  NODE_ENV: parsed.data.NODE_ENV ?? "development"
};

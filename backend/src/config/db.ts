import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB(uri?: string) {
  const mongoUri = uri ?? env.MONGODB_URI;
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
  console.log("✅ MongoDB connected");
}

export async function disconnectDB() {
  await mongoose.connection.close();
  console.log("👋 MongoDB disconnected");
}

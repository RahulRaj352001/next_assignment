import { buildApp } from "./app";
import { connectDB } from "./config/db";
import { env } from "./config/env";

async function start() {
  await connectDB();
  const app = buildApp();

  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    console.log(`🚀 Server listening on http://localhost:${env.PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();

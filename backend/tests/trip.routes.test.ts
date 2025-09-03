import { beforeAll, afterAll, describe, expect, it } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { buildApp } from "../src/app";

let app: ReturnType<typeof buildApp>;
let mongod: MongoMemoryServer;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  app = buildApp();
});

afterAll(async () => {
  await app.close();
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
});

describe("Trip Routes", () => {
  it("POST /api/trips should create a trip", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/trips",
      payload: {
        title: "Test Trip",
        destination: "Manali",
        days: 3,
        budget: 15000
      }
    });
    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body.title).toBe("Test Trip");
    expect(body.destination).toBe("Manali");
    expect(body.days).toBe(3);
    expect(body.budget).toBe(15000);
    expect(body).toHaveProperty("_id");
  });
});

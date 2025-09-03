import { Schema, model } from "mongoose";
import { TripPlan } from "./trip.types";

const TripSchema = new Schema<TripPlan>(
  {
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true, index: true },
    days: { type: Number, required: true, min: 1, max: 365 },
    budget: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export const Trip = model<TripPlan>("Trip", TripSchema);

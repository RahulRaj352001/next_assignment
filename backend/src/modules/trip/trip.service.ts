import { FilterQuery } from "mongoose";
import { Trip } from "./trip.model";
import { CreateTripInput, ListQueryInput, UpdateTripInput } from "./trip.schema";

export async function createTrip(data: CreateTripInput) {
  const doc = await Trip.create(data);
  return doc;
}

export async function listTrips(query: ListQueryInput) {
  const { page, limit, destination, minBudget, maxBudget } = query;

  const filter: FilterQuery<typeof Trip> = {};
  if (destination) {
    filter.destination = { $regex: destination, $options: "i" };
  }
  if (minBudget !== undefined || maxBudget !== undefined) {
    filter.budget = {};
    if (minBudget !== undefined) filter.budget.$gte = minBudget;
    if (maxBudget !== undefined) filter.budget.$lte = maxBudget;
  }

  const [items, total] = await Promise.all([
    Trip.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Trip.countDocuments(filter)
  ]);

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    items
  };
}

export async function updateTrip(id: string, data: UpdateTripInput) {
  const updated = await Trip.findByIdAndUpdate(id, data, { new: true }).lean();
  return updated;
}

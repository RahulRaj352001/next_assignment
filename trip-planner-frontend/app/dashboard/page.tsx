"use client";
import { useState, useEffect } from "react";
import TripCard from "@/components/TripCard";
import { getTrips, Trip } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getTrips(`?page=${page}&limit=6&destination=${search}`).then((res) => {
      setTrips(res.items);
    });
  }, [search, page]);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Search destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={() => setPage(1)}>Search</Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Prev
        </Button>
        <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </section>
  );
}

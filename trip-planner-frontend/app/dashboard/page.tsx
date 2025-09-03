"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TripCard from "@/components/TripCard";
import { getTrips, Trip } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { checkAuth } from "@/lib/auth";
import { Search, Plus, Plane } from "lucide-react";

export default function DashboardPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (!checkAuth()) {
      router.push("/login");
      return;
    }

    const fetchTrips = async () => {
      try {
        const res = await getTrips(
          `?page=${page}&limit=6&destination=${search}`
        );
        setTrips(res.items);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [search, page, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading your trips...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Trips
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and explore your travel plans
          </p>
        </div>
        <Button asChild size="lg" className="sm:w-auto">
          <a href="/submit">
            <Plus className="w-5 h-5 mr-2" />
            Plan New Trip
          </a>
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-12"
          />
        </div>
        <Button onClick={() => setPage(1)} variant="outline">
          Search
        </Button>
      </div>

      {trips.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl p-12 max-w-md mx-auto">
            <Plane className="h-16 w-16 mx-auto text-gray-400 mb-6" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No trips found
            </h3>
            <p className="text-gray-500 mb-6">
              Start planning your next adventure!
            </p>
            <Button asChild size="lg">
              <a href="/submit">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Trip
              </a>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              variant="outline"
              className="px-6"
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-gray-600">
              Page {page}
            </span>
            <Button
              onClick={() => setPage((p) => p + 1)}
              variant="outline"
              className="px-6"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </section>
  );
}

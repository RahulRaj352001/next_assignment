"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TripForm from "@/components/TripForm";
import { getTrips, Trip } from "@/lib/api";
import { checkAuth } from "@/lib/auth";
import { Edit } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditPage({ params }: Props) {
  const [paramId, setParamId] = useState<string>("");
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication first
    if (!checkAuth()) {
      router.push("/login");
      return;
    }

    // Then resolve the params Promise
    const resolveParams = async () => {
      const resolvedParams = await params;
      setParamId(resolvedParams.id);
    };
    resolveParams();
  }, [params, router]);

  useEffect(() => {
    if (!paramId) return;

    const fetchTrip = async () => {
      try {
        const data = await getTrips();
        const foundTrip = data.items.find((t: Trip) => t._id === paramId);
        setTrip(foundTrip || null);
      } catch (error) {
        console.error("Failed to fetch trip:", error);
        setTrip(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [paramId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">Loading trip details...</p>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-50 rounded-3xl p-12 max-w-md mx-auto">
          <h3 className="text-xl font-semibold text-red-700 mb-2">
            Trip Not Found
          </h3>
          <p className="text-red-600 mb-6">
            The trip you're looking for doesn't exist.
          </p>
          <Button asChild>
            <a href="/dashboard">Back to Dashboard</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full">
            <Edit className="h-12 w-12 text-orange-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
          Edit Your Trip
        </h1>
        <p className="text-gray-600 text-lg">
          Update your travel plans and make them perfect
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <TripForm initialData={trip} tripId={trip._id} />
      </div>
    </section>
  );
}

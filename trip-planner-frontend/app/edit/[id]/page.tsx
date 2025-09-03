"use client";
import { useEffect, useState } from "react";
import TripForm from "@/components/TripForm";
import { getTrips, Trip } from "@/lib/api";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditPage({ params }: Props) {
  const [paramId, setParamId] = useState<string>("");
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First resolve the params Promise
    const resolveParams = async () => {
      const resolvedParams = await params;
      setParamId(resolvedParams.id);
    };
    resolveParams();
  }, [params]);

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
    return <div className="text-center">Loading trip...</div>;
  }

  if (!trip) {
    return <div className="text-center">Trip not found</div>;
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Edit Trip</h1>
      <TripForm initialData={trip} tripId={trip._id} />
    </section>
  );
}

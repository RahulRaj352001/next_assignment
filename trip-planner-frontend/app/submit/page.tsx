"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TripForm from "@/components/TripForm";
import { checkAuth } from "@/lib/auth";
import { MapPin } from "lucide-react";

export default function SubmitPage() {
  const router = useRouter();

  useEffect(() => {
    if (!checkAuth()) {
      router.push("/login");
    }
  }, [router]);

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-full">
            <MapPin className="h-12 w-12 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Plan Your Next Adventure
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Create a detailed trip plan with your destination, duration, and
          budget. Let&apos;s make your travel dreams come true!
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <TripForm />
      </div>
    </section>
  );
}

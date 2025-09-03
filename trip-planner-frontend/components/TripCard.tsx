"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trip } from "@/lib/api";
import { Pencil } from "lucide-react";

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="shadow-lg hover:shadow-xl transition rounded-2xl">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {trip.title}
            <Link
              href={`/edit/${trip._id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              <Pencil className="w-4 h-4" />
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p>
            <strong>Destination:</strong> {trip.destination}
          </p>
          <p>
            <strong>Days:</strong> {trip.days}
          </p>
          <p>
            <strong>Budget:</strong> ₹{trip.budget.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

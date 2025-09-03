"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trip } from "@/lib/api";
import { MapPin, Calendar, DollarSign, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-bold text-gray-800 line-clamp-2">
              {trip.title}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full hover:bg-blue-100 text-blue-600"
            >
              <Link href={`/edit/${trip._id}`}>
                <Edit className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Destination</p>
              <p className="font-semibold text-gray-800">{trip.destination}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-semibold text-gray-800">
                  {trip.days} {trip.days === 1 ? "day" : "days"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Budget</p>
                <p className="font-semibold text-gray-800">
                  ${trip.budget.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Created: {new Date(trip.createdAt).toLocaleDateString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

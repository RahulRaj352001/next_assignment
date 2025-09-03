"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plane, MapPin, Calendar, DollarSign, Sparkles } from "lucide-react";
import Link from "next/link";
import { checkAuth } from "@/lib/auth";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(checkAuth());
  }, []);

  return (
    <div className="space-y-16">
      <div className="text-center space-y-8">
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse">
              <Plane className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Trip Planner
          </h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Plan your perfect trip with ease. Create detailed itineraries,
            manage budgets, and keep track of all your travel plans in one
            place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {isLoggedIn ? (
            <>
              <Button asChild size="lg" className="px-8 py-6 text-lg">
                <Link href="/submit">
                  <Sparkles className="w-6 h-6 mr-3" />
                  Plan New Trip
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="px-8 py-6 text-lg"
              >
                <Link href="/dashboard">
                  <MapPin className="w-6 h-6 mr-3" />
                  View My Trips
                </Link>
              </Button>
            </>
          ) : (
            <Button asChild size="lg" className="px-8 py-6 text-lg">
              <Link href="/login">
                <Sparkles className="w-6 h-6 mr-3" />
                Get Started
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="group hover:scale-105 transition-transform duration-300">
          <CardHeader className="text-center space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full mx-auto w-fit group-hover:from-blue-200 group-hover:to-blue-300 transition-colors">
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl text-gray-800">
              Destinations
            </CardTitle>
            <CardDescription className="text-gray-600">
              Explore amazing destinations around the world
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:scale-105 transition-transform duration-300">
          <CardHeader className="text-center space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-full mx-auto w-fit group-hover:from-green-200 group-hover:to-green-300 transition-colors">
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-xl text-gray-800">Planning</CardTitle>
            <CardDescription className="text-gray-600">
              Organize your trip timeline and activities
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:scale-105 transition-transform duration-300">
          <CardHeader className="text-center space-y-4">
            <div className="p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-full mx-auto w-fit group-hover:from-yellow-200 group-hover:to-yellow-300 transition-colors">
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-xl text-gray-800">Budget</CardTitle>
            <CardDescription className="text-gray-600">
              Keep track of your travel expenses
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:scale-105 transition-transform duration-300">
          <CardHeader className="text-center space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full mx-auto w-fit group-hover:from-purple-200 group-hover:to-purple-300 transition-colors">
              <Plane className="h-8 w-8 text-purple-600" />
            </div>
            <CardTitle className="text-xl text-gray-800">Travel</CardTitle>
            <CardDescription className="text-gray-600">
              Manage all your travel arrangements
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

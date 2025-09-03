import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plane, MapPin, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Trip Planner
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Plan your perfect trip with ease. Create detailed itineraries, manage
          budgets, and keep track of all your travel plans in one place.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/submit">Plan New Trip</Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/dashboard">View My Trips</Link>
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="text-center">
            <MapPin className="h-8 w-8 mx-auto text-primary" />
            <CardTitle>Destinations</CardTitle>
            <CardDescription>
              Explore amazing destinations around the world
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Calendar className="h-8 w-8 mx-auto text-primary" />
            <CardTitle>Planning</CardTitle>
            <CardDescription>
              Organize your trip timeline and activities
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <DollarSign className="h-8 w-8 mx-auto text-primary" />
            <CardTitle>Budget</CardTitle>
            <CardDescription>
              Keep track of your travel expenses
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Plane className="h-8 w-8 mx-auto text-primary" />
            <CardTitle>Travel</CardTitle>
            <CardDescription>
              Manage all your travel arrangements
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

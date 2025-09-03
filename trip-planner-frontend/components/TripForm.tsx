"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createTrip, updateTrip, Trip } from "@/lib/api";

const tripSchema = z.object({
  title: z.string().min(1, "Title is required"),
  destination: z.string().min(1, "Destination is required"),
  days: z.number().positive("Must be > 0"),
  budget: z.number().nonnegative(),
});

interface TripFormProps {
  initialData?: Trip;
  tripId?: string;
}

export default function TripForm({ initialData, tripId }: TripFormProps) {
  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    destination: initialData?.destination ?? "",
    days: initialData?.days ?? 1,
    budget: initialData?.budget ?? 0,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "days" || name === "budget" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = tripSchema.safeParse(form);
    if (!parsed.success) {
      toast({
        variant: "destructive",
        title: "Validation error",
        description: "Please fill all fields correctly",
      });
      return;
    }
    setLoading(true);
    try {
      if (tripId) {
        await updateTrip(tripId, form);
        toast({ title: "Trip updated!" });
      } else {
        await createTrip(form);
        toast({ title: "Trip created!" });
      }
      router.push("/dashboard");
    } catch (err: unknown) {
      toast({
        variant: "destructive",
        title: "Error",
        description: err instanceof Error ? err.message : "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          name="destination"
          value={form.destination}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="days">Days</Label>
        <Input
          type="number"
          id="days"
          name="days"
          value={form.days}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="budget">Budget</Label>
        <Input
          type="number"
          id="budget"
          name="budget"
          value={form.budget}
          onChange={handleChange}
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : tripId ? "Update Trip" : "Create Trip"}
      </Button>
    </motion.form>
  );
}

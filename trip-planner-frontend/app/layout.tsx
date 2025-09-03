import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Trip Planner",
  description: "Plan and manage trips easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Plane } from "lucide-react";

export default function Navbar() {
  return (
    <header className="shadow-md sticky top-0 z-50 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Plane className="w-6 h-6 text-blue-600" />
          Trip Planner
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/submit" className="px-3 py-2 hover:text-blue-600">
                Submit
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard" className="px-3 py-2 hover:text-blue-600">
                Dashboard
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  MoveIcon as LocalMoving,
  User,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "@/lib/context/authContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navigation() {
  const { isLoggedIn, userEmail, login, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Get first letter of email for avatar fallback
  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2.5">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" className="flex items-center gap-2">
                  <LocalMoving className="h-6 w-6 text-blue-500" />
                  <span className="text-xl font-medium">MovingService</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link href="/movers" className="text-lg">
                    Find Movers
                  </Link>
                  <Link href="/services" className="text-lg">
                    Services
                  </Link>
                  <Link href="/about" className="text-lg">
                    About Us
                  </Link>
                  <Link href="/contact" className="text-lg">
                    Contact
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <LocalMoving className="h-6 w-6 text-blue-500" />
            <span className="text-lg font-medium hidden md:inline">
              MovingService
            </span>
          </Link>
        </div>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md mx-4"
        >
          <div className="relative flex w-full items-center">
            <Input
              type="search"
              placeholder="Search for movers, services..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus-visible:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          </div>
        </form>

        {/* Navigation links and auth */}
        <nav className="flex items-center gap-1 md:gap-4">
          <Link
            href="/movers"
            className="hidden md:block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md hover:bg-gray-100"
          >
            Find Movers
          </Link>

          <Link
            href="/services"
            className="hidden md:block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md hover:bg-gray-100"
          >
            Services
          </Link>

          {/* Mobile search button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 ml-2"
                >
                  <Avatar>
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${userInitial}&background=random`}
                    />
                    <AvatarFallback>{userInitial}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{userEmail}</p>
                  <p className="text-xs text-muted-foreground">Logged in</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={login}
              className="rounded-md bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign in
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

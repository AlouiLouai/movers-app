"use client";

import type React from "react";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-md">
      <div className="relative flex w-full items-center">
        <Input
          type="search"
          placeholder="Search for movers, services..."
          className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus-visible:ring-blue-500 focus-visible:ring-offset-0"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
        <button type="submit" className="sr-only">
          Search
        </button>
      </div>
    </form>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/authContext";

export default function Dashboard() {
  const { userEmail, logout } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Welcome, {userEmail}!</p>
      <Button variant="outline" className="mt-4" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

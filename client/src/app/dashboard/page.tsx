"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/authContext";

export default function Dashboard() {
  const { userEmail, logout } = useAuth();
  const router = useRouter();

  // Redirect to initial page if not logged in
  useEffect(() => {
    if (!userEmail) {
      router.push("/");
    }
  }, [userEmail, router]);

  // Render nothing until userEmail is confirmed (avoids flicker)
  if (!userEmail) {
    return null;
  }

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

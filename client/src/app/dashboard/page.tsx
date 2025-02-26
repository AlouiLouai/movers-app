"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");

    if (!token || !email) {
      router.push("/login");
    } else {
      setUserEmail(email);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  if (!userEmail) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Welcome, {userEmail}!</p>
      <Button variant="outline" className="mt-4" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
}

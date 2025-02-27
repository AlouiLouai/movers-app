"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/authContext";
import { MoverCard } from "../../components/mover-card";

export default function ProfilePage() {
  const { userProfile, fetchProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userProfile) {
      fetchProfile().catch(() => router.push("/"));
    }
  }, [userProfile, fetchProfile, router]);

  if (!userProfile) {
    return <div className="container py-8">Loading profile...</div>;
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <MoverCard mover={userProfile} />
    </div>
  );
}

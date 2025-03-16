"use client";

import { useAuth } from "@/lib/context/authContext";
import { MoverCard } from "../../components/profile/mover-card";
import { BonusPointsCard } from "@/components/profile/bonus-point-card";

export default function ProfilePage() {
  const { userProfile } = useAuth();

  if (!userProfile) {
    return <div className="container py-8">Loading profile...</div>;
  }

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-normal text-gray-800 mb-8 ml-4">Your Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 ml-4">
          <MoverCard mover={userProfile} />
        </div>
        <div className="md:col-span-2">
          <BonusPointsCard points={750} />
        </div>
      </div>
    </div>
  );
}

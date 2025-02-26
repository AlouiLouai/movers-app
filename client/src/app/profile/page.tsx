import { ProfileForm } from "../../components/profile-form";

// This would be replaced with your actual API call
const getProfile = async () => {
  const res = await fetch("http://your-api/profile", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <ProfileForm profile={profile} />
    </div>
  );
}

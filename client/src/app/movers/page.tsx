import { MoverCard } from "../../components/profile/mover-card";

// This would be replaced with your actual API call
const getMoversList = async () => {
  const res = await fetch("http://your-api/movers", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch movers");
  return res.json();
};

export default async function MoversPage() {
  const movers = await getMoversList();

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Available Movers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {movers.map((mover: { id: string }) => (
          <MoverCard key={mover.id} mover={mover} />
        ))}
      </div>
    </div>
  );
}

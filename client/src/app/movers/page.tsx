import { Mover } from "@/lib/interfaces/Mover";
import { MoverCard } from "../../components/profile/mover-card";
import { fetchMovers } from "@/services/movers/movers.service";
import { Suspense } from "react";

// Dummy data to supplement the API response
const dummyMovers: Mover[] = [
  {
    id: "dummy-7",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?u=johndoe",
  },
  {
    id: "dummy-8",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?u=janesmith",
  },
  {
    id: "dummy-1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?u=johndoe",
  },
  {
    id: "dummy-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?u=janesmith",
  },
  {
    id: "dummy-3",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?u=johndoe",
  },
  {
    id: "dummy-4",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?u=janesmith",
  },
  {
    id: "dummy-5",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://i.pravatar.cc/150?u=johndoe",
  },
  {
    id: "dummy-6",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatar: "https://i.pravatar.cc/150?u=janesmith",
  },
];

export default async function MoversPage() {
  let movers: Mover[] = [];
  let error: string | null = null;

  try {
    const fetchedMovers = await fetchMovers();
    // Combine fetched movers with dummy data
    movers = [...fetchedMovers, ...dummyMovers];
  } catch (err) {
    error = err instanceof Error ? err.message : "An unexpected error occurred";
  }

  return (
    <div className="container py-4 px-4 md:px-6 lg:px-8 max-w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 ml-0">
        Available Movers
      </h1>
      {error ? (
        <div className="text-red-600 text-center py-4">
          Error: {error}
          <button
            onClick={() => window.location.reload()}
            className="ml-4 text-blue-600 underline hover:text-blue-800"
          >
            Retry
          </button>
        </div>
      ) : (
        <Suspense fallback={<MoversSkeleton />}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {movers.map((mover) => (
              <MoverCard key={mover.id} mover={mover} />
            ))}
          </div>
        </Suspense>
      )}
    </div>
  );
}

// Skeleton component for loading state
function MoversSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-6">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

import { Mover } from "@/lib/interfaces/Mover";

export async function fetchMovers(): Promise<Mover[]> {
  try {
    const res = await fetch(`http://localhost:5000/mover/movers`, {
      next: { revalidate: 3600 }, // ISR: Revalidate every hour
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch movers: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data as Mover[];
  } catch (error) {
    console.error("Error fetching movers:", error);
    throw error; // Let the caller handle the error
  }
}

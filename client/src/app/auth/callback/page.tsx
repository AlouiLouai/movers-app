"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token && email) {
      // Store token and email in localStorage (or cookies in production)
      localStorage.setItem("authToken", token);
      localStorage.setItem("userEmail", email);
      console.log("Logged in as:", email);
      router.push("/dashboard"); // Redirect to a protected page
    } else {
      setError("Authentication failed. Please try again.");
      setTimeout(() => router.push("/login"), 2000); // Redirect back to login after delay
    }
  }, [searchParams, router]);

  if (error) return <div>{error}</div>;
  return <div>Processing authentication...</div>;
}

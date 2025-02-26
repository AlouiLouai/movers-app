"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveIcon as LocalMoving } from "lucide-react";
import { useEffect, useState } from "react";

export function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(!!token);
    setUserEmail(email);
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setUserEmail(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <LocalMoving className="h-6 w-6" />
          <span className="font-bold">MovingService</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-4">
          <Link href="/movers">Find Movers</Link>
          {isLoggedIn ? (
            <>
              <span>{userEmail}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={handleGoogleLogin}>
              Sign in with Google
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

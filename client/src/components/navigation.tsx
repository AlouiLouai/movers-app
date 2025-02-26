"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoveIcon as LocalMoving } from "lucide-react";
import { useAuth } from "@/lib/context/authContext";

export function Navigation() {
  const { isLoggedIn, userEmail, login, logout } = useAuth();

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
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={login}>
              Sign in with Google
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}

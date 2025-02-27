"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface AuthState {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log(
      "AuthProvider useEffect running for path:",
      window.location.pathname
    );
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Auth check failed with status:", response.status);
          throw new Error(`Auth check failed: ${response.status}`);
        }

        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
        setUserEmail(data.email);
      } catch (error) {
        console.error("Failed to fetch auth status:", error);
        setIsLoggedIn(false);
        setUserEmail(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAuthStatus();
  }, [router]); // Runs on every route change

  if (isLoading) return <div>Loading...</div>;

  const login = () => {
    setCookie("redirectAfterLogin", "true", 1);
    window.location.href = "http://localhost:5000/auth/google";
  };

  const logout = async () => {
    await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsLoggedIn(false);
    setUserEmail(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/`;
};

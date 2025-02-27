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
    const pathname = window.location.pathname;
    // Define public routes where auth check isn’t needed
    const publicRoutes = ["/"];
    if (publicRoutes.includes(pathname)) {
      console.log("Skipping auth check on public route");
      setIsLoading(false);
      return;
    }

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
        console.log("Auth status received:", data);
        setIsLoggedIn(data.isLoggedIn);
        setUserEmail(data.email);

        // Redirect to dashboard after login if redirect flag exists
        if (data.isLoggedIn && getCookie("redirectAfterLogin")) {
          setCookie("redirectAfterLogin", "", -1);
          router.push("/dashboard");
        }
      } catch (error) {
        console.error("Failed to fetch auth status:", error);
        setIsLoggedIn(false);
        setUserEmail(null);
      } finally {
        console.log("Setting isLoading to false");
        setIsLoading(false);
      }
    };

    fetchAuthStatus();
  }, [router]);

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

// Cookie helpers (unchanged)
const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([\.$?|{}()*\+\^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires.toUTCString()}; path=/`;
};

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
  const router = useRouter();

  useEffect(() => {
    const currentPath = window.location.pathname;

    // 🚀 Skip auth check if on the landing page
    if (currentPath === "/") return;

    const fetchAuthStatus = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include", // Ensure cookies are sent
        });

        if (!response.ok)
          throw new Error(`Auth check failed: ${response.status}`);

        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
        setUserEmail(data.email);

        // Redirect to dashboard after login if flag exists in cookies
        if (data.isLoggedIn) {
          const redirectFlag = getCookie("redirectAfterLogin");
          if (redirectFlag) {
            // Clear the cookie after checking
            setCookie("redirectAfterLogin", "", -1);
            router.push("/dashboard");
          }
        }
      } catch (error) {
        console.error("Failed to fetch auth status:", error);
        setIsLoggedIn(false);
        setUserEmail(null);
      }
    };

    fetchAuthStatus();
  }, [router]);

  const login = () => {
    // 🚀 Set flag to redirect user after login in a cookie
    setCookie("redirectAfterLogin", "true", 1); // 1 day expiration
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

// Helper functions to manage cookies
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

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;
  const pathname = request.nextUrl.pathname;

  // Define protected routes
  const protectedRoutes = ["/dashboard"];

  // Skip middleware for non-protected routes
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if authToken exists
  if (!authToken) {
    console.log("No authToken found, redirecting to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Verify token with backend
  try {
    const response = await fetch("http://localhost:5000/auth/verify", {
      method: "GET",
      headers: {
        Cookie: `authToken=${authToken}`,
      },
    });

    if (!response.ok) {
      console.log("Token verification failed with status:", response.status);
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Token is valid, proceed to the requested page
    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying token in middleware:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // Apply to /dashboard and its subpaths
};

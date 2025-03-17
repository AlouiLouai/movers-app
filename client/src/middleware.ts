import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;
  const pathname = request.nextUrl.pathname;

  // Define routes based on authentication status
  const signedInAllowedRoutes = ["/", "/dashboard", "/profile"];
  const signedOutAllowedRoutes = ["/", "/movers", "/servicess"];

  // If user is signed in (has authToken)
  if (authToken) {
    try {
      // Verify token with backend
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

      // Check if the requested path is allowed for signed-in users
      if (
        !signedInAllowedRoutes.some(
          (route) => pathname === route || pathname.startsWith(`${route}/`)
        )
      ) {
        console.log(
          "Signed-in user attempted to access restricted route:",
          pathname
        );
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // Token is valid and route is allowed, proceed
      return NextResponse.next();
    } catch (error) {
      console.error("Error verifying token in middleware:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  // If user is not signed in (no authToken)
  else {
    // Check if the requested path is allowed for signed-out users
    if (
      !signedOutAllowedRoutes.some(
        (route) => pathname === route || pathname.startsWith(`${route}/`)
      )
    ) {
      console.log(
        "Signed-out user attempted to access restricted route:",
        pathname
      );
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Route is allowed for signed-out users, proceed
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Apply to all routes except static files and API
  ],
};

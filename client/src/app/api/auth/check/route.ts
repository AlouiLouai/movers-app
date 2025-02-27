import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value; // No need for await
  console.log("cookie :", authToken);

  if (!authToken) {
    return NextResponse.json(
      { isLoggedIn: false, email: null },
      { status: 401 }
    );
  }

  try {
    const response = await fetch("http://localhost:5000/auth/verify", {
      method: "GET",
      credentials: "include",
      headers: {
        Cookie: `authToken=${authToken}`, // Ensure forwarding
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { isLoggedIn: false, email: null },
        { status: 401 }
      );
    }

    const { email } = await response.json();
    return NextResponse.json({ isLoggedIn: true, email });
  } catch (error) {
    console.error("Error verifying auth:", error);
    return NextResponse.json(
      { isLoggedIn: false, email: null },
      { status: 500 }
    );
  }
}

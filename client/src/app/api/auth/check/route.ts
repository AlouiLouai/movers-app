import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const authToken = (await cookieStore).get("authToken")?.value; // No need for await

  if (!authToken) {
    return NextResponse.json(
      { isLoggedIn: false, email: null },
      { status: 401 }
    );
  }

  try {
    const response = await fetch("http://localhost:5000/auth/verify", {
      method: "GET",
      headers: { Authorization: `Bearer ${authToken}` },
      credentials: "include",
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

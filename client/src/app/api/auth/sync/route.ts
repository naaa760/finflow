import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { clerkId, email } = await request.json();

    if (!clerkId || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    console.log("Attempting to connect to:", `${backendUrl}/auth/sync`);

    // Forward the request to the backend API
    const response = await fetch(`${backendUrl}/auth/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clerkId, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error response:", errorData);
      throw new Error(errorData.error || "Failed to sync user");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Auth sync error:", error);
    return NextResponse.json(
      {
        error: "Failed to sync user",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

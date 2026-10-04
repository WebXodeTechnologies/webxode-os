import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("webxode_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid session token" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findById(payload.userId).select("-passwordHash");
    if (!user) {
      // Return payload data if user record not found in DB
      return NextResponse.json(
        {
          success: true,
          user: {
            id: payload.userId,
            name: payload.name || "Akash S M",
            email: payload.email || "akash@webxode.com",
            role: payload.role || "admin",
            department: "Engineering",
          },
        },
        { status: 200 },
      );
    }

    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

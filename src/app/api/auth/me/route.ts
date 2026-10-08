import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/rbac";

export async function GET() {
  try {
    const { error, user } = await requireAuth();

    if (error || !user) {
      return error || NextResponse.json({ error: "Unauthorized session" }, { status: 401 });
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
          isActive: user.isActive,
          createdAt: user.createdAt,
          bio: user.bio || "",
          phone: user.phone || "",
          location: user.location || "",
          github: user.github || "",
          linkedin: user.linkedin || "",
          twitter: user.twitter || "",
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in GET /api/auth/me:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

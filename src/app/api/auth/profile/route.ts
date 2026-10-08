// src/app/api/auth/profile/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { requireAuth } from "@/lib/rbac";

export async function PATCH(req: Request) {
  try {
    // 1. Authenticate user session
    const { error, user } = await requireAuth();
    if (error || !user) return error;

    // 2. Parse payload body
    const body = await req.json();
    const { name, department, phone, location, bio, github, linkedin, twitter } = body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // 3. Connect DB & Update User Document in MongoDB
    await connectDB();
    const updateData: Record<string, any> = {
      name: name.trim(),
      ...(department && { department }),
      ...(phone !== undefined && { phone }),
      ...(location !== undefined && { location }),
      ...(bio !== undefined && { bio }),
      ...(github !== undefined && { github }),
      ...(linkedin !== undefined && { linkedin }),
      ...(twitter !== undefined && { twitter }),
    };

    const updatedUser = await User.findByIdAndUpdate(user._id, updateData, {
      new: true,
      runValidators: true,
    }).select("-passwordHash");

    if (!updatedUser) {
      return NextResponse.json({ error: "User profile record not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Profile synchronized successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        department: updatedUser.department,
        createdAt: updatedUser.createdAt,
        bio: updatedUser.bio || "",
        phone: updatedUser.phone || "",
        location: updatedUser.location || "",
        github: updatedUser.github || "",
        linkedin: updatedUser.linkedin || "",
        twitter: updatedUser.twitter || "",
      },
    });
  } catch (error: any) {
    console.error("Profile update error in PATCH /api/auth/profile:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed. Use GET /api/auth/me or PATCH /api/auth/profile" },
    { status: 405 }
  );
}

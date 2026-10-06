import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { requireAuth } from "@/lib/rabc";

export async function PATCH(req: Request) {
  try {
    const { error, user } = await requireAuth();
    if (error || !user) return error;

    const { darkAccents, emailAlerts } = await req.json();

    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          "preferences.darkAccents": darkAccents,
          "preferences.emailAlerts": emailAlerts,
        },
      },
      { new: true }
    ).select("-passwordHash");

    return NextResponse.json({
      success: true,
      preferences: updatedUser?.preferences,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

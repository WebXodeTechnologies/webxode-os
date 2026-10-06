import { NextResponse } from "next/server";
import { verify } from "otplib";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { requireAuth } from "@/lib/rabc";

export async function POST(req: Request) {
  try {
    const { error, user } = await requireAuth();
    if (error || !user) return error;

    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: "Verification code is required" }, { status: 400 });
    }

    await connectDB();
    const dbUser = await User.findById(user._id);
    const secret = dbUser?.security?.twoFactorSecret;

    if (!dbUser || !secret) {
      return NextResponse.json({ error: "2FA setup not initiated" }, { status: 400 });
    }

    // Verify token against the stored secret
    const isValid = await verify({
      token,
      secret,
    });

    if (!isValid) {
      return NextResponse.json({ error: "Invalid verification code. Try again." }, { status: 400 });
    }

    // Activate 2FA
    dbUser.set("security.twoFactorEnabled", true);
    await dbUser.save();

    return NextResponse.json({
      success: true,
      message: "Two-Factor Authentication successfully enabled",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

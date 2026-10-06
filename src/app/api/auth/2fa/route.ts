// src/app/api/auth/login/2fa/route.ts
import { NextResponse } from "next/server";
import { verify } from "otplib";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { userId, token } = await req.json();

    if (!userId || !token) {
      return NextResponse.json(
        { error: "Missing user identification or 2FA token" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user || !user.security?.twoFactorSecret) {
      return NextResponse.json({ error: "User or 2FA configuration not found" }, { status: 404 });
    }

    // Verify 6-digit code from Google Authenticator
    const isValid = await verify({
      token,
      secret: user.security.twoFactorSecret,
    });

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid verification code. Please try again." },
        { status: 400 }
      );
    }

    // Issue auth token & set HTTP-only cookie
    const authToken = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
      department: user.department,
    });

    await setAuthCookie(authToken);

    return NextResponse.json({
      success: true,
      message: "2FA verification successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

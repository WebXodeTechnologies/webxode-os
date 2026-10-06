import { NextResponse } from "next/server";
import { generateSecret, generateURI } from "otplib";
import QRCode from "qrcode";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { requireAuth } from "@/lib/rabc";

export async function POST() {
  try {
    const { error, user } = await requireAuth();
    if (error || !user) return error;

    await connectDB();
    const dbUser = await User.findById(user._id);
    if (!dbUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Generate a unique secret using otplib
    const secret = generateSecret();

    // Save secret securely using dot-notation to bypass subdocument strict type rules
    dbUser.set("security.twoFactorSecret", secret);
    dbUser.set("security.twoFactorEnabled", false);
    await dbUser.save();

    // Create OTP auth URI for Google Authenticator apps
    const otpauth = generateURI({
      issuer: "WebxodeOS",
      label: dbUser.email,
      secret,
    });

    // Generate QR code data URL to render on the frontend
    const qrCodeUrl = await QRCode.toDataURL(otpauth);

    return NextResponse.json({
      success: true,
      secret,
      qrCodeUrl,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

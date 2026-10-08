import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { requireAuth } from "@/lib/rbac";

export async function PATCH(req: Request) {
  try {
    const { error, user } = await requireAuth();
    if (error || !user) return error;

    const body = await req.json();
    const { currentPassword, newPassword, twoFactorEnabled } = body;

    await connectDB();
    const dbUser = await User.findById(user._id);
    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 1. Handle 2FA status update if passed
    if (typeof twoFactorEnabled === "boolean") {
      dbUser.set("security.twoFactorEnabled", twoFactorEnabled);
    }

    // 2. Handle Password Change if requested
    if (currentPassword && newPassword) {
      // Verify current password against stored passwordHash
      if (!dbUser.passwordHash) {
        return NextResponse.json({ error: "Password configuration error" }, { status: 400 });
      }

      const isMatch = await bcrypt.compare(currentPassword, dbUser.passwordHash);
      if (!isMatch) {
        return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
      }

      // Hash the new password securely
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update passwordHash and security timestamp
      dbUser.passwordHash = hashedPassword;
      dbUser.set("security.passwordLastChanged", new Date());
    }

    await dbUser.save();

    return NextResponse.json({
      success: true,
      message: "Security settings updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

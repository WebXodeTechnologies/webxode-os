import { NextResponse } from "next/server";
import { AuthService } from "@/modules/auth/auth.service";

export async function POST(req: Request) {
  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json({ error: "Email and new password are required" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    await AuthService.resetPassword(email, newPassword);

    return NextResponse.json(
      { success: true, message: "Password successfully reset" },
      { status: 200 }
    );
  } catch (error: any) {
    const status = error.message.includes("No account") ? 404 : 500;
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status });
  }
}

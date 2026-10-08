import { NextResponse } from "next/server";
import { AuthService } from "@/modules/auth/auth.service";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { userId, token } = await req.json();

    if (!userId || !token) {
      return NextResponse.json(
        { error: "Missing user identification or 2FA token" },
        { status: 400 }
      );
    }

    const user = await AuthService.verify2FA(userId, token);

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
    const status = error.message.includes("not found") ? 404 : 400;
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status });
  }
}

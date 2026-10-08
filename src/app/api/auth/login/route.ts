import { NextResponse } from "next/server";
import { AuthService } from "@/modules/auth/auth.service";
import { loginSchema } from "@/modules/auth/auth.validation";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate incoming login payload using Zod
    const validationResult = loginSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email, password } = validationResult.data;

    // 2. Authenticate using AuthService
    const user = await AuthService.login(email, password);

    // 3. If 2FA is enabled, pause login and signal frontend to request 6-digit code
    if (user.security?.twoFactorEnabled) {
      return NextResponse.json(
        {
          requires2FA: true,
          userId: user._id.toString(),
          message: "Please enter your Google Authenticator 2FA code",
        },
        { status: 200 }
      );
    }

    // 4. Normal Login Flow (2FA disabled)
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name,
      department: user.department,
    });

    await setAuthCookie(token);

    return NextResponse.json(
      {
        success: true,
        message: "Authentication successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          department: user.department,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    const status = error.message.includes("Invalid")
      ? 401
      : error.message.includes("deactivated")
        ? 403
        : 500;
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status });
  }
}

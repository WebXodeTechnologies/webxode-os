import { NextResponse } from "next/server";
import { AuthService } from "@/modules/auth/auth.service";
import { registerSchema } from "@/modules/auth/auth.validation";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate incoming payload using Zod
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message }, // Fixed from .errors to .issues
        { status: 400 }
      );
    }

    const { name, email, password, role, department } = validationResult.data;

    // 2. Delegate registration logic to AuthService
    const newUser: any = await AuthService.register({ name, email, password, role, department });

    // 3. Issue session token & cookie
    const token = signToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
      department: newUser.department,
    });

    await setAuthCookie(token);

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          department: newUser.department,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    const status = error.message.includes("already exists") ? 409 : 500;
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status });
  }
}

import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/rbac";
import { UserService } from "@/modules/users/user.service";

export async function PATCH(req: Request) {
  try {
    const { error, user } = await requireAuth();
    if (error || !user) return error;

    const body = await req.json();
    await UserService.updateSecurity(user._id, body);

    return NextResponse.json({
      success: true,
      message: "Security settings updated successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

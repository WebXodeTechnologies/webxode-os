import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/rbac";
import { UserService } from "@/modules/users/user.service";

export async function PATCH(req: Request) {
  try {
    const { error, user } = await requireAuth();
    if (error || !user) return error;

    const { darkAccents, emailAlerts } = await req.json();

    const updatedUser = await UserService.updatePreferences(user._id, {
      darkAccents,
      emailAlerts,
    });

    return NextResponse.json({
      success: true,
      preferences: updatedUser?.preferences,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

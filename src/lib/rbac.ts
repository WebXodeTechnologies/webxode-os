// src/lib/rabc.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import { User, IUser } from "@/models/user.model";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key";

export interface AuthenticatedUser extends IUser {
  userId: string;
}

/**
 * RBAC Authentication & Authorization middleware helper.
 * Validates session token from cookies, checks user status in DB, and enforces role/department access.
 */
export async function requireAuth(allowedRoles?: string[], allowedDepartments?: string[]) {
  try {
    const cookieStore = await cookies();
    // Support primary "webxode_token" cookie as well as fallback "token" cookie
    const token = cookieStore.get("webxode_token")?.value || cookieStore.get("token")?.value;

    if (!token) {
      return {
        error: NextResponse.json({ error: "Unauthorized session token missing" }, { status: 401 }),
        user: null,
      };
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role?: string;
      department?: string;
    };
    if (!decoded || !decoded.userId) {
      return {
        error: NextResponse.json(
          { error: "Invalid authentication token payload" },
          { status: 401 }
        ),
        user: null,
      };
    }

    await connectDB();

    const user = await User.findById(decoded.userId).select("-passwordHash");
    if (!user || !user.isActive) {
      return {
        error: NextResponse.json(
          { error: "Forbidden: Inactive or revoked user session" },
          { status: 403 }
        ),
        user: null,
      };
    }

    // Role & Department Access Control (Admins have full override access)
    if (user.role !== "admin") {
      if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        return {
          error: NextResponse.json(
            { error: "Forbidden: Insufficient role permissions" },
            { status: 403 }
          ),
          user: null,
        };
      }
      if (
        allowedDepartments &&
        allowedDepartments.length > 0 &&
        !allowedDepartments.includes(user.department)
      ) {
        return {
          error: NextResponse.json(
            { error: "Forbidden: Unauthorized department scope" },
            { status: 403 }
          ),
          user: null,
        };
      }
    }

    return { error: null, user };
  } catch (error: any) {
    return {
      error: NextResponse.json(
        { error: "Invalid or expired session token", details: error.message },
        { status: 401 }
      ),
      user: null,
    };
  }
}

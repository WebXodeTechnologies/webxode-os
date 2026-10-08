import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "user"]).optional(),
  department: z.enum(["sales", "development", "revenue", "hr", "general"]).optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const verify2FASchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  token: z.string().length(6, "2FA token must be 6 digits"),
});

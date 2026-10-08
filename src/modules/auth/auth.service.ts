import bcrypt from "bcryptjs";
import { verify } from "otplib";
import { connectDB } from "@/lib/db";
import { User, IUser } from "@/modules/users/user.model";
import { UserRepository } from "@/modules/users/user.repository";

export class AuthService {
  static async register(payload: {
    name: string;
    email: string;
    password: string;
    role?: string;
    department?: string;
  }) {
    await connectDB();
    const cleanEmail = payload.email.toLowerCase().trim();

    const existingUser = await UserRepository.findByEmail(cleanEmail);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(payload.password, salt);

    const newUser = await User.create({
      name: payload.name.trim(),
      email: cleanEmail,
      passwordHash,
      role: (payload.role as "admin" | "user") || "user",
      department: (payload.department as IUser["department"]) || "development",
    });

    return newUser;
  }
  static async login(email: string, password: string) {
    await connectDB();
    const cleanEmail = email.toLowerCase().trim();

    const user = await UserRepository.findByEmail(cleanEmail);
    if (!user || !user.passwordHash) {
      throw new Error("Invalid email or password");
    }

    if (!user.isActive) {
      throw new Error("Your account is deactivated. Please contact your administrator.");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    return user;
  }

  static async verify2FA(userId: string, token: string) {
    await connectDB();
    const user = await User.findById(userId);
    if (!user || !user.security?.twoFactorSecret) {
      throw new Error("User or 2FA configuration not found");
    }

    const isValid = await verify({
      token,
      secret: user.security.twoFactorSecret,
    });

    if (!isValid) {
      throw new Error("Invalid verification code. Please try again.");
    }

    return user;
  }
  static async resetPassword(email: string, newPassword: string) {
    await connectDB();
    const cleanEmail = email.toLowerCase().trim();

    const user = await UserRepository.findByEmail(cleanEmail);
    if (!user) {
      throw new Error("No account found with this email address");
    }

    const salt = await bcrypt.genSalt(10);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    return user;
  }
}

import { Types } from "mongoose";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User, IUser } from "./user.model";
import { UserRepository } from "./user.repository";

export class UserService {
  static async getProfileById(userId: string | Types.ObjectId) {
    const user = await UserRepository.findById(userId.toString());
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  static async updateProfile(userId: string | Types.ObjectId, updateData: Partial<IUser>) {
    if ("passwordHash" in updateData) {
      delete updateData.passwordHash;
    }

    const updatedUser = await UserRepository.updateProfile(userId.toString(), updateData);
    if (!updatedUser) {
      throw new Error("User not found or update failed");
    }

    return updatedUser;
  }

  static async updateSecurity(
    userId: string | Types.ObjectId,
    body: { currentPassword?: string; newPassword?: string; twoFactorEnabled?: boolean }
  ) {
    await connectDB();
    const dbUser = await User.findById(userId.toString());
    if (!dbUser) {
      throw new Error("User not found");
    }

    // 1. Handle 2FA status update if passed
    if (typeof body.twoFactorEnabled === "boolean") {
      dbUser.set("security.twoFactorEnabled", body.twoFactorEnabled);
    }

    // 2. Handle Password Change if requested
    if (body.currentPassword && body.newPassword) {
      if (!dbUser.passwordHash) {
        throw new Error("Password configuration error");
      }

      const isMatch = await bcrypt.compare(body.currentPassword, dbUser.passwordHash);
      if (!isMatch) {
        throw new Error("Incorrect current password");
      }

      const salt = await bcrypt.genSalt(10);
      dbUser.passwordHash = await bcrypt.hash(body.newPassword, salt);
      dbUser.set("security.passwordLastChanged", new Date());
    }

    await dbUser.save();
    return dbUser;
  }

  static async updatePreferences(
    userId: string | Types.ObjectId,
    preferences: IUser["preferences"]
  ) {
    const updatedUser = await UserRepository.updateProfile(userId.toString(), {
      preferences,
    });
    if (!updatedUser) {
      throw new Error("Failed to update preferences");
    }
    return updatedUser;
  }
}

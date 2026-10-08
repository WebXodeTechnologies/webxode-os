import { User, IUser } from "./user.model";
import { connectDB } from "@/lib/db";

export class UserRepository {
  static async findById(id: string) {
    await connectDB();
    return User.findById(id).select("-passwordHash");
  }

  static async findByEmail(email: string) {
    await connectDB();
    return User.findOne({ email: email.toLowerCase().trim() });
  }

  static async updateProfile(id: string, updateData: Partial<IUser>) {
    await connectDB();
    return User.findByIdAndUpdate(id, updateData, { new: true }).select("-passwordHash");
  }
}

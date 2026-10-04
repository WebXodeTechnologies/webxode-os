// src/models/user.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "user";
  department: "sales" | "development" | "revenue" | "hr" | "general";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
      set: (v: string) => (v && v.toLowerCase() === "admin" ? "admin" : "user"),
    },
    department: {
      type: String,
      enum: ["sales", "development", "revenue", "hr", "general"],
      default: "development",
      required: true,
      set: (v: string) => {
        if (!v) return "development";
        const val = v.toLowerCase().trim();
        if (val.includes("sale") || val.includes("presale")) return "sales";
        if (val.includes("engineer") || val.includes("dev") || val.includes("product"))
          return "development";
        if (val.includes("finance") || val.includes("revenue") || val.includes("account"))
          return "revenue";
        if (val.includes("hr") || val.includes("people") || val.includes("operation")) return "hr";
        if (val.includes("general")) return "general";
        return "development";
      },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

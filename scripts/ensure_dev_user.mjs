import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://mail2meak22frcrio_db_user:yqu9Frv6p6AF19fo@maincluster.ydlqg6a.mongodb.net/?appName=maincluster/webxode_os";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "admin" },
    department: { type: String, default: "development" },
    isActive: { type: Boolean, default: true },
    security: {
      twoFactorEnabled: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function main() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI, { dbName: "webxode_os" });
    console.log("Connected to MongoDB successfully.");

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("1234567890###", salt);

    const existing = await User.findOne({ email: "dev@webxode.com" });
    if (existing) {
      existing.passwordHash = passwordHash;
      existing.role = "admin";
      existing.department = "development";
      existing.isActive = true;
      if (existing.security) {
        existing.security.twoFactorEnabled = false;
      }
      await existing.save();
      console.log("Updated dev@webxode.com with requested credentials!");
    } else {
      await User.create({
        name: "Developer Lead",
        email: "dev@webxode.com",
        passwordHash,
        role: "admin",
        department: "development",
        isActive: true,
        security: { twoFactorEnabled: false },
      });
      console.log("Created user dev@webxode.com with requested credentials!");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("Error ensuring user:", err);
    process.exit(1);
  }
}

main();

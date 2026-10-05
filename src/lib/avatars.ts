// src/lib/avatars.ts

export interface AvatarConfig {
  imageUrl: string;
  bgClass: string;
  label: string;
}

export const LOCAL_AVATARS = [
  "/images/avatars/admin.png",
  "/images/avatars/sales.png",
  "/images/avatars/dev.png",
  "/images/avatars/presales.png",
  "/images/avatars/hr.png",
];

/**
 * Deterministically picks a local avatar index (0 to LOCAL_AVATARS.length - 1) based on a string seed.
 */
function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % LOCAL_AVATARS.length;
}

/**
 * Returns a local default avatar configuration based on user role, department, or seed name.
 * Uses PNG files from /public/images/avatars/.
 */
export function getDefaultAvatar(
  role?: string,
  department?: string,
  seed: string = "user",
): AvatarConfig {
  const userRole = role?.toLowerCase() || "user";
  const userDept = department?.toLowerCase() || "development";

  if (userRole === "admin") {
    return {
      imageUrl: "/images/avatars/admin.png",
      bgClass: "bg-indigo-950 ring-2 ring-indigo-500",
      label: "Manager / Admin",
    };
  }

  switch (userDept) {
    case "sales":
      return {
        imageUrl: "/images/avatars/sales.png",
        bgClass: "bg-emerald-950 ring-2 ring-emerald-500",
        label: "Sales Staff",
      };
    case "presales":
    case "product & presales":
      return {
        imageUrl: "/images/avatars/presales.png",
        bgClass: "bg-teal-950 ring-2 ring-teal-500",
        label: "Presales Team",
      };
    case "development":
    case "engineering":
      return {
        imageUrl: "/images/avatars/dev.png",
        bgClass: "bg-blue-950 ring-2 ring-blue-500",
        label: "Engineering Team",
      };
    case "hr":
      return {
        imageUrl: "/images/avatars/hr.png",
        bgClass: "bg-rose-950 ring-2 ring-rose-500",
        label: "Human Resources",
      };
    case "revenue":
    case "finance":
      return {
        imageUrl: "/images/avatars/sales.png",
        bgClass: "bg-amber-950 ring-2 ring-amber-500",
        label: "Finance & Revenue",
      };
    default: {
      const avatarIndex = hashSeed(seed || "user");
      return {
        imageUrl: LOCAL_AVATARS[avatarIndex] || "/images/avatars/dev.png",
        bgClass: "bg-purple-950 ring-2 ring-purple-500",
        label: "Team Member",
      };
    }
  }
}

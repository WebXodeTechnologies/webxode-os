// src/components/profile/types.ts

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  department: string;
  createdAt: string;
  bio: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

export interface TabCategory {
  group: string;
  items: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[];
}

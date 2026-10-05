// src/app/(marketing)/layout.tsx
import { MarketingThemeProvider } from "@/components/landing/theme-context";

export const metadata = {
  title: "Webxode OS — Enterprise Operating System for Modern Agencies",
  description:
    "All-in-one AI agency OS unifying sales pipelines, presales estimates, project management, workforce directory, and revenue intelligence.",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <MarketingThemeProvider>{children}</MarketingThemeProvider>;
}

import { Toaster } from "sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Webxode OS",
  description: "Secure authentication portal for Webxode Technologies internal workspace.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060913] font-sans text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#f8fafc",
            backdropFilter: "blur(12px)",
          },
        }}
      />
      {children}
    </div>
  );
}

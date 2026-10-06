import { Toaster } from "react-hot-toast";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Webxode OS",
  description: "Secure authentication portal for Webxode Technologies internal workspace.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060913] font-sans text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "#f8fafc",
            backdropFilter: "blur(12px)",
            borderRadius: "1rem",
            padding: "0.875rem 1.25rem",
            fontSize: "0.875rem",
            fontWeight: "600",
          },
          success: {
            iconTheme: {
              primary: "#818cf8",
              secondary: "#0f172a",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171",
              secondary: "#0f172a",
            },
          },
        }}
      />
      {children}
    </div>
  );
}

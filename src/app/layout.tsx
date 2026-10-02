import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://os.webxode.com"),
  title: {
    default: "Webxode OS — Internal CRM & Business Operations Platform",
    template: "%s | Webxode OS",
  },
  description:
    "Webxode OS is the centralized internal business operations platform for Webxode Technologies, managing sales pipelines, presales workflows, client onboarding, project delivery, workforce accountability, and financial visibility.",
  keywords: [
    "Internal CRM",
    "Business Operations Platform",
    "Sales Pipeline Management",
    "Project Delivery Software",
    "Enterprise Operating System",
    "Workforce Management",
    "Modular Monolith CRM",
    "Webxode Technologies",
  ],
  authors: [{ name: "Webxode Technologies", url: "https://webxode.com" }],
  creator: "Webxode Technologies",
  publisher: "Webxode Technologies",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://os.webxode.com",
    title: "Webxode OS — Internal CRM & Business Operations Platform",
    description:
      "Centralize your entire business lifecycle — from lead generation and presales to project execution and revenue tracking.",
    siteName: "Webxode OS",
    images: [
      {
        url: "/images/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Webxode OS Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webxode OS — Internal CRM",
    description: "The operating system for how Webxode Technologies conducts business operations.",
    images: ["/images/og-cover.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Webxode OS",
    operatingSystem: "All",
    applicationCategory: "BusinessApplication",
    description: "Internal Business Operations Platform and CRM for Webxode Technologies.",
    creator: {
      "@type": "Organization",
      name: "Webxode Technologies",
      url: "https://webxode.com",
    },
  };

  return (
    <html lang="en" className={`${jakarta.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

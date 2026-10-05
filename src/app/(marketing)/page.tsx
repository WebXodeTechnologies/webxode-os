// src/app/(marketing)/page.tsx
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { ModulesShowcase } from "@/components/landing/modules-showcase";
import { WhyWebxodeSection } from "@/components/landing/why-webxode-section";
import { ImpactSection } from "@/components/landing/impact-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ModulesShowcase />
        <WhyWebxodeSection />
        <ImpactSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

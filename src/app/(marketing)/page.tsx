import { Navbar } from "@/components/landing/navbar";

import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col text-slate-50 antialiased">
      <Navbar />
      <main className="flex-1"></main>
      <Footer />
    </div>
  );
}

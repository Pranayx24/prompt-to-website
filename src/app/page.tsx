import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DemoSection from "@/components/DemoSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <DemoSection />
    </main>
  );
}

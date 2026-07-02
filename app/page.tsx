import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Background from "@/components/Background";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050816] text-white overflow-hidden">
      <Background />
      <Navbar />
      <Hero />
    </main>
  );
}
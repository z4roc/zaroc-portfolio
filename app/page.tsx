import HeroSection from "@/components/Hero";
import { Nav } from "@/components/Nav";
import ProjectsSection from "@/components/Projects";
import TechnologiesSection from "@/components/Skills";

export default function Home() {
  return (
    <div className="bg-gradient-to-tr from-primary to-secondary">
      <Nav className="sticky top-0 z-50" />
      <main className="flex flex-col items-center justify-between">
        <HeroSection />
        <TechnologiesSection />
        <ProjectsSection />
      </main>
    </div>
  );
}

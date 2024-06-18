
import HeroSection from "@/components/home/HeroSection";
import CatalogSection from "@/components/home/CatalogSection";
import AboutSection from "@/components/home/AboutSection";
import Benefits from "@/components/home/Benefits";
import ClientSection from "@/components/home/ClientSection";
import Footer from "@/components/base/footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 md:gap-12">
      <HeroSection />
      <AboutSection />
      <CatalogSection />
      <Benefits />
      <ClientSection />
      <Footer />
    </div >
  );
}
import About from "@/components/sections/about";
import { DynamicCarousel } from "@/components/sections/dynamicCarousel";
import ClientBenefits from "@/components/sections/clientBenefits";
import PanelAccess from "@/components/sections/panelAccess";
import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/base/navbar";
import CatalogSection from "@/components/home/CatalogSection";
import AboutSection from "@/components/home/AboutSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <HeroSection />
      <AboutSection />
      <CatalogSection />
      {/* <div className="flex items-center justify-around p-4">
        <Image
          src={'/logo.png'}
          width={100}
          height={100}
          alt="Logomarca Shineray Prazeres"
          className="w-full max-w-[40vw]" />
        <Image
          src={'/logo_revisao.png'}
          width={100}
          height={80}
          alt="Logomarca Shineray Prazeres"
          className="w-full max-w-[20vw]" />
      </div>
      <About />
      <h1 className="flex justify-center uppercase p-2 text-shineray-color-dark font-bold">Catálogo</h1>
      <DynamicCarousel />
      <ClientBenefits />
      <PanelAccess /> */}
    </div >
  );
}


// INICIO FALANDO SOBRE EMPRESA - LOGO SHINERAY PRAZERES E REVISÃO - DROPDOWN NO TEXTO NO MOBILE
// DEPOIS UM CARROSEL COM 3 MOTOS E O 4 É LEVANDO PRA OUTRA PAGINA
// DEPOIS DO CARROSSEL UM TEXTO DE BENEFICIOS (GARANTIA TAL)
// ÁREA DO CLIENTE (Beneficios e Login)
// SIMULAR FINANCIAMENTO DENTRO DA PAGINA DA <MOTCICLETA></MOTCICLETA>
// Botao flutuante WhatsApp

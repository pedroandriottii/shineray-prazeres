import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/base/navbar";
import Banner from "@/components/base/banner";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Shineray Prazeres",
  description: "A melhor concessionária",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.className} font-light`}>
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
          <Banner />
        </div>
        <div className="pt-[calc(100px)]">
          {children}
        </div>
      </body>
    </html>
  );
}
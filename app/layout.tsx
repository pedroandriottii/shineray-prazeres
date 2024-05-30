import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/base/navbar";

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
      <body className={bebas.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

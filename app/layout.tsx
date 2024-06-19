import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/base/navbar";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { AuthProvider } from "@/context/AuthContext";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const Font = Montserrat({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Shineray Prazeres",
  description: "A melhor concessionária",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const phoneNumber = '5581999564461'
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`

  return (
    <html lang="en">
      <Analytics />
      <SpeedInsights />
      <AuthProvider>
        <body className={`${Font.className} font-light`}>
          <Navbar />
          {children}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg">
            <WhatsAppIcon fontSize="large" />
          </a>
        </body>
      </AuthProvider>

    </html>
  );
}

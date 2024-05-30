import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/base/navbar";
import Banner from "@/components/base/banner";
import Footer from "@/components/base/footer";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const bebas = Montserrat({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Shineray Prazeres",
  description: "A melhor concessionária",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const phoneNumber = '5581988145906'
  const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}`

  return (
    <html lang="en">
      <body className={`${bebas.className} font-light`}>
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
          <Banner />
        </div>
        <div className="pt-[7rem]">
          {children}
          {/* <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg">
            <WhatsAppIcon fontSize="large" />
          </a> */}
        </div>
        <Footer />
      </body>
    </html>
  );
}

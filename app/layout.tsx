import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/base/navbar";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { AuthProvider } from "@/context/AuthContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  const whatsappLink = `https://wa.me/5581999564461?text=Ol%C3%A1%2C%20vim%20do%20site%20do%20Shineray%20Prazeres%20e%20queria%20mais%20informa%C3%A7%C3%B5es`;

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon16.png" />
        <Script id="google-tag-manager-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MPWK35S');
          `}
        </Script>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16624479946" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-16624479946');
          `}
        </Script>
      </head>
      <Analytics />
      <SpeedInsights />
      <AuthProvider>
        <body className={`${Font.className} font-light`}>
          <Script id="google-tag-manager-body" strategy="afterInteractive">
            {`
              <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MPWK35S"
              height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
            `}
          </Script>
          <Navbar />
          {children}
          <a id="whatsapp-button" href={whatsappLink} target="_blank" rel="noopener noreferrer" className="fixed bottom-4 right-4 z-50 flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg">
            <WhatsAppIcon fontSize="large" />
          </a>
        </body>
      </AuthProvider>
    </html>
  );
}

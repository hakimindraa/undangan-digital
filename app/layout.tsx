import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Ike & Rendy",
  description: "Undangan Pernikahan Digital Ike & Rendy. Sabtu, 24 Oktober 2026",
  openGraph: {
    title: "Undangan Pernikahan Ike & Rendy",
    description: "Kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami pada Sabtu, 24 Oktober 2026.",
    siteName: "Undangan Pernikahan Ike & Rendy",
    images: [
      {
        url: "/foto-cover.jpg",
        width: 800,
        height: 800,
        alt: "Ike & Rendy",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${cormorantGaramond.variable} ${jost.variable} h-full scroll-smooth overflow-x-hidden`}>
      <body className="min-h-full flex flex-col font-sans bg-gading text-primary antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

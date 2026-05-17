import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dashboard Analisis Statistik Hadis Populer di Indonesia",
  description: "Visualisasi hasil survei penelitian Hadis-Hadis Populer di Masyarakat Indonesia. Menyajikan persebaran demografis responden dan tingkat popularitas hadis secara interaktif.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-charcoal-dark antialiased">
        {children}
      </body>
    </html>
  );
}


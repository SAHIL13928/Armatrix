import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Background from "@/components/BackgroundAnimation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Armatrix — Team",
  description: "Meet the team behind Armatrix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
  className={`${inter.variable} ${geistMono.variable} min-h-screen bg-bg font-sans text-text antialiased flex flex-col`}
>
  <Background /> 

  <Navbar />
  <main className="flex-1">{children}</main>
  <Footer />
</body>
    </html>
  );
}

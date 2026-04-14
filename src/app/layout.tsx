import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emergent AI | The Future of Website Generation",
  description: "Generate production-ready web applications with natural language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geist.variable} font-sans bg-black text-white min-h-screen flex flex-col selection:bg-gold/30 selection:text-gold-light`}>
        {children}
      </body>
    </html>
  );
}

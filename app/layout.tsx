// D:\zentra\app\layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer/Footer";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zentra",
  description: "Welcome to ThreemuskIteers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth w-full max-w-full overflow-x-hidden"
    >
      <body
        className={`${inter.className} w-full max-w-full overflow-x-hidden`}
      >
        <LanguageProvider>
          <div className="flex min-h-screen w-full max-w-full flex-col bg-black overflow-x-hidden">
            <Header />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">
              {children}
            </main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}

// D:\zentra\app\layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import GlobalJsonLd from "@/components/seo/GlobalJsonLd";
import { metadataBaseUrl, siteConfig } from "@/lib/seo/siteMetadata";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ✅ gunakan domain kanonik tanpa www
const siteUrl = metadataBaseUrl;
const siteName = siteConfig.siteName;

// ✅ default title jelas + geo
const defaultTitle = `${siteName} – ${siteConfig.tagline}`;

// ✅ sebut kedua nama: Zentratech & Zentra (supaya kedua keyword kebaca)
const description = siteConfig.description;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#000000",
  colorScheme: "dark light",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: defaultTitle,
    template: `%s | ${siteName} Digital Studio`,
  },
  description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  alternates: {
    canonical: "/", // ✅ akan di-resolve jadi https://zentratech.id/
    languages: {
      "en-US": "/",
      "id-ID": "/id",
    },
  },

  // favicon / logo
  icons: siteConfig.logoPath,

  openGraph: {
    type: "website",
    locale: siteConfig.defaultLocale === "id-ID" ? "id_ID" : "en_US", // update saat konten full Indonesia
    url: siteUrl.href,
    title: defaultTitle,
    description,
    siteName,
    images: [
      {
        url: siteConfig.logoPath,
        width: 1200,
        height: 630,
        alt: "Zentratech digital product and AI studio logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description,
    creator: "@zentratech", // pastikan handle ini ada
    images: [siteConfig.logoPath],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  // (opsional) nanti diisi setelah kamu verifikasi GSC
  // verification: {
  //   google: "KODE_VERIFIKASI_DARI_SEARCH_CONSOLE",
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="scroll-smooth w-full max-w-full overflow-x-hidden"
    >
      <body
        className={`${inter.variable} font-sans w-full max-w-full overflow-x-hidden bg-black text-white`}
      >
        <LanguageProvider>
          <GlobalJsonLd />
          <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden">
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

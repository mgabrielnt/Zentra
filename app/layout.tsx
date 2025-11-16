// D:\zentra\app\layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import GlobalJsonLd from "@/components/seo/GlobalJsonLd";
import {
  BRAND_NAME,
  DEFAULT_LOCALE,
  DEFAULT_OG_IMAGE,
  SITE_URL,
} from "@/lib/seo/config";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// ✅ gunakan domain kanonik tanpa www
const siteUrl = new URL(SITE_URL);
const siteName = BRAND_NAME;

// ✅ default title jelas + geo
const defaultTitle = `${siteName} – Konsultan IT & AI Semarang`;

// ✅ sebut kedua nama + lokasi untuk sinyal brand + lokal
const description =
  "Zentratech (Zentra) adalah konsultan IT dan studio AI dari Semarang, Indonesia yang merancang website, aplikasi, headless commerce, dan solusi machine learning dengan fokus pada performa dan hasil bisnis.";

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
  keywords: [
    "Zentratech",
    "Zentra",
    "konsultan IT Semarang",
    "konsultan AI Semarang",
    "software house Semarang",
    "jasa pengembangan aplikasi",
    "digital product studio Indonesia",
    "AI development Indonesia",
    "web development agency",
    "mobile app development",
    "UI UX design",
    "headless commerce",
    "machine learning consulting",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  alternates: {
    canonical: "/", // ✅ akan di-resolve jadi https://zentratech.id/
  },

  // favicon / logo
  icons: "/logoZentraFix.png",

  openGraph: {
    type: "website",
    locale: DEFAULT_LOCALE,
    url: siteUrl.href,
    title: defaultTitle,
    description,
    siteName,
    images: [
      {
        url: new URL(DEFAULT_OG_IMAGE, siteUrl).href,
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
    images: [new URL(DEFAULT_OG_IMAGE, siteUrl).href],
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

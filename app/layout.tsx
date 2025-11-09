// D:\zentra\app\layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer/Footer";
import { LanguageProvider } from "@/components/LanguageContext";
import GlobalJsonLd from "@/components/seo/GlobalJsonLd";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const siteUrl = new URL("https://www.zentratech.id");
const defaultTitle = "Zentra ";
const description =
  "Zentra is a digital product and AI studio from Indonesia that designs high-performance web and mobile experiences, headless commerce platforms, and pragmatic machine learning solutions.";

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
    template: "%s | Zentra Digital Studio",
  },
  description,
  keywords: [
    "Zentra",
    "digital product studio",
    "AI development Indonesia",
    "web development agency",
    "mobile app development",
    "UI UX design",
    "headless commerce",
    "machine learning consulting",
  ],
  authors: [{ name: "Zentra", url: siteUrl }],
  creator: "Zentra",
  publisher: "Zentra",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "id-ID": "/id",
    },
  },

  // ⬇️ sesuai permintaan: icons sebagai string langsung
  icons: "/logoZentraFix.png",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl.href,
    title: defaultTitle,
    description,
    siteName: "Zentra",
    images: [
      {
        url: "/logoZentraFix.png",
        width: 1200,
        height: 630,
        alt: "Zentra digital product and AI studio logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description,
    creator: "@zentratech",
    images: ["/logoZentraFix.png"],
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth w-full max-w-full overflow-x-hidden">
      <body className={`${inter.variable} font-sans w-full max-w-full overflow-x-hidden bg-black text-white`}>
        <LanguageProvider>
          <GlobalJsonLd />
          <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden">
            <Header />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}

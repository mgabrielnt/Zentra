import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { HeroSection } from "@/components/service/HeroSection";
import ServicesSection from "@/components/service/ServicesSection";
import { WhySection } from "@/components/service/WhySection";
import { ProcessSection } from "@/components/service/ProcessSection";
import JsonLd from "@/components/service/JsonLd";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const BASE = SITE_URL;
const ogImage = `${SITE_URL}${DEFAULT_OG_IMAGE}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Layanan ${BRAND_NAME} – Konsultan IT & AI Semarang`,
    description:
      "Zentratech membangun website, aplikasi, headless commerce, dan solusi AI pragmatis dengan fokus bisnis untuk perusahaan Indonesia.",
    keywords: [
      "konsultan IT Semarang",
      "konsultan AI Indonesia",
      "jasa pengembangan aplikasi",
    ],
    alternates: {
      canonical: `${BASE}/id/service`,
      languages: {
        en: `${BASE}/service`,
        id: `${BASE}/id/service`,
        "x-default": `${BASE}/service`,
      },
    },
    openGraph: {
      url: `${BASE}/id/service`,
      type: "website",
      title: `Layanan ${BRAND_NAME} – Konsultan IT & AI Semarang`,
      description:
        "Dari ide ke dampak — kami siap membantu discovery, delivery, dan optimalisasi produk digital Anda.",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `Layanan ${BRAND_NAME} – Konsultan IT & AI Semarang`,
      description:
        "Dari ide ke dampak — cepat, aman, dan terukur untuk tim bisnis Anda.",
      images: [ogImage],
    },
  };
}

export default function ServicePageID() {
  return (
    <>
      <JsonLd />
      <main className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen bg-black text-white`}>
        <HeroSection />
        <ServicesSection />
        <WhySection />
        <ProcessSection />
      </main>
    </>
  );
}

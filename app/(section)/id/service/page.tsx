import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { HeroSection } from "@/components/service/HeroSection";
import ServicesSection from "@/components/service/ServicesSection";
import { WhySection } from "@/components/service/WhySection";
import { ProcessSection } from "@/components/service/ProcessSection";
import JsonLd from "@/components/service/JsonLd";

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

const BASE = "https://www.zentratech.id";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title:
      "Layanan Zentra  Pengembangan Web & Mobile, UI/UX, Headless Commerce, ML & AI",
    description:
      "Zentra membangun produk digital modernwebsite cepat, aplikasi mobile, headless commerce, serta ML/AI yang pragmatis dengan SEO & Core Web Vitals yang kuat.",
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
      title:
        "Layanan Zentra  Pengembangan Web & Mobile, UI/UX, Headless Commerce, ML & AI",
      description: "Dari ide ke dampak  cepat, aman, dan terukur.",
      images: [`${BASE}/og/services-og.png`],
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Layanan Zentra  Pengembangan Web & Mobile, UI/UX, Headless Commerce, ML & AI",
      description: "Dari ide ke dampak  cepat, aman, dan terukur.",
      images: [`${BASE}/og/services-og.png`],
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

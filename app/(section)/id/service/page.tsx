import type { Metadata } from "next";
import { HeroSection } from "@/components/service/HeroSection";
import ServicesSection from "@/components/service/ServicesSection";
import { WhySection } from "@/components/service/WhySection";
import { ProcessSection } from "@/components/service/ProcessSection";
import JsonLd from "@/components/service/JsonLd";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/config";

const BASE = SITE_URL;
const ogImage = `${SITE_URL}${DEFAULT_OG_IMAGE}`;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${BRAND_NAME} Services (Bahasa Version)`,
    description:
      "A placeholder for the Bahasa-language service overview. Please refer to the English services page while localisation is prepared.",
    keywords: [
      "Zentratech services",
      "IT consulting overview",
      "AI consulting studio",
    ],
    alternates: {
      canonical: `${BASE}/id/service`,
      languages: {
        en: `${BASE}/service`,
        id: `${BASE}/id/service`,
        "x-default": `${BASE}/service`,
      },
    },
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      url: `${BASE}/id/service`,
      type: "website",
      title: `${BRAND_NAME} Services (Bahasa Version)`,
      description:
        "Bahasa-language service overview will be published soon. Explore the English version for full details.",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${BRAND_NAME} Services (Bahasa Version)`,
      description:
        "Bahasa-language service overview will be published soon. Explore the English version for full details.",
      images: [ogImage],
    },
  };
}

export default function ServicePageID() {
  return (
    <>
      <JsonLd />
      <main className="min-h-screen bg-black text-white">
        <HeroSection />
        <ServicesSection />
        <WhySection />
        <ProcessSection />
      </main>
    </>
  );
}

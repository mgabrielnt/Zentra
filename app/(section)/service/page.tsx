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
    title: `${BRAND_NAME} IT Consulting & AI Services for Digital Platforms`,
    description:
      "Zentratech helps product teams plan, design, and ship performant web apps, headless commerce builds, and pragmatic AI programs.",
    keywords: [
      "IT consulting services",
      "AI consulting",
      "web application development",
    ],
    alternates: {
      canonical: `${BASE}/service`,
      languages: {
        en: `${BASE}/service`,
        id: `${BASE}/id/service`,
        "x-default": `${BASE}/service`,
      },
    },
    openGraph: {
      url: `${BASE}/service`,
      type: "website",
      title: `${BRAND_NAME} IT Consulting & AI Services for Digital Platforms`,
      description: "From discovery to delivery—secure, measurable, and embedded with your team.",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${BRAND_NAME} IT Consulting & AI Services for Digital Platforms`,
      description: "From idea to impact—fast, secure, and measurable.",
      images: [ogImage],
    },
  };
}

export default function ServicePage() {
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

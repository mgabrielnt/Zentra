import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { HeroSection } from "@/components/service/HeroSection";
import ServicesSection from "@/components/service/ServicesSection";
import { WhySection } from "@/components/service/WhySection";
import { ProcessSection } from "@/components/service/ProcessSection";
import JsonLd from "@/components/service/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/seo/siteMetadata";

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

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "Layanan Zentra – Pengembangan Web & Mobile, UI/UX, Headless Commerce, ML & AI";
  const description =
    "Zentra membangun produk digital modern: website cepat, aplikasi mobile, headless commerce, serta ML/AI pragmatis dengan SEO dan Core Web Vitals yang kuat.";

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl("/id/service"),
      languages: {
        en: absoluteUrl("/service"),
        id: absoluteUrl("/id/service"),
        "x-default": absoluteUrl("/service"),
      },
    },
    openGraph: {
      url: absoluteUrl("/id/service"),
      type: "website",
      title,
      description: "Dari ide ke dampak — cepat, aman, dan terukur.",
      images: [absoluteUrl(siteConfig.logoPath)],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "Dari ide ke dampak — cepat, aman, dan terukur.",
      images: [absoluteUrl(siteConfig.logoPath)],
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

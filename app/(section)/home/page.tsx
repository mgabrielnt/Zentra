"use client";

import { useEffect, useState } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import LiquidEther from "@/components/LiquidEther";
import TextType from "@/components/TextType";
import { ServiceStrip } from "@/components/home/ServiceStrip";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import AboutCTASection from "@/components/home/AboutCTASection";

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

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Profil kualitas LiquidEther: mobile vs desktop
  const liquidProps = isMobile
    ? {
        // 🔻 MOBILE: super ringan
        resolution: 0.2,
        isViscous: false,
        iterationsViscous: 0,
        iterationsPoisson: 10,
        dt: 0.02,
        mouseForce: 40,
        cursorSize: 80,
        autoSpeed: 0.25,
      }
    : {
        // 💻 DESKTOP: tetap bagus tapi nggak overkill
        resolution: 0.4,
        isViscous: true,
        iterationsViscous: 18,
        iterationsPoisson: 24,
        dt: 0.014,
        mouseForce: 100,
        cursorSize: 100,
        autoSpeed: 0.5,
      };

  return (
    <main
      className={`min-h-screen bg-black ${inter.variable} ${spaceGrotesk.variable}`}
    >
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Radial gradient background (non-interaktif) */}
        <div className="pointer-events-none absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/50 via-black to-black" />
        </div>

        {/* Background animation (non-interaktif, biar scroll nggak ke-attach ke sini) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            autoDemo={true}
            mouseForce={liquidProps.mouseForce}
            cursorSize={liquidProps.cursorSize}
            resolution={liquidProps.resolution}
            isViscous={liquidProps.isViscous}
            iterationsViscous={liquidProps.iterationsViscous}
            iterationsPoisson={liquidProps.iterationsPoisson}
            dt={liquidProps.dt}
            autoSpeed={liquidProps.autoSpeed}
          />
        </div>

        {/* Center content */}
        <div className="relative z-10 px-4 text-center">
          <div className="mb-6">
            <TextType
              as="h1"
              className="inline-block font-inter text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
              text="You imagine. We build."
              typingSpeed={80}
              deletingSpeed={50}
              pauseDuration={2000}
              loop={true}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-purple-400"
            />
          </div>

          <p className="mb-8 font-space-grotesk text-base font-light uppercase tracking-wider text-white/80 md:text-lg lg:text-xl">
            WEB DEVELOPMENT / UI/UX DESIGN / AI ENGINEER
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="shadow-lg hover:shadow-xl px-6 py-3 text-sm font-semibold text-purple-600 transition-all hover:scale-105 hover:bg-white/90 md:px-8 md:py-4 md:text-base rounded-xl bg-white font-inter">
              Explore Now
            </button>
            <button className="px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 md:px-8 md:py-4 md:text-base rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 font-inter">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Strip layanan */}
      <ServiceStrip />

      <FeaturedArticles />
      <AboutCTASection />
    </main>
  );
}

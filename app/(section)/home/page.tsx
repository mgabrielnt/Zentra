"use client";

import { Space_Grotesk, Inter } from "next/font/google";
import LiquidEther from "@/components/LiquidEther";
import TextType from "@/components/TextType";
import { ServiceStrip } from "@/components/home/ServiceStrip";

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
  return (
    <main
      className={`min-h-screen bg-black ${inter.variable} ${spaceGrotesk.variable}`}
    >
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/50 via-black to-black" />
        </div>

        {/* Background animation */}
        <div className="absolute inset-0 z-0">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={100}
            cursorSize={100}
            autoDemo={true}
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

      {/* Strip layanan dengan card mengikuti scroll */}
      <ServiceStrip />
    </main>
  );
}

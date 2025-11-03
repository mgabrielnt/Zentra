'use client';

import { Space_Grotesk, Inter } from 'next/font/google';
import LiquidEther from '@/components/LiquidEther';
import TextType from '@/components/TextType';
import Image from 'next/image';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export default function Home() {
  return (
    <main className={`bg-black ${inter.variable} ${spaceGrotesk.variable}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/50 via-black to-black"></div>
        </div>

        {/* Background animation */}
        <div className="absolute inset-0 z-0">
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={100}
            cursorSize={100}
            autoDemo={true}
          />
        </div>

        {/* Center content */}
        <div className="relative z-10 text-center px-4">
          <div className="mb-6">
            <TextType
              as="h1"
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-inter tracking-tight text-white inline-block"
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
          
          <p className="text-base md:text-lg lg:text-xl text-white/80 mb-8 font-space-grotesk tracking-wider font-light uppercase">
            WEB DEVELOPMENT / UI/UX DESIGN / AI ENGINEER
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-6 py-3 md:px-8 md:py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 transition-all hover:scale-105 font-inter text-sm md:text-base shadow-lg hover:shadow-xl">
              Explore Now
            </button>
            <button className="px-6 py-3 md:px-8 md:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all hover:scale-105 font-inter text-sm md:text-base">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

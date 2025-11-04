// D:\zentra\components\service\HeroSection.tsx
"use client";

import LiquidEther from "@/components/LiquidEther";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import Reveal from "./Reveal";
import { services } from "./data";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden [--seam:#0B0B0B]">
      {/* LiquidEther + fade bottom */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_76%,transparent_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={100}
            cursorSize={100}
            autoDemo
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(124,58,237,0.35)_0%,rgba(0,0,0,0)_60%)]" />
      </div>

      {/* Seam ke section berikutnya */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[color:var(--seam)]"
      />

      {/* Headline */}
      <div
        className="relative z-10 mx-auto max-w-5xl px-6 
             pb-24 sm:pb-32 md:pb-40 lg:pb-56
             pt-24 md:pt-32
             mt-6 md:mt-10 
             text-center"
      >
        <Reveal>
          <h1 className="sr-only">
            Zentra Services: Web & Mobile Development, UI/UX Design, Headless
            Commerce, Machine Learning & AI
          </h1>
          <div aria-hidden="true" className="flex flex-col items-center gap-3">
            <LayoutTextFlip
              text="We build"
              words={[
                "Web & Mobile Apps",
                "UI/UX Systems",
                "Headless Commerce",
                "AI Solutions",
              ]}
              duration={2600}
            />
            <p className="font-inter text-base text-white/80 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
              From idea to impact — fast, secure, and measurable.
            </p>
          </div>
        </Reveal>

     
      </div>
    </section>
  );
}

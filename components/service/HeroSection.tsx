// D:\zentra\components\service\HeroSection.tsx
"use client";

import { useEffect, useState } from "react";
import LiquidEther from "@/components/LiquidEther";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import Reveal from "./Reveal";
import { services } from "./data";
import Link from "next/link";

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener?.("change", set);
    return () => mq.removeEventListener?.("change", set);
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden [--seam:#0B0B0B]"
      aria-labelledby="services-heading"
    >
      {/* ===== Background with SAFE mask (white -> transparent) ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Mask wrapper with vendor-prefixed styles for broad compatibility */}
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 76%, rgba(255,255,255,0) 100%)",
            maskImage:
              "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 76%, rgba(255,255,255,0) 100%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
            maskSize: "100% 100%",
          }}
        >
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={isMobile ? 60 : 100}
            cursorSize={isMobile ? 60 : 100}
            autoDemo
          />
        </div>

        {/* Radial overlay for text contrast (aman, tidak menutup konten) */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(124,58,237,0.35)_0%,rgba(0,0,0,0)_60%)]" />
      </div>

      {/* Seam ke section berikutnya */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[color:var(--seam)]"
      />

      {/* ===== Headline ===== */}
      <div
        className="relative z-10 mx-auto max-w-5xl px-6 
             pb-24 sm:pb-32 md:pb-40 lg:pb-56
             pt-24 md:pt-32
             mt-6 md:mt-10 
             text-center"
      >
        <Reveal mode="mount">
          <h1 id="services-heading" className="sr-only">
            Zentra Services: Web & Mobile Development, UI/UX Design, Headless
            Commerce, Machine Learning & AI
          </h1>

          <div aria-hidden="true" className="flex flex-col items-center gap-3">
            {/* Fallback kalau LayoutTextFlip bermasalah */}
            {LayoutTextFlip ? (
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
            ) : (
              <p className="text-2xl font-semibold text-white">We build</p>
            )}

            <p className="font-inter text-base text-white/80 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
              From idea to impact — fast, secure, and measurable.
            </p>

          

            {/* CTA (opsional) */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/collaboration"
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Start a project
              </Link>
              <a
                href="#services"
                className="inline-flex items-center rounded-xl border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Explore services
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

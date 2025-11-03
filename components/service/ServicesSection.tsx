"use client";

import { useEffect, useState } from "react";
import ScrollStack from "@/components/ScrollStack";
import { services } from "./data";
import { ServiceCard } from "./ServiceCard";
import Reveal from "./Reveal";

/* Hook sederhana: true kalau >= 768px (md) */
function useIsDesktop(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const update = () => setIsDesktop(mq.matches);

    update(); // set awal
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isDesktop;
}

export function ServicesSection() {
  const isDesktop = useIsDesktop(); // >= md?

  return (
    <section className="relative bg-[#0B0B0B] px-0 pb-24 md:pb-28 pt-12 md:pt-16">
      {/* seam from hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <p className="font-inter text-xs sm:text-sm uppercase tracking-[0.2em] text-white/50">
            What We Do
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-2 bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-2xl sm:text-3xl md:text-5xl font-semibold text-transparent">
            End-to-end services for modern teams
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-3 md:mt-4 max-w-3xl font-space-grotesk text-white/75 text-sm sm:text-base">
            From discovery to delivery and scale-up we unify strategy, design, and engineering for measurable outcomes.
          </p>
        </Reveal>
      </div>

      {/* Satu ScrollStack saja, param di-switch berdasarkan isDesktop */}
      <div className="mx-auto mt-6 max-w-6xl">
        {isDesktop ? (
          <ScrollStack
            useWindowScroll
            className="!overflow-visible !h-auto"
            itemDistance={100}
            itemScale={0.01}
            itemStackDistance={10}
            baseScale={0.9}
            rotationAmount={0}
            blurAmount={0}
          >
            {services.map((s) => (
              <ServiceCard key={s.k} s={s} />
            ))}
          </ScrollStack>
        ) : (
          <ScrollStack
            useWindowScroll
            className="!overflow-visible !h-auto"
            itemDistance={16}
            itemScale={0.005}
            itemStackDistance={8}
            baseScale={0.95}
            rotationAmount={0}
            blurAmount={0}
          >
            {services.map((s) => (
              <ServiceCard key={s.k} s={s} />
            ))}
          </ScrollStack>
        )}
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}

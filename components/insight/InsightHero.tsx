"use client";

import { motion } from "motion/react";
import LiquidEther from "@/components/LiquidEther";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export default function InsightHero() {
  return (
    <section className="relative isolate overflow-hidden [--seam:#0B0B0B]">
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[color:var(--seam)]"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-24 sm:pb-32 md:pb-40 lg:pb-56 pt-24 md:pt-32 mt-6 md:mt-10 text-center">
        <Reveal>
          <h1 className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-3xl font-semibold text-transparent md:text-4xl lg:text-5xl">
            Digital transformation & AI insights from Zentratech
          </h1>
          <div className="mt-4 flex flex-col items-center gap-3">
            <LayoutTextFlip
              text="Insights on"
              words={[
                "AI & Automation",
                "Web Development",
                "Cloud & Edge",
                "Sustainability",
                "Blockchain",
                "Quantum Computing"
              ]}
              duration={2600}
            />
            <p className="text-base text-white/80 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
              Practical takes on AI, data, cloud, and engineering practices that
              help leaders ship better digital products.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
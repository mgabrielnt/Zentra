"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

type StickyContentItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
  accent?: string;
};

export function StickyScroll({
  content,
  contentClassName,
}: {
  content: StickyContentItem[];
  contentClassName?: string;
}) {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,                 // track seluruh section StickyScroll
    offset: ["start start", "end start"],
  });

  const cardCount = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!cardCount) return;

    // Sama seperti versi resmi: bikin breakpoint rata
    const breakpoints = content.map((_, i) => i / cardCount);

    let closestIndex = 0;
    breakpoints.forEach((bp, i) => {
      if (
        Math.abs(latest - bp) <
        Math.abs(latest - breakpoints[closestIndex])
      ) {
        closestIndex = i;
      }
    });

    setActiveCard(closestIndex);
  });

  const activeAccent = content[activeCard]?.accent ?? "#5227FF";

  return (
    <motion.div
      ref={ref}
      style={{
        backgroundImage: `radial-gradient(circle at 0% 0%, ${activeAccent}33, transparent 60%)`,
      }}
      className="relative mx-auto flex w-full max-w-6xl flex-col lg:flex-row justify-center gap-10 rounded-3xl bg-[#020617] px-4 py-8 md:px-8 md:py-12"
    >
      {/* Kiri: teks scrollable */}
      <div className="relative flex-1">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-12 md:my-16">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                className="text-lg font-bold text-slate-50 md:text-3xl"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                className="mt-3 max-w-sm text-sm text-slate-300 md:mt-5 md:text-lg"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-16" />
        </div>
      </div>

      {/* Kanan: card sticky */}
      <div
        style={{
          backgroundImage: `linear-gradient(135deg, ${activeAccent}, #0b0b0b)`,
        }}
        className={cn(
          "mt-6 h-64 w-full overflow-hidden rounded-3xl border border-white/15 shadow-[0_0_40px_rgba(0,0,0,0.65)]",
          "lg:mt-0 lg:h-72 lg:w-[22rem] lg:sticky lg:top-28",
          contentClassName,
        )}
        aria-hidden
      >
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
}

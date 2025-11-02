"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  // ➜ PAGE SCROLL (tidak ada nested scroll)
  const { scrollYProgress } = useScroll({
    target: ref,                             // gunakan target element
    // container: ref,                       // JANGAN pakai container (ini bikin nested scroll)
    offset: ["start center", "end center"],  // progress 0..1 saat section masuk/keluar viewport
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map progress ke index konten terdekat
    const breakpoints = content.map((_, i) => i / Math.max(cardLength - 1, 1));
    const closest = breakpoints.reduce((acc, bp, i) => {
      const d = Math.abs(latest - bp);
      return d < Math.abs(latest - breakpoints[acc]) ? i : acc;
    }, 0);
    setActiveCard(closest);
  });

  const backgroundColors = ["#0f172a", "#000000", "#171717"];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)",
    "linear-gradient(to bottom right, #ec4899, #6366f1)",
    "linear-gradient(to bottom right, #f97316, #eab308)",
  ];
  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      ref={ref}
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      // ❌ TIDAK ADA overflow-y-auto, ❌ TIDAK ADA h-[30rem]
      className="relative mx-auto flex w-full max-w-6xl justify-center gap-10 rounded-md p-6 md:p-10"
    >
      {/* Left: text list (panjang → bikin page height) */}
      <div className="relative flex-1">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                className="text-2xl font-bold text-slate-100 md:text-3xl"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                animate={{ opacity: activeCard === index ? 1 : 0.35 }}
                className="mt-6 max-w-sm text-base text-slate-300 md:text-lg"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-24" />
        </div>
      </div>

      {/* Right: sticky preview (tidak bikin scroll baru) */}
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-64 w-80 overflow-hidden rounded-xl bg-white/5 shadow-sm ring-1 ring-white/10 lg:block",
          contentClassName,
        )}
        aria-hidden
      >
        {content[activeCard]?.content ?? null}
      </div>
    </motion.div>
  );
};

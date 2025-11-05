"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type StickyContentItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
  accent?: string; // warna per card (opsional)
};

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: StickyContentItem[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  if (!content || content.length === 0) return null;

  // Tentukan card aktif dari teks yang SUDAH melewati garis trigger (40% viewport)
  useEffect(() => {
    if (typeof window === "undefined") return;

    let rafId: number | null = null;

    const handleScroll = () => {
      // throttle dengan requestAnimationFrame biar nggak terlalu sering setState
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;

        const triggerY = window.innerHeight * 0.4; // garis acuan 40% dari atas
        let currentIndex = 0;

        itemRefs.current.forEach((el, i) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();

          // Kalau top elemen sudah lewat garis trigger, maka kandidat aktif
          if (rect.top <= triggerY) {
            currentIndex = i;
          }
        });

        setActiveCard((prev) => (prev === currentIndex ? prev : currentIndex));
      });
    };

    // set posisi awal (pas page baru dibuka / di-refresh)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [content.length]);

  const activeAccent = content[activeCard]?.accent ?? "#5227FF";

  return (
    <motion.div
      style={{
        backgroundImage: `radial-gradient(circle at 0% 0%, ${activeAccent}33, transparent 60%)`,
      }}
      className="relative mx-auto flex w-full max-w-6xl flex-col lg:flex-row justify-center gap-10 rounded-3xl bg-[#020617] px-4 py-8 md:px-8 md:py-12"
    >
      {/* Kiri: teks */}
      <div className="relative flex-1">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div
              key={item.title + index}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="my-12 md:my-16"
            >
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

      {/* Kanan: card preview */}
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
};

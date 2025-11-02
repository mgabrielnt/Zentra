// D:\zentra\components\ui\layout-text-flip.tsx
"use client";
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type LayoutTextFlipProps = {
  text?: string;
  words?: string[];
  duration?: number;
  gradientClass?: string; // e.g. "from-[#B19EEF] via-[#FF9FFC] to-[#5227FF]"
  blend?: boolean;
  glass?: boolean;
};

export const LayoutTextFlip = ({
  text = "We build",
  words = ["Web & Mobile Apps", "UI/UX Systems", "Headless Commerce", "AI Solutions"],
  duration = 3000,
  gradientClass = "from-[#B19EEF] via-[#FF9FFC] to-[#5227FF]",
  blend = true,
  glass = true,
}: LayoutTextFlipProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Stabilize inputs
  const safeWords = useMemo(
    () => (Array.isArray(words) && words.length > 0 ? words : ["Amazing Products"]),
    [words]
  );
  const wordCount = safeWords.length;
  const durationMs = Math.max(600, duration ?? 3000); // guard biar ga terlalu cepat

  // Interval handler (browser-friendly typing)
  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % wordCount);
    }, durationMs);
  }, [wordCount, durationMs]);

  // Satu effect saja dengan dependency size konstan (1 elemen)
  useEffect(() => {
    start();
    return () => {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [start]);

  return (
    <>
      {/* Teks kiri: gradient + blend supaya menyatu di LiquidEther */}
      <motion.span
        layoutId="subtext"
        className={cn(
          "text-2xl md:text-4xl font-bold tracking-tight",
          "bg-clip-text text-transparent bg-gradient-to-b",
          gradientClass,
          blend && "mix-blend-screen",
          "drop-shadow-[0_0_24px_rgba(82,39,255,0.25)]"
        )}
      >
        {text}
      </motion.span>

      {/* Chip kata flip: glass/frosted */}
      <motion.span
        layout
        className={cn(
          "relative w-fit overflow-hidden rounded-md px-4 py-2 font-sans text-2xl md:text-4xl font-bold tracking-tight",
          glass
            ? "border border-white/20 bg-white/10 text-white backdrop-blur-md ring-1 ring-white/10 shadow-[0_8px_30px_rgba(82,39,255,0.25)]"
            : "border border-transparent bg-white text-black shadow-sm ring shadow-black/10"
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={currentIndex}
            initial={{ y: -40, filter: "blur(10px)" }}
            animate={{ y: 0, filter: "blur(0px)" }}
            exit={{ y: 50, filter: "blur(10px)", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block whitespace-nowrap"
          >
            {safeWords[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
};

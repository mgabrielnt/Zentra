// D:\zentra\components\ui\layout-text-flip.tsx
"use client";
import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

type LayoutTextFlipProps = {
  text: string;
  words: string[];
  duration?: number;
  gradientClass?: string;
  blend?: boolean;
  glass?: boolean;
};

export const LayoutTextFlip = ({
  text,
  words,
  duration = 2600,
  gradientClass = "from-white via-white to-white",
  blend = true,
  glass = true,
}: LayoutTextFlipProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const safeWords = useMemo(
    () => (Array.isArray(words) && words.length > 0 ? words : ["Amazing Products"]),
    [words]
  );
  const wordCount = safeWords.length;
  const durationMs = Math.max(600, duration ?? 2600);

  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((i) => (i + 1) % wordCount);
    }, durationMs);
  }, [wordCount, durationMs]);

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
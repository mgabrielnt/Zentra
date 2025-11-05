"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

type InfiniteMovingCardsProps = {
  items: {
    quote: string;
    name: string;
    title: string;
    image?: string;
    accent?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
};

export const InfiniteMovingCards = ({
  items,
  className,
}: InfiniteMovingCardsProps) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  // parallax horizontal pelan
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);

  if (!items || items.length === 0) return null;

  // duplikasi supaya selalu nyambung
  const loopItems = [...items, ...items];

  return (
    <div className="relative mx-auto max-w-7xl">
      <div
        ref={containerRef}
        className={cn(
          "relative w-full overflow-hidden bg-white",
          "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
          className
        )}
      >
        <motion.ul
          style={{ x }}
          className="flex w-max min-w-full shrink-0 flex-nowrap gap-6 px-6 py-12 sm:gap-8 sm:px-8 sm:py-16"
        >
          {loopItems.map((item, idx) => {
            const accent = item.accent || "#6366f1";
            return (
              <li
                key={`${item.name}-${idx}`}
                className="relative w-[280px] sm:w-[320px] md:w-[360px] shrink-0"
              >
                <div
                  className="group relative h-44 sm:h-52 md:h-60 w-full overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.05), 0 10px 40px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Subtle gradient overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${accent}15, transparent 60%)`,
                    }}
                  />

                  {/* Top accent line */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                    style={{
                      background: `linear-gradient(to right, transparent, ${accent}, transparent)`,
                      opacity: 0.6,
                    }}
                  />

                  {/* CARD = GAMBAR */}
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width:768px) 280px, 360px"
                      className="relative z-0 object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}

                  {/* Text overlay dengan gradient yang lebih subtle */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                    <div className="px-4 pb-4 pt-8 sm:px-5 sm:pb-5">
                      <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight drop-shadow-lg">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Subtle border */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
                </div>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
};
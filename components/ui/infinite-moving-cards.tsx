"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

type InfiniteMovingCardsProps = {
  items: {
    quote: string;   // tidak dipakai lagi (boleh tetap ada di tipe)
    name: string;    // judul layanan
    title: string;   // tidak dipakai di layout
    image?: string;
    accent?: string;
  }[];
  direction?: "left" | "right";      // props lama (diabaikan)
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
    offset: ["start end", "end start"], // gerak ikut scroll section
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
    <div className="relative mx-auto max-w-6xl">
      <div
        ref={containerRef}
        className={cn(
          "relative w-full overflow-hidden border-y border-white/10 bg-black/40 backdrop-blur-xl",
          "[mask-image:linear-gradient(to_right,transparent,white_18%,white_82%,transparent)]",
          className
        )}
      >
        <motion.ul
          style={{ x }}
          className="flex w-max min-w-full shrink-0 flex-nowrap gap-4 px-4 py-6 sm:px-6 sm:py-8"
        >
          {loopItems.map((item, idx) => {
            const accent = item.accent || "#6366f1";
            return (
              <li
                key={`${item.name}-${idx}`}
                className="relative w-[260px] sm:w-[300px] md:w-[340px] shrink-0 px-1 sm:px-2"
              >
                <div
                  className="relative h-36 sm:h-44 md:h-52 w-full overflow-hidden rounded-3xl bg-[#050712]"
                  style={{
                    boxShadow:
                      "0 18px 45px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                >
                  {/* glow halus pakai accent */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at top, rgba(148,163,255,0.22), transparent 60%)",
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-x-0 -top-px h-px"
                    style={{
                      backgroundImage: `linear-gradient(to_right,transparent,${accent},transparent)`,
                      opacity: 0.95,
                    }}
                  />

                  {/* CARD = GAMBAR ITU SENDIRI */}
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width:768px) 260px, 340px"
                      className="relative z-0 object-cover"
                    />
                  )}

                  {/* teks sangat sedikit: judul saja, di dalam gambar bagian bawah */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent">
                    <div className="px-3 pb-3 pt-4 sm:px-4 sm:pb-4">
                      <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* ring tipis */}
                  <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                </div>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </div>
  );
};

"use client";

import Image from "next/image";
import type { ServiceItem } from "./data";
import { cn } from "@/lib/utils";

type Props = {
  s: ServiceItem;
  className?: string;
};

export function ServiceCard({ s, className }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-3xl",
        "border border-white/10 bg-[#020617] backdrop-blur-xl",
        "shadow-[0_0_40px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      {/* Gambar utama */}
      <Image
        src={s.image}
        alt={s.title}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 22rem, 100vw"
      />

      {/* Overlay gradasi supaya nyambung sama desain dan ada glow warna accent */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(0,0,0,0.55), transparent 60%),
            radial-gradient(circle at 100% 100%, ${s.accent}33, transparent 55%)
          `,
          boxShadow: `0 0 40px ${s.accent}55`,
        }}
      />
    </div>
  );
}

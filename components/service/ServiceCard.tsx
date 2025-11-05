// D:\zentra\components\service\ServiceCard.tsx
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
        "relative h-full w-full overflow-hidden rounded-3xl",
        // HAPUS border & bg solid biar nyatu dengan page
        // "border border-white/10 bg-[#020617] backdrop-blur-xl",
        // "shadow-[0_0_40px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      {/* Gambar utama full-card */}
      <Image
        src={s.image}
        alt={s.title}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 22rem, 100vw"
      />

      {/* Overlay gradasi + glow accent tipis */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(0,0,0,0.6), transparent 55%),
            radial-gradient(circle at 100% 100%, ${s.accent}33, transparent 55%)
          `,
        }}
      />
    </div>
  );
}

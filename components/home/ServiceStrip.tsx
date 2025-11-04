"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { services } from "@/components/service/data";

export function ServiceStrip() {
  const items = services.map((s) => ({
    quote: s.description,
    name: s.title,
    title: s.label,
    image: s.image,
    accent: s.accent,
  }));

  return (
    <section className="relative bg-black">
      {/* gradasi sambungan dari hero ke section ini */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-black to-transparent" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              What we build
            </p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-white">
              Web, commerce, and AI that ship.
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-white/60">
            Empat pilar layanan utama Zentra—engineering, design, commerce, dan
            applied AI—dirangkai dalam satu lane yang bergerak mengikuti scroll.
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <InfiniteMovingCards items={items} />
        </div>
      </div>
    </section>
  );
}

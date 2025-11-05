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
    <section className="relative bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <div className="mt-8 md:mt-10">
          <InfiniteMovingCards items={items} />
        </div>
      </div>
    </section>
  );
}

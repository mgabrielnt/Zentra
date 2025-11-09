// D:\zentra\components\service\ServicesSection.tsx
"use client";

import Image from "next/image";
import { services } from "./data";
import Reveal from "./Reveal";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

export default function ServicesSection() {
  const content = services.map((s) => ({
    title: s.title,
    description: s.description,
    accent: s.accent,
    // ⬇️ Full image, isi seluruh card. Tidak ada teks overlay.
    content: (
      <Image
        src={s.image}
        alt={s.imageAlt}       // alt tetap untuk aksesibilitas/SEO gambar
        fill                   // isi penuh frame card
        priority               // boleh ganti jadi `false` untuk non-LCP
        sizes="(min-width:1024px) 384px, 100vw"
        className="object-cover"
      />
    ),
  }));

  return (
    <section
      id="services"
      className="relative bg-[#0B0B0B] px-0 pb-24 md:pb-28 pt-16 scroll-mt-32"
    >
      {/* Seam dari hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Intro text (kiri atas) */}
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="font-inter text-xs sm:text-sm uppercase tracking-[0.2em] text-white/50">
            What We Do
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-3 bg-gradient-to-b from-white to-white/60 bg-clip-text font-inter text-3xl md:text-[40px] font-semibold leading-tight text-transparent">
            Senior product teams, on tap.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-white/70">
            Zentra embeds with your in-house teams to ship high-impact work:
            from MVPs and redesigns, to modernization and AI pilots that roll
            into production.
          </p>
        </Reveal>
      </div>

      {/* StickyScroll lama: kiri teks, kanan card (kini = gambar) */}
      <div className="relative mx-auto mt-10 max-w-6xl px-4 sm:px-6">
        <StickyScroll content={content} />
      </div>
    </section>
  );
}

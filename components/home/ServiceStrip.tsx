"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { services } from "@/components/service/data";

export function ServiceStrip() {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState(
    services.length > 0 ? services[0].id : ""
  );

  if (!services || services.length === 0) return null;

  const activeService =
    services.find((s) => s.id === activeId) ?? services[0];

  // GSAP: breathing glow di frame
  useEffect(() => {
    if (!frameRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".services-home-glow", {
        opacity: 0.7,
        scale: 1.05,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, frameRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section
      className="relative bg-black"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* sambungan dari hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-12 h-16 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-20">
        {/* Header ringkas, aman buat homepage yang penuh section */}
        <motion.div
          className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Services
            </div>
            <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-semibold text-white">
              Design, build & scale.
            </h2>
            <p className="mt-2 max-w-xl text-xs md:text-sm text-white/60">
              Cuplikan lane utama dari studio kami—detail lengkapnya tetap kamu
              temukan di halaman Services.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <Link href="/service">
              <button className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/75 hover:border-white/40 hover:bg-white/10">
                Explore services
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Frame utama, mobile-first, siap banyak section lain di home */}
        <motion.div
          ref={frameRef}
          className="mt-8 md:mt-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.1, duration: 0.7 }}
        >
          <div className="relative">
            {/* gradient breathing glow */}
            <div className="services-home-glow absolute -inset-[2px] rounded-[2rem] bg-gradient-to-r from-purple-500/60 via-fuchsia-500/55 to-sky-400/60 opacity-50 blur-xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/10 via-black/80 to-black/95 p-4 sm:p-6 md:p-7 backdrop-blur-2xl">
              {/* garis tipis di atas */}
              <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-80" />

              {/* layout fleksibel: stack di mobile, 2 kolom di desktop */}
              <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
                {/* Kolom kiri: tabs + preview aktif */}
                <div className="flex-1 min-w-0 space-y-4">
                  {/* Tabs horizontal (scrollable di HP, wrap di desktop) */}
                  <div className="-mx-1 overflow-x-auto pb-1">
                    <div className="flex flex-nowrap gap-2 px-1 md:flex-wrap md:gap-3">
                      {services.map((s) => {
                        const isActive = s.id === activeService.id;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setActiveId(s.id)}
                            className="group relative inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-left text-[11px] md:text-xs"
                            style={{
                              borderColor: isActive
                                ? `${s.accent}80`
                                : "rgba(148,163,184,0.5)",
                              background: isActive
                                ? `radial-gradient(circle at 30% 0%, ${s.accent}33, rgba(15,23,42,0.95))`
                                : "rgba(15,23,42,0.85)",
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: s.accent }}
                            />
                            <span className="font-medium text-white/90">
                              {s.title}
                            </span>
                            <span className="hidden text-[10px] text-white/55 sm:inline">
                              · {s.label}
                            </span>
                            {isActive && (
                              <span
                                className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-80"
                                style={{
                                  boxShadow: `0 0 26px ${s.accent}66`,
                                }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card ringkasan service aktif */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeService.id}
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="relative overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-white/5 via-black/80 to-black/95 p-4 sm:p-5 md:p-6 shadow-[0_0_40px_rgba(15,23,42,0.9)]"
                    >
                      {/* accent glow */}
                      <div
                        className="pointer-events-none absolute -inset-12 opacity-35 blur-3xl"
                        style={{
                          background: `radial-gradient(circle at 0% 0%, ${activeService.accent}66, transparent 60%)`,
                        }}
                      />

                      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center">
                        {/* gambar */}
                        <div className="mx-auto w-32 shrink-0 sm:mx-0 sm:w-28 md:w-32">
                          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/60 p-2">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/15 via-transparent to-white/5 opacity-70" />
                            <img
                              src={activeService.image}
                              alt={activeService.title}
                              className="relative z-10 h-full w-full rounded-xl object-contain"
                            />
                          </div>
                        </div>

                        {/* teks ringkasan */}
                        <div className="flex-1 space-y-3">
                          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60">
                            <span className="h-1.5 w-8 rounded-full bg-white/20" />
                            <span>{activeService.label}</span>
                          </div>

                          <h3 className="text-base md:text-lg font-semibold text-white">
                            {activeService.title}
                          </h3>

                          <p className="text-xs md:text-sm leading-relaxed text-white/70">
                            {activeService.description}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-1 text-[10px] md:text-[11px] text-white/60">
                            <span className="rounded-full bg-white/5 px-2.5 py-1">
                              From idea to shipped product
                            </span>
                            <span className="rounded-full bg-white/5 px-2.5 py-1">
                              Modern stack & clean handoff
                            </span>
                            <span className="rounded-full bg-white/5 px-2.5 py-1">
                              Works with your team
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Kolom kanan: grid ringkasan kecil (biar enak kalau nanti banyak section di home) */}
                <div className="flex-1 min-w-0">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {services.map((s) => (
                      <motion.div
                        key={`mini-${s.id}`}
                        whileHover={{ y: -4, scale: 1.02 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 18,
                        }}
                        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/80 p-3 sm:p-4"
                      >
                        <div
                          className="pointer-events-none absolute -inset-6 opacity-20 blur-2xl"
                          style={{
                            background: `radial-gradient(circle at 0% 0%, ${s.accent}60, transparent 55%)`,
                          }}
                        />

                        <div className="relative space-y-2">
                          <div className="inline-flex items-center gap-2">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: s.accent }}
                            />
                            <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                              {s.label}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-white">
                            {s.title}
                          </p>
                          <p className="text-[11px] leading-snug text-white/60 line-clamp-3">
                            {s.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

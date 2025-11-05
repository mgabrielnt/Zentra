"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { gsap } from "gsap";
import { services } from "@/components/service/data";

export function ServiceStrip() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeId, setActiveId] = useState(
    services.length > 0 ? services[0].id : ""
  );

  if (!services || services.length === 0) return null;
  const activeService =
    services.find((s) => s.id === activeId) ?? services[0];

  // Scroll progress untuk parallax halus
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 10%"],
  });

  // Track geser sedikit saat scroll, biar berasa hidup
  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const detailY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const detailOpacity = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  // GSAP: glow yang lari di sepanjang track
  useEffect(() => {
    if (!trackRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(".service-track-glow", {
        xPercent: 130,
        duration: 4.5,
        repeat: -1,
        ease: "power1.inOut",
      });
    }, trackRef);

    return () => ctx.revert();
  }, []);

  return (
<<<<<<< HEAD
    <section className="relative bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 md:py-16">
        <div className="mt-8 md:mt-10">
          <InfiniteMovingCards items={items} />
        </div>
=======
    <motion.section
      ref={sectionRef}
      className="relative bg-black"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* sambungan halus dari hero */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-16 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-14 md:py-18">
        {/* Header kecil, nggak makan tempat */}
        <motion.div
          className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              Services
            </div>
            <h2 className="mt-3 text-xl md:text-2xl lg:text-3xl font-semibold text-white">
              Lanes we actually ship in.
            </h2>
            <p className="mt-2 max-w-xl text-xs md:text-sm text-white/60">
              Empat jalur utama yang paling sering kami kerjakan—detail scope
              lengkap tinggal dibuka di halaman Services.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <Link href="/service">
              <button className="rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm hover:bg-white/15">
                Open Services page
              </button>
            </Link>
          </div>
        </motion.div>

        {/* TRACK SCROLL-LINKED */}
        <motion.div
          ref={trackRef}
          className="relative mt-2"
          style={{ x: trackX }}
        >
          {/* garis halus sebagai track */}
          <div className="pointer-events-none absolute left-1/2 top-3 h-[1px] w-[140%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-70" />

          {/* glow yang lari-lari di track (GSAP) */}
          <div className="service-track-glow pointer-events-none absolute left-0 top-3 h-1 w-24 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-400 via-fuchsia-400 to-sky-400 blur-md opacity-80" />

          {/* titik-titik service di atas track */}
          <div className="relative mx-auto flex max-w-5xl justify-between gap-3 overflow-x-auto pb-4 pt-4">
            {services.map((s, index) => {
              const isActive = s.id === activeService.id;
              const order = index + 1;

              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveId(s.id)}
                  className="group mr-4 flex min-w-[80px] flex-col items-center gap-1 last:mr-0 sm:min-w-[90px]"
                >
                  <motion.div
                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-black/80 shadow-[0_0_35px_rgba(15,23,42,0.9)]"
                    whileHover={{ y: -4, scale: 1.05 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 18,
                    }}
                  >
                    <span className="text-[10px] font-medium text-white/70">
                      {order.toString().padStart(2, "0")}
                    </span>
                    <span
                      className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, ${s.accent}50, transparent 70%)`,
                      }}
                    />
                    {isActive && (
                      <span
                        className="pointer-events-none absolute inset-0 rounded-full opacity-80 blur-xl"
                        style={{
                          background: `radial-gradient(circle at 50% 50%, ${s.accent}70, transparent 65%)`,
                        }}
                      />
                    )}
                  </motion.div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 line-clamp-1">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* DETAIL AKTIF – lebih kecil, tanpa border, ikut scroll */}
        <motion.div
          className="mt-6 md:mt-8"
          style={{ y: detailY, opacity: detailOpacity }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center"
            >
              {/* kiri: teks singkat */}
              <div className="space-y-3 text-center md:text-left">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/50">
                  Active lane
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {activeService.title}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed text-white/70">
                  {activeService.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 pt-2 text-[10px] md:justify-start md:text-[11px] text-white/65">
                  <span className="rounded-full bg-white/5 px-3 py-1">
                    Strategy → Design → Build
                  </span>
                  <span className="rounded-full bg-white/5 px-3 py-1">
                    Modern stack, clean handoff
                  </span>
                  <span className="rounded-full bg-white/5 px-3 py-1">
                    Embedded with your team
                  </span>
                </div>
              </div>

              {/* kanan: visual kecil, bukan card gede */}
              <motion.div
                className="relative mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 via-black/80 to-black/95 shadow-[0_0_60px_rgba(15,23,42,0.9)]"
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                {/* glow accent di belakang */}
                <div
                  className="pointer-events-none absolute -inset-10 opacity-40 blur-3xl"
                  style={{
                    background: `radial-gradient(circle at 0% 0%, ${activeService.accent}70, transparent 65%)`,
                  }}
                />

                {/* overlay garis halus */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute inset-x-6 top-6 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60" />
                  <div className="absolute inset-y-6 left-10 w-[1px] bg-gradient-to-b from-transparent via-white/25 to-transparent opacity-50" />
                </div>

                {/* konten */}
                <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3 text-[11px] text-white/70">
                    <span className="rounded-full bg-white/10 px-3 py-1">
                      {activeService.label}
                    </span>
                    <span className="flex items-center gap-1 text-white/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Live lane view
                    </span>
                  </div>

                  <div className="flex flex-1 items-center justify-center">
                    <div className="relative h-full w-full max-w-[80%]">
                      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-tr from-white/20 via-transparent to-white/10 opacity-70" />
                      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black/70">
                        <img
                          src={activeService.image}
                          alt={activeService.title}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2 text-[10px] text-white/55">
                    <span>Configured around your team rhythm</span>
                    <span className="h-1 w-10 rounded-full bg-gradient-to-r from-purple-400 to-sky-400" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
>>>>>>> origin/main
      </div>
    </motion.section>
  );
}

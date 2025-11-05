"use client";

import { motion } from "framer-motion";
import CircularGallery from "@/components/home/CircularGallery";

export default function ProjectHome() {
  const projectItems = [
    {
      image: '/project/waskita/PosterStophivaDenganTulisana.png',
      text: "Waskita by STOPHIVA",
    },
    {
      image: '/project/pkpri/PosterPKPRIDenganTulisan.png',
      text: "PKPRI",
    },
    {
      image: '/project/bki/PosterBKIDenganTulisani.png',
      text: "Biro Klasifikasi Indonesia",
    },
    {
      image: '/project/mlokomanis/PosterMlokomanisDenganTulisan.png',
      text: "Mlokomanis Village",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-black py-16 md:py-24">
      {/* Background gradient - subtle */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/10 via-black to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Header Section - Same style as Services */}
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Label with dot */}
            <div className="mb-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
                Projects
              </span>
            </div>

            {/* Title */}
            <h2 className="mb-4 font-space-grotesk text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
              Work that moves the needle.
            </h2>

            {/* Description */}
            <p className="text-sm leading-relaxed text-white/60 md:text-base">
              Kami bangun produk digital yang bukan cuma cantik, tapi beneran solve problems—real impact, real results.
            </p>
          </motion.div>

          {/* Button */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="/project"
              className="group inline-flex items-center gap-3 rounded-lg bg-white/5 px-6 py-3 text-sm font-medium uppercase tracking-wider text-white transition-all duration-300 hover:bg-white/10"
            >
              Open Projects Page
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Gallery Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="relative h-[350px] md:h-[420px] overflow-hidden">
            <CircularGallery
              items={projectItems}
              bend={2}
              textColor="#ffffff"
              borderRadius={0}
              font="bold 26px Inter"
              scrollSpeed={2.5}
              scrollEase={0.08}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
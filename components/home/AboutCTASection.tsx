"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function AboutCTASection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-20 md:py-32">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/20 blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="inline-block rounded-full border border-purple-500/20 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300 backdrop-blur">
            About Us
          </div>

          {/* Heading */}
          <h2 className={`mt-6 ${inter.className} text-3xl md:text-4xl font-bold text-white`}>
            Want to Know More{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              About Us?
            </span>
          </h2>

          {/* Description */}
          <p className={`mx-auto mt-4 max-w-2xl ${spaceGrotesk.className} text-base leading-relaxed text-white/70`}>
            Learn more about our mission, explore our project documentation, and meet the team behind Zentra.
          </p>

          {/* CTA Button */}
          <motion.div
            className="mt-8"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/aboutus"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-sm font-medium text-white transition hover:shadow-[0_0_40px_rgba(168,85,247,0.6)]"
            >
              Learn More About Us
              <svg 
                className="h-4 w-4 transition-transform group-hover:translate-x-1" 
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
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
"use client";

import { motion } from "motion/react";

export default function NewsletterCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
      className="mx-auto mt-20 max-w-2xl text-center"
    >
      <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-8 backdrop-blur">
        <h2 className="text-2xl font-semibold text-white">
          Stay Updated
        </h2>
        <p className="mt-2 text-white/70">
          Get the latest insights delivered to your inbox monthly.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm text-white placeholder:text-white/40 backdrop-blur focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
          <button className="rounded-full bg-purple-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-purple-600 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
            Subscribe
          </button>
        </div>
      </div>
    </motion.div>
  );
}
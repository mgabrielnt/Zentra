"use client";

import { motion } from "motion/react";

export default function ArticleShare() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-16 border-t border-white/10 pt-8"
    >
      <p className="text-sm text-white/50">Share this article</p>
      <div className="mt-4 flex gap-3">
        <button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10">
          Twitter
        </button>
        <button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10">
          LinkedIn
        </button>
        <button className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10">
          Copy Link
        </button>
      </div>
    </motion.div>
  );
}
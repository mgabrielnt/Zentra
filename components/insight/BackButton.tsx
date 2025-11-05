"use client";

import Link from "next/link";

export default function BackButton() {
  return (
    <div className="fixed left-6 top-20 z-40 hidden lg:block">
      <Link
        href="/insight"
        className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm text-white/70 backdrop-blur transition hover:border-purple-500/30 hover:text-white"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Insights
      </Link>
    </div>
  );
}
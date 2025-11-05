"use client";

import { motion } from "motion/react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface ArticleHeaderProps {
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

export default function ArticleHeader({ 
  title, 
  category, 
  author, 
  date, 
  readTime 
}: ArticleHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-purple-500/10 to-transparent pt-24 pb-12 md:pt-32 md:pb-16">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(124,58,237,0.2)_0%,rgba(0,0,0,0)_100%)]" />
      
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block rounded-full bg-purple-500/20 px-4 py-1 text-sm font-medium text-purple-300 backdrop-blur">
            {category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`mt-6 bg-gradient-to-b from-white to-white/80 bg-clip-text ${inter.className} text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent`}
        >
          {title}
        </motion.h1>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/60"
        >
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
            <span className="font-medium text-white/90">{author}</span>
          </div>
          <span>•</span>
          <time dateTime={date}>{formatDate(date)}</time>
          <span>•</span>
          <span>{readTime}</span>
        </motion.div>
      </div>
    </header>
  );
}
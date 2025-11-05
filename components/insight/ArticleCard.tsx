"use client";

import Image from "next/image";
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

interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

interface ArticleCardProps {
  article: Article;
  index: number;
}

export default function ArticleCard({ article, index }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
      className="will-change-transform"
    >
      <Link href={`/insight/${article.slug}`} className="group block h-full">
        <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-purple-500/30 hover:bg-white/10 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]">
          
          {/* Image Section */}
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </motion.div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Shine effect */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1200ms]" />
            </div>

            {/* Category badge */}
            <div className="absolute bottom-3 left-3">
              <span className="inline-block rounded-full bg-purple-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                {article.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-3 text-xs text-white/50">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <h3 className={`mt-3 ${inter.className} text-xl font-semibold text-white transition-colors group-hover:text-purple-300`}>
              {article.title}
            </h3>

            <p className={`mt-2 ${spaceGrotesk.className} text-sm leading-relaxed text-white/70`}>
              {article.excerpt}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-purple-400 transition-all group-hover:gap-3">
              <span>Read article</span>
              <motion.svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
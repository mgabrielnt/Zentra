"use client";

import Link from "next/link";
import { use } from "react";
import { motion } from "motion/react";
import { Space_Grotesk, Inter } from "next/font/google";
import ProgressBar from "@/components/insight/ProgressBar";
import BackButton from "@/components/insight/BackButton";
import ArticleHeader from "@/components/insight/ArticleHeader";
import ArticleShare from "@/components/insight/ArticleShare";
import { articlesData } from "@/components/insight/articlesData";

// Fonts
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = articlesData[slug];

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-2 text-white/60">Article not found</p>
          <Link href="/insight" className="mt-4 inline-block text-purple-400 hover:text-purple-300">
            Back to Insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main
      className={`min-h-screen bg-black ${inter.variable} ${spaceGrotesk.variable}`}
      aria-label={article.title}
    >
      <ProgressBar />
      <BackButton />

      <article className="relative">
        <ArticleHeader
          title={article.title}
          category={article.category}
          author={article.author}
          date={article.date}
          readTime={article.readTime}
        />

        {/* Article Content */}
        <div className="mx-auto max-w-3xl px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <ArticleShare />
        </div>

        {/* Back to Insights CTA */}
        <div className="border-t border-white/10 bg-gradient-to-b from-transparent to-purple-500/5 py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Link
              href="/insight"
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-purple-500/20"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all insights
            </Link>
          </div>
        </div>
      </article>

      {/* Article Content Styles */}
      <style jsx global>{`
        .article-content {
          color: rgba(255, 255, 255, 0.8);
        }
        .article-content p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          font-family: var(--font-space-grotesk);
        }
        .article-content h2 {
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          font-size: 1.875rem;
          font-weight: 600;
          color: white;
          font-family: var(--font-inter);
        }
        .article-content ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
          list-style-type: disc;
        }
        .article-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
        }
        .article-content strong {
          color: rgba(168, 85, 247, 1);
          font-weight: 600;
        }
      `}</style>
    </main>
  );
}
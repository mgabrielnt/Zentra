"use client";

import Link from "next/link";
import ArticleCard from "@/components/insight/ArticleCard";
import { articles } from "@/components/insight/articlesData";

interface FeaturedArticlesProps {
  limit?: number;
  showViewAll?: boolean;
}

export default function FeaturedArticles({ 
  limit = 3, 
  showViewAll = true 
}: FeaturedArticlesProps) {
  const featuredArticles = articles.slice(0, limit);

  return (
    <section className="relative bg-[#0B0B0B] px-6 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="font-inter text-3xl md:text-4xl font-bold text-white">
            Latest Insights
          </h2>
          <p className="mt-3 font-space-grotesk text-white/70">
            Explore our latest articles on technology and innovation
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <Link
              href="/insight"
              className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-purple-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              View All Articles
              <svg 
                className="h-4 w-4" 
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
          </div>
        )}
      </div>
    </section>
  );
}
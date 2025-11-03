// D:\zentra\components\insight\ArticlesSection.tsx
import Image from "next/image";
import Link from "next/link";
import { CardContainer, CardBody } from "@/components/ui/3d-card";
import type { ArticleItem } from "./insight-data";

type ArticlesSectionProps = {
  items: ArticleItem[];
  primaryKeyword: string;
  secondaryKeywords: string[];
};

const readMins = (words: number) => Math.max(3, Math.round(words / 225));

export function ArticlesSection({
  items,
  primaryKeyword,
  secondaryKeywords,
}: ArticlesSectionProps) {
  return (
    <section className="container mx-auto px-6 py-10 md:py-14">
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Featured Articles</h2>
        <span className="text-xs text-white/60">
          Primary cluster: {primaryKeyword}; Secondary:{" "}
          {secondaryKeywords.slice(0, 3).join(", ")}…
        </span>
      </div>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((a) => (
          <li key={a.slug}>
            <CardContainer containerClassName="py-6">
              <CardBody className="h-auto w-full">
                {/* Pengganti BackgroundGradient: edge gradient ringan */}
                <div className="rounded-3xl p-[3px] bg-gradient-to-br from-[#5227FF] via-[#B19EEF] to-[#FF9FFC]">
                  <article className="rounded-3xl bg-[#0E0A1A]/65 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)] overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={a.image}
                        alt={a.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] uppercase tracking-widest text-white/60">
                        {a.section} · {readMins(a.wordCount)} min read · by {a.author} ·{" "}
                        <time dateTime={`${a.lastUpdated}T00:00:00+07:00`}>
                          Updated {a.lastUpdated}
                        </time>
                      </p>
                      <h3 className="mt-2 text-lg font-semibold leading-snug">{a.title}</h3>
                      <p className="mt-1 text-sm text-white/85">{a.dek}</p>
                      <div className="mt-3 flex gap-4">
                        <Link
                          href={a.slug}
                          className="text-sm text-white underline underline-offset-4 hover:text-white/85 focus:outline-none focus:ring-2 focus:ring-white/30"
                          aria-label={`Read article: ${a.title}`}
                        >
                          Read the article
                        </Link>
                        <Link
                          href="/insights"
                          className="text-sm text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                          aria-label="Browse all insights in this topic cluster"
                        >
                          View cluster →
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              </CardBody>
            </CardContainer>
          </li>
        ))}
      </ul>
    </section>
  );
}

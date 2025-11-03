// D:\zentra\components\insight\NewsSection.tsx
import Image from "next/image";
import Link from "next/link";
import { CardContainer, CardBody } from "@/components/ui/3d-card";
import type { NewsItem } from "./insight-data";

type NewsSectionProps = {
  items: NewsItem[];
};

export function NewsSection({ items }: NewsSectionProps) {
  return (
    <section className="container mx-auto px-6 py-10 md:py-14">
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Latest News</h2>
        <span className="text-xs text-white/60">Fresh &amp; vendor-neutral</span>
      </div>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((n) => (
          <li key={n.slug}>
            <CardContainer containerClassName="py-6">
              <CardBody className="h-auto w-full">
                {/* Pengganti BackgroundGradient: edge gradient ringan */}
                <div className="rounded-3xl p-[3px] bg-gradient-to-br from-[#5227FF] via-[#B19EEF] to-[#FF9FFC]">
                  <article className="rounded-3xl bg-[#0E0A1A]/65 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)] overflow-hidden">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={n.image}
                        alt={n.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-[10px] uppercase tracking-widest text-white/60">
                        {n.section} — <time dateTime={n.datePublished}>{n.datePublished}</time>
                      </p>
                      <h3 className="mt-2 text-lg font-semibold leading-snug">{n.title}</h3>
                      <p className="mt-1 text-sm text-white/85">{n.dek}</p>
                      <div className="mt-3">
                        <Link
                          href={n.slug}
                          className="text-sm text-white underline underline-offset-4 hover:text-white/85 focus:outline-none focus:ring-2 focus:ring-white/30"
                          aria-label={`Read news: ${n.title}`}
                        >
                          Read the news
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

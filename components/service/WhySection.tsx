"use client";
import Reveal from "./Reveal";

export function WhySection() {
  const blocks = [
    { h: "Outcome-first", p: "Roadmaps tied to KPIs—speed, conversion, uptime, and cost. We ship measurable value." },
    { h: "Senior craftsmanship", p: "Design systems, clean architectures, and tests that scaleno demo-only code." },
    { h: "Performance & SEO", p: "Core Web Vitals targets, structured content, edge caching, and crawlability by design." },
  ] as const;

  return (
    <section className="relative bg-black">
      <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-black to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <h2 className="bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-3xl md:text-5xl font-semibold text-transparent">
            Why teams choose Zentra
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {blocks.map((b, i) => (
            <Reveal key={b.h} delay={0.06 * (i + 1)}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
                <h3 className="font-inter text-white text-xl">{b.h}</h3>
                <p className="mt-2 text-white/70 font-space-grotesk">{b.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0B0B0B]" />
    </section>
  );
}

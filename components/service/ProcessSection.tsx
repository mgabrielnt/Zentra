// D:\zentra\components\service\ProcessSection.tsx
"use client";

import Reveal from "./Reveal";

const steps = [
  {
    k: "01",
    h: "Discover & align",
    p: "We co-define the problem, constraints, and success metrics with your stakeholders.",
  },
  {
    k: "02",
    h: "Design & plan",
    p: "UX, architecture, and delivery plan shaped into milestones with clear owners.",
  },
  {
    k: "03",
    h: "Build & ship",
    p: "Short, measurable iterations with demos, release notes, and observability wired in.",
  },
  {
    k: "04",
    h: "Scale & handover",
    p: "Hardening, documentation, and enablement so your teams own the stack confidently.",
  },
] as const;

// ⬇️ PENTING: named export, BUKAN default
export function ProcessSection() {
  return (
    <section className="relative bg-[#0B0B0B]">
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#0B0B0B] to-black" />

      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <h2 className="bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-3xl md:text-5xl font-semibold text-transparent">
            A process built for busy teams
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-white/70">
            No big-bang rewrites. We ship value in slices that can be measured
            against your roadmap and risk appetite.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:gap-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.k} delay={0.06 * (i + 2)}>
              <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6 backdrop-blur">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  Step {s.k}
                </span>
                <h3 className="mt-3 font-inter text-xl md:text-2xl text-white">
                  {s.h}
                </h3>
                <p className="mt-2 text-sm md:text-base text-white/70">
                  {s.p}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}

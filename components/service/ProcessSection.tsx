"use client";
import { process } from "./data";

export function ProcessSection() {
  return (
    <section className="relative bg-[#0B0B0B]">
      <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-3xl md:text-5xl font-semibold text-transparent">
          How we work
        </h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {process.map((s, i) => (
            <li key={s.t} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-sm text-white/50">Step {i + 1}</div>
              <div className="mt-1 font-inter text-white text-xl">{s.t}</div>
              <p className="mt-2 text-white/70 font-space-grotesk">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}

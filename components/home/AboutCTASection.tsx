"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutCTASection() {
  return (
    <section className="relative overflow-hidden bg-black px-6 py-20 md:py-28">
      {/* Background decor */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-purple-500/30 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-sky-500/25 blur-3xl" />
        <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute inset-y-10 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-[2.2rem] bg-gradient-to-br from-white/10 via-black/80 to-black/95 p-[1px]"
        >
          {/* inner content */}
          <div className="rounded-[2.1rem] bg-black/80 px-5 py-7 sm:px-7 md:px-10 md:py-9 lg:px-12 lg:py-11">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              {/* LEFT: copy + small stats */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Studio & collaboration
                </div>

                <h2 className="mt-4 text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
                  Curious who&apos;s behind{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-sky-400 bg-clip-text text-transparent">
                    the pixels & prompts
                  </span>
                  ?
                </h2>

                <p className="mt-4 text-sm md:text-base leading-relaxed text-white/70">
                  We&apos;re a product, design, and AI studio that plugs directly
                  into your roadmap. No layers, no fluff—just people who ship
                  and care about the details.
                </p>

                {/* mini stats strip */}
                <div className="mt-6 grid gap-4 text-xs text-white/70 sm:grid-cols-3">
                  <div className="rounded-2xl bg-white/5 px-3 py-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                      Focus
                    </p>
                    <p className="mt-1 font-medium text-white">
                      Product, design & AI
                    </p>
                    <p className="mt-1 text-[11px] text-white/60">
                      One team, not three separate vendors.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 px-3 py-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                      Collaboration
                    </p>
                    <p className="mt-1 font-medium text-white">
                      Embedded, not outsourced
                    </p>
                    <p className="mt-1 text-[11px] text-white/60">
                      Weekly rituals, shared tools, transparent decisions.
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 px-3 py-3">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                      Rhythm
                    </p>
                    <p className="mt-1 font-medium text-white">
                      Fast, but intentional
                    </p>
                    <p className="mt-1 text-[11px] text-white/60">
                      We ship often without throwing quality away.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT: dual CTA tiles */}
              <div className="flex w-full max-w-md flex-col gap-4 lg:max-w-sm">
                {/* About card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/15 via-black/80 to-black/95 p-4 sm:p-5"
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-500/40 blur-3xl" />
                  <div className="pointer-events-none absolute -left-8 bottom-0 h-20 w-20 rounded-full bg-sky-400/35 blur-2xl" />

                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-white/55">
                        Learn the story
                      </p>
                      <h3 className="mt-2 text-sm font-semibold text-white">
                        Meet the studio & how we think
                      </h3>
                      <p className="mt-2 text-xs text-white/70">
                        Origin, principles, and a closer look at how we make
                        calls on product, UX, and architecture.
                      </p>
                    </div>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm text-white/80">
                      <span>◎</span>
                    </div>
                  </div>

                  <div className="relative mt-4 flex items-center justify-between gap-3">
                    <Link
                      href="/aboutus"
                      className="inline-flex items-center gap-2 text-xs font-medium text-purple-100 hover:text-white"
                    >
                      About the studio
                      <span className="text-sm">↗</span>
                    </Link>
                    <span className="text-[10px] text-white/45">
                      Team, rituals, principles
                    </span>
                  </div>
                </motion.div>

                {/* Collaboration card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 230, damping: 20 }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/40 via-fuchsia-500/30 to-sky-400/40 p-[1px]"
                >
                  <div className="rounded-2xl bg-black/90 px-4 py-4 sm:px-5 sm:py-5">
                    <div className="relative flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-purple-100/80">
                          Ready to make it real?
                        </p>
                        <h3 className="mt-2 text-sm font-semibold text-white">
                          Start a collaboration brief
                        </h3>
                        <p className="mt-2 text-xs text-white/80">
                          Share where you are, what you&apos;re building, and
                          the constraints. We&apos;ll respond with a couple of
                          concrete ways to work together.
                        </p>
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs text-purple-100">
                        <span>→</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-white/65">
                      <span className="rounded-full bg-white/10 px-3 py-1">
                        Product & feature builds
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1">
                        UX & design systems
                      </span>
                      <span className="rounded-full bg-white/10 px-3 py-1">
                        Applied AI projects
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href="/collaboration"
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-purple-700 hover:bg-white/95"
                      >
                        Open collaboration form
                        <span className="text-xs">↗</span>
                      </Link>
                      <span className="text-[10px] text-white/45">
                        No spam. Just a clear response within a few business
                        days.
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

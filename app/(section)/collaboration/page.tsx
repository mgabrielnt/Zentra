// app/(section)/collaboration/page.tsx
"use client";

import React, { useState } from "react";
import LiquidEther from "@/components/LiquidEther";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import Reveal from "@/components/service/Reveal";
import { TracingBeam } from "@/components/ui/tracing-beam";

type FormValues = {
  name: string;
  email: string;
  company: string;
  role: string;
  website: string;
  phone: string;
  focusAreas: string[];
  budget: string;
  timeline: string;
  channel: string;
  message: string;
  nda: boolean;
  updates: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const focusOptions = [
  {
    id: "web-mobile",
    label: "Web & Mobile Product",
    desc: "Platforms, internal tools, portals, or customer-facing apps.",
  },
  {
    id: "ai-data",
    label: "AI & Data",
    desc: "Machine learning, automation, data platform, recommendations.",
  },
  {
    id: "cloud",
    label: "Cloud & Infra",
    desc: "Cloud architecture, modernisation, security, observability.",
  },
  {
    id: "ux",
    label: "UX & Design Systems",
    desc: "Design systems, UX audits, discovery and product UX.",
  },
  {
    id: "other",
    label: "Other",
    desc: "Anything that doesn’t fit neatly into the boxes above.",
  },
] as const;

const budgetOptions = [
  "Not fixed yet",
  "< IDR 2.500.000",
  "IDR 2.500.000 – 5.000.000",
  "IDR 5.000.000 – 10.000.000",
  "IDR 10.000.000 – 20.000.000",
  "> IDR 20.000.000",
];

const timelineOptions = [
  "Immediately / < 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "Still exploring",
];

const channelOptions = ["Email", "WhatsApp"] as const;

export default function Page() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    company: "",
    role: "",
    website: "",
    phone: "",
    focusAreas: [],
    budget: "",
    timeline: "",
    channel: "",
    message: "",
    nda: false,
    updates: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target;
    const { name, value } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setValues((prev) => ({
        ...prev,
        [name]: target.checked,
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const toggleFocusArea = (id: string) => {
    setValues((prev) => {
      const exists = prev.focusAreas.includes(id);
      const focusAreas = exists
        ? prev.focusAreas.filter((f) => f !== id)
        : [...prev.focusAreas, id];
      return { ...prev, focusAreas };
    });
    setErrors((prev) => ({ ...prev, focusAreas: "" }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!values.name.trim()) newErrors.name = "Full name is required.";
    if (!values.email.trim()) newErrors.email = "Work email is required.";
    if (!values.company.trim())
      newErrors.company = "Company / organisation is required.";
    if (!values.focusAreas.length)
      newErrors.focusAreas = "Please select at least one focus area.";
    if (!values.message.trim())
      newErrors.message = "Please share a short context for the collaboration.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/collaboration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to submit");
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitError(
        "Something went wrong while sending your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* HEADER / HERO */}
      <section className="relative isolate overflow-hidden [--seam:#0B0B0B]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_76%,transparent_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]">
            <LiquidEther
              colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
              mouseForce={100}
              cursorSize={100}
              autoDemo
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(124,58,237,0.35)_0%,rgba(0,0,0,0)_60%)]" />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[color:var(--seam)]"
        />

        <div
          className="relative z-10 mx-auto max-w-5xl px-6 
             pb-16 sm:pb-24 md:pb-32
             pt-20 md:pt-28
             mt-4 md:mt-10 
             text-center"
        >
          <Reveal>
            <h1 className="sr-only">
              Collaboration request for IT consulting: discovery, roadmap, and
              delivery together with your team.
            </h1>
            <div
              aria-hidden="true"
              className="flex flex-col items-center gap-3"
            >
              <LayoutTextFlip
                text="Let’s plan your next"
                words={[
                  "digital product",
                  "AI initiative",
                  "cloud journey",
                  "data platform",
                ]}
                duration={2600}
              />
              <p className="max-w-2xl font-inter text-base text-white/80 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
                Share a few details so we can prepare a focused conversation and
                suggest concrete next steps for your team.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FORM SECTION + TRACING BEAM */}
      <section className="relative bg-[#0B0B0B] px-0 pb-24 md:pb-32 pt-10 md:pt-16">
        <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <TracingBeam className="pb-10 md:pb-16">
            <div>
              <Reveal>
                <p className="font-inter text-xs sm:text-sm uppercase tracking-[0.2em] text-white/50">
                  Collaboration Request
                </p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mt-3 bg-gradient-to-b from-white to-white/70 bg-clip-text font-inter text-xl sm:text-2xl md:text-4xl font-semibold text-transparent">
                  Tell us about your context and what you’d like to achieve
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-3 max-w-2xl text-sm md:text-base text-white/70">
                  We’ll review your answers and follow up via email or WhatsApp
                  with a first proposal, questions, and options for engagement.
                </p>
              </Reveal>

              <div className="mt-6 sm:mt-8 rounded-3xl md:rounded-[32px] border border-white/10 bg-[#050508]/90 p-4 sm:p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                {submitted && (
                  <div className="mb-6 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                    Thank you! Your collaboration request has been submitted.
                    We’ll get back to you with next steps.
                  </div>
                )}

                {submitError && (
                  <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-7">
                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                        Full name *
                      </label>
                      <input
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                        Work email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                        placeholder="you@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                        Company / organization *
                      </label>
                      <input
                        name="company"
                        value={values.company}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                        placeholder="Company name"
                      />
                      {errors.company && (
                        <p className="mt-1 text-xs text-red-400">
                          {errors.company}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                        Your role
                      </label>
                      <input
                        name="role"
                        value={values.role}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                        placeholder="CTO, Product Lead, Founder, etc."
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                        Website (optional)
                      </label>
                      <input
                        name="website"
                        value={values.website}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                        placeholder="https://"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                        WhatsApp number (optional)
                      </label>
                      <input
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                        placeholder="+62..."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                        Preferred channel
                      </label>
                      <select
                        name="channel"
                        value={values.channel}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                      >
                        <option value="">Choose one (optional)</option>
                        {channelOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                        What should we focus on? *
                      </label>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                        Select 1–3
                      </span>
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      {focusOptions.map((item) => {
                        const active = values.focusAreas.includes(item.id);
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleFocusArea(item.id)}
                            className={`flex h-full flex-col items-start rounded-2xl border px-4 py-3 text-left text-sm transition
                          ${
                            active
                              ? "border-violet-400/80 bg-violet-500/15 shadow-[0_0_0_1px_rgba(167,139,250,0.35)]"
                              : "border-white/10 bg-white/5 hover:border-violet-300/60 hover:bg-violet-500/5"
                          }`}
                          >
                            <span className="mb-1 text-[13px] font-medium text-white">
                              {item.label}
                            </span>
                            <span className="text-xs text-white/65">
                              {item.desc}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.focusAreas && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.focusAreas}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                        Estimated budget (IDR)
                      </label>
                      <select
                        name="budget"
                        value={values.budget}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                      >
                        <option value="">Not fixed yet</option>
                        {budgetOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                        Target timeline
                      </label>
                      <select
                        name="timeline"
                        value={values.timeline}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                      >
                        <option value="">Not decided yet</option>
                        {timelineOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-[0.18em] text-white/60">
                      What’s the context and what outcome are you aiming for? *
                    </label>
                    <textarea
                      name="message"
                      value={values.message}
                      onChange={handleChange}
                      rows={5}
                      className="mt-2 w-full rounded-2xl border border-white/15 bg-black/40 px-3 py-3 text-sm text-white placeholder:text-white/35 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                      placeholder="For example: we want to review our current architecture and shape a 6–12 month roadmap for modernising our e-commerce platform, including observability and first AI experiments."
                    />
                    <div className="mt-1 flex items-center justify-between text-[11px] text-white/45">
                      <span>
                        2–3 sentences are enough for us to understand the
                        situation.
                      </span>
                      <span>{values.message.length} characters</span>
                    </div>
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-xs text-white/70">
                    <label className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        name="nda"
                        checked={values.nda}
                        onChange={handleChange}
                        className="mt-[2px] h-4 w-4 rounded border-white/30 bg-black/60 text-violet-500 focus:ring-violet-400"
                      />
                      <span>
                        I prefer to treat this conversation as NDA-covered (we
                        can use our standard NDA or your template).
                      </span>
                    </label>
                    <label className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        name="updates"
                        checked={values.updates}
                        onChange={handleChange}
                        className="mt-[2px] h-4 w-4 rounded border-white/30 bg-black/60 text-violet-500 focus:ring-violet-400"
                      />
                      <span>
                        I’d like to receive occasional updates about insights,
                        articles, and case studies from your consulting team.
                      </span>
                    </label>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_40px_rgba(139,92,246,0.45)] transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:cursor-not-allowed disabled:opacity-60"
                      disabled={submitted || loading}
                    >
                      {submitted
                        ? "Form submitted"
                        : loading
                          ? "Sending..."
                          : "Submit collaboration request"}
                    </button>
                    <p className="text-[11px] text-white/45">
                      We’ll only use this information to prepare and run our
                      consultation with you. No spam, no sharing with third
                      parties.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </TracingBeam>
        </div>
      </section>
    </main>
  );
}

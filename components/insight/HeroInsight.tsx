// D:\zentra\components\insight\HeroInsight.tsx
import LiquidEther from "@/components/LiquidEther";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

type HeroInsightProps = {
  topics: string[];
  industries: string[];
  formats: string[];
};

export function HeroInsight({ topics, industries, formats }: HeroInsightProps) {
  return (
    <>
      {/* HERO (pakai CSS mask agar memudar ke konten tanpa garis) */}
      <section
        className="relative isolate overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, #000 0%, #000 calc(100% - 18rem), transparent 100%)",
          maskImage:
            "linear-gradient(to bottom, #000 0%, #000 calc(100% - 18rem), transparent 100%)",
        }}
      >
        {/* LiquidEther */}
        <div className="absolute inset-0 -z-10">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            globalPointer
            resolution={0.5}
            cursorSize={100}
            mouseForce={100}
            isViscous={false}
            iterationsViscous={32}
            iterationsPoisson={32}
            dt={0.014}
            BFECC
            isBounce={false}
            className="h-[560px] w-full"
            style={{ height: "560px", width: "100%" }}
          />
        </div>

        {/* Hero content */}
        <div className="container mx-auto px-6 pt-24 pb-18 md:pt-32 md:pb-24">
          <h1 className="sr-only">Enterprise Tech Insights</h1>
          <div className="mx-auto flex max-w-[960px] flex-col items-center text-center gap-6">
            <LayoutTextFlip
              text="Enterprise Tech Insights"
              words={["AI Governance", "Cloud Modernization", "Cyber Resilience", "Data Platforms"]}
              duration={2600}
              gradientClass="from-white via-white to-white"
              blend
              glass
            />
            <p className="text-base/6 md:text-lg/7 text-white/85 max-w-[72ch]">
              Vendor-neutral news and deep articles for CIOs, CTOs, and business leaders—so you can
              turn technology strategy into measurable outcomes, faster.
            </p>

            {/* Filters (dummy UI) */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs uppercase tracking-widest text-white/60">Filters:</span>
              <FilterGroup label="Topics" items={topics} />
              <FilterGroup label="Industries" items={industries} />
              <FilterGroup label="Formats" items={formats} />
            </div>
          </div>
        </div>
      </section>

      {/* UNDER-HEADER BACKGROUND (bridge) */}
      <div className="relative isolate">
        {/* glow kapsul lembut (palette lama) */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[48rem] -translate-x-1/2 rounded-full blur-[64px] -z-10 bg-gradient-to-r from-[#5227FF]/18 via-[#B19EEF]/12 to-[#FF9FFC]/18" />

        {/* radial layer + mask → akhir ke #0B0B0B */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-16 -z-10 h-[1200px]"
          style={{
            maskImage: "linear-gradient(to bottom,#000 0%, #000 74%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom,#000 0%, #000 74%, transparent)",
            background: [
              "radial-gradient(1200px 560px at 50% 0%, rgba(82,39,255,0.16), transparent 62%)",
              "radial-gradient(900px 420px at 8% 26%, rgba(177,158,239,0.10), transparent 60%)",
              "radial-gradient(900px 420px at 92% 24%, rgba(255,159,252,0.10), transparent 60%)",
              "linear-gradient(#0B0B0B, #0B0B0B)",
            ].join(","),
          }}
        />
      </div>
    </>
  );
}

type FilterGroupProps = {
  label: string;
  items: string[];
};

function FilterGroup({ label, items }: FilterGroupProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-white/60">{label}:</span>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((i) => (
          <li key={i}>
            <span
              className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs"
              aria-label={`${label} option: ${i}`}
            >
              {i}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

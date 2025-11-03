"use client";
import Link from "next/link";
import type { ServiceItem } from "./data";

export function ServiceCard({ s, className = "" }: { s: ServiceItem; className?: string }) {
  return (
    <div
      className={`scroll-stack-card relative w-full min-h-112 md:min-h-144 my-8 p-8 sm:p-12 md:p-16
      rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.12)] box-border origin-top will-change-transform
      border border-white/10 bg-[#0B0B0B]/70 backdrop-blur-xl overflow-hidden
      before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-linear-to-br ${s.gradient}
      after:pointer-events-none after:absolute after:inset-0 after:rounded-[40px] after:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
      ${className}`.trim()}
      style={{ backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
    >
      {/* Shine layer */}
      <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[140%] w-[60%] -translate-x-1/2 rotate-30 bg-linear-to-b from-white/10 via-white/0 to-white/0 blur-2xl" />
      
      <article id={s.id} aria-labelledby={`${s.id}-title`} itemScope itemType="https://schema.org/Service">
        <meta itemProp="serviceType" content={s.title} />
        <meta itemProp="keywords" content={s.keywords} />
        
        <header className="mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
          <span className={`rounded-full border px-2 py-0.5 text-[10px] sm:text-xs ${s.chipBg}`}>{s.tag}</span>
          <span className="text-[10px] sm:text-xs text-white/50">Service</span>
        </header>
        
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="mt-0.5 sm:mt-1 text-white/80 shrink-0" aria-hidden="true">
            {s.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              id={`${s.id}-title`}
              className="font-inter text-xl sm:text-2xl md:text-4xl font-semibold leading-tight text-white tracking-tight"
              itemProp="name"
            >
              {s.title}
            </h3>
            
            <p
              className="mt-2 sm:mt-3 max-w-3xl font-space-grotesk text-white/80 text-[13px] sm:text-base leading-relaxed"
              itemProp="description"
            >
              {s.desc}
            </p>
            
            {/* Outcomes section */}
            {s.outcomes && s.outcomes.length > 0 && (
              <div className="mt-4 sm:mt-5">
                <h4 className="text-[11px] sm:text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                  Key Outcomes
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {s.outcomes.map((outcome: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-[12px] sm:text-sm text-white/70">
                      <span className="mt-0.5 shrink-0 text-emerald-400">✓</span>
                      <span className="flex-1">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Bullets/Features section */}
            {s.bullets && s.bullets.length > 0 && (
              <ul className="mt-4 sm:mt-5 space-y-2 sm:space-y-2.5" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
                {s.bullets.map((bullet: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 text-[12px] sm:text-sm text-white/60">
                    <span className="mt-1 shrink-0 text-white/40">•</span>
                    <span className="flex-1">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
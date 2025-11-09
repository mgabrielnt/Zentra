// D:\zentra\components\service\ServiceCard.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import type { ReactNode, MouseEvent } from "react";
import type { ServiceItem } from "./data";

type ServiceCardPropsBase = {
  id?: string;
  name?: string;           // kalau tidak pakai s
  title?: string;          // alias dari name
  description?: string;    // kalau tidak pakai s
  href?: string;
  bullets?: string[];      // alias dari points
  icon?: ReactNode;
  accent?: string;
};

// Bisa kirim s (ServiceItem) ATAU field granular di atas
type ServiceCardProps =
  | (ServiceCardPropsBase & { s: ServiceItem })
  | (ServiceCardPropsBase & { s?: never });

function ServiceCardInner(props: ServiceCardProps) {
  const s: ServiceItem | null = "s" in props && props.s ? props.s : null;

  const id = s?.slug ?? props.id;
  const title = s?.title ?? props.title ?? s?.name ?? props.name ?? "Service";
  const description = s?.description ?? props.description ?? "";
  const bullets = s?.points ?? props.bullets ?? [];
  const accent = s?.accent ?? props.accent;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 200, damping: 18 });
  const rotY = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 200, damping: 18 });
  const elev = useSpring(0, { stiffness: 180, damping: 16 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    x.set(Math.max(-50, Math.min(50, px / 4)));
    y.set(Math.max(-50, Math.min(50, py / 4)));
  };

  const handleEnter = () => elev.set(1);
  const handleLeave = () => {
    x.set(0);
    y.set(0);
    elev.set(0);
  };

  return (
    <motion.article
      id={id}
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          rotateX: rotX,
          rotateY: rotY,
          translateZ: useTransform(elev, [0, 1], ["0px", "6px"]),
        }}
        className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md will-change-transform"
        aria-labelledby={id ? `${id}-title` : undefined}
      >
        {/* Accent ring */}
        {accent && (
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(80% 60% at 50% -10%, ${accent}22, transparent)`,
            }}
          />
        )}

        <header className="relative z-10 mb-3 flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            {("icon" in props && props.icon) ?? <span aria-hidden>⚡</span>}
          </div>
          <h3 id={id ? `${id}-title` : undefined} className="text-base font-semibold tracking-tight text-white">
            {title}
          </h3>
        </header>

        <p className="relative z-10 text-sm leading-relaxed text-white/80">{description}</p>

        {bullets.length > 0 && (
          <ul className="relative z-10 mt-3 space-y-1.5">
            {bullets.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/75">
              <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-white/40" />
              <span>{b}</span>
            </li>
            ))}
          </ul>
        )}

        {"href" in props && props.href && (
          <div className="relative z-10 mt-4">
            <Link
              href={props.href}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 transition hover:bg-white/10"
            >
              Learn more
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </motion.div>
    </motion.article>
  );
}

// Export named + default agar bisa `import { ServiceCard } from "./ServiceCard"`
export { ServiceCardInner as ServiceCard };
export default ServiceCardInner;

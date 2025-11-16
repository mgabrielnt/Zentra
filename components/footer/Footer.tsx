// D:\zentra\components\footer/Footer.tsx
import Link from "next/link";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative bg-[#05030A] text-sm text-white/80">
      {/* Fade dari konten ke footer */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#05030A] via-[#05030A] to-transparent" />

      {/* Glow tipis di atas footer pakai warna senada LiquidEther */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#5227FF00] via-[#FF9FFC66] to-[#B19EEF00]" />

      <div className="pointer-events-none absolute -top-24 left-1/2 h-52 w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_top,_rgba(82,39,255,0.35),_transparent_70%)] blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:py-16">
        {/* Top: brand + links */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Brand & description */}
          <div className="max-w-md space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
                ZENTRA
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/70">
                IT Consulting Studio
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              Outcome-driven IT consulting studio helping teams design, build,
              and scale clean digital products, platforms, and data/AI
              capabilities with pragmatic engineering.
            </p>
          </div>

          {/* Navigation columns */}
          <div className="grid flex-1 grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="space-y-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <Link
                    href="/service"
                    className="transition-colors hover:text-white"
                  >
                    IT strategy &amp; roadmapping
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service"
                    className="transition-colors hover:text-white"
                  >
                    Product &amp; platform engineering
                  </Link>
                </li>
                <li>
                  <Link
                    href="/service"
                    className="transition-colors hover:text-white"
                  >
                    Data &amp; AI enablement
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>
                  <Link
                    href="/aboutus"
                    className="transition-colors hover:text-white"
                  >
                    About Zentra
                  </Link>
                </li>
                <li>
                  <Link
                    href="/insight"
                    className="transition-colors hover:text-white"
                  >
                    Insights &amp; articles
                  </Link>
                </li>
                <li>
                  <Link
                    href="/collaboration"
                    className="transition-colors hover:text-white"
                  >
                    Work with us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                Contact
              </h4>
              <div className="space-y-2 text-sm text-white/60 break-words">
                <p className="text-white break-all">
                  <a
                    href="mailto:zentraconsultant@gmail.com"
                    className="underline-offset-4 hover:underline"
                  >
                    zentraconsultant@gmail.com
                  </a>
                </p>
                <p>Remote-first studio embedded with your teams</p>
                <div className="flex flex-wrap gap-3 pt-2 text-xs text-white/60">
                  <Link
                    href="https://www.linkedin.com/company/zentra-consultant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:text-white hover:underline"
                  >
                    LinkedIn
                  </Link>
                  <Link
                    href="https://github.com/zentraconsultant"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:text-white hover:underline"
                  >
                    GitHub
                  </Link>
                  <Link
                    href="https://www.instagram.com/zentra.consultant/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:text-white hover:underline"
                  >
                    Instagram
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-2 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} Zentra. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <span className="text-white/30">
              Vendor-neutral · Outcome-driven
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import Navbar from './Navbar';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  // Efek kecil saat scroll (shadow / opacity)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu saat user scroll halaman
  useEffect(() => {
    if (!mobileOpen) return;

    const handleScrollClose = () => {
      setMobileOpen(false);
    };

    window.addEventListener('scroll', handleScrollClose);
    return () => window.removeEventListener('scroll', handleScrollClose);
  }, [mobileOpen]);

  // Tutup menu saat klik di luar menu & tombol
  useEffect(() => {
    if (!mobileOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        mobileMenuRef.current?.contains(target) ||
        mobileToggleRef.current?.contains(target)
      ) {
        // klik di dalam menu atau tombol -> jangan tutup
        return;
      }

      setMobileOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  return (
    <header className="fixed left-0 right-0 top-3 sm:top-4 z-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-full">
        {/* DESKTOP */}
        <div className="hidden lg:flex items-center justify-between gap-4">
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Navbar />
          </div>

          <div className="flex-shrink-0 ml-auto">
            <LanguageSwitcher />
          </div>
        </div>

        {/* MOBILE */}
        <div className="lg:hidden">
          {/* Bar atas: logo + language + hamburger (selalu stay) */}
          <div
            className={`flex items-center justify-between gap-2 rounded-3xl border border-white/15 px-3 py-2 backdrop-blur-xl shadow-[0_0_25px_rgba(0,0,0,0.65)] transition-colors duration-300 ${
              scrolled ? 'bg-black/85' : 'bg-black/70'
            }`}
          >
            <Logo compact />

            <div className="flex items-center gap-2">
              <LanguageSwitcher compact />
              <button
                ref={mobileToggleRef}
                type="button"
                aria-label="Toggle navigation"
                onClick={() => setMobileOpen((prev) => !prev)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/25 bg-white/10 hover:bg-white/15 transition-all duration-200"
              >
                <span className="sr-only">Toggle navigation</span>
                <div className="flex flex-col gap-[3px]">
                  <span
                    className={`block h-[2px] w-4 rounded-full transition-all ${
                      mobileOpen
                        ? 'bg-white translate-y-[3px] rotate-45'
                        : 'bg-white'
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-4 rounded-full transition-all ${
                      mobileOpen ? 'bg-white opacity-0' : 'bg-white'
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-4 rounded-full transition-all ${
                      mobileOpen
                        ? 'bg-white -translate-y-[3px] -rotate-45'
                        : 'bg-white'
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>

          {/* Dropdown menu: ikut aturan scroll & klik luar */}
          {mobileOpen && (
            <div
              ref={mobileMenuRef}
              className="mt-3 rounded-3xl border border-white/12 bg-black/95 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* onItemClick => tutup menu begitu link di-klik */}
              <Navbar isMobile onItemClick={() => setMobileOpen(false)} />
            </div>
          )}

        </div>
      </div>
    </header>
  );
}

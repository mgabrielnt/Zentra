'use client';

import { useState, useEffect, useRef } from 'react';
import Logo from './Logo';
import Navbar from './Navbar';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  // dipakai untuk hide logo + efek kecil saat scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
        <div className="hidden lg:flex items-center justify-between gap-4 relative">
          {/* Logo: muncul di atas, hilang pelan saat di-scroll */}
          <div
            className={`flex-shrink-0 transition-all duration-300 ${
              scrolled
                ? 'opacity-0 -translate-y-2 pointer-events-none'
                : 'opacity-100 translate-y-0'
            }`}
          >
            <Logo />
          </div>

          {/* Navbar: tetap di tengah & selalu stay di atas */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Navbar />
          </div>

          {/* dummy kanan biar layout seimbang */}
          <div className="w-24" />
        </div>

        {/* MOBILE BAR (kalau dipakai) */}
        <div className="flex items-center justify-between gap-3 lg:hidden">
          <Logo compact />
          <button
            ref={mobileToggleRef}
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
          >
            Menu
          </button>
        </div>

        {mobileOpen && (
          <div
            ref={mobileMenuRef}
            className="mt-3 rounded-3xl border border-white/12 bg-black/95 backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden lg:hidden"
          >
            <Navbar isMobile onItemClick={() => setMobileOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}

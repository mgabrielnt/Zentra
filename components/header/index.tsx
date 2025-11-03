'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import Navbar from './Navbar';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'top-4' : 'top-6'}`}>
      <div className="container mx-auto px-6 max-w-full">
        {/* Desktop: Logo pojok kiri - Navbar tengah - Language pojok kanan */}
        <div className="hidden lg:flex items-center justify-between gap-4">
          {/* Logo di pojok kiri */}
          <div className="flex-shrink-0">
            <Logo />
          </div>
          
          {/* Navbar di tengah absolute */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Navbar />
          </div>
          
          {/* Language Switcher di pojok kanan */}
          <div className="flex-shrink-0 ml-auto">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile: Nanti bisa ditambahkan */}
        <div className="lg:hidden">
          {/* Mobile menu logic */}
        </div>
      </div>
    </header>
  );
}
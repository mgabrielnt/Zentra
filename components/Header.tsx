'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { label: { en: 'HOME', id: 'BERANDA' }, href: '/home', type: 'route' },
    { label: { en: 'PROJECT', id: 'PROYEK' }, href: '/project', type: 'route' },
    { label: { en: 'SERVICE', id: 'LAYANAN' }, href: '/service', type: 'anchor' },
    { label: { en: 'ABOUT US', id: 'TENTANG KAMI' }, href: '/aboutus', type: 'anchor' },
    { label: { en: 'INSIGHT', id: 'WAWASAN' }, href: '/insight', type: 'anchor' },
    { label: { en: 'COLLABORATION', id: 'KOLABORASI' }, href: '/collaboration', type: 'anchor' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map(item => document.querySelector(item.href));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (activeIndex !== index) {
              setActiveIndex(index);
            }
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
    e.preventDefault();
    setActiveIndex(index);
    
    setTimeout(() => {
      document.querySelector(navItems[index].href)?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);

    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'top-2' : 'top-4'}`}>
        <div className="container mx-auto px-6 max-w-7xl">
          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex-1"></div>
            
            <nav className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-lg rounded-full px-8 py-3.5 shadow-2xl border border-white/20">
                <ul className="flex items-center gap-8 list-none p-0 m-0">
                  {navItems.map((item, index) => {
                    if (item.type === 'route') {
                      return (
                        <li key={index}>
                          <Link href={item.href} className={`text-[13px] font-bold tracking-wide transition-all duration-300 hover:text-white ${pathname === item.href ? 'text-white' : 'text-white/60'}`}>
                            {item.label[language]}
                          </Link>
                        </li>
                      );
                    } else {
                      return (
                        <li key={index}>
                          <a href={item.href} onClick={(e) => handleClick(e, index)} className={`text-[13px] font-bold tracking-wide transition-all duration-300 hover:text-white ${activeIndex === index ? 'text-white' : 'text-white/60'}`}>
                            {item.label[language]}
                          </a>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </nav>
            
            <div className="flex-1 flex justify-end">
              <div className="bg-linear-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-full p-1.5 shadow-2xl border border-white/30 hover:border-white/40 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <button onClick={() => setLanguage('en')} className={`relative px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-500 ease-out ${language === 'en' ? 'bg-linear-to-br from-white via-white to-gray-50 text-gray-900 shadow-xl scale-105' : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'}`}>
                    <span className="relative z-10">EN</span>
                    {language === 'en' && <span className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 to-transparent animate-pulse"></span>}
                  </button>
                  <button onClick={() => setLanguage('id')} className={`relative px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-500 ease-out ${language === 'id' ? 'bg-linear-to-br from-white via-white to-gray-50 text-gray-900 shadow-xl scale-105' : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'}`}>
                    <span className="relative z-10">ID</span>
                    {language === 'id' && <span className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 to-transparent animate-pulse"></span>}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center justify-between bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 shadow-2xl border border-white/20">
            <span className="text-white font-bold text-sm">MENU</span>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 mx-6 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
            <ul className="py-2">
              {navItems.map((item, index) => {
                if (item.type === 'route') {
                  return (
                    <li key={index}>
                      <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className={`block px-6 py-3 font-bold text-sm transition-all ${pathname === item.href ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                        {item.label[language]}
                      </Link>
                    </li>
                  );
                } else {
                  return (
                    <li key={index}>
                      <a href={item.href} onClick={(e) => handleClick(e, index)} className={`block px-6 py-3 font-bold text-sm transition-all ${activeIndex === index ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                        {item.label[language]}
                      </a>
                    </li>
                  );
                }
              })}
            </ul>
            
            <div className="flex items-center gap-3 px-6 pb-4 pt-2">
              <button onClick={() => setLanguage('en')} className={`relative flex-1 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-500 ease-out overflow-hidden ${language === 'en' ? 'bg-linear-to-br from-white via-white to-gray-50 text-gray-900 shadow-xl scale-105' : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'}`}>
                <span className="relative z-10">EN</span>
                {language === 'en' && <span className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent animate-pulse"></span>}
              </button>
              <button onClick={() => setLanguage('id')} className={`relative flex-1 py-3 rounded-full text-sm font-bold tracking-wide transition-all duration-500 ease-out overflow-hidden ${language === 'id' ? 'bg-linear-to-br from-white via-white to-gray-50 text-gray-900 shadow-xl scale-105' : 'bg-white/10 text-white hover:bg-white/20 hover:scale-105'}`}>
                <span className="relative z-10">ID</span>
                {language === 'id' && <span className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent animate-pulse"></span>}
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
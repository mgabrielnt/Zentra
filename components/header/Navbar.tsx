'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';

export default function Navbar() {
  const { language } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { label: { en: 'HOME', id: 'BERANDA' }, href: '/home' },
    { label: { en: 'PROJECT', id: 'PROYEK' }, href: '/project' },
    { label: { en: 'SERVICE', id: 'LAYANAN' }, href: '/service' },
    { label: { en: 'ABOUT US', id: 'TENTANG KAMI' }, href: '/aboutus' },
    { label: { en: 'INSIGHT', id: 'WAWASAN' }, href: '/insight' },
    { label: { en: 'COLLABORATION', id: 'KOLABORASI' }, href: '/collaboration' }
  ];

  return (
    <nav className="flex justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-full px-8 py-3.5 shadow-2xl border border-white/20">
        <ul className="flex items-center gap-8 list-none p-0 m-0">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link 
                href={item.href} 
                className={`text-[13px] font-bold tracking-wide transition-all duration-300 hover:text-white ${
                  pathname === item.href ? 'text-white' : 'text-white/60'
                }`}
              >
                {item.label[language]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/LanguageContext';

type NavbarProps = {
  isMobile?: boolean;
  onItemClick?: () => void; // ⬅️ untuk nutup menu mobile
};

export default function Navbar({ isMobile = false, onItemClick }: NavbarProps) {
  const { language } = useLanguage();
  const pathname = usePathname();

  const navItems = [
    { label: { en: 'HOME',          id: 'BERANDA' },      href: '/home' },
    { label: { en: 'PROJECT',       id: 'PROYEK' },       href: '/project' },
    { label: { en: 'SERVICE',       id: 'LAYANAN' },      href: '/service' },
    { label: { en: 'ABOUT US',      id: 'TENTANG KAMI' }, href: '/aboutus' },
    { label: { en: 'INSIGHT',       id: 'WAWASAN' },      href: '/insight' },
    { label: { en: 'COLLABORATION', id: 'KOLABORASI' },   href: '/collaboration' },
  ];

  return (
    <nav className={`flex justify-center ${isMobile ? 'w-full' : ''}`}>
      <div
        className={
          isMobile
            ? 'w-full' // ⬅️ tidak ada rounded / background di mobile, pakai container luar
            : 'bg-white/10 backdrop-blur-lg rounded-full px-8 py-3.5 shadow-2xl border border-white/20'
        }
      >
        <ul
          className={
            isMobile
              ? 'flex flex-col items-stretch gap-1 py-2 list-none m-0'
              : 'flex flex-row items-center gap-8 list-none p-0 m-0'
          }
        >
          {navItems.map((item, index) => {
            const active = pathname === item.href;

            return (
              <li key={index}>
                <Link
                  href={item.href}
                  onClick={onItemClick} // ⬅️ tutup menu setelah klik
                  className={`text-[13px] font-bold tracking-wide transition-all duration-300 hover:text-white ${
                    active ? 'text-white' : 'text-white/60'
                  } ${
                    isMobile
                      ? 'block w-full rounded-2xl px-4 py-2 text-left hover:bg-white/10'
                      : ''
                  }`}
                >
                  {item.label[language]}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

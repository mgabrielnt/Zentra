'use client';

import Image from 'next/image';
import Link from 'next/link';

type LogoProps = {
  compact?: boolean;
};

export default function Logo({ compact = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
      <Image
        src="/zentralogoheader.png"
        alt="Zentra Logo"
        width={64}
        height={64}
        className={`drop-shadow-[0_0_10px_rgba(128,90,213,0.5)] transition-transform group-hover:scale-105 ${
          compact ? 'w-9 h-9 sm:w-10 sm:h-10' : 'w-12 h-12 md:w-14 md:h-14'
        }`}
      />
      <span
        className={`text-white font-bold font-inter tracking-tight whitespace-nowrap drop-shadow-[0_0_6px_rgba(255,255,255,0.3)] transition-colors group-hover:text-purple-300 ${
          compact ? 'text-base sm:text-lg' : 'text-2xl md:text-3xl'
        }`}
      >
        Zentra.
      </span>
    </Link>
  );
}

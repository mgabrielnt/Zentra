'use client';

import Image from 'next/image';

type LogoProps = {
  compact?: boolean;
};

export default function Logo({ compact = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Image
        src="/logo_zentra.png"
        alt="Zentra Logo"
        width={64}
        height={64}
        className={`drop-shadow-[0_0_10px_rgba(128,90,213,0.5)] transition-transform hover:scale-105 ${
          compact
            ? 'w-9 h-9 sm:w-10 sm:h-10'
            : 'w-12 h-12 md:w-14 md:h-14'
        }`}
      />
      <span
        className={`text-white font-bold font-inter tracking-tight whitespace-nowrap drop-shadow-[0_0_6px_rgba(255,255,255,0.3)] ${
          compact
            ? 'text-base sm:text-lg'
            : 'text-2xl md:text-3xl'
        }`}
      >
        Zentra.
      </span>
    </div>
  );
}

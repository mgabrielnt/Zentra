'use client';

import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <Image 
        src="/logo_zentra.png"
        alt="Zentra Logo"
        width={64}
        height={64}
        className="w-12 h-12 md:w-14 md:h-14 drop-shadow-[0_0_10px_rgba(128,90,213,0.5)] transition-transform hover:scale-105"
      />
      <span className="text-white font-bold text-2xl md:text-3xl font-inter tracking-tight drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
        Zentra.
      </span>
    </div>
  );
}
'use client';

import { useLanguage } from '@/components/LanguageContext';

type LanguageSwitcherProps = {
  compact?: boolean;
};

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();

  const baseButton = compact
    ? 'px-3 py-1.5 text-[11px] sm:px-4 sm:py-2 sm:text-xs'
    : 'px-5 py-2.5 text-sm';

  return (
    <div
      className={`bg-linear-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-full shadow-2xl border border-white/30 hover:border-white/40 transition-all duration-300 ${
        compact ? 'px-1.5 py-1' : 'p-1.5'
      }`}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => setLanguage('en')}
          className={`relative rounded-full font-bold tracking-wide transition-all duration-500 ease-out ${baseButton} ${
            language === 'en'
              ? 'bg-linear-to-br from-white via-white to-gray-50 text-gray-900 shadow-xl scale-105'
              : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'
          }`}
        >
          <span className="relative z-10">EN</span>
          {language === 'en' && (
            <span className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 to-transparent animate-pulse" />
          )}
        </button>
        <button
          onClick={() => setLanguage('id')}
          className={`relative rounded-full font-bold tracking-wide transition-all duration-500 ease-out ${baseButton} ${
            language === 'id'
              ? 'bg-linear-to-br from-white via-white to-gray-50 text-gray-900 shadow-xl scale-105'
              : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'
          }`}
        >
          <span className="relative z-10">ID</span>
          {language === 'id' && (
            <span className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 to-transparent animate-pulse" />
          )}
        </button>
      </div>
    </div>
  );
}

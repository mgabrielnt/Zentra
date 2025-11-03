'use client';

import { useLanguage } from '@/components/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="bg-linear-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-full p-1.5 shadow-2xl border border-white/30 hover:border-white/40 transition-all duration-300">
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setLanguage('en')} 
          className={`relative px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-500 ease-out ${
            language === 'en' 
              ? 'bg-linear-to-br from-white via-white to-gray-50 text-gray-900 shadow-xl scale-105' 
              : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'
          }`}
        >
          <span className="relative z-10">EN</span>
          {language === 'en' && (
            <span className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 to-transparent animate-pulse"></span>
          )}
        </button>
        <button 
          onClick={() => setLanguage('id')} 
          className={`relative px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-500 ease-out ${
            language === 'id' 
              ? 'bg-linear-to-br from-white via-white to-gray-50 text-gray-900 shadow-xl scale-105' 
              : 'text-white/80 hover:text-white hover:bg-white/10 hover:scale-105'
          }`}
        >
          <span className="relative z-10">ID</span>
          {language === 'id' && (
            <span className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 to-transparent animate-pulse"></span>
          )}
        </button>
      </div>
    </div>
  );
}
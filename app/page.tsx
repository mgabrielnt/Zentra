'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
<<<<<<< HEAD
import HomeSection from './section/home/page'

=======
import HomeSection from '@/(section)/home/page';
>>>>>>> 6452d5794924023d8c89d30e74e57e5db65af245

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <HomeSection/>
    </div>
  );
}
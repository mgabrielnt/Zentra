'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import HomeSection from './section/home/page'


export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div>
      <HomeSection/>
    </div>
  );
}
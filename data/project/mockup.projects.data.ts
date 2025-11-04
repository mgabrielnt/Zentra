import { ProjectCard } from '@/types/project.types';

export const projects: ProjectCard[] = [
  {
    id: 1,
    title: 'Waskita Project',
    price: '$0',
    description:
      'An educational platform for HIV/AIDS awareness with quizzes and articles.', // 👈 Diperbarui
    image: '/project/waskita/PosterStophivaDenganTulisana.png',
    category: 'EDUCATION',
    logoText: 'E',
    logoGradient: 'from-pink-500 to-red-500',
    madeByText: 'Made by Zentra',
    categoryBadgeColor: 'bg-blue-900',
    showMadeBy: true,
    gradient: 'from-indigo-500/20 via-fuchsia-500/10 to-transparent',
  },
  {
    id: 2,
    title: 'PKPRI',
    price: '$0',
    description:
      'Comprehensive company profile for Indonesian Cooperatives (PKPRI).', // 👈 Diperbarui
    image: '/project/pkpri/PosterPKPRIDenganTulisan.png',
    category: 'COMPANY PROFILE',
    logoText: 'C',
    logoGradient: 'from-blue-500 to-cyan-500',
    madeByText: 'Made by Zentra',
    categoryBadgeColor: 'bg-purple-900',
    showMadeBy: true,
    gradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
  },
  {
    id: 3,
    title: 'Biro Klasifikasi Indonesia',
    price: '$0',
    description:
      'Admin dashboard for tracking financial performance and staff metrics.', // 👈 Diperbarui
    image: '/project/bki/PosterBKIDenganTulisani.png',
    category: 'DASHBOARD',
    logoText: 'D',
    logoGradient: 'from-green-500 to-emerald-500',
    madeByText: 'Made by Zentra',
    categoryBadgeColor: 'bg-green-900',
    showMadeBy: false,
    gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
  },
  {
    id: 4,
    title: 'Landing Page Mlokomanis',
    price: '$0',
    description:
      'A landing page designed to showcase the potential of Mlokomanis Village.', // 👈 Diperbarui
    image: '/project/mlokomanis/PosterMlokomanisDenganTulisan.png',
    category: 'LANDING PAGES',
    logoText: 'L',
    logoGradient: 'from-orange-500 to-red-500',
    madeByText: 'Made by Zentra',
    categoryBadgeColor: 'bg-orange-900',
    showMadeBy: true,
    gradient: 'from-amber-500/20 via-fuchsia-500/10 to-transparent',
  },
];

export const categories = [
  'SHOW ALL',
  'EDUCATION',
  'COMPANY PROFILE',
  'DASHBOARD',
  'LANDING PAGES',
];
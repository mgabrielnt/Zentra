import { ProjectCard } from '@/types/project.types';

export const projects: ProjectCard[] = [
  {
    id: 1,
    title: 'Waskita Project',
    price: '$0',
    description: 'Educational platform for Waskita.',
    image: '/project/waskita/PosterStophivaDenganTulisana.png',
    category: 'EDUCATION',
    logoText: 'W',
    logoGradient: 'from-pink-500 to-red-500',
    madeByText: 'Made by STOPHIVA',
    categoryBadgeColor: 'bg-blue-900',
    showMadeBy: true,
    gradient: 'from-indigo-500/20 via-fuchsia-500/10 to-transparent', // 👈 UNGU/PINK
  },
  {
    id: 2,
    title: 'Company Dashboard',
    price: '$0',
    description: 'Modern dashboard interface.',
    image: '/project/pkpri/PosterPKPRIDenganTulisan.png',
    category: 'COMPANY PROFILE',
    logoText: 'C',
    logoGradient: 'from-blue-500 to-cyan-500',
    madeByText: 'Made by STOPHIVA',
    categoryBadgeColor: 'bg-purple-900',
    showMadeBy: true,
    gradient: 'from-pink-500/20 via-purple-500/10 to-transparent', // 👈 PINK/PURPLE
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    price: '$0',
    description: 'Real-time analytics platform.',
    image: '/project/bki/PosterBKIDenganTulisani.png',
    category: 'DASHBOARD',
    logoText: 'A',
    logoGradient: 'from-green-500 to-emerald-500',
    madeByText: 'Made by STOPHIVA',
    categoryBadgeColor: 'bg-green-900',
    showMadeBy: false,
    gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent', // 👈 CYAN/SKY
  },
  {
    id: 4,
    title: 'Landing Page Pro',
    price: '$0',
    description: 'High-converting landing page.',
    image: '/placeholder-image.jpg',
    category: 'LANDING PAGES',
    logoText: 'L',
    logoGradient: 'from-orange-500 to-red-500',
    madeByText: 'Made by STOPHIVA',
    categoryBadgeColor: 'bg-orange-900',
    showMadeBy: true,
    gradient: 'from-amber-500/20 via-fuchsia-500/10 to-transparent', // 👈 AMBER/FUCHSIA
  },
  {
    id: 5,
    title: 'E-Learning Platform',
    price: '$0',
    description: 'Interactive learning system.',
    image: '/placeholder-image.jpg',
    category: 'EDUCATION',
    logoText: 'E',
    logoGradient: 'from-indigo-500 to-purple-500',
    madeByText: 'Made by STOPHIVA',
    categoryBadgeColor: 'bg-indigo-900',
    showMadeBy: true,
    gradient: 'from-indigo-500/20 via-purple-500/10 to-transparent', // 👈 INDIGO/PURPLE
  },
  {
    id: 6,
    title: 'Corporate Website',
    price: '$0',
    description: 'Professional company website.',
    image: '/placeholder-image.jpg',
    category: 'COMPANY PROFILE',
    logoText: 'C',
    logoGradient: 'from-teal-500 to-cyan-500',
    madeByText: 'Made by STOPHIVA',
    categoryBadgeColor: 'bg-teal-900',
    showMadeBy: true,
    gradient: 'from-purple-500/20 via-blue-500/10 to-transparent', // 👈 PURPLE/BLUE
  },
];

export const categories = [
  'SHOW ALL',
  'EDUCATION',
  'COMPANY PROFILE',
  'DASHBOARD',
  'LANDING PAGES',
];
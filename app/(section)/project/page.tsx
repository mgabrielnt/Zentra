'use client';

import { useState } from 'react';
import LiquidEther from '@/components/LiquidEther';
import Image from 'next/image';

// Types
interface ProjectCard {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

// Sample project data
const projects: ProjectCard[] = [
  {
    id: 1,
    title: 'Text',
    price: '$0',
    description: 'Body text.',
    image: '/placeholder-image.jpg',
    category: 'EDUCATION',
  },
  {
    id: 2,
    title: 'Text',
    price: '$0',
    description: 'Body text.',
    image: '/placeholder-image.jpg',
    category: 'COMPANY PROFILE',
  },
  {
    id: 3,
    title: 'Text',
    price: '$0',
    description: 'Body text.',
    image: '/placeholder-image.jpg',
    category: 'DASHBOARD',
  },
  {
    id: 4,
    title: 'Text',
    price: '$0',
    description: 'Body text.',
    image: '/placeholder-image.jpg',
    category: 'LANDING PAGES',
  },
  {
    id: 5,
    title: 'Text',
    price: '$0',
    description: 'Body text.',
    image: '/placeholder-image.jpg',
    category: 'EDUCATION',
  },
  {
    id: 6,
    title: 'Text',
    price: '$0',
    description: 'Body text.',
    image: '/placeholder-image.jpg',
    category: 'COMPANY PROFILE',
  },
];

const categories = [
  'SHOW ALL',
  'EDUCATION',
  'COMPANY PROFILE',
  'DASHBOARD',
  'LANDING PAGES',
];

export default function ProjectPage() {
  const [activeCategory, setActiveCategory] = useState('SHOW ALL');

  const filteredProjects =
    activeCategory === 'SHOW ALL'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with LiquidEther Background */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 z-0 bg-black">
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={100}
            cursorSize={100}
            autoDemo={true}
          />
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white">
            See Our Project
          </h1>
        </div>
      </section>

      {/* Filter Navigation - Not sticky, scrolls with content */}
      <section className="bg-white py-6 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-sm md:text-base font-bold tracking-wide transition-colors ${
                  activeCategory === category
                    ? 'text-blue-600'
                    : 'text-black hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-gray-50 py-16 px-4 min-h-screen">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Project Card Component
function ProjectCard({ project }: { project: ProjectCard }) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Card Background Gradient - matching the exact colors from the images */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-600 opacity-90" />

      {/* Content Container */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Logo/Badge and "Made by" text */}
        <div className="flex justify-between items-start mb-6">
          {/* Logo */}
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">W</span>
            </div>
          </div>
          {/* Made by text */}
          <span className="text-white/80 text-xs font-medium">Made by STOPHIVA</span>
        </div>

        {/* Image Placeholder */}
        <div className="bg-gray-300 rounded-2xl mb-6 h-48 flex items-center justify-center overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400" />
        </div>

        {/* Text Content */}
        <div className="flex-grow space-y-2">
          <h3 className="text-gray-900 font-semibold text-base">{project.title}</h3>
          <p className="text-gray-900 font-bold text-xl">{project.price}</p>
          <p className="text-gray-700 text-sm">{project.description}</p>
        </div>

        {/* Footer Badge */}
        <div className="mt-6 pt-4">
          <span className="inline-block bg-blue-900 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-md">
            STOPHIVA
          </span>
        </div>
      </div>
    </div>
  );
}
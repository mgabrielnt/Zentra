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
    <div className="min-h-screen bg-black text-white pt-20">
      {/* Hero Section with LiquidEther Background */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 z-0">
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
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            See Our Project
          </h1>
        </div>
      </section>

      {/* Filter Navigation */}
      <section className="bg-white py-4 sticky top-20 z-30 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
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
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Card Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-600 opacity-90" />

      {/* Content Container */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Logo/Badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
          </div>
          <span className="text-white/70 text-xs">Made by STOPHIVA</span>
        </div>

        {/* Image Placeholder */}
        <div className="bg-gray-200 rounded-xl mb-4 h-48 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl" />
        </div>

        {/* Text Content */}
        <div className="flex-grow">
          <h3 className="text-gray-800 font-semibold mb-1">{project.title}</h3>
          <p className="text-gray-800 font-bold text-lg mb-2">
            {project.price}
          </p>
          <p className="text-gray-600 text-sm">{project.description}</p>
        </div>

        {/* Footer Badge */}
        <div className="mt-4 pt-4">
          <span className="inline-block bg-blue-900 text-white px-4 py-2 rounded-full text-sm font-bold">
            STOPHIVA
          </span>
        </div>
      </div>
    </div>
  );
}
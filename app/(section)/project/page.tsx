'use client';

import { useState } from 'react';
import LiquidEther from '@/components/LiquidEther';
import ProjectCard from '@/components/project/ProjectCard';
import { projects, categories } from '@/data/projects.data';

export default function ProjectPage() {
  const [activeCategory, setActiveCategory] = useState('SHOW ALL');

  const filteredProjects =
    activeCategory === 'SHOW ALL'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={100}
            cursorSize={100}
            autoDemo={true}
          />
        </div>
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white">
            See Our Project
          </h1>
        </div>
      </section>

      {/* Filter Navigation */}
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

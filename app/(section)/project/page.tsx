'use client';

import { useState } from 'react';
import LiquidEther from '@/components/LiquidEther';
import ProjectCard from '@/components/project/ProjectCard';
import { projects, categories } from '@/data/project/mockup.projects.data';

export default function ProjectPage() {
  const [activeCategory, setActiveCategory] = useState('SHOW ALL');

  const filteredProjects =
    activeCategory === 'SHOW ALL'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-black">
      {/* ====================== HERO SECTION ====================== */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_60%,transparent_100%)] [mask-repeat:no-repeat] [mask-size:100%_100%]">
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              mouseForce={100}
              cursorSize={100}
              autoDemo={true}
            />
          </div>
          {/* Radial glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(124,58,237,0.3)_0%,rgba(0,0,0,0)_60%)]" />
        </div>

        <div className="relative z-20 text-center px-4">
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]">
            See Our Project
          </h1>
        </div>
      </section>

      {/* ====================== FILTER NAVIGATION ====================== */}
      <section className="relative bg-[#0B0B0B] px-0 pb-6 pt-8">
        {/* seam dari hero → masuk ke #0B0B0B */}
        <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#0B0B0B] to-transparent" />

        {/* Purple glow di top */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-purple-500/15 blur-3xl" />

        {/* Side glows untuk ambient atmosphere */}
        <div className="pointer-events-none absolute top-20 left-[15%] h-56 w-[36rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-[15%] h-56 w-[36rem] rounded-full bg-violet-500/10 blur-3xl" />

        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-sm md:text-base font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'text-purple-300 scale-110 drop-shadow-[0_0_12px_rgba(216,180,254,0.6)]'
                    : 'text-white/70 hover:text-purple-200 hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== PROJECTS GRID ====================== */}
      <section className="relative bg-[#0B0B0B] px-0 pb-28 pt-2">
        {/* seam continuation dari filter section */}
        <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-[#0B0B0B] to-transparent" />

        {/* Ambient purple glows - very subtle */}
        <div className="pointer-events-none absolute top-32 left-1/4 h-80 w-[40rem] rounded-full bg-purple-500/8 blur-3xl" />
        <div className="pointer-events-none absolute top-64 right-1/4 h-72 w-[36rem] rounded-full bg-fuchsia-500/6 blur-3xl" />
        <div className="pointer-events-none absolute bottom-40 left-1/2 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-violet-500/5 blur-3xl" />
        
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
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
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
    <div className="min-h-screen bg-white">
      {/* ====================== HERO SECTION ====================== */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
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

        {/* 
          ========== GRADIENT TRANSITION (HITAM → PUTIH) ==========
          - Tinggi gradient dikurangi biar lebih mepet ke navigation
          - h-12 = gradient layer pertama (paling tinggi)
          - h-8 = gradient layer kedua (lebih rendah)
          - Makin kecil angka = makin mepet ke bawah
        */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-18 bg-gradient-to-t from-white via-white/70 to-transparent z-30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/40 to-transparent z-30" />
      </section>

      {/* ====================== FILTER NAVIGATION ====================== */}
      {/* Background FULL PUTIH - semua glow effects dihapus */}
      <section className="relative bg-white px-0 pb-2 pt-4">
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-sm md:text-base font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'text-purple-600 scale-110 drop-shadow-[0_0_12px_rgba(147,51,234,0.4)]'
                    : 'text-gray-600 hover:text-purple-500 hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== PROJECTS GRID ====================== */}
      <section className="relative bg-white px-0 pb-28 pt-2">
        {/* Ambient purple glows - very subtle untuk white bg */}
        <div className="pointer-events-none absolute top-32 left-1/4 h-80 w-[40rem] rounded-full bg-purple-500/4 blur-3xl" />
        <div className="pointer-events-none absolute top-64 right-1/4 h-72 w-[36rem] rounded-full bg-fuchsia-500/3 blur-3xl" />
        <div className="pointer-events-none absolute bottom-40 left-1/2 h-64 w-[32rem] -translate-x-1/2 rounded-full bg-violet-500/3 blur-3xl" />
        
        {/* 
          ========== GRID SETTINGS ==========
          - w-full = full width tanpa max-width
          - px-6 = padding kiri kanan (lebih besar dari sebelumnya)
          - gap-5 = jarak antar card (dilonggarin dari gap-2)
        */}
        <div className="w-full px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getProjectContentById } from '@/data/project/waskita/waskitacontent.project.data';
import { notFound } from 'next/navigation';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.details as string;
  
  // Get project data by id
  const project = getProjectContentById(projectId);
  
  // If project not found, show 404
  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black">
      {/* BACK BUTTON - Fixed Position */}
      <Link 
        href="/project"
        className="fixed top-8 left-8 z-50 group"
      >
        <div className="flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-md border-2 border-purple-500/30 rounded-full hover:border-purple-400/60 hover:bg-purple-600/20 transition-all duration-300 shadow-lg shadow-purple-900/20">
          {/* Arrow Icon */}
          <svg 
            className="w-5 h-5 text-purple-400 group-hover:text-purple-300 group-hover:-translate-x-1 transition-all duration-300" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
          
          {/* Text */}
          <span className="text-white font-semibold text-sm group-hover:text-purple-200 transition-colors duration-300">
            Back to Projects
          </span>
        </div>
      </Link>

      {/* HERO SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* LEFT SIDE - Image Full Cover */}
        <div className="relative w-full h-screen">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src={project.backgroundImage}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Project Image Layer - Full Cover */}
          <div className="absolute inset-0 z-10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* RIGHT SIDE - Content */}
        <div className="relative bg-black flex items-center justify-center p-8 lg:p-16">
          <div className="max-w-2xl space-y-8">
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
              {project.title}
            </h1>
            
            {/* Description */}
            <div className="text-base md:text-lg lg:text-xl text-white/80 leading-relaxed whitespace-pre-line">
              {project.description}
            </div>

            {/* Category Badge */}
            <div className="pt-4">
              <span className="inline-block px-6 py-3 bg-purple-600/30 border-2 border-purple-400/50 rounded-full text-sm font-bold text-purple-200 uppercase tracking-wider">
                {project.category}
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* ====================== OVERVIEW THIS PROJECT ====================== */}
      <section className="relative bg-black">
        
        <div className="container mx-auto px-6 md:px-12 lg:px-16 py-20 lg:py-32">
          <div className="max-w-5xl mx-auto">
            
            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              {project.overview.title}
            </h2>
            
            {/* Content - Using actual data from project.overview.paragraphs */}
            <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed">
              {project.overview.paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>

          </div>
        </div>

        {/* Smooth gradient transition to next section */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-20 h-32 bg-gradient-to-b from-black to-[#0B0B0B]" />
      </section>

      {/* PROJECT SHOWCASE GALLERY */}
      <section className="relative bg-[#0B0B0B] px-6 md:px-8 lg:px-16 py-20 lg:py-32">
        
        {/* Smooth gradient transition from previous section */}
        <div className="pointer-events-none absolute inset-x-0 -top-20 h-32 bg-gradient-to-b from-black to-[#0B0B0B]" />

        {/* Purple glow at top */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-purple-500/15 blur-3xl" />

        {/* Side glows for ambient atmosphere */}
        <div className="pointer-events-none absolute top-20 left-[15%] h-56 w-[36rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-[15%] h-56 w-[36rem] rounded-full bg-violet-500/10 blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Project Showcase
            </h2>
            <p className="text-white/60 text-lg max-w-3xl mx-auto">
              Explore the comprehensive work we've done for this project
            </p>
          </div>

          {/* Gallery Grid - Using actual data from project.gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.gallery.map((item) => (
              <div 
                key={item.id} 
                className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30 hover:shadow-purple-900/60 transition-all duration-300 group"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}
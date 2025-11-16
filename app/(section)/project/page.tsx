'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import LiquidEther from "@/components/LiquidEther";
import ProjectCard from "@/components/project/ProjectCard";
import { projects, categories } from "@/data/project/mockup.projects.data";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { BRAND_NAME, SITE_URL } from "@/lib/seo/config";

// Komponen Reveal untuk animasi fade-in
const Reveal = ({ children, mode = "mount" }: { children: React.ReactNode; mode?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default function ProjectPage() {
  const [activeCategory, setActiveCategory] = useState('SHOW ALL');

  const filteredProjects =
    activeCategory === 'SHOW ALL'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const pageUrl = `${SITE_URL}/project`;
  const projectCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Portofolio Proyek IT & AI ${BRAND_NAME}`,
    url: pageUrl,
    inLanguage: "id-ID",
    description:
      "Kumpulan studi kasus pengembangan aplikasi, dashboard, dan solusi AI yang dibangun Zentratech untuk klien di Indonesia.",
    isPartOf: { "@id": `${SITE_URL}#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.title,
        url: `${pageUrl}#project-${project.id}`,
        description: project.description,
      })),
    },
  } as const;

  return (
    <div className="min-h-screen bg-white">
      {/* ====================== HERO SECTION ====================== */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 mask-image:linear-linear(to_bottom,black_0%,black_60%,transparent_100%) mask-repeat:no-repeat mask-size:100%_100%">
            <LiquidEther
              colors={['#5227FF', '#FF9FFC', '#B19EEF']}
              mouseForce={100}
              cursorSize={100}
              autoDemo={true}
            />
          </div>
          {/* Radial glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-linear(120%_80%_at_50%_0%,rgba(124,58,237,0.3)_0%,rgba(0,0,0,0)_60%)]" />
        </div>

        <div
          className="relative z-10 mx-auto max-w-5xl px-6 
               pb-24 sm:pb-32 md:pb-40 lg:pb-56
               pt-24 md:pt-32
               mt-6 md:mt-10 
               text-center"
        >
          <Reveal mode="mount">
            <h1 className="bg-gradient-to-b from-white to-white/80 bg-clip-text text-3xl font-semibold text-transparent md:text-4xl lg:text-5xl">
              Portofolio Proyek IT & AI {BRAND_NAME} di Semarang
            </h1>
            <div className="mt-4 flex flex-col items-center gap-3">
              <LayoutTextFlip
                text="Our Project is"
                words={[
                  "Dashboard Analytics",
                  "UI/UX Design",
                  "Education Website",
                  "Company Profile",
                ]}
                duration={2600}
              />
              <p className="font-inter text-base text-white/80 drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">
                Studi kasus nyata untuk perusahaan Indonesia yang ingin
                meningkatkan operasi dengan solusi digital dan AI.
              </p>
            </div>
          </Reveal>
        </div>

        {/* linear transition (HITAM → PUTIH) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-18 bg-linear-to-t from-white via-white/70 to-transparent z-30" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-white/40 to-transparent z-30" />
      </section>

      {/* ====================== FILTER NAVIGATION ====================== */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative bg-white px-0 pb-2 pt-4"
      >
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`text-sm md:text-base font-bold tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'text-purple-600 scale-110 drop-shadow-[0_0_12px_rgba(147,51,234,0.4)]'
                    : 'text-gray-600 hover:text-purple-500'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ====================== PROJECTS GRID ====================== */}
      <section className="relative bg-white px-0 pb-28 pt-2">
        {/* Ambient purple glows */}
        <div className="pointer-events-none absolute top-32 left-1/4 h-80 w-40rem rounded-full bg-purple-500/4 blur-3xl" />
        <div className="pointer-events-none absolute top-64 right-1/4 h-72 w-36rem rounded-full bg-fuchsia-500/3 blur-3xl" />
        <div className="pointer-events-none absolute bottom-40 left-1/2 h-64 w-32rem -translate-x-1/2 rounded-full bg-violet-500/3 blur-3xl" />
        
        <div className="w-full px-6 relative z-10">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                id={`project-${project.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                layout
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectCollectionSchema) }}
      />
    </div>
  );
}
'use client';

import { useParams } from 'next/navigation';
import { getProjectContentById } from '@/data/project/waskita/waskitacontent.project.data';
import { notFound } from 'next/navigation';
import BackButton from '@/components/project/details/BackButton';
import ProjectHeroSection from '@/components/project/details/ProjectHeroSection';
import ProjectOverview from '@/components/project/details/ProjectOverview';
import ProjectShowcaseGallery from '@/components/project/details/ProjectShowCase';

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
      {/* Back Button - Fixed Position */}
      <BackButton />

      {/* Hero Section */}
      <ProjectHeroSection project={project} />

      {/* Overview Section */}
      <ProjectOverview overview={project.overview} />

      {/* Project Showcase Gallery Section */}
      <ProjectShowcaseGallery gallery={project.gallery} />
    </div>
  );
}
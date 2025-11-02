import Image from 'next/image';
import { ProjectCard as ProjectCardType } from '@/types/project.types';
import LogoBadge from './LogoBadge';
import MadeByBadge from './MadeByBadge';
import ProjectInfo from './ProjectInfo';
import MoreDetailsButton from './MoreDetailsButton';

export default function ProjectCard({ project }: { project: ProjectCardType }) {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="relative aspect-[3/4] overflow-hidden">
        {/* Full Image Background */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Components */}
        <MoreDetailsButton />
        
        <LogoBadge 
          text={project.logoText || 'W'} 
          gradientClass={project.logoGradient || 'from-pink-500 to-red-500'} 
        />

        {project.showMadeBy && (
          <MadeByBadge text={project.madeByText || 'Made by STOPHIVA'} />
        )}

        <ProjectInfo
          title={project.title}
          description={project.description}
          category={project.category}
          badgeColor={project.categoryBadgeColor || 'bg-blue-900'}
        />
      </div>
    </div>
  );
}
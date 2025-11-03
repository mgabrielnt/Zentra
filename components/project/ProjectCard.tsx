import Image from 'next/image';
import { ProjectCard as ProjectCardType } from '@/types/project.types';
import LogoBadge from './LogoBadge';
import MadeByBadge from './MadeByBadge';
import ProjectInfo from './ProjectInfo';
import MoreDetailsButton from './MoreDetailsButton';

export default function ProjectCard({ project }: { project: ProjectCardType }) {
  return (
    <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10 bg-[#0B0B0B]/70 backdrop-blur-xl transform-gpu">
      <div 
        className={`relative aspect-[3/4] overflow-hidden
          before:pointer-events-none 
          before:absolute 
          before:inset-0 
          before:-z-10 
          before:bg-gradient-to-br ${project.gradient || 'from-indigo-500/20 via-fuchsia-500/10 to-transparent'}
          after:pointer-events-none 
          after:absolute 
          after:inset-0 
          after:rounded-3xl 
          after:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
        `}
      >
        {/* Shine layer */}
        <div className="pointer-events-none absolute -top-1/3 left-1/2 h-[140%] w-[60%] -translate-x-1/2 rotate-[30deg] bg-gradient-to-b from-white/10 via-white/0 to-white/0 blur-2xl" />

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
        <MoreDetailsButton projectId={project.id} />
        
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
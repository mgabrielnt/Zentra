import Image from 'next/image';

interface ProjectHeroSectionProps {
  project: {
    backgroundImage: string;
    image: string;
    title: string;
    description: string;
    category: string;
  };
}

export default function ProjectHeroSection({ project }: ProjectHeroSectionProps) {
  return (
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
  );
}
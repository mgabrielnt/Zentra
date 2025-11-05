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
    <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[80vh]">
      
      {/* LEFT SIDE - Image (responsif tinggi di mobile) */}
      <div className="relative w-full h-[50vh] lg:h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Overlay Project Image */}
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
      <div className="relative bg-black flex items-center justify-center p-6 sm:p-8 lg:p-16 text-center lg:text-left">
        <div className="max-w-2xl space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {project.title}
          </h1>
          
          <div className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed whitespace-pre-line">
            {project.description}
          </div>

          <div className="pt-2 sm:pt-4">
            <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-purple-600/30 border-2 border-purple-400/50 rounded-full text-xs sm:text-sm font-bold text-purple-200 uppercase tracking-wider">
              {project.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectOverviewProps {
  overview: {
    title: string;
    paragraphs: string[];
  };
}

export default function ProjectOverview({ overview }: ProjectOverviewProps) {
  return (
    <section className="relative bg-black">
      
      <div className="container mx-auto px-6 md:px-12 lg:px-16 py-20 lg:py-32">
        <div className="max-w-5xl mx-auto">
          
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
            {overview.title}
          </h2>
          
          {/* Content - Using actual data from overview.paragraphs */}
          <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed">
            {overview.paragraphs.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>

        </div>
      </div>

    <div className="pointer-events-none absolute inset-x-0 -bottom-48 h-48 bg-gradient-to-b from-black via-gray-900/80 to-transparent" />

    {/* Extra smooth layer untuk transisi lebih halus */}
    <div className="pointer-events-none absolute inset-x-0 -bottom-56 h-56 bg-gradient-to-b from-gray-950/20 via-transparent to-transparent" />

    {/* ✅ ENHANCED: Subtle purple glow - sangat minimal dan lebih besar */}
    <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[80rem] -translate-x-1/2 rounded-full bg-purple-600/3 blur-3xl" />
    ```
    </section>
  );
}
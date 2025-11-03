import Image from 'next/image';

interface GalleryItem {
  id: string |number;
  image: string;
  alt: string;
}

interface ProjectShowcaseGalleryProps {
  gallery: GalleryItem[];
}

export default function ProjectShowcaseGallery({ gallery }: ProjectShowcaseGalleryProps) {
  return (
    <section className="relative bg-white px-6 md:px-8 lg:px-16 py-20 lg:py-32">
      
     {/* ✅ ENHANCED: Super smooth blur transition dengan multi-step gradient */}
    <div className="pointer-events-none absolute inset-x-0 -top-48 h-48 bg-gradient-to-b from-transparent via-gray-100/30 to-white" />

    {/* Extra smooth layer untuk transisi lebih halus */}
    <div className="pointer-events-none absolute inset-x-0 -top-56 h-56 bg-gradient-to-b from-transparent via-transparent to-gray-50/20" />

    {/* ✅ ENHANCED: Subtle purple glow - sangat minimal dan lebih besar */}
    <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[80rem] -translate-x-1/2 rounded-full bg-purple-600/3 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Project Showcase
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore the comprehensive work we've done for this project
          </p>
        </div>

        {/* Gallery Grid - Using actual data from gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {gallery.map((item) => (
            <div 
              key={item.id} 
              className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300 group"
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
  );
}
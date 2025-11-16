import Image from 'next/image';

interface GalleryItem {
  id: string | number;
  image: string;
  alt: string;
}

interface ProjectShowcaseGalleryProps {
  gallery: GalleryItem[];
}

export default function ProjectShowcaseGallery({ gallery }: ProjectShowcaseGalleryProps) {
  return (
    <section className="relative bg-white px-4 sm:px-6 md:px-8 lg:px-16 py-16 sm:py-20 lg:py-32">
      {/* Gradients */}
      <div className="pointer-events-none absolute inset-x-0 -top-48 h-48 bg-gradient-to-b from-transparent via-gray-100/30 to-white" />
      <div className="pointer-events-none absolute inset-x-0 -top-56 h-56 bg-gradient-to-b from-transparent via-transparent to-gray-50/20" />
      <div className="hidden md:block pointer-events-none absolute -top-32 left-1/2 h-64 w-[80rem] -translate-x-1/2 rounded-full bg-purple-600/3 blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-10 sm:mb-16 text-center px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Project Showcase
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Explore the comprehensive work we&apos;ve done for this project
          </p>
        </div>

        {/* Responsive Masonry Grid */}
        <div
          className="
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            auto-rows-[200px] sm:auto-rows-[220px] md:auto-rows-[240px] 
            gap-4 md:gap-6
          "
        >
          {gallery.map((item, index) => {
            // Pola otomatis: setiap 3 elemen, 1 dibuat lebih lebar
            const isWide = index % 5 === 0 || index % 7 === 0;

            return (
              <div
                key={item.id}
                className={`relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group ${
                  isWide ? 'col-span-2 md:col-span-2 row-span-1' : 'col-span-1 row-span-1'
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

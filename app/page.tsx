import LiquidEther from '@/components/LiquidEther';

export default function Home() {
  return (
    <main className="bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-gradient-radial from-purple-900/50 via-black to-black"></div>
        </div>

        <div className="absolute inset-0 z-0">
          <LiquidEther
            colors={['#5227FF', '#FF9FFC', '#B19EEF']}
            mouseForce={100}
            cursorSize={100}
            autoDemo={true}
          />
        </div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-7xl font-bold text-white mb-6">
            Zentra
          </h1>
          <p className="text-2xl text-white/90 mb-8">
            Fluid Dynamics at Your Fingertips
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 transition-all">
              Explore Now
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
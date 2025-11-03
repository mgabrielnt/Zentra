import Link from 'next/link';

export default function BackButton() {
  return (
    <Link 
      href="/project"
      className="fixed top-8 left-8 z-50 group"
    >
      <div className="flex items-center gap-3 px-6 py-3 bg-black/80 backdrop-blur-md border-2 border-purple-500/30 rounded-full hover:border-purple-400/60 hover:bg-purple-600/20 transition-all duration-300 shadow-lg shadow-purple-900/20">
        {/* Arrow Icon */}
        <svg 
          className="w-5 h-5 text-purple-400 group-hover:text-purple-300 group-hover:-translate-x-1 transition-all duration-300" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M15 19l-7-7 7-7"></path>
        </svg>
        
        {/* Text */}
        <span className="text-white font-semibold text-sm group-hover:text-purple-200 transition-colors duration-300">
          Back to Projects
        </span>
      </div>
    </Link>
  );
}
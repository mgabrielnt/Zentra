import Link from 'next/link';

interface MoreDetailsButtonProps {
  projectId: string | number;
}

export default function MoreDetailsButton({ projectId }: MoreDetailsButtonProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Link href={`/project/${projectId}`}>
        <button className="px-8 py-3 border-2 border-white/80 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 hover:border-white transition-all duration-300">
          More Details
        </button>
      </Link>
    </div>
  );
}
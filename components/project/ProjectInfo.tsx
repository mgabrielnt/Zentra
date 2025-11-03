export default function ProjectInfo({ 
  title, 
  description, 
  category, 
  badgeColor 
}: { 
  title: string; 
  description: string; 
  category: string; 
  badgeColor: string;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
      <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
      <p className="text-white/90 text-sm mb-2">{description}</p>
      <span className={`inline-block ${badgeColor} text-white px-4 py-1.5 rounded-full text-xs font-bold`}>
        {category}
      </span>
    </div>
  );
}
export default function LogoBadge({ 
  text, 
  gradientClass 
}: { 
  text: string; 
  gradientClass: string;
}) {
  return (
    <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
      <div className={`w-10 h-10 bg-gradient-to-br ${gradientClass} rounded-full flex items-center justify-center`}>
        <span className="text-white font-bold text-lg">{text}</span>
      </div>
    </div>
  );
}
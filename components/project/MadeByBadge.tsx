export default function MadeByBadge({ text }: { text: string }) {
  return (
    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
      <span className="text-gray-800 text-xs font-semibold">{text}</span>
    </div>
  );
}
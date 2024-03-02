export default function Loading() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <div className="w-3 h-3 rounded-full animate-pulse-1 bg-coursepurle-900"></div>
      <div className="w-3 h-3 rounded-full animate-pulse-2 bg-coursepurle-500"></div>
      <div className="w-3 h-3 rounded-full animate-pulse-3 bg-coursepurle-400/90"></div>
      <div className="w-3 h-3 rounded-full animate-pulse-4 bg-coursepurle-300/90"></div>
      <div className="w-3 h-3 rounded-full animate-pulse-5 bg-coursepurle-200/80"></div>
    </div>
  );
}

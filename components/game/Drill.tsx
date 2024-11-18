"use client";

interface DrillProps {
  depth: number;
  maxDepth: number;
  isActive: boolean;
}

export function Drill({ depth, maxDepth, isActive }: DrillProps) {
  return (
    <div 
      className="absolute left-1/2 -translate-x-1/2 transition-all duration-75 z-10"
      style={{ 
        top: `${(depth / maxDepth) * 80}%`,
        transform: `translate(-50%, 0) ${isActive ? 'scale(0.95)' : 'scale(1)'}`,
      }}
    >
      {/* Drill Body */}
      <div className="w-12 h-16 bg-gray-800 relative">
        {/* Drill Tip */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="w-0 h-0 
            border-l-[24px] border-l-transparent
            border-r-[24px] border-r-transparent
            border-t-[24px] border-gray-900" 
          />
        </div>
        
        {/* Drill Details */}
        <div className="absolute inset-x-0 top-2 flex flex-col gap-2">
          <div className="h-1 bg-gray-900 mx-2" />
          <div className="h-1 bg-gray-900 mx-2" />
          <div className="h-1 bg-gray-900 mx-2" />
        </div>
      </div>
    </div>
  );
}
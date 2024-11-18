"use client";

interface DrillPathProps {
  depth: number;
  maxDepth: number;
}

export function DrillPath({ depth, maxDepth }: DrillPathProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Simple tunnel path */}
      <div 
        className="absolute left-1/2 top-0 w-16 transform -translate-x-1/2 bg-gray-300"
        style={{
          height: `${(depth / maxDepth) * 70}vh`,
        }}
      />
    </div>
  );
}
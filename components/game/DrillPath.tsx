'use client';

interface DrillPathProps {
  depth: number;
  maxDepth: number;
}

export function DrillPath({ depth, maxDepth }: DrillPathProps) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Dirt Path */}
      <div
        className="absolute left-1/2 top-0 w-20 transform -translate-x-1/2"
        style={{
          height: `${(depth / maxDepth) * 70}vh`,
          background: 'linear-gradient(to bottom, transparent, rgba(139, 69, 19, 0.3))',
          boxShadow: 'inset 0 0 20px rgba(139, 69, 19, 0.5)',
        }}
      />

      {/* Scattered Dirt Particles */}
      {Array.from({ length: Math.floor((depth / maxDepth) * 20) }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#6B3410]"
          style={{
            left: `calc(50% + ${(Math.random() - 0.5) * 40}px)`,
            top: `${(depth / maxDepth) * 70 * Math.random()}vh`,
            opacity: 0.6 + Math.random() * 0.4,
          }}
        />
      ))}
    </div>
  );
}

'use client';

interface CharacterProps {
  depth: number;
  maxDepth: number;
  isActive: boolean;
}

export function Character({ depth, maxDepth, isActive }: CharacterProps) {
  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 transition-all duration-75 z-10"
      style={{
        top: `${(depth / maxDepth) * 80}%`,
        transform: `translate(-50%, 0) ${isActive ? 'scale(0.95)' : 'scale(1)'}`,
      }}>
      <div className="relative w-24 h-32">
        {/* Cat Character */}
        <div className="absolute inset-0">
          <img
            src="/cat.png"
            alt="Drilling Cat"
            className="w-full h-full object-contain"
            style={{
              transform: isActive ? 'rotate(5deg)' : 'rotate(0deg)',
              transition: 'transform 0.1s ease-out',
            }}
          />
        </div>

        {/* Drill Effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <div className="w-12 h-12 animate-spin">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
              <path
                d="M12 2L14 8L20 10L14 12L12 18L10 12L4 10L10 8L12 2Z"
                fill="#4DCCB5"
                className={isActive ? 'animate-pulse' : ''}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

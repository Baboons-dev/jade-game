'use client';

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  velocity: { x: number; y: number };
  size: number;
  opacity: number;
  color: string;
  rotation: number;
}

interface DrillParticlesProps {
  depth: number;
  maxDepth: number;
  isActive: boolean;
}

const COLORS = ['#8B4513', '#6B3410', '#5C2D0C'];

export function DrillParticles({ depth, maxDepth, isActive }: DrillParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const newParticles = Array.from({ length: 6 }, () => ({
      id: Math.random(),
      x: Math.random() * 60 - 30,
      y: (depth / maxDepth) * 70,
      velocity: {
        x: (Math.random() - 0.5) * 15,
        y: -Math.random() * 8,
      },
      size: Math.random() * 10 + 4,
      opacity: 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    const timer = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            opacity: particle.opacity - 0.05,
            rotation: particle.rotation + 10,
            velocity: {
              ...particle.velocity,
              y: particle.velocity.y + 0.4,
            },
          }))
          .filter((particle) => particle.opacity > 0)
      );
    }, 50);

    return () => clearInterval(timer);
  }, [depth, isActive]);

  return (
    <>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: `calc(50% + ${particle.x}px)`,
            top: `${particle.y}vh`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            backgroundColor: particle.color,
            transform: `translate(-50%, -50%) rotate(${particle.rotation}deg)`,
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          }}
        />
      ))}
    </>
  );
}

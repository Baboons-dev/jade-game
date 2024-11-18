"use client";

import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  velocity: { x: number; y: number };
  size: number;
  opacity: number;
}

interface DrillParticlesProps {
  depth: number;
  maxDepth: number;
  isActive: boolean;
}

export function DrillParticles({ depth, maxDepth, isActive }: DrillParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const newParticles = Array.from({ length: 3 }, () => ({
      id: Math.random(),
      x: Math.random() * 40 - 20,
      y: (depth / maxDepth) * 70,
      velocity: {
        x: (Math.random() - 0.5) * 10,
        y: -Math.random() * 5,
      },
      size: Math.random() * 6 + 2,
      opacity: 1,
    }));

    setParticles(prev => [...prev, ...newParticles]);

    const timer = setInterval(() => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            opacity: particle.opacity - 0.05,
            velocity: {
              ...particle.velocity,
              y: particle.velocity.y + 0.2,
            },
          }))
          .filter(particle => particle.opacity > 0)
      );
    }, 50);

    return () => clearInterval(timer);
  }, [depth, isActive]);

  return (
    <>
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gray-400"
          style={{
            left: `calc(50% + ${particle.x}px)`,
            top: `${particle.y}vh`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </>
  );
}
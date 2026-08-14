"use client";

import { useMemo } from "react";

interface Particle {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  opacity: number;
}

const PARTICLE_COLORS = [
  "var(--accent-gold)",
  "var(--accent-cyan)",
  "var(--accent-gold-2)",
];

const PARTICLE_COUNT = 42;

function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createParticle(index: number): Particle {
  const rand = mulberry32(0x9e3779b9 ^ index);
  return {
    left: rand() * 100,
    top: rand() * 100,
    size: 2 + rand() * 4,
    duration: 9 + rand() * 15,
    delay: -rand() * 15,
    color: PARTICLE_COLORS[Math.floor(rand() * PARTICLE_COLORS.length)],
    opacity: 0.2 + rand() * 0.5,
  };
}

export default function AnimatedBackground() {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, index) => createParticle(index)),
    []
  );

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="mesh-gradient-bg absolute inset-0" />
      <div className="aurora-grid absolute inset-0" />

      <div className="animate-orb-1 absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.18),transparent_70%)] blur-[100px]" />
      <div className="animate-orb-2 absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.22),transparent_70%)] blur-[100px]" />
      <div className="animate-orb-3 absolute right-1/3 top-1/4 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.16),transparent_70%)] blur-[80px]" />

      {particles.map((particle, index) => (
        <span
          key={index}
          className="aurora-particle absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 4}px ${particle.color}`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}

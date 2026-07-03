"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  shape: "circle" | "square";
  delay: number;
  duration: number;
}

const COLORS = [
  "#6366f1", "#8b5cf6", "#a78bfa",
  "#06b6d4", "#22d3ee",
  "#f59e0b", "#fbbf24",
  "#10b981", "#34d399",
  "#ec4899", "#f472b6",
  "#f43f5e", "#fb7185",
];

export function Confetti({ active }: { active: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const newParticles: Particle[] = Array.from({ length: 80 }, (_, i) => {
      const angle = (i / 80) * Math.PI * 2;
      const spread = 20 + Math.random() * 30;
      return {
        id: i,
        x: 50 + Math.cos(angle) * spread,
        y: 50 + Math.sin(angle) * spread,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 3 + Math.random() * 6,
        rotation: Math.random() * 360,
        shape: Math.random() > 0.5 ? "circle" : "square",
        delay: Math.random() * 0.3,
        duration: 2 + Math.random() * 2,
      };
    });

    setParticles(newParticles);

    const timer = setTimeout(() => setParticles([]), 5000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <AnimatePresence>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed pointer-events-none z-[100]"
          initial={{
            left: "50vw",
            top: "50vh",
            x: "-50%",
            y: "-50%",
            rotate: p.rotation,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            x: "-50%",
            y: "-50%",
            rotate: p.rotation + 360 + Math.random() * 720,
            scale: [0, 1.2, 1],
            opacity: [1, 1, 0],
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            boxShadow: `0 0 6px ${p.color}66`,
          }}
        />
      ))}
    </AnimatePresence>
  );
}

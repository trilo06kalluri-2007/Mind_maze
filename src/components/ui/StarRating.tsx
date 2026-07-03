"use client";

import { motion } from "framer-motion";

interface Props {
  stars: number;
  max?: number;
  size?: number;
  animate?: boolean;
}

export function StarRating({ stars, max = 3, size = 22, animate = true }: Props) {
  return (
    <div className="flex gap-1.5" style={{ width: max * (size + 6) }}>
      {Array.from({ length: max }, (_, i) => (
        <motion.svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < stars ? "#f59e0b" : "none"}
          stroke={i < stars ? "#f59e0b" : "rgba(255,255,255,0.15)"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { scale: 0, rotate: -180, opacity: 0 } : false}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            delay: animate ? 0.3 + i * 0.25 : 0,
            type: "spring",
            stiffness: 300,
            damping: 14,
          }}
          style={
            i < stars
              ? { filter: "drop-shadow(0 0 6px rgba(245,158,11,0.5))" }
              : undefined
          }
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </motion.svg>
      ))}
    </div>
  );
}

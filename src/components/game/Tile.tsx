"use client";

import { motion } from "framer-motion";

interface Props {
  tile: { id: number } | null;
  row: number;
  col: number;
  isValidMove?: boolean;
  isInPlace?: boolean;
  onClick?: () => void;
}

function getTileStyle(id: number): { gradient: string; accent: string; glow: string } {
  const styles = [
    { gradient: "from-indigo-500/30 to-purple-600/20", accent: "#818cf8", glow: "rgba(99,102,241,0.35)" },
    { gradient: "from-emerald-500/30 to-teal-600/20", accent: "#34d399", glow: "rgba(52,211,153,0.35)" },
    { gradient: "from-rose-500/30 to-pink-600/20", accent: "#fb7185", glow: "rgba(251,113,133,0.35)" },
    { gradient: "from-amber-500/30 to-orange-600/20", accent: "#fbbf24", glow: "rgba(251,191,36,0.35)" },
    { gradient: "from-cyan-500/30 to-blue-600/20", accent: "#22d3ee", glow: "rgba(34,211,238,0.35)" },
    { gradient: "from-violet-500/30 to-indigo-600/20", accent: "#a78bfa", glow: "rgba(167,139,250,0.35)" },
    { gradient: "from-fuchsia-500/30 to-rose-600/20", accent: "#e879f9", glow: "rgba(232,121,249,0.35)" },
    { gradient: "from-lime-500/30 to-emerald-600/20", accent: "#a3e635", glow: "rgba(163,230,53,0.35)" },
    { gradient: "from-sky-500/30 to-cyan-600/20", accent: "#38bdf8", glow: "rgba(56,189,248,0.35)" },
    { gradient: "from-purple-500/30 to-fuchsia-600/20", accent: "#c084fc", glow: "rgba(192,132,252,0.35)" },
    { gradient: "from-teal-500/30 to-lime-600/20", accent: "#2dd4bf", glow: "rgba(45,212,191,0.35)" },
    { gradient: "from-pink-500/30 to-rose-600/20", accent: "#f472b6", glow: "rgba(244,114,182,0.35)" },
    { gradient: "from-orange-500/30 to-amber-600/20", accent: "#fb923c", glow: "rgba(251,146,60,0.35)" },
    { gradient: "from-blue-500/30 to-violet-600/20", accent: "#60a5fa", glow: "rgba(96,165,250,0.35)" },
    { gradient: "from-green-500/30 to-teal-600/20", accent: "#4ade80", glow: "rgba(74,222,128,0.35)" },
    { gradient: "from-red-500/30 to-rose-600/20", accent: "#f87171", glow: "rgba(248,113,113,0.35)" },
    { gradient: "from-indigo-400/30 to-blue-500/20", accent: "#818cf8", glow: "rgba(129,140,248,0.35)" },
    { gradient: "from-rose-400/30 to-fuchsia-500/20", accent: "#fb7185", glow: "rgba(251,113,133,0.35)" },
    { gradient: "from-emerald-400/30 to-green-600/20", accent: "#34d399", glow: "rgba(52,211,153,0.35)" },
    { gradient: "from-amber-400/30 to-yellow-600/20", accent: "#fbbf24", glow: "rgba(251,191,36,0.35)" },
    { gradient: "from-cyan-400/30 to-sky-500/20", accent: "#22d3ee", glow: "rgba(34,211,238,0.35)" },
    { gradient: "from-violet-400/30 to-purple-500/20", accent: "#a78bfa", glow: "rgba(167,139,250,0.35)" },
    { gradient: "from-pink-400/30 to-rose-500/20", accent: "#f472b6", glow: "rgba(244,114,182,0.35)" },
    { gradient: "from-lime-400/30 to-emerald-600/20", accent: "#a3e635", glow: "rgba(163,230,53,0.35)" },
  ];
  return styles[(id - 1) % styles.length];
}

export function Tile({
  tile,
  row,
  col,
  isValidMove = false,
  isInPlace = false,
  onClick,
}: Props) {
  const gridStyle = {
    gridRow: row + 1,
    gridColumn: col + 1,
  };

  if (!tile || tile.id === -1) {
    return (
      <motion.div
        className="relative rounded-xl"
        style={gridStyle}
        layout
      >
        <motion.div
          className="absolute inset-1.5 sm:inset-2 rounded-xl bg-white/[0.008]"
          style={{
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.02)",
          }}
          animate={{
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-white/[0.015] border border-white/[0.02]" />
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const { gradient, accent, glow } = getTileStyle(tile.id);

  return (
    <motion.button
      className={`
        relative rounded-xl overflow-hidden cursor-pointer
        border backdrop-blur-sm
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
        ${isValidMove
          ? "border-white/20"
          : "border-white/[0.06]"}
        ${isInPlace ? "" : ""}
      `}
      style={{
        ...gridStyle,
        boxShadow: isValidMove
          ? `0 8px 28px ${glow}, 0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)`
          : isInPlace
          ? `0 4px 16px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px ${accent}18`
          : "0 4px 16px rgba(0,0,0,0.35), 0 2px 6px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
      onClick={onClick}
      whileHover={
        isValidMove
          ? { scale: 1.1, y: -4, transition: { type: "spring", stiffness: 500, damping: 15 } }
          : { scale: 1.05, y: -2, transition: { type: "spring", stiffness: 500, damping: 15 } }
      }
      whileTap={isValidMove ? { scale: 0.9, y: 3 } : { scale: 0.95, y: 1 }}
      layout
      layoutId={`tile-${tile.id}`}
      transition={{
        layout: { type: "spring", stiffness: 900, damping: 42, mass: 0.5 },
        scale: { type: "spring", stiffness: 800, damping: 24 },
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />

      <div
        className="absolute top-0 left-0 right-0 h-[1.5px] opacity-50"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}55, transparent)`,
        }}
      />

      {isValidMove && (
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundColor: [`${accent}00`, `${accent}14`, `${accent}00`],
            boxShadow: [
              `inset 0 0 0px ${accent}00`,
              `inset 0 0 28px ${glow}, 0 0 12px ${glow}`,
              `inset 0 0 0px ${accent}00`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {isInPlace && (
        <div
          className="absolute bottom-0 left-[15%] right-[15%] h-[2px] opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}88, transparent)`,
          }}
        />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-2xl sm:text-3xl md:text-4xl font-black tabular-nums select-none"
          style={{
            color: `${accent}dd`,
            textShadow: `0 0 16px ${glow}, 0 2px 4px rgba(0,0,0,0.3)`,
          }}
        >
          {tile.id}
        </span>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] opacity-20"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(0,0,0,0.3), transparent)`,
        }}
      />
    </motion.button>
  );
}

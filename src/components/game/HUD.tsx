"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { formatTime } from "@/hooks/useTimer";
import { Button } from "@/components/ui/Button";
import { levels } from "@/data/levels";

function StatCard({
  icon,
  label,
  value,
  accent = "text-white/70",
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent?: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 sm:px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.04] flex-1 sm:flex-initial backdrop-blur-sm">
      <div className="text-white/30 shrink-0">{icon}</div>
      <div>
        <div className={`text-sm sm:text-base font-bold tabular-nums tracking-tight ${accent}`}>
          {value}
        </div>
        <div className="text-[9px] sm:text-[10px] text-white/30 font-semibold uppercase tracking-widest">
          {label}
        </div>
      </div>
    </div>
  );
}

function ActionBtn({
  icon,
  label,
  active,
  disabled,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      className={`
        relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg
        transition-colors duration-200
        ${disabled
          ? "opacity-30 cursor-not-allowed"
          : active
          ? "bg-indigo-500/15 text-indigo-400"
          : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
        }
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
      `}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.1 }}
      whileTap={disabled ? {} : { scale: 0.9 }}
      title={label}
    >
      {icon}
    </motion.button>
  );
}

export function HUD() {
  const currentLevel = useGameStore((s) => s.currentLevel);
  const moves = useGameStore((s) => s.moves);
  const timer = useGameStore((s) => s.timer);
  const resetLevel = useGameStore((s) => s.resetLevel);
  const undoMove = useGameStore((s) => s.undoMove);
  const lastMoves = useGameStore((s) => s.lastMoves);
  const setScreen = useGameStore((s) => s.setScreen);
  const [showHint, setShowHint] = useState(false);

  const level = levels.find((l) => l.id === currentLevel);

  return (
    <motion.div
      className="w-full max-w-[min(85vw,480px)] mx-auto mb-5 sm:mb-6"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <motion.div
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500/25 to-violet-600/25 border border-indigo-500/25 flex items-center justify-center shadow-lg shadow-indigo-500/10"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-xs sm:text-sm font-black text-indigo-400 tabular-nums">
              {currentLevel}
            </span>
          </motion.div>
          <div>
            <h2 className="text-[9px] sm:text-[10px] font-semibold text-white/35 uppercase tracking-[0.15em]">
              Level {currentLevel}
            </h2>
            <h1 className="text-sm sm:text-base font-bold text-white/90 leading-tight tracking-tight">
              {level?.name ?? "Mind Maze"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-white/[0.03] border border-white/[0.04] backdrop-blur-sm">
          <ActionBtn
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            label="Hint"
            active={showHint}
            onClick={() => setShowHint(!showHint)}
          />
          <div className="w-[1px] h-4 bg-white/[0.06]" />
          <ActionBtn
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            }
            label="Levels"
            onClick={() => setScreen("levelSelect")}
          />
          <div className="w-[1px] h-4 bg-white/[0.06]" />
          <ActionBtn
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
            label="Reset"
            onClick={resetLevel}
          />
          <div className="w-[1px] h-4 bg-white/[0.06]" />
          <ActionBtn
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
              </svg>
            }
            label="Undo"
            disabled={lastMoves.length === 0}
            onClick={undoMove}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <StatCard
          icon={
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 5.136L2.5 7.5M9.002 2.002L9 2" />
            </svg>
          }
          label="Moves"
          value={moves}
          accent="text-indigo-300"
        />
        <StatCard
          icon={
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          }
          label="Time"
          value={formatTime(timer)}
          accent="text-cyan-300"
        />
        <StatCard
          icon={
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
          label="Par"
          value={level?.par ?? "?"}
          accent="text-emerald-300"
        />
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.div
            className="mt-2 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300/70 leading-relaxed backdrop-blur-sm"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            Arrange tiles in order from 1 to{" "}
            {level ? level.gridSize * level.gridSize - 1 : "?"}, with the empty
            space at the bottom-right corner.
            <br />
            <span className="text-indigo-400/40 text-[10px]">
              Tip: Use arrow keys. Press R to reset.
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

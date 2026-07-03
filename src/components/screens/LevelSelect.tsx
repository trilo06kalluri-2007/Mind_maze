"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { levels } from "@/data/levels";

export function LevelSelect() {
  const progress = useGameStore((s) => s.progress);
  const startLevel = useGameStore((s) => s.startLevel);
  const setScreen = useGameStore((s) => s.setScreen);

  const isUnlocked = (id: number) => {
    if (id === 1) return true;
    return progress.completedLevels.includes(id - 1);
  };

  const totalStars = Object.values(progress.stars).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-dvh flex flex-col p-4 sm:p-6">
      <motion.div
        className="w-full max-w-lg mx-auto flex-1 flex flex-col"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Select Level</h1>
            <p className="text-xs text-white/40 mt-0.5">
              {progress.completedLevels.length} of {levels.length} completed
              {" · "}
              <span className="text-amber-400/60">{totalStars} stars</span>
            </p>
          </div>
          <button
            className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.04] rounded-xl transition-all duration-200"
            onClick={() => setScreen("start")}
          >
            Back
          </button>
        </div>

        <div className="flex-1 grid gap-1.5 content-start">
          {levels.map((level, i) => {
            const unlocked = isUnlocked(level.id);
            const stars = progress.stars[level.id] ?? 0;
            const best = progress.personalBests[level.id];

            return (
              <motion.button
                key={level.id}
                className={`
                  w-full flex items-center gap-3 p-4 sm:p-3.5 rounded-xl text-left
                  border transition-all duration-200
                  ${
                    unlocked
                      ? "bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.05] hover:border-white/[0.08] cursor-pointer"
                      : "bg-white/[0.01] border-white/[0.02] opacity-35 cursor-not-allowed"
                  }
                `}
                onClick={() => unlocked && startLevel(level.id)}
                whileHover={unlocked ? { scale: 1.01, x: 2 } : {}}
                whileTap={unlocked ? { scale: 0.99 } : {}}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className={`
                    w-9 h-9 rounded-lg flex items-center justify-center
                    text-sm font-bold shrink-0
                    ${
                      unlocked
                        ? stars > 0
                          ? "bg-gradient-to-br from-indigo-500/20 to-violet-600/20 text-indigo-400 border border-indigo-500/15"
                          : "bg-white/[0.03] text-white/40 border border-white/[0.04]"
                        : "bg-white/[0.02] text-white/20 border border-white/[0.03]"
                    }
                  `}
                >
                  {level.id}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-medium truncate ${
                        unlocked ? "text-white/80" : "text-white/25"
                      }`}
                    >
                      {level.name}
                    </span>
                    {!unlocked && (
                      <svg
                        className="w-3 h-3 text-white/15 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0110 0v4" />
                      </svg>
                    )}
                  </div>
                  <div className="text-[11px] text-white/25 mt-0.5">
                    {level.gridSize}×{level.gridSize} · Par {level.par}
                    {best && (
                      <>
                        {" "}
                        · Best{" "}
                        <span className="text-white/40">{best}</span>
                      </>
                    )}
                  </div>
                </div>

                {unlocked && stars > 0 && (
                  <StarRating stars={stars} size={13} animate={false} />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { Button } from "@/components/ui/Button";

export function StartScreen() {
  const startLevel = useGameStore((s) => s.startLevel);
  const setScreen = useGameStore((s) => s.setScreen);
  const progress = useGameStore((s) => s.progress);

  const hasProgress = progress.completedLevels.length > 0;
  const nextLevel = hasProgress
    ? Math.max(...progress.completedLevels) + 1
    : 1;

  const totalStars = Object.values(progress.stars).reduce((a, b) => a + b, 0);

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/8 blur-[150px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] rounded-full bg-violet-500/8 blur-[150px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40%] h-[40%] rounded-full bg-cyan-500/4 blur-[120px]" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-[15%] left-[8%] w-2 h-2 rounded-full bg-indigo-400/15"
          animate={{ y: [0, -24, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] right-[12%] w-1.5 h-1.5 rounded-full bg-cyan-400/15"
          animate={{ y: [0, -18, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
        <motion.div
          className="absolute bottom-[25%] left-[15%] w-1 h-1 rounded-full bg-violet-400/15"
          animate={{ y: [0, -16, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        />
        <motion.div
          className="absolute top-[60%] right-[20%] w-1.5 h-1.5 rounded-full bg-emerald-400/10"
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2.4 }}
        />
        <motion.div
          className="absolute top-[20%] right-[35%] w-1 h-1 rounded-full bg-amber-400/10"
          animate={{ y: [0, -14, 0], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1, y: [0, -4, 0] }}
          transition={{
            scale: { type: "spring", stiffness: 180, damping: 14, delay: 0.15 },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
          }}
        >
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/10 to-transparent" />
            <svg
              viewBox="0 0 40 40"
              className="relative w-12 h-12 sm:w-14 sm:h-14"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="4" width="32" height="32" rx="4" />
              <path d="M4 14h12v12H4z" fill="rgba(255,255,255,0.12)" />
              <path d="M24 14h12v12H24z" fill="rgba(255,255,255,0.08)" />
              <path d="M14 14h12v12H14z" fill="rgba(255,255,255,0.04)" />
            </svg>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight mb-4 leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="relative inline-block">
            MIND
            <br />
            <span className="relative bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_ease-in-out_infinite]">
              MAZE
            </span>
            <div className="absolute -inset-x-8 -inset-y-4 -z-10 blur-[60px] bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 rounded-full" />
          </span>
        </motion.h1>

        <motion.p
          className="text-white/40 text-sm sm:text-base max-w-xs mb-8 sm:mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          A premium sliding puzzle experience.
          <br />
          Arrange the tiles. Clear your mind.
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            variant="premium"
            size="lg"
            onClick={() => startLevel(nextLevel)}
            className="text-base px-10 py-3.5"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {hasProgress ? "Continue" : "Play Now"}
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setScreen("levelSelect")}
          >
            Select Level
          </Button>
        </motion.div>

        {hasProgress && (
          <motion.div
            className="mt-8 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.04]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <span className="text-white/30 text-xs">
              {progress.completedLevels.length} level
              {progress.completedLevels.length !== 1 ? "s" : ""} completed
            </span>
            <span className="w-1 h-1 rounded-full bg-white/15" />
            <span className="text-amber-400/60 text-xs">{totalStars} stars</span>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="absolute bottom-6 text-white/10 text-xs font-medium tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        Slide. Solve. Succeed.
      </motion.div>
    </div>
  );
}

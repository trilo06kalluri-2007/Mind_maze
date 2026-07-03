"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { formatTime } from "@/hooks/useTimer";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { Modal } from "@/components/ui/Modal";
import { Confetti } from "@/components/ui/Confetti";
import { levels } from "@/data/levels";

function StatRow({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.03]">
      <span className="text-xs text-white/40">{label}</span>
      <span className={`text-sm font-semibold tabular-nums ${accent}`}>{value}</span>
    </div>
  );
}

export function LevelComplete() {
  const currentLevel = useGameStore((s) => s.currentLevel);
  const moves = useGameStore((s) => s.moves);
  const timer = useGameStore((s) => s.timer);
  const progress = useGameStore((s) => s.progress);
  const nextLevel = useGameStore((s) => s.nextLevel);
  const startLevel = useGameStore((s) => s.startLevel);
  const setScreen = useGameStore((s) => s.setScreen);
  const [stars, setStars] = useState(0);
  const [show, setShow] = useState(false);

  const level = levels.find((l) => l.id === currentLevel);

  useEffect(() => {
    const par = level?.par ?? moves;
    const ratio = par / moves;
    const s = ratio >= 1.2 ? 3 : ratio >= 0.8 ? 2 : 1;
    setStars(s);
    setShow(true);
  }, [moves, level?.par]);

  const hasNext = currentLevel < levels.length;

  return (
    <>
      <Confetti active={show} />
      <Modal isOpen={show}>
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/[0.08] shadow-2xl"
          style={{
            background: "linear-gradient(180deg, rgba(15,15,30,1) 0%, rgba(8,8,18,1) 100%)",
            boxShadow: "0 0 60px rgba(99,102,241,0.1), 0 8px 32px rgba(0,0,0,0.4)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500" />

          <div className="relative p-6 sm:p-8 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1,
              }}
              className="mb-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-indigo-500/20 via-violet-500/20 to-purple-500/20 border border-indigo-500/25 flex items-center justify-center shadow-lg shadow-indigo-500/10">
                <svg
                  className="w-8 h-8 text-indigo-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </motion.div>

            <motion.h2
              className="text-2xl font-bold text-white mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Level {currentLevel} Complete
            </motion.h2>
            <motion.p
              className="text-indigo-400/60 text-sm mb-5 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {level?.name}
            </motion.p>

            <motion.div
              className="flex justify-center mb-5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 18 }}
            >
              <StarRating stars={stars} />
            </motion.div>

            <motion.div
              className="space-y-1.5 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <StatRow label="Moves" value={moves} accent="text-indigo-300" />
              <StatRow label="Time" value={formatTime(timer)} accent="text-cyan-300" />
              <StatRow label="Par" value={level?.par ?? "?"} accent="text-emerald-300" />
            </motion.div>

            <motion.div
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {hasNext ? (
                <Button variant="premium" size="lg" onClick={nextLevel}>
                  Next Level
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              ) : (
                <Button variant="premium" size="lg" onClick={() => setScreen("allComplete")}>
                  All Levels Complete!
                </Button>
              )}
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  className="flex-1"
                  onClick={() => startLevel(currentLevel)}
                >
                  Replay
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  className="flex-1"
                  onClick={() => setScreen("levelSelect")}
                >
                  All Levels
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Modal>
    </>
  );
}

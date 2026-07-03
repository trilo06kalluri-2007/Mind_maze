"use client";

import { useGameStore } from "@/store/gameStore";
import { useTimer } from "@/hooks/useTimer";
import { useKeyboard } from "@/hooks/useKeyboard";
import { Board } from "@/components/game/Board";
import { HUD } from "@/components/game/HUD";

export function GameScreen() {
  const board = useGameStore((s) => s.board);

  useTimer();
  useKeyboard();

  if (!board) return null;

  return (
    <div className="relative min-h-dvh flex flex-col items-center justify-center px-4 py-6 sm:py-8 pb-safe overflow-hidden">
      <div className="fixed inset-0 pointer-events-none select-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full bg-indigo-500/6 blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] aspect-square rounded-full bg-violet-500/5 blur-[120px]" />
        <div className="absolute top-[12%] right-[6%] w-40 h-40 rounded-full bg-cyan-500/4 blur-[100px]" />
        <div className="absolute bottom-[15%] left-[6%] w-48 h-48 rounded-full bg-purple-500/4 blur-[100px]" />
      </div>

      <div className="relative w-full max-w-[min(90vw,520px)] mx-auto flex flex-col items-center">
        <div className="w-20 h-[2px] rounded-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent mb-6" />

        <HUD />
        <Board board={board} />

        <div className="w-20 h-[2px] rounded-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent mt-6" />
      </div>
    </div>
  );
}

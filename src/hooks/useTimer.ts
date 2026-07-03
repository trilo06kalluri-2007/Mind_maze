"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";

export function useTimer() {
  const tick = useGameStore((s) => s.tick);
  const isRunning = useGameStore((s) => s.isRunning);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isRunning, tick]);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

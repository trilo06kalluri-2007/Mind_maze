"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { getValidMoves } from "@/lib/game/engine";

export function useKeyboard() {
  const board = useGameStore((s) => s.board);
  const handleTileClick = useGameStore((s) => s.handleTileClick);
  const resetLevel = useGameStore((s) => s.resetLevel);
  const screen = useGameStore((s) => s.screen);

  useEffect(() => {
    if (screen !== "game" || !board) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const moves = getValidMoves(board);
      const blank = board.blankPos;

      let target: { row: number; col: number } | null = null;

      switch (e.key) {
        case "ArrowUp":
          target = moves.find((m) => m.row === blank.row + 1 && m.col === blank.col) ?? null;
          break;
        case "ArrowDown":
          target = moves.find((m) => m.row === blank.row - 1 && m.col === blank.col) ?? null;
          break;
        case "ArrowLeft":
          target = moves.find((m) => m.row === blank.row && m.col === blank.col + 1) ?? null;
          break;
        case "ArrowRight":
          target = moves.find((m) => m.row === blank.row && m.col === blank.col - 1) ?? null;
          break;
        case "r":
        case "R":
          resetLevel();
          return;
      }

      if (target) {
        e.preventDefault();
        handleTileClick(target.row, target.col);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [board, screen, handleTileClick, resetLevel]);
}

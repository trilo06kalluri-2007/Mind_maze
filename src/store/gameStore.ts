"use client";

import { create } from "zustand";
import { GameScreen, GameProgress, LevelData } from "@/types";
import {
  createBoard,
  moveTile,
  isSolved,
  canMoveTile,
  GameBoard,
} from "@/lib/game/engine";
import { levels } from "@/data/levels";

const STORAGE_KEY = "mind-maze-progress";

function loadProgress(): GameProgress {
  if (typeof window === "undefined")
    return { completedLevels: [], stars: {}, personalBests: {} };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { completedLevels: [], stars: {}, personalBests: {} };
}

function saveProgress(progress: GameProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {}
}

interface GameState {
  screen: GameScreen;
  currentLevel: number;
  board: GameBoard | null;
  moves: number;
  timer: number;
  isRunning: boolean;
  progress: GameProgress;
  lastMoves: GameBoard[];
  showHint: boolean;

  setScreen: (screen: GameScreen) => void;
  startLevel: (levelId: number) => void;
  handleTileClick: (row: number, col: number) => void;
  resetLevel: () => void;
  undoMove: () => void;
  tick: () => void;
  nextLevel: () => void;
  restartGame: () => void;
  getCurrentLevelData: () => LevelData | undefined;
}

export const useGameStore = create<GameState>((set, get) => ({
  screen: "start",
  currentLevel: 1,
  board: null,
  moves: 0,
  timer: 0,
  isRunning: false,
  progress: loadProgress(),
  lastMoves: [],
  showHint: false,

  setScreen: (screen) => set({ screen }),

  startLevel: (levelId) => {
    const level = levels.find((l) => l.id === levelId);
    if (!level) return;
    const board = createBoard(level.tiles);
    set({
      screen: "game",
      currentLevel: levelId,
      board,
      moves: 0,
      timer: 0,
      isRunning: true,
      lastMoves: [],
    });
  },

  handleTileClick: (row, col) => {
    const { board, moves, isRunning: running } = get();
    if (!board || !running) return;

    if (!canMoveTile(board, row, col)) return;

    const newBoard = moveTile(board, row, col);
    const newMoves = moves + 1;
    const lastMoves = [...get().lastMoves, board];

    const solved = isSolved(newBoard);
    if (solved) {
      const level = levels.find((l) => l.id === get().currentLevel);
      const par = level?.par ?? newMoves;
      const ratio = par / newMoves;
      const stars = ratio >= 1.2 ? 3 : ratio >= 0.8 ? 2 : 1;

      const progress = { ...get().progress };
      if (!progress.completedLevels.includes(get().currentLevel)) {
        progress.completedLevels.push(get().currentLevel);
      }
      const prev = progress.stars[get().currentLevel] ?? 0;
      progress.stars[get().currentLevel] = Math.max(prev, stars);
      const prevBest =
        progress.personalBests[get().currentLevel] ?? Infinity;
      progress.personalBests[get().currentLevel] = Math.min(
        prevBest,
        newMoves,
      );
      saveProgress(progress);

      set({
        board: newBoard,
        moves: newMoves,
        isRunning: false,
        lastMoves,
        progress,
        screen: "levelComplete",
      });
      return;
    }

    set({ board: newBoard, moves: newMoves, lastMoves });
  },

  resetLevel: () => {
    const { currentLevel } = get();
    const level = levels.find((l) => l.id === currentLevel);
    if (!level) return;
    const board = createBoard(level.tiles);
    set({ board, moves: 0, timer: 0, isRunning: true, lastMoves: [] });
  },

  undoMove: () => {
    const { lastMoves } = get();
    if (lastMoves.length === 0) return;
    const previousBoard = lastMoves[lastMoves.length - 1];
    set({
      board: previousBoard,
      moves: get().moves - 1,
      lastMoves: lastMoves.slice(0, -1),
    });
  },

  tick: () => {
    if (get().isRunning) {
      set({ timer: get().timer + 1 });
    }
  },

  nextLevel: () => {
    const next = get().currentLevel + 1;
    if (next > levels.length) {
      set({ screen: "allComplete" });
      return;
    }
    get().startLevel(next);
  },

  restartGame: () => {
    set({
      screen: "start",
      board: null,
      moves: 0,
      timer: 0,
      isRunning: false,
      lastMoves: [],
    });
  },

  getCurrentLevelData: () => {
    return levels.find((l) => l.id === get().currentLevel);
  },
}));

"use client";

import { motion } from "framer-motion";
import { Tile } from "./Tile";
import { GameBoard } from "@/lib/game/engine";
import { getValidMoves } from "@/lib/game/engine";
import { useGameStore } from "@/store/gameStore";

interface Props {
  board: GameBoard;
}

export function Board({ board }: Props) {
  const handleTileClick = useGameStore((s) => s.handleTileClick);
  const { grid, size } = board;
  const validMoves = getValidMoves(board);

  const totalTiles = size * size;
  let inPlaceCount = 0;
  const inPlaceGrid: boolean[][] = grid.map((row, r) =>
    row.map((tile, c) => {
      if (!tile || tile.id === -1) {
        return r === size - 1 && c === size - 1;
      }
      const correctRow = Math.floor((tile.id - 1) / size);
      const correctCol = (tile.id - 1) % size;
      const correct = r === correctRow && c === correctCol;
      if (correct) inPlaceCount++;
      return correct;
    }),
  );
  const nearSolvedRatio = inPlaceCount / totalTiles;

  return (
    <motion.div
      className="relative w-full max-w-[min(85vw,480px)] mx-auto aspect-square"
      initial={{ opacity: 0, scale: 0.93, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.6), 0 8px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: "inset 0 0 80px rgba(99,102,241,0.04)",
        }}
      />

      {nearSolvedRatio > 0.65 && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: [
              "inset 0 0 30px rgba(99,102,241,0.03)",
              "inset 0 0 60px rgba(99,102,241,0.09)",
              "inset 0 0 30px rgba(99,102,241,0.03)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div
        className="relative w-full h-full grid gap-1.5 sm:gap-2 p-2.5 sm:p-3.5"
        style={{
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
        }}
      >
        {grid.map((row, r) =>
          row.map((tile, c) => {
            const isValid =
              tile?.id !== -1 &&
              validMoves.some((m) => m.row === r && m.col === c);
            return (
              <Tile
                key={`${r}-${c}`}
                tile={tile}
                row={r}
                col={c}
                isValidMove={isValid}
                isInPlace={inPlaceGrid[r][c]}
                onClick={() => handleTileClick(r, c)}
              />
            );
          }),
        )}
      </div>
    </motion.div>
  );
}

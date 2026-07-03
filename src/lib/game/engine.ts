import { TileData } from "@/types";

export interface GameBoard {
  grid: (TileData | null)[][];
  size: number;
  blankPos: { row: number; col: number };
}

export function createBoard(tiles: TileData[][]): GameBoard {
  const size = tiles.length;
  const grid = tiles.map((row) => row.map((t) => ({ ...t })));
  let blankPos = { row: -1, col: -1 };

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (grid[r][c].id === -1) {
        blankPos = { row: r, col: c };
      }
    }
  }

  return { grid, size, blankPos };
}

export function canMoveTile(board: GameBoard, row: number, col: number): boolean {
  const { blankPos, size } = board;
  if (row < 0 || row >= size || col < 0 || col >= size) return false;
  if (board.grid[row][col]?.id === -1) return false;
  const dr = Math.abs(row - blankPos.row);
  const dc = Math.abs(col - blankPos.col);
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}

export function getValidMoves(board: GameBoard): { row: number; col: number }[] {
  const { blankPos, size } = board;
  const moves: { row: number; col: number }[] = [];
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dr, dc] of dirs) {
    const nr = blankPos.row + dr;
    const nc = blankPos.col + dc;
    if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
      moves.push({ row: nr, col: nc });
    }
  }
  return moves;
}

export function moveTile(board: GameBoard, row: number, col: number): GameBoard {
  if (!canMoveTile(board, row, col)) return board;

  const newGrid = board.grid.map((r) => r.map((t) => (t ? { ...t } : null)));
  const { blankPos } = board;

  newGrid[blankPos.row][blankPos.col] = newGrid[row][col];
  newGrid[row][col] = board.grid[blankPos.row][blankPos.col]
    ? { ...board.grid[blankPos.row][blankPos.col]! }
    : null;

  return {
    grid: newGrid,
    size: board.size,
    blankPos: { row, col },
  };
}

export function isSolved(board: GameBoard): boolean {
  const { grid, size } = board;
  let expected = 1;
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const tile = grid[r][c];
      if (r === size - 1 && c === size - 1) {
        if (tile?.id !== -1) return false;
      } else {
        if (tile?.id !== expected) return false;
        expected++;
      }
    }
  }
  return true;
}

export function isSolvable(tiles: number[][]): boolean {
  const size = tiles.length;
  const flat = tiles.flat();
  const blankRowFromBottom = size - flat.indexOf(size * size - 1) / size;
  let inversions = 0;
  for (let i = 0; i < flat.length; i++) {
    for (let j = i + 1; j < flat.length; j++) {
      if (flat[i] !== size * size - 1 && flat[j] !== size * size - 1 && flat[i] > flat[j]) {
        inversions++;
      }
    }
  }
  if (size % 2 === 1) return inversions % 2 === 0;
  return (inversions + Math.floor(blankRowFromBottom)) % 2 === 0;
}

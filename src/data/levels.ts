import { LevelData } from "@/types";

function generateSolvableGrid(size: number, shuffleMoves: number): number[][] {
  const total = size * size;
  const grid: number[][] = [];
  for (let r = 0; r < size; r++) {
    const row: number[] = [];
    for (let c = 0; c < size; c++) {
      row.push(r * size + c);
    }
    grid.push(row);
  }

  let blankR = size - 1;
  let blankC = size - 1;
  let lastMove: string | null = null;

  for (let m = 0; m < shuffleMoves; m++) {
    const moves: [number, number, string][] = [];
    if (blankR > 0) moves.push([blankR - 1, blankC, "up"]);
    if (blankR < size - 1) moves.push([blankR + 1, blankC, "down"]);
    if (blankC > 0) moves.push([blankR, blankC - 1, "left"]);
    if (blankC < size - 1) moves.push([blankR, blankC + 1, "right"]);

    const filtered = moves.filter(([, , dir]) => {
      if (lastMove === "up" && dir === "down") return false;
      if (lastMove === "down" && dir === "up") return false;
      if (lastMove === "left" && dir === "right") return false;
      if (lastMove === "right" && dir === "left") return false;
      return true;
    });

    const [nr, nc, dir] = filtered[Math.floor(Math.random() * filtered.length)];
    grid[blankR][blankC] = grid[nr][nc];
    grid[nr][nc] = size * size - 1;
    blankR = nr;
    blankC = nc;
    lastMove = dir;
  }

  return grid;
}

function levelData(
  id: number,
  name: string,
  size: number,
  shuffles: number,
  par: number,
  description: string,
): LevelData {
  const grid = generateSolvableGrid(size, shuffles);
  const total = size * size;
  const tiles = grid.map((row) =>
    row.map((val) => {
      const isBlank = val === total - 1;
      return {
        id: isBlank ? -1 : val + 1,
        rotation: 0,
        isFixed: false,
        edges: {},
      };
    }),
  );

  return { id, name, gridSize: size, tiles, par, description };
}

function getLevels(): LevelData[] {
  return [
    levelData(1, "First Steps", 3, 8, 12, "A gentle introduction to the maze."),
    levelData(2, "Getting Warmer", 3, 15, 20, "Slightly trickier arrangement."),
    levelData(3, "Think Ahead", 3, 25, 30, "Planning your moves matters now."),
    levelData(4, "Stepping Up", 4, 20, 35, "The board expands. Stay focused."),
    levelData(5, "Middle Ground", 4, 30, 45, "A moderate challenge awaits."),
    levelData(6, "Crossroads", 4, 40, 55, "More pieces, more complexity."),
    levelData(7, "Deep Focus", 4, 50, 65, "Patience and precision required."),
    levelData(8, "The Spiral", 4, 60, 75, "Finding order in chaos."),
    levelData(9, "Mind Palace", 4, 80, 95, "You'll need your full mental faculties."),
    levelData(10, "Labyrinth", 5, 50, 90, "A sprawling maze of possibilities."),
    levelData(11, "The Gauntlet", 5, 70, 110, "Only the sharpest minds prevail."),
    levelData(12, "Enlightenment", 5, 100, 140, "The ultimate test of mind over maze."),
  ];
}

export const levels: LevelData[] = getLevels();

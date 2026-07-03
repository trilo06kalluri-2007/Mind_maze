export interface TileData {
  id: number;
  rotation: number;
  isFixed: boolean;
}

export interface LevelData {
  id: number;
  name: string;
  gridSize: number;
  tiles: TileData[][];
  par: number;
  description: string;
}

export type GameScreen = "start" | "game" | "levelComplete" | "levelSelect" | "allComplete";

export interface GameProgress {
  completedLevels: number[];
  stars: Record<number, number>;
  personalBests: Record<number, number>;
}

export type Difficulty = "easy" | "medium" | "hard";

export type Board = (number | null)[][];

export type CellPosition = [number, number];

export interface GameState {
  board: Board;
  initial: boolean[][];
  solution: number[][];
  selectedCell: CellPosition | null;
  errors: string[];
  showSuccess: boolean;
  difficulty: Difficulty;
}

export const DIFFICULTY_CLUES: Record<Difficulty, [number, number]> = {
  easy: [38, 45],
  medium: [30, 37],
  hard: [22, 29],
};

import { GameState } from "./types";

const STORAGE_KEY = "sudoku-game";

export function saveGame(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    const data = JSON.stringify({
      board: state.board,
      initial: state.initial,
      solution: state.solution,
      difficulty: state.difficulty,
    });
    localStorage.setItem(STORAGE_KEY, data);
  } catch {
    // localStorage might not be available
  }
}

export function loadGame(): Partial<GameState> | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function clearGame(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage might not be available
  }
}

import { Board, Difficulty, DIFFICULTY_CLUES } from "./types";

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function isValidPlacement(
  board: Board,
  row: number,
  col: number,
  num: number
): boolean {
  // Check row
  for (let c = 0; c < 9; c++) {
    if (board[row][c] === num) return false;
  }

  // Check column
  for (let r = 0; r < 9; r++) {
    if (board[r][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (board[r][c] === num) return false;
    }
  }

  return true;
}

function solveSudoku(board: Board): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of numbers) {
          if (isValidPlacement(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
              return true;
            }
            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function generateSolution(): number[][] {
  const board: Board = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));
  solveSudoku(board);
  return board as number[][];
}

export function createPuzzle(
  solution: number[][],
  difficulty: Difficulty
): { board: Board; initial: boolean[][] } {
  const [minClues, maxClues] = DIFFICULTY_CLUES[difficulty];
  const clueCount =
    Math.floor(Math.random() * (maxClues - minClues + 1)) + minClues;

  const board: Board = solution.map((row) => [...row]);
  const initial: boolean[][] = Array(9)
    .fill(null)
    .map(() => Array(9).fill(true));

  // Get all positions and shuffle them
  const positions: [number, number][] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push([r, c]);
    }
  }
  const shuffledPositions = shuffleArray(positions);

  // Remove cells until we have the desired number of clues
  const cellsToRemove = 81 - clueCount;
  for (let i = 0; i < cellsToRemove; i++) {
    const [row, col] = shuffledPositions[i];
    board[row][col] = null;
    initial[row][col] = false;
  }

  return { board, initial };
}

export function validateBoard(board: Board): string[] {
  const errors: string[] = [];

  // Check for empty cells
  let emptyCount = 0;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === null) emptyCount++;
    }
  }
  if (emptyCount > 0) {
    errors.push(`${emptyCount} cell${emptyCount > 1 ? "s" : ""} still empty`);
  }

  // Check rows for duplicates
  for (let row = 0; row < 9; row++) {
    const seen = new Set<number>();
    for (let col = 0; col < 9; col++) {
      const val = board[row][col];
      if (val !== null) {
        if (seen.has(val)) {
          errors.push(`Row ${row + 1} has duplicate numbers`);
          break;
        }
        seen.add(val);
      }
    }
  }

  // Check columns for duplicates
  for (let col = 0; col < 9; col++) {
    const seen = new Set<number>();
    for (let row = 0; row < 9; row++) {
      const val = board[row][col];
      if (val !== null) {
        if (seen.has(val)) {
          errors.push(`Column ${col + 1} has duplicate numbers`);
          break;
        }
        seen.add(val);
      }
    }
  }

  // Check 3x3 boxes for duplicates
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const seen = new Set<number>();
      for (let r = boxRow * 3; r < boxRow * 3 + 3; r++) {
        for (let c = boxCol * 3; c < boxCol * 3 + 3; c++) {
          const val = board[r][c];
          if (val !== null) {
            if (seen.has(val)) {
              errors.push(`Box ${boxRow * 3 + boxCol + 1} has duplicate numbers`);
              break;
            }
            seen.add(val);
          }
        }
      }
    }
  }

  return errors;
}

export function isSolved(board: Board, solution: number[][]): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== solution[r][c]) return false;
    }
  }
  return true;
}

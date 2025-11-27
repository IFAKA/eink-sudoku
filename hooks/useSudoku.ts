"use client";

import { useState, useEffect, useCallback } from "react";
import { GameState, Difficulty, CellPosition, Board } from "@/lib/types";
import { generateSolution, createPuzzle, validateBoard, isSolved } from "@/lib/sudoku";
import { saveGame, loadGame, clearGame } from "@/lib/storage";

function createNewGame(difficulty: Difficulty): GameState {
  const solution = generateSolution();
  const { board, initial } = createPuzzle(solution, difficulty);
  return {
    board,
    initial,
    solution,
    selectedCell: null,
    errors: [],
    showSuccess: false,
    difficulty,
  };
}

export function useSudoku() {
  const [state, setState] = useState<GameState | null>(null);

  // Initialize game on mount
  useEffect(() => {
    const saved = loadGame();
    if (saved && saved.board && saved.solution && saved.initial) {
      setState({
        board: saved.board as Board,
        initial: saved.initial as boolean[][],
        solution: saved.solution as number[][],
        selectedCell: null,
        errors: [],
        showSuccess: false,
        difficulty: saved.difficulty || "easy",
      });
    } else {
      setState(createNewGame("easy"));
    }
  }, []);

  // Auto-save on state changes
  useEffect(() => {
    if (state && !state.showSuccess) {
      saveGame(state);
    }
  }, [state]);

  const selectCell = useCallback((position: CellPosition | null) => {
    setState((prev) => {
      if (!prev) return prev;
      return { ...prev, selectedCell: position, errors: [] };
    });
  }, []);

  const setNumber = useCallback((num: number) => {
    setState((prev) => {
      if (!prev || !prev.selectedCell) return prev;
      const [row, col] = prev.selectedCell;
      if (prev.initial[row][col]) return prev; // Can't change initial cells

      const newBoard = prev.board.map((r) => [...r]);
      newBoard[row][col] = num;
      return { ...prev, board: newBoard, errors: [] };
    });
  }, []);

  const clearCell = useCallback(() => {
    setState((prev) => {
      if (!prev || !prev.selectedCell) return prev;
      const [row, col] = prev.selectedCell;
      if (prev.initial[row][col]) return prev;

      const newBoard = prev.board.map((r) => [...r]);
      newBoard[row][col] = null;
      return { ...prev, board: newBoard, errors: [] };
    });
  }, []);

  const checkBoard = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      const errors = validateBoard(prev.board);
      if (errors.length === 0 && isSolved(prev.board, prev.solution)) {
        clearGame();
        return { ...prev, errors: [], showSuccess: true };
      }
      return { ...prev, errors };
    });
  }, []);

  const newGame = useCallback((difficulty?: Difficulty) => {
    setState((prev) => {
      const diff = difficulty || prev?.difficulty || "easy";
      clearGame();
      return createNewGame(diff);
    });
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setState((prev) => {
      if (!prev) return prev;
      return { ...prev, difficulty };
    });
  }, []);

  const closeSuccess = useCallback(() => {
    setState((prev) => {
      if (!prev) return prev;
      return { ...prev, showSuccess: false };
    });
  }, []);

  return {
    state,
    selectCell,
    setNumber,
    clearCell,
    checkBoard,
    newGame,
    setDifficulty,
    closeSuccess,
  };
}

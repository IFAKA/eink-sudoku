"use client";

import { Difficulty } from "@/lib/types";

interface HeaderProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onNewGame: () => void;
}

export function Header({ difficulty, onDifficultyChange, onNewGame }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 py-2 border-b-2 border-black">
      <h1 className="text-xl font-bold">SUDOKU</h1>
      <div className="flex items-center gap-2">
        <select
          value={difficulty}
          onChange={(e) => onDifficultyChange(e.target.value as Difficulty)}
          className="px-2 py-1 border-2 border-black bg-white text-black text-sm font-medium"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={onNewGame}
          className="px-3 py-1 border-2 border-black bg-white text-black text-sm font-medium"
        >
          New
        </button>
      </div>
    </div>
  );
}

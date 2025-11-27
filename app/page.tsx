"use client";

import { useSudoku } from "@/hooks/useSudoku";
import { Header } from "@/components/Header";
import { Board } from "@/components/Board";
import { ErrorDisplay } from "@/components/ErrorDisplay";
import { NumberPad } from "@/components/NumberPad";
import { SuccessModal } from "@/components/SuccessModal";

export default function Home() {
  const {
    state,
    selectCell,
    setNumber,
    clearCell,
    checkBoard,
    newGame,
    setDifficulty,
  } = useSudoku();

  if (!state) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <Header
        difficulty={state.difficulty}
        onDifficultyChange={setDifficulty}
        onNewGame={() => newGame()}
      />

      <div className="flex-1 flex flex-col justify-center px-2 py-2">
        <Board
          board={state.board}
          initial={state.initial}
          selectedCell={state.selectedCell}
          onCellClick={selectCell}
        />

        <ErrorDisplay errors={state.errors} />

        <NumberPad
          onNumberClick={setNumber}
          onClearClick={clearCell}
          onCheckClick={checkBoard}
        />
      </div>

      {state.showSuccess && (
        <SuccessModal onPlayAgain={() => newGame()} onHome={() => newGame()} />
      )}
    </div>
  );
}

"use client";

interface SuccessModalProps {
  onPlayAgain: () => void;
  onHome: () => void;
}

export function SuccessModal({ onPlayAgain, onHome }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <h2 className="text-4xl font-bold mb-8">You Won!</h2>
      <p className="text-lg mb-8">Congratulations on completing the puzzle!</p>
      <div className="flex flex-col gap-4">
        <button
          onClick={onPlayAgain}
          className="px-8 py-3 border-2 border-black bg-black text-white text-lg font-medium"
        >
          Play Again
        </button>
        <button
          onClick={onHome}
          className="px-8 py-3 border-2 border-black bg-white text-black text-lg font-medium"
        >
          Home
        </button>
      </div>
    </div>
  );
}

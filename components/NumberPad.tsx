"use client";

interface NumberPadProps {
  onNumberClick: (num: number) => void;
  onClearClick: () => void;
  onCheckClick: () => void;
}

export function NumberPad({ onNumberClick, onClearClick, onCheckClick }: NumberPadProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Number buttons */}
      <div className="grid grid-cols-9 gap-1 mb-2">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className="aspect-square flex items-center justify-center text-xl font-medium border-2 border-black bg-white text-black"
          >
            {num}
          </button>
        ))}
      </div>
      {/* Action buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onClearClick}
          className="px-6 py-2 border-2 border-black bg-white text-black text-lg font-medium"
        >
          ⌫
        </button>
        <button
          onClick={onCheckClick}
          className="px-6 py-2 border-2 border-black bg-black text-white text-lg font-medium"
        >
          Check
        </button>
      </div>
    </div>
  );
}

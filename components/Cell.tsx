"use client";

interface CellProps {
  value: number | null;
  isInitial: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export function Cell({ value, isInitial, isSelected, onClick }: CellProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full h-full flex items-center justify-center
        text-2xl border border-black
        ${isSelected ? "bg-black text-white" : "bg-white text-black"}
        ${isInitial ? "font-bold" : "font-normal"}
      `}
    >
      {value || ""}
    </button>
  );
}

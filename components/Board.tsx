"use client";

import { Cell } from "./Cell";
import { Board as BoardType, CellPosition } from "@/lib/types";

interface BoardProps {
  board: BoardType;
  initial: boolean[][];
  selectedCell: CellPosition | null;
  onCellClick: (position: CellPosition) => void;
}

export function Board({ board, initial, selectedCell, onCellClick }: BoardProps) {
  return (
    <div className="w-full aspect-square max-w-[480px] mx-auto">
      <div className="grid grid-cols-9 grid-rows-9 w-full h-full border-2 border-black">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected =
              selectedCell !== null &&
              selectedCell[0] === rowIndex &&
              selectedCell[1] === colIndex;

            // Add thicker borders for 3x3 boxes
            const borderRight = (colIndex + 1) % 3 === 0 && colIndex < 8 ? "border-r-2" : "";
            const borderBottom = (rowIndex + 1) % 3 === 0 && rowIndex < 8 ? "border-b-2" : "";

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${borderRight} ${borderBottom} border-black`}
              >
                <Cell
                  value={cell}
                  isInitial={initial[rowIndex][colIndex]}
                  isSelected={isSelected}
                  onClick={() => onCellClick([rowIndex, colIndex])}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

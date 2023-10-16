import React from "react";
import Tile from "./tile";

export default function Chessboard() {
  const board = [];

  // two loops to create the board
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    for (let colIndex = 0; colIndex < 8; colIndex++) {
      board.push(
        <Tile
          rowIndex={rowIndex}
          colIndex={colIndex}
          key={rowIndex + colIndex}
        />
      );
    }
  }

  return (
    <div className="grid grid-cols-8 gap-0 w-[600px] h-[600px] bg-transparent">
      {board}
    </div>
  );
}

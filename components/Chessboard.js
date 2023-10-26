"use client"
import Tile from "./Tile";
import useMyStore from "@/app/(store)/store";

export default function Chessboard() {
  const board = [];
  const { possibleMoves } = useMyStore();
  const isTilePossibleMove = (row, col) => {
    return possibleMoves.some(([moveRow, moveCol]) => moveRow === row && moveCol === col);
  };


  // two loops to create the board
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    for (let colIndex = 0; colIndex < 8; colIndex++) {
      board.push(
        <Tile
          rowIndex={rowIndex}
          colIndex={colIndex}
          key={`${colIndex}-${rowIndex}`}
          isPossibleMove={isTilePossibleMove(rowIndex, colIndex)}
        />
      );
    }
  }

  return (
    <div className="grid grid-cols-8 grid-rows-8 gap-0 bg-transparent">
      {board}
    </div>
  );
}

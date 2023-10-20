"use client"
import { useState } from "react";
import Tile from "./Tile";

export default function Chessboard() {
  const board = [];

  const letters = ['A','B','C','D','E','F','G','H']
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [piecePositions, setPiecePositions] = useState([
    // Initial piece positions
    ["", "", "", "", "", "", "", ""],
    ["N", "", "", "", "", "", "", "Q"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["q", "", "", "", "", "", "", "n"],
    ["", "", "", "", "", "", "", ""],
  ]);

  const updatePiecePositions = (newPiecePositions) => {
    // Update the piece positions in the state
    setPiecePositions(newPiecePositions);
  };

  const updateSelectedPiece = (newSelectedPiece) => {
    setSelectedPiece(newSelectedPiece);
  }


  const isTilePossibleMove = (row, col) => {
    if (selectedPiece === "N" /* Knight */) {
      const possibleKnightMoves = calculateKnightMoves(selectedPiece.rowIndex, selectedPiece.colIndex);
      console.log(possibleKnightMoves);
      return possibleKnightMoves.some(([moveRow, moveCol]) => moveRow === row && moveCol === col);
    }
    // Add more conditions for other piece types here
    return false;
  };


  // two loops to create the board
  for (let rowIndex = 0; rowIndex < 8; rowIndex++) {
    for (let colIndex = 0; colIndex < 8; colIndex++) {
      board.push(
        <Tile
          rowIndex={rowIndex}
          colIndex={colIndex}
          key={`${colIndex}-${rowIndex}`}
          updatePiecePositions={updatePiecePositions}
          piecePositions={piecePositions}
          selectedPiece={selectedPiece}
          updateSelectedPiece={updateSelectedPiece}
          isPossibleMove={isTilePossibleMove(rowIndex, colIndex)}
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

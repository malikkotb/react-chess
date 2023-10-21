"use client"
import { useState } from "react";
import Tile from "./Tile";

export default function Chessboard() {
  const board = [];
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
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
  const updatePossibleMoves = (newPossibleMoves) => {
    setPossibleMoves(newPossibleMoves);
  }

  const updatePiecePositions = (newPiecePositions) => {
    // Update the piece positions in the state
    setPiecePositions(newPiecePositions);
  };

  const updateSelectedPiece = (newSelectedPiece) => {
    setSelectedPiece(newSelectedPiece);
  }

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
          updatePiecePositions={updatePiecePositions}
          piecePositions={piecePositions}
          selectedPiece={selectedPiece}
          updateSelectedPiece={updateSelectedPiece}
          possibleMoves={possibleMoves}
          updatePossibleMoves={updatePossibleMoves}
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

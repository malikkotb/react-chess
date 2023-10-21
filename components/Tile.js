"use client";
import { useState, useEffect } from "react";

export default function Tile({
  rowIndex,
  colIndex,
  updatePiecePositions,
  piecePositions,
  updateSelectedPiece,
  selectedPiece,
  isPossibleMove,
  possibleMoves,
  updatePossibleMoves
}) {
  const [pieceImage, setPieceImage] = useState("");

  useEffect(() => {
    const piece = piecePositions[rowIndex][colIndex]; // Get the piece for this cell
    switch (piece) {
      case "Q":
        setPieceImage("/assets/queen_dark.svg");
        break;
      case "N":
        setPieceImage("/assets/knight_dark.svg");
        break;
      case "q":
        setPieceImage("/assets/queen_light.svg");
        break;
      case "n":
        setPieceImage("/assets/knight_light.svg");
        break;
      default:
        setPieceImage(null);
        break;
    }
  }, [piecePositions, rowIndex, colIndex]);

  function calculateKnightMoves(row, col) {
    const possibleKnightMoves = [];
    const moveOffsets = [
      [-2, 1],
      [-1, 2],
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
    ];
    for (const [offsetRow, offsetCol] of moveOffsets) {
      const newRow = row + offsetRow;
      const newCol = col + offsetCol;

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        // check if destination empty / contains an opponent's piece
        const destinationPiece = piecePositions[newRow][newCol];
        if (
          destinationPiece === "" ||
          (destinationPiece !== "" &&
            destinationPiece.toUpperCase() !==
              piecePositions[row][col].toUpperCase())
              // TODO: change this to also check for lowercase
        ) {
          possibleKnightMoves.push([newRow, newCol]);
        }
      }
    }
    return possibleKnightMoves;
  }

  function calculateQueenMoves(row, col) {
    const possibleQueenMoves = [];

    // Define move directions (horizontal, vertical, and diagonal)
    const moveDirections = [
      [-1, 0], [1, 0], [0, -1], [0, 1], // Vertical and horizontal
      [-1, -1], [-1, 1], [1, -1], [1, 1], // Diagonal
    ];

    for (const [offsetRow, offsetCol] of moveDirections) {
      let newRow = row + offsetRow;
      let newCol = col + offsetCol;

      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        // Check if the destination is empty or contains an opponent's piece
        const destinationPiece = piecePositions[newRow][newCol];
        if (destinationPiece === "") {
          possibleQueenMoves.push([newRow, newCol]);
        } else if (destinationPiece.toUpperCase() !== piecePositions[row][col].toUpperCase()) {
          possibleQueenMoves.push([newRow, newCol]);
          break; // Stop if it's an opponent's piece
        } else {
          break; // Stop if it's the same color piece
        }
        newRow += offsetRow;
        newCol += offsetCol;
      }
    }

    return possibleQueenMoves;
  };

  const handleTileClick = () => {
    const piece = piecePositions[rowIndex][colIndex];
    if (piece !== "" && !selectedPiece) {
      const player = piece === piece.toUpperCase() ? "Black" : "White"; // TODO: to check if it is that players turn
      if (piece.toUpperCase() === "N") {
        console.log("knight");
        updatePossibleMoves(calculateKnightMoves(rowIndex, colIndex));
      } else if (piece.toUpperCase() === "Q") {
        console.log("queen");
        updatePossibleMoves(calculateQueenMoves(rowIndex, colIndex));

      }
      updateSelectedPiece({ player, piece, rowIndex, colIndex });
      
    } else if (selectedPiece) {
      console.log("selectedPiece: ", selectedPiece);
      // check if clicked tile is a possible move
      const isContained = possibleMoves.some(arr => JSON.stringify(arr) === JSON.stringify([rowIndex, colIndex]));
      console.log(possibleMoves);
      if (isContained) {
        console.log("moved to: -> ", rowIndex, colIndex);
        const updatedPiecePositions = [...piecePositions];
        updatedPiecePositions[rowIndex][colIndex] = selectedPiece.piece;
        const prevRowIndex = selectedPiece.rowIndex;
        const prevColIndex = selectedPiece.colIndex;
        updatedPiecePositions[prevRowIndex][prevColIndex] = "";
        updatePiecePositions(updatedPiecePositions);
        updateSelectedPiece(null);
        updatePossibleMoves([]); // set possible moves back to noting
      } else if(piece === selectedPiece.piece) { 
        updateSelectedPiece(null); // unselect piece; if piece was selected twice 
        updatePossibleMoves([]); // set possible moves back to noting
      }
      else {
        console.log("move not allowed");
      }
    }
  };

  return (
    <div
      className={`w-[75px] h-[75px] ${
        (rowIndex + colIndex) % 2 === 0 ? "bg-[#ebecd0]" : "bg-[#779556]"
      } 
      ${
        selectedPiece &&
        selectedPiece.rowIndex === rowIndex &&
        selectedPiece.colIndex === colIndex
          ? "bg-red-500"
          : ""
      }
      ${isPossibleMove ? "bg-yellow-300" : ""}
      grid place-content-center`}
      onClick={() => {
        handleTileClick();
      }}
    >
      {pieceImage && (
        <img src={pieceImage} className="h-12 w-12" alt="piece_image"></img>
      )}
    </div>
  );
}

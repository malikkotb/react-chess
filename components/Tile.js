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
    const possibleMoves = [];
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
        ) {
          possibleMoves.push([newRow, newCol]);
        }
      }
    }
    console.log(possibleMoves);
    return possibleMoves;
  }

  const handleTileClick = () => {
    const piece = piecePositions[rowIndex][colIndex];
    if (piece !== "" && !selectedPiece) {
      const player = piece === piece.toUpperCase() ? "Black" : "White"; // TODO: to check if it is that players turn
      calculateKnightMoves(rowIndex, colIndex); 
      // TODO: lift state of calculated moves up to chessboard component
      // to highlight tiles
      updateSelectedPiece({ player, piece, rowIndex, colIndex });
      
    } else if (selectedPiece) {
      console.log("selectedPiece: ", selectedPiece);
      console.log("moved to: -> ", rowIndex, colIndex);

      // calculate possible moves for that piece

      const updatedPiecePositions = [...piecePositions];
      updatedPiecePositions[rowIndex][colIndex] = selectedPiece.piece;
      const prevRowIndex = selectedPiece.rowIndex;
      const prevColIndex = selectedPiece.colIndex;
      updatedPiecePositions[prevRowIndex][prevColIndex] = "";
      updatePiecePositions(updatedPiecePositions);
      updateSelectedPiece(null);
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

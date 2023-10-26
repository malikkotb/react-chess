"use client";
import { useState, useEffect } from "react";
import useMyStore from "../app/(store)/store";
import Marker from "./Marker";

export default function Tile({ rowIndex, colIndex, isPossibleMove }) {
  const {
    selectedPiece,
    possibleMoves,
    piecePositions,
    updateSelectedPiece,
    updatePossibleMoves,
    updatePiecePositions,
    currentPlayer,
    updatePlayer,
    boardFlipped
  } = useMyStore();

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
    const moveOffsetsKnight = [
      [-2, 1],
      [-1, 2],
      [1, 2],
      [2, 1],
      [2, -1],
      [1, -2],
      [-1, -2],
      [-2, -1],
    ];
    for (const [offsetRow, offsetCol] of moveOffsetsKnight) {
      const newRow = row + offsetRow;
      const newCol = col + offsetCol;

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const destinationPiece = piecePositions[newRow][newCol];
        if (destinationPiece === "") {
          possibleKnightMoves.push([newRow, newCol]);
        }
      }
    }
    return possibleKnightMoves;
  }

  function calculateQueenMoves(row, col) {
    const possibleQueenMoves = [];

    const moveOffsetsQueen = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    for (const [offsetRow, offsetCol] of moveOffsetsQueen) {
      let newRow = row + offsetRow;
      let newCol = col + offsetCol;

      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        // Check if the destination is empty or contains opponent piece
        const destinationPiece = piecePositions[newRow][newCol];
        if (destinationPiece === "") {
          possibleQueenMoves.push([newRow, newCol]);
        } else {
          break;
        }
        newRow += offsetRow;
        newCol += offsetCol;
      }
    }

    return possibleQueenMoves;
  }

  const handleTileClick = () => {
    // disable clicking when board is flipped
    if (boardFlipped) {
      console.log("Board is flipped, no moves allowed at the moment");
      return;
    }
    const piece = piecePositions[rowIndex][colIndex];
    if (piece !== "" && !selectedPiece) {
      const player = piece === piece.toUpperCase() ? "Black" : "White"; // TODO: to check if it is that players turn

      if (player !== currentPlayer) {
        console.log("Not your turn");
        return;
      }

      const newPossibleMoves =
        piece.toUpperCase() === "N"
          ? calculateKnightMoves(rowIndex, colIndex)
          : calculateQueenMoves(rowIndex, colIndex);

      updatePossibleMoves(newPossibleMoves);
      updateSelectedPiece({ player, piece, rowIndex, colIndex });
    } else if (selectedPiece) {
      // check if clicked tile is a possible move
      const isContained = possibleMoves.some(
        (arr) => JSON.stringify(arr) === JSON.stringify([rowIndex, colIndex])
      );
      console.log(possibleMoves);
      if (isContained) {
        const updatedPiecePositions = [...piecePositions];
        updatedPiecePositions[rowIndex][colIndex] = selectedPiece.piece;
        updatedPiecePositions[selectedPiece.rowIndex][selectedPiece.colIndex] = ""; // set previous indices to ""
        updatePiecePositions(updatedPiecePositions);
        updateSelectedPiece(null);
        updatePossibleMoves([]); // set possible moves back to noting
        updatePlayer(); // change player
      } else if (piece === selectedPiece.piece) {
        updateSelectedPiece(null); // unselect piece; if piece was selected twice
        updatePossibleMoves([]); // set possible moves back to noting
      } else {
        console.log("move not allowed");
      }
    }
  };

  return (
    <div
      className={`w-[48px] h-[48px] sm:w-[75px] sm:h-[75px] ${
        (rowIndex + colIndex) % 2 === 0 ? "bg-[#ebecd0]" : "bg-[#779556]"
      } 
      ${
        selectedPiece &&
        selectedPiece.rowIndex === rowIndex &&
        selectedPiece.colIndex === colIndex
          ? "bg-[#72c916]"
          : ""
      }
      grid place-content-center`}
      onClick={() => {
        handleTileClick();
      }}
    >
      {pieceImage && (
        <img src={pieceImage} className="" alt="piece_image"></img>
      )}
      {isPossibleMove && <Marker />}
    </div>
  );
}

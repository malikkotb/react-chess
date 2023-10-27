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
    boardFlipped,
    updateGameOver,
    updateCheckOnQueen
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

  function isQueenInCheck() {
    updateCheckOnQueen(false);
    // Find the current position of your Queen (assumed to be uppercase 'Q')
    let queenPosition;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (piecePositions[i][j] === "Q" && currentPlayer === "White") { // the currentplayer will not have been updated yet
          console.log("black queen");
          queenPosition = { row: i, col: j }; // of Black
          continue;
        } else if (piecePositions[i][j] === "q" && currentPlayer === "Black") {
          console.log("white queen ");
          queenPosition = { row: i, col: j }; // of White
          continue;
        }
      }
    }
    // basically calculateKnightMoves for the position of the queen; to check if it is in danger of being in check by a Knight
    console.log("queen Position black", queenPosition);
    const qRow = queenPosition.row;
    const qCol = queenPosition.col;
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

    const currentPiece = piecePositions[qRow][qCol];
    for (const [offsetRow, offsetCol] of moveOffsetsKnight) {
      const newRow = qRow + offsetRow;
      const newCol = qCol + offsetCol;

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const destinationPiece = piecePositions[newRow][newCol];
        const destinationCase =
          destinationPiece === destinationPiece.toUpperCase()
            ? "White"
            : "Black"; // don't add same color pieces to possible threats
        if (destinationPiece === "") {
          possibleKnightMoves.push([newRow, newCol]);
        } else if (
          destinationPiece !== currentPiece 
          && destinationCase !== currentPlayer
        ) {
          possibleKnightMoves.push([newRow, newCol]);
        }
      }
    }


    console.log(possibleKnightMoves);
    for (let i = 0; i < possibleKnightMoves.length; i++) {
      if (piecePositions[possibleKnightMoves[i][0]][possibleKnightMoves[i][1]].toLowerCase() === "n") { // check on queen from knight
          updateCheckOnQueen(true);
      }
    }

    // return possibleKnightMoves;

  }

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

    const currentPiece = piecePositions[row][col];
    for (const [offsetRow, offsetCol] of moveOffsetsKnight) {
      const newRow = row + offsetRow;
      const newCol = col + offsetCol;

      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        const destinationPiece = piecePositions[newRow][newCol];
        const destinationCase =
          destinationPiece === destinationPiece.toUpperCase()
            ? "Black"
            : "White";
        if (destinationPiece === "") {
          possibleKnightMoves.push([newRow, newCol]);
        } else if (
          destinationPiece !== currentPiece &&
          destinationCase !== currentPlayer
        ) {
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

    const currentPiece = piecePositions[row][col];

    for (const [offsetRow, offsetCol] of moveOffsetsQueen) {
      let newRow = row + offsetRow;
      let newCol = col + offsetCol;

      while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        // Check if the destination is empty or contains opponent piece
        const destinationPiece = piecePositions[newRow][newCol];
        const destinationCase =
          destinationPiece === destinationPiece.toUpperCase()
            ? "Black"
            : "White";
        if (destinationPiece === "") {
          possibleQueenMoves.push([newRow, newCol]);
        } else if (
          destinationPiece !== currentPiece &&
          destinationCase !== currentPlayer
        ) {
          possibleQueenMoves.push([newRow, newCol]);
          break;
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
      const player = piece === piece.toUpperCase() ? "Black" : "White";

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
      // console.log(possibleMoves);

      if (isContained) {
        const updatedPiecePositions = [...piecePositions];
        const removedPiece = piecePositions[rowIndex][colIndex].toLowerCase();

        updatedPiecePositions[rowIndex][colIndex] = selectedPiece.piece;
        updatedPiecePositions[selectedPiece.rowIndex][selectedPiece.colIndex] =
          ""; // set previous indices to ""

        updatePiecePositions(updatedPiecePositions);
        updateSelectedPiece(null);
        updatePossibleMoves([]); // set possible moves back to noting

        if (removedPiece === "q") {
          console.log("game over");
          updateGameOver();
          return;
        }

         // check on queen functionality for other player
         isQueenInCheck();

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
          ? "bg-red-400"
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

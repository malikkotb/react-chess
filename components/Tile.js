"use client";
import { useState, useEffect } from "react";

export default function Tile({
  rowIndex,
  colIndex,
  updatePiecePositions,
  piecePositions,
}) {
  const [pieceImage, setPieceImage] = useState("");
  const [selectedPiece, setSelectedPiece] = useState(null);

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

  const handleTileClick = () => {
    const piece = piecePositions[rowIndex][colIndex];

    if (piece && !selectedPiece) {
      // only set selected Piece if there is an actual piece on that tile
      const player = piece === piece.toUpperCase() ? "Black" : "White"; // TODO: to check if it is that players turn
      setSelectedPiece({ player, piece, rowIndex, colIndex });
    } else if (selectedPiece) {
        console.log("Piece is already selected");
    }
  };

  const handleMovePiece = (newRowIndex, newColIndex) => {
    console.log("clicked tile: ", newRowIndex, newColIndex);
    console.log("selectedPiece: ", selectedPiece);
    if (selectedPiece) {
      // If a piece is selected and the clicked tile is not empty, move the piece

      const updatedPiecePositions = [...piecePositions];
      console.log("updated piece positions", updatedPiecePositions);
      updatedPiecePositions[rowIndex][colIndex] = selectedPiece.piece;
      const prevRowIndex = selectedPiece.rowIndex;
      const prevColIndex = selectedPiece.colIndex;
      updatedPiecePositions[prevRowIndex][prevColIndex] = "";
      updatePiecePositions(updatedPiecePositions);
      setSelectedPiece(null);
    }
  };

  return (
    <div
      className={`w-[75px] h-[75px] ${
        (rowIndex + colIndex) % 2 === 0 ? "bg-[#ebecd0]" : "bg-[#779556]"
      } 
      ${
        selectedPiece && selectedPiece.rowIndex === rowIndex &&
        selectedPiece.colIndex === colIndex
          ? "bg-red-500"
          : ""
      }
      grid place-content-center`}
      onClick={() => {
        if (selectedPiece === null) {
            handleTileClick();
        } else 
        // if (piecePositions[rowIndex][colIndex] === "") 
        {
            handleMovePiece(rowIndex, colIndex);
        }
      }}
    >
      {pieceImage && (
        <img src={pieceImage} className="h-12 w-12" alt="piece_image"></img>
      )}
    </div>
  );
}

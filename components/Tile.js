"use client";

import { useState, useEffect } from "react";

export default function Tile({ rowIndex, colIndex }) {
  const [pieceImage, setPieceImage] = useState("");
  const [selectedPiece, setSelectedPiece] = useState(null);

  const piecePositions = [
    ["", "", "", "", "", "", "", ""],
    ["N", "", "", "", "", "", "", "Q"], // Black pieces (Uppercase)
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["q", "", "", "", "", "", "", "n"], // white pieces (lowercase)
    ["", "", "", "", "", "", "", ""],
  ];

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

  const handleTileClick = (rowIndex, colIndex) => {
    if (!selectedPiece) {
        // Select the piece:
        console.log(`Selecting : ${rowIndex},${colIndex}`);
        setSelectedPiece({rowIndex, colIndex})
        console.log(selectedPiece);
    } else if (selectedPiece) {
        // piece is selected
        console.log(selectedPiece);
        console.log(`A Piece is selected at: ${rowIndex},${colIndex}`);
    }
  }


  return (
    <div
      className={`w-[75px] h-[75px] ${
        (rowIndex + colIndex) % 2 === 0 ? "bg-[#ebecd0]" : "bg-[#779556]"
      } grid place-content-center`}
      onClick={() => handleTileClick(rowIndex, colIndex)}
      >
      {pieceImage && (
        <img src={pieceImage} className="h-12 w-12" alt="piece_image"></img>
      )}
    </div>
  );
}
